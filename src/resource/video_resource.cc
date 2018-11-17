#include "resource/video_resource.h"

#include "decoder/video_decoder_host.h"
#include "napi/napi_encoder.h"

#include "logger/logger.h"

namespace olive {

VideoResource::VideoResource(std::string path) :
    Resource(RESOURCE_VIDEO, path) {
  video_decoder_host_ = new VideoDecoderHost(this);
}

bool VideoResource::Initialize() {
  return true;
}

VideoDecoderHost* const VideoResource::video_decoder_host() {
  return video_decoder_host_;
}

}