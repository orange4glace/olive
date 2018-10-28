#ifndef OLIVE_FRAME_H_
#define OLIVE_FRAME_H_

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

struct Frame {

  Frame();
  Frame(AVFrame* frame);
  ~Frame();

  void ref();
  void unref();

  AVFrame* frame;

  int64_t pts;
  int width;
  int height;

  uint8_t* scaled_data;
  bool scaled;

  int ref_count;

  std::mutex m;

}; // struct Frame

} // namespace olive

#endif // OLIVE_FRAME_H_