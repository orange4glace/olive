#ifndef OLIVE_DECODER_MANAGER_H_
#define OLIVE_DECODER_MANAGER_H_

#include "resource/type.h"

#include "timeline/timeline_item_snapshot.h"

#include "napi/napi.h"

#include <vector>
#include <thread>
#include <mutex>
#include <condition_variable>
#include <stdint.h>

namespace olive {

class VideoDecoderHost;
class Resource;

class DecoderManager {
public:
  static void Initialize();
  static inline DecoderManager* const instance() {
    return instance_;
  }

  std::mutex m;
  std::condition_variable cv;

  std::vector<TimelineItemSnapshot> host_waiter_result;

private:
  static DecoderManager* instance_;

  // Run on a separate thread
  void loop();

  void DecodeVideo(std::vector<TimelineItemSnapshot> snapshots);

  std::thread loop_thread_;

  napi_threadsafe_function tsfn_callback_;
  

};

}

#endif OLIVE_DECODER_MANAGER_H_