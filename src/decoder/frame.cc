#include "decoder/frame.h"

#include "decoder/memory_pool.h"
#include "logger/logger.h"

#include <iostream>

namespace olive {

namespace {
  int next_frame_id = 0;
}

Frame::Frame(AVFrame* f) :
    scaled(false), transferred(false), pts(AV_NOPTS_VALUE), scaled_data(NULL), ref_count(1) {
  frame = av_frame_alloc();
  av_frame_move_ref(frame, f);
  pts = frame->best_effort_timestamp;
  width = frame->width;
  height = frame->height;

  id = next_frame_id++;
}

Frame::~Frame() {
  logger::get()->info("[Frame] Free frame {}", id);
  av_frame_free(&frame);
  if (scaled_data) {
    MemoryPool::Free(scaled_data, width * height * 4);
  }
}

void Frame::ref() {
  std::unique_lock<std::mutex> lock(m);
  ref_count++;
}

void Frame::unref() {
  std::unique_lock<std::mutex> lock(m);
  ref_count--;
  assert(ref_count >= 0);
  if (ref_count == 0) {
    delete this;
  }
}

} // namespace olive