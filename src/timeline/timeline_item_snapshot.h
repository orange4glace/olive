#ifndef OLIVE_TIMELINE_ITEM_SNAPSHOT_H_
#define OLIVE_TIMELINE_ITEM_SNAPSHOT_H_

#include "timeline/timeline_typedef.h"
#include "resource/type.h"

namespace olive {

struct TimelineItemSnapshot {
  TimelineItemID timeline_item_id;
  ResourceID resource_id;

  int64_t decoding_timestamp;
};

}

#endif // OLIVE_TIMELINE_ITEM_SNAPSHOT_H_