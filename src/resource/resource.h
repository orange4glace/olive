#ifndef OLIVE_RESOURCE_H_
#define OLIVE_RESOURCE_H_

#include "napi/napi_export.h"
#include "napi/napi_instanceable.h"
#include "napi/napi_sync_property.h"

#include "typedef.h"

#include <string>

namespace olive {

class Decoder;

class Resource : public NAPI_Instanceable {
NAPI_DECLARE_CLASS(Resource, "Resource")
public:
  virtual bool Initialize() = 0;

  ResourceID id() const;
  ResourceType type() const;
  const std::string& path() const;

protected:
  Resource(ResourceType type, std::string path);

  Decoder* decoder_;

private:
  NAPISyncProperty<ResourceID> id_;
  // resource_id id_;
  resource_type type_;
  NAPISyncProperty<std::string> path_;

}; // class Media

} // namespace olive

#endif // OLIVE_RESOURCE_H_