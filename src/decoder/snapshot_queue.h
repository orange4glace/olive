#ifndef OLIVE_SNAPSHOT_QUEUE_H_
#define OLIVE_SNAPSHOT_QUEUE_H_

#include "timeline/timeline_item_snapshot.h"

#include "napi/napi.h"

#include <vector>
#include <mutex>
#include <condition_variable>

namespace olive {

  struct Frame;

  struct SnapshotQueue {

    void Initialize(napi_env env);
    void Push(std::vector<TimelineItemSnapshot> s);
    void Rendered();
    void Render();

    void ScaleFrame(Frame* frame);

    std::mutex m;
    std::vector<TimelineItemSnapshot> pending_snapshots;
    std::vector<TimelineItemSnapshot> rendering_snapshots;
    napi_threadsafe_function tsfn_render;

    bool pending;
    bool rendering;

  };

}

#endif // OLIVE_SNAPSHOT_QUEUE_H_