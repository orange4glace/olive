#include "timeline/timeline_item.h"

#include "timeline/timeline_item_snapshot.h"
#include "timeline/timeline_layer.h"

#include "resource/resource.h"

#include "napi/napi_encoder.h"

namespace olive {

namespace {
  timeline_item_id __next_timeline_item_id_ = 0;
} // namespace

TimelineItem::TimelineItem(Resource* resource)
  : id_(__next_timeline_item_id_++), resource_(resource) {
  NAPI_CreateInstance();
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

void TimelineItem::SetFormatOffset(int fmt_offset) {
  format_offset_ = fmt_offset;
}

TimelineItemSnapshot TimelineItem::GetSnapshotAt(int64_t timestamp) const {
  int64_t target = format_offset_ + (timestamp - start_offset_);
  TimelineItemSnapshot snapshot;
  snapshot.timeline_item_id = id_;
  snapshot.resource_id = resource_->id();
  snapshot.decoding_timestamp = target;
  return std::move(snapshot);
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

timeline_item_id TimelineItem::id() const {
  return id_;
}

// NAPI
NAPI_DEFINE_CLASS(TimelineItem)

} // namespace olive