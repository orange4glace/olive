#ifndef OLIVE_NAPI_INSTANCEABLE_H_
#define OLIVE_NAPI_INSTANCEABLE_H_

#include "napi/napi.h"
#include "napi/napi_export.h"

namespace olive {

class NAPI_Instanceable {

public:
  napi_value NAPI_SetInstanceNamedProperty(const char* name, napi_value value);
  napi_value NAPI_SetInstanceNamedProperty(const char* name, napi_value value, napi_ref* ref);

  napi_value NAPI_GetInstanceNamedProperty(const char* name);

  void NAPI_DeleteInstanceNamedProperty(const char* name);

  void __NAPI_CreateInstance(void* native_this, napi_value constructor);

  inline napi_value napi_instance() {
    return napi::unref(__napi_instance_ref_);
  }

  inline napi_ref& napi_instance_ref() {
    return __napi_instance_ref_;
  }
  
  NAPI_Instanceable(NAPI_InstanceableHelper& helper);

protected:
  // virtual void NAPI_CreateInstance() = 0;

private:
  napi_ref __napi_instance_ref_;

}; // class NAPI_instanceable

} // namespace olive

#endif // OLIVE_NAPI_INSTANCEABLE_H_