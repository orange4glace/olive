#include "decoder/audio_frame.h"

#include "decoder/memory_pool.h"
#include "logger/logger.h"

#include <iostream>

extern "C" {
#include <libswscale/swscale.h>
}

namespace olive {

AudioFrame::AudioFrame(AVFrame* f) :
    Frame(f) {
  data.data = f->data[0];
  data.size = f->linesize[0];
  data.sample_rate = f->sample_rate;
}

AudioFrame::~AudioFrame() {
  logger::get()->critical("[AudioFrame] Free frame {}", id);
  av_frame_free(&frame);
}

void DeleteMe() {
  
}

void AudioFrame::TransferToRenderer() {
}

uint64_t AudioFrame::GetDataAddress() {
  return reinterpret_cast<uint64_t>(&this->data);
}

int32_t AudioFrame::GetDataSize() {
  return 0;
}

} // namespace olive