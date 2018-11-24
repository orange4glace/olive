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
  : NAPI_Instanceable_Initializer(TimelineItem),
    id_(napi_instance_ref(), "id", __next_timeline_item_id_++),
    resource_(resource), format_timecode_(0),
    start_timecode_(napi_instance_ref(), "start_timecode", 0),
    end_timecode_(napi_instance_ref(), "end_timecode", 0) {
}

TimelineItem::~TimelineItem() {}

void TimelineItem::SetTimecode(int start_timecode, int end_timecode) {
  start_timecode_ = start_timecode;
  end_timecode_ = end_timecode;
  // NAPI
  /*
  napi_env = NAPI::GetCurrentEnv();
  napi_value js_object;
  napi_get_refernece_value(env, js_object_ref_, &js_object);
  napi_value n_start_timecode, n_end_timecode;
  napi_create_int32(env, start_timecode_, &n_start_timecode);
  napi_create_int32(env, end_timecode_, &n_end_timecode);
  napi_set_named_property(env, js_object, "start_timecode", n_start_timecode);
  napi_set_named_property(env, js_object, "end_timecode", n_end_timecode);
  */
  // NAPI_SetInstanceNamedProperty("start_timecode", napi_encoder<int32_t>::encode(start_timecode));
  // NAPI_SetInstanceNamedProperty("end_timecode", napi_encoder<int32_t>::encode(end_timecode));
}

void TimelineItem::SetFormatTimecode(int fmt_timecode) {
  format_timecode_ = fmt_timecode;
}

TimelineItemSnapshot TimelineItem::GetSnapshotAtTimecode(timecode_t timecode) const {
  timecode_t target = format_timecode_ + (timecode - start_timecode_);
  TimelineItemSnapshot snapshot;
  snapshot.timeline_item_id = id_;
  snapshot.resource_id = resource_->id();
  snapshot.timecode = target;
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
NAPI_DEFINE_CLASS(TimelineItem,
    NAPI_PROPERTY_VALUE("id", napi_default),
    NAPI_PROPERTY_VALUE("start_timecode", napi_configurable, NAPI_MOBX_OBSERVABLE),
    NAPI_PROPERTY_VALUE("end_timecode", napi_configurable, NAPI_MOBX_OBSERVABLE))

} // namespace olive