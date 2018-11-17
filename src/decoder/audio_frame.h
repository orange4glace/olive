#ifndef OLIVE_AUDIO_FRAME_H_
#define OLIVE_AUDIO_FRAME_H_

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

struct AudioFrame {

  AudioFrame(AVFrame* frame);
  ~AudioFrame();

  void ref();
  void unref();

  AVFrame* frame;

  int64_t pts;

  int id;

  int ref_count;

  std::mutex m;

}; // struct AudioFrame

} // namespace olive

#endif // OLIVE_AUDIO_FRAME_H_