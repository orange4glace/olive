#include "napi/es6/observable_map.h"

#include "napi/napi_encoder.h"

namespace olive {

namespace es6 {

void ObservableMap::Initialize() {
  napi_value global = napi::get_global();
  constructor_ref_ = napi::ref(napi::GetNamedProperty(global, "Map"));
  napi_value observable_map = napi::GetNamedProperty(napi::mobx(), "ObservableMap");
  napi_value prototype = napi::GetNamedProperty(observable_map, "prototype");

  prototype_get_ref_ = napi::ref(napi::GetNamedProperty(prototype, "get"));
  prototype_set_ref_ = napi::ref(napi::GetNamedProperty(prototype, "set"));
}

napi_value ObservableMap::New() {
  napi_value instance;
  NAPI_CALL(napi_new_instance(napi::current_env(),
      napi::unref(constructor_ref_),
      0, NULL, &instance));
  return instance;
}

void ObservableMap::Set(napi_value instance, napi_value key, napi_value value) {
  napi_value argv[2];
  argv[0] = key;
  argv[1] = value;
  NAPI_CALL(napi_call_function(napi::current_env(),
      instance,
      napi::unref(prototype_set_ref_),
      2,
      argv,
      NULL));
}

void ObservableMap::Set(napi_ref ref, napi_value key, napi_value value) {
  Set(napi::unref(ref), key, value);
}

napi_value ObservableMap::Get(napi_value instance, napi_value key) {
  napi_value argv[1];
  argv[0] = key;
  napi_value value;
  NAPI_CALL(napi_call_function(napi::current_env(),
      instance,
      napi::unref(prototype_set_ref_),
      1,
      argv,
      &value));
  return value;
}

napi_value ObservableMap::Get(napi_ref ref, napi_value key) {
  return Get(napi::unref(ref), key);
}

napi_ref ObservableMap::constructor_ref_ = NULL;
napi_ref ObservableMap::prototype_set_ref_ = NULL;
napi_ref ObservableMap::prototype_get_ref_ = NULL;

}

}