#ifndef OLIVE_VIDEO_DECODER_ITEM_H_
#define OLIVE_VIDEO_DECODER_ITEM_H_

#include "timeline/timeline_item.h"

#include <queue>
#include <thread>
#include <mutex>

namespace olive {

class VideoDecoderItem {

public:
  void Run();
  void SetTimestamp(int64_t timestamp);

  void RequestTimestamp(int64_t timestamp);

private:
  void Decode(int64_t timestamp);

  int64_t current_timestamp_;
  uint8_t* buffer_;

  std::queue<int64_t> queue_;
  std::mutex mutex_;

} // class VideoDecoderItem

} // olive

#endif // OLIVE_VIDEO_DECODER_ITEM_H_