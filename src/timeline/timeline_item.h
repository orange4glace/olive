#ifndef OLIVE_TIMELINE_ITEM_H_
#define OLIVE_TIMELINE_ITEM_H_

#include <node_api.h>

#include "napi/napi_export.h"
#include "napi/napi_instanceable.h"

#include "timeline/timeline_item_snapshot.h"
#include "timeline/timeline_typedef.h"

#include <algorithm>

namespace olive {

// Sorry for circular design!
class TimelineLayer;
class Resource;

struct TimelineItemClamp {
  bool is_clamped;
  int start_offset, end_offset;
  int length;

  TimelineItemClamp(bool is_clamped_,
                    int start_offset_, int end_offset_) 
      : is_clamped(is_clamped_), start_offset(start_offset_), end_offset(end_offset_),
        length(end_offset_ - start_offset_) {}
};

class TimelineItem : public NAPI_Instanceable {
NAPI_DECLARE_CLASS(TimelineItem, "TimelineItem");

public:
  TimelineItem(Resource* resource = NULL);
  ~TimelineItem();
  void SetOffset(int start_offset, int end_offset);
  void SetFormatOffset(int fmt_offset);
  void SetTimelineLayer(TimelineLayer* const layer);
  TimelineLayer* const GetTimelineLayer();

  TimelineItemSnapshot GetSnapshotAt(int64_t timestamp) const;

  // Get Clamped area of clampee clamped by clamper.
  // return pair<start_offset, end_offset>
  static TimelineItemClamp GetClamped(const TimelineItem* const clamper,
                                   const TimelineItem* const clampee);

  timeline_item_id id() const;
  inline int format_offset() const { return format_offset_; }
  inline int start_offset() const { return start_offset_; }
  inline int end_offset() const { return end_offset_; }

  inline Resource* const resource() { return resource_; }

protected:
  timeline_item_id id_;
  TimelineLayer* timeline_layer_;
  int format_offset_;
  int start_offset_;
  int end_offset_;

  Resource* resource_;

};

}

#endif // OLIVE_TIMELINE_ITEM_H_