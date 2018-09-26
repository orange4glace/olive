#include "resource/video_resource.h"

#include "decoder/decoder_manager.h"

#include "logger/logger.h"

namespace olive {

VideoResource::VideoResource(std::string path) :
    Resource(RESOURCE_VIDEO, path) {

}

bool VideoResource::Initialize() {
  if (!DecoderManager::instance()->AddDecoderFromResource(this)) {
    logger::get()->info("[VideoResource] In");
    return false;
  }
  return true;
}

}