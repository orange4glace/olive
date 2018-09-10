#include "napi/napi.h"

#include <iostream>

namespace olive {

void napi::set_current_env(napi_env env) {
  env_ = env;
}

napi_env napi::current_env() {
  return env_;
}

napi_value napi::create_empty_object() {
  napi_value object;
  napi_create_object(napi::current_env(), &object);
  return object;
}

napi_env napi::env_ = NULL;

}