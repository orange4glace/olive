#include "decoder/snapshot_queue.h"

#include "decoder/frame.h"
#include "decoder/memory_pool.h"
#include "logger/logger.h"

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
      self->rendering_snapshots.size(),
      &js_object_array
    ));
    int i = 0;
    for (auto& snapshot : self->rendering_snapshots) {
      self->ScaleFrame(snapshot.frame);
      napi::SetProperty(js_object_array, napi_encoder<int32_t>::encode(i), snapshot.ToJSObject());
      i++;
    }
    lock.unlock();
    napi::set_current_env(env);
    logger::get()->warn("[SnapshotQueue] Render");
    NAPI_CALL(napi_call_function(env, napi::get_global(), js_callback, 1, &js_object_array, NULL));
  }
}

void SnapshotQueue::Initialize(napi_env env) {
  rendering = false;
  pending = false;
  sws_ctx_ = sws_getContext(1920, 1080, AV_PIX_FMT_YUV420P, 1920, 1080, AV_PIX_FMT_RGB32, SWS_BILINEAR, NULL, NULL, NULL);
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
  pending_snapshots = std::move(s);
  if (rendering) {
    pending = true;
  }
  else {
    Render();
  }
}
  
void SnapshotQueue::Rendered() {
  std::unique_lock<std::mutex> lock(m);
  logger::get()->warn("[SnapshotQueue] Rendered");
  rendering_snapshots.clear();
  rendering = false;
  if (pending) Render();
}

void SnapshotQueue::Render() {
  rendering = true;
  pending = false;
  logger::get()->warn("[SnapshotQueue] Render {} {}", rendering_snapshots.size(), pending_snapshots.size());
  pending_snapshots.swap(rendering_snapshots);
  NAPI_CALL(napi_call_threadsafe_function(tsfn_render, NULL, napi_tsfn_nonblocking));
}

void SnapshotQueue::ScaleFrame(Frame* frame) {
  if (frame->scaled) return;
  int linesize[4] = { frame->width * 4, 0, 0, 0 };
  frame->scaled_data = (uint8_t*)MemoryPool::Allocate(frame->width * frame->height * 4);
  frame->scaled = true;
  uint8_t* data[4] = { frame->scaled_data, 0, 0, 0 };
  sws_scale(sws_ctx_, frame->frame->data, frame->frame->linesize, 0, frame->height, data, linesize);
}

}