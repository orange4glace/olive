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

private:
  static DecoderManager* instance_;

  // Run on a separate thread
  void loop();

};

}

#endif OLIVE_DECODER_MANAGER_H_