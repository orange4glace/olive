#ifndef OLIVE_NAPI_INSTANCEABLE_H_
#define OLIVE_NAPI_INSTANCEABLE_H_

#include "napi/napi.h"

namespace olive {

class NAPI_Instanceable {

public:
  void NAPI_CreateInstance(T* native_this, napi_value constructor);
  napi_value napi_instance();

private:
  napi_ref __napi_instance_ref_;
  static napi_ref __napi_constructor_reference_;

} // class NAPI_instanceable

} // namespace olive

#endif // OLIVE_NAPI_INSTANCEABLE_H_