#ifndef OLIVE_VIDEO_DECODER_HOST_H_
#define OLIVE_VIDEO_DECODER_HOST_H_

#include "decoder/decoder_host.h"

#include "napi/napi.h"
#include "typedef.h"

#include <vector>
#include <map>

namespace olive {

class VideoResource;
class VideoDecoder;

class VideoDecoderHost {

public:
  VideoDecoderHost(VideoResource* const resource);

  napi_promise Decode(timecode_t timecode, decoder_id_t decoder_id);
  int Acquire(timecode_t timecode = 0);
  void Release(decoder_id_t decoder_id);

  VideoDecoder* const GetDecoder(decoder_id_t decoder_id);
  // Duration in microseconds
  int64_t duration() const;

protected:

  VideoDecoder* GetOrNewAvailableDecoder(timecode_t timecode);

private:
  std::map<decoder_id_t, VideoDecoder*> decoders_;

  VideoResource* const resource_;

  // Decoder for gathering information like duration, frame rate...
  VideoDecoder* decoder_;

}; // class VideoDecoderHost

} // namesapce olive

#endif // OLIVE_VIDEO_DECODER_HOST_H_