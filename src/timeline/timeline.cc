#include "timeline/timeline.h"

#include "timeline/timeline_layer.h"
#include "timeline/timeline_item.h"
#include "timeline/timeline_item_snapshot.h"
#include "napi/napi.h"
#include "napi/es6/map.h"
#include "napi/es6/observable_map.h"
#include "napi/napi_encoder.h"

#include <string>
#include <assert.h>

namespace olive {

namespace {
timeline_layer_id __next_timeline_layer_id_ = 0;
} // namespace

Timeline::Timeline() :
    dirty_(false) {
  NAPI_CreateInstance();
  NAPI_SetInstanceNamedProperty("layers", es6::ObservableMap::New(), &napi_layers_ref_);
  napi::log(napi_encoder<const char*>::encode("Timeline intiailized"));
  napi::log(napi::unref(napi_layers_ref_));
}

Timeline::~Timeline() {}

void Timeline::Initialize() {
  instance_ = std::make_unique<Timeline>();
}

Timeline* const Timeline::instance() {
  return instance_.get();
}

TimelineLayer* const Timeline::GetTimelineLayer(timeline_layer_id id) {
  assert(timeline_layers_.count(id));
  return timeline_layers_[id].get();
}

TimelineLayer* const Timeline::AddTimelineLayer() {
  std::unique_ptr<TimelineLayer> timeline_layer(
      std::make_unique<TimelineLayer>(__next_timeline_layer_id_++));

  TimelineLayer* raw = timeline_layer.get();
  
  timeline_layers_.emplace(timeline_layer->id(), std::move(timeline_layer));

  // NAPI
  /*
  napi_env env = NAPI::GetCurrentEnv();
  napi_value js_object;
  napi_get_reference_value(env, js_object_ref_, &js_object);
  napi_set_named_property(env, js_object, std::to_string(timeline_layer->id()).c_str(),
                          timeline_layer->js_object());
  */
  std::cout << "## Add timeline layer " << raw->id() << "\n";
  es6::ObservableMap::Set(napi_layers_ref_, napi_encoder<uint32_t>::encode(raw->id()), raw->napi_instance());
  //NAPI_SetNamedProperty(napi_layers_ref_, std::to_string(raw->id()).c_str(), raw->napi_instance());

  return raw;
}

void Timeline::RemoveTimelineLayer(timeline_layer_id id) {
  assert(timeline_layers_.count(id));
  timeline_layers_.erase(id);
}

void Timeline::MoveTimelineItem(TimelineLayer* const layer, TimelineItem* const item,
    int start_offset, int end_offset) {
  if (item->GetTimelineLayer()->id() == layer->id()) {
    // Same timeline layer
    layer->MoveTimelineItem(item, start_offset, end_offset);
  }
  else {
    // Move to another timeline layer
  }
} 

TimelineItem* const Timeline::AddTimelineItem(TimelineLayer* const layer, int start_offset, int end_offset) {
  TimelineItem* const item = layer->AddTimelineJSItem(start_offset, end_offset);
  return item;
}

std::vector<TimelineItemSnapshot> Timeline::GetCurrentTimestampTimelineItemSnapshots() {
  std::vector<TimelineItemSnapshot> snapshots;
  for (auto& kv : timeline_layers_) {
    auto& timeline_layer = kv.second;
    std::vector<TimelineItemSnapshot> _snapshots = timeline_layer->GetTimelineLayerSnapshotsAt(timestamp_);
    for (auto& snapshot : _snapshots) snapshots.emplace_back(std::move(snapshot));
  }
  return std::move(snapshots);
}

// Todo: Set dirty if only timeline item affects to current rendering state
void Timeline::Invalidate(TimelineItem* const timeline_item) {
  unique_lock();
  dirty_ = true;
}

// NAPI
NAPI_DEFINE_CLASS(Timeline, 
    NAPI_PROPERTY_VALUE("layers", napi_configurable, NAPI_MOBX_OBSERVABLE),
    NAPI_PROPERTY_FUNCTION("AddTimelineLayer", NAPI_AddTimelineLayer, napi_default),
    NAPI_PROPERTY_FUNCTION("AddTimelineItem", NAPI_AddTimelineItem, napi_default),
    NAPI_PROPERTY_FUNCTION("MoveTimelineItem", NAPI_MoveTimelineItem, napi_default))

napi_value Timeline::_NAPI_AddTimelineLayer() {
  TimelineLayer* const layer = AddTimelineLayer();
  return layer->napi_instance();
}

napi_value Timeline::_NAPI_AddTimelineItem(TimelineLayer* const layer,
    int start_offset, int end_offset) {
  TimelineItem* const item = AddTimelineItem(layer, start_offset, end_offset);
  return item->napi_instance();
}

napi_value Timeline::_NAPI_MoveTimelineItem(TimelineLayer* const layer,
    TimelineItem* const item, int start_offset, int end_offset) {
  MoveTimelineItem(layer, item, start_offset, end_offset);
  return NULL;
}

std::unique_ptr<Timeline> Timeline::instance_;

} // namespace olive