#ifndef OLIVE_AUDIO_DECODER_MANAGER_H_
#define OLIVE_AUDIO_DECODER_MANAGER_H_

#include "resource/type.h"
#include "util/object_pool.h"

#include "napi/napi.h"

#include <vector>
#include <thread>
#include <mutex>
#include <condition_variable>
#include <stdint.h>

namespace olive {

class AudioDecoderHost;
class AudioFrame;
class Resource;

class AudioDecoderManager {
public:
/*
  static void Initialize();
  static inline AudioDecoderManager* const instance() {
    return instance_;
  }

  void Rendered();

  std::mutex m;
  std::condition_variable cv;

  std::vector<TimelineItemSnapshot> host_waiter_result;
  ObjectPool<AudioFrame*> frame_pool;

private:
  static AudioDecoderManager* instance_;

  // Run on a separate thread
  void loop();

  void Decode(std::vector<TimelineItemSnapshot> snapshots);

  std::thread loop_thread_;

  SnapshotQueue render_queue_;
*/
};

}

#endif OLIVE_DECODER_MANAGER_H_