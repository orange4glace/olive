#include "resource/video_resource.h"

#include "decoder/decoder_manager.h"
#include "decoder/decoder.h"
#include "napi/napi_encoder.h"

#include "logger/logger.h"

namespace olive {

VideoResource::VideoResource(std::string path) :
    Resource(RESOURCE_VIDEO, path) {

}

bool VideoResource::Initialize() {
  Decoder* decoder = DecoderManager::instance()->AddDecoderFromResource(this);
  if (!decoder) {
    logger::get()->info("[VideoResource] In");
    return false;
  }
  decoder_ = decoder;
  NAPI_SetInstanceNamedProperty("decoder", decoder->napi_instance());
  return true;
}

}