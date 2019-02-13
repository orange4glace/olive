#include "napi/napi.h"

#include "api.h"
#include "logger/logger.h"

#include <iostream>

using namespace olive;

void CleanUpHook(void* args) {
  std::cout << "Cleanup Hook\n";
}

napi_value UserInitilaize(napi_env env, napi_callback_info cb_info) {
  napi::set_current_env(env);
  napi::Initialize(env, cb_info);

  OliveAPI::NAPI_Initialize(env);

  OliveAPI* api = new OliveAPI();

  return api->napi_instance();
}

napi_value Init(napi_env env, napi_value exports) {
  napi::set_current_env(env);

  logger::Initialize();
  
  std::cout << "[Native Module] Init\n";
  logger::get()->info("[Module] Initialize");
  napi_add_env_cleanup_hook(env, CleanUpHook, NULL);

  napi_value fn1;
  NAPI_CALL(napi_create_function(env, NULL, 0, UserInitilaize, NULL, &fn1));
  NAPI_CALL(napi_set_named_property(env, exports, "initialize", fn1));

  return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init);