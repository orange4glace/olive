#include "decoder/video_decoder.h"

#include "resource/video_resource.h"

#include "logger/logger.h"

#include <iostream>
#include <thread>
#include <chrono>

namespace olive {

namespace {
  void finalize_tsfn(napi_env env, void* data, void* ctx) {}
}

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

  sws_ctx_ = sws_getContext(width_, height_, AV_PIX_FMT_YUV420P, width_, height_, AV_PIX_FMT_RGB32, SWS_BILINEAR, NULL, NULL, NULL);
  AV_THROW(sws_ctx_, "SWS_GET_CONTEXT");

  std::cout << width_ << " " << height_ << "\n";
  AV_THROW(av_image_fill_arrays(data_rgb_, linesize_rgb_, NULL, AV_PIX_FMT_RGB32, width_, height_, 32) >= 0, "AV_IMAGE_FILL_ARRAYS");
  AV_THROW(av_image_alloc(data_rgb_, linesize_rgb_, width_, height_, AV_PIX_FMT_RGB32, 1) >= 0, "AV_IMAGE_ALLOC");

  // NAPI
  napi_value napi_data_rgb[3];
  NAPI_CALL(napi_create_external_arraybuffer(
      napi::current_env(), (void*)data_rgb_[0], width_ * height_ * 4, NULL, NULL, &napi_data_rgb[0]));

  NAPI_SetInstanceNamedProperty("data_rgb0", napi_data_rgb[0]);





  napi_value ts_fn = napi::GetNamedProperty(napi::get_global(), "decode_callback");
  NAPI_CALL(napi_create_threadsafe_function(napi::current_env(),
      ts_fn, NULL, napi_encoder<const char*>::encode("ts_fn"), 0, 1, NULL, finalize_tsfn, NULL, NULL, &ts_fn_));
}

int VideoDecoder::Decode(int64_t timestamp) {

  std::thread t1(&VideoDecoder::decode, this);
  return 0;
  /*
  int64_t seek_target = timestamp;
  // av_rescale_q(timestamp, AV_TIME_BASE_Q, fmt_ctx_->streams[stream_index_]->time_base);
  std::cout << "SEEK " << timestamp << " " << seek_target << " " << fmt_ctx_->streams[stream_index_]->time_base.den << " " <<
  fmt_ctx_->streams[stream_index_]->time_base.num << "\n";
  AV_RETURN(av_seek_frame(fmt_ctx_, -1, seek_target, AVSEEK_FLAG_FRAME ) >= 0, -1);
  std::cout << "OK\n";

  avcodec_flush_buffers(dec_ctx_);
  while (av_read_frame(fmt_ctx_, pkt_) >= 0) {
    // AVPacket orig_pkt = *pkt_;

    int ret = 0;
    int decoded = pkt_->size;
    if (pkt_->stream_index == stream_index_) {
      ret = avcodec_send_packet(dec_ctx_, pkt_);
      if (ret < 0) return -2;
  std::cout << "SEND\n";

      while (ret >= 0) {
        ret = avcodec_receive_frame(dec_ctx_, frame_);
        if (ret == AVERROR(EAGAIN)) break;
        if (ret == AVERROR_EOF) return -5;
        else if (ret < 0) return -3;
  std::cout << "SCALE " << linesize_rgb_[0] << " " << linesize_rgb_[1] << " " << linesize_rgb_[2] << " " << linesize_rgb_[3] << "\n";
  for (int i = 0; i < 60; i ++) std::cout << (int)frame_->data[0][i] << " ";

        sws_scale(sws_ctx_, frame_->data, frame_->linesize, 0, height_, data_rgb_, linesize_rgb_);
        break;
      }
      if (ret == 0) break;
    }
  }
  return 0;
  */
}

void VideoDecoder::decode() {
  auto start = std::chrono::high_resolution_clock::now();
  int kk = 0;
  while (av_read_frame(fmt_ctx_, pkt_) >= 0) {
    // AVPacket orig_pkt = *pkt_;

    int ret = 0;
    int decoded = pkt_->size;
    if (pkt_->stream_index == stream_index_) {
      ret = avcodec_send_packet(dec_ctx_, pkt_);
      if (ret < 0) return;

      while (ret >= 0) {
        ret = avcodec_receive_frame(dec_ctx_, frame_);
        if (ret == AVERROR(EAGAIN)) break;
        if (ret == AVERROR_EOF) break;
        else if (ret < 0) break;

        sws_scale(sws_ctx_, frame_->data, frame_->linesize, 0, height_, data_rgb_, linesize_rgb_);
        NAPI_CALL(napi_call_threadsafe_function(ts_fn_, NULL, napi_tsfn_blocking));
        auto end = std::chrono::high_resolution_clock::now();
        std::chrono::duration<double, std::milli> elapsed = end-start;
        start = end;
        std::cout << "callback " << kk++ << " " << elapsed.count() << " ms\n";
        using namespace std::chrono_literals;
        std::this_thread::sleep_for(33ms);
      }
    }
  }
  return;
}

// NAPI
NAPI_DEFINE_CLASS(VideoDecoder,
    NAPI_PROPERTY_FUNCTION("Decode", NAPI_Decode, napi_default))

napi_value VideoDecoder::_NAPI_Decode(int64_t timestamp) {
  return napi_encoder<int32_t>::encode(Decode(timestamp));
}

}