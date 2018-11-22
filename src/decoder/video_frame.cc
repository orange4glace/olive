#include "decoder/video_frame.h"

#include "decoder/frame.h"

#include "decoder/memory_pool.h"
#include "logger/logger.h"

#include <iostream>

extern "C" {
#include <libswscale/swscale.h>
}

namespace olive {

namespace {

  SwsContext* sws_ctx = NULL;

  void ScaleFrame(VideoFrame* frame) {
    if (sws_ctx == NULL) sws_ctx = sws_getContext(1920, 1080, AV_PIX_FMT_YUV420P, 1920, 1080, AV_PIX_FMT_RGB32, SWS_BILINEAR, NULL, NULL, NULL);
    if (frame->scaled) return;
    int linesize[4] = { frame->data.width * 4, 0, 0, 0 };
    frame->data.data = (uint8_t*)MemoryPool::Allocate(frame->data.width * frame->data.height * 4);
    frame->scaled = true;
    uint8_t* data[4] = { frame->data.data, 0, 0, 0 };
    sws_scale(sws_ctx, frame->frame->data, frame->frame->linesize, 0, frame->data.height, data, linesize);
  }
}

VideoFrame::VideoFrame(AVFrame* f) :
    Frame(), scaled(false) {
  frame = av_frame_alloc();
  av_frame_move_ref(frame, f);
  pts = frame->pts;

  data.width = frame->width;
  data.height = frame->height;
  data.pts = pts;
}

VideoFrame::~VideoFrame() {
  logger::get()->warn("[Frame] Free frame {}", id);
  av_frame_free(&frame);
  if (data.data) MemoryPool::Free(data.data, data.width * data.height * 4);
}

void VideoFrame::TransferToRenderer() {
  ScaleFrame(this);
}

uint64_t VideoFrame::GetDataAddress() {
  return reinterpret_cast<uint64_t>(&data);
}

// Deprecated
int32_t VideoFrame::GetDataSize() {
  return 0;
}

} // namespace olive