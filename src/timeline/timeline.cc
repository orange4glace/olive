#include "timeline/timeline.h"

#include "timeline/timeline_layer.h"
#include "napi/napi.h"

#include <string>
#include <assert.h>

namespace olive {

namespace {
timeline_layer_id __next_timeline_layer_id_ = 0;
} // namespace

Timeline::Timeline() {
  NAPI_SetInstanceNamedProperty<napi_value>("layers",
      napi::create_empty_object(), &napi_layers_ref_);
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
  std::cout << "AddTimelineLayer\n";
  std::unique_ptr<TimelineLayer> timeline_layer(
      std::make_unique<TimelineLayer>(__next_timeline_layer_id_++));
  std::cout << "# AddTimelineLayer\n";

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

  NAPI_SetNamedProperty<napi_value>(napi_layers_ref_, std::to_string(raw->id()).c_str(), raw->napi_instance());

  return raw;
}

void Timeline::RemoveTimelineLayer(timeline_layer_id id) {
  assert(timeline_layers_.count(id));
  timeline_layers_.erase(id);
}

void Timeline::AddTimelineItem(TimelineLayer* const layer, int start_offset, int end_offset) {
  layer->AddTimelineJSItem(start_offset, end_offset);
}

// NAPI
NAPI_IMPL_PROPERTIES(Timeline, 
    NAPI_METHOD_PROPERTY("AddTimelineLayer", NAPI_AddTimelineLayer, napi_default))

napi_value Timeline::_NAPI_AddTimelineLayer() {
  AddTimelineLayer();
  return NULL;
}

napi_value Timeline::_NAPI_AddTimelineItem(TimelineLayer* const layer,
    int start_offset, int end_offset) {
  AddTimelineItem(layer, start_offset, end_offset);
  return NULL;
}

std::unique_ptr<Timeline> Timeline::instance_;

} // namespace olive