#include "timeline/timeline_layer.h"

#include "timeline/timeline.h"
#include "timeline/timeline_item.h"
#include "timeline/timeline_item_snapshot.h"

#include "resource/resource.h"
#include "resource/video_resource.h"

#include "napi/es6/map.h"
#include "napi/es6/observable_map.h"
#include "napi/napi_encoder.h"

#include "logger/logger.h"

#include <iostream>
#include <set>
#include <string>

namespace {
  timeline_layer_id __next_timeline_layer_id_ = 0;
}

namespace olive {

TimelineLayer::TimelineLayer(timeline_layer_id id) 
  : NAPI_Instanceable_Initializer(TimelineLayer),
    id_(__next_timeline_layer_id_++),
    name_(napi_instance_ref(), "name", "layer" + std::to_string(id_)) {
  NAPI_SetInstanceNamedProperty("items",
      es6::ObservableMap::New(), &napi_items_ref_);
  NAPI_SetInstanceNamedProperty("id", napi_encoder<uint32_t>::encode(id));
}

TimelineLayer::~TimelineLayer() {}

TimelineItem* const TimelineLayer::AddTimelineItem(int start_timecode, int end_timecode, Resource* const resource) {
  if (end_timecode == -1) {
    int64_t duration = static_cast<VideoResource*>(resource)->duration();
    end_timecode = Timeline::instance()->ConvertMicrosecondToTimecode(duration);
  }
  logger::get()->info("[TimelineLayer] AddTimelineItem {} {} {}", start_timecode, end_timecode, resource->id());
  
  std::unique_ptr<TimelineItem> item = std::make_unique<TimelineItem>(resource);
  TimelineItem* raw = item.get();
  item->SetTimecode(start_timecode, end_timecode);
  AddTimelineItem(std::move(item));
  return raw;
}
/*
TimelineItem* const TimelineLayer::AddTimelineJSItem(int start_timecode, int end_timecode) {
  std::unique_ptr<TimelineItem> item = std::make_unique<TimelineItem>();
  TimelineItem* raw = item.get();
  item->Settimecode(start_timecode, end_timecode);
  AddTimelineItem(std::move(item));
  return raw;
}
*/

void TimelineLayer::MoveTimelineItem(TimelineItem* const item,
    int start_timecode, int end_timecode) {
  item->SetTimecode(start_timecode, end_timecode);
}

void TimelineLayer::RemoveTimelineItem(timeline_item_id id) {
  timeline_items_.erase(std::remove_if(timeline_items_.begin(), 
                            timeline_items_.end(),
                            [&id](auto& x) -> bool {
                              return id == x->id();
                            }),
                        timeline_items_.end());

  // NAPI
  napi::DeleteNamedProperty(napi_items_ref_, std::to_string(id).c_str());
}

TimelineItem* const TimelineLayer::AddTimelineItem(std::unique_ptr<TimelineItem> item) {
  item->SetTimelineLayer(this);
  auto raw = item.get();
  timeline_items_.push_back(std::move(item));

  // NAPI
  es6::ObservableMap::Set(napi_items_ref_, napi_encoder<uint32_t>::encode(raw->id()), raw->napi_instance());
  return raw;
}

std::vector<TimelineItemSnapshot> TimelineLayer::GetTimelineItemSnapshotsAt(int64_t timestamp) const {
  std::vector<TimelineItemSnapshot> snapshots;
  for (auto& timeline_item : timeline_items_) {
    TimelineItemSnapshot snapshot = timeline_item->GetSnapshotAt(timestamp);
    snapshots.emplace_back(std::move(snapshot));
  }
  return std::move(snapshots);
}

TimelineItem* const TimelineLayer::CommitTimelineItem(TimelineItem* const item) {
  assert(item->GetTimelineLayer()->id() == id_);
  std::set<timeline_item_id> erases;
  for (auto& it : timeline_items_) {
    auto el = it.get();
    TimelineItemClamp clamp = TimelineItem::GetClamped(item, el);
    if (clamp.is_clamped) {
      if (clamp.length == 0) erases.emplace(it->id());
      else it->SetTimecode(clamp.start_timecode, clamp.end_timecode);
    }
  }
  for (auto id : erases) RemoveTimelineItem(id);
  return item;
}

timeline_layer_id TimelineLayer::id() const {
  return id_;
}

// NAPI
NAPI_DEFINE_CLASS(TimelineLayer,
    NAPI_PROPERTY_VALUE("id", napi_default),
    NAPI_PROPERTY_VALUE("name", napi_configurable, NAPI_MOBX_OBSERVABLE),
    NAPI_PROPERTY_VALUE("items", napi_configurable, NAPI_MOBX_OBSERVABLE))

} // namespace olive