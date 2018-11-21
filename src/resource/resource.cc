#include "resource/resource.h"

#include "logger/logger.h"

namespace olive {

namespace {
resource_id _next_resource_id_ = 0;
}

Resource::Resource(resource_type type, std::string path) :
    NAPI_Instanceable_Initializer(Resource),
    id_(napi_instance_ref(), "id", _next_resource_id_++),
    type_(type),
    path_(napi_instance_ref(), "path", path) {
}

resource_id Resource::id() const {
  return id_;
}

resource_type Resource::type() const {
  return type_;
}

const std::string& Resource::path() const {
  return path_;
}

// NAPI
NAPI_DEFINE_CLASS(Resource,
    NAPI_PROPERTY_VALUE("id", napi_default),
    NAPI_PROPERTY_VALUE("path", napi_default));

} // olive