#ifndef OLIVE_NAPI_SYNC_VALUE_H_
#ifndef OLIVE_NAPI_SYNC_VALUE_H_

#include "napi/napi.h"

namespace olive {

template <typename NativeType>
class NAPISyncValue {
public:
  NAPISyncValue(NativeType* ptr, napi_ref* ref) :
      ptr_(ptr), ref_(ref) {
  }

  void Set(NativeType&& value) {
    *ptr = value;
  }

  T& Get() {
    return *ptr;
  }

private:
  NativeType* ptr_;
  napi_ref* ref_;

};

template <>
class NAPISyncValue<int> {
public:
  void Set(int&& value) {
    napi_env env = NAPI
    *ptr = value;
    napi_value nv = NAPI_CALL(napi_create_int32(env, value, &ret));
    *ref_ = napi::ref(nv);
  }
};

}

#ifndef OLIVE_NAPI_SYNC_VALUE_H_