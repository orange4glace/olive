#ifndef OLIVE_VIDEO_FRAME_H_
#define OLIVE_VIDEO_FRAME_H_

#include "decoder/frame.h"

extern "C" {
#include <libavutil/imgutils.h>
#include <libavutil/samplefmt.h>
#include <libavutil/timestamp.h>
#include <libavutil/avutil.h>
#include <libavformat/avformat.h>
#include <libswscale/swscale.h>
}

#include <mutex>

namespace olive {

struct VideoFrame : Frame {

  VideoFrame(AVFrame* frame);
  ~VideoFrame() override;
  inline void DeleteMe() override {
    delete this;
  }

  void TransferToRenderer() override;
  uint64_t GetDataAddress() override;
  int32_t GetDataSize() override;

  AVFrame* frame;

  int width;
  int height;

  uint8_t* scaled_data;
  bool scaled;
  bool transferred;

  int id;

}; // struct VideoFrame

} // namespace olive

#endif // OLIVE_VIDEO_FRAME_H_