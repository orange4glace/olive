#include "api.h"

namespace olive {

OliveAPI::OliveAPI()
  : NAPI_Instanceable_Initializer(OliveAPI) {}

napi_value OliveAPI::_AddResource(std::string path) {
  return NULL;
}

NAPI_DEFINE_CLASS(OliveAPI,
    NAPI_PROPERTY_FUNCTION("AddResource", AddResource, napi_default))

}