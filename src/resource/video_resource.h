#ifndef OLIVE_VIDEO_RESOURCE_H_
#define OLIVE_VIDEO_RESOURCE_H_

#include "resource/resource.h"

namespace olive {

class VideoResource : public Resource {
public:
  VideoResource(std::string path);

  bool Initialize() override;

};

}

#endif // OLIVE_VIDEO_RESOURCE_H_