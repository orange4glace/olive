#ifndef OLIVE_VIDEO_DECODER_HOST_H_
#define OLIVE_VIDEO_DECODER_HOST_H_

#include "timeline/timeline_typedef.h"

#include <vector>
#include <queue>
#include <map>

namespace olive {

class Decoder;
class TimelineItem;

class VideoDecoderHost {

class VideoResource;

public:
  VideoDecoderHost(const VideoResource* const resource);

  void Decode(std::vector<TimelineItem*> items);

private:
  Decoder* const AssignDecoder(timeline_item_id item_id);
  void FreeDecoder(timeline_item_id item_id);

  const VideoResource* const resource_;

  std::queue<VideoDecoder*> decoder_pool_;
  std::map<timeline_item_id, VideoDecoder*> decoders_;

} // class VideoDecoderHost

} // namesapce olive

#endif // OLIVE_VIDEO_DECODER_HOST_H_