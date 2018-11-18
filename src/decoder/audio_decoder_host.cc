#include "decoder/audio_decoder_host.h"

#include "napi/napi.h"
#include "napi/napi_encoder.h"
#include "napi/napi_decoder.h"

#include "resource/resource.h"
#include "resource/video_resource.h"

#include "decoder/audio_decoder_manager.h"
#include "decoder/audio_decoder.h"

#include "timeline/timeline_item_snapshot.h"

#include "logger/logger.h"

#include <mutex>
#include <condition_variable>

namespace olive {

AudioDecoderHost::AudioDecoderHost(VideoResource* const resource) :
  resource_(resource) {
  logger::get()->info("[AudioDecoderHost] Construct from Resource ID : {}", resource->id());
}

void AudioDecoderHost::Decode(std::vector<TimelineItemSnapshot> snapshots, size_t* counter) {
  manager_work_counter_ = counter;
  for (auto& snapshot : snapshots) {
    TimelineItemID timeline_item_id = snapshot.timeline_item_id;
    AudioDecoder* decoder = NULL;
    logger::get()->info("[AudioDecoderHost] Pass snapshot TimelineItemID : {}", timeline_item_id);
    if (decoders_.count(timeline_item_id))
      decoder = decoders_[timeline_item_id];
    else
      decoder = AssignDecoder(timeline_item_id);
    assert(decoder);
    decoder->Decode(std::move(snapshot));
  }
}

AudioDecoder* const AudioDecoderHost::AssignDecoder(timeline_item_id item_id) {
  logger::get()->info("[VideoDecoderHost] Assign new decoder");
  AudioDecoder* decoder = NULL;
  if (decoder_pool_.empty()) {
    // Allocate new Decoder
    decoder = new AudioDecoder(this, resource_);
    decoder->Initialize();
  }
  else {
    AudioDecoder* decoder = decoder_pool_.front();
    decoder_pool_.pop();
  }
  decoders_.insert({item_id, decoder});
  return decoder;
}

void AudioDecoderHost::DecoderCallbackBlocking(TimelineItemSnapshot snapshot) {
  AudioDecoderManager* decoder_manager = AudioDecoderManager::instance();
  {
    std::unique_lock<std::mutex> manager_lock(decoder_manager->m);
    *manager_work_counter_ -= 1;
    logger::get()->info("[CALLBACK] {} {}", snapshot.pts, *manager_work_counter_);
    decoder_manager->host_waiter_result.emplace_back(snapshot);
  }
  decoder_manager->cv.notify_one();
}

void AudioDecoderHost::DecoderCallbackNonBlocking(TimelineItemSnapshot snapshot) {
  AudioDecoderManager* decoder_manager = AudioDecoderManager::instance();
  *manager_work_counter_ -= 1;
  logger::get()->info("[CALLBACK] {} {}", snapshot.pts, *manager_work_counter_);
  decoder_manager->host_waiter_result.emplace_back(snapshot);
}

} // namespace olive