#ifndef OLIVE_API_H_
#define OLIVE_API_H_

#include "decoder/video_decoder_manager.h"
#include "resource/resource_manager.h"

#include "napi/napi.h"

#include "napi/napi_export.h"
#include "napi/napi_instanceable.h"

#include "typedef.h"

namespace olive {

struct Frame;

class OliveAPI : public NAPI_Instanceable {
NAPI_DECLARE_CLASS(OliveAPI, "OliveAPI");

public:
  OliveAPI();

  napi_value _AddResource(std::string path);
  napi_value _Decode(resource_id_t resource_id, timecode_t timecode, decoder_id_t decoder_id = -1);
  napi_value _Acquire(resource_id_t resource_id, timecode_t timecode);
  napi_value _Release(resource_id_t resource_id, decoder_id_t decoder_id);
  napi_value _FreeFrame(Frame* frame);

  NAPI_EXPORT_FUNCTION(OliveAPI, AddResource, _AddResource, std::string);
  NAPI_EXPORT_FUNCTION(OliveAPI, Decode, _Decode, resource_id_t, timecode_t, decoder_id_t);
  NAPI_EXPORT_FUNCTION(OliveAPI, Acquire, _Acquire, resource_id_t, timecode_t);
  NAPI_EXPORT_FUNCTION(OliveAPI, Release, _Release, resource_id_t, decoder_id_t);
  NAPI_EXPORT_FUNCTION(OliveAPI, FreeFrame, _FreeFrame, Frame*);

private:
  VideoDecoderManager* video_decoder_manager_;
  ResourceManager* resource_manager_;

};

}

#endif