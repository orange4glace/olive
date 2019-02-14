#include "api.h"

#include "resource/resource.h"

#include "napi/napi_encoder.h"

namespace olive {

OliveAPI::OliveAPI()
  : NAPI_Instanceable_Initializer(OliveAPI) {
  video_decoder_manager_ = new VideoDecoderManager();
  resource_manager_ = new ResourceManager();
}

napi_value OliveAPI::_AddResource(std::string path) {
  Resource* resource = resource_manager_->AddResource(path);
  video_decoder_manager_->CreateDecoderHost(resource);
  return napi_encoder<int32_t>::encode(resource->id());
}

napi_value OliveAPI::_Decode(ResourceID id, timecode_t timecode) {
  return video_decoder_manager_->Decode(id, timecode);
}

NAPI_DEFINE_CLASS(OliveAPI,
    NAPI_PROPERTY_FUNCTION("AddResource", AddResource, napi_default),
    NAPI_PROPERTY_FUNCTION("Decode", Decode, napi_default))

}