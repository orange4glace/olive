#ifndef OLIVE_VIDEO_DECODER_HOST_H_
#define OLIVE_VIDEO_DECODER_HOST_H_

#include "timeline/timeline_item_snapshot.h"

#include "timeline/timeline_typedef.h"

#include <vector>
#include <queue>
#include <map>
#include <mutex>

namespace olive {

class Decoder;
class VideoDecoder;

class VideoDecoderHost {

class VideoResource;

public:
  VideoDecoderHost(VideoResource* const resource);

  void Decode(std::vector<TimelineItemSnapshot> snapshots, size_t* counter);

// Some of these are directly called from DecoderManager
  std::mutex m;
  std::condition_variable cv;
  bool has_work;
  std::vector<TimelineItemSnapshot> work_snapshots;
  size_t* work_counter;

private:
  void loop();

  void decode();
  Decoder* const AssignDecoder(timeline_item_id item_id);
  void FreeDecoder(timeline_item_id item_id);

  VideoResource* const resource_;

  std::queue<VideoDecoder*> decoder_pool_;
  std::map<timeline_item_id, VideoDecoder*> decoders_;

}; // class VideoDecoderHost

} // namesapce olive

#endif // OLIVE_VIDEO_DECODER_HOST_H_