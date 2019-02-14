#ifndef OLIVE_RESOURCE_MANANGER_H_
#define OLIVE_RESOURCE_MANANGER_H_

#include "typedef.h"

#include <memory>
#include <map>
#include <string>

namespace olive {

class Resource;

class ResourceManager {

public:
  ResourceManager();

  Resource* const AddResource(std::string path);
  Resource* const GetResource(ResourceID id);

private:
  std::map<std::string, ResourceID> resource_path_map_;
  std::map<ResourceID, Resource*> resource_map_;

}; // class ResourceManager

} // namespace olive

#endif // OLIVE_RESOURCE_MANANGER_H_