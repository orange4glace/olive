#ifndef OLIVE_NAPI_ENCODER_H_
#define OLIVE_NAPI_ENCODER_H_

#include "napi/napi.h"

#include <string>

namespace olive {

template <typename T>
struct napi_encoder {
  inline static napi_value encode(T native) {
    napi_env env = napi::current_env();
    napi_value value;
    NAPI_CALL(napi_create_external(env, (void*)native, NULL, NULL, &value));
    return value;
  }
};

template <>
struct napi_encoder<napi_value> {
  inline static napi_value encode(napi_value value) {
    napi_env env = napi::current_env();
    return value;
  }
};

template <>
struct napi_encoder<int32_t> {
  inline static napi_value encode(int32_t value) {
    napi_env env = napi::current_env();
    napi_value ret;
    NAPI_CALL(napi_create_int32(env, value, &ret));
    return ret;
  }
};

template <>
struct napi_encoder<uint32_t> {
  inline static napi_value encode(uint32_t value) {
    napi_env env = napi::current_env();
    napi_value ret;
    NAPI_CALL(napi_create_uint32(env, value, &ret));
    return ret;
  }
};

template <>
struct napi_encoder<uint64_t> {
  inline static napi_value encode(uint64_t value) {
    napi_env env = napi::current_env();
    napi_value ret;
    NAPI_CALL(napi_create_bigint_uint64(env, value, &ret));
    return ret;
  }
};

template <>
struct napi_encoder<const char*> {
  inline static napi_value encode(const char* value) {
    napi_env env = napi::current_env();
    napi_value ret;
    NAPI_CALL(napi_create_string_utf8(env, value, NAPI_AUTO_LENGTH, &ret));
    return ret;
  }
  inline static napi_value encode(std::string& value) {
    napi_env env = napi::current_env();
    napi_value ret;
    NAPI_CALL(napi_create_string_utf8(env, value.c_str(), NAPI_AUTO_LENGTH, &ret));
    return ret;
  }
};

template <>
struct napi_encoder<std::string> {
  inline static napi_value encode(std::string& value) {
    napi_env env = napi::current_env();
    napi_value ret;
    NAPI_CALL(napi_create_string_utf8(env, value.c_str(), NAPI_AUTO_LENGTH, &ret));
    return ret;
  }
};

}

#endif // OLIVE_NAPI_ENCODER_H_