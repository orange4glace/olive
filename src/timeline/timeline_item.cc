#include "timeline/timeline_item.h"

#include "timeline/timeline_layer.h"

#include "napi/napi.h"
#include "napi/napi_encoder.h"

namespace olive {

namespace {
  timeline_item_id __next_timeline_item_id_ = 0;
} // namespace

TimelineItem::TimelineItem()
  : id_(__next_timeline_item_id_++) {
}

TimelineItem::~TimelineItem() {}

void TimelineItem::SetOffset(int start_offset, int end_offset) {
  start_offset_ = start_offset;
  end_offset_ = end_offset;
  // NAPI
  /*
  napi_env = NAPI::GetCurrentEnv();
  napi_value js_object;
  napi_get_refernece_value(env, js_object_ref_, &js_object);
  napi_value n_start_offset, n_end_offset;
  napi_create_int32(env, start_offset_, &n_start_offset);
  napi_create_int32(env, end_offset_, &n_end_offset);
  napi_set_named_property(env, js_object, "start_offset", n_start_offset);
  napi_set_named_property(env, js_object, "end_offset", n_end_offset);
  */
  NAPI_SetInstanceNamedProperty("start_offset", napi_encoder<int32_t>::encode(start_offset));
  NAPI_SetInstanceNamedProperty("end_offset", napi_encoder<int32_t>::encode(end_offset));
}

timeline_item_id TimelineItem::id() const {
  return id_;
}

void TimelineItem::SetTimelineLayer(TimelineLayer* const layer) {
  timeline_layer_ = layer;
}
TimelineLayer* const TimelineItem::GetTimelineLayer() {
  return timeline_layer_;
}

// static
TimelineItemClamp TimelineItem::GetClamped(const TimelineItem* const clamper,
    const TimelineItem* const clampee) {
  return TimelineItemClamp{0, 0, 0};
}

// NAPI
NAPI_IMPL_PROPERTIES(TimelineItem)

} // namespace olive