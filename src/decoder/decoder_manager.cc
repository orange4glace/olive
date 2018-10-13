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

namespace {
  void __finalize(napi_env env, void* finalize_data, void* finalize_int) {
    logger::get()->critical("[DecoderManager] Finalize tsfn");
  }

  void tsfn_call_js(napi_env env, napi_value js_callback, void* context, void* data) {
    DecoderManager* this_dm = static_cast<DecoderManager*>(context);
    napi_value js_object_array;
    NAPI_CALL(napi_create_array_with_length(
      napi::current_env(),
      this_dm->host_waiter_result.size(),
      &js_object_array
    ));
    int i = 0;
    for (auto& snapshot : this_dm->host_waiter_result) {
      napi::SetProperty(js_object_array, napi_encoder<int32_t>::encode(i), snapshot.ToJSObject());
      i++;
    }
    napi::set_current_env(env);
    NAPI_CALL(napi_call_function(env, napi::get_global(), js_callback, 1, &js_object_array, NULL));
  }
} // namespace

void DecoderManager::Initialize() {
  instance_ = new DecoderManager();

  // Start loop thread
  instance_->loop_thread_ = std::thread(&DecoderManager::loop, instance_);

  NAPI_CALL(napi_create_threadsafe_function(
    napi::current_env(),
    napi::GetNamedProperty(napi::get_global(), "requestRendering"),
    NULL,
    napi_encoder<const char*>::encode("NA"),
    1,
    1,
    NULL,
    __finalize,
    (void*)instance_, tsfn_call_js, &instance_->tsfn_callback_));
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
    // Get TimelineItem snapshots
    std::vector<TimelineItemSnapshot> snapshots = Timeline::instance()->GetCurrentTimestampTimelineItemSnapshots();
    timeline_lock.unlock();

    // Call VideoDecoderHosts
    DecodeVideo(std::move(snapshots));
    logger::get()->info("[DecoderManager] Decoding done");

    NAPI_CALL(napi_call_threadsafe_function(tsfn_callback_, NULL, napi_tsfn_blocking));
  }
}
  
// Called from Decoder thread
void DecoderManager::DecodeVideo(std::vector<TimelineItemSnapshot> snapshots) {
  std::map< resource_id, std::vector<TimelineItemSnapshot> > snapshot_map;
  for (auto& snapshot : snapshots)
    snapshot_map[snapshot.resource_id].emplace_back(std::move(snapshot));

  size_t counter = snapshot_map.size();
  std::unique_lock<std::mutex> lock(m);

  // Clear waiter
  host_waiter_result.clear();

  logger::get()->info("[DecoderManager] Counter : {}", counter);

  for (auto& kv : snapshot_map) {
    // Todo : Generalize
    auto resource = (VideoResource*)ResourceManager::instance()->GetResource(kv.first);
    auto decoder_host = resource->decoder_host();
    // Non-blocking, separate thread
    decoder_host->Decode(std::move(kv.second), &counter);
  }

  // Wait for all of VideoDecoderHost to be finished
  logger::get()->info("[DecoderManager] Pending for DecoderHosts, counter : {}", counter);
  cv.wait(lock, [&counter] { return counter == 0; });
}


DecoderManager* DecoderManager::instance_ = NULL;

} // namespace olvie