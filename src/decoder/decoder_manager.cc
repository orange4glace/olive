#include "decoder/decoder_manager.h"

#include "decoder/decoder.h"
#include "decoder/video_decoder.h"

#include "resource/resource.h"
#include "resource/video_resource.h"

#include "logger/logger.h"

namespace olive {

void DecoderManager::Initialize() {
  instance_ = new DecoderManager();
}

bool DecoderManager::AddDecoderFromResource(const Resource* const resource) {
  logger::get()->info("[DecoderManager] AddDecoderFromResource");
  resource_type rtype = resource->type();
  if (rtype == RESOURCE_VIDEO) {
    auto video_resource = static_cast<const VideoResource* const>(resource);
    VideoDecoder* decoder = new VideoDecoder(video_resource);
    logger::get()->info("[DecoderManager] New Video Decoder");
    try {
      decoder->Initialize();
    } catch (const char* e) {
    logger::get()->info("[DecoderManager] Return false");
      return false;
    }
  }
  else {
    return false;
  }
  return true;
}

DecoderManager* DecoderManager::instance_ = NULL;

} // namespace olvie