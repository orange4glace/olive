#ifndef OLIVE_DECODER_H_
#define OLIVE_DECODER_H_

#include "napi/napi_export.h"
#include "napi/napi_instanceable.h"

namespace olive {

class Resource;

class Decoder : public NAPI_Instanceable {
NAPI_DECLARE_CLASS(Decoder, "Decoder")

protected:
  inline Decoder() {}

public:

};

}

#endif // OLIVE_DECODER_H_