#ifndef OLIVE_AUDIO_DECODER_HOST_H_
#define OLIVE_AUDIO_DECODER_HOST_H_

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
class AudioDecoder;

class AudioDecoderHost {

public:
  AudioDecoderHost(VideoResource* const resource);

  void Decode(std::vector<TimelineItemSnapshot> snapshots, size_t* counter);

// Some of these are directly called from DecoderManager
  std::mutex m;
  std::condition_variable cv;

  std::mutex decoder_waiter_mutex;
  std::condition_variable decoder_waiter_cv;
  int decoder_waiter_counter;
  std::vector<TimelineItemSnapshot> decoder_waiter_result;

  std::vector<TimelineItemSnapshot> work_snapshots;
  size_t* work_counter;

private:
  void loop();

  void decode();
  VideoDecoder* const AssignDecoder(timeline_item_id item_id);
  void FreeDecoder(timeline_item_id item_id);

public:
  void DecoderCallbackNonBlocking(TimelineItemSnapshot snapshot);
  void DecoderCallbackBlocking(TimelineItemSnapshot snapshot);

  std::thread loop_thread_;
  bool has_work_;
  size_t* manager_work_counter_;

  VideoResource* const resource_;

  std::queue<VideoDecoder*> decoder_pool_;
  std::map<timeline_item_id, VideoDecoder*> decoders_;

}; // class AudioDecoderHost

} // namesapce olive

#endif // OLIVE_AUDIO_DECODER_HOST_H_