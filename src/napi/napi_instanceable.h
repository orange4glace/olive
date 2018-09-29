#ifndef OLIVE_NAPI_INSTANCEABLE_H_
#define OLIVE_NAPI_INSTANCEABLE_H_

#include "napi/napi.h"

namespace olive {

class NAPI_Instanceable {

public:
  napi_value NAPI_SetInstanceNamedProperty(const char* name, napi_value value);
  napi_value NAPI_SetInstanceNamedProperty(const char* name, napi_value value, napi_ref* ref);

  napi_value NAPI_GetInstanceNamedProperty(const char* name);

  void NAPI_DeleteInstanceNamedProperty(const char* name);

  inline napi_value napi_instance() {
    return napi::unref(__napi_instance_ref_);
  }

protected:
  void __NAPI_CreateInstance(void* native_this, napi_value constructor);

protected:
  inline NAPI_Instanceable() {}

private:
  napi_ref __napi_instance_ref_;

}; // class NAPI_instanceable

} // namespace olive

#endif // OLIVE_NAPI_INSTANCEABLE_H_