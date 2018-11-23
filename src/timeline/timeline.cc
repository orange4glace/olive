#include "timeline/timeline.h"

#include "timeline/timeline_layer.h"
#include "timeline/timeline_item.h"
#include "timeline/timeline_item_snapshot.h"

#include "resource/resource.h"

#include "napi/es6/map.h"
#include "napi/es6/observable_map.h"
#include "napi/napi_encoder.h"

#include "logger/logger.h"

#include <string>
#include <assert.h>

namespace olive {

namespace {
timeline_layer_id __next_timeline_layer_id_ = 0;
} // namespace

Timeline::Timeline()
  : NAPI_Instanceable_Initializer(Timeline),
    total_timecode_(napi_instance_ref(), "totalTimecode", 60),
    dirty_video_(false), dirty_audio_(false) {
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
    int start_timecode, int end_timecode) {
  if (item->GetTimelineLayer()->id() == layer->id()) {
    // Same timeline layer
    layer->MoveTimelineItem(item, start_timecode, end_timecode);
  }
  else {
    // Move to another timeline layer
  }
} 

TimelineItem* const Timeline::AddTimelineItem(TimelineLayer* const layer, int start_timecode, int end_timecode, Resource* const resource) {
  logger::get()->critical("AddTimelineItem {} {} {} {}", layer->id(), start_timecode, end_timecode, resource->id());
  return layer->AddTimelineItem(start_timecode, end_timecode, resource);
}

std::vector<TimelineItemSnapshot> Timeline::GetCurrentTimestampTimelineItemSnapshots() const {
  std::vector<TimelineItemSnapshot> snapshots;
  for (auto& kv : timeline_layers_) {
    auto& timeline_layer = kv.second;
    std::vector<TimelineItemSnapshot> _snapshots = timeline_layer->GetTimelineItemSnapshotsAt(timestamp_);
    for (auto& snapshot : _snapshots) snapshots.emplace_back(std::move(snapshot));
  }
  return std::move(snapshots);
}

void Timeline::SetTimestamp(int64_t timestamp) {
  timestamp_ = timestamp;
}

// Todo: Set dirty if only timeline item affects to current rendering state
void Timeline::Invalidate(TimelineItem* const timeline_item) {
  std::unique_lock<std::mutex> lock(m);
  dirty_video_ = true;
  dirty_audio_ = true;
  lock.unlock();
  cv.notify_one();
}

void Timeline::ValidateVideo() {
  dirty_video_ = false;
}

void Timeline::ValidateAudio() {
  dirty_audio_ = false;
}

int64_t Timeline::ConvertTimecodeToMicrosecond(timecode_t timecode) const {
  // Currently 29.97 non-drop frame
  return 1000000 * (int64_t)timecode / 30;
}
timecode_t Timeline::ConvertMicrosecondToTimecode(int64_t micro) const {
  // Currently 29.97 non-drop frame
  return 30 * micro / 1000000;
}

// NAPI
NAPI_DEFINE_CLASS(Timeline, 
    NAPI_PROPERTY_VALUE("layers", napi_configurable, NAPI_MOBX_OBSERVABLE),
    NAPI_PROPERTY_VALUE("totalTimecode", napi_configurable, NAPI_MOBX_OBSERVABLE),
    NAPI_PROPERTY_FUNCTION("AddTimelineLayer", NAPI_AddTimelineLayer, napi_default),
    NAPI_PROPERTY_FUNCTION("AddResourceTimelineItem", NAPI_AddResourceTimelineItem, napi_default),
    NAPI_PROPERTY_FUNCTION("MoveTimelineItem", NAPI_MoveTimelineItem, napi_default),
    NAPI_PROPERTY_FUNCTION("DirtyVideo", NAPI_DirtyVideo, napi_default),
    NAPI_PROPERTY_FUNCTION("DirtyAudio", NAPI_DirtyAudio, napi_default),
    NAPI_PROPERTY_FUNCTION("SetTimestamp", NAPI_SetTimestamp, napi_default))

napi_value Timeline::_NAPI_AddTimelineLayer() {
  std::unique_lock<std::mutex> lock(m);
  TimelineLayer* const layer = AddTimelineLayer();
  return layer->napi_instance();
}

napi_value Timeline::_NAPI_AddResourceTimelineItem(TimelineLayer* const layer,
    int start_timecode, int end_timecode, Resource* const resource) {
  std::unique_lock<std::mutex> lock(m);
  TimelineItem* const item = AddTimelineItem(layer, start_timecode, end_timecode, resource);
  return item->napi_instance();
}

napi_value Timeline::_NAPI_MoveTimelineItem(TimelineLayer* const layer,
    TimelineItem* const item, int start_timecode, int end_timecode) {
  std::unique_lock<std::mutex> lock(m);
  MoveTimelineItem(layer, item, start_timecode, end_timecode);
  return NULL;
}

napi_value Timeline::_NAPI_DirtyVideo() {
  Invalidate(0);
  return NULL;
}

napi_value Timeline::_NAPI_DirtyAudio() {
  Invalidate(0);
  return NULL;
}

napi_value Timeline::_NAPI_SetTimestamp(int64_t timestamp) {
  std::unique_lock<std::mutex> lock(m);
  SetTimestamp(timestamp);
  return NULL;
}

std::unique_ptr<Timeline> Timeline::instance_;

} // namespace olive