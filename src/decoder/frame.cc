#include "decoder/frame.h"

#include "decoder/memory_pool.h"

namespace olive {

Frame::Frame() :
    scaled(false) {
  pts = AV_NOPTS_VALUE;
  ref_count = 1;
}

Frame::Frame(AVFrame* f) : Frame() {
  frame = av_frame_alloc();
  av_frame_move_ref(frame, f);
  pts = frame->best_effort_timestamp;
  width = frame->width;
  height = frame->height;
}

Frame::~Frame() {
  av_frame_free(&frame);
  // if (scaled) MemoryPool::Free(scaled_data, width * height);
}

void Frame::ref() {
  std::unique_lock<std::mutex> lock(m);
  ref_count++;
}

void Frame::unref() {
  std::unique_lock<std::mutex> lock(m);
  ref_count++;
  if (ref_count == 0) {
    delete this;
  }
}

} // namespace olive