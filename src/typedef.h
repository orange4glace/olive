#ifndef OLIVE_TYPEDEF_H_
#define OLIVE_TYPEDEF_H_

#include <stdint.h>

#define RESOURCE_VIDEO 1
#define RESOURCE_AUDIO 2
#define RESOURCE_IMAGE 3

using resource_id = uint32_t;
using ResourceID = uint32_t;
using resource_id_t = ResourceID;

using resource_type = int;
using ResourceType = int;
using resource_type_t = ResourceType;

using timecode_t = int;

#endif