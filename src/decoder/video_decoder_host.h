#ifndef OLIVE_VIDEO_DECODER_HOST_H_
#define OLIVE_VIDEO_DECODER_HOST_H_

#include "decoder/decoder_host.h"

namespace olive {

class VideoResource;
class VideoDecoder;

class VideoDecoderHost : public DecoderHost {

public:
  VideoDecoderHost(VideoResource* const resource);

  void Decode(std::vector<TimelineItemSnapshot> snapshots, size_t* counter) override;

  void DecoderCallbackNonBlocking(TimelineItemSnapshot snapshot);
  void DecoderCallbackBlocking(TimelineItemSnapshot snapshot);

protected:
  VideoDecoder* const AssignDecoder(timeline_item_id item_id);
  void FreeDecoder(timeline_item_id item_id);

private:
  std::queue<VideoDecoder*> decoder_pool_;
  std::map<timeline_item_id, VideoDecoder*> decoders_;

  size_t* manager_work_counter_;
  VideoResource* const resource_;

}; // class VideoDecoderHost

} // namesapce olive

#endif // OLIVE_VIDEO_DECODER_HOST_H_