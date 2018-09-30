#ifndef OLIVE_NAPI_NAPI_DECODER_H_
#define OLIVE_NAPI_NAPI_DECODER_H_

#include "napi/napi.h"
#include "resource/type.h"

#include <string>
#include <type_traits>

namespace olive {

template <typename T>
class napi_decoder {
public:
  static inline T decode(napi_value value) {
    napi_env env = napi::current_env();
    std::remove_const<T>::type ret;
    napi_get_value_external(env, value, (void**)&ret);
    return ret;
  }

};

template <>
class napi_decoder<int32_t> {
public:
  static inline int32_t decode(napi_value value) {
    napi_env env = napi::current_env();
    int32_t ret;
    NAPI_CALL(napi_get_value_int32(env, value, &ret));
    return ret;
  }
};

template <>
class napi_decoder<int64_t> {
public:
  static inline int64_t decode(napi_value value) {
    napi_env env = napi::current_env();
    int64_t ret;
    NAPI_CALL(napi_get_value_int64(env, value, &ret));
    std::cout << "Decode int64_t " << ret << "\n";
    return ret;
  }
};

template <>
class napi_decoder<uint32_t> {
public:
  static inline uint32_t decode(napi_value value) {
    napi_env env = napi::current_env();
    uint32_t ret;
    NAPI_CALL(napi_get_value_uint32(env, value, &ret));
    return ret;
  }
};

template <>
class napi_decoder<std::string> {
public:
  static inline std::string decode(napi_value value) {
    napi_env env = napi::current_env();
    char buf[1000];
    size_t length;
    NAPI_CALL(napi_get_value_string_utf8(env, value, buf, 1000, &length));
    return std::move(std::string(buf));
  }
};

template <>
class napi_decoder<napi_value> {
public:
  static inline napi_value decode(napi_value value) {
    return value;
  }
};

}

#endif // OLIVE_NAPI_NAPI_DECODER_H_