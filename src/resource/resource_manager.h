#ifndef OLIVE_RESOURCE_MANANGER_H_
#define OLIVE_RESOURCE_MANANGER_H_

#include "napi/napi_export.h"
#include "napi/napi_instanceable.h"

#include "resource/type.h"

#include <memory>
#include <map>
#include <string>

namespace olive {

class Resource;

class ResourceManager : public NAPI_Instanceable {
NAPI_DECLARE_CLASS(ResourceManager, "ResourceManager")

public:
  static void Initialize();
  static inline ResourceManager* const instance() {
    return instance_;
  }

  Resource* const LoadResource(resource_type type, std::string path);
  Resource* const GetResource(ResourceID resource_id) const;

  // NAPI
  napi_value _NAPI_LoadResource(napi_value resource_metadata);

  NAPI_EXPORT_FUNCTION(ResourceManager, NAPI_LoadResource, _NAPI_LoadResource,
      napi_value);

private:
  ResourceManager();

  static ResourceManager* instance_;

  std::map<resource_id, std::unique_ptr<Resource> > resources_;

  napi_ref napi_resources_ref_;

}; // class ResourceManager

} // namespace olive

#endif // OLIVE_RESOURCE_MANANGER_H_