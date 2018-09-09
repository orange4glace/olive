#include "timeline/timeline_layer.h"

#include "timeline/timeline_item.h"

#include <set>

namespace {
  timeline_layer_id __next_timeline_layer_id_ = 0;
}

namespace olive {

TimelineLayer::TimelineLayer(timeline_layer_id id) 
  : id_(__next_timeline_layer_id_++) {
  NAPI_SetInstanceNamedProperty<napi_value>("items",
      napi::create_empty_object(), &napi_items_ref_);
}

TimelineLayer::~TimelineLayer() {}

void TimelineLayer::AddTimelineJSItem(int start_offset, int end_offset) {
  std::unique_ptr<TimelineItem> item = std::make_unique<TimelineItem>();
  item->SetOffset(start_offset, end_offset);
  AddTimelineItem(std::move(item));
}

void TimelineLayer::AddTimelineItem(std::unique_ptr<TimelineItem> item) {
  timeline_items_.emplace_back(std::move(item));
  CommitTimelineItem(item.get());
}

void TimelineLayer::CommitTimelineItem(TimelineItem* const item) {
  std::set<timeline_item_id> erases;
  for (auto& it : timeline_items_) {
    auto el = it.get();
    TimelineItemClamp clamp = TimelineItem::GetClamped(item, el);
    if (clamp.is_clamped) {
      if (clamp.length == 0) erases.emplace(it->id());
      else it->SetOffset(clamp.start_offset, clamp.end_offset);
    }
  }
  timeline_items_.erase(std::remove_if(timeline_items_.begin(), 
                            timeline_items_.end(),
                            [&erases](auto& x) -> bool {
                              return erases.count(x->id());
                            }),
                        timeline_items_.end());
}

timeline_layer_id TimelineLayer::id() const {
  return id_;
}

// NAPI
NAPI_IMPL_PROPERTIES(TimelineLayer)

} // namespace olive