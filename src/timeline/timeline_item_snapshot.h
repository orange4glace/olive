#ifndef OLIVE_TIMELINE_ITEM_SNAPSHOT_H_
#define OLIVE_TIMELINE_ITEM_SNAPSHOT_H_

#include "timeline/timeline_typedef.h"
#include "resource/type.h"

#include "napi/napi.h"
#include "napi/napi_encoder.h"

#include <string>

namespace olive {

struct TimelineItemSnapshot {
  TimelineItemID timeline_item_id;
  ResourceID resource_id;

  int64_t decoding_timestamp;

  void* data;

  std::string opt;

  inline napi_value ToJSObject() {
    napi_value object = napi::create_object();
    uint64_t data_addr = reinterpret_cast<uint64_t>(data);
    napi::SetNamedProperty(object, "data", napi_encoder<uint64_t>::encode(data_addr));
    return object;
  }
};

}

#endif // OLIVE_TIMELINE_ITEM_SNAPSHOT_H_