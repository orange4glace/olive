#ifndef OLIVE_VIDEO_DECODER_HOST_H_
#define OLIVE_VIDEO_DECODER_HOST_H_

#include "decoder/decoder_host.h"

#include "napi/napi.h"
#include "typedef.h"

#include <vector>

namespace olive {

class VideoResource;
class VideoDecoder;

class VideoDecoderHost {

public:
  VideoDecoderHost(VideoResource* const resource);

  napi_promise Decode(timecode_t timecode);

  // Duration in microseconds
  int64_t duration() const;

protected:

  VideoDecoder* GetOrNewAvailableDecoder(timecode_t timecode);

private:
  std::vector<VideoDecoder*> decoders_;

  VideoResource* const resource_;

  // Decoder for gathering information like duration, frame rate...
  VideoDecoder* decoder_;

}; // class VideoDecoderHost

} // namesapce olive

#endif // OLIVE_VIDEO_DECODER_HOST_H_