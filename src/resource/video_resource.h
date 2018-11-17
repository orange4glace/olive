#ifndef OLIVE_VIDEO_RESOURCE_H_
#define OLIVE_VIDEO_RESOURCE_H_

#include "resource/resource.h"

#include "decoder/video_decoder_host.h"

namespace olive {

class VideoResource : public Resource {
public:
  VideoResource(std::string path);

  bool Initialize() override;

  VideoDecoderHost* const video_decoder_host();

private:
  VideoDecoderHost* video_decoder_host_;

};

}

#endif // OLIVE_VIDEO_RESOURCE_H_