#include "decoder/decoder_manager.h"

#include "decoder/video_decoder_host.h"

#include "resource/resource_manager.h"
#include "resource/resource.h"
#include "resource/video_resource.h"

#include "timeline/timeline.h"
#include "timeline/timeline_item_snapshot.h"

#include "napi/napi_encoder.h"

#include "logger/logger.h"

namespace olive {

void DecoderManager::Initialize() {
  instance_ = new DecoderManager();

  // Start loop thread
  instance_->loop_thread_ = std::thread(&DecoderManager::loop, instance_);
  instance_->render_queue_.Initialize(napi::current_env());
}

void DecoderManager::loop() {
  while (true) {
    // Lock Timeline
    std::unique_lock<std::mutex> timeline_lock(Timeline::instance()->m);

    // Wait for dirty
    logger::get()->info("[DecoderManager] Waiting for dirty");
    Timeline::instance()->cv.wait(timeline_lock, [] { return Timeline::instance()->dirty(); });

    logger::get()->info("[DecoderManager] Timeline dirty, rendering");
    // Validate Timeline
    Timeline::instance()->Validate();
    logger::get()->info("[DecoderManager] Timeline validated");
    // Get TimelineItem snapshots
    std::vector<TimelineItemSnapshot> snapshots = Timeline::instance()->GetCurrentTimestampTimelineItemSnapshots();
    timeline_lock.unlock();

    // Call VideoDecoderHosts
    logger::get()->info("[DecoderManager] Got snapshots {}", snapshots.size());
    DecodeVideo(snapshots);
    logger::get()->info("[DecoderManager] Decoding done");

    render_queue_.Push(std::move(host_waiter_result));
    /*
    std::unique_lock<std::mutex> render_wait_lock(m);
    NAPI_CALL(napi_call_threadsafe_function(tsfn_callback_, NULL, napi_tsfn_blocking));
    bool& rendered = this->rendered;
    cv.wait(render_wait_lock, [&rendered] { return rendered; });
    */
  }
}
  
// Called from Decoder thread
void DecoderManager::DecodeVideo(std::vector<TimelineItemSnapshot> snapshots) {
  std::map< resource_id, std::vector<TimelineItemSnapshot> > snapshot_map;
  for (auto& snapshot : snapshots)
    snapshot_map[snapshot.resource_id].emplace_back(snapshot);

  size_t counter = snapshots.size();
  std::unique_lock<std::mutex> lock(m);
  logger::get()->info("[DecoderManager] Try lock OK");

  // Clear waiter
  logger::get()->info("[DecoderManager] Clear result {}", host_waiter_result.size());
  host_waiter_result.clear();
  logger::get()->info("[DecoderManager] Clear result OK");

  logger::get()->info("[DecoderManager] Counter : {}", counter);

  for (auto& kv : snapshot_map) {
    // Todo : Generalize
    auto resource = (VideoResource*)ResourceManager::instance()->GetResource(kv.first);
    auto decoder_host = resource->decoder_host();
    // Non-blocking, separate thread
    decoder_host->Decode(kv.second, &counter);
  }

  // Wait for all of VideoDecoderHost to be finished
  logger::get()->info("[DecoderManager] Pending for DecoderHosts, counter : {}", counter);
  cv.wait(lock, [&counter] { return counter == 0; });
}

void DecoderManager::Rendered() {
  render_queue_.Rendered();
}


DecoderManager* DecoderManager::instance_ = NULL;

} // namespace olvie