#ifndef OLIVE_VIDEO_DECODER_H_
#define OLIVE_VIDEO_DECODER_H_

#include "decoder/decoder.h"

#include "decoder/frame.h"

#include "timeline/timeline_item_snapshot.h"

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

#include <mutex>
#include <condition_variable>
#include <thread>
#include <deque>

#define AV_THROW(COND, ERR) if (!(COND)) throw (ERR);
#define AV_RETURN(COND, RETURN) if (!(COND)) return (RETURN);

namespace olive {

class VideoDecoderHost;

class VideoResource;

class VideoDecoder : public Decoder {

public:
  VideoDecoder(VideoDecoderHost* const decoder_host, VideoResource* const resource);

  void Initialize() throw (const char*);
  void Decode(TimelineItemSnapshot snapshot);

  std::mutex m;
  std::condition_variable cv;

private:
  int Seek(int64_t timestamp);
  void decode();
  Frame* PeekQueueTo(int64_t pts);

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
  SwsContext* sws_ctx_;
  int stream_index_;

  std::deque<Frame*> frame_queue_;
  // int64_t start_pts_;
  // int64_t end_pts_;

  uint8_t* data_rgb_[4];
  int linesize_rgb_[4];

  int width_, height_;
  enum AVPixelFormat pix_fmt_;

  int64_t last_keyframe_timestamp_;
  int64_t current_timestamp_;

  uint8_t* rgb_;

};

}

#endif // OLIVE_DECODER_H_