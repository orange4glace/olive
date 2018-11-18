#include "decoder/frame.h"

#include "decoder/memory_pool.h"
#include "logger/logger.h"

#include <iostream>

namespace olive {

namespace {
  int next_frame_id = 0;
}

Frame::Frame(AVFrame* f) :
    pts(AV_NOPTS_VALUE), ref_count(1) {
  frame = av_frame_alloc();
  av_frame_move_ref(frame, f);
  pts = frame->pts;

  id = next_frame_id++;
}

void Frame::ref() {
  std::unique_lock<std::mutex> lock(m);
  ref_count++;
}

void Frame::unref() {
  std::unique_lock<std::mutex> lock(m);
  ref_count--;
  assert(ref_count >= 0);
  if (ref_count == 0) DeleteMe();
}

} // namespace olive