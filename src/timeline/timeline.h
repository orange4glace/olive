#ifndef OLIVE_TIMELINE_H_
#define OLIVE_TIMELINE_H_

#include <node_api.h>
#include "napi/napi_export.h"

#include <memory>
#include <map>

#include "timeline/timeline_typedef.h"

namespace olive {

class Media;

class TimelineLayer;
class TimelineItem;

class Timeline : public NAPI_Export<Timeline> {
NAPI_DEFINE_EXPORT(Timeline, "Timeline")

public:
  Timeline();
  ~Timeline();

  static void Initialize();
  static Timeline* const instance();

  TimelineLayer* const GetTimelineLayer(timeline_layer_id index);
  TimelineLayer* const AddTimelineLayer();
  void RemoveTimelineLayer(timeline_layer_id id);

  TimelineItem* const AddTimelineItem(TimelineLayer* const layer, int start_offset, int end_offset);
  void RemoveTimelineItem(timeline_item_id id);
  void MoveTimelineItem(TimelineLayer* const layer, TimelineItem* const item,
                        int start_offset, int end_offset);

  // NAPI
  napi_value _NAPI_AddTimelineLayer();
  napi_value _NAPI_AddTimelineItem(TimelineLayer* const layer, int start_offset, int end_offset);
  napi_value _NAPI_MoveTimelineItem(TimelineLayer* const layer, TimelineItem* const item,
                                    int start_offset, int end_offset);
  
  NAPI_EXPORT_FUNCTION0(Timeline, NAPI_AddTimelineLayer, _NAPI_AddTimelineLayer);
  NAPI_EXPORT_FUNCTION(Timeline, NAPI_AddTimelineItem, _NAPI_AddTimelineItem,
      TimelineLayer* const, int, int);
  NAPI_EXPORT_FUNCTION(Timeline, NAPI_MoveTimelineItem, _NAPI_MoveTimelineItem,
      TimelineLayer* const, TimelineItem* const, int, int);

private:
  static std::unique_ptr<Timeline> instance_;

  std::map<timeline_layer_id, std::unique_ptr<TimelineLayer>> timeline_layers_;

  napi_ref napi_layers_ref_;

};

} // class Timeline

#endif // OLIVE_TIMELINE_H_