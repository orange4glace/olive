#ifndef OLIVE_TIMELINE_ITEM_H_
#define OLIVE_TIMELINE_ITEM_H_

#include <node_api.h>

#include "napi/napi_export.h"
#include "timeline/timeline_typedef.h"

#include <algorithm>

namespace olive {

// Sorry for circular design!
class TimelineLayer;
class Media;

struct TimelineItemClamp {
  bool is_clamped;
  int start_offset, end_offset;
  int length;

  TimelineItemClamp(bool is_clamped_,
                    int start_offset_, int end_offset_) 
      : is_clamped(is_clamped_), start_offset(start_offset_), end_offset(end_offset_),
        length(end_offset_ - start_offset_) {}
};

class TimelineItem : public NAPI_Export<TimelineItem> {
NAPI_DEFINE_EXPORT(TimelineItem, "TimelineItem");

public:
  TimelineItem();
  ~TimelineItem();
  void SetOffset(int start_offset, int end_offset);
  void SetTimelineLayer(TimelineLayer* const layer);
  TimelineLayer* const GetTimelineLayer();

  timeline_item_id id() const;

  // Get Clamped area of clampee clamped by clamper.
  // return pair<start_offset, end_offset>
  static TimelineItemClamp GetClamped(const TimelineItem* const clamper,
                                   const TimelineItem* const clampee);

protected:
  timeline_item_id id_;
  TimelineLayer* timeline_layer_;
  int start_offset_;
  int end_offset_;

};

}

#endif // OLIVE_TIMELINE_ITEM_H_