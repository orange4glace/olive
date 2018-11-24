#ifndef OLIVE_TIMELINE_LAYER_H_
#define OLIVE_TIMELINE_LAYER_H_

#include "napi/napi.h"
#include "napi/napi_export.h"
#include "napi/napi_instanceable.h"
#include "napi/napi_sync_property.h"

#include "timeline/timeline_item_snapshot.h"
#include "timeline/timeline_typedef.h"

#include <memory>
#include <vector>

namespace olive {

class TimelineItem;
class Resource;

class TimelineLayer : public NAPI_Instanceable {
NAPI_DECLARE_CLASS(TimelineLayer, "TimelineLayer");

public:
  TimelineLayer(timeline_layer_id id);
  ~TimelineLayer();
  TimelineItem* const GetTimelineItemAtTimecode(int timecode);
  TimelineItem* const AddTimelineItem(int start_timecode, int end_timecode, Resource* const resource);
  // TimelineItem* const AddTimelineMediaItem(Media* const media, int start_timecode, int end_timecode);
  // TimelineItem* const AddTimelineJSItem(int start_timecode, int end_timecode);
  void MoveTimelineItem(TimelineItem* const item, int start_timecode, int end_timecode);
  void RemoveTimelineItem(timeline_item_id id);

  std::vector<TimelineItemSnapshot> GetTimelineItemSnapshotsAtTimecode(timecode_t timecode) const;

  timeline_layer_id id() const;

private:
  // Unfortunatly, current container of timeline items is |std::vector|
  // Todo:: Change the container to Improve performace
  std::vector<std::unique_ptr<TimelineItem>> timeline_items_;
  TimelineItem* const AddTimelineItem(std::unique_ptr<TimelineItem> item);
  TimelineItem* const CommitTimelineItem(TimelineItem* const item);

  napi_ref napi_items_ref_;
  timeline_layer_id id_;
  NAPISyncProperty<std::string> name_;
  
};

}

#endif // OLIVE_TIMELINE_LAYER_H_