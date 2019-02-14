#include "resource/resource.h"

#include "logger/logger.h"

namespace olive {

namespace {
ResourceID _next_resource_id_ = 0;
}

Resource::Resource(ResourceType type, std::string path) :
    id_(_next_resource_id_++),
    type_(type),
    path_(path) {
}

ResourceID Resource::id() const {
  return id_;
}

ResourceType Resource::type() const {
  return type_;
}

const std::string& Resource::path() const {
  return path_;
}

} // olive