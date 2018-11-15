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
}

void VideoDecoderHost::Decode(std::vector<TimelineItemSnapshot> snapshots, size_t* counter) {
  manager_work_counter_ = counter;
  for (auto& snapshot : snapshots) {
    TimelineItemID timeline_item_id = snapshot.timeline_item_id;
    VideoDecoder* decoder = NULL;
    logger::get()->info("[VideoDecoderHost] Pass snapshot TimelineItemID : {}", timeline_item_id);
    if (decoders_.count(timeline_item_id))
      decoder = decoders_[timeline_item_id];
    else
      decoder = AssignDecoder(timeline_item_id);
    assert(decoder);
    decoder->Decode(snapshot);
  }
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

void VideoDecoderHost::DecoderCallback(TimelineItemSnapshot snapshot) {
  DecoderManager* decoder_manager = DecoderManager::instance();
  {
    logger::get()->info("[CALLBACK] {}", snapshot.pts);
    std::unique_lock<std::mutex> manager_lock(decoder_manager->m);
    manager_work_counter_ -= 1;
    snapshot.frame->frame = NULL;
    decoder_manager->host_waiter_result.emplace_back(snapshot);
  }
  decoder_manager->cv.notify_one();
}

} // namespace olive