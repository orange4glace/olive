#include "resource/video_resource.h"

#include "logger/logger.h"

namespace olive {

VideoResourceJS::VideoResourceJS(resource_id_t resource_id, timecode_t duration_):
    ResourceJS(resource_id),
    duration(napi_instance_ref(), "duration", duration_) {
}
NAPI_DEFINE_CLASS(VideoResourceJS)


VideoResource::VideoResource(std::string path) :
    Resource(RESOURCE_VIDEO, path) {
  AVFormatContext* fmt_ctx = nullptr;

  AV_THROW(avformat_open_input(&fmt_ctx, path.c_str(), NULL, NULL) == 0, "AVFORMAT_OPEN_INPUT");
  int64_t duration_timebase = fmt_ctx->duration;
  timecode_t duration = av_rescale_q(duration_timebase, AVRational{1, AV_TIME_BASE}, AVRational{1, 30});

  js_ = new VideoResourceJS(id(), duration);
}

}