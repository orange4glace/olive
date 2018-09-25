#include "resource/video_resource.h"

#include "decoder/decoder_manager.h"

namespace olive {

VideoResource::VideoResource(std::string path) :
    Resource(RESOURCE_VIDEO, path) {

}

void VideoResource::Initialize() {
  DecoderManager::AddDecoderFromResource(this);
}

}