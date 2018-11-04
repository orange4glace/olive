#include "decoder/snapshot_queue.h"

#include "decoder/frame.h"

namespace olive {

namespace {
  void __finalize(napi_env env, void* finalize_data, void* finalize_int) {
    logger::get()->critical("[DecoderManager] Finalize tsfn");
  }

  void tsfn_render_callabck(napi_env env, napi_value js_callback, void* context, void* data) {
    SnapshotQueue* self = static_cast<SnapshotQueue*>(context);
    std::unique_lock<std::mutex> lock(self->m);
    napi_value js_object_array;
    NAPI_CALL(napi_create_array_with_length(
      napi::current_env(),
      self->snapshots.size(),
      &js_object_array
    ));
    int i = 0;
    for (auto& snapshot : self->snapshots) {
      snapshot.frame->transferred = true;
      napi::SetProperty(js_object_array, napi_encoder<int32_t>::encode(i), snapshot.ToJSObject());
      i++;
    }
    napi::set_current_env(env);
    NAPI_CALL(napi_call_function(env, napi::get_global(), js_callback, 1, &js_object_array, NULL));
    self->tsfn_flag = false;
  }
}

void SnapshotQueue::Initialize(napi_env env) {
  NAPI_CALL(napi_create_threadsafe_function(
    env,
    napi::GetNamedProperty(napi::get_global(), "requestRendering"),
    NULL,
    napi_encoder<const char*>::encode("NA"),
    1,
    1,
    NULL,
    __finalize,
    (void*)this, tsfn_render_callabck, &tsfn_render));
}

void SnapshotQueue::Push(std::vector<TimelineItemSnapshot> s) {
  std::unique_lock<std::mutex> lock(m);
  snapshots = std::move(s);
  if (tsfn_flag) {
    
  }
  else {
    tsfn_flag = true;
    NAPI_CALL(napi_call_threadsafe_function(tsfn_render, NULL, napi_tsfn_nonblocking));
  }
}
  
}