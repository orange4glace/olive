#include "timeline/timeline_item_snapshot.h"

#include "decoder/frame.h"
#include "logger/logger.h"

#include <iostream>

namespace olive {

TimelineItemSnapshot::TimelineItemSnapshot() :
    recognized(false), frame(NULL) {
}

TimelineItemSnapshot::TimelineItemSnapshot(const TimelineItemSnapshot& rhs)
  : timeline_item_id(rhs.timeline_item_id),
    resource_id(rhs.resource_id), timestamp(rhs.timestamp), pts(rhs.pts),
    recognized(rhs.recognized), frame(rhs.frame), opt(rhs.opt) {
  if (frame) frame->ref();
}

TimelineItemSnapshot& TimelineItemSnapshot::operator=(const TimelineItemSnapshot& rhs) {
  return *this = TimelineItemSnapshot(rhs);
}

TimelineItemSnapshot::TimelineItemSnapshot(TimelineItemSnapshot&& rhs) noexcept
  : timeline_item_id(rhs.timeline_item_id),
    resource_id(rhs.resource_id), timestamp(rhs.timestamp), pts(rhs.pts),
    recognized(rhs.recognized), frame(rhs.frame), opt(rhs.opt) {
  rhs.frame = NULL;
}

TimelineItemSnapshot& TimelineItemSnapshot::operator=(TimelineItemSnapshot&& rhs) noexcept {
  timeline_item_id = rhs.timeline_item_id;
  resource_id = rhs.resource_id;
  timestamp = rhs.timestamp;
  pts = rhs.pts;
  recognized = rhs.recognized;
  frame = rhs.frame;
  opt = rhs.opt;

  rhs.frame = NULL;
  return *this;
}

TimelineItemSnapshot::~TimelineItemSnapshot() {
  if (frame != NULL) frame->unref();
}

napi_value TimelineItemSnapshot::ToJSObject() {
  napi_value object = napi::create_object();
  uint64_t data_addr = reinterpret_cast<uint64_t>(frame->scaled_data);
  int32_t size = frame->width * frame->height * 4;
  napi::SetNamedProperty(object, "data", napi_encoder<uint64_t>::encode(data_addr));
  napi::SetNamedProperty(object, "size", napi_encoder<int32_t>::encode(size));
  return object;
}

}