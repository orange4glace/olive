#include <iostream>

#include <node_api.h>

#include "napi/napi.h"

#include "timeline/timeline.h"
#include "timeline/timeline_layer.h"
#include "timeline/timeline_item.h"

#include "resource/resource_manager.h"

using namespace olive;

namespace {
  class K {
    public:
    K(int k){a = k;}
    int a;
  };
}

class Native {
public:
  Native(){}
};

napi_ref constructor_ref;

napi_value callback(napi_env, napi_callback_info cb_info) {
  return NULL;
} 

void Test(napi_env env) {
  napi_value constructor;
  napi_define_class(env, "MyClass", 7, callback,  NULL, 0, NULL, &constructor);
  napi_create_reference(env, constructor, 1, &constructor_ref);
}

napi_value ExternalTest(napi_env env, napi_callback_info cb) {
  napi_value ex;
  size_t s = 1;
  napi_get_cb_info(env, cb, &s, &ex, NULL, NULL);
  K* res;
  napi_get_value_external(env, ex, &(void*)res);
  std::cout << "GOT " << res->a << "\n";
  return NULL;
}

void CleanUpHook(void* args) {
  std::cout << "Cleanup Hook\n";
}

napi_value Init(napi_env env, napi_value exports) {
  std::cout << "[Native Module] Init\n";
  napi_add_env_cleanup_hook(env, CleanUpHook, NULL);

  napi::set_current_env(env);

  napi::Initialize(env, exports);

  return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init);