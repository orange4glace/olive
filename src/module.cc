#include <iostream>

#include <node_api.h>

#include "napi/napi.h"

#include "timeline/timeline.h"
#include "timeline/timeline_layer.h"
#include "timeline/timeline_item.h"

using namespace olive;

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

napi_value Init(napi_env env, napi_value exports) {
  napi::set_current_env(env);

  Timeline::NAPI_Initialize(env);
  Timeline::Initialize();

  TimelineLayer::NAPI_Initialize(env);
  TimelineItem::NAPI_Initialize(env);

  napi_set_named_property(env, exports, "sayHello", Timeline::instance()->napi_instance());

  return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init);