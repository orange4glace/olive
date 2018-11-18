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

  Frame(AVFrame* frame);
  inline virtual ~Frame() {};
  virtual inline void DeleteMe() { delete this; }

  virtual inline void TransferToRenderer() {}
  virtual uint64_t GetDataAddress() = 0;
  virtual int32_t GetDataSize() = 0;

  void ref();
  void unref();

  AVFrame* frame;

  int64_t pts;

  int id;

  int ref_count;
  std::mutex m;

}; // struct Frame

} // namespace olive

#endif // OLIVE_FRAME_H_