#ifndef OLIVE_TIMELINE_LAYER_H_
#define OLIVE_TIMELINE_LAYER_H_

#include <node_api.h>
#include "napi/napi_export.h"
#include "timeline/timeline_typedef.h"

#include <memory>
#include <vector>

namespace olive {

class Media;

class TimelineItem;

class TimelineLayer : public NAPI_Export<TimelineLayer> {
NAPI_DEFINE_EXPORT(TimelineLayer, "TimelineLayer");

public:
  TimelineLayer(timeline_layer_id id);
  ~TimelineLayer();
  TimelineItem* const GetTimelineItemAtOffset(int offset);
  void AddTimelineMediaItem(Media* const media, int start_offset, int end_offset);
  void AddTimelineJSItem(int start_offset, int end_offset);
  void RemoveTimelineItem(timeline_item_id id);

  timeline_layer_id id() const;

private:
  // Unfortunatly, current container of timeline items is |std::vector|
  // Todo:: Change the container to Improve performace
  std::vector<std::unique_ptr<TimelineItem>> timeline_items_;
  void AddTimelineItem(std::unique_ptr<TimelineItem> item);
  void CommitTimelineItem(TimelineItem* const item);

  napi_ref napi_items_ref_;
  timeline_layer_id id_;
  
};

}

#endif // OLIVE_TIMELINE_LAYER_H_