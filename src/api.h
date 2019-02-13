#ifndef OLIVE_API_H_
#define OLIVE_API_H_

#include "napi/napi.h"

#include "napi/napi_export.h"
#include "napi/napi_instanceable.h"

namespace olive {

class OliveAPI : public NAPI_Instanceable {
NAPI_DECLARE_CLASS(OliveAPI, "OliveAPI");

public:
  OliveAPI();

  napi_value _AddResource(std::string path);

  NAPI_EXPORT_FUNCTION(OliveAPI, AddResource, _AddResource, std::string);

};

}

#endif