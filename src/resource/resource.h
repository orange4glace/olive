#ifndef OLIVE_RESOURCE_H_
#define OLIVE_RESOURCE_H_

#include "napi/napi_export.h"
#include "napi/napi_instanceable.h"

#include "resource/type.h"

#include <string>

namespace olive {

class Decoder;

class Resource : public NAPI_Instanceable {
NAPI_DECLARE_CLASS(Resource, "Resource")
public:
  virtual bool Initialize() = 0;

  resource_id id() const;
  resource_type type() const;
  const std::string& path() const;

protected:
  Resource(resource_type type, std::string path);

  Decoder* decoder_;

private:
  resource_id id_;
  resource_type type_;
  std::string path_;

}; // class Media

} // namespace olive

#endif // OLIVE_RESOURCE_H_