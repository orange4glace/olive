#include "napi/napi.h"

#include "napi/napi_encoder.h"
#include "napi/es6/map.h"
#include "napi/es6/observable_map.h"

#include "timeline/timeline.h"
#include "timeline/timeline_layer.h"
#include "timeline/timeline_item.h"

#include "resource/resource_manager.h"
#include "resource/resource.h"

#include "decoder/memory_pool.h"
#include "decoder/video_decoder_manager.h"

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

napi_value Rendered(napi_env env, napi_callback_info cbinfo) {
  VideoDecoderManager::instance()->Rendered();

  return NULL;
}

}

void napi::Initialize(napi_env env, napi_value exports) {
  napi::set_current_env(env);

  napi_value fn1;
  NAPI_CALL(napi_create_function(env, NULL, 0, NAPI_Initialize, NULL, &fn1));
  NAPI_CALL(napi_set_named_property(env, exports, "initialize", fn1));
}

napi_value napi::NAPI_Initialize(napi_env env, napi_callback_info cb_info) {
  // Mobx.decorate, Mobx.observe, Mobx.computed
  napi::set_current_env(env);
  napi_value global = napi::get_global();

  size_t argc = 2;
  napi_value argv[2];
  NAPI_CALL(napi_get_cb_info(env, cb_info, &argc, argv, NULL, NULL));
  napi_value mobx_ = argv[0];
  NAPI_CALL(napi_create_reference(env, mobx_, 1, &mobx_ref_));
  NAPI_CALL(napi_create_reference(env, argv[1], 1, &log_ref_));

  napi_value Object = napi::GetNamedProperty(global, "Object");
  napi::GetNamedProperty(Object, "assign", &object_assign_ref_);
  std::cout << "NAPI Initialize\n";

  napi_value decorate, observable, computed;
  NAPI_CALL(napi_get_named_property(env, mobx_, "decorate", &decorate));
  NAPI_CALL(napi_get_named_property(env, mobx_, "observable", &observable));
  NAPI_CALL(napi_get_named_property(env, mobx_, "computed", &computed));

  NAPI_CALL(napi_create_reference(env, decorate, 1, &mobx_decorate_ref_));
  NAPI_CALL(napi_create_reference(env, observable, 1, &mobx_observable_ref_));
  NAPI_CALL(napi_create_reference(env, computed, 1, &mobx_computed_ref_));
  std::cout << "Timeline Initialize\n";

  es6::Map::Initialize();
  es6::ObservableMap::Initialize();

  napi_value export_ = create_empty_object();
  export_ref_ = CreateReference(export_);

  std::cout << "Timeline Initialize\n";
  Timeline::NAPI_Initialize(env);
  std::cout << "Timeline NAPI Initialize\n";
  Timeline::Initialize();

  std::cout << "TimelineLayer NAPI Initialize\n";
  TimelineLayer::NAPI_Initialize(env);
  std::cout << "TimelineItem NAPI Initialize\n";
  TimelineItem::NAPI_Initialize(env);

  std::cout << "ResourceManager Initialize\n";
  ResourceManager::NAPI_Initialize(env);
  std::cout << "ResourceManager Initialize\n";
  ResourceManager::Initialize();

  std::cout << "Resource NAPI Initialize\n";
  Resource::NAPI_Initialize(env);

  std::cout << "DecoderManager Initialize\n";
  VideoDecoderManager::Initialize();

  std::cout << "Export..\n";
  ExportNamedProperty("timeline", Timeline::instance()->napi_instance());
  ExportNamedProperty("resource", ResourceManager::instance()->napi_instance());

  napi_value freefn;
  NAPI_CALL(napi_create_function(env, "Free", NAPI_AUTO_LENGTH, FreeMemory, NULL, &freefn));
  ExportNamedProperty("Free", freefn);

  napi_value renderedfn;
  NAPI_CALL(napi_create_function(env, "Rendered", NAPI_AUTO_LENGTH, Rendered, NULL, &renderedfn));
  ExportNamedProperty("Rendered", renderedfn);

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