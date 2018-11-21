#ifndef OLIVE_NAPI_SYNC_PROPERTY_H_
#define OLIVE_NAPI_SYNC_PROPERTY_H_

#include "napi/napi.h"

namespace olive {

template <typename ValueType>
class NAPISyncProperty {
public:
  NAPISyncProperty(napi_ref object, napi_ref key, ValueType&& value) :
      object_(object), key_(key), value_(value) {
    Set(value);
  }
  NAPISyncProperty(napi_ref object, napi_ref key, ValueType& const value) :
      object_(object), key_(key), value_(value) {
    Set(value);
  }

  NAPISyncProperty(napi_ref object, std::string key, ValueType&& value) :
      object_(object), key_(NULL), str_key_(key), value_(value) {
    Set(value);
  }

  NAPISyncProperty(napi_ref object, std::string key, ValueType& const value) :
      object_(object), key_(NULL), str_key_(key), value_(value) {
    Set(value);
  }

  NAPISyncProperty& operator=(ValueType&& value) {
    Set(value);
    return *this;
  }

  NAPISyncProperty& operator=(ValueType& const value) {
    Set(value);
    return *this;
  }

  operator ValueType&() { return value_; }
  operator ValueType() const { return value_; }

  void Set(ValueType&& value) {
    value_ = value;
    napi_value nv = napi_encoder<ValueType>::encode(value);
    SetNAPIPropertyValue(nv);
  }

  void Set(ValueType& const value) {
    value_ = value;
    napi_value nv = napi_encoder<ValueType>::encode(value);
    SetNAPIPropertyValue(nv);
  }

  ValueType Get() const {
    return value_;
  }

private:
  void SetNAPIPropertyValue(napi_value nv) {
    if (key_ == NULL) napi::SetNamedProperty(object_, str_key_.c_str(), nv);
    else napi::SetProperty(object_, napi::unref(key_), nv);
  }

  napi_ref object_;
  napi_ref key_;
  std::string str_key_;
  ValueType value_;

};

}

#endif // OLIVE_NAPI_SYNC_PROPERTY_H_