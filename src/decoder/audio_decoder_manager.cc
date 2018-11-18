#include "decoder/audio_decoder_manager.h"

#include "decoder/audio_decoder_host.h"

#include "resource/resource_manager.h"
#include "resource/resource.h"
#include "resource/video_resource.h"

#include "timeline/timeline.h"
#include "timeline/timeline_item_snapshot.h"

#include "napi/napi_encoder.h"

#include "logger/logger.h"

namespace olive {

void AudioDecoderManager::Initialize() {
  instance_ = new AudioDecoderManager();

  // Start loop thread
  instance_->loop_thread_ = std::thread(&AudioDecoderManager::loop, instance_);
  instance_->render_queue_.Initialize(napi::current_env(), "requestAudioRendering", "requestAudioRendering");
  instance_->render_queue_.name = "video";
}

void AudioDecoderManager::loop() {
  while (true) {
    // Lock Timeline
    std::unique_lock<std::mutex> timeline_lock(Timeline::instance()->m);

    // Wait for dirty
    logger::get()->info("[AudioDecoderManager] Waiting for dirty");
    Timeline::instance()->cv.wait(timeline_lock, [] { return Timeline::instance()->dirty_audio(); });

    logger::get()->critical("[AudioDecoderManager] Timeline dirty, rendering");
    // Validate Timeline
    Timeline::instance()->ValidateAudio();
    logger::get()->info("[AudioDecoderManager] Timeline validated");
    // Get TimelineItem snapshots
    std::vector<TimelineItemSnapshot> snapshots = Timeline::instance()->GetCurrentTimestampTimelineItemSnapshots();
    timeline_lock.unlock();

    // Call AudioDecoderHosts
    logger::get()->info("[AudioDecoderManager] Got snapshots {}", snapshots.size());
    Decode(snapshots);
    logger::get()->info("[AudioDecoderManager] Decoding done");

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
void AudioDecoderManager::Decode(std::vector<TimelineItemSnapshot> snapshots) {
  std::map< resource_id, std::vector<TimelineItemSnapshot> > snapshot_map;
  for (auto& snapshot : snapshots)
    snapshot_map[snapshot.resource_id].emplace_back(snapshot);

  size_t counter = snapshots.size();
  std::unique_lock<std::mutex> lock(m);
  logger::get()->info("[AudioDecoderManager] Try lock OK");

  // Clear waiter
  logger::get()->info("[AudioDecoderManager] Clear result {}", host_waiter_result.size());
  host_waiter_result.clear();
  logger::get()->info("[AudioDecoderManager] Clear result OK");

  logger::get()->info("[AudioDecoderManager] Counter : {}", counter);

  for (auto& kv : snapshot_map) {
    // Todo : Generalize
    auto resource = (VideoResource*)ResourceManager::instance()->GetResource(kv.first);
    auto decoder_host = resource->audio_decoder_host();
    // Non-blocking, separate thread
    decoder_host->Decode(kv.second, &counter);
  }

  // Wait for all of VideoDecoderHost to be finished
  logger::get()->info("[AudioDecoderManager] Pending for DecoderHosts, counter : {}", counter);
  cv.wait(lock, [&counter] { return counter == 0; });
}

void AudioDecoderManager::Rendered() {
  render_queue_.Rendered();
}


AudioDecoderManager* AudioDecoderManager::instance_ = NULL;

} // namespace olvie