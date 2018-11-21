#include "resource/resource_manager.h"

#include "resource/video_resource.h"

#include "napi/napi_encoder.h"
#include "napi/napi_decoder.h"
#include "napi/es6/map.h"
#include "napi/es6/observable_map.h"

#include "logger/logger.h"

#include <memory>

namespace olive {

void ResourceManager::Initialize() {
  instance_ = new ResourceManager();
}

ResourceManager::ResourceManager() :
    NAPI_Instanceable_Initializer(ResourceManager) {
  NAPI_SetInstanceNamedProperty("resources", es6::ObservableMap::New(), &napi_resources_ref_);
  napi::log(napi_encoder<const char*>::encode("Resource intiailized"));
  napi::log(napi::unref(napi_resources_ref_));
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
  logger::get()->info("Returning resource");
  std::unique_ptr<Resource> uptr;
  uptr.reset(resource);
  resources_.insert({resource->id(), std::move(uptr)});

  std::cout << "## Add resource " << resource->id() << "\n";
  es6::ObservableMap::Set(napi_resources_ref_,
      napi_encoder<uint32_t>::encode(resource->id()), resource->napi_instance());
  return resource;
}

Resource* const ResourceManager::GetResource(ResourceID resource_id) {
  auto& resource = resources_[resource_id];
  auto raw = resource.get();
  assert(raw);
  return raw;
}

// NAPI
NAPI_DEFINE_CLASS(ResourceManager, 
    NAPI_PROPERTY_VALUE("resources", napi_configurable, NAPI_MOBX_OBSERVABLE),
    NAPI_PROPERTY_FUNCTION("LoadResource", NAPI_LoadResource, napi_default))

napi_value ResourceManager::_NAPI_LoadResource(napi_value resource_metadata) {
  resource_type type = napi_decoder<resource_type>::decode(
    napi::GetNamedProperty(resource_metadata, "type"));
  std::string path = napi_decoder<std::string>::decode(
      napi::GetNamedProperty(resource_metadata, "path"));
  LoadResource(type, path);
  return NULL;
}

ResourceManager* ResourceManager::instance_ = NULL;

}