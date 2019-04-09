## No longer used.

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

    void Initialize(napi_env env, char* tsfn_function, char* tsfn_resource_name);
    void Push(std::vector<TimelineItemSnapshot> s);
    void Rendered();
    void Render();

    std::mutex m;
    std::vector<TimelineItemSnapshot> pending_snapshots;
    std::vector<TimelineItemSnapshot> rendering_snapshots;
    napi_threadsafe_function tsfn_render;

    bool pending;
    bool rendering;

    std::string name;

  };

}

#endif // OLIVE_SNAPSHOT_QUEUE_H_