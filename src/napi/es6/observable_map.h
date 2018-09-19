#ifndef OLIVE_NAPI_ES6_MAP_H_
#define OLIVE_NAPI_MAP_H_

#include <node_api.h>

namespace olive {

namespace es6 {

class ObservableMap {
public:
  static void Initialize();
  static napi_value New();
  static void Set(napi_value instance, napi_value key, napi_value object);
  static void Set(napi_ref ref, napi_value key, napi_value object);
  static napi_value Get(napi_value instance, napi_value key);
  static napi_value Get(napi_ref ref, napi_value key);

private:
  static napi_ref constructor_ref_;
  static napi_ref prototype_set_ref_;
  static napi_ref prototype_get_ref_;

};

}

}

#endif // OLIVE_NAPI_ES6_MAP_H_