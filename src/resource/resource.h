#ifndef OLIVE_RESOURCE_H_
#define OLIVE_RESOURCE_H_

#include "typedef.h"

#include <string>

namespace olive {

class Resource {

public:
  ResourceID id() const;
  ResourceType type() const;
  const std::string& path() const;

protected:
  Resource(ResourceType type, std::string path);

private:
  ResourceID id_;
  // resource_id id_;
  resource_type type_;
  std::string path_;

}; // class Resource

} // namespace olive

#endif // OLIVE_RESOURCE_H_