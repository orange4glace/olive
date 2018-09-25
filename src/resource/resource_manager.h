#ifndef OLIVE_RESOURCE_MANANGER_H_
#define OLIVE_RESOURCE_MANANGER_H_

#include "resource/type.h"

#include "napi/napi_export.h"

#include <memory>
#include <map>
#include <string>

namespace olive {

class Resource;

class ResourceManager : public NAPI_Export<ResourceManager> {
NAPI_DECLARE_CLASS(ResourceManager, "Resource")

public:
  static void Initialize();
  static inline ResourceManager* const instance() {
    return instance_;
  }

  Resource* const LoadResource(resource_type type, std::string path);

  // NAPI
  napi_value _NAPI_LoadResource(napi_value resource_metadata);

  NAPI_EXPORT_FUNCTION(ResourceManager, NAPI_LoadResource, _NAPI_LoadResource,
      napi_value);

private:
  static ResourceManager* instance_;

  std::map<resource_id, std::unique_ptr<Resource> > resources_;

}; // class ResourceManager

} // namespace olive

#endif // OLIVE_RESOURCE_MANANGER_H_