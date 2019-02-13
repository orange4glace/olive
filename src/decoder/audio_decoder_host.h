#ifndef OLIVE_AUDIO_DECODER_HOST_H_
#define OLIVE_AUDIO_DECODER_HOST_H_

#include "decoder/decoder_host.h"

namespace olive {

class VideoResource;
class AudioDecoder;

class AudioDecoderHost : public DecoderHost {

public:
  AudioDecoderHost(VideoResource* const resource);

protected:

private:

  VideoResource* const resource_;

}; // class AudioDecoderHost

} // namesapce olive

#endif // OLIVE_AUDIO_DECODER_HOST_H_