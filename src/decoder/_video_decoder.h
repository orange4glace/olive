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

#include <thread>

#define AV_THROW(COND, ERR) if (!(COND)) throw (ERR);
#define AV_RETURN(COND, RETURN) if (!(COND)) return (RETURN);

namespace olive {

struct TimestampRequest {
  int64_t timestamp;
  std::mutex* m;
  int* counter;
}

class VideoResource;

class VideoDecoder : public Decoder {

public:
  VideoDecoder(const VideoResource* const resource);

  void Initialize() throw (const char*);

  void RequestTimestamp(int64_t timestamp, std::mutex& m, int& counter);

private:
  int Seek(int64_t timestamp);
  void Decode();

  void loop();

  std::thread thread_;

  const VideoResource* const resource_;
  AVFormatContext* fmt_ctx_;
  AVCodec* dec_;
  AVCodecContext* dec_ctx_;
  AVDictionary* opts_;
  AVStream* stream_;
  AVFrame* frame_;
  AVPacket* pkt_;
  SwsContext* sws_ctx_;
  int stream_index_;

  uint8_t* data_rgb_[4];
  int linesize_rgb_[4];

  int width_, height_;
  enum AVPixelFormat pix_fmt_;

  std::mutex m_;
  std::condition_variable cv_;
  bool has_request_;
  TimestampRequest request_;
  int64_t last_keyframe_timestamp_;
  int64_t current_timestamp_;

  uint8_t* rgb_;

};

}

#endif // OLIVE_DECODER_H_