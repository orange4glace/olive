#ifndef OLIVE_DECODER_MANAGER_H_
#define OLIVE_DECODER_MANAGER_H_

#include "resource/type.h"

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

  void AddDecoderHostFromResource(const Resource* const resource);

  void Decode(int64_t timestamp);

private:
  static DecoderManager* instance_;

  std::map<resource_id, VideoDecoderHost*> decoder_hosts_;


};

}

#endif OLIVE_DECODER_MANAGER_H_