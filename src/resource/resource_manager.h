#ifndef OLIVE_RESOURCE_MANANGER_H_
#define OLIVE_RESOURCE_MANANGER_H_

#include "resource/type.h"

#include <memory>

namespace olive {

class Resource;

class ResourceManager {
public:
  Resource* const LoadResource(std::string resource_path);

private:
  std::map<resource_id, std::unique_ptr<Resource> > resources_;

}; // class ResourceManager

} // namespace olive

#ifndef // OLIVE_RESOURCE_MANANGER_H_