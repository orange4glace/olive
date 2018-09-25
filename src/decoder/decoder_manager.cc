#include "decoder/decoder_manager.h"

#include "decoder/decoder.h"
#include "decoder/video_decoder.h"

#include "resource/resource.h"
#include "resource/video_resource.h"

namespace olive {

void DecoderManager::Initialize() {
  instance_ = new DecoderManager();
}

void DecoderManager::AddDecoderFromResource(const Resource* const resource) {
  resource_type rtype = resource->type();
  if (rtype == RESOURCE_VIDEO) {
    auto video_resource = static_cast<const VideoResource* const>(resource);
    VideoDecoder* decoder = new VideoDecoder(video_resource);
    try {
      decoder->Initialize();
    } catch (const char* e) {
      throw(e);
      return;
    }
  }
  else {
    throw("Resource type not matched");
    return;
  }
}

DecoderManager* DecoderManager::instance_ = NULL;

} // namespace olvie