#ifndef OLIVE_SNAPSHOT_QUEUE_H_
#define OLIVE_SNAPSHOT_QUEUE_H_

#include "timeline/timeline_item_snapshot.h"

#include "napi/napi.h"

#include <vector>
#include <mutex>
#include <condition_variable>

namespace olive {

  struct SnapshotQueue {

    void Initialize(napi_env env);
    void Push(std::vector<TimelineItemSnapshot> s);

    std::mutex m;
    std::vector<TimelineItemSnapshot> snapshots;
    napi_threadsafe_function tsfn_render;

    bool tsfn_flag;

  };

}

#endif // OLIVE_SNAPSHOT_QUEUE_H_