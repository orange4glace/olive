#include "decoder/video_decoder_host.h"

#include "napi/napi.h"
#include "napi/napi_encoder.h"
#include "napi/napi_decoder.h"

#include "resource/resource.h"
#include "resource/video_resource.h"

#include "decoder/decoder_manager.h"
#include "decoder/decoder.h"
#include "decoder/video_decoder.h"

#include "timeline/timeline_item_snapshot.h"

#include "logger/logger.h"

#include <mutex>
#include <condition_variable>

namespace olive {

VideoDecoderHost::VideoDecoderHost(VideoResource* const resource) :
  resource_(resource), has_work_(false) {
  logger::get()->info("[VideoDecoderHost] Construct from Resource ID : {}", resource->id());
  loop_thread_ = std::thread(&VideoDecoderHost::loop, this);
}

void VideoDecoderHost::loop() {
  logger::get()->info("[VideoDecoderHost] Loop start");
  while (true) {
    std::unique_lock<std::mutex> loop_lock(m);

    logger::get()->info("[VideoDecoderHost] Wait for work");
    // Wait for work
    bool& has_work = has_work_;
    cv.wait(loop_lock, [&has_work] {return has_work; });
    has_work = false;

    logger::get()->info("[VideoDecoderHost] Internal decode");
    // Decode
    decode();
    logger::get()->info("[VideoDecoderHost] Internal decode done");

    // Notify to DecoderManager
    std::unique_lock<std::mutex> decoder_manager_lock(DecoderManager::instance()->m);
    *work_counter = *work_counter - 1;
    decoder_manager_lock.unlock();
    DecoderManager::instance()->cv.notify_one();
  }
}

void VideoDecoderHost::Decode(std::vector<TimelineItemSnapshot> snapshots, size_t* counter) {
  std::unique_lock<std::mutex> lock(m);
  has_work_ = true;
  work_snapshots = snapshots;
  work_counter = counter;
  logger::get()->info("[VideoDecoderHost] Decode request {}", *work_counter);
  lock.unlock();
  cv.notify_one();
}

void VideoDecoderHost::decode() {
  std::unique_lock<std::mutex> decoder_waiter_lock(decoder_waiter_mutex);
  int& decoder_waiter_counter = this->decoder_waiter_counter;
  decoder_waiter_counter = 0;
  logger::get()->info("[VideoDecoderHost] decode() snapshots : {}", work_snapshots.size());
  for (auto& snapshot : work_snapshots) {
    TimelineItemID timeline_item_id = snapshot.timeline_item_id;
    logger::get()->info("[VideoDecoderHost] Pass snapshot TimelineItemID : {}", timeline_item_id);
    if (decoders_.count(timeline_item_id)) {
      VideoDecoder* decoder = decoders_[timeline_item_id];
      decoder->Decode(std::move(snapshot));
      decoder_waiter_counter++;
    }
    else {
      VideoDecoder* decoder = AssignDecoder(timeline_item_id);
      decoder->Decode(std::move(snapshot));
      decoder_waiter_counter++;
    }
  }
  logger::get()->info("[VideoDecoderHost] Pending for decoders, counter : {}", decoder_waiter_counter);
  decoder_waiter_cv.wait(decoder_waiter_lock, [&decoder_waiter_counter] { return decoder_waiter_counter == 0; });
}

VideoDecoder* const VideoDecoderHost::AssignDecoder(timeline_item_id item_id) {
  logger::get()->info("[VideoDecoderHost] Assign new decoder");
  VideoDecoder* decoder = NULL;
  if (decoder_pool_.empty()) {
    // Allocate new Decoder
    decoder = new VideoDecoder(this, resource_);
    decoder->Initialize();
  }
  else {
    VideoDecoder* decoder = decoder_pool_.front();
    decoder_pool_.pop();
  }
  decoders_.insert({item_id, decoder});
  return decoder;
}

} // namespace olive