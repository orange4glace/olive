#ifndef OLIVE_DECODER_MANAGER_H_
#define OLIVE_DECODER_MANAGER_H_

namespace olive {

class Decoder;
class Resource;

class DecoderManager {
public:
  void Initialize();
  inline DecoderManager* const instance() {
    return instance_;
  }

  void AddDecoderFromResource(const Resource* const resource) throw (const char*);

private:
  DecoderManager* instance_;

};

}

#endif OLIVE_DECODER_MANAGER_H_