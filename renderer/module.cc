#define NAPI_EXPERIMENTAL
#include <node_api.h>

#include <iostream>
#include <assert.h>
#include <cstdint>

struct AudioFrameData {
  uint8_t* data;
  int size;
  int sample_rate;
};

struct VideoFrameData {
  uint8_t* data;
  int width;
  int height;
  int64_t pts;
};

napi_value AsVideoFrameData(napi_env env, napi_callback_info cbinfo) {
  size_t argc = 1;
  napi_value nv[1];
  uint64_t uaddr;
  int32_t size;
  bool lossless;

  napi_value n_obj;
  napi_value n_width;
  napi_value n_height;
  napi_value n_pts;
  napi_value n_buf;
  napi_value n_ptr;
  napi_get_cb_info(env, cbinfo, &argc, nv, NULL, NULL);
  napi_get_value_bigint_uint64(env, nv[0], &uaddr, &lossless);
  assert(lossless);

  VideoFrameData* data = reinterpret_cast<VideoFrameData*>(uaddr);

  // Create napi object
  napi_create_object(env, &n_obj);
  napi_create_external_arraybuffer(env, data->data, data->width * data->height * 4, NULL, NULL, &n_buf);
  napi_create_bigint_int64(env, reinterpret_cast<uint64_t>(&data->data), &n_ptr);
  napi_create_bigint_int64(env, data->pts, &n_pts);
  napi_create_int32(env, data->width, &n_width);
  napi_create_int32(env, data->height, &n_height);
  napi_create_bigint_int64(env, data->pts, &n_pts);
  napi_set_named_property(env, n_obj, "data", n_buf);
  napi_set_named_property(env, n_obj, "ptr", n_ptr);
  napi_set_named_property(env, n_obj, "width", n_width);
  napi_set_named_property(env, n_obj, "height", n_height);
  napi_set_named_property(env, n_obj, "pts", n_pts);

  return n_obj;
}

napi_value AsAudioFrameData(napi_env env, napi_callback_info cbinfo) {
  size_t argc = 1;
  napi_value nv[1];
  uint64_t uaddr;
  int32_t size;
  bool lossless;
  napi_value buf;
  napi_get_cb_info(env, cbinfo, &argc, nv, NULL, NULL);
  napi_get_value_bigint_uint64(env, nv[0], &uaddr, &lossless);
  assert(lossless);
  uint8_t* ptr = reinterpret_cast<uint8_t*>(uaddr);
  AudioFrameData* data = reinterpret_cast<AudioFrameData*>(ptr);
  napi_create_external_arraybuffer(env, data->data, data->size, NULL, NULL, &buf);
  return buf;
}

napi_value Init(napi_env env, napi_value exports) {

  napi_value as_video_frame_data_fn;
  napi_value as_audio_frame_data_fn;
  napi_create_function(env, "AsVideoFrameData", NAPI_AUTO_LENGTH, AsVideoFrameData, NULL, &as_video_frame_data_fn);
  napi_create_function(env, "AsAudioFrameData", NAPI_AUTO_LENGTH, AsAudioFrameData, NULL, &as_audio_frame_data_fn);

  napi_set_named_property(env, exports, "AsVideoFrameData", as_video_frame_data_fn);
  napi_set_named_property(env, exports, "AsAudioFrameData", as_audio_frame_data_fn);

  return exports;
}

NAPI_MODULE(OLIVE_RENDERER_MODULE, Init);