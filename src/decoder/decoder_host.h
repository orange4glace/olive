#ifndef OLIVE_DECODER_HOST_H_
#define OLIVE_DECODER_HOST_H_

#include "timeline/timeline_item_snapshot.h"

#include "timeline/timeline_typedef.h"

#include <thread>
#include <vector>
#include <queue>
#include <map>
#include <mutex>

namespace olive {

class VideoResource;

class Decoder;

class DecoderHost {

public:
  virtual void Decode(std::vector<TimelineItemSnapshot> snapshots, size_t* counter) = 0;

}; // class DecoderHost

} // namesapce olive

#endif // OLIVE_DECODER_HOST_H_