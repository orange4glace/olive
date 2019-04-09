#include "decoder/video_decoder_host.h"

#include "napi/napi.h"
#include "napi/napi_encoder.h"
#include "napi/napi_decoder.h"

#include "resource/resource.h"
#include "resource/video_resource.h"

#include "decoder/video_decoder_manager.h"
#include "decoder/decoder.h"
#include "decoder/video_decoder.h"

#include "logger/logger.h"

#include <mutex>
#include <cstdlib>
#include <condition_variable>

namespace olive {

VideoDecoderHost::VideoDecoderHost(VideoResource* const resource) :
  resource_(resource) {
  logger::get()->info("[VideoDecoder] Construct from Resource ID : {}", resource->id());
  
  // Prepare a decoder for giving informations to VideoResource
  decoder_ = new VideoDecoder(this, resource_);
  decoder_->Initialize();
  // decoders_.insert({-1, decoder_});
}

napi_promise VideoDecoderHost::Decode(timecode_t timecode, decoder_id_t decoder_id) {
  VideoDecoder* decoder = nullptr;
  if (decoder_id == -1) decoder = GetOrNewAvailableDecoder(timecode);
  else decoder = GetDecoder(decoder_id);
  napi_promise promise = decoder->Decode(timecode);
  return promise;
}

int VideoDecoderHost::Acquire(timecode_t timecode) {
  // Find available decoder
  VideoDecoder* decoder = GetOrNewAvailableDecoder(timecode);
  decoder->Acquire();
  return decoder->id();
}

void VideoDecoderHost::Release(decoder_id_t decoder_id) {
  auto decoder = GetDecoder(decoder_id);
  decoder->Release();
}

VideoDecoder* VideoDecoderHost::GetOrNewAvailableDecoder(timecode_t timecode) {
  VideoDecoder* decoder = NULL;
  for (auto dec_pair : decoders_) {
    auto dec = dec_pair.second;
    if (dec->acquired()) continue;
    if (dec->busy.load()) continue;
    if (decoder == NULL) {
      decoder = dec;
      continue;
    }
    int d1 = abs(dec->requested_timecode - timecode);
    int d2 = abs(decoder->requested_timecode - timecode);
    if (d1 < d2) decoder = dec;
  }
  if (decoder == NULL) {
    logger::get()->critical("[VideoDecoderHost] Allocate new Decoder");
    decoder = new VideoDecoder(this, resource_);
    decoder->Initialize();
    decoders_.insert({ decoder->id(), decoder });
  }
  decoder->requested_timecode = timecode;
  return decoder;
}

VideoDecoder* const VideoDecoderHost::GetDecoder(decoder_id_t decoder_id) {
  assert(decoders_.count(decoder_id));
  return decoders_[decoder_id];
}

int64_t VideoDecoderHost::duration() const {
  return decoder_->fmt_ctx_->duration;
}

} // namespace olive