#include "decoder/video_decoder.h"

#include "decoder/video_decoder_host.h"

#include "decoder/memory_pool.h"
#include "decoder/frame_queue.h"
#include "resource/video_resource.h"

#include "logger/logger.h"

#include <iostream>
#include <thread>
#include <chrono>
#include <stdlib.h>
#include <time.h>

namespace olive {

VideoDecoder::VideoDecoder(VideoDecoderHost* const decoder_host, VideoResource* const resource) :
  decoder_host_(decoder_host), resource_(resource), has_work_(false),
  // start_pts_(AV_NOPTS_VALUE), end_pts_(AV_NOPTS_VALUE),
  fmt_ctx_(NULL), dec_(NULL), dec_ctx_(NULL), opts_(NULL), stream_(NULL), frame_(NULL), pkt_(NULL) {
}

void VideoDecoder::loop() {
  while (true) {
    Frame* frame = decode();
    std::unique_lock<std::mutex> loop_lock(m);
    if (frame == NULL) {
      // Not receiving frame
    }
    else {
      frame_queue_.Push(frame);
      logger::get()->info("[VideoDecoder] Has work {}", has_work_);
      if (has_work_) {
        bool got_frame = PeekQueueTo(decoding_snapshot_.pts);
      logger::get()->info("[VideoDecoder] Got frame");
        if (got_frame) {
          decoding_snapshot_.frame = frame_queue_.Peek();
          has_work_ = false;

          std::unique_lock<std::mutex> host_lock(decoder_host_->decoder_waiter_mutex);
          // Decrease host counter
          decoder_host_->decoder_waiter_counter--;
          // Pass result to host
          decoder_host_->decoder_waiter_result.emplace_back(std::move(decoding_snapshot_));
          logger::get()->info("[VideoDecoder] Internal decode done. counter : {}", decoder_host_->decoder_waiter_counter);
          host_lock.unlock();
          decoder_host_->decoder_waiter_cv.notify_one();
        }
      }
    }
    while (frame_queue_.Size() >= 5 && !has_work_) {
      
      logger::get()->info("[VideoDecoder] CV Check {} {} ", frame_queue_.Size(), has_work_);
      cv.wait(loop_lock);
    }
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

  std::cout << width_ << " " << height_ << "\n";
  AV_THROW(av_image_fill_arrays(data_rgb_, linesize_rgb_, NULL, AV_PIX_FMT_RGB32, width_, height_, 32) >= 0, "AV_IMAGE_FILL_ARRAYS");
  AV_THROW(av_image_alloc(data_rgb_, linesize_rgb_, width_, height_, AV_PIX_FMT_RGB32, 1) >= 0, "AV_IMAGE_ALLOC");

  thread_ = std::thread(&VideoDecoder::loop, this);
}

void VideoDecoder::Decode(TimelineItemSnapshot snapshot) {
  logger::get()->info("[VideoDecoder] Decode request, item_id : {}, resource_id : {}", snapshot.timeline_item_id, snapshot.resource_id);
  std::unique_lock<std::mutex> loop_lock(m);

  snapshot.pts = av_rescale_q(snapshot.timestamp, AVRational{1, 1000}, fmt_ctx_->streams[stream_index_]->time_base);
  if (snapshot.pts < fmt_ctx_->streams[stream_index_]->start_time) snapshot.pts = fmt_ctx_->streams[stream_index_]->start_time;
  logger::get()->info("[VideoDecoder] Decode request Rescale timestamp = {} pts = {}", snapshot.timestamp, snapshot.pts);
  bool found_frame = PeekQueueTo(snapshot.pts);
  logger::get()->info("[VideoDecoder] Decode request, Lock pass, found frame = {} pts = {} ", found_frame, snapshot.pts);
  if (found_frame) {
    // Decrease host counter
    decoder_host_->decoder_waiter_counter--;
    // Pass result to host
    decoder_host_->decoder_waiter_result.emplace_back(std::move(decoding_snapshot_));
    logger::get()->info("[VideoDecoder] Internal decode done. counter : {}", decoder_host_->decoder_waiter_counter);
  }
  else {
    decoding_snapshot_ = snapshot;
    has_work_ = true;
  }
  loop_lock.unlock();
  cv.notify_one();
}

int VideoDecoder::Seek(int64_t pts) {
  int result = av_seek_frame(fmt_ctx_, stream_index_, pts, AVSEEK_FLAG_BACKWARD );
  logger::get()->info("[VideoDecoder] Seek {} {}", pts, result);
  if (result < 0) return result;

  avcodec_flush_buffers(dec_ctx_);
  return 0;
}

Frame* VideoDecoder::decode() {
  /*
  using namespace std::chrono_literals;
  auto start = std::chrono::high_resolution_clock::now();
  auto end = std::chrono::high_resolution_clock::now();
  std::chrono::duration<double, std::milli> elapsed = end-start;
  decoding_snapshot_.opt = "hello world";
  decoding_snapshot_.data = MemoryPool::Allocate(1920 * 1080 * 4);
  decoding_snapshot_.size = 1920 * 1080 * 4;
  srand(time(NULL));
  for (int i = 0; i < 1920 * 1080; i ++) {
    ((uint8_t*)decoding_snapshot_.data)[i] = (rand() % static_cast<int>(255 + 1));
  }
  */

  // Check pts
  int64_t start_pts, end_pts;
  int64_t seek_to;
  bool seek_flag = false;
  bool queue_full = false;
  {
    std::unique_lock<std::mutex> loop_lock(m);
    seek_to = decoding_snapshot_.pts;
    if (frame_queue_.queue.size() == 0) {
      start_pts = AV_NOPTS_VALUE;
      end_pts = AV_NOPTS_VALUE;
    }
    else {
      start_pts = frame_queue_.queue.front()->pts;
      end_pts = frame_queue_.queue.back()->pts;
    }
    if (decoding_snapshot_.pts != AV_NOPTS_VALUE && (
      (start_pts == AV_NOPTS_VALUE || end_pts == AV_NOPTS_VALUE) ||
      (start_pts > decoding_snapshot_.pts || end_pts + 20000 < decoding_snapshot_.pts))
    ) {
      // Need seek
      seek_flag = (true & !decoding_snapshot_.recognized);
    }
    else {

    }
    decoding_snapshot_.recognized = true;
  }
  logger::get()->info("[VideoDecoder] decode() start_time = {} end_time = {} pts = {} seek_to = {} seek_flag = {}",
      start_pts, end_pts, decoding_snapshot_.pts, seek_to, seek_flag);
  if (seek_to == AV_NOPTS_VALUE) {
    return NULL;
  }
  else if (seek_flag) {
    logger::get()->info("[Decoder] Seek to {}", seek_to);
    Seek(seek_to);
    // Flush queue
    frame_queue_.Clear();
  }

  while (av_read_frame(fmt_ctx_, pkt_) >= 0) {
    // AVPacket orig_pkt = *pkt_;

    int ret = 0;
    int decoded = pkt_->size;
    if (pkt_->stream_index == stream_index_) {
      ret = avcodec_send_packet(dec_ctx_, pkt_);
      if (ret < 0) return NULL;

      ret = avcodec_receive_frame(dec_ctx_, frame_);
      logger::get()->info("[Dec] {}", frame_->best_effort_timestamp);

      if (ret >= 0) {
        return new Frame(frame_);
      }

    }
  }
}

bool VideoDecoder::PeekQueueTo(int64_t pts) {
  logger::get()->info("[VideoDecoder] PeekQueueTo {}, queue size = {}", pts, frame_queue_.Size());
  while (true) {
    if (frame_queue_.Size() == 0) break;
    if (frame_queue_.Size() == 1) break;
    if (frame_queue_.Size() > 1) {
      if (frame_queue_.queue[1]->pts <= pts) {
        Frame* frame = frame_queue_.Pop();
        frame->unref();
      }
      else break;
    }
  }
  if (frame_queue_.Size() < 2) return false;
  if (frame_queue_.queue[0]->pts <= pts) {
    Frame*& frame = frame_queue_.Peek();
    logger::get()->info("[VideoDecoder] PeekQueueTo {}", frame->scaled);
    if (!frame->scaled) {
      rgb_ = (uint8_t*)MemoryPool::Allocate(width_ * height_ * 4);
      sws_scale(sws_ctx_, frame->frame->data, frame->frame->linesize, 0, height_, data_rgb_, linesize_rgb_);
      memcpy(rgb_, data_rgb_[0], width_ * height_ * 4);
      frame->scaled_data = rgb_;
    }
    return true;
  }
  return false;
}

}