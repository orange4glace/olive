#ifndef OLIVE_DECODER_MANAGER_H_
#define OLIVE_DECODER_MANAGER_H_

namespace olive {

class Decoder;
class Resource;

class DecoderManager {
public:
  static void Initialize();
  static inline DecoderManager* const instance() {
    return instance_;
  }

  void AddDecoderFromResource(const Resource* const resource) throw (const char*);

private:
  static DecoderManager* instance_;

};

}

#endif OLIVE_DECODER_MANAGER_H_