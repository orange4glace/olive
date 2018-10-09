#include "decoder/video_decoder.h"

#include "decoder/memory_pool.h"
#include "resource/video_resource.h"

#include "logger/logger.h"

#include <iostream>
#include <thread>
#include <chrono>

namespace olive {

VideoDecoder::VideoDecoder(VideoResource* const resource) :
  resource_(resource),
  fmt_ctx_(NULL), dec_(NULL), dec_ctx_(NULL), opts_(NULL), stream_(NULL), frame_(NULL), pkt_(NULL) {
}

void VideoDecoder::loop() {
  /*
  while (true) {
    std::unique_lock<std::mutex> lock(m_);
    cv_.wait(m_, [] { has_request_; });
    has_request_ = false;
    Decode();
  }
  */
}

void VideoDecoder::Initialize() {
  logger::get()->info("[DecoderManager] " + resource_->path());
  AV_THROW(avformat_open_input(&fmt_ctx_, resource_->path().c_str(), NULL, NULL) == 0, "AVFORMAT_OPEN_INPUT");
  AV_THROW(avformat_find_stream_info(fmt_ctx_, NULL) == 0, "AVFORMAT_INPUT_STREAM_INFO");
  AVDictionary* opts_ = NULL;
  int refcount = 0;

  stream_index_ = av_find_best_stream(fmt_ctx_, AVMEDIA_TYPE_VIDEO, -1, -1, NULL, 0);
  AV_THROW(stream_index_ >= 0, "AV_FIND_BEST_STREAM");

  stream_ = fmt_ctx_->streams[stream_index_];
  dec_ = avcodec_find_decoder(stream_->codecpar->codec_id);
  AV_THROW(dec_, "AV_CODEC_FIND_DECODER");
  dec_ctx_ = avcodec_alloc_context3(dec_);

  AV_THROW(avcodec_parameters_to_context(dec_ctx_, stream_->codecpar) >= 0, "AVCODEC_PARAMETERS_TO_CONTEXT");

  av_dict_set(&opts_, "refcounted_frames", refcount ? "1" : "0", 0);
  AV_THROW(avcodec_open2(dec_ctx_, dec_, &opts_) >= 0, "AVCODEC_OPEN2");

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

  thread_ = std::thread(VideoDecoder::loop);
}

int VideoDecoder::Seek(int64_t timestamp) {
  
  int64_t seek_target = timestamp;
  seek_target = av_rescale_q(timestamp, AVRational{1, 1000}, fmt_ctx_->streams[stream_index_]->time_base);
  std::cout << "SEEK " << timestamp << " " << seek_target << " " << fmt_ctx_->streams[stream_index_]->time_base.den << " " <<
  fmt_ctx_->streams[stream_index_]->time_base.num << "\n";
  AV_RETURN(av_seek_frame(fmt_ctx_, -1, seek_target, AVSEEK_FLAG_BACKWARD ) >= 0, -1);

  avcodec_flush_buffers(dec_ctx_);
  return 0;
}

void VideoDecoder::Decode() {
  if (current_timestamp_ >= request_.timestamp) {
    return;
  }
  Seek(request_.timestamp);
  while (av_read_frame(fmt_ctx_, pkt_) >= 0) {
    // AVPacket orig_pkt = *pkt_;

    int ret = 0;
    int decoded = pkt_->size;
    if (pkt_->stream_index == stream_index_) {
      ret = avcodec_send_packet(dec_ctx_, pkt_);
      if (ret < 0) return;

      while (ret >= 0) {
        ret = avcodec_receive_frame(dec_ctx_, frame_);
        if (ret == AVERROR(EAGAIN)) {
          break;
        }
        if (ret == AVERROR_EOF) {
          break;
        }
        else if (ret < 0) {
          std::cout << ret << "\n";
          break;
        }
      }
      current_timestamp_ = pkt_->dts;
      if (current_timestamp >= request_.timestamp) {
        rgb_ = (uint8_t*)MemoryPool::Allocate(width_ * height_ * 4);
        sws_scale(sws_ctx_, frame_->data, frame_->linesize, 0, height_, data_rgb_, linesize_rgb_);
        memcpy(rgb_, data_rgb_, width_ * height_ * 4);
        return;
      }
    }
  }
  return;
}

}