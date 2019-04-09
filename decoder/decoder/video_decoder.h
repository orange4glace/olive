#ifndef OLIVE_VIDEO_DECODER_H_
#define OLIVE_VIDEO_DECODER_H_

#include "decoder/decoder.h"

#include "napi/napi.h"
#include "typedef.h"

#include <atomic>

namespace olive {

class VideoFrame;
class VideoDecoderHost;

class VideoDecoder {

friend class VideoDecoderHost;

public:
  VideoDecoder(VideoDecoderHost* const decoder_host, VideoResource* const resource);

  void Initialize() throw (const char*);

  napi_promise Decode(timecode_t timecode);

  inline void Acquire() {
    acquired_ = true;
  }

  inline void Release() {
    acquired_ = false;
  }

  decoder_id_t id() const;
  bool acquired() const;

  std::mutex m;
  std::condition_variable cv;

  /* Promise & callback */
  napi_deferred deferred_;
  timecode_t requested_timecode;

  std::atomic<int> busy;

private:
  int Seek(int64_t timestamp);
  void decode();
  VideoFrame* PeekQueueTo(int64_t pts);

  void loop();

  decoder_id_t id_;

  VideoDecoderHost* decoder_host_;
  
  bool has_decode_request_;
  timecode_t requested_pts_;
  bool decode_request_resolved_;
  bool has_work_;
  bool acquired_;

  std::thread thread_;

  VideoResource* const resource_;
  AVFormatContext* fmt_ctx_;
  AVCodec* dec_;
  AVCodecContext* dec_ctx_;
  AVDictionary* opts_;
  AVStream* stream_;
  AVFrame* frame_;
  AVPacket* pkt_;
  int stream_index_;

  std::deque<VideoFrame*> frame_queue_;

  int width_, height_;
  enum AVPixelFormat pix_fmt_;

  uint8_t* rgb_;


  /* Promise & callback */
  napi_threadsafe_function tsfn_callback_;

};

}

#endif // OLIVE_DECODER_H_