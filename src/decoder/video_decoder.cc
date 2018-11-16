#include "decoder/video_decoder.h"

#include "decoder/video_decoder_host.h"

#include "decoder/memory_pool.h"
#include "resource/video_resource.h"

#include "logger/logger.h"

#include <iostream>
#include <thread>
#include <chrono>
#include <stdlib.h>
#include <time.h>

namespace olive {

VideoDecoder::VideoDecoder(VideoDecoderHost* const decoder_host, VideoResource* const resource) :
  decoder_host_(decoder_host), resource_(resource), has_decode_request_(false), decode_request_resolved_(false),
  // start_pts_(AV_NOPTS_VALUE), end_pts_(AV_NOPTS_VALUE),
  fmt_ctx_(NULL), dec_(NULL), dec_ctx_(NULL), opts_(NULL), stream_(NULL), frame_(NULL), pkt_(NULL) {
}

void VideoDecoder::loop() {
  std::unique_lock<std::mutex> loop_lock(m, std::defer_lock);
  loop_lock.lock();
  while (true) {
    bool has_work = false;
    bool need_seek = false;

    logger::get()->info("[VideoDecoder] Single Loop {} {}", has_decode_request_, frame_queue_.size());

    if (has_decode_request_) {
      has_decode_request_ = false;
      decoding_snapshot_ = std::move(decoding_snapshot_req_);
      int64_t target_pts = decoding_snapshot_.pts;

      // Check if seek needed
      int64_t start_pts = AV_NOPTS_VALUE;
      int64_t end_pts = AV_NOPTS_VALUE;
      if (!frame_queue_.size()) {
        need_seek = true;
      }
      else {
        start_pts = frame_queue_.front()->pts;
        end_pts = frame_queue_.back()->pts;
        if (start_pts > target_pts) need_seek = true;
        if (end_pts + 50000 < target_pts) need_seek = true;
      }
      if (need_seek) {
        // Clear the queue
        frame_queue_.clear();
      }
    }

    loop_lock.unlock();
    if (need_seek) {
      int64_t target_pts = decoding_snapshot_.pts;
      Seek(target_pts);
    }

    decode();

    loop_lock.lock();
    if (!decode_request_resolved_) {
      logger::get()->info("[VideoDecoder] Decode Requeset Not Resolved {}", decoding_snapshot_.pts);
      Frame* target_frame = PeekQueueTo(decoding_snapshot_.pts);
      if (target_frame) {
        decoding_snapshot_.frame = target_frame;
        target_frame->ref();
        // Decode done, callback to VideoDecoderHost
        decoder_host_->DecoderCallbackBlocking(std::move(decoding_snapshot_));
        decode_request_resolved_ = true;
        logger::get()->info("[VideoDecoder] External decode done. counter");
      }
    }
    while (frame_queue_.size() >= 5 && !has_decode_request_) cv.wait(loop_lock);
  }
}

void VideoDecoder::Initialize() {
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

  AV_THROW(av_image_fill_arrays(data_rgb_, linesize_rgb_, NULL, AV_PIX_FMT_RGB32, width_, height_, 32) >= 0, "AV_IMAGE_FILL_ARRAYS");
  AV_THROW(av_image_alloc(data_rgb_, linesize_rgb_, width_, height_, AV_PIX_FMT_RGB32, 1) >= 0, "AV_IMAGE_ALLOC");

  thread_ = std::thread(&VideoDecoder::loop, this);
}

void VideoDecoder::Decode(TimelineItemSnapshot snapshot) {
  logger::get()->info("[VideoDecoder] Decode request, item_id : {}, resource_id : {}", snapshot.timeline_item_id, snapshot.resource_id);
  std::unique_lock<std::mutex> loop_lock(m, std::defer_lock);
  logger::get()->info("[VideoDecoder] Lock pass1");
  loop_lock.lock();
  logger::get()->info("[VideoDecoder] Lock pass2");

  snapshot.pts = av_rescale_q(snapshot.timestamp, AVRational{1, 1000}, fmt_ctx_->streams[stream_index_]->time_base);
  if (snapshot.pts < fmt_ctx_->streams[stream_index_]->start_time) snapshot.pts = fmt_ctx_->streams[stream_index_]->start_time;
  Frame* target_frame = PeekQueueTo(snapshot.pts);
  logger::get()->info("[VideoDecoder] Decode request Rescale timestamp = {} pts = {} found = {}", snapshot.timestamp, snapshot.pts, target_frame ? true : false);
  if (target_frame) {
    snapshot.frame = target_frame;
    target_frame->ref();
    // Decode done, callback to VideoDecoderHost
    decoder_host_->DecoderCallbackNonBlocking(std::move(snapshot));
    logger::get()->info("[VideoDecoder] Internal decode done. counter");
  }
  else {
    decoding_snapshot_req_ = std::move(snapshot);
    has_decode_request_ = true;
    decode_request_resolved_ = false;
  }
  loop_lock.unlock();
  logger::get()->info("[VideoDecoder] Decode Request unlock");
  cv.notify_one();
  logger::get()->info("[VideoDecoder] Decode Request Notify");
}

int VideoDecoder::Seek(int64_t pts) {
  int result = av_seek_frame(fmt_ctx_, stream_index_, pts, AVSEEK_FLAG_BACKWARD );
  logger::get()->info("[VideoDecoder] Seek {} {}", pts, result);
  if (result < 0) return result;

  avcodec_flush_buffers(dec_ctx_);
  return 0;
}

void VideoDecoder::decode() {
  while (av_read_frame(fmt_ctx_, pkt_) >= 0) {
    // AVPacket orig_pkt = *pkt_;

    int ret = 0;
    int decoded = pkt_->size;
    if (pkt_->stream_index == stream_index_) {
      ret = avcodec_send_packet(dec_ctx_, pkt_);
      av_free_packet(pkt_);
      if (ret < 0) return;

      ret = avcodec_receive_frame(dec_ctx_, frame_);
      logger::get()->info("[Dec] {} {} {}", frame_->best_effort_timestamp, frame_->pts, ret);

      if (ret >= 0) {
        std::unique_lock<std::mutex> loop_lock(m);
        Frame* frame = new Frame(frame_);
        logger::get()->info("[VideoDecoder] FrameQueue Push {} {}", frame->pts, frame->id);
        frame_queue_.emplace_back(frame);
        av_frame_unref(frame_);
      }
      return;
    }
  }
}

Frame* VideoDecoder::PeekQueueTo(int64_t pts) {
  logger::get()->info("[VideoDecoder] PeekQueueTo {}, queue size = {}", pts, frame_queue_.size());
  while (frame_queue_.size() >= 2) {
    if (frame_queue_[1]->pts <= pts) {
      Frame* front = frame_queue_.front();
      logger::get()->info("[VideoDecoder] Pop {} {}", front->pts, front->id);
      frame_queue_.pop_front();
      front->unref();
    }
    else break;
  }
  if (frame_queue_.size() < 2) return NULL;
  if (frame_queue_[0]->pts <= pts) {
    Frame* front = frame_queue_.front();
    logger::get()->info("[VideoDecoder] PeekQueueTo {}", front->scaled);
    return front;
  }
  return NULL;
}

}