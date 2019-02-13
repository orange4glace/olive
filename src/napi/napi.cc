#include "napi/napi.h"

#include "napi/napi_encoder.h"
#include "napi/es6/map.h"
#include "napi/es6/observable_map.h"

#include "resource/resource_manager.h"
#include "resource/resource.h"

#include "decoder/memory_pool.h"
#include "decoder/video_decoder_manager.h"
#include "decoder/audio_decoder_manager.h"

#include <iostream>
#include <muteX>

namespace olive {

namespace {

napi_value FreeMemory(napi_env env, napi_callback_info cbinfo) {
  napi_value argv[2];
  size_t argc = 2;
  uint64_t addr;
  int size;
  bool lossess;

  napi_get_cb_info(env, cbinfo, &argc, argv, NULL, NULL);
  
  NAPI_CALL(napi_get_value_bigint_uint64(env, argv[0], &addr, &lossess));
  NAPI_CALL(napi_get_value_int32(env, argv[1], &size));

  uintptr_t ptr = (uintptr_t)addr;
  MemoryPool::Free(ptr, size);

  return NULL;
}

}

void napi::Initialize(napi_env env, napi_callback_info cb_info) {
  // Mobx.decorate, Mobx.observe, Mobx.computed
  napi_value global = napi::get_global();

  size_t argc = 1;
  napi_value argv[1];
  NAPI_CALL(napi_get_cb_info(env, cb_info, &argc, argv, NULL, NULL));
  NAPI_CALL(napi_create_reference(env, argv[0], 1, &log_ref_));

}

void napi::ExportNamedProperty(const char* name, napi_value value) {
  napi_value export_ = GetReferenceValue(export_ref_);
  NAPI_CALL(napi_set_named_property(env_, export_, name, value));
}

napi_ref napi::CreateReference(napi_value value, int initial_refcount) {
  napi_ref ref;
  NAPI_CALL(napi_create_reference(env_, value, initial_refcount, &ref));
  return ref;
}

napi_value napi::GetReferenceValue(napi_ref ref) {
  napi_value value;
  NAPI_CALL(napi_get_reference_value(env_, ref, &value));
  return value;
}

napi_value napi::SetNamedProperty(napi_value object, const char* name, napi_value value) {
  napi_env env = napi::current_env();
  NAPI_CALL(napi_set_named_property(env, object, name, value));
  napi_value set_value;
  NAPI_CALL(napi_get_named_property(env, object, name, &set_value));
  return set_value;
}

napi_value napi::SetNamedProperty(napi_value object, const char* name, napi_value value, napi_ref* ref) {
  napi_env env = napi::current_env();
  napi_value set_value = SetNamedProperty(object, name, value);
  NAPI_CALL(napi_create_reference(env, set_value, 1, ref));
  return set_value;
}

napi_value napi::SetNamedProperty(napi_ref napi_object_ref, const char* name, napi_value value, napi_ref* ref) {
  napi_env env = napi::current_env();
  napi_value v;
  NAPI_CALL(napi_get_reference_value(env, napi_object_ref, &v));
  return SetNamedProperty(v, name, value, ref);
}

napi_value napi::SetNamedProperty(napi_ref napi_object_ref, const char* name, napi_value value) {
  napi_env env = napi::current_env();
  napi_value v;
  NAPI_CALL(napi_get_reference_value(env, napi_object_ref, &v));
  return SetNamedProperty(v, name, value);
}

napi_value napi::SetProperty(napi_value object, napi_value name, napi_value value) {
  napi_env env = napi::current_env();
  NAPI_CALL(napi_set_property(env, object, name, value));
  napi_value set_value;
  NAPI_CALL(napi_get_property(env, object, name, &set_value));
  return set_value;
}

napi_value napi::SetProperty(napi_value object, napi_value name, napi_value value, napi_ref* ref) {
  napi_env env = napi::current_env();
  napi_value set_value = SetProperty(object, name, value);
  NAPI_CALL(napi_create_reference(env, set_value, 1, ref));
  return set_value;
}

napi_value napi::SetProperty(napi_ref napi_object_ref, napi_value name, napi_value value, napi_ref* ref) {
  napi_env env = napi::current_env();
  napi_value v;
  NAPI_CALL(napi_get_reference_value(env, napi_object_ref, &v));
  return SetProperty(v, name, value, ref);
}

napi_value napi::SetProperty(napi_ref napi_object_ref, napi_value name, napi_value value) {
  napi_env env = napi::current_env();
  napi_value v;
  NAPI_CALL(napi_get_reference_value(env, napi_object_ref, &v));
  return SetProperty(v, name, value);
}

napi_value napi::GetNamedProperty(napi_value object, const char* name) {
  napi_env env = napi::current_env();
  napi_value value;
  NAPI_CALL(napi_get_named_property(env, object, name, &value));
  return value;
}

napi_value napi::GetNamedProperty(napi_value object, const char* name, napi_ref* reff) {
  napi_env env = napi::current_env();
  napi_value value;
  NAPI_CALL(napi_get_named_property(env, object, name, &value));
  *reff = ref(value);
  return value;
}

void napi::DeleteNamedProperty(napi_value napi_object, const char* name) {
  napi_env env = napi::current_env();
  napi_value napi_name;
  NAPI_CALL(napi_create_string_utf8(env, name, NAPI_AUTO_LENGTH, &napi_name));
  NAPI_CALL(napi_delete_property(env, napi_object, napi_name, NULL));
}

void napi::DeleteNamedProperty(napi_ref napi_object_ref, const char* name) {
  napi_env env = napi::current_env();
  napi_value napi_object;
  NAPI_CALL(napi_get_reference_value(env, napi_object_ref, &napi_object));
  DeleteNamedProperty(napi_object, name);
}

napi_value napi::ObjectAssign(size_t size, napi_value* target_and_sources) {
  napi_value assign = unref(object_assign_ref_);
  NAPI_CALL(
      napi_call_function(current_env(), get_global(), assign, size, target_and_sources, NULL));
  return (napi_value)*target_and_sources;
}

void napi::log(napi_value value) {
  NAPI_CALL(
      napi_call_function(env_, get_global(), GetReferenceValue(log_ref_), 1, &value, NULL));
}

void napi::set_current_env(napi_env env) {
  env_ = env;
}

napi_env napi::current_env() {
  return env_;
}

napi_ref napi::ref(napi_value value, int initial_refcount) {
  napi_ref ref;
  NAPI_CALL(napi_create_reference(env_, value, initial_refcount, &ref));
  return ref;
}

napi_value napi::unref(napi_ref& ref) {
  napi_value value;
  NAPI_CALL(napi_get_reference_value(
      napi::current_env(), ref, &value));
  return value;
}

napi_value napi::get_global() {
  napi_value object;
  napi_get_global(napi::current_env(), &object);
  return object;
}

napi_value napi::create_empty_object() {
  napi_value object;
  napi_create_object(napi::current_env(), &object);
  return object;
}

napi_value napi::create_object() {
  napi_value object;
  napi_create_object(napi::current_env(), &object);
  return object;
}

napi_value napi::create_array() {
  napi_value object;
  napi_create_array(napi::current_env(), &object);
  return object;
}

napi_value napi::create_undefined() {
  napi_value undefined;
  napi_get_undefined(napi::current_env(), &undefined);
  return undefined;
}

napi_value napi::create_string(const char* str) {
  napi_value nv;
  NAPI_CALL(napi_create_string_utf8(napi::current_env(), str, NAPI_AUTO_LENGTH, &nv));
  return nv;
}

napi_value napi::mobx() {
  napi_value mobx;
  NAPI_CALL(napi_get_reference_value(env_, mobx_ref_, &mobx));
  return mobx;
}

napi_value napi::mobx_decorate() {
  napi_value decorate;
  NAPI_CALL(napi_get_reference_value(env_, mobx_decorate_ref_, &decorate));
  return decorate;
}

napi_value napi::mobx_observable() {
  napi_value observable;
  NAPI_CALL(napi_get_reference_value(env_, mobx_observable_ref_, &observable));
  return observable;
}

napi_value napi::mobx_computed() {
  napi_value computed;
  NAPI_CALL(napi_get_reference_value(env_, mobx_computed_ref_, &computed));
  return computed;
}

napi_env napi::env_ = NULL;
napi_ref napi::export_ref_ = NULL;
napi_ref napi::object_assign_ref_ = NULL;
napi_ref napi::mobx_ref_ = NULL;
napi_ref napi::mobx_decorate_ref_ = NULL;
napi_ref napi::mobx_observable_ref_ = NULL;
napi_ref napi::mobx_computed_ref_ = NULL;
napi_ref napi::log_ref_ = NULL;

}