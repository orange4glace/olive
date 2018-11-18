#ifndef OLIVE_VIDEO_RESOURCE_H_
#define OLIVE_VIDEO_RESOURCE_H_

#include "resource/resource.h"

namespace olive {

class VideoDecoderHost;
class AudioDecoderHost;

class VideoResource : public Resource {
public:
  VideoResource(std::string path);

  bool Initialize() override;

  VideoDecoderHost* const video_decoder_host();
  AudioDecoderHost* const audio_decoder_host();

private:
  VideoDecoderHost* video_decoder_host_;
  AudioDecoderHost* audio_decoder_host_;

};

}

#endif // OLIVE_VIDEO_RESOURCE_H_