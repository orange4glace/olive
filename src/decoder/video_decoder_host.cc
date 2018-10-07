#include "decoder/video_decoder_host.h"

#include <mutex>
#include <condition_variable>

namespace olive {

VideoDecoderHost::VideoDecoderHost(const VideoResource* const resource) :
  resource_(resource) {
}

void VideoDecoderHost::Decode(std::vector<TimelineItem*> items) {
  std::vector<Decoder*> target_decoders;
  for (auto item : items) {
    Decoder* decoder = decoders_[item->id()];
    if (!decoder)  {
      decoder = AssignDecoder(item->id());
      target_decoders.emplace_back(decoder);
    }
    else target_decoders.emplace_back(decoder);
  }
  assert(target_decoders.size() == items.size());

  std::mutex m;
  std::condition_variable cond;
  int awaitings = items.size();
  std::unique_lock<std::mutex> lock(m);
  for (auto decoder : target_decoders) {
    decoder->RequestTimestamp(0, m, awaitings);
  }
  for (int i = 0; i < awaitings; i ++) {
    cond.wait(lock, [] { return !awaitings; });
  }
}

Decoder* const VideoDecoderHost::AssignDecoder(timeline_item_id item_id) {
  VideoDecoder* decoder = NULL;
  if (decoder_pool_.empty()) {
    // Allocate new Decoder
    decoder = new VideoDecoder(resource_);
    decoder->Initialize();
  }
  else {
    VideoDecoder* decoder = decoder_pool_.front();
    decoder_pool_.pop();
  }
  decoders_.insert({item_id, decoder});
  return decoder;
}

} // namespace olive