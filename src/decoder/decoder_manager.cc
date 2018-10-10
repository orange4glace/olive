#include "decoder/decoder_manager.h"

#include "decoder/video_decoder_host.h"

#include "resource/resource_manager.h"
#include "resource/resource.h"
#include "resource/video_resource.h"

#include "timeline/timeline.h"
#include "timeline/timeline_item_snapshot.h"

#include "logger/logger.h"

namespace olive {

void DecoderManager::Initialize() {
  instance_ = new DecoderManager();
}

void DecoderManager::loop() {
  while (true) {
    std::unique_lock<std::mutex> lock(Timeline::instance()->m);

    // Wait for dirty
    Timeline::instance()->cv.wait(lock, [] {return Timeline::instance()->dirty(); });

    // Get TimelineItem snapshots
    std::vector<TimelineItemSnapshot> snapshots = Timeline::instance()->GetCurrentTimestampTimelineItemSnapshots();
    lock.unlock();

    // Call VideoDecoderHosts
    DecodeVideo(std::move(snapshots));
  }
}
  
// Called from Decoder thread
void DecoderManager::DecodeVideo(std::vector<TimelineItemSnapshot> snapshots) {
  std::map< resource_id, std::vector<TimelineItemSnapshot> > snapshot_map;
  for (auto& snapshot : snapshots)
    snapshot_map[snapshot.resource_id].emplace_back(std::move(snapshot));

  size_t counter = snapshot_map.size();
  std::unique_lock<std::mutex> lock(m);

  for (auto& kv : snapshot_map) {
    // Todo : Generalize
    auto resource = (VideoResource*)ResourceManager::instance()->GetResource(kv.first);
    auto decoder_host = resource->decoder_host();
    // Non-blocking, separate thread
    decoder_host->Decode(std::move(kv.second), &counter);
  }

  // Wait for all of VideoDecoderHost to be finished
  cv.wait(lock, [&counter] { return !counter; });
}


DecoderManager* DecoderManager::instance_ = NULL;

} // namespace olvie