#ifndef OLIVE_AUDIO_FRAME_H_
#define OLIVE_AUDIO_FRAME_H_

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

class AudioFrame : Frame {

public:
  struct Data {
    uint8_t* data;
    int size;
    int sample_rate;
  };

private:
  AudioFrame(AVFrame* frame);
  ~AudioFrame();
  void DeleteMe() override;

  void TransferToRenderer() override;
  uint64_t GetDataAddress() override;
  int32_t GetDataSize() override;

  AudioFrame::Data data;

  static ObjectPool<AudioFrame> object_pool;
  inline static AudioFrame* Allocate(AVFrame* frame) {
    return object_pool
  }

}; // struct AudioFrame

} // namespace olive

#endif // OLIVE_AUDIO_FRAME_H_