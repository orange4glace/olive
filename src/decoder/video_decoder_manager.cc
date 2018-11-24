#include "decoder/video_decoder_manager.h"

#include "decoder/video_decoder_host.h"

#include "resource/resource_manager.h"
#include "resource/resource.h"
#include "resource/video_resource.h"

#include "timeline/timeline.h"
#include "timeline/timeline_item_snapshot.h"

#include "napi/napi_encoder.h"

#include "logger/logger.h"

namespace olive {

void VideoDecoderManager::Initialize() {
  instance_ = new VideoDecoderManager();

  // Start loop thread
  instance_->loop_thread_ = std::thread(&VideoDecoderManager::loop, instance_);
  instance_->render_queue_.Initialize(napi::current_env(), "requestVideoRender", "requestVideoRender");
  instance_->render_queue_.name = "video";
}

void VideoDecoderManager::loop() {
  while (true) {
    // Lock Timeline
    std::unique_lock<std::mutex> timeline_lock(Timeline::instance()->m);

    // Wait for dirty
    logger::get()->info("[VideoDecoderManager] Waiting for dirty");
    Timeline::instance()->cv.wait(timeline_lock, [] { return Timeline::instance()->dirty_video(); });

    logger::get()->info("[VideoDecoderManager] Timeline dirty, rendering");
    // Validate Timeline
    Timeline::instance()->ValidateVideo();
    logger::get()->info("[VideoDecoderManager] Timeline validated");
    // Get TimelineItem snapshots
    std::vector<TimelineItemSnapshot> snapshots = Timeline::instance()->GetTimelineItemSnapshotsAtCurrentTimecode();
    timeline_lock.unlock();

    // Call VideoDecoderHosts
    logger::get()->info("[VideoDecoderManager] Got snapshots {}", snapshots.size());
    DecodeVideo(snapshots);
    logger::get()->info("[VideoDecoderManager] Decoding done");

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
void VideoDecoderManager::DecodeVideo(std::vector<TimelineItemSnapshot> snapshots) {
  std::map< resource_id, std::vector<TimelineItemSnapshot> > snapshot_map;
  for (auto& snapshot : snapshots)
    snapshot_map[snapshot.resource_id].emplace_back(snapshot);

  size_t counter = snapshots.size();
  std::unique_lock<std::mutex> lock(m);
  logger::get()->info("[VideoDecoderManager] Try lock OK");

  // Clear waiter
  logger::get()->info("[VideoDecoderManager] Clear result {}", host_waiter_result.size());
  host_waiter_result.clear();
  logger::get()->info("[VideoDecoderManager] Clear result OK");

  logger::get()->info("[VideoDecoderManager] Counter : {}", counter);

  for (auto& kv : snapshot_map) {
    // Todo : Generalize
    auto resource = (VideoResource*)ResourceManager::instance()->GetResource(kv.first);
    auto decoder_host = resource->video_decoder_host();
    // Non-blocking, separate thread
    decoder_host->Decode(kv.second, &counter);
  }

  // Wait for all of VideoDecoderHost to be finished
  logger::get()->info("[VideoDecoderManager] Pending for DecoderHosts, counter : {}", counter);
  cv.wait(lock, [&counter] { return counter == 0; });
}

void VideoDecoderManager::Rendered() {
  render_queue_.Rendered();
}


VideoDecoderManager* VideoDecoderManager::instance_ = NULL;

} // namespace olvie