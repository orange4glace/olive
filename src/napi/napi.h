#ifndef OLIVE_NAPI_H_
#define OLIVE_NAPI_H_

#include <assert.h>
#include <iostream>

#include <node_api.h>

namespace olive {

#define NAPI_CALL(CALL) \
 {napi_status status; \
  status = CALL; \
  if (status != napi_ok) { \
    std::cout << "ASSERTING.. " << status; \
    assert(false); \
  }}

class napi {
public:
  static void set_current_env(napi_env env);
  static napi_env current_env();

  static napi_value create_empty_object();

private:
  static napi_env env_;

};

}

#endif // OLIVE_NAPI_H_