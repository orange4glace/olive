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
    int linesize[4] = { frame->width * 4, 0, 0, 0 };
    frame->scaled_data = (uint8_t*)MemoryPool::Allocate(frame->width * frame->height * 4);
    frame->scaled = true;
    uint8_t* data[4] = { frame->scaled_data, 0, 0, 0 };
    sws_scale(sws_ctx, frame->frame->data, frame->frame->linesize, 0, frame->height, data, linesize);
  }
}

VideoFrame::VideoFrame(AVFrame* f) :
    Frame(f),
    scaled(false), scaled_data(NULL) {
  width = frame->width;
  height = frame->height;
}

VideoFrame::~VideoFrame() {
  logger::get()->info("[Frame] Free frame {}", id);
  av_frame_free(&frame);
  if (scaled_data) MemoryPool::Free(scaled_data, width * height * 4);
}

void VideoFrame::TransferToRenderer() {
  ScaleFrame(this);
}

uint64_t VideoFrame::GetDataAddress() {
  return reinterpret_cast<uint64_t>(this->scaled_data);
}

int32_t VideoFrame::GetDataSize() {
  return this->width * this->height * 4;
}

} // namespace olive