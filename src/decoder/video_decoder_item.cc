#include "video_decoder_item.h"

namespace olive {

VideoDecoderItem::Run() {
  while (true) {
    if (queue_.empty()) {

    }
    else {
      
    }
  }
}

VideoDecoderItem::RequestTimestamp(int64_t timestamp) {
  std::lock_guard<std::mutex> _(mutex_);
  queue_.push(timestamp);
}

void VideoDecoderItem::Decode(int64_t timestamp) {

}

}