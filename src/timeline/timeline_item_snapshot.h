#ifndef OLIVE_TIMELINE_ITEM_SNAPSHOT_H_
#define OLIVE_TIMELINE_ITEM_SNAPSHOT_H_

#include "timeline/timeline_typedef.h"
#include "resource/type.h"

#include "napi/napi.h"
#include "napi/napi_encoder.h"

#include <string>

namespace olive {

struct Frame;

struct TimelineItemSnapshot {

  TimelineItemSnapshot();
  TimelineItemSnapshot(TimelineItemSnapshot& rhs);
  TimelineItemSnapshot(const TimelineItemSnapshot& rhs);
  ~TimelineItemSnapshot();

  napi_value ToJSObject();

  TimelineItemID timeline_item_id;
  ResourceID resource_id;

  int64_t timestamp;
  int64_t pts;
  bool recognized;

  Frame* frame;

  std::string opt;
};

}

#endif // OLIVE_TIMELINE_ITEM_SNAPSHOT_H_