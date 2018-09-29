#include "resource/resource.h"

namespace olive {

namespace {
resource_id _next_resource_id_ = 0;
}

Resource::Resource(resource_type type, std::string path) :
    id_(_next_resource_id_++), type_(type), path_(path) {
  NAPI_CreateInstance();
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
NAPI_DEFINE_CLASS(Resource)

} // olive