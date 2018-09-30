#ifndef OLIVE_VIDEO_DECODER_H_
#define OLIVE_VIDEO_DECODER_H_

#include "decoder/decoder.h"

#include "napi/napi_export.h"
#include "napi/napi_instanceable.h"

extern "C" {
#include <libavutil/imgutils.h>
#include <libavutil/samplefmt.h>
#include <libavutil/timestamp.h>
#include <libavutil/avutil.h>
#include <libavformat/avformat.h>
#include <libswscale/swscale.h>
}

#define AV_THROW(COND, ERR) if (!(COND)) throw (ERR);
#define AV_RETURN(COND, RETURN) if (!(COND)) return (RETURN);

namespace olive {

class VideoResource;

class VideoDecoder : public Decoder {
NAPI_DECLARE_CLASS_EXTENDS(VideoDecoder, Decoder, "VideoDecoder")

public:
  VideoDecoder(const VideoResource* const resource);

  void Initialize() throw (const char*);
  int Decode(int64_t timestamp);

  void decode();

private:
  const VideoResource* const resource_;
  AVFormatContext* fmt_ctx_;
  AVCodecContext* dec_ctx_;
  AVStream* stream_;
  AVFrame* frame_;
  AVPacket* pkt_;
  SwsContext* sws_ctx_;
  int stream_index_;

  uint8_t* data_rgb_[4];
  int linesize_rgb_[4];

  int width_, height_;
  enum AVPixelFormat pix_fmt_;

  napi_threadsafe_function ts_fn_;

  // NAPI
  napi_value _NAPI_Decode(int64_t timestamp);
  
  NAPI_EXPORT_FUNCTION(VideoDecoder, NAPI_Decode, _NAPI_Decode,
      int64_t);

};

}

#endif // OLIVE_DECODER_H_