#include "decoder/frame_queue.h"

#include <assert.h>

namespace olive {

FrameQueue::FrameQueue(int size) {
}

void FrameQueue::Push(Frame* frame) {
  queue.emplace_back(frame);
}

Frame* FrameQueue::Pop() {
  assert(queue.size());
  Frame* front = *queue.begin();
  queue.pop_front();
  return front;
}

Frame*& FrameQueue::Peek() {
  assert(queue.size());
  return *queue.begin();
}

void FrameQueue::Clear() {
  queue.clear();
}

size_t FrameQueue::Size() const {
  return queue.size();
}

} // namespace olive