#ifndef OLIVE_NAPI_H_
#define OLIVE_NAPI_H_

#include <assert.h>
#include <iostream>

#define NAPI_EXPERIMENTAL
#include <node_api.h>

#include "logger/logger.h"

namespace olive {

#define NAPI_CALL(CALL) \
 {napi_status status; \
  status = CALL; \
  if (status != napi_ok) { \
    logger::get()->critical("[NAPI] Assert! {}", status); \
    assert(false); \
  }}

class napi {
public:
  static void Initialize(napi_env env, napi_value exports);
  static void ExportNamedProperty(const char* name, napi_value value);

  static napi_ref CreateReference(napi_value value, int initial_refcount = 1);
  static napi_value GetReferenceValue(napi_ref ref);

  static void log(napi_value value);

  static void set_current_env(napi_env env);
  static napi_env current_env();

  static napi_ref ref(napi_value value, int initial_refcount = 1);
  static napi_value unref(napi_ref& ref);

  static napi_value get_global();
  static napi_value create_empty_object();
  static napi_value create_object();
  static napi_value create_array();
  static napi_value create_undefined();
  static napi_value create_string(const char* str);

  static napi_value mobx();
  static napi_value mobx_decorate();
  static napi_value mobx_observable();
  static napi_value mobx_computed();

  static napi_value SetNamedProperty(napi_value napi_object, const char* name, napi_value value);
  static napi_value SetNamedProperty(napi_value napi_object, const char* name, napi_value value, napi_ref* ref);
  static napi_value SetNamedProperty(napi_ref napi_object_ref, const char* name, napi_value value);
  static napi_value SetNamedProperty(napi_ref napi_object_ref, const char* name, napi_value value, napi_ref* ref);

  static napi_value SetProperty(napi_value napi_object, napi_value name, napi_value value);
  static napi_value SetProperty(napi_value napi_object, napi_value name, napi_value value, napi_ref* ref);
  static napi_value SetProperty(napi_ref napi_object_ref, napi_value name, napi_value value);
  static napi_value SetProperty(napi_ref napi_object_ref, napi_value name, napi_value value, napi_ref* ref);

  static napi_value GetNamedProperty(napi_value object, const char* name);
  static napi_value GetNamedProperty(napi_value object, const char* name, napi_ref* ref);
  
  static void DeleteNamedProperty(napi_value napi_object, const char* name);
  static void DeleteNamedProperty(napi_ref napi_object_ref, const char* name);

  static napi_value ObjectAssign(size_t size, napi_value* target_and_sources);

private:
  static napi_value NAPI_Initialize(napi_env env, napi_callback_info cb_info);

  static napi_env env_;
  static napi_ref export_ref_;

  static napi_ref object_assign_ref_;

  static napi_ref mobx_ref_;
  static napi_ref mobx_decorate_ref_;
  static napi_ref mobx_observable_ref_;
  static napi_ref mobx_computed_ref_;

  static napi_ref log_ref_;

};

}

#endif // OLIVE_NAPI_H_