#include "decoder/video_decoder_manager.h"

#include "decoder/video_decoder_host.h"

#include "resource/resource_manager.h"
#include "resource/resource.h"
#include "resource/video_resource.h"

#include "napi/napi_encoder.h"

#include "logger/logger.h"

#include <assert.h>

namespace olive {

void VideoDecoderManager::Initialize() {
  instance_ = new VideoDecoderManager();
}

void VideoDecoderManager::CreateDecoderHost(Resource* const resource) {
  VideoResource* const video_resource = static_cast<VideoResource* const>(resource);
  VideoDecoderHost* host = new VideoDecoderHost(video_resource);
  decoder_hosts_[resource->id()] = host;
}

napi_value VideoDecoderManager::Decode(resource_id_t resource_id, timecode_t timecode, decoder_id_t decoder_id) {
  assert(decoder_hosts_.count(resource_id));
  VideoDecoderHost* host = decoder_hosts_[resource_id];
  return host->Decode(timecode, decoder_id);
}

int VideoDecoderManager::Acquire(resource_id_t resource_id, timecode_t timecode) {
  assert(decoder_hosts_.count(resource_id));
  VideoDecoderHost* host = decoder_hosts_[resource_id];
  return host->Acquire(timecode);
}

void VideoDecoderManager::Release(resource_id_t resource_id, decoder_id_t decoder_id) {
  assert(decoder_hosts_.count(resource_id));
  VideoDecoderHost* host = decoder_hosts_[resource_id];
  return host->Release(decoder_id);
}


VideoDecoderManager* VideoDecoderManager::instance_ = NULL;

} // namespace olvie