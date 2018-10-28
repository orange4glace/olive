#ifndef OLIVE_FRAME_QUEUE_H_
#define OLIVE_FRAME_QUEUE_H_

#include "decoder/frame.h"

#include <vector>
#include <deque>
#include <mutex>
#include <condition_variable>

#define FRAME_QUEUE_MAX_SIZE 5

// FrameQueue
// We ensure that we have only one producer(VideoDecoder) and one consumer(DecoderManager)
// Since there's only one producer and consumer for each, Peek() or Size() data can be safely used and valid

namespace olive {

struct FrameQueue {

  FrameQueue(int size = FRAME_QUEUE_MAX_SIZE);
  
  std::deque<Frame*> queue;

  void Push(Frame* frame);
  Frame* Pop();
  Frame*& Peek();
  void Clear();
  size_t Size() const;

};

} // namespace olive

#endif // OLIVE_FRAME_QUEUE_H_