#include "decoder/audio_decoder.h"

#include "decoder/audio_decoder_host.h"

#include "decoder/memory_pool.h"
#include "resource/video_resource.h"

#include "logger/logger.h"

#include <iostream>
#include <thread>
#include <chrono>
#include <stdlib.h>
#include <time.h>

namespace olive {

AudioDecoder::AudioDecoder(AudioDecoderHost* const decoder_host, VideoResource* const resource) :
  decoder_host_(decoder_host), resource_(resource), has_decode_request_(false), decode_request_resolved_(false),
  // start_pts_(AV_NOPTS_VALUE), end_pts_(AV_NOPTS_VALUE),
  fmt_ctx_(NULL), dec_(NULL), dec_ctx_(NULL), opts_(NULL), stream_(NULL), frame_(NULL), pkt_(NULL) {
}

void AudioDecoder::loop() {
  std::unique_lock<std::mutex> loop_lock(m, std::defer_lock);
  loop_lock.lock();
  while (true) {
    bool has_work = false;
    bool need_seek = false;

    logger::get()->info("[AudioDecoder] Single Loop {} {}", has_decode_request_, frame_queue_.size());

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
      logger::get()->info("[AudioDecoder] Decode Requeset Not Resolved {}", decoding_snapshot_.pts);
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

void AudioDecoder::Initialize() {
  AV_THROW(avformat_open_input(&fmt_ctx_, resource_->path().c_str(), NULL, NULL) == 0, "AVFORMAT_OPEN_INPUT");
  AV_THROW(avformat_find_stream_info(fmt_ctx_, NULL) == 0, "AVFORMAT_INPUT_STREAM_INFO");
  AVDictionary* opts_ = NULL;
  int refcount = 0;

  stream_index_ = av_find_best_stream(fmt_ctx_, AVMEDIA_TYPE_AUDIO, -1, -1, NULL, 0);
  AV_THROW(stream_index_ >= 0, "AV_FIND_BEST_STREAM");

  stream_ = fmt_ctx_->streams[stream_index_];
  dec_ = avcodec_find_decoder(stream_->codecpar->codec_id);
  AV_THROW(dec_, "AV_CODEC_FIND_DECODER");
  dec_ctx_ = avcodec_alloc_context3(dec_);

  AV_THROW(avcodec_parameters_to_context(dec_ctx_, stream_->codecpar) >= 0, "AVCODEC_PARAMETERS_TO_CONTEXT");

  av_dict_set(&opts_, "refcounted_frames", refcount ? "1" : "0", 0);
  AV_THROW(avcodec_open2(dec_ctx_, dec_, &opts_) >= 0, "AVCODEC_OPEN2");

  sample_rate_ = dec_ctx_->sample_rate;
  nb_channels_ = dec_ctx_->channels;
  channel_layout_ = dec_ctx_->channel_layout;

  pkt_ = av_packet_alloc();
  AV_THROW(pkt_, "AV_PACKET_ALLOC");

  frame_ = av_frame_alloc();
  AV_THROW(pkt_, "AV_FRAME_ALLOC");

  thread_ = std::thread(&VideoDecoder::loop, this);
}

void AudioDecoder::Decode(TimelineItemSnapshot snapshot) {
  logger::get()->info("[AudioDecoder] Decode request, item_id : {}, resource_id : {}", snapshot.timeline_item_id, snapshot.resource_id);
  std::unique_lock<std::mutex> loop_lock(m);

  snapshot.pts = av_rescale_q(snapshot.timestamp, AVRational{1, 1000}, fmt_ctx_->streams[stream_index_]->time_base);
  if (snapshot.pts < fmt_ctx_->streams[stream_index_]->start_time) snapshot.pts = fmt_ctx_->streams[stream_index_]->start_time;
  Frame* target_frame = PeekQueueTo(snapshot.pts);
  logger::get()->info("[AudioDecoder] Decode request Rescale timestamp = {} pts = {} found = {}", snapshot.timestamp, snapshot.pts, target_frame ? true : false);
  if (0) {
    snapshot.frame = target_frame;
    target_frame->ref();
    // Decode done, callback to AudioDecoderHost
    decoder_host_->DecoderCallbackNonBlocking(std::move(snapshot));
    logger::get()->info("[AudioDecoder] Internal decode done. counter");
  }
  else {
    decoding_snapshot_req_ = std::move(snapshot);
    has_decode_request_ = true;
    decode_request_resolved_ = false;
  }
  loop_lock.unlock();
  cv.notify_one();
}

int AudioDecoder::Seek(int64_t pts) {
  int result = av_seek_frame(fmt_ctx_, stream_index_, pts, AVSEEK_FLAG_BACKWARD );
  logger::get()->info("[AudioDecoder] Seek {} {}", pts, result);
  if (result < 0) return result;

  avcodec_flush_buffers(dec_ctx_);
  return 0;
}

void AudioDecoder::decode() {
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