#ifndef OLIVE_TIMELINE_ITEM_H_
#define OLIVE_TIMELINE_ITEM_H_

#include "napi/napi.h"

#include "napi/napi_export.h"
#include "napi/napi_instanceable.h"
#include "napi/napi_sync_property.h"

#include "timeline/timeline_item_snapshot.h"
#include "timeline/timeline_typedef.h"

#include <algorithm>

namespace olive {

// Sorry for circular design!
class TimelineLayer;
class Resource;

struct TimelineItemClamp {
  bool is_clamped;
  int start_timecode, end_timecode;
  int length;

  TimelineItemClamp(bool is_clamped_,
                    int start_timecode_, int end_timecode_) 
      : is_clamped(is_clamped_), start_timecode(start_timecode_), end_timecode(end_timecode_),
        length(end_timecode_ - start_timecode_) {}
};

class TimelineItem : public NAPI_Instanceable {
NAPI_DECLARE_CLASS(TimelineItem, "TimelineItem");

public:
  TimelineItem(Resource* resource = NULL);
  ~TimelineItem();
  void SetTimecode(int start_timecode, int end_timecode);
  void SetFormatTimecode(int fmt_timecode);
  void SetTimelineLayer(TimelineLayer* const layer);
  TimelineLayer* const GetTimelineLayer();

  TimelineItemSnapshot GetSnapshotAtTimecode(timecode_t timecode) const;

  // Get Clamped area of clampee clamped by clamper.
  // return pair<start_timecode, end_timecode>
  static TimelineItemClamp GetClamped(const TimelineItem* const clamper,
                                   const TimelineItem* const clampee);

  timeline_item_id id() const;
  inline int format_timecode() const { return format_timecode_; }
  inline int start_timecode() const { return start_timecode_; }
  inline int end_timecode() const { return end_timecode_; }

  inline Resource* const resource() { return resource_; }

protected:
  NAPISyncProperty<timeline_item_id> id_;
  TimelineLayer* timeline_layer_;
  int format_timecode_;
  NAPISyncProperty<int> start_timecode_;
  NAPISyncProperty<int> end_timecode_;

  Resource* resource_;

};

}

#endif // OLIVE_TIMELINE_ITEM_H_