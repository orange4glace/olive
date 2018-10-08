#include "resource/video_resource.h"

#include "decoder/decoder_manager.h"
#include "decoder/decoder.h"
#include "napi/napi_encoder.h"

#include "logger/logger.h"

namespace olive {

VideoResource::VideoResource(std::string path) :
    Resource(RESOURCE_VIDEO, path),
    video_decoder_host_(this) {

}

bool VideoResource::Initialize() {
  return true;
}

}