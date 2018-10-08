#include "timeline/timeline_layer.h"

#include "timeline/timeline_item.h"
#include "timeline/timeline_item_snapshot.h"

#include "napi/napi_encoder.h"

#include <iostream>
#include <set>
#include <string>

namespace {
  timeline_layer_id __next_timeline_layer_id_ = 0;
}

namespace olive {

TimelineLayer::TimelineLayer(timeline_layer_id id) 
  : id_(__next_timeline_layer_id_++) {
  NAPI_CreateInstance();
  NAPI_SetInstanceNamedProperty("items",
      napi::create_empty_object(), &napi_items_ref_);
  NAPI_SetInstanceNamedProperty("id", napi_encoder<uint32_t>::encode(id));
  NAPI_SetInstanceNamedProperty("name", napi_encoder<const char*>::encode(
      "layer" + std::to_string(id_)
  ));
}

TimelineLayer::~TimelineLayer() {}

TimelineItem* const TimelineLayer::AddTimelineJSItem(int start_offset, int end_offset) {
  std::unique_ptr<TimelineItem> item = std::make_unique<TimelineItem>();
  TimelineItem* raw = item.get();
  item->SetOffset(start_offset, end_offset);
  AddTimelineItem(std::move(item));
  return raw;
}

void TimelineLayer::MoveTimelineItem(TimelineItem* const item,
    int start_offset, int end_offset) {
  item->SetOffset(start_offset, end_offset);
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
  timeline_items_.emplace_back(std::move(item));

std::vector<TimelineItemSnapshot> Timeline::GetTimelineItemSnapshotsAt(int64_t timestamp) const {
  std::vector<TimelineItemSnapshot> snapshots;
  for (auto& timeline_item : timeline_items_) {
    TimelineItemSnapshot snapshot = timeline_item->GetSnapshotAt(timestamp);
    snapshots.emplace_back(std::move(snapshot));
  }
  return std::move(snapshots);
}

  // NAPI
napi::SetNamedProperty(napi_items_ref_, std::to_string(raw->id()).c_str(), raw->napi_instance());

  return raw;
}

TimelineItem* const TimelineLayer::CommitTimelineItem(TimelineItem* const item) {
  assert(item->GetTimelineLayer()->id() == id_);
  std::set<timeline_item_id> erases;
  for (auto& it : timeline_items_) {
    auto el = it.get();
    TimelineItemClamp clamp = TimelineItem::GetClamped(item, el);
    if (clamp.is_clamped) {
      if (clamp.length == 0) erases.emplace(it->id());
      else it->SetOffset(clamp.start_offset, clamp.end_offset);
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
    NAPI_PROPERTY_VALUE("name", napi_configurable, NAPI_MOBX_OBSERVABLE))

} // namespace olive