#ifndef OLIVE_TIMELINE_H_
#define OLIVE_TIMELINE_H_

#include "napi/napi.h"
#include "napi/napi_export.h"
#include "napi/napi_instanceable.h"

#include "timeline/timeline_typedef.h"
#include "timeline/timeline_item_snapshot.h"

#include <memory>
#include <map>
#include <mutex>
#include <condition_variable>

namespace olive {

class Resource;

class TimelineLayer;
class TimelineItem;

class Timeline : public NAPI_Instanceable {
NAPI_DECLARE_CLASS(Timeline, "Timeline")

public:
  Timeline();
  ~Timeline();

  static void Initialize();
  static Timeline* const instance();

  TimelineLayer* const GetTimelineLayer(timeline_layer_id index);
  TimelineLayer* const AddTimelineLayer();
  void RemoveTimelineLayer(timeline_layer_id id);

  TimelineItem* const AddTimelineItem(TimelineLayer* const layer, int start_offset, int end_offset, Resource* const resource);
  void RemoveTimelineItem(timeline_item_id id);
  void MoveTimelineItem(TimelineLayer* const layer, TimelineItem* const item,
                        int start_offset, int end_offset);

  std::vector<TimelineItem* const> GetCurrentTimestampTimelineItems();

  std::vector<TimelineItemSnapshot> GetCurrentTimestampTimelineItemSnapshots() const;

  void SetTimestamp(int64_t timestamp);
  void Invalidate(TimelineItem* const timeline_item);
  void ValidateVideo();
  void ValidateAudio();

  bool dirty_video() const { return dirty_video_; }
  bool dirty_audio() const { return dirty_audio_; }

  std::mutex m;
  std::condition_variable cv;

  // NAPI
  napi_value _NAPI_AddTimelineLayer();
  napi_value _NAPI_AddResourceTimelineItem(TimelineLayer* const layer, int start_offset, int end_offset, Resource* const resource);
  napi_value _NAPI_MoveTimelineItem(TimelineLayer* const layer, TimelineItem* const item,
                                    int start_offset, int end_offset);

  napi_value _NAPI_DirtyVideo();
  napi_value _NAPI_DirtyAudio();
  napi_value _NAPI_SetTimestamp(int64_t timestamp);
  
  NAPI_EXPORT_FUNCTION0(Timeline, NAPI_AddTimelineLayer, _NAPI_AddTimelineLayer);
  NAPI_EXPORT_FUNCTION(Timeline, NAPI_AddResourceTimelineItem, _NAPI_AddResourceTimelineItem,
      TimelineLayer* const, int, int, Resource* const);
  NAPI_EXPORT_FUNCTION(Timeline, NAPI_MoveTimelineItem, _NAPI_MoveTimelineItem,
      TimelineLayer* const, TimelineItem* const, int, int);

  // Temporary for test
  NAPI_EXPORT_FUNCTION0(Timeline, NAPI_DirtyVideo, _NAPI_DirtyVideo);
  NAPI_EXPORT_FUNCTION0(Timeline, NAPI_DirtyAudio, _NAPI_DirtyAudio);
  NAPI_EXPORT_FUNCTION(Timeline, NAPI_SetTimestamp, _NAPI_SetTimestamp,
      int64_t);

private:
  static std::unique_ptr<Timeline> instance_;

  int64_t timestamp_;

  std::map<timeline_layer_id, std::unique_ptr<TimelineLayer>> timeline_layers_;

  napi_ref napi_layers_ref_;
  
  bool dirty_video_;
  bool dirty_audio_;

};

} // class Timeline

#endif // OLIVE_TIMELINE_H_