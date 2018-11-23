#ifndef OLIVE_VIDEO_DECODER_H_
#define OLIVE_VIDEO_DECODER_H_

#include "decoder/decoder.h"

namespace olive {

class VideoFrame;
class VideoDecoderHost;

class VideoDecoder : public Decoder {

friend class VideoDecoderHost;

public:
  VideoDecoder(VideoDecoderHost* const decoder_host, VideoResource* const resource);

  void Initialize() throw (const char*) override;
  void Decode(TimelineItemSnapshot snapshot) override;

  std::mutex m;
  std::condition_variable cv;

private:
  int Seek(int64_t timestamp);
  void decode();
  VideoFrame* PeekQueueTo(int64_t pts);

  void loop();

  VideoDecoderHost* decoder_host_;
  
  TimelineItemSnapshot decoding_snapshot_req_;
  TimelineItemSnapshot decoding_snapshot_;
  bool has_decode_request_;
  bool decode_request_resolved_;
  bool has_work_;

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

};

}

#endif // OLIVE_DECODER_H_