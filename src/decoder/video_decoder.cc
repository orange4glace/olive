#include "decoder/video_decoder.h"

#include "decoder/video_decoder_host.h"

#include "decoder/memory_pool.h"
#include "decoder/video_frame.h"
#include "resource/video_resource.h"

#include "logger/logger.h"

#include <iostream>
#include <thread>
#include <chrono>
#include <stdlib.h>
#include <time.h>

namespace olive {

namespace {
  void __finalize(napi_env env, void* finalize_data, void* finalize_int) {
    logger::get()->critical("[Decoder] Finalize tsfn");
  }

  void tsfn_render_callabck(napi_env env, napi_value js_callback, void* context, void* data) {
    VideoDecoder* decoder = static_cast<VideoDecoder*>(context);
    Frame* frame = static_cast<Frame*>(data);
    napi::set_current_env(env);
    frame->TransferToRenderer();
    napi_value js_result = frame->ToJSObject();
    NAPI_CALL(napi_resolve_deferred(
        napi::current_env(),
        decoder->deferred_,
        js_result
    ));
    decoder->deferred_ = NULL;
    decoder->busy.fetch_sub(1);
  }
}

VideoDecoder::VideoDecoder(VideoDecoderHost* const decoder_host, VideoResource* const resource) :
  decoder_host_(decoder_host), resource_(resource), has_decode_request_(false), decode_request_resolved_(false),
  // start_pts_(AV_NOPTS_VALUE), end_pts_(AV_NOPTS_VALUE),
  fmt_ctx_(NULL), dec_(NULL), dec_ctx_(NULL), opts_(NULL), stream_(NULL), frame_(NULL), pkt_(NULL) {
  busy = 0;
}

void VideoDecoder::Initialize() {

  requested_timecode = -34827832;
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

  NAPI_CALL(napi_create_threadsafe_function(
      napi::current_env(),
      napi::GetNamedProperty(napi::get_global(), "requestVideoRender"),
      NULL,
      napi_encoder<const char*>::encode("requestVideoRender"),
      1,
      1,
      NULL,
      __finalize,
      (void*)this, tsfn_render_callabck, &tsfn_callback_));

  thread_ = std::thread(&VideoDecoder::loop, this);
}

napi_promise VideoDecoder::Decode(timecode_t timecode) {
  logger::get()->info("[Decoder] Decode request, timecode = ", timecode);
  std::unique_lock<std::mutex> loop_lock(m);

  napi_promise promise;
  NAPI_CALL(napi_create_promise(
      napi::current_env(),
      &deferred_,
      &promise
  ));
  int64_t pts = av_rescale_q(timecode, AVRational{1, 30}, fmt_ctx_->streams[stream_index_]->time_base);
  if (pts < fmt_ctx_->streams[stream_index_]->start_time) pts = fmt_ctx_->streams[stream_index_]->start_time;
  VideoFrame* target_frame = PeekQueueTo(pts);
  logger::get()->info("[Decoder] Decode request Rescale timecode = {} pts = {} found = {}", timecode, pts, target_frame ? true : false);
  if (target_frame) {
    target_frame->ref();
    target_frame->unref();
    // Decode done, resolve promise immediately
    target_frame->TransferToRenderer();
    napi_value js_result = target_frame->ToJSObject();
    NAPI_CALL(napi_resolve_deferred(
        napi::current_env(),
        deferred_,
        js_result
    ));
    logger::get()->info("[VideoDecoder] Internal decode done. counter");
  }
  else {
    requested_timecode = timecode;
    has_decode_request_ = true;
    decode_request_resolved_ = false;
    busy.fetch_add(1);
  }
  loop_lock.unlock();
  cv.notify_one();
  return promise;
}

void VideoDecoder::loop() {
  std::unique_lock<std::mutex> loop_lock(m);
  // Falling into loop if any request is arrived
  while (requested_timecode == -34827832 || !has_decode_request_) cv.wait(loop_lock);
  while (true) {
    bool has_work = false;
    bool need_seek = false;
    int64_t target_pts;

    logger::get()->info("[VideoDecoder] Single Loop {} {}", has_decode_request_, frame_queue_.size());

    if (has_decode_request_) {
      has_decode_request_ = false;
      target_pts =
          av_rescale_q(requested_timecode, AVRational{1, 30}, fmt_ctx_->streams[stream_index_]->time_base);

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
      target_pts =
          av_rescale_q(requested_timecode, AVRational{1, 30}, fmt_ctx_->streams[stream_index_]->time_base);
      Seek(target_pts);
    }

    decode();

    loop_lock.lock();
    if (!decode_request_resolved_) {
      logger::get()->info("[VideoDecoder] Decode Requeset Not Resolved {}", target_pts);
      VideoFrame* target_frame = PeekQueueTo(target_pts);
      if (target_frame) {
        target_frame->ref();
        target_frame->unref();
        // Decode done, resolve promise
        NAPI_CALL(napi_call_threadsafe_function(tsfn_callback_, target_frame, napi_tsfn_nonblocking));
        decode_request_resolved_ = true;
        logger::get()->info("[VideoDecoder] External decode done. counter");
      }
    }
    while (requested_timecode == -34827832 ||
           (frame_queue_.size() >= 5 && !has_decode_request_)) cv.wait(loop_lock);
  }
}

void VideoDecoder::decode() {
  while (av_read_frame(fmt_ctx_, pkt_) >= 0) {
    // AVPacket orig_pkt = *pkt_;

    int ret = 0;
    int decoded = pkt_->size;
    if (pkt_->stream_index == stream_index_) {
      ret = avcodec_send_packet(dec_ctx_, pkt_);
      if (ret < 0) return;

      ret = avcodec_receive_frame(dec_ctx_, frame_);
      logger::get()->info("[Dec] {} {} {}", frame_->best_effort_timestamp, frame_->pts, ret);

      if (ret >= 0) {
        std::unique_lock<std::mutex> loop_lock(m);
        VideoFrame* frame = new VideoFrame(frame_);
        logger::get()->info("[VideoDecoder] FrameQueue Push {} {} {}", frame->pts, frame_queue_.size(), frame->id);
        frame_queue_.emplace_back(frame);
        av_frame_unref(frame_);
      }
      return;
    }
    else av_free_packet(pkt_);
  }
}

int VideoDecoder::Seek(int64_t pts) {
  int result = av_seek_frame(fmt_ctx_, stream_index_, pts, AVSEEK_FLAG_BACKWARD);
  logger::get()->info("[VideoDecoder] Seek {} {}", pts, result);
  if (result < 0) return result;

  avcodec_flush_buffers(dec_ctx_);
  return 0;
}

VideoFrame* VideoDecoder::PeekQueueTo(int64_t pts) {
  logger::get()->info("[Decoder] PeekQueueTo {}, queue size = {}", pts, frame_queue_.size());
  while (frame_queue_.size() >= 2) {
    if (frame_queue_[1]->pts <= pts) {
      VideoFrame* front = frame_queue_.front();
      logger::get()->info("[Decoder] Pop {} {}", front->pts, front->id);
      frame_queue_.pop_front();
      front->unref();
    }
    else break;
  }
  if (frame_queue_.size() < 2) return NULL;
  if (frame_queue_[0]->pts <= pts) {
    VideoFrame* front = frame_queue_.front();
    logger::get()->info("[Decoder] PeekQueueTo {}");
    return front;
  }
  return NULL;
}

}