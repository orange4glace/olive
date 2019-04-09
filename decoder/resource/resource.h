#ifndef OLIVE_RESOURCE_H_
#define OLIVE_RESOURCE_H_

#include "napi/napi_instanceable.h"
#include "napi/napi_sync_property.h"
#include "typedef.h"

#include <string>

extern "C" {
#include <libavutil/imgutils.h>
#include <libavutil/samplefmt.h>
#include <libavutil/timestamp.h>
#include <libavutil/avutil.h>
#include <libavformat/avformat.h>
#include <libswscale/swscale.h>
}

#define AV_THROW(COND, ERR) if (!(COND)) throw (ERR);
#define AV_RETURN(COND, RETURN) if (!(COND)) return (RETURN);

namespace olive {

class ResourceJS : public NAPI_Instanceable {
NAPI_DECLARE_CLASS(ResourceJS, "C_Resource")

public:
  ResourceJS(resource_id_t resource_id);

  NAPISyncProperty<resource_id_t> resource_id_;

};

class Resource {

public:
  ResourceID id() const;
  ResourceType type() const;
  const std::string& path() const;
  ResourceJS* const js() const;

protected:
  ResourceJS* js_;

  Resource(ResourceType type, std::string path);

private:
  ResourceID id_;
  // resource_id id_;
  resource_type type_;
  std::string path_;

}; // class Resource

} // namespace olive

#endif // OLIVE_RESOURCE_H_