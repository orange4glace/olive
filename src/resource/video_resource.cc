#include "resource/video_resource.h"

#include "logger/logger.h"

namespace olive {

VideoResource::VideoResource(std::string path) :
    Resource(RESOURCE_VIDEO, path) {
}

}