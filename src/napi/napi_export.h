#ifndef OLIVE_NAPI_EXPORT
#define OLIVE_NAPI_EXPORT

#include <node_api.h>
#include "napi/napi.h"
#include "napi/napi_wrap.h"
#include "napi/napi_encoder.h"

#include <vector>
#include <utility>
#include <iostream>

namespace olive {

#define EXPAND( x ) x

#define PP_NARG(...) \
         EXPAND( PP_NARG_(__VA_ARGS__,PP_RSEQ_N()) )
#define PP_NARG_(...) \
         EXPAND( PP_ARG_N(__VA_ARGS__) )
#define PP_ARG_N( \
          _1, _2, _3, _4, _5, _6, _7, _8, _9,_10, \
         _11,_12,_13,_14,_15,_16,_17,_18,_19,_20, \
         _21,_22,_23,_24,_25,_26,_27,_28,_29,_30, \
         _31,_32,_33,_34,_35,_36,_37,_38,_39,_40, \
         _41,_42,_43,_44,_45,_46,_47,_48,_49,_50, \
         _51,_52,_53,_54,_55,_56,_57,_58,_59,_60, \
         _61,_62,_63,N,...) N
#define PP_RSEQ_N() \
         63,62,61,60,                   \
         59,58,57,56,55,54,53,52,51,50, \
         49,48,47,46,45,44,43,42,41,40, \
         39,38,37,36,35,34,33,32,31,30, \
         29,28,27,26,25,24,23,22,21,20, \
         19,18,17,16,15,14,13,12,11,10, \
         9,8,7,6,5,4,3,2,1,0

#define PP_CALL(FUNC, ...) \
	FUNC EXPAND(PP_CALL_(__VA_ARGS__, PP_RCALL()) )
#define PP_CALL_(...) \
	EXPAND( PP_CALL_N(__VA_ARGS__) )
#define PP_CALL_N(_1, _2, _3, _4, _5, _6, N, ...) N
#define PP_RCALL() (v0,v1,v2,v3,v4,v5),(v0,v1,v2,v3,v4),(v0,v1,v2,v3),(v0,v1,v2),(v0,v1),(v0),()

#define NAPI_DEF(T, METHOD_NAME, CALLBACK, SIZE, CODE, ...) EXPAND(\
	static inline napi_value METHOD_NAME(napi_env env, napi_callback_info cbinfo) { \
    napi::set_current_env(env); \
		size_t argc = SIZE; \
		napi_value argv[SIZE]; \
    napi_value js_obj; \
    napi_value js_this; \
    T* native_this; \
		NAPI_CALL(napi_get_cb_info(env, cbinfo, &argc, argv, &js_obj, NULL)); \
    NAPI_CALL(napi_get_named_property(env, js_obj, "native", &js_this)); \
    NAPI_CALL(napi_get_value_external(env, js_this, &(void*)native_this)); \
		CODE \
		return native_this->PP_CALL(CALLBACK, __VA_ARGS__); \
	})
#define NAPI_DEF0(T, METHOD_NAME, CALLBACK) \
	static inline napi_value METHOD_NAME(napi_env env, napi_callback_info cbinfo) { \
    napi::set_current_env(env); \
    napi_value js_obj; \
    napi_value js_this; \
    T* native_this = NULL; \
		NAPI_CALL(napi_get_cb_info(env, cbinfo, NULL, NULL, &js_obj, NULL)); \
    NAPI_CALL(napi_get_named_property(env, js_obj, "native", &js_this)); \
    NAPI_CALL(napi_get_value_external(env, js_this, &(void*)native_this)); \
		return native_this->CALLBACK(); \
	}

#define GET_MACRO(_1,_2,_3,_4,_5,_6,_7,NAME, ...) NAME

#define UNWRAP(T, n) T v##n = napi_wrap<T>::get(env, argv[n]);
#define MAC_0() 
#define MAC_1(T1) UNWRAP(T1, 0)
#define MAC_2(T1, T2) MAC_1(T1) UNWRAP(T2, 1)
#define MAC_3(T1,T2,T3) MAC_2(T1,T2) UNWRAP(T3, 2)
#define MAC_4(T1,T2,T3,T4) MAC_3(T1,T2,T3) UNWRAP(T4, 3)
#define MAC_5(T1,T2,T3,T4,T5) MAC_4(T1,T2,T3,T4) UNWRAP(T5, 4)
#define MAC_6(T1,T2,T3,T4,T5,T6) MAC_5(T1,T2,T3,T4,T5) UNWRAP(T6, 5)
#define MAC_7(T1,T2,T3,T4,T5,T6,T7) MAC_6(T1,T2,T3,T4,T5,T6) UNWRAP(T7, 6)
// T1 v1 = napi_value_wrap<T1>::unwrap(args[0])

