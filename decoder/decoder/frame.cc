#include "decoder/frame.h"

#include "decoder/memory_pool.h"
#include "logger/logger.h"

#include <iostream>

namespace olive {

namespace {
  int next_frame_id = 0;
}

Frame::Frame() :
    id(next_frame_id++),
    ref_count(1) {
}

void Frame::Clear() {
  ref_count = 1;
}

void Frame::ref() {
  std::unique_lock<std::mutex> lock(m);
  ref_count++;
}

void Frame::unref() {
  std::unique_lock<std::mutex> lock(m);
  ref_count--;
  if (ref_count < 0) logger::get()->critical("ERR {}", ref_count);
  assert(ref_count >= 0);
  if (ref_count == 0) DeleteMe();
}

} // namespace olive