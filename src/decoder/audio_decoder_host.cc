#include "decoder/audio_decoder_host.h"

#include "napi/napi.h"
#include "napi/napi_encoder.h"
#include "napi/napi_decoder.h"

#include "resource/resource.h"
#include "resource/video_resource.h"

#include "decoder/audio_decoder_manager.h"
#include "decoder/audio_decoder.h"

#include "logger/logger.h"

#include <mutex>
#include <condition_variable>

namespace olive {

AudioDecoderHost::AudioDecoderHost(VideoResource* const resource) :
  resource_(resource) {
  logger::get()->info("[AudioDecoderHost] Construct from Resource ID : {}", resource->id());
}
/*
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
*/

} // namespace olive