#include "decoder/video_decoder_host.h"

#include "napi/napi.h"
#include "napi/napi_encoder.h"
#include "napi/napi_decoder.h"

#include "decoder/decoder_manager.h"
#include "decoder/video_decoder.h"

#include "timeline/timeline_item_snapshot.h"

#include <mutex>
#include <condition_variable>

namespace olive {

VideoDecoderHost::VideoDecoderHost(VideoResource* const resource) :
  resource_(resource) {
}

void VideoDecoderHost::loop() {
  while (true) {
    std::unique_lock<std::mutex> this_thread_lock(m);

    // Wait for work
    bool& _has_work = has_work;
    cv.wait(this_thread_lock, [&_has_work] {return _has_work; });

    // Decode
    decode();

    // Notify to DecoderManager
    std::unique_lock<std::mutex> decoder_manager_lock(DecoderManager::instance()->m);
    *work_counter --;
    decoder_manager_lock.unlock();
    DecoderManager::instance()->cv.notify_one();
  }
}

void VideoDecoderHost::Decode(std::vector<TimelineItemSnapshot> snapshots, size_t* counter) {
  std::unique_lock<std::mutex> lock(m);
  has_work = true;
  work_snapshots = snapshots;
  work_counter = counter;
  lock.unlock();
}

void VideoDecoderHost::decode() {
  // Todo: implement
}

Decoder* const VideoDecoderHost::AssignDecoder(timeline_item_id item_id) {
  VideoDecoder* decoder = NULL;
  if (decoder_pool_.empty()) {
    // Allocate new Decoder
    decoder = new VideoDecoder(resource_);
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