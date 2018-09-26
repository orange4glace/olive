#include "resource/resource_manager.h"

#include "resource/video_resource.h"

#include "napi/napi_decoder.h"

namespace olive {

void ResourceManager::Initialize() {
  instance_ = new ResourceManager();
}

Resource* const ResourceManager::LoadResource(resource_type type, std::string path) {
  Resource* resource;
  switch (type) {
    case RESOURCE_VIDEO:
      resource = new VideoResource(path);
      break;
  }
  if (!resource->Initialize()) {
    delete resource;
    return NULL;
  }
  return resource;
}

// NAPI
NAPI_DEFINE_CLASS(ResourceManager, 
    NAPI_PROPERTY_FUNCTION("LoadResource", NAPI_LoadResource, napi_default))

napi_value ResourceManager::_NAPI_LoadResource(napi_value resource_metadata) {
  resource_type type = napi_decoder<resource_type>::decode(
    napi::GetNamedProperty(resource_metadata, "type"));
  std::string path = napi_decoder<std::string>::decode(
      napi::GetNamedProperty(resource_metadata, "path"));
  LoadResource(type, path);
}

ResourceManager* ResourceManager::instance_ = NULL;

}