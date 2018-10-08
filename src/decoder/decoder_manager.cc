#include "decoder/decoder_manager.h"

#include "decoder/video_decoder_host.h"

#include "resource/resource.h"
#include "resource/video_resource.h"

#include "timleine/timeline.h"

#include "logger/logger.h"

namespace olive {

namespace {

  struct DecodeRequest {
    resource_id resource;
    int64_t timestamp;
  }

  std::mutex m_video_;
  std::vector<DecodeRequest> video_decode_requests_;
  
  // Called from main thread
  void RequestVideoDecode(int64_t timeline_timestamp) {
    std::unique_lock<std::mutex> lock(m_video_);
    std::vector<TimelineItem*> items = Timeline::instance()->GetCurrentTimestampTimelineItems();
    std::vector<DecodeRequest> requests;
    for (auto item : items) {
      int64_t timestamp = timeline_timestamp - item->start_offset() + item->format_offset();
      requests.emplace_back({ item->resource()->id(), timestamp });
    }
    video_decode_requests_.swap(requests);
  }

  void RunVideoDecoder() {
    std::vector<DecodeRequest> requests;
    {
      std::unique_lock<std::mutex> lock(m_video_);
      requests.swap(video_decode_requests_);
    }
    
  }

  void RunAudioDecoder() {

  }
}

void DecoderManager::Initialize() {
  instance_ = new DecoderManager();
}

void DecoderManager::loop() {
  while (true) {
    std::unique_lock<std::mutex> lock(Timeline::instance()->m);
    // Wait for dirty
    Timeline::instance()->cv.wait(lock, [] {return Timeline::instance()->dirty(); });
    // Decode
    
  }
}

DecoderManager* DecoderManager::instance_ = NULL;

} // namespace olvie