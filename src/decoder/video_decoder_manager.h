#ifndef OLIVE_VIDEO_DECODER_MANAGER_H_
#define OLIVE_VIDEO_DECODER_MANAGER_H_

#include "napi/napi.h"
#include "typedef.h"

#include <vector>
#include <map>
#include <thread>
#include <mutex>
#include <condition_variable>
#include <stdint.h>

namespace olive {

class VideoDecoderHost;
class Resource;

class VideoDecoderManager {
public:
  static void Initialize();
  static inline VideoDecoderManager* const instance() {
    return instance_;
  }

  napi_promise Decode(ResourceID resource_id, timecode_t timecode);

private:
  static VideoDecoderManager* instance_;

  std::map<ResourceID, VideoDecoderHost*> decoder_hosts_;
  
};

}

#endif OLIVE_DECODER_MANAGER_H_