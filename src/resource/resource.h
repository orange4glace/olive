#ifndef OLIVE_RESOURCE_H_
#define OLIVE_RESOURCE_H_

#include "resource/type.h"

namespace olive {

class Resource {
public:
  virtual void Initialize() = 0;

}; // class Media

} // namespace olive

#endif // OLIVE_RESOURCE_H_