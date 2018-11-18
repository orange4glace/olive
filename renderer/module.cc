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

napi_value AsArrayBuffer(napi_env env, napi_callback_info cbinfo) {
  size_t argc = 2;
  napi_value nv[2];
  uint64_t uaddr;
  int32_t size;
  bool lossless;
  napi_value buf;
  napi_get_cb_info(env, cbinfo, &argc, nv, NULL, NULL);
  napi_get_value_bigint_uint64(env, nv[0], &uaddr, &lossless);
  napi_get_value_int32(env, nv[1], &size);
  assert(lossless);
  uint8_t* ptr = reinterpret_cast<uint8_t*>(uaddr);
  napi_create_external_arraybuffer(env, ptr, size, NULL, NULL, &buf);
  return buf;
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

  napi_value fn;
  napi_value as_audio_frame_data_fn;
  napi_create_function(env, "AsArrayBuffer", NAPI_AUTO_LENGTH, AsArrayBuffer, NULL, &fn);
  napi_create_function(env, "AsAudioFrameData", NAPI_AUTO_LENGTH, AsAudioFrameData, NULL, &as_audio_frame_data_fn);

  napi_set_named_property(env, exports, "AsArrayBuffer", fn);
  napi_set_named_property(env, exports, "AsAudioFrameData", as_audio_frame_data_fn);

  return exports;
}

NAPI_MODULE(OLIVE_RENDERER_MODULE, Init);