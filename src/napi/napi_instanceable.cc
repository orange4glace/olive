#include "napi/napi_instanceable.h"

namespace olive {

NAPI_Instanceable::NAPI_Instanceable(NAPI_InstanceableHelper& helper) {
  helper.NAPI_CreateInstance(this);
}

void NAPI_Instanceable::__NAPI_CreateInstance(void* native_this, napi_value constructor) {
  napi_env env = napi::current_env();
  napi_value extern_this;
  napi_value napi_instance;
  NAPI_CALL(napi_new_instance(env, constructor, 0, NULL, &napi_instance));
  NAPI_CALL(napi_create_external(env, (void*)native_this, NULL, NULL, &extern_this));
  NAPI_CALL(napi_set_named_property(env, napi_instance, "native", extern_this));
  NAPI_CALL(napi_create_reference(env, napi_instance, 1, &__napi_instance_ref_));
}

napi_value NAPI_Instanceable::NAPI_SetInstanceNamedProperty(const char* name, napi_value value) {
  return napi::SetNamedProperty(__napi_instance_ref_, name, value);
}

napi_value NAPI_Instanceable::NAPI_SetInstanceNamedProperty(const char* name, napi_value value, napi_ref* ref) {
  return napi::SetNamedProperty(__napi_instance_ref_, name, value, ref);
}

napi_value NAPI_Instanceable::NAPI_GetInstanceNamedProperty(const char* name) {
  return napi::GetNamedProperty(napi::unref(__napi_instance_ref_), name);
}

void NAPI_Instanceable::NAPI_DeleteInstanceNamedProperty(const char* name) {
  napi::DeleteNamedProperty(__napi_instance_ref_, name);
}

}