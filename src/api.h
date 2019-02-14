#ifndef OLIVE_API_H_
#define OLIVE_API_H_

#include "decoder/video_decoder_manager.h"
#include "resource/resource_manager.h"

#include "napi/napi.h"

#include "napi/napi_export.h"
#include "napi/napi_instanceable.h"

#include "typedef.h"

namespace olive {

class OliveAPI : public NAPI_Instanceable {
NAPI_DECLARE_CLASS(OliveAPI, "OliveAPI");

public:
  OliveAPI();

  napi_value _AddResource(std::string path);
  napi_value _Decode(ResourceID id, timecode_t timecode);

  NAPI_EXPORT_FUNCTION(OliveAPI, AddResource, _AddResource, std::string);
  NAPI_EXPORT_FUNCTION(OliveAPI, Decode, _Decode, ResourceID, timecode_t);

private:
  VideoDecoderManager* video_decoder_manager_;
  ResourceManager* resource_manager_;

};

}

#endif