#include "decoder/audio_frame.h"

#include "decoder/memory_pool.h"
#include "logger/logger.h"

#include <iostream>

namespace olive {

namespace {
  int next_frame_id = 0;
}

AudioFrame::AudioFrame(AVFrame* f) :
    pts(AV_NOPTS_VALUE), ref_count(1) {
  frame = av_frame_alloc();
  av_frame_move_ref(frame, f);

  id = next_frame_id++;
}

AudioFrame::~AudioFrame() {
  logger::get()->info("[AudioFrame] Free frame {}", id);
  av_frame_free(&frame);
}

void AudioFrame::ref() {
  std::unique_lock<std::mutex> lock(m);
  ref_count++;
}

void AudioFrame::unref() {
  std::unique_lock<std::mutex> lock(m);
  ref_count--;
  assert(ref_count >= 0);
  if (ref_count == 0) {
    delete this;
  }
}

} // namespace olive