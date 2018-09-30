#ifndef OLIVE_NAPI_EXPORT
#define OLIVE_NAPI_EXPORT

#include "napi/napi.h"
#include "napi/napi_decoder.h"
#include "napi/napi_encoder.h"

#include <boost/preprocessor/seq/for_each.hpp>
#include <boost/preprocessor/variadic/to_seq.hpp>
#include <boost/preprocessor/control/expr_if.hpp>
#include <boost/preprocessor/stringize.hpp>
#include <boost/preprocessor/facilities/is_empty.hpp>
#include <boost/preprocessor/tuple/elem.hpp>
#include <boost/preprocessor/tuple/enum.hpp>
#include <boost/preprocessor/facilities/apply.hpp>
#include <boost/preprocessor/facilities/expand.hpp>
#include <boost/preprocessor/facilities/identity.hpp>
#include <boost/preprocessor/repetition/repeat.hpp>
#include <boost/preprocessor/tuple/eat.hpp>

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

#define UNWRAP(T, n) T v##n = napi_decoder<T>::decode(argv[n]);
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



#define NAPI_MOBX_DECORATE (napi::mobx_decorate())
#define NAPI_MOBX_OBSERVABLE (napi::mobx_observable())
#define NAPI_MOBX_COMPUTED (napi::mobx_computed())

#define NAPI_DISCOURAGE_CLASS_PROPERTY 1
#define NAPI_ENCOURAGE_CLASS_PROPERTY 0

#define NAPI_PROPERTY_FUNCTION(NAME, FUNC, ATTR, MOBX) \
    (NAME, NULL, FUNC, NULL, NULL, NULL, ATTR, NULL, NAPI_ENCOURAGE_CLASS_PROPERTY, MOBX)
#define NAPI_PROPERTY_GETTER(NAME, FUNC, ATTR, MOBX) \
    (NAME, NULL, NULL, FUC, NULL, NULL, ATTR, NULL, NAPI_ENCOURAGE_CLASS_PROPERTY, MOBX)
#define NAPI_PROPERTY_SETTER(NAME, FUNC, ATTR, MOBX) \
    (NAME, NULL, NULL, NULL, SETTER, NULL, ATTR, NULL, NAPI_ENCOURAGE_CLASS_PROPERTY, MOBX)
#define NAPI_PROPERTY_VALUE(NAME, ATTR, MOBX) \
    (NAME, NULL, NULL, NULL, NULL, FUNC, ATTR, NULL, NAPI_DISCOURAGE_CLASS_PROPERTY, MOBX)

#define ___NAPI_DEFINE_PROPERTY_TO_DECORATE_PROPERTY(NAME, MOBX) \
	{ NAME, NULL, NULL, NULL, NULL, MOBX, napi_default, NULL },
#define __NAPI_DEFINE_PROPERTY_TO_DECORATE_PROPERTY(NAME, _1, _2, _3, _4, _5, _6, _7, _8, MOBX) \
    BOOST_PP_IF(BOOST_PP_IS_EMPTY(MOBX), BOOST_PP_TUPLE_EAT(), ___NAPI_DEFINE_PROPERTY_TO_DECORATE_PROPERTY)(NAME, MOBX)
#define ___NAPI_DEFINE_PROPERTY_TO_CLASS_PROPERTY(NAME, NAPI_NAME, METHOD, GETTER, SETTER, VALUE, ATTR, DATA, DISCOURAGE, _1) \
    { NAME, NAPI_NAME, METHOD, GETTER, SETTER, VALUE, ATTR, DATA },
#define __NAPI_DEFINE_PROPERTY_TO_CLASS_PROPERTY(NAME, NAPI_NAME, METHOD, GETTER, SETTER, VALUE, ATTR, DATA, DISCOURAGE, _1) \
    BOOST_PP_IF(DISCOURAGE, BOOST_PP_TUPLE_EAT(), \
        ___NAPI_DEFINE_PROPERTY_TO_CLASS_PROPERTY)(NAME, NAPI_NAME, METHOD, GETTER, SETTER, VALUE, ATTR, DATA)

#define __NAPI_IMPL_PROPERTIES1_(PROP) BOOST_PP_EXPAND(__NAPI_DEFINE_PROPERTY_TO_CLASS_PROPERTY(PROP))
#define __NAPI_IMPL_PROPERTIES1(_, __, PROP) __NAPI_IMPL_PROPERTIES1_ (BOOST_PP_TUPLE_ENUM(PROP))
#define __NAPI_IMPL_PROPERTIES2_(PROP) BOOST_PP_EXPAND(__NAPI_DEFINE_PROPERTY_TO_DECORATE_PROPERTY(PROP))
#define __NAPI_IMPL_PROPERTIES2(_, __, PROP) __NAPI_IMPL_PROPERTIES2_ (BOOST_PP_TUPLE_ENUM(PROP))

#define NAPI_DECLARE_CLASS_BASE(T, NAPI_CLASSNAME) \
public: \
  static void NAPI_Initialize(napi_env env); \
	static std::vector<napi_property_descriptor> __NAPI_GetClassPropertyDescriptors(); \
	static std::vector<napi_property_descriptor> __NAPI_GetDecoratePropertyDescriptors(); \
  static inline napi_value NAPI_Constructor(napi_env, napi_callback_info cbinfo) { return NULL; } \
	static inline std::string __NAPI_GetClassName() { return NAPI_CLASSNAME; } \
  static napi_ref __napi_constructor_reference_; \
private: \
  void NAPI_CreateInstance();

#define NAPI_DECLARE_CLASS(T, NAPI_CLASSNAME) \
  NAPI_DECLARE_CLASS_BASE(T, NAPI_CLASSNAME) \
  static inline napi_value T::__NAPI_GetParentConstructor(){return NULL;}

#define NAPI_DECLARE_CLASS_EXTENDS(T, U, NAPI_CLASSNAME) \
  NAPI_DECLARE_CLASS_BASE(T, NAPI_CLASSNAME) \
  static inline napi_value T::__NAPI_GetParentConstructor(){return napi::unref(U::__napi_constructor_reference_);}


#define NAPI_DEFINE_CLASS_(T, SEQ) \
	std::vector<napi_property_descriptor> T::__NAPI_GetClassPropertyDescriptors() { \
		return std::move(std::vector<napi_property_descriptor>{BOOST_PP_SEQ_FOR_EACH(__NAPI_IMPL_PROPERTIES1, _, SEQ)}); \
	} \
	std::vector<napi_property_descriptor> T::__NAPI_GetDecoratePropertyDescriptors() { \
		return std::move(std::vector<napi_property_descriptor>{BOOST_PP_SEQ_FOR_EACH(__NAPI_IMPL_PROPERTIES2, _, SEQ)}); \
	}

#define NAPI_DEFINE_CLASS(T, ...) \
	NAPI_DEFINE_CLASS_(T, BOOST_PP_IF(BOOST_PP_IS_EMPTY(__VA_ARGS__), BOOST_PP_TUPLE_EAT(),BOOST_PP_VARIADIC_TO_SEQ)(__VA_ARGS__)) \
  DEFINE_NAPI_Initialize(T) \
  NAPI_DEFINE_CreateInstance(T) \
  napi_ref T::__napi_constructor_reference_ = NULL;

#define NAPI_DEFINE_CreateInstance(T) \
  void T::NAPI_CreateInstance() { \
    NAPI_Instanceable::__NAPI_CreateInstance((void*)this, napi::unref(T::__napi_constructor_reference_)); \
  }

}

#include "napi_export.tc"

#endif // OLIVE_NAPI_EXPORT