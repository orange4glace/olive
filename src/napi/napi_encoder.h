#ifndef OLIVE_NAPI_ENCODER_H_
#define OLIVE_NAPI_ENCODER_H_

#include <node_api.h>

#include "napi/napi.h"

namespace olive {

template <typename T>
struct napi_encoder {
  inline static napi_value encode(napi_env env, T native) {
    napi_value value;
    NAPI_CALL(napi_create_external(env, (void*)native, NULL, NULL, &value));
    return value;
  }
};

template <>
struct napi_encoder<napi_value> {
  inline static napi_value encode(napi_env env, napi_value value) {
    return value;
  }
};

}

#endif // OLIVE_NAPI_ENCODER_H_