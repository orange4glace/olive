#include "resource/resource.h"

namespace olive {

resource_type Resource::type() const {
  return type_;
}

const std::string& Resource::path() const {
  return path_;
}

} // olive