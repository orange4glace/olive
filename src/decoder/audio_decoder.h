#ifndef OLIVE_AUDIO_DECODER_H_
#define OLIVE_AUDIO_DECODER_H_

#include "decoder/decoder.h"

namespace olive {
class AudioFrame;
class AudioDecoderHost;

class AudioDecoder {
public:
/*
  AudioDecoder(AudioDecoderHost* const decoder_host, VideoResource* const resource);

  void Initialize() throw (const char*) override;
  void Decode(TimelineItemSnapshot snapshot) override;

  std::mutex m;
  std::condition_variable cv;

private:
  int Seek(int64_t timestamp);
  void decode();
  AudioFrame* PeekQueueTo(int64_t pts);

  void loop();

  AudioDecoderHost* decoder_host_;
  
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

  int sample_rate_;
  int nb_channels_;
  uint64_t channel_layout_;
  int frame_size_;
  int audio_frame_byte_capacity_;
  int frames_per_audio_frame_;

  AudioFrame* current_audio_frame_;
  std::deque<AudioFrame*> frame_queue_;

*/
};

}

#endif // OLIVE_DECODER_H_