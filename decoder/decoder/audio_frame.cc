#include "decoder/audio_frame.h"

#include "decoder/memory_pool.h"
#include "logger/logger.h"

#include <iostream>
#include <algorithm>

extern "C" {
#include <libswscale/swscale.h>
}

namespace olive {

AudioFrame::AudioFrame(int sample_rate, int sample_size, int byte_per_sample) :
    Frame(),
    sample_rate_(sample_rate), sample_size_(sample_size), byte_per_sample_(byte_per_sample) {
  data_.byte_capacity = sample_size_ * byte_per_sample_;
  data_.data = (uint8_t*)MemoryPool::Allocate(data_.byte_capacity);
  data_.byte_current_size = 0;
}

AudioFrame& AudioFrame::operator=(const AudioFrame& other) {
  Frame::Clear();
  sample_rate_ = other.sample_rate_;
  sample_size_ = other.sample_size_;
  byte_per_sample_ = other.byte_per_sample_;
  data_ = other.data_;
  return *this;
}

AudioFrame::~AudioFrame() {
  logger::get()->info("[AudioFrame] Free frame {}", id);
  MemoryPool::Free(data_.data, data_.byte_capacity);
}

bool AudioFrame::Append(AVFrame* frame) {
  // Todo : dealilng with multiple audio channels
  int bytes_copy = frame->linesize[0] / frame->channels;
  if (data_.byte_current_size + bytes_copy > data_.byte_capacity) return false;
  memcpy(data_.data + data_.byte_current_size, frame->data[0], bytes_copy);
  if (data_.byte_current_size == 0) pts = frame->pts;
  data_.byte_current_size += bytes_copy;
  assert(data_.byte_current_size <= data_.byte_capacity);
  logger::get()->info("[AudioFrame] Append {} {} {} {} {} {}", sample_size_, byte_per_sample_, bytes_copy, data_.byte_current_size, data_.byte_capacity, pts);
  return true;
}

void AudioFrame::TransferToRenderer() {
}

uint64_t AudioFrame::GetDataAddress() {
  return reinterpret_cast<uint64_t>(&this->data_);
}

int32_t AudioFrame::GetDataSize() {
  return 0;
}

ObjectPool<AudioFrame> AudioFrame::frame_pool;

} // namespace olive