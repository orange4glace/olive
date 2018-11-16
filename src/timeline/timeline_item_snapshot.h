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
  TimelineItemSnapshot(const TimelineItemSnapshot& rhs); // copy constructor
  TimelineItemSnapshot& operator=(const TimelineItemSnapshot& other); // copy assignment
  TimelineItemSnapshot(TimelineItemSnapshot&& rhs) noexcept; // move constructor
  TimelineItemSnapshot& operator=(TimelineItemSnapshot&& other) noexcept; // move assignment
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