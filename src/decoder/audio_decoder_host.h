#ifndef OLIVE_AUDIO_DECODER_HOST_H_
#define OLIVE_AUDIO_DECODER_HOST_H_

#include "decoder/decoder_host.h"

namespace olive {

class VideoResource;
class AudioDecoder;

class AudioDecoderHost : public DecoderHost {

public:
  AudioDecoderHost(VideoResource* const resource);

  void Decode(std::vector<TimelineItemSnapshot> snapshots, size_t* counter) override;

  void DecoderCallbackNonBlocking(TimelineItemSnapshot snapshot);
  void DecoderCallbackBlocking(TimelineItemSnapshot snapshot);

protected:
  AudioDecoder* const AssignDecoder(timeline_item_id item_id);
  void FreeDecoder(timeline_item_id item_id);

private:
  std::queue<AudioDecoder*> decoder_pool_;
  std::map<timeline_item_id, AudioDecoder*> decoders_;

  size_t* manager_work_counter_;
  VideoResource* const resource_;

}; // class AudioDecoderHost

} // namesapce olive

#endif // OLIVE_AUDIO_DECODER_HOST_H_