#define NAPI_EXPORT_FUNCTION(T, METHOD_NAME, CALLBACK, ...) NAPI_DEF(T, METHOD_NAME, CALLBACK, EXPAND( PP_NARG(__VA_ARGS__) ), EXPAND( GET_MACRO(__VA_ARGS__, \
				MAC_7,MAC_6,MAC_5,MAC_4,MAC_3,MAC_2,MAC_1)(__VA_ARGS__) ), __VA_ARGS__)

// A special case with no arguments
#define NAPI_EXPORT_FUNCTION0(T, METHOD_NAME, CALLBACK) NAPI_DEF0(T, METHOD_NAME, CALLBACK)










#define EXPAND( x ) x
#define ESC(...) ESC_(__VA_ARGS__)
#define ESC_(...) __VA_ARGS__

#define A() 

#define MAC(_, __, PROP) EXPAND(MAC_) ## PROP

#define MAC_(a,b) a b,

#define NAPI_IMPL_PROPERTIES(T, ...) BOOST_PP_SEQ_FOR_EACH(MAC, _, BOOST_PP_VARIADIC_TO_SEQ(__VA_ARGS__))

NAPI_IMPL_PROPERTIES(Class, 
	(a,b),
	(c,d))












#define NAPI_METHOD_PROPERTY(NAME, METHOD, ATTRIBUTES) \
  { NAME, NULL, METHOD, NULL, NULL, NULL, ATTRIBUTES, NULL }
#define NAPI_VALUE_PROPERTY(NAME, VALUE, ATTRIBUTES) \
  { NAME, NULL, NULL, NULL, NULL, VALUE, ATTRIBUTES, NULL }
    
#define NAPI_DEFINE_EXPORT(T, NAPI_CLASSNAME) \
private: \
  friend NAPI_Export<T>; \
  static inline std::string NAPI_GetClassName() { return NAPI_CLASSNAME; } \
  static std::vector<napi_property_descriptor> NAPI_GetNapiPropertyDescriptors();

#define NAPI_IMPL_PROPERTIES(T, ...) \
  std::vector<napi_property_descriptor> T::NAPI_GetNapiPropertyDescriptors() { \
    return std::move( \
        std::vector<napi_property_descriptor>{__VA_ARGS__});}

template <class T>
class NAPI_Export {

friend T;

public:
  NAPI_Export();

  static void NAPI_Initialize(napi_env env);
  static napi_value NAPI_Constructor(napi_env, napi_callback_info cbinfo);


  
  napi_value NAPI_SetNamedProperty(napi_value napi_object, const char* name, napi_value value);
  napi_value NAPI_SetNamedProperty(napi_value napi_object, const char* name, napi_value value, napi_ref* ref);
  napi_value NAPI_SetNamedProperty(napi_ref napi_object_ref, const char* name, napi_value value);
  napi_value NAPI_SetNamedProperty(napi_ref napi_object_ref, const char* name, napi_value value, napi_ref* ref);

  
  napi_value NAPI_SetInstanceNamedProperty(const char* name, napi_value value);
  napi_value NAPI_SetInstanceNamedProperty(const char* name, napi_value value, napi_ref* ref);
  napi_value NAPI_GetInstanceNamedProperty(const char* name);

  void NAPI_DeleteInstanceNamedProperty(const char* name);
  void NAPI_DeleteNamedProperty(napi_value napi_object, const char* name);
  void NAPI_DeleteNamedProperty(napi_ref napi_object_ref, const char* name);

  napi_value napi_instance();


private:
  static void NAPI_CreateInstance(napi_env env, T* native_this);

  napi_ref __napi_instance_ref_;
  static napi_ref __napi_constructor_reference_;
};

#include "napi/napi_export.tc"

}

#endif // OLIVE_NAPI_EXPORT