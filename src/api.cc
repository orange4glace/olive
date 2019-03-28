#include "api.h"

#include "decoder/frame.h"
#include "resource/resource.h"

#include "napi/napi_encoder.h"

namespace olive {

OliveAPI::OliveAPI()
  : NAPI_Instanceable_Initializer(OliveAPI) {
  ResourceJS::NAPI_Initialize(napi::current_env());

  video_decoder_manager_ = new VideoDecoderManager();
  resource_manager_ = new ResourceManager();
}

napi_value OliveAPI::_AddResource(std::string path) {
  Resource* resource = resource_manager_->AddResource(path);
  video_decoder_manager_->CreateDecoderHost(resource);
  return resource->js()->napi_instance();
}

napi_value OliveAPI::_Decode(ResourceID id, timecode_t timecode) {
  return video_decoder_manager_->Decode(id, timecode);
}

napi_value OliveAPI::_FreeFrame(Frame* frame) {
  frame->unref();
  return NULL;
}

NAPI_DEFINE_CLASS(OliveAPI,
    NAPI_PROPERTY_FUNCTION("AddResource", AddResource, napi_default),
    NAPI_PROPERTY_FUNCTION("Decode", Decode, napi_default),
    NAPI_PROPERTY_FUNCTION("FreeFrame", FreeFrame, napi_default))

}