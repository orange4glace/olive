#include "resource/video_resource.h"

#include "decoder/video_decoder_host.h"
#include "decoder/audio_decoder_host.h"
#include "napi/napi_encoder.h"

#include "logger/logger.h"

namespace olive {

VideoResource::VideoResource(std::string path) :
    Resource(RESOURCE_VIDEO, path) {
  video_decoder_host_ = new VideoDecoderHost(this);
  audio_decoder_host_ = new AudioDecoderHost(this);
}

bool VideoResource::Initialize() {
  return true;
}

VideoDecoderHost* const VideoResource::video_decoder_host() {
  return video_decoder_host_;
}

AudioDecoderHost* const VideoResource::audio_decoder_host() {
  return audio_decoder_host_;
}

}