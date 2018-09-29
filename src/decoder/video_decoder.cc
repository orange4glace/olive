#include "decoder/video_decoder.h"

#include "resource/video_resource.h"

#include "logger/logger.h"

#include <iostream>

namespace olive {

VideoDecoder::VideoDecoder(const VideoResource* const resource) :
  resource_(resource),
  fmt_ctx_(NULL), dec_ctx_(NULL), stream_(NULL), frame_(NULL), pkt_(NULL) {
  NAPI_CreateInstance();
}

void VideoDecoder::Initialize() {
  logger::get()->info("[DecoderManager] " + resource_->path());
  AV_THROW(avformat_open_input(&fmt_ctx_, resource_->path().c_str(), NULL, NULL) == 0, "AVFORMAT_OPEN_INPUT");
  AV_THROW(avformat_find_stream_info(fmt_ctx_, NULL) == 0, "AVFORMAT_INPUT_STREAM_INFO");
  AVCodec* dec = NULL;
  AVDictionary* opts = NULL;
  int refcount = 0;

  stream_index_ = av_find_best_stream(fmt_ctx_, AVMEDIA_TYPE_VIDEO, -1, -1, NULL, 0);
  AV_THROW(stream_index_ >= 0, "AV_FIND_BEST_STREAM");
  
  stream_ = fmt_ctx_->streams[stream_index_];
  dec = avcodec_find_decoder(stream_->codecpar->codec_id);
  AV_THROW(dec, "AV_CODEC_FIND_DECODER");
  dec_ctx_ = avcodec_alloc_context3(dec);

  AV_THROW(avcodec_parameters_to_context(dec_ctx_, stream_->codecpar) >= 0, "AVCODEC_PARAMETERS_TO_CONTEXT");

  av_dict_set(&opts, "refcounted_frames", refcount ? "1" : "0", 0);
  AV_THROW(avcodec_open2(dec_ctx_, dec, &opts) >= 0, "AVCODEC_OPEN2");

  width_ = dec_ctx_->width;
  height_ = dec_ctx_->height;
  pix_fmt_ = dec_ctx_->pix_fmt;

  pkt_ = av_packet_alloc();
  AV_THROW(pkt_, "AV_PACKET_ALLOC");

  frame_ = av_frame_alloc();
  AV_THROW(pkt_, "AV_FRAME_ALLOC");

  sws_ctx_ = sws_getContext(width_, height_, AV_PIX_FMT_YUV420P, width_, height_, AV_PIX_FMT_RGB24, SWS_BICUBIC, NULL, NULL, NULL);

  std::cout << width_ << " " << height_ << "\n";
  data_rgb_[0] = new uint8_t[width_ * height_];
  data_rgb_[1] = new uint8_t[width_ * height_];
  data_rgb_[2] = new uint8_t[width_ * height_];
  linesize_rgb_[0] = width_;
  linesize_rgb_[1] = width_;
  linesize_rgb_[2] = width_;
  linesize_rgb_[3] = 0;
  AV_THROW(av_image_fill_arrays(data_rgb_, linesize_rgb_, NULL, AV_PIX_FMT_RGB24, width_, height_, 32) >= 0, "AV_IMAGE_FILL_ARRAYS");

  // NAPI
  napi_value napi_data_rgb[3];
  NAPI_CALL(napi_create_buffer(
      napi::current_env(), width_ * height_ / 4, &(void*)data_rgb_[0], &napi_data_rgb[0]));
  NAPI_CALL(napi_create_buffer(
      napi::current_env(), width_ * height_ / 4, &(void*)data_rgb_[1], &napi_data_rgb[1]));
  NAPI_CALL(napi_create_buffer(
      napi::current_env(), width_ * height_ / 4, &(void*)data_rgb_[2], &napi_data_rgb[2]));

  NAPI_SetInstanceNamedProperty("data_rgb0", napi_data_rgb[0]);
  NAPI_SetInstanceNamedProperty("data_rgb1", napi_data_rgb[1]);
  NAPI_SetInstanceNamedProperty("data_rgb2", napi_data_rgb[2]);
}

int VideoDecoder::Decode(int64_t timestamp) {
  AV_RETURN(av_seek_frame(fmt_ctx_, stream_index_, timestamp, 0) >= 0, -1);

  while (av_read_frame(fmt_ctx_, pkt_) >= 0) {
    // AVPacket orig_pkt = *pkt_;

    int ret = 0;
    int decoded = pkt_->size;
    if (pkt_->stream_index == stream_index_) {
      ret = avcodec_send_packet(dec_ctx_, pkt_);
      if (ret < 0) return -2;

      while (ret >= 0) {
        ret = avcodec_receive_frame(dec_ctx_, frame_);
        if (ret == AVERROR(EAGAIN) || ret == AVERROR_EOF) return 0;
        else if (ret < 0) return -3;

        sws_scale(sws_ctx_, frame_->data, frame_->linesize, 0, height_, data_rgb_, linesize_rgb_);
      }
      break;
    }
  }
  return 0;

}

// NAPI
NAPI_DEFINE_CLASS(VideoDecoder)

}