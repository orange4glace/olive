#ifndef OLIVE_TYPEDEF_H_
#define OLIVE_TYPEDEF_H_

#include <stdint.h>

using timecode_t = int64_t;

#define RESOURCE_VIDEO 1
#define RESOURCE_AUDIO 2
#define RESOURCE_IMAGE 3

using resource_id = uint32_t;
using ResourceID = uint32_t;

using resource_type = int;
using ResourceType = int;

#endif