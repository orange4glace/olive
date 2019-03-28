#ifndef OLIVE_VIDEO_RESOURCE_H_
#define OLIVE_VIDEO_RESOURCE_H_

#include "resource/resource.h"

namespace olive {

class VideoResourceJS : public ResourceJS {
NAPI_DECLARE_CLASS_EXTENDS(VideoResourceJS, ResourceJS, "C_VideoResource")

public:
  VideoResourceJS(resource_id_t resource_id, timecode_t duration);

  NAPISyncProperty<timecode_t> duration;
};

class VideoResource : public Resource {
public:
  VideoResource(std::string path);

private:

};

}

#endif // OLIVE_VIDEO_RESOURCE_H_