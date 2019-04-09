#ifndef OLIVE_AUDIO_FRAME_H_
#define OLIVE_AUDIO_FRAME_H_

#include "decoder/frame.h"

#include "util/object_pool.h"

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

class AudioFrame : public Frame {

friend class ObjectPool<AudioFrame>;

public:

  struct Data {
    uint8_t* data;
    int byte_capacity;
    int byte_current_size;
    int sample_rate;
    int64_t pts;
  };

  bool Append(AVFrame* frame);

  void TransferToRenderer() override;
  uint64_t GetDataAddress() override;
  int32_t GetDataSize() override;

  inline static AudioFrame* Allocate(int sample_rate, int sample_size, int byte_per_sample) {
    return AudioFrame::frame_pool.Allocate(sample_rate, sample_size, byte_per_sample);
  }
  static ObjectPool<AudioFrame> frame_pool;

private:
  AudioFrame(int sample_rate, int sample_size, int byte_per_sample);
  AudioFrame& operator=(const AudioFrame& other);
  ~AudioFrame() override;
  inline void DeleteMe() override {
    AudioFrame::frame_pool.Free(this);
  }

  int sample_rate_;
  int byte_per_sample_;
  int sample_size_;
  AudioFrame::Data data_;

}; // struct AudioFrame

} // namespace olive

#endif // OLIVE_AUDIO_FRAME_H_