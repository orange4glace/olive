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

  void CreateDecoderHost(Resource* const resource);
  napi_promise Decode(resource_id_t resource_id, timecode_t timecode, decoder_id_t decoder_id);
  int Acquire(resource_id_t resource_id, timecode_t timecode = 0);
  void Release(resource_id_t resource_id, decoder_id_t decoder_id);

private:
  static VideoDecoderManager* instance_;

  std::map<resource_id_t, VideoDecoderHost*> decoder_hosts_;
  
};

}

#endif OLIVE_DECODER_MANAGER_H_