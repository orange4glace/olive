#ifndef OLIVE_VIDEO_DECODER_H_
#define OLIVE_VIDEO_DECODER_H_

#include "decoder/decoder.h"

extern "C" {
#include <libavutil/imgutils.h>
#include <libavutil/samplefmt.h>
#include <libavutil/timestamp.h>
#include <libavformat/avformat.h>
#include <libswscale/swscale.h>
}

#define AV_THROW(COND, ERR) if (!(COND)) throw (ERR);

namespace olive {

class VideoResource;

class VideoDecoder : Decoder {
public:
  VideoDecoder(const VideoResource* const resource);

  void Initialize() throw (const char*);

private:
  const VideoResource* const resource_;
  AVFormatContext* fmt_ctx_;
  AVCodecContext* dec_ctx_;
  AVStream* stream_;
  int stream_index_;

  int width_, height_;
  enum AVPixelFormat pix_fmt_;

};

}

#endif // OLIVE_DECODER_H_