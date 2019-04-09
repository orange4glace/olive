#include "resource/resource.h"

#include "logger/logger.h"

namespace olive {

namespace {
ResourceID _next_resource_id_ = 0;
}

ResourceJS::ResourceJS(resource_id_t resource_id):
    NAPI_Instanceable_Initializer(ResourceJS),
    resource_id_(napi_instance_ref(), "id", resource_id) {
}
NAPI_DEFINE_CLASS(ResourceJS)

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

ResourceJS* const Resource::js() const {
  return js_;
}

} // olive