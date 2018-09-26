#include "decoder/video_decoder.h"

#include "resource/video_resource.h"

#include "logger/logger.h"

namespace olive {

VideoDecoder::VideoDecoder(const VideoResource* const resource) :
  resource_(resource),
  fmt_ctx_(NULL), dec_ctx_(NULL), stream_(NULL) {
}

void VideoDecoder::Initialize() {
  logger::get()->info("[DecoderManager] 1 " + resource_->path());
  AV_THROW(avformat_open_input(&fmt_ctx_, resource_->path().c_str(), NULL, NULL) == 0, "AVFORMAT_OPEN_INPUT");
  logger::get()->info("[DecoderManager] 1");
  AV_THROW(avformat_find_stream_info(fmt_ctx_, NULL) == 0, "AVFORMAT_INPUT_STREAM_INFO");
  logger::get()->info("[DecoderManager] 1");
  AVCodec* dec = NULL;
  AVDictionary* opts = NULL;
  int refcount = 0;

  logger::get()->info("[DecoderManager] 1");
  stream_index_ = av_find_best_stream(fmt_ctx_, AVMEDIA_TYPE_VIDEO, -1, -1, NULL, 0);
  AV_THROW(stream_index_ >= 0, "AV_FIND_BEST_STREAM");
  
  logger::get()->info("[DecoderManager] 1");
  stream_ = fmt_ctx_->streams[stream_index_];
  dec = avcodec_find_decoder(stream_->codecpar->codec_id);
  AV_THROW(dec, "AV_CODEC_FIND_DECODER");
  dec_ctx_ = avcodec_alloc_context3(dec);

  logger::get()->info("[DecoderManager] 1");
  AV_THROW(avcodec_parameters_to_context(dec_ctx_, stream_->codecpar) >= 0, "AVCODEC_PARAMETERS_TO_CONTEXT");

  logger::get()->info("[DecoderManager] 1");
  av_dict_set(&opts, "refcounted_frames", refcount ? "1" : "0", 0);
  AV_THROW(avcodec_open2(dec_ctx_, dec, &opts) >= 0, "AVCODEC_OPEN2");

  width_ = dec_ctx_->width;
  height_ = dec_ctx_->height;
  pix_fmt_ = dec_ctx_->pix_fmt;
  logger::get()->info("[DecoderManager] 1");
}

}