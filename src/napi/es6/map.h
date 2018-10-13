#ifndef OLIVE_NAPI_ES6_MAP_H_
#define OLIVE_NAPI_MAP_H_

#include "napi/napi.h"

namespace olive {

namespace es6 {

class Map {
public:
  static void Initialize();
  static napi_value New();
  static void Set(napi_value instance, napi_value key, napi_value object);
  static void Set(napi_ref ref, napi_value key, napi_value object);
  static napi_value Get(napi_value instance, napi_value key);
  static napi_value Get(napi_ref ref, napi_value key);

private:
  static napi_value constructor_;
  static napi_value prototype_set_;
  static napi_value prototype_get_;

};

}

}

#endif // OLIVE_NAPI_ES6_MAP_H_