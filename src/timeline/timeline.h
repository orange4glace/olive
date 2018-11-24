#ifndef OLIVE_TIMELINE_H_
#define OLIVE_TIMELINE_H_

#include "napi/napi.h"
#include "napi/napi_export.h"
#include "napi/napi_instanceable.h"
#include "napi/napi_sync_property.h"

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

  TimelineItem* const AddTimelineItem(TimelineLayer* const layer, int start_timecode, int end_timecode, Resource* const resource);
  void RemoveTimelineItem(timeline_item_id id);
  void MoveTimelineItem(TimelineLayer* const layer, TimelineItem* const item,
                        int start_timecode, int end_timecode);

  std::vector<TimelineItemSnapshot> GetTimelineItemSnapshotsAtCurrentTimecode() const;

  void SetCurrentTimecode(int timecode);

  void Invalidate(TimelineItem* const timeline_item);
  void ValidateVideo();
  void ValidateAudio();

  int64_t ConvertTimecodeToMicrosecond(timecode_t timecode) const;
  timecode_t ConvertMicrosecondToTimecode(int64_t micro) const;

  timecode_t RescaleToTimecode(int value, int timebase) const;
  int64_t RescaleFromTimecode(int value, int timebase) const;

  inline bool dirty_video() const { return dirty_video_; }
  inline bool dirty_audio() const { return dirty_audio_; }

  int timecode_timebase() const;

  std::mutex m;
  std::condition_variable cv;

  // NAPI
  napi_value _NAPI_AddTimelineLayer();
  napi_value _NAPI_AddResourceTimelineItem(TimelineLayer* const layer, int start_timecode, int end_timecode, Resource* const resource);
  napi_value _NAPI_MoveTimelineItem(TimelineLayer* const layer, TimelineItem* const item,
                                    int start_timecode, int end_timecode);

  napi_value _NAPI_SetCurrentTimecode(int timecode);
  napi_value _NAPI_IncreaseCurrentTimecodeInMillisecond(int milli);

  napi_value _NAPI_DirtyVideo();
  napi_value _NAPI_DirtyAudio();
  
  NAPI_EXPORT_FUNCTION0(Timeline, NAPI_AddTimelineLayer, _NAPI_AddTimelineLayer);
  NAPI_EXPORT_FUNCTION(Timeline, NAPI_AddResourceTimelineItem, _NAPI_AddResourceTimelineItem,
      TimelineLayer* const, int, int, Resource* const);
  NAPI_EXPORT_FUNCTION(Timeline, NAPI_MoveTimelineItem, _NAPI_MoveTimelineItem,
      TimelineLayer* const, TimelineItem* const, int, int);

  // Temporary for test
  NAPI_EXPORT_FUNCTION0(Timeline, NAPI_DirtyVideo, _NAPI_DirtyVideo);
  NAPI_EXPORT_FUNCTION0(Timeline, NAPI_DirtyAudio, _NAPI_DirtyAudio);
      
  NAPI_EXPORT_FUNCTION(Timeline, NAPI_SetCurrentTimecode, _NAPI_SetCurrentTimecode,
      int);
  NAPI_EXPORT_FUNCTION(Timeline, NAPI_IncreaseCurrentTimecodeInMillisecond, _NAPI_IncreaseCurrentTimecodeInMillisecond,
      int);

private:
  static std::unique_ptr<Timeline> instance_;

  std::map<timeline_layer_id, std::unique_ptr<TimelineLayer>> timeline_layers_;

  napi_ref napi_layers_ref_;

  NAPISyncProperty<int> timecode_timebase_;
  NAPISyncProperty<int> total_timecode_;
  NAPISyncProperty<int> current_timecode_;
  
  bool dirty_video_;
  bool dirty_audio_;

};

} // class Timeline

#endif // OLIVE_TIMELINE_H_