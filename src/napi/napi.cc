#include "napi/napi.h"

#include "napi/napi_encoder.h"
#include "napi/es6/map.h"
#include "napi/es6/observable_map.h"

#include <iostream>

#include "timeline/timeline.h"
#include "timeline/timeline_layer.h"
#include "timeline/timeline_item.h"

#include "resource/resource_manager.h"
#include "resource/resource.h"

namespace olive {

void napi::Initialize(napi_env env, napi_value exports) {
  napi::set_current_env(env);

  napi_value fn1;
  NAPI_CALL(napi_create_function(env, NULL, 0, NAPI_Initialize, NULL, &fn1));
  NAPI_CALL(napi_set_named_property(env, exports, "initialize", fn1));
}

napi_value napi::NAPI_Initialize(napi_env env, napi_callback_info cb_info) {
  // Mobx.decorate, Mobx.observe, Mobx.computed
  napi::set_current_env(env);
  size_t argc = 2;
  napi_value argv[2];
  NAPI_CALL(napi_get_cb_info(env, cb_info, &argc, argv, NULL, NULL));
  napi_value mobx_ = argv[0];
  NAPI_CALL(napi_create_reference(env, mobx_, 1, &mobx_ref_));
  NAPI_CALL(napi_create_reference(env, argv[1], 1, &log_ref_));

  napi_value decorate, observable, computed;
  NAPI_CALL(napi_get_named_property(env, mobx_, "decorate", &decorate));
  NAPI_CALL(napi_get_named_property(env, mobx_, "observable", &observable));
  NAPI_CALL(napi_get_named_property(env, mobx_, "computed", &computed));

  NAPI_CALL(napi_create_reference(env, decorate, 1, &mobx_decorate_ref_));
  NAPI_CALL(napi_create_reference(env, observable, 1, &mobx_observable_ref_));
  NAPI_CALL(napi_create_reference(env, computed, 1, &mobx_computed_ref_));

  es6::Map::Initialize();
  es6::ObservableMap::Initialize();

  napi_value export_ = create_empty_object();
  export_ref_ = CreateReference(export_);

  Timeline::NAPI_Initialize(env);
  Timeline::Initialize();

  TimelineLayer::NAPI_Initialize(env);
  TimelineItem::NAPI_Initialize(env);

  ResourceManager::NAPI_Initialize(env);
  ResourceManager::Initialize();

  Resource::NAPI_Initialize(env);

  ExportNamedProperty("timeline", Timeline::instance()->napi_instance());
  ExportNamedProperty("resource", ResourceManager::instance()->napi_instance());

  return export_;
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

napi_value napi::GetNamedProperty(napi_value object, const char* name) {
  napi_env env = napi::current_env();
  napi_value value;
  NAPI_CALL(napi_get_named_property(env, object, name, &value));
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
napi_ref napi::mobx_ref_ = NULL;
napi_ref napi::mobx_decorate_ref_ = NULL;
napi_ref napi::mobx_observable_ref_ = NULL;
napi_ref napi::mobx_computed_ref_ = NULL;
napi_ref napi::log_ref_ = NULL;

}