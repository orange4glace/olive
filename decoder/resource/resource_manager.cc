#include "resource/resource_manager.h"

#include "resource/video_resource.h"

#include "logger/logger.h"

#include <memory>

namespace olive {

ResourceManager::ResourceManager() {
}

Resource* const ResourceManager::AddResource(std::string path) {
  Resource* resource = new VideoResource(path);
  resource_map_.insert({resource->id(), resource});
  return resource;
}

Resource* const ResourceManager::GetResource(ResourceID resource_id) {
  assert(resource_map_.count(resource_id));
  auto& resource = resource_map_[resource_id];
  return resource;
}

}