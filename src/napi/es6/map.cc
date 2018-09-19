#include "napi/es6/map.h"

#include "napi/napi.h"
#include "napi/napi_encoder.h"

namespace olive {

namespace es6 {

void Map::Initialize() {
  napi_value global = napi::get_global();
  constructor_ = napi::GetNamedProperty(global, "Map");
  napi_value prototype = napi::GetNamedProperty(constructor_, "prototype");

  prototype_get_ = napi::GetNamedProperty(prototype, "get");
  prototype_set_ = napi::GetNamedProperty(prototype, "set");
}

napi_value Map::New() {
  napi_value instance;
  NAPI_CALL(napi_new_instance(napi::current_env(),
      constructor_,
      0, NULL, &instance));
  return instance;
}

void Map::Set(napi_value instance, napi_value key, napi_value value) {
  napi_value argv[2];
  argv[0] = key;
  argv[1] = value;
  NAPI_CALL(napi_call_function(napi::current_env(),
      instance,
      prototype_set_,
      2,
      argv,
      NULL));
}

void Map::Set(napi_ref ref, napi_value key, napi_value value) {
  Set(napi::unref(ref), key, value);
}

napi_value Map::Get(napi_value instance, napi_value key) {
  napi_value argv[1];
  argv[0] = key;
  napi_value value;
  NAPI_CALL(napi_call_function(napi::current_env(),
      instance,
      prototype_set_,
      1,
      argv,
      &value));
  return value;
}

napi_value Map::Get(napi_ref ref, napi_value key) {
  return Get(napi::unref(ref), key);
}

napi_value Map::constructor_ = NULL;
napi_value Map::prototype_set_ = NULL;
napi_value Map::prototype_get_ = NULL;

}

}