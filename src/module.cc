#include "napi/napi.h"

#include "timeline/timeline.h"
#include "timeline/timeline_layer.h"
#include "timeline/timeline_item.h"

#include "resource/resource_manager.h"

#include "decoder/decoder_manager.h"

#include "logger/logger.h"

#include <iostream>

using namespace olive;

void CleanUpHook(void* args) {
  std::cout << "Cleanup Hook\n";
}

napi_value Init(napi_env env, napi_value exports) {

  logger::Initialize();
  
  std::cout << "[Native Module] Init\n";
  logger::get()->info("[Module] Initialize");
  napi_add_env_cleanup_hook(env, CleanUpHook, NULL);

  napi::set_current_env(env);

  napi::Initialize(env, exports);

  return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init);