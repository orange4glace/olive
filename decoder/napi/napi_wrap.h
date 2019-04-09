#ifndef OLIVE_NAPI_NAPI_VALUE_H_
#define OLIVE_NAPI_NAPI_VALUE_H_

#include <type_traits>
#include <node_api.h>

namespace olive {

template <typename T>
class napi_wrap {
public:
  static inline T get(napi_env env, napi_value value) {
    std::remove_const<T>::type ret;
    napi_get_value_external(env, value, (void**)&ret);
    return ret;
  }

};

template <>
class napi_wrap<int> {
public:
  static inline int get(napi_env env, napi_value value) {
    int ret;
    napi_get_value_int32(env, value, &ret);
    return ret;
  }
};

template <>
class napi_wrap<napi_value> {
public:
  static inline napi_value get(napi_env env, napi_value value) {
    return value;
  }
};

}

#endif // OLIVE_NAPI_NAPI_VALUE_H_