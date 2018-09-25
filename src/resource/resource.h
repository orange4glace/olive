#ifndef OLIVE_RESOURCE_H_
#define OLIVE_RESOURCE_H_

#include "resource/type.h"

#include <string>

namespace olive {

class Resource {
public:
  virtual void Initialize() = 0;

protected:
  inline Resource(resource_type type, std::string path) :
      type_(type), path_(path) {}

private:
  resource_type type_;
  std::string path_;

}; // class Media

} // namespace olive

#endif // OLIVE_RESOURCE_H_