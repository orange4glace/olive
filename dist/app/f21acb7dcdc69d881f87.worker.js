/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./node_modules/ts-loader/index.js!./app/internal/renderer/video-renderer/worker.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/base/common/assert.ts":
/*!***********************************!*\
  !*** ./app/base/common/assert.ts ***!
  \***********************************/
/*! exports provided: assert */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assert", function() { return assert; });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * Throws an error with the provided message if the provided value does not evaluate to a true Javascript value.
 */
function assert(value, message) {
    if (!value) {
        throw new Error(message ? 'Assertion failed (' + message + ')' : 'Assertion Failed');
    }
}


/***/ }),

/***/ "./app/base/common/time.ts":
/*!*********************************!*\
  !*** ./app/base/common/time.ts ***!
  \*********************************/
/*! exports provided: getCurrentSystemTime, systemTimeToMilliseconds */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentSystemTime", function() { return getCurrentSystemTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "systemTimeToMilliseconds", function() { return systemTimeToMilliseconds; });
function getCurrentSystemTime() {
    return Date.now();
}
function systemTimeToMilliseconds(systemTime) {
    return systemTime;
}


/***/ }),

/***/ "./app/internal/renderer/base/all.ts":
/*!*******************************************!*\
  !*** ./app/internal/renderer/base/all.ts ***!
  \*******************************************/
/*! exports provided: forceImport, TimelineManagerRenderer, TimelineRenderer, TrackRenderer, TrackItemRenderer, TrackItemTimeRenderer, VideoTrackItemRenderer, VideoMediaTrackItemRenderer, AudioTrackItemRenderer, ResourceRenderer, VideoResourceRenderer, AudioResourceRenderer, ProjectRenderer, SequenceRenderer, VideoSettingRenderer, AudioSettingRenderer, FrameRateRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forceImport", function() { return forceImport; });
/* harmony import */ var _timeline_timeline_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timeline/timeline-manager */ "./app/internal/renderer/base/timeline/timeline-manager.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TimelineManagerRenderer", function() { return _timeline_timeline_manager__WEBPACK_IMPORTED_MODULE_0__["TimelineManagerRenderer"]; });

/* harmony import */ var _timeline_timeline__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./timeline/timeline */ "./app/internal/renderer/base/timeline/timeline.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TimelineRenderer", function() { return _timeline_timeline__WEBPACK_IMPORTED_MODULE_1__["TimelineRenderer"]; });

/* harmony import */ var _timeline_track__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./timeline/track */ "./app/internal/renderer/base/timeline/track.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TrackRenderer", function() { return _timeline_track__WEBPACK_IMPORTED_MODULE_2__["TrackRenderer"]; });

/* harmony import */ var _timeline_track_item__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./timeline/track-item */ "./app/internal/renderer/base/timeline/track-item.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TrackItemRenderer", function() { return _timeline_track_item__WEBPACK_IMPORTED_MODULE_3__["TrackItemRenderer"]; });

/* harmony import */ var _timeline_track_item_time__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./timeline/track-item-time */ "./app/internal/renderer/base/timeline/track-item-time.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TrackItemTimeRenderer", function() { return _timeline_track_item_time__WEBPACK_IMPORTED_MODULE_4__["TrackItemTimeRenderer"]; });

/* harmony import */ var _timeline_track_item_video_track_item__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./timeline/track-item/video-track-item */ "./app/internal/renderer/base/timeline/track-item/video-track-item.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VideoTrackItemRenderer", function() { return _timeline_track_item_video_track_item__WEBPACK_IMPORTED_MODULE_5__["VideoTrackItemRenderer"]; });

/* harmony import */ var _timeline_track_item_video_media_track_item__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./timeline/track-item/video-media-track-item */ "./app/internal/renderer/base/timeline/track-item/video-media-track-item.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VideoMediaTrackItemRenderer", function() { return _timeline_track_item_video_media_track_item__WEBPACK_IMPORTED_MODULE_6__["VideoMediaTrackItemRenderer"]; });

/* harmony import */ var _timeline_track_item_audio_track_item__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./timeline/track-item/audio-track-item */ "./app/internal/renderer/base/timeline/track-item/audio-track-item.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AudioTrackItemRenderer", function() { return _timeline_track_item_audio_track_item__WEBPACK_IMPORTED_MODULE_7__["AudioTrackItemRenderer"]; });

/* harmony import */ var _resource_resource__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./resource/resource */ "./app/internal/renderer/base/resource/resource.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ResourceRenderer", function() { return _resource_resource__WEBPACK_IMPORTED_MODULE_8__["ResourceRenderer"]; });

/* harmony import */ var _resource_video_resource__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./resource/video-resource */ "./app/internal/renderer/base/resource/video-resource.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VideoResourceRenderer", function() { return _resource_video_resource__WEBPACK_IMPORTED_MODULE_9__["VideoResourceRenderer"]; });

/* harmony import */ var _resource_audio_resource__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./resource/audio-resource */ "./app/internal/renderer/base/resource/audio-resource.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AudioResourceRenderer", function() { return _resource_audio_resource__WEBPACK_IMPORTED_MODULE_10__["AudioResourceRenderer"]; });

/* harmony import */ var _project_project__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./project/project */ "./app/internal/renderer/base/project/project.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ProjectRenderer", function() { return _project_project__WEBPACK_IMPORTED_MODULE_11__["ProjectRenderer"]; });

/* harmony import */ var _project_sequence_sequence__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./project/sequence/sequence */ "./app/internal/renderer/base/project/sequence/sequence.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SequenceRenderer", function() { return _project_sequence_sequence__WEBPACK_IMPORTED_MODULE_12__["SequenceRenderer"]; });

/* harmony import */ var _project_sequence_video_setting__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./project/sequence/video-setting */ "./app/internal/renderer/base/project/sequence/video-setting.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VideoSettingRenderer", function() { return _project_sequence_video_setting__WEBPACK_IMPORTED_MODULE_13__["VideoSettingRenderer"]; });

/* harmony import */ var _project_sequence_audio_setting__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./project/sequence/audio-setting */ "./app/internal/renderer/base/project/sequence/audio-setting.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AudioSettingRenderer", function() { return _project_sequence_audio_setting__WEBPACK_IMPORTED_MODULE_14__["AudioSettingRenderer"]; });

/* harmony import */ var _project_sequence_frame_rate__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./project/sequence/frame-rate */ "./app/internal/renderer/base/project/sequence/frame-rate.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FrameRateRenderer", function() { return _project_sequence_frame_rate__WEBPACK_IMPORTED_MODULE_15__["FrameRateRenderer"]; });

/* harmony import */ var _rendering_all__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./rendering/all */ "./app/internal/renderer/base/rendering/all.ts");

















_rendering_all__WEBPACK_IMPORTED_MODULE_16__["forceImport"]();
function forceImport() { }


/***/ }),

/***/ "./app/internal/renderer/base/project/project.ts":
/*!*******************************************************!*\
  !*** ./app/internal/renderer/base/project/project.ts ***!
  \*******************************************************/
/*! exports provided: ProjectRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectRenderer", function() { return ProjectRenderer; });
/* harmony import */ var worker_postable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! worker-postable */ "./node_modules/worker-postable/dist/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let ProjectRenderer = class ProjectRenderer {
};
__decorate([
    worker_postable__WEBPACK_IMPORTED_MODULE_0__["posted"]
], ProjectRenderer.prototype, "sequence", void 0);
ProjectRenderer = __decorate([
    Object(worker_postable__WEBPACK_IMPORTED_MODULE_0__["Posted"])('Project')
], ProjectRenderer);



/***/ }),

/***/ "./app/internal/renderer/base/project/sequence/audio-setting.ts":
/*!**********************************************************************!*\
  !*** ./app/internal/renderer/base/project/sequence/audio-setting.ts ***!
  \**********************************************************************/
/*! exports provided: AudioSettingRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AudioSettingRenderer", function() { return AudioSettingRenderer; });
/* harmony import */ var worker_postable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! worker-postable */ "./node_modules/worker-postable/dist/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let AudioSettingRenderer = class AudioSettingRenderer {
};
__decorate([
    worker_postable__WEBPACK_IMPORTED_MODULE_0__["posted"]
], AudioSettingRenderer.prototype, "sampleRate", void 0);
AudioSettingRenderer = __decorate([
    Object(worker_postable__WEBPACK_IMPORTED_MODULE_0__["Posted"])('AudioSetting')
], AudioSettingRenderer);



/***/ }),

/***/ "./app/internal/renderer/base/project/sequence/frame-rate.ts":
/*!*******************************************************************!*\
  !*** ./app/internal/renderer/base/project/sequence/frame-rate.ts ***!
  \*******************************************************************/
/*! exports provided: FrameRateRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FrameRateRenderer", function() { return FrameRateRenderer; });
/* harmony import */ var worker_postable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! worker-postable */ "./node_modules/worker-postable/dist/index.js");
/* harmony import */ var base_common_time__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! base/common/time */ "./app/base/common/time.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


let FrameRateRenderer = class FrameRateRenderer {
    millisecondToTime(millisecond) {
        return Math.floor(millisecond * this.num / this.den / 1000);
    }
    systemTimeToTime(systemTime) {
        return this.millisecondToTime(Object(base_common_time__WEBPACK_IMPORTED_MODULE_1__["systemTimeToMilliseconds"])(systemTime));
    }
};
__decorate([
    worker_postable__WEBPACK_IMPORTED_MODULE_0__["posted"]
], FrameRateRenderer.prototype, "num", void 0);
__decorate([
    worker_postable__WEBPACK_IMPORTED_MODULE_0__["posted"]
], FrameRateRenderer.prototype, "den", void 0);
FrameRateRenderer = __decorate([
    Object(worker_postable__WEBPACK_IMPORTED_MODULE_0__["Posted"])('FrameRate')
], FrameRateRenderer);



/***/ }),

/***/ "./app/internal/renderer/base/project/sequence/sequence.ts":
/*!*****************************************************************!*\
  !*** ./app/internal/renderer/base/project/sequence/sequence.ts ***!
  \*****************************************************************/
/*! exports provided: SequenceRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SequenceRenderer", function() { return SequenceRenderer; });
/* harmony import */ var worker_postable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! worker-postable */ "./node_modules/worker-postable/dist/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let SequenceRenderer = class SequenceRenderer {
    audioFrameToTime(frame) {
        return this.videoSetting.frameRate.millisecondToTime(Math.floor(frame / this.audioSetting.sampleRate * 1000));
    }
    timeToAudioFrame(time) {
        return Math.floor(time * this.audioSetting.sampleRate * this.videoSetting.frameRate.den / this.videoSetting.frameRate.num);
    }
};
__decorate([
    worker_postable__WEBPACK_IMPORTED_MODULE_0__["posted"]
], SequenceRenderer.prototype, "videoSetting", void 0);
__decorate([
    worker_postable__WEBPACK_IMPORTED_MODULE_0__["posted"]
], SequenceRenderer.prototype, "audioSetting", void 0);
SequenceRenderer = __decorate([
    Object(worker_postable__WEBPACK_IMPORTED_MODULE_0__["Posted"])('Sequence')
], SequenceRenderer);



/***/ }),

/***/ "./app/internal/renderer/base/project/sequence/video-setting.ts":
/*!**********************************************************************!*\
  !*** ./app/internal/renderer/base/project/sequence/video-setting.ts ***!
  \**********************************************************************/
/*! exports provided: VideoSettingRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoSettingRenderer", function() { return VideoSettingRenderer; });
/* harmony import */ var worker_postable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! worker-postable */ "./node_modules/worker-postable/dist/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let VideoSettingRenderer = class VideoSettingRenderer {
};
__decorate([
    worker_postable__WEBPACK_IMPORTED_MODULE_0__["posted"]
], VideoSettingRenderer.prototype, "screenWidth", void 0);
__decorate([
    worker_postable__WEBPACK_IMPORTED_MODULE_0__["posted"]
], VideoSettingRenderer.prototype, "screenHeight", void 0);
__decorate([
    worker_postable__WEBPACK_IMPORTED_MODULE_0__["posted"]
], VideoSettingRenderer.prototype, "frameRate", void 0);
VideoSettingRenderer = __decorate([
    Object(worker_postable__WEBPACK_IMPORTED_MODULE_0__["Posted"])('VideoSetting')
], VideoSettingRenderer);



/***/ }),

/***/ "./app/internal/renderer/base/rendering/all.ts":
/*!*****************************************************!*\
  !*** ./app/internal/renderer/base/rendering/all.ts ***!
  \*****************************************************/
/*! exports provided: forceImport, DrawingRenderer, VideoDrawingRenderer, RectangleDrawingRenderer, VideoMediaDrawingRenderer, EffectRenderer, VideoEffectRenderer, TransformEffectRenderer, RectangleEffectRenderer, PropertyRenderer, Vector2PropertyRenderer, Vector4PropertyRenderer, PolyPathPropertyRenderer, KeyframeRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forceImport", function() { return forceImport; });
/* harmony import */ var internal_renderer_base_rendering_drawing_drawing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! internal/renderer/base/rendering/drawing/drawing */ "./app/internal/renderer/base/rendering/drawing/drawing.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DrawingRenderer", function() { return internal_renderer_base_rendering_drawing_drawing__WEBPACK_IMPORTED_MODULE_0__["DrawingRenderer"]; });

/* harmony import */ var internal_renderer_base_rendering_drawing_video_drawing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! internal/renderer/base/rendering/drawing/video-drawing */ "./app/internal/renderer/base/rendering/drawing/video-drawing.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VideoDrawingRenderer", function() { return internal_renderer_base_rendering_drawing_video_drawing__WEBPACK_IMPORTED_MODULE_1__["VideoDrawingRenderer"]; });

/* harmony import */ var internal_renderer_base_rendering_drawing_rectangle_drawing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! internal/renderer/base/rendering/drawing/rectangle-drawing */ "./app/internal/renderer/base/rendering/drawing/rectangle-drawing.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RectangleDrawingRenderer", function() { return internal_renderer_base_rendering_drawing_rectangle_drawing__WEBPACK_IMPORTED_MODULE_2__["RectangleDrawingRenderer"]; });

/* harmony import */ var internal_renderer_base_rendering_drawing_video_media_drawing__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! internal/renderer/base/rendering/drawing/video-media-drawing */ "./app/internal/renderer/base/rendering/drawing/video-media-drawing.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VideoMediaDrawingRenderer", function() { return internal_renderer_base_rendering_drawing_video_media_drawing__WEBPACK_IMPORTED_MODULE_3__["VideoMediaDrawingRenderer"]; });

/* harmony import */ var internal_renderer_base_rendering_effect_effect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! internal/renderer/base/rendering/effect/effect */ "./app/internal/renderer/base/rendering/effect/effect.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EffectRenderer", function() { return internal_renderer_base_rendering_effect_effect__WEBPACK_IMPORTED_MODULE_4__["EffectRenderer"]; });

/* harmony import */ var internal_renderer_base_rendering_effect_video_effect_video_effect__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! internal/renderer/base/rendering/effect/video-effect/video-effect */ "./app/internal/renderer/base/rendering/effect/video-effect/video-effect.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VideoEffectRenderer", function() { return internal_renderer_base_rendering_effect_video_effect_video_effect__WEBPACK_IMPORTED_MODULE_5__["VideoEffectRenderer"]; });

/* harmony import */ var internal_renderer_base_rendering_effect_video_effect_transform_effect__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! internal/renderer/base/rendering/effect/video-effect/transform-effect */ "./app/internal/renderer/base/rendering/effect/video-effect/transform-effect.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TransformEffectRenderer", function() { return internal_renderer_base_rendering_effect_video_effect_transform_effect__WEBPACK_IMPORTED_MODULE_6__["TransformEffectRenderer"]; });

/* harmony import */ var internal_renderer_base_rendering_effect_video_effect_rectangle_effect__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! internal/renderer/base/rendering/effect/video-effect/rectangle-effect */ "./app/internal/renderer/base/rendering/effect/video-effect/rectangle-effect.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RectangleEffectRenderer", function() { return internal_renderer_base_rendering_effect_video_effect_rectangle_effect__WEBPACK_IMPORTED_MODULE_7__["RectangleEffectRenderer"]; });

/* harmony import */ var internal_renderer_base_rendering_property_property__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! internal/renderer/base/rendering/property/property */ "./app/internal/renderer/base/rendering/property/property.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyRenderer", function() { return internal_renderer_base_rendering_property_property__WEBPACK_IMPORTED_MODULE_8__["PropertyRenderer"]; });

/* harmony import */ var internal_renderer_base_rendering_property_vector2_property__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! internal/renderer/base/rendering/property/vector2-property */ "./app/internal/renderer/base/rendering/property/vector2-property.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Vector2PropertyRenderer", function() { return internal_renderer_base_rendering_property_vector2_property__WEBPACK_IMPORTED_MODULE_9__["Vector2PropertyRenderer"]; });

/* harmony import */ var internal_renderer_base_rendering_property_vector4_property__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! internal/renderer/base/rendering/property/vector4-property */ "./app/internal/renderer/base/rendering/property/vector4-property.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Vector4PropertyRenderer", function() { return internal_renderer_base_rendering_property_vector4_property__WEBPACK_IMPORTED_MODULE_10__["Vector4PropertyRenderer"]; });

/* harmony import */ var internal_renderer_base_rendering_property_polypath_property__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! internal/renderer/base/rendering/property/polypath-property */ "./app/internal/renderer/base/rendering/property/polypath-property.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PolyPathPropertyRenderer", function() { return internal_renderer_base_rendering_property_polypath_property__WEBPACK_IMPORTED_MODULE_11__["PolyPathPropertyRenderer"]; });

/* harmony import */ var internal_renderer_base_rendering_property_keyframe__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! internal/renderer/base/rendering/property/keyframe */ "./app/internal/renderer/base/rendering/property/keyframe.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "KeyframeRenderer", function() { return internal_renderer_base_rendering_property_keyframe__WEBPACK_IMPORTED_MODULE_12__["KeyframeRenderer"]; });










// export * from 'internal/renderer/rendering/property/scalar-property'




function forceImport() { }


/***/ }),

/***/ "./app/internal/renderer/base/rendering/drawing/drawing.ts":
/*!*****************************************************************!*\
  !*** ./app/internal/renderer/base/rendering/drawing/drawing.ts ***!
  \*****************************************************************/
/*! exports provided: DrawingRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrawingRenderer", function() { return DrawingRenderer; });
class DrawingRenderer {
}


/***/ }),

/***/ "./app/internal/renderer/base/rendering/drawing/rectangle-drawing.ts":
/*!***************************************************************************!*\
  !*** ./app/internal/renderer/base/rendering/drawing/rectangle-drawing.ts ***!
  \***************************************************************************/
/*! exports provided: RectangleDrawingRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RectangleDrawingRenderer", function() { return RectangleDrawingRenderer; });
/* harmony import */ var worker_postable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! worker-postable */ "./node_modules/worker-postable/dist/index.js");
/* harmony import */ var internal_renderer_base_rendering_drawing_video_drawing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! internal/renderer/base/rendering/drawing/video-drawing */ "./app/internal/renderer/base/rendering/drawing/video-drawing.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


let RectangleDrawingRenderer = class RectangleDrawingRenderer extends internal_renderer_base_rendering_drawing_video_drawing__WEBPACK_IMPORTED_MODULE_1__["VideoDrawingRenderer"] {
};
RectangleDrawingRenderer = __decorate([
    Object(worker_postable__WEBPACK_IMPORTED_MODULE_0__["Posted"])('RectangleDrawing')
], RectangleDrawingRenderer);



/***/ }),

/***/ "./app/internal/renderer/base/rendering/drawing/video-drawing.ts":
/*!***********************************************************************!*\
  !*** ./app/internal/renderer/base/rendering/drawing/video-drawing.ts ***!
  \***********************************************************************/
/*! exports provided: VideoDrawingRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoDrawingRenderer", function() { return VideoDrawingRenderer; });
/* harmony import */ var internal_renderer_base_rendering_drawing_drawing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! internal/renderer/base/rendering/drawing/drawing */ "./app/internal/renderer/base/rendering/drawing/drawing.ts");

class VideoDrawingRenderer extends internal_renderer_base_rendering_drawing_drawing__WEBPACK_IMPORTED_MODULE_0__["DrawingRenderer"] {
}


/***/ }),

/***/ "./app/internal/renderer/base/rendering/drawing/video-media-drawing.ts":
/*!*****************************************************************************!*\
  !*** ./app/internal/renderer/base/rendering/drawing/video-media-drawing.ts ***!
  \*****************************************************************************/
/*! exports provided: VideoMediaDrawingRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoMediaDrawingRenderer", function() { return VideoMediaDrawingRenderer; });
/* harmony import */ var worker_postable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! worker-postable */ "./node_modules/worker-postable/dist/index.js");
/* harmony import */ var internal_renderer_base_rendering_drawing_video_drawing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! internal/renderer/base/rendering/drawing/video-drawing */ "./app/internal/renderer/base/rendering/drawing/video-drawing.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


let VideoMediaDrawingRenderer = class VideoMediaDrawingRenderer extends internal_renderer_base_rendering_drawing_video_drawing__WEBPACK_IMPORTED_MODULE_1__["VideoDrawingRenderer"] {
};
VideoMediaDrawingRenderer = __decorate([
    Object(worker_postable__WEBPACK_IMPORTED_MODULE_0__["Posted"])('VideoMediaDrawing')
], VideoMediaDrawingRenderer);



/***/ }),

/***/ "./app/internal/renderer/base/rendering/effect/effect.ts":
/*!***************************************************************!*\
  !*** ./app/internal/renderer/base/rendering/effect/effect.ts ***!
  \***************************************************************/
/*! exports provided: EffectRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EffectRenderer", function() { return EffectRenderer; });
class EffectRenderer {
}


/***/ }),

/***/ "./app/internal/renderer/base/rendering/effect/video-effect/rectangle-effect.ts":
/*!**************************************************************************************!*\
  !*** ./app/internal/renderer/base/rendering/effect/video-effect/rectangle-effect.ts ***!
  \**************************************************************************************/
/*! exports provided: RectangleEffectRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RectangleEffectRenderer", function() { return RectangleEffectRenderer; });
/* harmony import */ var internal_renderer_base_rendering_effect_video_effect_video_effect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! internal/renderer/base/rendering/effect/video-effect/video-effect */ "./app/internal/renderer/base/rendering/effect/video-effect/video-effect.ts");
/* harmony import */ var worker_postable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! worker-postable */ "./node_modules/worker-postable/dist/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


let RectangleEffectRenderer = class RectangleEffectRenderer extends internal_renderer_base_rendering_effect_video_effect_video_effect__WEBPACK_IMPORTED_MODULE_0__["VideoEffectRenderer"] {
};
RectangleEffectRenderer = __decorate([
    Object(worker_postable__WEBPACK_IMPORTED_MODULE_1__["Posted"])('RectangleEffect')
], RectangleEffectRenderer);



/***/ }),

/***/ "./app/internal/renderer/base/rendering/effect/video-effect/transform-effect.ts":
/*!**************************************************************************************!*\
  !*** ./app/internal/renderer/base/rendering/effect/video-effect/transform-effect.ts ***!
  \**************************************************************************************/
/*! exports provided: TransformEffectRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransformEffectRenderer", function() { return TransformEffectRenderer; });
/* harmony import */ var internal_renderer_base_rendering_effect_video_effect_video_effect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! internal/renderer/base/rendering/effect/video-effect/video-effect */ "./app/internal/renderer/base/rendering/effect/video-effect/video-effect.ts");
/* harmony import */ var worker_postable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! worker-postable */ "./node_modules/worker-postable/dist/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


let TransformEffectRenderer = class TransformEffectRenderer extends internal_renderer_base_rendering_effect_video_effect_video_effect__WEBPACK_IMPORTED_MODULE_0__["VideoEffectRenderer"] {
};
TransformEffectRenderer = __decorate([
    Object(worker_postable__WEBPACK_IMPORTED_MODULE_1__["Posted"])('TransformEffect')
], TransformEffectRenderer);



/***/ }),

/***/ "./app/internal/renderer/base/rendering/effect/video-effect/video-effect.ts":
/*!**********************************************************************************!*\
  !*** ./app/internal/renderer/base/rendering/effect/video-effect/video-effect.ts ***!
  \**********************************************************************************/
/*! exports provided: VideoEffectRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoEffectRenderer", function() { return VideoEffectRenderer; });
/* harmony import */ var internal_renderer_base_rendering_effect_effect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! internal/renderer/base/rendering/effect/effect */ "./app/internal/renderer/base/rendering/effect/effect.ts");

class VideoEffectRenderer extends internal_renderer_base_rendering_effect_effect__WEBPACK_IMPORTED_MODULE_0__["EffectRenderer"] {
}


/***/ }),

/***/ "./app/internal/renderer/base/rendering/property/keyframe.ts":
/*!*******************************************************************!*\
  !*** ./app/internal/renderer/base/rendering/property/keyframe.ts ***!
  \*******************************************************************/
/*! exports provided: KeyframeRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeyframeRenderer", function() { return KeyframeRenderer; });
/* harmony import */ var worker_postable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! worker-postable */ "./node_modules/worker-postable/dist/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let KeyframeRenderer = class KeyframeRenderer {
};
KeyframeRenderer = __decorate([
    Object(worker_postable__WEBPACK_IMPORTED_MODULE_0__["Posted"])('Keyframe')
], KeyframeRenderer);



/***/ }),

/***/ "./app/internal/renderer/base/rendering/property/polypath-property.ts":
/*!****************************************************************************!*\
  !*** ./app/internal/renderer/base/rendering/property/polypath-property.ts ***!
  \****************************************************************************/
/*! exports provided: PolyPathPropertyRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PolyPathPropertyRenderer", function() { return PolyPathPropertyRenderer; });
/* harmony import */ var internal_renderer_base_rendering_property_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! internal/renderer/base/rendering/property/property */ "./app/internal/renderer/base/rendering/property/property.ts");
/* harmony import */ var oliveutil_vector2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! oliveutil/vector2 */ "./app/oliveutil/vector2.ts");
/* harmony import */ var worker_postable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! worker-postable */ "./node_modules/worker-postable/dist/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



let PolyPathPropertyRenderer = class PolyPathPropertyRenderer extends internal_renderer_base_rendering_property_property__WEBPACK_IMPORTED_MODULE_0__["PropertyRenderer"] {
    interpolate(lhs, rhs, t) {
        console.assert(lhs.length == rhs.length);
        let res = [];
        for (let i = 0; i < lhs.length; i++) {
            const vec1 = lhs[i];
            const vec2 = rhs[i];
            const vec = new oliveutil_vector2__WEBPACK_IMPORTED_MODULE_1__["Vector2Renderer"](vec1.x + (vec2.x - vec1.x) * t, vec1.y + (vec2.y - vec1.y) * t);
            res.push(vec);
        }
        return res;
    }
};
PolyPathPropertyRenderer = __decorate([
    Object(worker_postable__WEBPACK_IMPORTED_MODULE_2__["Posted"])('PolyPathProperty')
], PolyPathPropertyRenderer);



/***/ }),

/***/ "./app/internal/renderer/base/rendering/property/property.ts":
/*!*******************************************************************!*\
  !*** ./app/internal/renderer/base/rendering/property/property.ts ***!
  \*******************************************************************/
/*! exports provided: PropertyRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyRenderer", function() { return PropertyRenderer; });
/* harmony import */ var worker_postable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! worker-postable */ "./node_modules/worker-postable/dist/index.js");
/* harmony import */ var tstl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tstl */ "./node_modules/tstl/index.js");
/* harmony import */ var tstl__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(tstl__WEBPACK_IMPORTED_MODULE_1__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


let PropertyRenderer = class PropertyRenderer {
    constructor() {
        this.keyframeMap = new tstl__WEBPACK_IMPORTED_MODULE_1__["TreeMap"]();
        this.observeKeyframes = this.observeKeyframes.bind(this);
        Object(worker_postable__WEBPACK_IMPORTED_MODULE_0__["listen"])(this, (change) => {
            if ((change.type == 'add' || change.type == 'update') && change.name == 'keyframes')
                this.observeKeyframes(change.newValue);
        });
    }
    observeKeyframes(keyframes) {
        Object(worker_postable__WEBPACK_IMPORTED_MODULE_0__["listen"])(keyframes, change => {
            if (change.type == 'add') {
                let keyframe = change.newValue;
                this.keyframeMap.insert(Object(tstl__WEBPACK_IMPORTED_MODULE_1__["make_pair"])(keyframe.timecode, keyframe));
            }
        });
    }
    accessBefore(timeoffset) {
        let it = this.keyframeMap.lower_bound(timeoffset);
        if (it.equals(this.keyframeMap.end()))
            if (this.keyframeMap.size() > 0)
                return this.keyframeMap.rbegin().value.second;
            else
                return null;
        if (it.value.second.timecode == timeoffset)
            return it.value.second;
        if (it.equals(this.keyframeMap.begin()))
            return null;
        return it.prev().value.second;
    }
    accessAfter(timeoffset) {
        let it = this.keyframeMap.lower_bound(timeoffset);
        if (it.equals(this.keyframeMap.end()))
            return null;
        return it.value.second;
    }
    getInterpolatedPropertyValue(timecode) {
        if (this.keyframes.size == 0)
            return this.defaultKeyframe.value;
        var bef = this.accessBefore(timecode);
        var aft = this.accessAfter(timecode);
        if (bef == null)
            return aft.value;
        if (aft == null)
            return bef.value;
        var t = (timecode - bef.timecode) / (aft.timecode - bef.timecode);
        return this.interpolate(bef.value, aft.value, t);
    }
};
__decorate([
    worker_postable__WEBPACK_IMPORTED_MODULE_0__["listenable"]
], PropertyRenderer.prototype, "keyframes", void 0);
PropertyRenderer = __decorate([
    Object(worker_postable__WEBPACK_IMPORTED_MODULE_0__["Posted"])('Property')
], PropertyRenderer);



/***/ }),

/***/ "./app/internal/renderer/base/rendering/property/vector2-property.ts":
/*!***************************************************************************!*\
  !*** ./app/internal/renderer/base/rendering/property/vector2-property.ts ***!
  \***************************************************************************/
/*! exports provided: Vector2PropertyRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vector2PropertyRenderer", function() { return Vector2PropertyRenderer; });
/* harmony import */ var internal_renderer_base_rendering_property_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! internal/renderer/base/rendering/property/property */ "./app/internal/renderer/base/rendering/property/property.ts");
/* harmony import */ var oliveutil_vector2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! oliveutil/vector2 */ "./app/oliveutil/vector2.ts");
/* harmony import */ var worker_postable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! worker-postable */ "./node_modules/worker-postable/dist/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



let Vector2PropertyRenderer = class Vector2PropertyRenderer extends internal_renderer_base_rendering_property_property__WEBPACK_IMPORTED_MODULE_0__["PropertyRenderer"] {
    interpolate(lhs, rhs, t) {
        return new oliveutil_vector2__WEBPACK_IMPORTED_MODULE_1__["Vector2Renderer"](lhs.x + (rhs.x - lhs.x) * t, lhs.y + (rhs.y - lhs.y) * t);
    }
};
Vector2PropertyRenderer = __decorate([
    Object(worker_postable__WEBPACK_IMPORTED_MODULE_2__["Posted"])('Vector2Property')
], Vector2PropertyRenderer);



/***/ }),

/***/ "./app/internal/renderer/base/rendering/property/vector4-property.ts":
/*!***************************************************************************!*\
  !*** ./app/internal/renderer/base/rendering/property/vector4-property.ts ***!
  \***************************************************************************/
/*! exports provided: Vector4PropertyRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vector4PropertyRenderer", function() { return Vector4PropertyRenderer; });
/* harmony import */ var oliveutil_vector4__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! oliveutil/vector4 */ "./app/oliveutil/vector4.ts");
/* harmony import */ var worker_postable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! worker-postable */ "./node_modules/worker-postable/dist/index.js");
/* harmony import */ var internal_renderer_base_rendering_property_property__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! internal/renderer/base/rendering/property/property */ "./app/internal/renderer/base/rendering/property/property.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



let Vector4PropertyRenderer = class Vector4PropertyRenderer extends internal_renderer_base_rendering_property_property__WEBPACK_IMPORTED_MODULE_2__["PropertyRenderer"] {
    interpolate(lhs, rhs, t) {
        return new oliveutil_vector4__WEBPACK_IMPORTED_MODULE_0__["Vector4Renderer"](lhs.x + (rhs.x - lhs.x) * t, lhs.y + (rhs.y - lhs.y) * t, lhs.z + (rhs.z - lhs.z) * t, lhs.w + (rhs.w - lhs.w) * t);
    }
};
Vector4PropertyRenderer = __decorate([
    Object(worker_postable__WEBPACK_IMPORTED_MODULE_1__["Posted"])('Vector4Property')
], Vector4PropertyRenderer);



/***/ }),

/***/ "./app/internal/renderer/base/resource/audio-resource.ts":
/*!***************************************************************!*\
  !*** ./app/internal/renderer/base/resource/audio-resource.ts ***!
  \***************************************************************/
/*! exports provided: AudioResourceRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AudioResourceRenderer", function() { return AudioResourceRenderer; });
/* harmony import */ var worker_postable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! worker-postable */ "./node_modules/worker-postable/dist/index.js");
/* harmony import */ var _resource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resource */ "./app/internal/renderer/base/resource/resource.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


let AudioResourceRenderer = class AudioResourceRenderer extends _resource__WEBPACK_IMPORTED_MODULE_1__["ResourceRenderer"] {
};
AudioResourceRenderer = __decorate([
    Object(worker_postable__WEBPACK_IMPORTED_MODULE_0__["Posted"])('AudioResource')
], AudioResourceRenderer);



/***/ }),

/***/ "./app/internal/renderer/base/resource/resource.ts":
/*!*********************************************************!*\
  !*** ./app/internal/renderer/base/resource/resource.ts ***!
  \*********************************************************/
/*! exports provided: ResourceRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResourceRenderer", function() { return ResourceRenderer; });
/* harmony import */ var worker_postable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! worker-postable */ "./node_modules/worker-postable/dist/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let ResourceRenderer = class ResourceRenderer {
};
ResourceRenderer = __decorate([
    Object(worker_postable__WEBPACK_IMPORTED_MODULE_0__["Posted"])('Resource')
], ResourceRenderer);



/***/ }),

/***/ "./app/internal/renderer/base/resource/video-resource.ts":
/*!***************************************************************!*\
  !*** ./app/internal/renderer/base/resource/video-resource.ts ***!
  \***************************************************************/
/*! exports provided: VideoResourceRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoResourceRenderer", function() { return VideoResourceRenderer; });
/* harmony import */ var worker_postable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! worker-postable */ "./node_modules/worker-postable/dist/index.js");
/* harmony import */ var _resource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resource */ "./app/internal/renderer/base/resource/resource.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


let VideoResourceRenderer = class VideoResourceRenderer extends _resource__WEBPACK_IMPORTED_MODULE_1__["ResourceRenderer"] {
};
VideoResourceRenderer = __decorate([
    Object(worker_postable__WEBPACK_IMPORTED_MODULE_0__["Posted"])('VideoResource')
], VideoResourceRenderer);



/***/ }),

/***/ "./app/internal/renderer/base/timeline/timeline-manager.ts":
/*!*****************************************************************!*\
  !*** ./app/internal/renderer/base/timeline/timeline-manager.ts ***!
  \*****************************************************************/
/*! exports provided: TimelineManagerRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimelineManagerRenderer", function() { return TimelineManagerRenderer; });
/* harmony import */ var base_common_assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! base/common/assert */ "./app/base/common/assert.ts");
/* harmony import */ var worker_postable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! worker-postable */ "./node_modules/worker-postable/dist/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


let TimelineManagerRenderer = class TimelineManagerRenderer {
    getTimeline(id) {
        const timeline = this.timelines.get(id);
        Object(base_common_assert__WEBPACK_IMPORTED_MODULE_0__["assert"])(timeline, 'Timeline ' + id + ' not found.');
        return timeline;
    }
};
__decorate([
    worker_postable__WEBPACK_IMPORTED_MODULE_1__["posted"]
], TimelineManagerRenderer.prototype, "timelines", void 0);
__decorate([
    worker_postable__WEBPACK_IMPORTED_MODULE_1__["posted"]
], TimelineManagerRenderer.prototype, "targetTimeline", void 0);
TimelineManagerRenderer = __decorate([
    Object(worker_postable__WEBPACK_IMPORTED_MODULE_1__["Posted"])('TimelineManagerImpl')
], TimelineManagerRenderer);



/***/ }),

/***/ "./app/internal/renderer/base/timeline/timeline.ts":
/*!*********************************************************!*\
  !*** ./app/internal/renderer/base/timeline/timeline.ts ***!
  \*********************************************************/
/*! exports provided: TimelineRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimelineRenderer", function() { return TimelineRenderer; });
/* harmony import */ var worker_postable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! worker-postable */ "./node_modules/worker-postable/dist/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let TimelineRenderer = class TimelineRenderer {
};
__decorate([
    worker_postable__WEBPACK_IMPORTED_MODULE_0__["posted"]
], TimelineRenderer.prototype, "sequence", void 0);
TimelineRenderer = __decorate([
    Object(worker_postable__WEBPACK_IMPORTED_MODULE_0__["Posted"])('TimelineImpl')
], TimelineRenderer);



/***/ }),

/***/ "./app/internal/renderer/base/timeline/track-item-time.ts":
/*!****************************************************************!*\
  !*** ./app/internal/renderer/base/timeline/track-item-time.ts ***!
  \****************************************************************/
/*! exports provided: TrackItemTimeRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TrackItemTimeRenderer", function() { return TrackItemTimeRenderer; });
/* harmony import */ var worker_postable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! worker-postable */ "./node_modules/worker-postable/dist/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let TrackItemTimeRenderer = class TrackItemTimeRenderer {
    // constructor(start: number, end: number, base: number) {
    //   this.start = start;
    //   this.end = end;
    //   this.base = base;
    // }
    equals(rhs) {
        return this.start == rhs.start && this.end == rhs.end;
    }
    hashCode() {
        return 0;
    }
    less(rhs) {
        if (this.start == rhs.start)
            return this.end < rhs.end;
        return this.start < rhs.start;
    }
};
TrackItemTimeRenderer = __decorate([
    Object(worker_postable__WEBPACK_IMPORTED_MODULE_0__["Posted"])('TrackItemTime')
], TrackItemTimeRenderer);



/***/ }),

/***/ "./app/internal/renderer/base/timeline/track-item.ts":
/*!***********************************************************!*\
  !*** ./app/internal/renderer/base/timeline/track-item.ts ***!
  \***********************************************************/
/*! exports provided: TrackItemRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TrackItemRenderer", function() { return TrackItemRenderer; });
class TrackItemRenderer {
}


/***/ }),

/***/ "./app/internal/renderer/base/timeline/track-item/audio-track-item.ts":
/*!****************************************************************************!*\
  !*** ./app/internal/renderer/base/timeline/track-item/audio-track-item.ts ***!
  \****************************************************************************/
/*! exports provided: AudioTrackItemRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AudioTrackItemRenderer", function() { return AudioTrackItemRenderer; });
/* harmony import */ var internal_renderer_base_timeline_track_item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! internal/renderer/base/timeline/track-item */ "./app/internal/renderer/base/timeline/track-item.ts");
/* harmony import */ var worker_postable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! worker-postable */ "./node_modules/worker-postable/dist/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


let AudioTrackItemRenderer = class AudioTrackItemRenderer extends internal_renderer_base_timeline_track_item__WEBPACK_IMPORTED_MODULE_0__["TrackItemRenderer"] {
};
__decorate([
    worker_postable__WEBPACK_IMPORTED_MODULE_1__["posted"]
], AudioTrackItemRenderer.prototype, "resource", void 0);
__decorate([
    worker_postable__WEBPACK_IMPORTED_MODULE_1__["posted"]
], AudioTrackItemRenderer.prototype, "drawing", void 0);
AudioTrackItemRenderer = __decorate([
    Object(worker_postable__WEBPACK_IMPORTED_MODULE_1__["Posted"])('AudioTrackItemImpl')
], AudioTrackItemRenderer);



/***/ }),

/***/ "./app/internal/renderer/base/timeline/track-item/video-media-track-item.ts":
/*!**********************************************************************************!*\
  !*** ./app/internal/renderer/base/timeline/track-item/video-media-track-item.ts ***!
  \**********************************************************************************/
/*! exports provided: VideoMediaTrackItemRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoMediaTrackItemRenderer", function() { return VideoMediaTrackItemRenderer; });
/* harmony import */ var worker_postable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! worker-postable */ "./node_modules/worker-postable/dist/index.js");
/* harmony import */ var internal_renderer_base_timeline_track_item_video_track_item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! internal/renderer/base/timeline/track-item/video-track-item */ "./app/internal/renderer/base/timeline/track-item/video-track-item.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


let VideoMediaTrackItemRenderer = class VideoMediaTrackItemRenderer extends internal_renderer_base_timeline_track_item_video_track_item__WEBPACK_IMPORTED_MODULE_1__["VideoTrackItemRenderer"] {
};
VideoMediaTrackItemRenderer = __decorate([
    Object(worker_postable__WEBPACK_IMPORTED_MODULE_0__["Posted"])('VideoMediaTrackItemImpl')
], VideoMediaTrackItemRenderer);



/***/ }),

/***/ "./app/internal/renderer/base/timeline/track-item/video-track-item.ts":
/*!****************************************************************************!*\
  !*** ./app/internal/renderer/base/timeline/track-item/video-track-item.ts ***!
  \****************************************************************************/
/*! exports provided: VideoTrackItemRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoTrackItemRenderer", function() { return VideoTrackItemRenderer; });
/* harmony import */ var internal_renderer_base_timeline_track_item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! internal/renderer/base/timeline/track-item */ "./app/internal/renderer/base/timeline/track-item.ts");

class VideoTrackItemRenderer extends internal_renderer_base_timeline_track_item__WEBPACK_IMPORTED_MODULE_0__["TrackItemRenderer"] {
}


/***/ }),

/***/ "./app/internal/renderer/base/timeline/track.ts":
/*!******************************************************!*\
  !*** ./app/internal/renderer/base/timeline/track.ts ***!
  \******************************************************/
/*! exports provided: TrackRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TrackRenderer", function() { return TrackRenderer; });
/* harmony import */ var internal_renderer_base_timeline_track_item_time__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! internal/renderer/base/timeline/track-item-time */ "./app/internal/renderer/base/timeline/track-item-time.ts");
/* harmony import */ var tstl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tstl */ "./node_modules/tstl/index.js");
/* harmony import */ var tstl__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(tstl__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var worker_postable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! worker-postable */ "./node_modules/worker-postable/dist/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



let __next_track_id = 0;
let TrackRenderer = class TrackRenderer {
    constructor() {
        this.id = __next_track_id++;
        this.trackItemTreeMap = new tstl__WEBPACK_IMPORTED_MODULE_1__["TreeMap"]();
        this.trackItemEndTimeTreeMap = new tstl__WEBPACK_IMPORTED_MODULE_1__["TreeMap"]();
        this.observeTrackItems = this.observeTrackItems.bind(this);
        Object(worker_postable__WEBPACK_IMPORTED_MODULE_2__["listen"])(this, (change) => {
            if ((change.type == 'add' || change.type == 'update') && change.name == 'trackItems')
                this.observeTrackItems(change.newValue);
        });
    }
    observeTrackItems(keyframes) {
        Object(worker_postable__WEBPACK_IMPORTED_MODULE_2__["listen"])(keyframes, (change) => {
            if (change.type == 'add') {
                let trackItem = change.name;
                let timePair = change.newValue;
                console.log(trackItem, timePair);
                this.trackItemTreeMap.insert(Object(tstl__WEBPACK_IMPORTED_MODULE_1__["make_pair"])(timePair, trackItem));
                this.trackItemEndTimeTreeMap.insert(Object(tstl__WEBPACK_IMPORTED_MODULE_1__["make_pair"])(timePair.end, trackItem));
            }
            else if (change.type == 'update') {
                let trackItem = change.name;
                let oldv = change.oldValue;
                let newv = change.newValue;
                this.trackItemTreeMap.erase(oldv);
                this.trackItemTreeMap.insert(Object(tstl__WEBPACK_IMPORTED_MODULE_1__["make_pair"])(newv, trackItem));
                this.trackItemEndTimeTreeMap.erase(oldv.end);
                this.trackItemEndTimeTreeMap.insert(Object(tstl__WEBPACK_IMPORTED_MODULE_1__["make_pair"])(newv.end, trackItem));
            }
            else if (change.type == 'delete') {
                let trackItem = change.name;
                let oldv = change.oldValue;
                this.trackItemTreeMap.erase(oldv);
                this.trackItemEndTimeTreeMap.erase(oldv.end);
            }
        });
    }
    getTrackItemAt(time) {
        let q = new internal_renderer_base_timeline_track_item_time__WEBPACK_IMPORTED_MODULE_0__["TrackItemTimeRenderer"]();
        q.start = q.end = time;
        let it = this.trackItemTreeMap.lower_bound(q);
        if (it.equals(this.trackItemTreeMap.end()) || time < it.value.first.start)
            if (it.equals(this.trackItemTreeMap.begin()))
                return null;
            else
                it = it.prev();
        if (time < it.value.first.end)
            return it.value.second;
        return null;
    }
    getTrackItemBetween(startTime, endTime) {
        const ret = [];
        let it = this.trackItemEndTimeTreeMap.upper_bound(startTime);
        while (!it.equals(this.trackItemEndTimeTreeMap.end())) {
            const cur = it.value;
            if (cur.second.time.start >= endTime)
                break;
            ret.push(cur.second);
            it = it.next();
        }
        return ret;
    }
};
__decorate([
    worker_postable__WEBPACK_IMPORTED_MODULE_2__["listenable"]
], TrackRenderer.prototype, "trackItems", void 0);
TrackRenderer = __decorate([
    Object(worker_postable__WEBPACK_IMPORTED_MODULE_2__["Posted"])('TrackImpl')
], TrackRenderer);



/***/ }),

/***/ "./app/internal/renderer/video-renderer/all.ts":
/*!*****************************************************!*\
  !*** ./app/internal/renderer/video-renderer/all.ts ***!
  \*****************************************************/
/*! exports provided: forceImport, TimelineManagerVideoRenderer, TimelineVideoRenderer, TrackVideoRenderer, TrackItemVideoRenderer, TrackItemTimeRenderer, VideoTrackItemVideoRenderer, VideoMediaTrackItemVideoRenderer, VideoResourceVideoRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forceImport", function() { return forceImport; });
/* harmony import */ var _timeline_timeline_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timeline/timeline-manager */ "./app/internal/renderer/video-renderer/timeline/timeline-manager.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TimelineManagerVideoRenderer", function() { return _timeline_timeline_manager__WEBPACK_IMPORTED_MODULE_0__["TimelineManagerVideoRenderer"]; });

/* harmony import */ var _timeline_timeline__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./timeline/timeline */ "./app/internal/renderer/video-renderer/timeline/timeline.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TimelineVideoRenderer", function() { return _timeline_timeline__WEBPACK_IMPORTED_MODULE_1__["TimelineVideoRenderer"]; });

/* harmony import */ var _timeline_track__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./timeline/track */ "./app/internal/renderer/video-renderer/timeline/track.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TrackVideoRenderer", function() { return _timeline_track__WEBPACK_IMPORTED_MODULE_2__["TrackVideoRenderer"]; });

/* harmony import */ var _timeline_track_item__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./timeline/track-item */ "./app/internal/renderer/video-renderer/timeline/track-item.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TrackItemVideoRenderer", function() { return _timeline_track_item__WEBPACK_IMPORTED_MODULE_3__["TrackItemVideoRenderer"]; });

/* harmony import */ var _timeline_track_item_time__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./timeline/track-item-time */ "./app/internal/renderer/video-renderer/timeline/track-item-time.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TrackItemTimeRenderer", function() { return _timeline_track_item_time__WEBPACK_IMPORTED_MODULE_4__["TrackItemTimeRenderer"]; });

/* harmony import */ var _timeline_track_item_video_track_item__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./timeline/track-item/video-track-item */ "./app/internal/renderer/video-renderer/timeline/track-item/video-track-item.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VideoTrackItemVideoRenderer", function() { return _timeline_track_item_video_track_item__WEBPACK_IMPORTED_MODULE_5__["VideoTrackItemVideoRenderer"]; });

/* harmony import */ var _timeline_track_item_video_media_track_item__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./timeline/track-item/video-media-track-item */ "./app/internal/renderer/video-renderer/timeline/track-item/video-media-track-item.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VideoMediaTrackItemVideoRenderer", function() { return _timeline_track_item_video_media_track_item__WEBPACK_IMPORTED_MODULE_6__["VideoMediaTrackItemVideoRenderer"]; });

/* harmony import */ var _resource_video_resource__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./resource/video-resource */ "./app/internal/renderer/video-renderer/resource/video-resource.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VideoResourceVideoRenderer", function() { return _resource_video_resource__WEBPACK_IMPORTED_MODULE_7__["VideoResourceVideoRenderer"]; });

/* harmony import */ var _rendering_all__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./rendering/all */ "./app/internal/renderer/video-renderer/rendering/all.ts");







// export * from './timeline/track-item/audio-track-item'
// export * from './resource/resource'

// export * from './resource/audio-resource'
// export * from './project/project'
// export * from './project/sequence/sequence'
// export * from './project/sequence/video-setting'
// export * from './project/sequence/audio-setting'
// export * from './project/sequence/frame-rate'

_rendering_all__WEBPACK_IMPORTED_MODULE_8__["forceImport"]();
function forceImport() { }


/***/ }),

/***/ "./app/internal/renderer/video-renderer/message.ts":
/*!*********************************************************!*\
  !*** ./app/internal/renderer/video-renderer/message.ts ***!
  \*********************************************************/
/*! exports provided: VideoRendererMessageEventType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoRendererMessageEventType", function() { return VideoRendererMessageEventType; });
var VideoRendererMessageEventType;
(function (VideoRendererMessageEventType) {
    VideoRendererMessageEventType[VideoRendererMessageEventType["PLAY_RENDER"] = 0] = "PLAY_RENDER";
    VideoRendererMessageEventType[VideoRendererMessageEventType["PAUSE_RENDER"] = 1] = "PAUSE_RENDER";
    VideoRendererMessageEventType[VideoRendererMessageEventType["RENDER"] = 2] = "RENDER";
})(VideoRendererMessageEventType || (VideoRendererMessageEventType = {}));


/***/ }),

/***/ "./app/internal/renderer/video-renderer/renderer.ts":
/*!**********************************************************!*\
  !*** ./app/internal/renderer/video-renderer/renderer.ts ***!
  \**********************************************************/
/*! exports provided: Renderer, renderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Renderer", function() { return Renderer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderer", function() { return renderer; });
/* harmony import */ var internal_renderer_base_all__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! internal/renderer/base/all */ "./app/internal/renderer/base/all.ts");
/* harmony import */ var internal_renderer_video_renderer_all__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! internal/renderer/video-renderer/all */ "./app/internal/renderer/video-renderer/all.ts");
/* harmony import */ var poster__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! poster */ "./app/poster/index.ts");
/* harmony import */ var worker_postable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! worker-postable */ "./node_modules/worker-postable/dist/index.js");
/* harmony import */ var internal_renderer_video_renderer_message__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! internal/renderer/video-renderer/message */ "./app/internal/renderer/video-renderer/message.ts");
/* harmony import */ var base_common_time__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! base/common/time */ "./app/base/common/time.ts");
/* harmony import */ var base_common_assert__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! base/common/assert */ "./app/base/common/assert.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};







Object(internal_renderer_base_all__WEBPACK_IMPORTED_MODULE_0__["forceImport"])();
Object(internal_renderer_video_renderer_all__WEBPACK_IMPORTED_MODULE_1__["forceImport"])();
function initializeDecoderModule() {
    // const basepath = electron.remote.app.getAppPath();
    // console.log(`[Internal] Initilaize Decoder module. basepath=${basepath}`);
    self.requestVideoRender = () => { };
    const module_initializer = __webpack_require__(/*! ../../../../decoder/build/Release/module.node */ "./decoder/build/Release/module.node");
    const module = module_initializer.initialize(console.log);
    console.log(module);
    return module;
}
class Renderer {
    constructor() {
        this.poster = new poster__WEBPACK_IMPORTED_MODULE_2__["Poster"](self);
        this.decoder = initializeDecoderModule();
        this.handlePostable = this.handlePostable.bind(this);
        this.initTimelineManager = this.initTimelineManager.bind(this);
        this.initNanovg = this.initNanovg.bind(this);
        this.initConverter();
        self.onmessage = this.messageHandler.bind(this);
    }
    messageHandler(e) {
        const msg = e.data;
        switch (msg.type) {
            case 'POST':
                Object(worker_postable__WEBPACK_IMPORTED_MODULE_3__["postableMessageHandler"])(msg.data);
                break;
            case 'INIT':
                this.initTimelineManager(msg.data.timelineManager);
                this.initNanovg(msg.data.canvas);
                break;
            case internal_renderer_video_renderer_message__WEBPACK_IMPORTED_MODULE_4__["VideoRendererMessageEventType"].PLAY_RENDER:
                this.onPlayRender(msg);
                break;
            case internal_renderer_video_renderer_message__WEBPACK_IMPORTED_MODULE_4__["VideoRendererMessageEventType"].PAUSE_RENDER:
                this.onPauseRender(msg);
                break;
            case internal_renderer_video_renderer_message__WEBPACK_IMPORTED_MODULE_4__["VideoRendererMessageEventType"].RENDER:
                this.onRender(msg);
                break;
        }
    }
    handlePostable(req) {
        Object(worker_postable__WEBPACK_IMPORTED_MODULE_3__["postableMessageHandler"])(req.data);
    }
    onPlayRender(e) {
        const timeline = this.timelineManager_.getTimeline(e.timelineID);
        this.startTimelineRenderCallback(timeline, e.currentTime, e.systemTime);
    }
    onPauseRender(e) {
        this.stopTimelineRender(() => {
            this.onRender(e);
        });
    }
    onRender(e) {
        const timeline = this.timelineManager_.getTimeline(e.timelineID);
        Object(base_common_assert__WEBPACK_IMPORTED_MODULE_6__["assert"])(timeline, 'Timeline ' + e.timelineID + ' not found!');
        this.seekTimeline(timeline, e.currentTime);
    }
    startTimelineRenderCallback(timeline, time, startSystemTime) {
        console.log('video render start = ', time);
        this.stopTimelineRender(() => {
            const disposer = {
                dispose: function () {
                    this.disposed = true;
                    if (this.callback)
                        this.callback();
                    return null;
                },
                fireDispose: function () {
                    if (typeof this.onDispose == 'function')
                        this.onDispose();
                },
                disposed: false,
                onDispose: null
            };
            this.renderCallbackDisposer_ = disposer;
            requestAnimationFrame(this.renderTimelineCallback.bind(this, timeline, time, startSystemTime, disposer));
        });
    }
    seekTimeline(timeline, time) {
        return __awaiter(this, void 0, void 0, function* () {
            this.stopTimelineRender(() => __awaiter(this, void 0, void 0, function* () {
                const disposer = {
                    dispose: function () {
                        if (this.disposed)
                            return null;
                        this.disposed = true;
                        if (this.callback)
                            this.callback();
                        return null;
                    },
                    fireDispose: function () {
                        if (typeof this.onDispose == 'function')
                            this.onDispose();
                    },
                    disposed: false,
                    onDispose: null
                };
                this.renderCallbackDisposer_ = disposer;
                yield this.renderTimeline(timeline, time);
                disposer.dispose();
                disposer.fireDispose();
            }));
        });
    }
    stopTimelineRender(onStopCallback) {
        if (!this.renderCallbackDisposer_ || this.renderCallbackDisposer_.disposed) {
            onStopCallback();
            return;
        }
        this.renderCallbackDisposer_.onDispose = onStopCallback;
        this.renderCallbackDisposer_ = this.renderCallbackDisposer_.dispose();
    }
    renderTimelineCallback(timeline, startTime, startSystemTime, disposer) {
        return __awaiter(this, void 0, void 0, function* () {
            if (disposer.disposed) {
                disposer.fireDispose();
                return;
            }
            const elapsedSystemTime = Object(base_common_time__WEBPACK_IMPORTED_MODULE_5__["getCurrentSystemTime"])() - startSystemTime;
            const elapsedTime = timeline.sequence.videoSetting.frameRate.systemTimeToTime(elapsedSystemTime);
            const currentTime = startTime + elapsedTime;
            yield this.renderTimeline(timeline, currentTime);
            if (disposer.disposed) {
                disposer.fireDispose();
                return;
            }
            requestAnimationFrame(this.renderTimelineCallback.bind(this, timeline, startTime, startSystemTime, disposer));
        });
    }
    renderTimeline(timeline, time) {
        return __awaiter(this, void 0, void 0, function* () {
            timeline.decode(time);
            yield timeline.render(time, this.vg);
        });
    }
    initTimelineManager(timelineManagerPostableID) {
        console.log('[Renderer] initTimeline', timelineManagerPostableID);
        this.timelineManager_ = worker_postable__WEBPACK_IMPORTED_MODULE_3__["ObjectStore"].get(timelineManagerPostableID);
    }
    initNanovg(canvas) {
        console.log(canvas);
        const nanovg = __webpack_require__(/*! ../../../../nanovg-webgl/build/Release/nanovg_node_webgl.node */ "./nanovg-webgl/build/Release/nanovg_node_webgl.node");
        let gl = canvas.getContext('webgl2', {
            alpha: true,
            premultipliedAlpha: false,
            stencil: true
        });
        self.gl = gl;
        this.vg = nanovg.initNanoVG(gl);
    }
    initConverter() {
        const converter = __webpack_require__(/*! ../../../../renderer/build/Release/olive_renderer_module.node */ "./renderer/build/Release/olive_renderer_module.node");
        this.converter = converter;
    }
}
const renderer = new Renderer();



/***/ }),

/***/ "./app/internal/renderer/video-renderer/rendering/all.ts":
/*!***************************************************************!*\
  !*** ./app/internal/renderer/video-renderer/rendering/all.ts ***!
  \***************************************************************/
/*! exports provided: forceImport, DrawingVideoRenderer, VideoDrawingVideoRenderer, RectangleDrawingVideoRenderer, VideoMediaDrawingVideoRenderer, TransformEffectVideoRenderer, RectangleEffectVideoRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forceImport", function() { return forceImport; });
/* harmony import */ var _drawing_drawing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./drawing/drawing */ "./app/internal/renderer/video-renderer/rendering/drawing/drawing.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DrawingVideoRenderer", function() { return _drawing_drawing__WEBPACK_IMPORTED_MODULE_0__["DrawingVideoRenderer"]; });

/* harmony import */ var _drawing_video_drawing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./drawing/video-drawing */ "./app/internal/renderer/video-renderer/rendering/drawing/video-drawing.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VideoDrawingVideoRenderer", function() { return _drawing_video_drawing__WEBPACK_IMPORTED_MODULE_1__["VideoDrawingVideoRenderer"]; });

/* harmony import */ var _drawing_rectangle_drawing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./drawing/rectangle-drawing */ "./app/internal/renderer/video-renderer/rendering/drawing/rectangle-drawing.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RectangleDrawingVideoRenderer", function() { return _drawing_rectangle_drawing__WEBPACK_IMPORTED_MODULE_2__["RectangleDrawingVideoRenderer"]; });

/* harmony import */ var _drawing_video_media_drawing__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./drawing/video-media-drawing */ "./app/internal/renderer/video-renderer/rendering/drawing/video-media-drawing.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VideoMediaDrawingVideoRenderer", function() { return _drawing_video_media_drawing__WEBPACK_IMPORTED_MODULE_3__["VideoMediaDrawingVideoRenderer"]; });

/* harmony import */ var _effect_video_effect_transform_effect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./effect/video-effect/transform-effect */ "./app/internal/renderer/video-renderer/rendering/effect/video-effect/transform-effect.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TransformEffectVideoRenderer", function() { return _effect_video_effect_transform_effect__WEBPACK_IMPORTED_MODULE_4__["TransformEffectVideoRenderer"]; });

/* harmony import */ var _effect_video_effect_rectangle_effect__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./effect/video-effect/rectangle-effect */ "./app/internal/renderer/video-renderer/rendering/effect/video-effect/rectangle-effect.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RectangleEffectVideoRenderer", function() { return _effect_video_effect_rectangle_effect__WEBPACK_IMPORTED_MODULE_5__["RectangleEffectVideoRenderer"]; });





// export * from './effect/effect'
// export * from './effect/video-effect/video-effect'


// export * from './property/property'
// export * from 'internal/renderer/rendering/property/scalar-property'
// export * from './property/vector2-property'
// export * from './property/vector4-property'
// export * from './property/polypath-property'
// export * from './property/keyframe'
function forceImport() { }


/***/ }),

/***/ "./app/internal/renderer/video-renderer/rendering/drawing/drawing.ts":
/*!***************************************************************************!*\
  !*** ./app/internal/renderer/video-renderer/rendering/drawing/drawing.ts ***!
  \***************************************************************************/
/*! exports provided: DrawingVideoRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrawingVideoRenderer", function() { return DrawingVideoRenderer; });
/* harmony import */ var internal_renderer_base_rendering_drawing_drawing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! internal/renderer/base/rendering/drawing/drawing */ "./app/internal/renderer/base/rendering/drawing/drawing.ts");

class DrawingVideoRenderer extends internal_renderer_base_rendering_drawing_drawing__WEBPACK_IMPORTED_MODULE_0__["DrawingRenderer"] {
}


/***/ }),

/***/ "./app/internal/renderer/video-renderer/rendering/drawing/rectangle-drawing.ts":
/*!*************************************************************************************!*\
  !*** ./app/internal/renderer/video-renderer/rendering/drawing/rectangle-drawing.ts ***!
  \*************************************************************************************/
/*! exports provided: RectangleDrawingVideoRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RectangleDrawingVideoRenderer", function() { return RectangleDrawingVideoRenderer; });
/* harmony import */ var worker_postable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! worker-postable */ "./node_modules/worker-postable/dist/index.js");
/* harmony import */ var internal_renderer_base_rendering_drawing_rectangle_drawing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! internal/renderer/base/rendering/drawing/rectangle-drawing */ "./app/internal/renderer/base/rendering/drawing/rectangle-drawing.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


let RectangleDrawingVideoRenderer = class RectangleDrawingVideoRenderer extends internal_renderer_base_rendering_drawing_rectangle_drawing__WEBPACK_IMPORTED_MODULE_1__["RectangleDrawingRenderer"] {
    draw(context) {
        const vg = context.nvg;
        const timeOffset = context.timeOffset;
        const transformEffect = this.transformEffect;
        const rectangleEffect = this.rectangleEffect;
        const position = transformEffect.position.getInterpolatedPropertyValue(timeOffset);
        const scale = transformEffect.scale.getInterpolatedPropertyValue(timeOffset);
        const size = rectangleEffect.size.getInterpolatedPropertyValue(timeOffset);
        const top = size.x;
        const right = size.y;
        const bottom = size.z;
        const left = size.w;
        vg.save();
        vg.translate(position.x, position.y);
        vg.scale(scale.x, scale.y);
        vg.beginPath();
        vg.moveTo(left, top);
        vg.lineTo(right, top);
        vg.lineTo(right, bottom);
        vg.lineTo(left, bottom);
        vg.closePath();
        vg.fillColor(199, 125, 125, 255);
        vg.fill();
        vg.strokeColor(35, 129, 19, 255);
        vg.stroke();
        vg.restore();
    }
    afterDraw(nvg) { }
};
RectangleDrawingVideoRenderer = __decorate([
    Object(worker_postable__WEBPACK_IMPORTED_MODULE_0__["Posted"])('RectangleDrawing')
], RectangleDrawingVideoRenderer);



/***/ }),

/***/ "./app/internal/renderer/video-renderer/rendering/drawing/video-drawing.ts":
/*!*********************************************************************************!*\
  !*** ./app/internal/renderer/video-renderer/rendering/drawing/video-drawing.ts ***!
  \*********************************************************************************/
/*! exports provided: VideoDrawingVideoRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoDrawingVideoRenderer", function() { return VideoDrawingVideoRenderer; });
/* harmony import */ var internal_renderer_video_renderer_rendering_drawing_drawing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! internal/renderer/video-renderer/rendering/drawing/drawing */ "./app/internal/renderer/video-renderer/rendering/drawing/drawing.ts");

class VideoDrawingVideoRenderer extends internal_renderer_video_renderer_rendering_drawing_drawing__WEBPACK_IMPORTED_MODULE_0__["DrawingVideoRenderer"] {
}


/***/ }),

/***/ "./app/internal/renderer/video-renderer/rendering/drawing/video-media-drawing.ts":
/*!***************************************************************************************!*\
  !*** ./app/internal/renderer/video-renderer/rendering/drawing/video-media-drawing.ts ***!
  \***************************************************************************************/
/*! exports provided: VideoMediaDrawingVideoRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoMediaDrawingVideoRenderer", function() { return VideoMediaDrawingVideoRenderer; });
/* harmony import */ var worker_postable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! worker-postable */ "./node_modules/worker-postable/dist/index.js");
/* harmony import */ var internal_renderer_base_rendering_drawing_video_media_drawing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! internal/renderer/base/rendering/drawing/video-media-drawing */ "./app/internal/renderer/base/rendering/drawing/video-media-drawing.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


let VideoMediaDrawingVideoRenderer = class VideoMediaDrawingVideoRenderer extends internal_renderer_base_rendering_drawing_video_media_drawing__WEBPACK_IMPORTED_MODULE_1__["VideoMediaDrawingRenderer"] {
    draw(context) {
        const vg = context.nvg;
        const timeOffset = context.timeOffset;
        const transformEffect = this.transformEffect;
        const position = transformEffect.position.getInterpolatedPropertyValue(timeOffset);
        const scale = transformEffect.scale.getInterpolatedPropertyValue(timeOffset);
        const videoFrame = context.videoFrame;
        this.image = vg.createImageRGBA(videoFrame.width, videoFrame.height, 0, videoFrame.ptr);
        this.paint = vg.imagePattern(0, 0, videoFrame.width, videoFrame.height, 0, this.image, 1);
        const w = this.resource.width;
        const h = this.resource.height;
        vg.save();
        vg.translate(position.x, position.y);
        vg.scale(scale.x, scale.y);
        vg.beginPath();
        vg.moveTo(0, 0);
        vg.lineTo(w, 0);
        vg.lineTo(w, h);
        vg.lineTo(0, h);
        vg.closePath();
        vg.fillPaint(this.paint);
        vg.fill();
        vg.restore();
    }
    afterDraw(vg) {
        vg.freePaint(this.paint);
        vg.deleteImage(this.image);
    }
};
VideoMediaDrawingVideoRenderer = __decorate([
    Object(worker_postable__WEBPACK_IMPORTED_MODULE_0__["Posted"])('VideoMediaDrawing')
], VideoMediaDrawingVideoRenderer);



/***/ }),

/***/ "./app/internal/renderer/video-renderer/rendering/effect/video-effect/rectangle-effect.ts":
/*!************************************************************************************************!*\
  !*** ./app/internal/renderer/video-renderer/rendering/effect/video-effect/rectangle-effect.ts ***!
  \************************************************************************************************/
/*! exports provided: RectangleEffectVideoRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RectangleEffectVideoRenderer", function() { return RectangleEffectVideoRenderer; });
/* harmony import */ var worker_postable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! worker-postable */ "./node_modules/worker-postable/dist/index.js");
/* harmony import */ var internal_renderer_base_rendering_effect_video_effect_rectangle_effect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! internal/renderer/base/rendering/effect/video-effect/rectangle-effect */ "./app/internal/renderer/base/rendering/effect/video-effect/rectangle-effect.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


let RectangleEffectVideoRenderer = class RectangleEffectVideoRenderer extends internal_renderer_base_rendering_effect_video_effect_rectangle_effect__WEBPACK_IMPORTED_MODULE_1__["RectangleEffectRenderer"] {
};
RectangleEffectVideoRenderer = __decorate([
    Object(worker_postable__WEBPACK_IMPORTED_MODULE_0__["Posted"])('RectangleEffect')
], RectangleEffectVideoRenderer);



/***/ }),

/***/ "./app/internal/renderer/video-renderer/rendering/effect/video-effect/transform-effect.ts":
/*!************************************************************************************************!*\
  !*** ./app/internal/renderer/video-renderer/rendering/effect/video-effect/transform-effect.ts ***!
  \************************************************************************************************/
/*! exports provided: TransformEffectVideoRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransformEffectVideoRenderer", function() { return TransformEffectVideoRenderer; });
/* harmony import */ var worker_postable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! worker-postable */ "./node_modules/worker-postable/dist/index.js");
/* harmony import */ var internal_renderer_base_rendering_effect_video_effect_transform_effect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! internal/renderer/base/rendering/effect/video-effect/transform-effect */ "./app/internal/renderer/base/rendering/effect/video-effect/transform-effect.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


let TransformEffectVideoRenderer = class TransformEffectVideoRenderer extends internal_renderer_base_rendering_effect_video_effect_transform_effect__WEBPACK_IMPORTED_MODULE_1__["TransformEffectRenderer"] {
};
TransformEffectVideoRenderer = __decorate([
    Object(worker_postable__WEBPACK_IMPORTED_MODULE_0__["Posted"])('TransformEffect')
], TransformEffectVideoRenderer);



/***/ }),

/***/ "./app/internal/renderer/video-renderer/resource/video-resource.ts":
/*!*************************************************************************!*\
  !*** ./app/internal/renderer/video-renderer/resource/video-resource.ts ***!
  \*************************************************************************/
/*! exports provided: VideoResourceVideoRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoResourceVideoRenderer", function() { return VideoResourceVideoRenderer; });
/* harmony import */ var worker_postable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! worker-postable */ "./node_modules/worker-postable/dist/index.js");
/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../renderer */ "./app/internal/renderer/video-renderer/renderer.ts");
/* harmony import */ var internal_renderer_base_all__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! internal/renderer/base/all */ "./app/internal/renderer/base/all.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



let VideoResourceVideoRenderer = class VideoResourceVideoRenderer extends internal_renderer_base_all__WEBPACK_IMPORTED_MODULE_2__["VideoResourceRenderer"] {
    onPostableInstanceCreated() {
        this.native_id = _renderer__WEBPACK_IMPORTED_MODULE_1__["renderer"].decoder.AddResource(this.path).id;
        console.log('video resource created', this.native_id);
    }
};
VideoResourceVideoRenderer = __decorate([
    Object(worker_postable__WEBPACK_IMPORTED_MODULE_0__["Posted"])('VideoResource')
], VideoResourceVideoRenderer);



/***/ }),

/***/ "./app/internal/renderer/video-renderer/timeline/timeline-manager.ts":
/*!***************************************************************************!*\
  !*** ./app/internal/renderer/video-renderer/timeline/timeline-manager.ts ***!
  \***************************************************************************/
/*! exports provided: TimelineManagerVideoRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimelineManagerVideoRenderer", function() { return TimelineManagerVideoRenderer; });
/* harmony import */ var worker_postable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! worker-postable */ "./node_modules/worker-postable/dist/index.js");
/* harmony import */ var internal_renderer_base_all__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! internal/renderer/base/all */ "./app/internal/renderer/base/all.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


let TimelineManagerVideoRenderer = class TimelineManagerVideoRenderer extends internal_renderer_base_all__WEBPACK_IMPORTED_MODULE_1__["TimelineManagerRenderer"] {
};
TimelineManagerVideoRenderer = __decorate([
    Object(worker_postable__WEBPACK_IMPORTED_MODULE_0__["Posted"])('TimelineManagerImpl')
], TimelineManagerVideoRenderer);



/***/ }),

/***/ "./app/internal/renderer/video-renderer/timeline/timeline.ts":
/*!*******************************************************************!*\
  !*** ./app/internal/renderer/video-renderer/timeline/timeline.ts ***!
  \*******************************************************************/
/*! exports provided: TimelineVideoRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimelineVideoRenderer", function() { return TimelineVideoRenderer; });
/* harmony import */ var worker_postable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! worker-postable */ "./node_modules/worker-postable/dist/index.js");
/* harmony import */ var internal_renderer_base_all__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! internal/renderer/base/all */ "./app/internal/renderer/base/all.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


let TimelineVideoRenderer = class TimelineVideoRenderer extends internal_renderer_base_all__WEBPACK_IMPORTED_MODULE_1__["TimelineRenderer"] {
    constructor() {
        super(...arguments);
        this.paused = true;
    }
    onPostableInstanceCreated() {
    }
    playingCallback_() {
        const now = Date.now();
        const dt = now - this.lastPlayingCallbackTime_;
        this.lastPlayingCallbackTime_ = now;
        this.currentTimePlaying += dt / 30;
    }
    render(time, nvg) {
        return __awaiter(this, void 0, void 0, function* () {
            nvg.beginFrame(1080, 720, 1);
            for (let i = 0; i < this.tracks.length; i++) {
                let track = this.tracks[i];
                yield track.draw(nvg, time);
            }
            nvg.endFrame();
            for (let i = 0; i < this.tracks.length; i++) {
                let track = this.tracks[i];
                yield track.afterDraw(nvg, time);
            }
        });
    }
    decode(time) {
        this.tracks.forEach(track => {
            track.decode(time);
        });
    }
};
TimelineVideoRenderer = __decorate([
    Object(worker_postable__WEBPACK_IMPORTED_MODULE_0__["Posted"])('TimelineImpl')
], TimelineVideoRenderer);



/***/ }),

/***/ "./app/internal/renderer/video-renderer/timeline/track-item-time.ts":
/*!**************************************************************************!*\
  !*** ./app/internal/renderer/video-renderer/timeline/track-item-time.ts ***!
  \**************************************************************************/
/*! exports provided: TrackItemTimeRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TrackItemTimeRenderer", function() { return TrackItemTimeRenderer; });
/* harmony import */ var worker_postable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! worker-postable */ "./node_modules/worker-postable/dist/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let TrackItemTimeRenderer = class TrackItemTimeRenderer {
    // constructor(start: number, end: number, base: number) {
    //   this.start = start;
    //   this.end = end;
    //   this.base = base;
    // }
    equals(rhs) {
        return this.start == rhs.start && this.end == rhs.end;
    }
    hashCode() {
        return 0;
    }
    less(rhs) {
        if (this.start == rhs.start)
            return this.end < rhs.end;
        return this.start < rhs.start;
    }
};
TrackItemTimeRenderer = __decorate([
    Object(worker_postable__WEBPACK_IMPORTED_MODULE_0__["Posted"])('TrackItemTime')
], TrackItemTimeRenderer);



/***/ }),

/***/ "./app/internal/renderer/video-renderer/timeline/track-item.ts":
/*!*********************************************************************!*\
  !*** ./app/internal/renderer/video-renderer/timeline/track-item.ts ***!
  \*********************************************************************/
/*! exports provided: TrackItemVideoRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TrackItemVideoRenderer", function() { return TrackItemVideoRenderer; });
/* harmony import */ var worker_postable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! worker-postable */ "./node_modules/worker-postable/dist/index.js");
/* harmony import */ var internal_renderer_base_all__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! internal/renderer/base/all */ "./app/internal/renderer/base/all.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


let TrackItemVideoRenderer = class TrackItemVideoRenderer extends internal_renderer_base_all__WEBPACK_IMPORTED_MODULE_1__["TrackItemRenderer"] {
};
TrackItemVideoRenderer = __decorate([
    Object(worker_postable__WEBPACK_IMPORTED_MODULE_0__["Posted"])('TrackItemImpl')
], TrackItemVideoRenderer);



/***/ }),

/***/ "./app/internal/renderer/video-renderer/timeline/track-item/video-media-track-item.ts":
/*!********************************************************************************************!*\
  !*** ./app/internal/renderer/video-renderer/timeline/track-item/video-media-track-item.ts ***!
  \********************************************************************************************/
/*! exports provided: VideoMediaTrackItemVideoRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoMediaTrackItemVideoRenderer", function() { return VideoMediaTrackItemVideoRenderer; });
/* harmony import */ var worker_postable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! worker-postable */ "./node_modules/worker-postable/dist/index.js");
/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../renderer */ "./app/internal/renderer/video-renderer/renderer.ts");
/* harmony import */ var internal_renderer_video_renderer_timeline_track_item_video_track_item__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! internal/renderer/video-renderer/timeline/track-item/video-track-item */ "./app/internal/renderer/video-renderer/timeline/track-item/video-track-item.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



let VideoMediaTrackItemVideoRenderer = class VideoMediaTrackItemVideoRenderer extends internal_renderer_video_renderer_timeline_track_item_video_track_item__WEBPACK_IMPORTED_MODULE_2__["VideoTrackItemVideoRenderer"] {
    constructor() {
        super(...arguments);
        this.acquiredDecoderID = -1;
    }
    draw(nvg, timecode) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield this.decodePromise;
            let videoFrameData = _renderer__WEBPACK_IMPORTED_MODULE_1__["renderer"].converter.AsVideoFrameData(data.data);
            let context = {
                nvg: nvg,
                timeOffset: timecode,
                screenWidth: 300,
                screenHeight: 150,
                videoFrame: videoFrameData
            };
            this.drawing.draw(context);
            _renderer__WEBPACK_IMPORTED_MODULE_1__["renderer"].decoder.FreeFrame(data.native);
            return null;
        });
    }
    afterDraw(nvg) {
        this.drawing.afterDraw(nvg);
    }
    decode(timecode) {
        const decoder = _renderer__WEBPACK_IMPORTED_MODULE_1__["renderer"].decoder;
        if (this.acquiredDecoderID == -1)
            this.acquiredDecoderID = decoder.Acquire(this.resource.id, timecode);
        this.decodePromise = decoder.Decode(this.resource.id, timecode, this.acquiredDecoderID);
    }
};
VideoMediaTrackItemVideoRenderer = __decorate([
    Object(worker_postable__WEBPACK_IMPORTED_MODULE_0__["Posted"])('VideoMediaTrackItemImpl')
], VideoMediaTrackItemVideoRenderer);



/***/ }),

/***/ "./app/internal/renderer/video-renderer/timeline/track-item/video-track-item.ts":
/*!**************************************************************************************!*\
  !*** ./app/internal/renderer/video-renderer/timeline/track-item/video-track-item.ts ***!
  \**************************************************************************************/
/*! exports provided: VideoTrackItemVideoRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoTrackItemVideoRenderer", function() { return VideoTrackItemVideoRenderer; });
/* harmony import */ var worker_postable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! worker-postable */ "./node_modules/worker-postable/dist/index.js");
/* harmony import */ var internal_renderer_video_renderer_timeline_track_item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! internal/renderer/video-renderer/timeline/track-item */ "./app/internal/renderer/video-renderer/timeline/track-item.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


let VideoTrackItemVideoRenderer = class VideoTrackItemVideoRenderer extends internal_renderer_video_renderer_timeline_track_item__WEBPACK_IMPORTED_MODULE_1__["TrackItemVideoRenderer"] {
    decode(timecode) { }
};
VideoTrackItemVideoRenderer = __decorate([
    Object(worker_postable__WEBPACK_IMPORTED_MODULE_0__["Posted"])('VideoTrackItemImpl')
], VideoTrackItemVideoRenderer);



/***/ }),

/***/ "./app/internal/renderer/video-renderer/timeline/track.ts":
/*!****************************************************************!*\
  !*** ./app/internal/renderer/video-renderer/timeline/track.ts ***!
  \****************************************************************/
/*! exports provided: TrackVideoRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TrackVideoRenderer", function() { return TrackVideoRenderer; });
/* harmony import */ var worker_postable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! worker-postable */ "./node_modules/worker-postable/dist/index.js");
/* harmony import */ var internal_timeline_track_item_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! internal/timeline/track-item-type */ "./app/internal/timeline/track-item-type.ts");
/* harmony import */ var internal_renderer_base_all__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! internal/renderer/base/all */ "./app/internal/renderer/base/all.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



let __next_track_id = 0;
let TrackVideoRenderer = class TrackVideoRenderer extends internal_renderer_base_all__WEBPACK_IMPORTED_MODULE_2__["TrackRenderer"] {
    draw(nvg, timecode) {
        return __awaiter(this, void 0, void 0, function* () {
            let trackItem = this.getTrackItemAt(timecode);
            if (trackItem == null)
                return;
            if (trackItem.type == internal_timeline_track_item_type__WEBPACK_IMPORTED_MODULE_1__["TrackItemType"].VIDEO_MEDIA)
                yield trackItem.draw(nvg, timecode - trackItem.time.start + trackItem.time.base);
        });
    }
    afterDraw(nvg, timecode) {
        return __awaiter(this, void 0, void 0, function* () {
            let trackItem = this.getTrackItemAt(timecode);
            if (trackItem == null)
                return;
            if (trackItem.type == internal_timeline_track_item_type__WEBPACK_IMPORTED_MODULE_1__["TrackItemType"].VIDEO_MEDIA)
                yield trackItem.afterDraw(nvg, timecode - trackItem.time.start + trackItem.time.base);
        });
    }
    decode(timecode) {
        let trackItem = this.getTrackItemAt(timecode);
        if (trackItem == null)
            return;
        if (trackItem.type == internal_timeline_track_item_type__WEBPACK_IMPORTED_MODULE_1__["TrackItemType"].VIDEO_MEDIA) {
            let videoTrackItem = trackItem;
            videoTrackItem.decode(timecode - videoTrackItem.time.start + videoTrackItem.time.base);
        }
    }
};
TrackVideoRenderer = __decorate([
    Object(worker_postable__WEBPACK_IMPORTED_MODULE_0__["Posted"])('TrackImpl')
], TrackVideoRenderer);



/***/ }),

/***/ "./app/internal/timeline/track-item-type.ts":
/*!**************************************************!*\
  !*** ./app/internal/timeline/track-item-type.ts ***!
  \**************************************************/
/*! exports provided: TrackItemType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TrackItemType", function() { return TrackItemType; });
var TrackItemType;
(function (TrackItemType) {
    TrackItemType[TrackItemType["VIDEO_FIGURE"] = 0] = "VIDEO_FIGURE";
    TrackItemType[TrackItemType["VIDEO_MEDIA"] = 1] = "VIDEO_MEDIA";
    TrackItemType[TrackItemType["AUDIO"] = 2] = "AUDIO";
})(TrackItemType || (TrackItemType = {}));


/***/ }),

/***/ "./app/oliveutil/vector2.ts":
/*!**********************************!*\
  !*** ./app/oliveutil/vector2.ts ***!
  \**********************************/
/*! exports provided: Vector2, Vector2Renderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vector2", function() { return Vector2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vector2Renderer", function() { return Vector2Renderer; });
/* harmony import */ var worker_postable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! worker-postable */ "./node_modules/worker-postable/dist/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let Vector2 = class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    clone(obj) {
        obj.x = this.x;
        obj.y = this.y;
        return obj;
    }
};
__decorate([
    worker_postable__WEBPACK_IMPORTED_MODULE_0__["postable"]
], Vector2.prototype, "x", void 0);
__decorate([
    worker_postable__WEBPACK_IMPORTED_MODULE_0__["postable"]
], Vector2.prototype, "y", void 0);
Vector2 = __decorate([
    worker_postable__WEBPACK_IMPORTED_MODULE_0__["Postable"]
], Vector2);

let Vector2Renderer = class Vector2Renderer {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
};
Vector2Renderer = __decorate([
    Object(worker_postable__WEBPACK_IMPORTED_MODULE_0__["Posted"])('Vector2')
], Vector2Renderer);



/***/ }),

/***/ "./app/oliveutil/vector4.ts":
/*!**********************************!*\
  !*** ./app/oliveutil/vector4.ts ***!
  \**********************************/
/*! exports provided: Vector4, Vector4Renderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vector4", function() { return Vector4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vector4Renderer", function() { return Vector4Renderer; });
/* harmony import */ var worker_postable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! worker-postable */ "./node_modules/worker-postable/dist/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let Vector4 = class Vector4 {
    constructor(x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    clone(obj) {
        obj.x = this.x;
        obj.y = this.y;
        obj.z = this.z;
        obj.w = this.w;
        return obj;
    }
};
__decorate([
    worker_postable__WEBPACK_IMPORTED_MODULE_0__["postable"]
], Vector4.prototype, "x", void 0);
__decorate([
    worker_postable__WEBPACK_IMPORTED_MODULE_0__["postable"]
], Vector4.prototype, "y", void 0);
__decorate([
    worker_postable__WEBPACK_IMPORTED_MODULE_0__["postable"]
], Vector4.prototype, "z", void 0);
__decorate([
    worker_postable__WEBPACK_IMPORTED_MODULE_0__["postable"]
], Vector4.prototype, "w", void 0);
Vector4 = __decorate([
    worker_postable__WEBPACK_IMPORTED_MODULE_0__["Postable"]
], Vector4);

let Vector4Renderer = class Vector4Renderer {
    constructor(x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
};
Vector4Renderer = __decorate([
    Object(worker_postable__WEBPACK_IMPORTED_MODULE_0__["Posted"])('Vector4')
], Vector4Renderer);



/***/ }),

/***/ "./app/poster/index.ts":
/*!*****************************!*\
  !*** ./app/poster/index.ts ***!
  \*****************************/
/*! exports provided: ReceivedRequest, PosterResponse, Poster */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _poster__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./poster */ "./app/poster/poster.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ReceivedRequest", function() { return _poster__WEBPACK_IMPORTED_MODULE_0__["ReceivedRequest"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PosterResponse", function() { return _poster__WEBPACK_IMPORTED_MODULE_0__["PosterResponse"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Poster", function() { return _poster__WEBPACK_IMPORTED_MODULE_0__["Poster"]; });




/***/ }),

/***/ "./app/poster/poster.ts":
/*!******************************!*\
  !*** ./app/poster/poster.ts ***!
  \******************************/
/*! exports provided: ReceivedRequest, PosterResponse, Poster */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReceivedRequest", function() { return ReceivedRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PosterResponse", function() { return PosterResponse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Poster", function() { return Poster; });
class ReceivedRequest {
    constructor(source, requestID, data, responded = false) {
        this.source = source;
        this.requestID = requestID;
        this.data = data;
        this.responded = responded;
    }
    respond(data) {
        if (this.responded) {
            console.error('[Poster] Already sent response', this);
            return;
        }
        this.responded = true;
        this.source.postMessage({
            type: 'response',
            reqID: this.requestID,
            data: data
        }, undefined);
    }
}
class SentRequest {
    constructor(resolve, reject) {
        this.resolve = resolve;
        this.reject = reject;
    }
}
class PosterResponse {
    constructor(requestID, data) {
        this.requestID = requestID;
        this.data = data;
    }
}
class Poster {
    constructor(self) {
        this.__next_request_id = 0;
        this.requestHandlers = new Map();
        this.pendingSentRequests = new Map();
        this.self = self;
        this.self.onmessage = ((e) => {
            const data = e.data;
            let responded = false;
            switch (data.type) {
                case 'send':
                    responded = true;
                case 'request':
                    let req = new ReceivedRequest(e.source || this.self, data.reqID, data.data, responded);
                    this.handleRequest(data.event, req);
                    break;
                case 'response':
                    let res = new PosterResponse(data.reqID, data.data);
                    this.handleResponse(res);
                    break;
            }
        });
    }
    /*
      emit(event: string, data: any) {
        this.self.postMessage({
          event: event,
          data: data
        });
      }
    
      postMessage(event: string, data: any) {
        this.emit(event, data);
      }
    
      transferMessage(event: string, transferrable: any) {
        this.self.postMessage({
          event: event,
          data: transferrable
        }, [transferrable]);
      }
    
      on(event: string, handler: Handler) {
        if (!this.handlers.has(event))
          this.handlers.set(event, new Set());
        this.handlers.get(event).add(handler);
      }
    
      off(event: string, handler: Handler) {
        this.handlers.get(event).delete(handler);
      }
    */
    handleRequest(event, req) {
        const handlers = this.requestHandlers.get(event);
        if (!handlers)
            return;
        handlers.forEach(handler => handler(req));
    }
    handleResponse(res) {
        let sentReq = this.pendingSentRequests.get(res.requestID);
        sentReq.resolve(res.data);
    }
    addRequestListener(event, handler) {
        if (!this.requestHandlers.has(event))
            this.requestHandlers.set(event, new Set());
        this.requestHandlers.get(event).add(handler);
    }
    request(event, data, transferrable = undefined) {
        let reqID = this.getNextRequestID();
        let promise = new Promise((resolve, reject) => {
            this.self.postMessage({
                type: 'request',
                event: event,
                reqID: reqID,
                data: data
            }, transferrable);
            this.pendingSentRequests.set(reqID, new SentRequest(resolve, reject));
        });
        return promise;
    }
    send(event, data, transferrable = undefined) {
        this.self.postMessage({
            type: 'send',
            event: event,
            data: data
        }, transferrable);
    }
    get() {
        return this.self;
    }
    getNextRequestID() {
        return this.__next_request_id++;
    }
}


/***/ }),

/***/ "./decoder/build/Release/module.node":
/*!*******************************************!*\
  !*** ./decoder/build/Release/module.node ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {try {global.process.dlopen(module, "D:\\source\\olive\\decoder\\build\\Release\\module.node"); } catch(e) {throw new Error('Cannot open ' + "D:\\source\\olive\\decoder\\build\\Release\\module.node" + ': ' + e);}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./nanovg-webgl/build/Release/nanovg_node_webgl.node":
/*!***********************************************************!*\
  !*** ./nanovg-webgl/build/Release/nanovg_node_webgl.node ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {try {global.process.dlopen(module, "D:\\source\\olive\\nanovg-webgl\\build\\Release\\nanovg_node_webgl.node"); } catch(e) {throw new Error('Cannot open ' + "D:\\source\\olive\\nanovg-webgl\\build\\Release\\nanovg_node_webgl.node" + ': ' + e);}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/mobx/lib/mobx.module.js":
/*!**********************************************!*\
  !*** ./node_modules/mobx/lib/mobx.module.js ***!
  \**********************************************/
/*! exports provided: Reaction, untracked, IDerivationState, createAtom, spy, comparer, isObservableObject, isBoxedObservable, isObservableArray, ObservableMap, isObservableMap, ObservableSet, isObservableSet, transaction, observable, computed, isObservable, isObservableProp, isComputed, isComputedProp, extendObservable, observe, intercept, autorun, reaction, when, action, isAction, runInAction, keys, values, entries, set, remove, has, get, decorate, configure, onBecomeObserved, onBecomeUnobserved, flow, toJS, trace, getDependencyTree, getObserverTree, _resetGlobalState, _getGlobalState, getDebugName, getAtom, _getAdministration, _allowStateChanges, _allowStateChangesInsideComputed, isArrayLike, $mobx, _isComputingDerivation, onReactionError, _interceptReads */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Reaction", function() { return Reaction$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "untracked", function() { return untracked$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IDerivationState", function() { return IDerivationState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createAtom", function() { return createAtom$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spy", function() { return spy$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "comparer", function() { return comparer$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObservableObject", function() { return isObservableObject$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isBoxedObservable", function() { return isObservableValue$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObservableArray", function() { return isObservableArray$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObservableMap", function() { return ObservableMap$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObservableMap", function() { return isObservableMap$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObservableSet", function() { return ObservableSet$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObservableSet", function() { return isObservableSet$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transaction", function() { return transaction$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "observable", function() { return observable$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "computed", function() { return computed$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObservable", function() { return isObservable$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObservableProp", function() { return isObservableProp$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isComputed", function() { return isComputed$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isComputedProp", function() { return isComputedProp$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extendObservable", function() { return extendObservable$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "observe", function() { return observe$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "intercept", function() { return intercept$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "autorun", function() { return autorun$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reaction", function() { return reaction$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "when", function() { return when$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "action", function() { return action$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isAction", function() { return isAction$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "runInAction", function() { return runInAction$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keys", function() { return keys$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "values", function() { return values$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "entries", function() { return entries$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "remove", function() { return remove$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "has", function() { return has$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decorate", function() { return decorate$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "configure", function() { return configure$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onBecomeObserved", function() { return onBecomeObserved$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onBecomeUnobserved", function() { return onBecomeUnobserved$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flow", function() { return flow$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toJS", function() { return toJS$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trace", function() { return trace$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDependencyTree", function() { return getDependencyTree$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getObserverTree", function() { return getObserverTree$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_resetGlobalState", function() { return resetGlobalState$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_getGlobalState", function() { return getGlobalState$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDebugName", function() { return getDebugName$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAtom", function() { return getAtom$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_getAdministration", function() { return getAdministration$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_allowStateChanges", function() { return allowStateChanges$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_allowStateChangesInsideComputed", function() { return allowStateChangesInsideComputed$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isArrayLike", function() { return isArrayLike$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "$mobx", function() { return $mobx$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_isComputingDerivation", function() { return isComputingDerivation$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onReactionError", function() { return onReactionError$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_interceptReads", function() { return interceptReads$$1; });
/** MobX - (c) Michel Weststrate 2015 - 2018 - MIT Licensed */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};















function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

var OBFUSCATED_ERROR$$1 = "An invariant failed, however the error is obfuscated because this is an production build.";
var EMPTY_ARRAY$$1 = [];
Object.freeze(EMPTY_ARRAY$$1);
var EMPTY_OBJECT$$1 = {};
Object.freeze(EMPTY_OBJECT$$1);
function getNextId$$1() {
    return ++globalState$$1.mobxGuid;
}
function fail$$1(message) {
    invariant$$1(false, message);
    throw "X"; // unreachable
}
function invariant$$1(check, message) {
    if (!check)
        throw new Error("[mobx] " + (message || OBFUSCATED_ERROR$$1));
}
/**
 * Prints a deprecation message, but only one time.
 * Returns false if the deprecated message was already printed before
 */
var deprecatedMessages = [];
function deprecated$$1(msg, thing) {
    if (false)
        {}
    if (thing) {
        return deprecated$$1("'" + msg + "', use '" + thing + "' instead.");
    }
    if (deprecatedMessages.indexOf(msg) !== -1)
        return false;
    deprecatedMessages.push(msg);
    console.error("[mobx] Deprecated: " + msg);
    return true;
}
/**
 * Makes sure that the provided function is invoked at most once.
 */
function once$$1(func) {
    var invoked = false;
    return function () {
        if (invoked)
            return;
        invoked = true;
        return func.apply(this, arguments);
    };
}
var noop$$1 = function () { };
function unique$$1(list) {
    var res = [];
    list.forEach(function (item) {
        if (res.indexOf(item) === -1)
            res.push(item);
    });
    return res;
}
function isObject$$1(value) {
    return value !== null && typeof value === "object";
}
function isPlainObject$$1(value) {
    if (value === null || typeof value !== "object")
        return false;
    var proto = Object.getPrototypeOf(value);
    return proto === Object.prototype || proto === null;
}

function addHiddenProp$$1(object, propName, value) {
    Object.defineProperty(object, propName, {
        enumerable: false,
        writable: true,
        configurable: true,
        value: value
    });
}
function addHiddenFinalProp$$1(object, propName, value) {
    Object.defineProperty(object, propName, {
        enumerable: false,
        writable: false,
        configurable: true,
        value: value
    });
}
function isPropertyConfigurable$$1(object, prop) {
    var descriptor = Object.getOwnPropertyDescriptor(object, prop);
    return !descriptor || (descriptor.configurable !== false && descriptor.writable !== false);
}
function assertPropertyConfigurable$$1(object, prop) {
    if ( true && !isPropertyConfigurable$$1(object, prop))
        fail$$1("Cannot make property '" + prop.toString() + "' observable, it is not configurable and writable in the target object");
}
function createInstanceofPredicate$$1(name, clazz) {
    var propName = "isMobX" + name;
    clazz.prototype[propName] = true;
    return function (x) {
        return isObject$$1(x) && x[propName] === true;
    };
}
/**
 * Returns whether the argument is an array, disregarding observability.
 */
function isArrayLike$$1(x) {
    return Array.isArray(x) || isObservableArray$$1(x);
}
function isES6Map$$1(thing) {
    return thing instanceof Map;
}
function isES6Set$$1(thing) {
    return thing instanceof Set;
}
function getMapLikeKeys$$1(map) {
    if (isPlainObject$$1(map))
        return Object.keys(map);
    if (Array.isArray(map))
        return map.map(function (_a) {
            var _b = __read(_a, 1), key = _b[0];
            return key;
        });
    if (isES6Map$$1(map) || isObservableMap$$1(map))
        return Array.from(map.keys());
    return fail$$1("Cannot get keys from '" + map + "'");
}
function toPrimitive$$1(value) {
    return value === null ? null : typeof value === "object" ? "" + value : value;
}

var $mobx$$1 = Symbol("mobx administration");
var Atom$$1 = /** @class */ (function () {
    /**
     * Create a new atom. For debugging purposes it is recommended to give it a name.
     * The onBecomeObserved and onBecomeUnobserved callbacks can be used for resource management.
     */
    function Atom$$1(name) {
        if (name === void 0) { name = "Atom@" + getNextId$$1(); }
        this.name = name;
        this.isPendingUnobservation = false; // for effective unobserving. BaseAtom has true, for extra optimization, so its onBecomeUnobserved never gets called, because it's not needed
        this.isBeingObserved = false;
        this.observers = new Set();
        this.diffValue = 0;
        this.lastAccessedBy = 0;
        this.lowestObserverState = IDerivationState.NOT_TRACKING;
    }
    Atom$$1.prototype.onBecomeObserved = function () {
        if (this.onBecomeObservedListeners) {
            this.onBecomeObservedListeners.forEach(function (listener) { return listener(); });
        }
    };
    Atom$$1.prototype.onBecomeUnobserved = function () {
        if (this.onBecomeUnobservedListeners) {
            this.onBecomeUnobservedListeners.forEach(function (listener) { return listener(); });
        }
    };
    /**
     * Invoke this method to notify mobx that your atom has been used somehow.
     * Returns true if there is currently a reactive context.
     */
    Atom$$1.prototype.reportObserved = function () {
        return reportObserved$$1(this);
    };
    /**
     * Invoke this method _after_ this method has changed to signal mobx that all its observers should invalidate.
     */
    Atom$$1.prototype.reportChanged = function () {
        startBatch$$1();
        propagateChanged$$1(this);
        endBatch$$1();
    };
    Atom$$1.prototype.toString = function () {
        return this.name;
    };
    return Atom$$1;
}());
var isAtom$$1 = createInstanceofPredicate$$1("Atom", Atom$$1);
function createAtom$$1(name, onBecomeObservedHandler, onBecomeUnobservedHandler) {
    if (onBecomeObservedHandler === void 0) { onBecomeObservedHandler = noop$$1; }
    if (onBecomeUnobservedHandler === void 0) { onBecomeUnobservedHandler = noop$$1; }
    var atom = new Atom$$1(name);
    // default `noop` listener will not initialize the hook Set
    if (onBecomeObservedHandler !== noop$$1) {
        onBecomeObserved$$1(atom, onBecomeObservedHandler);
    }
    if (onBecomeUnobservedHandler !== noop$$1) {
        onBecomeUnobserved$$1(atom, onBecomeUnobservedHandler);
    }
    return atom;
}

function identityComparer(a, b) {
    return a === b;
}
function structuralComparer(a, b) {
    return deepEqual$$1(a, b);
}
function defaultComparer(a, b) {
    return Object.is(a, b);
}
var comparer$$1 = {
    identity: identityComparer,
    structural: structuralComparer,
    default: defaultComparer
};

var mobxDidRunLazyInitializersSymbol$$1 = Symbol("mobx did run lazy initializers");
var mobxPendingDecorators$$1 = Symbol("mobx pending decorators");
var enumerableDescriptorCache = {};
var nonEnumerableDescriptorCache = {};
function createPropertyInitializerDescriptor(prop, enumerable) {
    var cache = enumerable ? enumerableDescriptorCache : nonEnumerableDescriptorCache;
    return (cache[prop] ||
        (cache[prop] = {
            configurable: true,
            enumerable: enumerable,
            get: function () {
                initializeInstance$$1(this);
                return this[prop];
            },
            set: function (value) {
                initializeInstance$$1(this);
                this[prop] = value;
            }
        }));
}
function initializeInstance$$1(target) {
    if (target[mobxDidRunLazyInitializersSymbol$$1] === true)
        return;
    var decorators = target[mobxPendingDecorators$$1];
    if (decorators) {
        addHiddenProp$$1(target, mobxDidRunLazyInitializersSymbol$$1, true);
        for (var key in decorators) {
            var d = decorators[key];
            d.propertyCreator(target, d.prop, d.descriptor, d.decoratorTarget, d.decoratorArguments);
        }
    }
}
function createPropDecorator$$1(propertyInitiallyEnumerable, propertyCreator) {
    return function decoratorFactory() {
        var decoratorArguments;
        var decorator = function decorate$$1(target, prop, descriptor, applyImmediately
        // This is a special parameter to signal the direct application of a decorator, allow extendObservable to skip the entire type decoration part,
        // as the instance to apply the decorator to equals the target
        ) {
            if (applyImmediately === true) {
                propertyCreator(target, prop, descriptor, target, decoratorArguments);
                return null;
            }
            if ( true && !quacksLikeADecorator$$1(arguments))
                fail$$1("This function is a decorator, but it wasn't invoked like a decorator");
            if (!Object.prototype.hasOwnProperty.call(target, mobxPendingDecorators$$1)) {
                var inheritedDecorators = target[mobxPendingDecorators$$1];
                addHiddenProp$$1(target, mobxPendingDecorators$$1, __assign({}, inheritedDecorators));
            }
            target[mobxPendingDecorators$$1][prop] = {
                prop: prop,
                propertyCreator: propertyCreator,
                descriptor: descriptor,
                decoratorTarget: target,
                decoratorArguments: decoratorArguments
            };
            return createPropertyInitializerDescriptor(prop, propertyInitiallyEnumerable);
        };
        if (quacksLikeADecorator$$1(arguments)) {
            // @decorator
            decoratorArguments = EMPTY_ARRAY$$1;
            return decorator.apply(null, arguments);
        }
        else {
            // @decorator(args)
            decoratorArguments = Array.prototype.slice.call(arguments);
            return decorator;
        }
    };
}
function quacksLikeADecorator$$1(args) {
    return (((args.length === 2 || args.length === 3) && typeof args[1] === "string") ||
        (args.length === 4 && args[3] === true));
}

function deepEnhancer$$1(v, _, name) {
    // it is an observable already, done
    if (isObservable$$1(v))
        return v;
    // something that can be converted and mutated?
    if (Array.isArray(v))
        return observable$$1.array(v, { name: name });
    if (isPlainObject$$1(v))
        return observable$$1.object(v, undefined, { name: name });
    if (isES6Map$$1(v))
        return observable$$1.map(v, { name: name });
    if (isES6Set$$1(v))
        return observable$$1.set(v, { name: name });
    return v;
}
function shallowEnhancer$$1(v, _, name) {
    if (v === undefined || v === null)
        return v;
    if (isObservableObject$$1(v) || isObservableArray$$1(v) || isObservableMap$$1(v) || isObservableSet$$1(v))
        return v;
    if (Array.isArray(v))
        return observable$$1.array(v, { name: name, deep: false });
    if (isPlainObject$$1(v))
        return observable$$1.object(v, undefined, { name: name, deep: false });
    if (isES6Map$$1(v))
        return observable$$1.map(v, { name: name, deep: false });
    if (isES6Set$$1(v))
        return observable$$1.set(v, { name: name, deep: false });
    return fail$$1( true &&
        "The shallow modifier / decorator can only used in combination with arrays, objects, maps and sets");
}
function referenceEnhancer$$1(newValue) {
    // never turn into an observable
    return newValue;
}
function refStructEnhancer$$1(v, oldValue, name) {
    if ( true && isObservable$$1(v))
        throw "observable.struct should not be used with observable values";
    if (deepEqual$$1(v, oldValue))
        return oldValue;
    return v;
}

function createDecoratorForEnhancer$$1(enhancer) {
    invariant$$1(enhancer);
    var decorator = createPropDecorator$$1(true, function (target, propertyName, descriptor, _decoratorTarget, decoratorArgs) {
        if (true) {
            invariant$$1(!descriptor || !descriptor.get, "@observable cannot be used on getter (property \"" + propertyName + "\"), use @computed instead.");
        }
        var initialValue = descriptor
            ? descriptor.initializer
                ? descriptor.initializer.call(target)
                : descriptor.value
            : undefined;
        asObservableObject$$1(target).addObservableProp(propertyName, initialValue, enhancer);
    });
    var res = 
    // Extra process checks, as this happens during module initialization
    typeof process !== "undefined" && process.env && "development" !== "production"
        ? function observableDecorator() {
            // This wrapper function is just to detect illegal decorator invocations, deprecate in a next version
            // and simply return the created prop decorator
            if (arguments.length < 2)
                return fail$$1("Incorrect decorator invocation. @observable decorator doesn't expect any arguments");
            return decorator.apply(null, arguments);
        }
        : decorator;
    res.enhancer = enhancer;
    return res;
}

// Predefined bags of create observable options, to avoid allocating temporarily option objects
// in the majority of cases
var defaultCreateObservableOptions$$1 = {
    deep: true,
    name: undefined,
    defaultDecorator: undefined,
    proxy: true
};
Object.freeze(defaultCreateObservableOptions$$1);
function assertValidOption(key) {
    if (!/^(deep|name|equals|defaultDecorator|proxy)$/.test(key))
        fail$$1("invalid option for (extend)observable: " + key);
}
function asCreateObservableOptions$$1(thing) {
    if (thing === null || thing === undefined)
        return defaultCreateObservableOptions$$1;
    if (typeof thing === "string")
        return { name: thing, deep: true, proxy: true };
    if (true) {
        if (typeof thing !== "object")
            return fail$$1("expected options object");
        Object.keys(thing).forEach(assertValidOption);
    }
    return thing;
}
var deepDecorator$$1 = createDecoratorForEnhancer$$1(deepEnhancer$$1);
var shallowDecorator = createDecoratorForEnhancer$$1(shallowEnhancer$$1);
var refDecorator$$1 = createDecoratorForEnhancer$$1(referenceEnhancer$$1);
var refStructDecorator = createDecoratorForEnhancer$$1(refStructEnhancer$$1);
function getEnhancerFromOptions(options) {
    return options.defaultDecorator
        ? options.defaultDecorator.enhancer
        : options.deep === false
            ? referenceEnhancer$$1
            : deepEnhancer$$1;
}
/**
 * Turns an object, array or function into a reactive structure.
 * @param v the value which should become observable.
 */
function createObservable(v, arg2, arg3) {
    // @observable someProp;
    if (typeof arguments[1] === "string") {
        return deepDecorator$$1.apply(null, arguments);
    }
    // it is an observable already, done
    if (isObservable$$1(v))
        return v;
    // something that can be converted and mutated?
    var res = isPlainObject$$1(v)
        ? observable$$1.object(v, arg2, arg3)
        : Array.isArray(v)
            ? observable$$1.array(v, arg2)
            : isES6Map$$1(v)
                ? observable$$1.map(v, arg2)
                : isES6Set$$1(v)
                    ? observable$$1.set(v, arg2)
                    : v;
    // this value could be converted to a new observable data structure, return it
    if (res !== v)
        return res;
    // otherwise, just box it
    fail$$1( true &&
        "The provided value could not be converted into an observable. If you want just create an observable reference to the object use 'observable.box(value)'");
}
var observableFactories = {
    box: function (value, options) {
        if (arguments.length > 2)
            incorrectlyUsedAsDecorator("box");
        var o = asCreateObservableOptions$$1(options);
        return new ObservableValue$$1(value, getEnhancerFromOptions(o), o.name, true, o.equals);
    },
    array: function (initialValues, options) {
        if (arguments.length > 2)
            incorrectlyUsedAsDecorator("array");
        var o = asCreateObservableOptions$$1(options);
        return createObservableArray$$1(initialValues, getEnhancerFromOptions(o), o.name);
    },
    map: function (initialValues, options) {
        if (arguments.length > 2)
            incorrectlyUsedAsDecorator("map");
        var o = asCreateObservableOptions$$1(options);
        return new ObservableMap$$1(initialValues, getEnhancerFromOptions(o), o.name);
    },
    set: function (initialValues, options) {
        if (arguments.length > 2)
            incorrectlyUsedAsDecorator("set");
        var o = asCreateObservableOptions$$1(options);
        return new ObservableSet$$1(initialValues, getEnhancerFromOptions(o), o.name);
    },
    object: function (props, decorators, options) {
        if (typeof arguments[1] === "string")
            incorrectlyUsedAsDecorator("object");
        var o = asCreateObservableOptions$$1(options);
        if (o.proxy === false) {
            return extendObservable$$1({}, props, decorators, o);
        }
        else {
            var defaultDecorator = getDefaultDecoratorFromObjectOptions$$1(o);
            var base = extendObservable$$1({}, undefined, undefined, o);
            var proxy = createDynamicObservableObject$$1(base);
            extendObservableObjectWithProperties$$1(proxy, props, decorators, defaultDecorator);
            return proxy;
        }
    },
    ref: refDecorator$$1,
    shallow: shallowDecorator,
    deep: deepDecorator$$1,
    struct: refStructDecorator
};
var observable$$1 = createObservable;
// weird trick to keep our typings nicely with our funcs, and still extend the observable function
Object.keys(observableFactories).forEach(function (name) { return (observable$$1[name] = observableFactories[name]); });
function incorrectlyUsedAsDecorator(methodName) {
    fail$$1(
    // process.env.NODE_ENV !== "production" &&
    "Expected one or two arguments to observable." + methodName + ". Did you accidentally try to use observable." + methodName + " as decorator?");
}

var computedDecorator$$1 = createPropDecorator$$1(false, function (instance, propertyName, descriptor, decoratorTarget, decoratorArgs) {
    var get$$1 = descriptor.get, set$$1 = descriptor.set; // initialValue is the descriptor for get / set props
    // Optimization: faster on decorator target or instance? Assuming target
    // Optimization: find out if declaring on instance isn't just faster. (also makes the property descriptor simpler). But, more memory usage..
    // Forcing instance now, fixes hot reloadig issues on React Native:
    var options = decoratorArgs[0] || {};
    asObservableObject$$1(instance).addComputedProp(instance, propertyName, __assign({ get: get$$1,
        set: set$$1, context: instance }, options));
});
var computedStructDecorator = computedDecorator$$1({ equals: comparer$$1.structural });
/**
 * Decorator for class properties: @computed get value() { return expr; }.
 * For legacy purposes also invokable as ES5 observable created: `computed(() => expr)`;
 */
var computed$$1 = function computed$$1(arg1, arg2, arg3) {
    if (typeof arg2 === "string") {
        // @computed
        return computedDecorator$$1.apply(null, arguments);
    }
    if (arg1 !== null && typeof arg1 === "object" && arguments.length === 1) {
        // @computed({ options })
        return computedDecorator$$1.apply(null, arguments);
    }
    // computed(expr, options?)
    if (true) {
        invariant$$1(typeof arg1 === "function", "First argument to `computed` should be an expression.");
        invariant$$1(arguments.length < 3, "Computed takes one or two arguments if used as function");
    }
    var opts = typeof arg2 === "object" ? arg2 : {};
    opts.get = arg1;
    opts.set = typeof arg2 === "function" ? arg2 : opts.set;
    opts.name = opts.name || arg1.name || ""; /* for generated name */
    return new ComputedValue$$1(opts);
};
computed$$1.struct = computedStructDecorator;

function createAction$$1(actionName, fn) {
    if (true) {
        invariant$$1(typeof fn === "function", "`action` can only be invoked on functions");
        if (typeof actionName !== "string" || !actionName)
            fail$$1("actions should have valid names, got: '" + actionName + "'");
    }
    var res = function () {
        return executeAction$$1(actionName, fn, this, arguments);
    };
    res.isMobxAction = true;
    return res;
}
function executeAction$$1(actionName, fn, scope, args) {
    var runInfo = startAction(actionName, fn, scope, args);
    var shouldSupressReactionError = true;
    try {
        var res = fn.apply(scope, args);
        shouldSupressReactionError = false;
        return res;
    }
    finally {
        if (shouldSupressReactionError) {
            globalState$$1.suppressReactionErrors = shouldSupressReactionError;
            endAction(runInfo);
            globalState$$1.suppressReactionErrors = false;
        }
        else {
            endAction(runInfo);
        }
    }
}
function startAction(actionName, fn, scope, args) {
    var notifySpy = isSpyEnabled$$1() && !!actionName;
    var startTime = 0;
    if (notifySpy && "development" !== "production") {
        startTime = Date.now();
        var l = (args && args.length) || 0;
        var flattendArgs = new Array(l);
        if (l > 0)
            for (var i = 0; i < l; i++)
                flattendArgs[i] = args[i];
        spyReportStart$$1({
            type: "action",
            name: actionName,
            object: scope,
            arguments: flattendArgs
        });
    }
    var prevDerivation = untrackedStart$$1();
    startBatch$$1();
    var prevAllowStateChanges = allowStateChangesStart$$1(true);
    return {
        prevDerivation: prevDerivation,
        prevAllowStateChanges: prevAllowStateChanges,
        notifySpy: notifySpy,
        startTime: startTime
    };
}
function endAction(runInfo) {
    allowStateChangesEnd$$1(runInfo.prevAllowStateChanges);
    endBatch$$1();
    untrackedEnd$$1(runInfo.prevDerivation);
    if (runInfo.notifySpy && "development" !== "production")
        spyReportEnd$$1({ time: Date.now() - runInfo.startTime });
}
function allowStateChanges$$1(allowStateChanges$$1, func) {
    var prev = allowStateChangesStart$$1(allowStateChanges$$1);
    var res;
    try {
        res = func();
    }
    finally {
        allowStateChangesEnd$$1(prev);
    }
    return res;
}
function allowStateChangesStart$$1(allowStateChanges$$1) {
    var prev = globalState$$1.allowStateChanges;
    globalState$$1.allowStateChanges = allowStateChanges$$1;
    return prev;
}
function allowStateChangesEnd$$1(prev) {
    globalState$$1.allowStateChanges = prev;
}
function allowStateChangesInsideComputed$$1(func) {
    var prev = globalState$$1.computationDepth;
    globalState$$1.computationDepth = 0;
    var res;
    try {
        res = func();
    }
    finally {
        globalState$$1.computationDepth = prev;
    }
    return res;
}

var ObservableValue$$1 = /** @class */ (function (_super) {
    __extends(ObservableValue$$1, _super);
    function ObservableValue$$1(value, enhancer, name, notifySpy, equals) {
        if (name === void 0) { name = "ObservableValue@" + getNextId$$1(); }
        if (notifySpy === void 0) { notifySpy = true; }
        if (equals === void 0) { equals = comparer$$1.default; }
        var _this = _super.call(this, name) || this;
        _this.enhancer = enhancer;
        _this.name = name;
        _this.equals = equals;
        _this.hasUnreportedChange = false;
        _this.value = enhancer(value, undefined, name);
        if (notifySpy && isSpyEnabled$$1() && "development" !== "production") {
            // only notify spy if this is a stand-alone observable
            spyReport$$1({ type: "create", name: _this.name, newValue: "" + _this.value });
        }
        return _this;
    }
    ObservableValue$$1.prototype.dehanceValue = function (value) {
        if (this.dehancer !== undefined)
            return this.dehancer(value);
        return value;
    };
    ObservableValue$$1.prototype.set = function (newValue) {
        var oldValue = this.value;
        newValue = this.prepareNewValue(newValue);
        if (newValue !== globalState$$1.UNCHANGED) {
            var notifySpy = isSpyEnabled$$1();
            if (notifySpy && "development" !== "production") {
                spyReportStart$$1({
                    type: "update",
                    name: this.name,
                    newValue: newValue,
                    oldValue: oldValue
                });
            }
            this.setNewValue(newValue);
            if (notifySpy && "development" !== "production")
                spyReportEnd$$1();
        }
    };
    ObservableValue$$1.prototype.prepareNewValue = function (newValue) {
        checkIfStateModificationsAreAllowed$$1(this);
        if (hasInterceptors$$1(this)) {
            var change = interceptChange$$1(this, {
                object: this,
                type: "update",
                newValue: newValue
            });
            if (!change)
                return globalState$$1.UNCHANGED;
            newValue = change.newValue;
        }
        // apply modifier
        newValue = this.enhancer(newValue, this.value, this.name);
        return this.equals(this.value, newValue) ? globalState$$1.UNCHANGED : newValue;
    };
    ObservableValue$$1.prototype.setNewValue = function (newValue) {
        var oldValue = this.value;
        this.value = newValue;
        this.reportChanged();
        if (hasListeners$$1(this)) {
            notifyListeners$$1(this, {
                type: "update",
                object: this,
                newValue: newValue,
                oldValue: oldValue
            });
        }
    };
    ObservableValue$$1.prototype.get = function () {
        this.reportObserved();
        return this.dehanceValue(this.value);
    };
    ObservableValue$$1.prototype.intercept = function (handler) {
        return registerInterceptor$$1(this, handler);
    };
    ObservableValue$$1.prototype.observe = function (listener, fireImmediately) {
        if (fireImmediately)
            listener({
                object: this,
                type: "update",
                newValue: this.value,
                oldValue: undefined
            });
        return registerListener$$1(this, listener);
    };
    ObservableValue$$1.prototype.toJSON = function () {
        return this.get();
    };
    ObservableValue$$1.prototype.toString = function () {
        return this.name + "[" + this.value + "]";
    };
    ObservableValue$$1.prototype.valueOf = function () {
        return toPrimitive$$1(this.get());
    };
    ObservableValue$$1.prototype[Symbol.toPrimitive] = function () {
        return this.valueOf();
    };
    return ObservableValue$$1;
}(Atom$$1));
var isObservableValue$$1 = createInstanceofPredicate$$1("ObservableValue", ObservableValue$$1);

/**
 * A node in the state dependency root that observes other nodes, and can be observed itself.
 *
 * ComputedValue will remember the result of the computation for the duration of the batch, or
 * while being observed.
 *
 * During this time it will recompute only when one of its direct dependencies changed,
 * but only when it is being accessed with `ComputedValue.get()`.
 *
 * Implementation description:
 * 1. First time it's being accessed it will compute and remember result
 *    give back remembered result until 2. happens
 * 2. First time any deep dependency change, propagate POSSIBLY_STALE to all observers, wait for 3.
 * 3. When it's being accessed, recompute if any shallow dependency changed.
 *    if result changed: propagate STALE to all observers, that were POSSIBLY_STALE from the last step.
 *    go to step 2. either way
 *
 * If at any point it's outside batch and it isn't observed: reset everything and go to 1.
 */
var ComputedValue$$1 = /** @class */ (function () {
    /**
     * Create a new computed value based on a function expression.
     *
     * The `name` property is for debug purposes only.
     *
     * The `equals` property specifies the comparer function to use to determine if a newly produced
     * value differs from the previous value. Two comparers are provided in the library; `defaultComparer`
     * compares based on identity comparison (===), and `structualComparer` deeply compares the structure.
     * Structural comparison can be convenient if you always produce a new aggregated object and
     * don't want to notify observers if it is structurally the same.
     * This is useful for working with vectors, mouse coordinates etc.
     */
    function ComputedValue$$1(options) {
        this.dependenciesState = IDerivationState.NOT_TRACKING;
        this.observing = []; // nodes we are looking at. Our value depends on these nodes
        this.newObserving = null; // during tracking it's an array with new observed observers
        this.isBeingObserved = false;
        this.isPendingUnobservation = false;
        this.observers = new Set();
        this.diffValue = 0;
        this.runId = 0;
        this.lastAccessedBy = 0;
        this.lowestObserverState = IDerivationState.UP_TO_DATE;
        this.unboundDepsCount = 0;
        this.__mapid = "#" + getNextId$$1();
        this.value = new CaughtException$$1(null);
        this.isComputing = false; // to check for cycles
        this.isRunningSetter = false;
        this.isTracing = TraceMode$$1.NONE;
        if ( true && !options.get)
            throw "[mobx] missing option for computed: get";
        this.derivation = options.get;
        this.name = options.name || "ComputedValue@" + getNextId$$1();
        if (options.set)
            this.setter = createAction$$1(this.name + "-setter", options.set);
        this.equals =
            options.equals ||
                (options.compareStructural || options.struct
                    ? comparer$$1.structural
                    : comparer$$1.default);
        this.scope = options.context;
        this.requiresReaction = !!options.requiresReaction;
        this.keepAlive = !!options.keepAlive;
    }
    ComputedValue$$1.prototype.onBecomeStale = function () {
        propagateMaybeChanged$$1(this);
    };
    ComputedValue$$1.prototype.onBecomeObserved = function () {
        if (this.onBecomeObservedListeners) {
            this.onBecomeObservedListeners.forEach(function (listener) { return listener(); });
        }
    };
    ComputedValue$$1.prototype.onBecomeUnobserved = function () {
        if (this.onBecomeUnobservedListeners) {
            this.onBecomeUnobservedListeners.forEach(function (listener) { return listener(); });
        }
    };
    /**
     * Returns the current value of this computed value.
     * Will evaluate its computation first if needed.
     */
    ComputedValue$$1.prototype.get = function () {
        if (this.isComputing)
            fail$$1("Cycle detected in computation " + this.name + ": " + this.derivation);
        if (globalState$$1.inBatch === 0 && this.observers.size === 0 && !this.keepAlive) {
            if (shouldCompute$$1(this)) {
                this.warnAboutUntrackedRead();
                startBatch$$1(); // See perf test 'computed memoization'
                this.value = this.computeValue(false);
                endBatch$$1();
            }
        }
        else {
            reportObserved$$1(this);
            if (shouldCompute$$1(this))
                if (this.trackAndCompute())
                    propagateChangeConfirmed$$1(this);
        }
        var result = this.value;
        if (isCaughtException$$1(result))
            throw result.cause;
        return result;
    };
    ComputedValue$$1.prototype.peek = function () {
        var res = this.computeValue(false);
        if (isCaughtException$$1(res))
            throw res.cause;
        return res;
    };
    ComputedValue$$1.prototype.set = function (value) {
        if (this.setter) {
            invariant$$1(!this.isRunningSetter, "The setter of computed value '" + this.name + "' is trying to update itself. Did you intend to update an _observable_ value, instead of the computed property?");
            this.isRunningSetter = true;
            try {
                this.setter.call(this.scope, value);
            }
            finally {
                this.isRunningSetter = false;
            }
        }
        else
            invariant$$1(false,  true &&
                "[ComputedValue '" + this.name + "'] It is not possible to assign a new value to a computed value.");
    };
    ComputedValue$$1.prototype.trackAndCompute = function () {
        if (isSpyEnabled$$1() && "development" !== "production") {
            spyReport$$1({
                object: this.scope,
                type: "compute",
                name: this.name
            });
        }
        var oldValue = this.value;
        var wasSuspended = 
        /* see #1208 */ this.dependenciesState === IDerivationState.NOT_TRACKING;
        var newValue = this.computeValue(true);
        var changed = wasSuspended ||
            isCaughtException$$1(oldValue) ||
            isCaughtException$$1(newValue) ||
            !this.equals(oldValue, newValue);
        if (changed) {
            this.value = newValue;
        }
        return changed;
    };
    ComputedValue$$1.prototype.computeValue = function (track) {
        this.isComputing = true;
        globalState$$1.computationDepth++;
        var res;
        if (track) {
            res = trackDerivedFunction$$1(this, this.derivation, this.scope);
        }
        else {
            if (globalState$$1.disableErrorBoundaries === true) {
                res = this.derivation.call(this.scope);
            }
            else {
                try {
                    res = this.derivation.call(this.scope);
                }
                catch (e) {
                    res = new CaughtException$$1(e);
                }
            }
        }
        globalState$$1.computationDepth--;
        this.isComputing = false;
        return res;
    };
    ComputedValue$$1.prototype.suspend = function () {
        if (!this.keepAlive) {
            clearObserving$$1(this);
            this.value = undefined; // don't hold on to computed value!
        }
    };
    ComputedValue$$1.prototype.observe = function (listener, fireImmediately) {
        var _this = this;
        var firstTime = true;
        var prevValue = undefined;
        return autorun$$1(function () {
            var newValue = _this.get();
            if (!firstTime || fireImmediately) {
                var prevU = untrackedStart$$1();
                listener({
                    type: "update",
                    object: _this,
                    newValue: newValue,
                    oldValue: prevValue
                });
                untrackedEnd$$1(prevU);
            }
            firstTime = false;
            prevValue = newValue;
        });
    };
    ComputedValue$$1.prototype.warnAboutUntrackedRead = function () {
        if (false)
            {}
        if (this.requiresReaction === true) {
            fail$$1("[mobx] Computed value " + this.name + " is read outside a reactive context");
        }
        if (this.isTracing !== TraceMode$$1.NONE) {
            console.log("[mobx.trace] '" + this.name + "' is being read outside a reactive context. Doing a full recompute");
        }
        if (globalState$$1.computedRequiresReaction) {
            console.warn("[mobx] Computed value " + this.name + " is being read outside a reactive context. Doing a full recompute");
        }
    };
    ComputedValue$$1.prototype.toJSON = function () {
        return this.get();
    };
    ComputedValue$$1.prototype.toString = function () {
        return this.name + "[" + this.derivation.toString() + "]";
    };
    ComputedValue$$1.prototype.valueOf = function () {
        return toPrimitive$$1(this.get());
    };
    ComputedValue$$1.prototype[Symbol.toPrimitive] = function () {
        return this.valueOf();
    };
    return ComputedValue$$1;
}());
var isComputedValue$$1 = createInstanceofPredicate$$1("ComputedValue", ComputedValue$$1);

var IDerivationState;
(function (IDerivationState$$1) {
    // before being run or (outside batch and not being observed)
    // at this point derivation is not holding any data about dependency tree
    IDerivationState$$1[IDerivationState$$1["NOT_TRACKING"] = -1] = "NOT_TRACKING";
    // no shallow dependency changed since last computation
    // won't recalculate derivation
    // this is what makes mobx fast
    IDerivationState$$1[IDerivationState$$1["UP_TO_DATE"] = 0] = "UP_TO_DATE";
    // some deep dependency changed, but don't know if shallow dependency changed
    // will require to check first if UP_TO_DATE or POSSIBLY_STALE
    // currently only ComputedValue will propagate POSSIBLY_STALE
    //
    // having this state is second big optimization:
    // don't have to recompute on every dependency change, but only when it's needed
    IDerivationState$$1[IDerivationState$$1["POSSIBLY_STALE"] = 1] = "POSSIBLY_STALE";
    // A shallow dependency has changed since last computation and the derivation
    // will need to recompute when it's needed next.
    IDerivationState$$1[IDerivationState$$1["STALE"] = 2] = "STALE";
})(IDerivationState || (IDerivationState = {}));
var TraceMode$$1;
(function (TraceMode$$1) {
    TraceMode$$1[TraceMode$$1["NONE"] = 0] = "NONE";
    TraceMode$$1[TraceMode$$1["LOG"] = 1] = "LOG";
    TraceMode$$1[TraceMode$$1["BREAK"] = 2] = "BREAK";
})(TraceMode$$1 || (TraceMode$$1 = {}));
var CaughtException$$1 = /** @class */ (function () {
    function CaughtException$$1(cause) {
        this.cause = cause;
        // Empty
    }
    return CaughtException$$1;
}());
function isCaughtException$$1(e) {
    return e instanceof CaughtException$$1;
}
/**
 * Finds out whether any dependency of the derivation has actually changed.
 * If dependenciesState is 1 then it will recalculate dependencies,
 * if any dependency changed it will propagate it by changing dependenciesState to 2.
 *
 * By iterating over the dependencies in the same order that they were reported and
 * stopping on the first change, all the recalculations are only called for ComputedValues
 * that will be tracked by derivation. That is because we assume that if the first x
 * dependencies of the derivation doesn't change then the derivation should run the same way
 * up until accessing x-th dependency.
 */
function shouldCompute$$1(derivation) {
    switch (derivation.dependenciesState) {
        case IDerivationState.UP_TO_DATE:
            return false;
        case IDerivationState.NOT_TRACKING:
        case IDerivationState.STALE:
            return true;
        case IDerivationState.POSSIBLY_STALE: {
            var prevUntracked = untrackedStart$$1(); // no need for those computeds to be reported, they will be picked up in trackDerivedFunction.
            var obs = derivation.observing, l = obs.length;
            for (var i = 0; i < l; i++) {
                var obj = obs[i];
                if (isComputedValue$$1(obj)) {
                    if (globalState$$1.disableErrorBoundaries) {
                        obj.get();
                    }
                    else {
                        try {
                            obj.get();
                        }
                        catch (e) {
                            // we are not interested in the value *or* exception at this moment, but if there is one, notify all
                            untrackedEnd$$1(prevUntracked);
                            return true;
                        }
                    }
                    // if ComputedValue `obj` actually changed it will be computed and propagated to its observers.
                    // and `derivation` is an observer of `obj`
                    // invariantShouldCompute(derivation)
                    if (derivation.dependenciesState === IDerivationState.STALE) {
                        untrackedEnd$$1(prevUntracked);
                        return true;
                    }
                }
            }
            changeDependenciesStateTo0$$1(derivation);
            untrackedEnd$$1(prevUntracked);
            return false;
        }
    }
}
// function invariantShouldCompute(derivation: IDerivation) {
//     const newDepState = (derivation as any).dependenciesState
//     if (
//         process.env.NODE_ENV === "production" &&
//         (newDepState === IDerivationState.POSSIBLY_STALE ||
//             newDepState === IDerivationState.NOT_TRACKING)
//     )
//         fail("Illegal dependency state")
// }
function isComputingDerivation$$1() {
    return globalState$$1.trackingDerivation !== null; // filter out actions inside computations
}
function checkIfStateModificationsAreAllowed$$1(atom) {
    var hasObservers$$1 = atom.observers.size > 0;
    // Should never be possible to change an observed observable from inside computed, see #798
    if (globalState$$1.computationDepth > 0 && hasObservers$$1)
        fail$$1( true &&
            "Computed values are not allowed to cause side effects by changing observables that are already being observed. Tried to modify: " + atom.name);
    // Should not be possible to change observed state outside strict mode, except during initialization, see #563
    if (!globalState$$1.allowStateChanges && (hasObservers$$1 || globalState$$1.enforceActions === "strict"))
        fail$$1( true &&
            (globalState$$1.enforceActions
                ? "Since strict-mode is enabled, changing observed observable values outside actions is not allowed. Please wrap the code in an `action` if this change is intended. Tried to modify: "
                : "Side effects like changing state are not allowed at this point. Are you trying to modify state from, for example, the render function of a React component? Tried to modify: ") +
                atom.name);
}
/**
 * Executes the provided function `f` and tracks which observables are being accessed.
 * The tracking information is stored on the `derivation` object and the derivation is registered
 * as observer of any of the accessed observables.
 */
function trackDerivedFunction$$1(derivation, f, context) {
    // pre allocate array allocation + room for variation in deps
    // array will be trimmed by bindDependencies
    changeDependenciesStateTo0$$1(derivation);
    derivation.newObserving = new Array(derivation.observing.length + 100);
    derivation.unboundDepsCount = 0;
    derivation.runId = ++globalState$$1.runId;
    var prevTracking = globalState$$1.trackingDerivation;
    globalState$$1.trackingDerivation = derivation;
    var result;
    if (globalState$$1.disableErrorBoundaries === true) {
        result = f.call(context);
    }
    else {
        try {
            result = f.call(context);
        }
        catch (e) {
            result = new CaughtException$$1(e);
        }
    }
    globalState$$1.trackingDerivation = prevTracking;
    bindDependencies(derivation);
    return result;
}
/**
 * diffs newObserving with observing.
 * update observing to be newObserving with unique observables
 * notify observers that become observed/unobserved
 */
function bindDependencies(derivation) {
    // invariant(derivation.dependenciesState !== IDerivationState.NOT_TRACKING, "INTERNAL ERROR bindDependencies expects derivation.dependenciesState !== -1");
    var prevObserving = derivation.observing;
    var observing = (derivation.observing = derivation.newObserving);
    var lowestNewObservingDerivationState = IDerivationState.UP_TO_DATE;
    // Go through all new observables and check diffValue: (this list can contain duplicates):
    //   0: first occurrence, change to 1 and keep it
    //   1: extra occurrence, drop it
    var i0 = 0, l = derivation.unboundDepsCount;
    for (var i = 0; i < l; i++) {
        var dep = observing[i];
        if (dep.diffValue === 0) {
            dep.diffValue = 1;
            if (i0 !== i)
                observing[i0] = dep;
            i0++;
        }
        // Upcast is 'safe' here, because if dep is IObservable, `dependenciesState` will be undefined,
        // not hitting the condition
        if (dep.dependenciesState > lowestNewObservingDerivationState) {
            lowestNewObservingDerivationState = dep.dependenciesState;
        }
    }
    observing.length = i0;
    derivation.newObserving = null; // newObserving shouldn't be needed outside tracking (statement moved down to work around FF bug, see #614)
    // Go through all old observables and check diffValue: (it is unique after last bindDependencies)
    //   0: it's not in new observables, unobserve it
    //   1: it keeps being observed, don't want to notify it. change to 0
    l = prevObserving.length;
    while (l--) {
        var dep = prevObserving[l];
        if (dep.diffValue === 0) {
            removeObserver$$1(dep, derivation);
        }
        dep.diffValue = 0;
    }
    // Go through all new observables and check diffValue: (now it should be unique)
    //   0: it was set to 0 in last loop. don't need to do anything.
    //   1: it wasn't observed, let's observe it. set back to 0
    while (i0--) {
        var dep = observing[i0];
        if (dep.diffValue === 1) {
            dep.diffValue = 0;
            addObserver$$1(dep, derivation);
        }
    }
    // Some new observed derivations may become stale during this derivation computation
    // so they have had no chance to propagate staleness (#916)
    if (lowestNewObservingDerivationState !== IDerivationState.UP_TO_DATE) {
        derivation.dependenciesState = lowestNewObservingDerivationState;
        derivation.onBecomeStale();
    }
}
function clearObserving$$1(derivation) {
    // invariant(globalState.inBatch > 0, "INTERNAL ERROR clearObserving should be called only inside batch");
    var obs = derivation.observing;
    derivation.observing = [];
    var i = obs.length;
    while (i--)
        removeObserver$$1(obs[i], derivation);
    derivation.dependenciesState = IDerivationState.NOT_TRACKING;
}
function untracked$$1(action$$1) {
    var prev = untrackedStart$$1();
    try {
        return action$$1();
    }
    finally {
        untrackedEnd$$1(prev);
    }
}
function untrackedStart$$1() {
    var prev = globalState$$1.trackingDerivation;
    globalState$$1.trackingDerivation = null;
    return prev;
}
function untrackedEnd$$1(prev) {
    globalState$$1.trackingDerivation = prev;
}
/**
 * needed to keep `lowestObserverState` correct. when changing from (2 or 1) to 0
 *
 */
function changeDependenciesStateTo0$$1(derivation) {
    if (derivation.dependenciesState === IDerivationState.UP_TO_DATE)
        return;
    derivation.dependenciesState = IDerivationState.UP_TO_DATE;
    var obs = derivation.observing;
    var i = obs.length;
    while (i--)
        obs[i].lowestObserverState = IDerivationState.UP_TO_DATE;
}

/**
 * These values will persist if global state is reset
 */
var persistentKeys = [
    "mobxGuid",
    "spyListeners",
    "enforceActions",
    "computedRequiresReaction",
    "disableErrorBoundaries",
    "runId",
    "UNCHANGED"
];
var MobXGlobals$$1 = /** @class */ (function () {
    function MobXGlobals$$1() {
        /**
         * MobXGlobals version.
         * MobX compatiblity with other versions loaded in memory as long as this version matches.
         * It indicates that the global state still stores similar information
         *
         * N.B: this version is unrelated to the package version of MobX, and is only the version of the
         * internal state storage of MobX, and can be the same across many different package versions
         */
        this.version = 5;
        /**
         * globally unique token to signal unchanged
         */
        this.UNCHANGED = {};
        /**
         * Currently running derivation
         */
        this.trackingDerivation = null;
        /**
         * Are we running a computation currently? (not a reaction)
         */
        this.computationDepth = 0;
        /**
         * Each time a derivation is tracked, it is assigned a unique run-id
         */
        this.runId = 0;
        /**
         * 'guid' for general purpose. Will be persisted amongst resets.
         */
        this.mobxGuid = 0;
        /**
         * Are we in a batch block? (and how many of them)
         */
        this.inBatch = 0;
        /**
         * Observables that don't have observers anymore, and are about to be
         * suspended, unless somebody else accesses it in the same batch
         *
         * @type {IObservable[]}
         */
        this.pendingUnobservations = [];
        /**
         * List of scheduled, not yet executed, reactions.
         */
        this.pendingReactions = [];
        /**
         * Are we currently processing reactions?
         */
        this.isRunningReactions = false;
        /**
         * Is it allowed to change observables at this point?
         * In general, MobX doesn't allow that when running computations and React.render.
         * To ensure that those functions stay pure.
         */
        this.allowStateChanges = true;
        /**
         * If strict mode is enabled, state changes are by default not allowed
         */
        this.enforceActions = false;
        /**
         * Spy callbacks
         */
        this.spyListeners = [];
        /**
         * Globally attached error handlers that react specifically to errors in reactions
         */
        this.globalReactionErrorHandlers = [];
        /**
         * Warn if computed values are accessed outside a reactive context
         */
        this.computedRequiresReaction = false;
        /*
         * Don't catch and rethrow exceptions. This is useful for inspecting the state of
         * the stack when an exception occurs while debugging.
         */
        this.disableErrorBoundaries = false;
        /*
         * If true, we are already handling an exception in an action. Any errors in reactions should be supressed, as
         * they are not the cause, see: https://github.com/mobxjs/mobx/issues/1836
         */
        this.suppressReactionErrors = false;
    }
    return MobXGlobals$$1;
}());
var canMergeGlobalState = true;
var isolateCalled = false;
var globalState$$1 = (function () {
    var global = getGlobal$$1();
    if (global.__mobxInstanceCount > 0 && !global.__mobxGlobals)
        canMergeGlobalState = false;
    if (global.__mobxGlobals && global.__mobxGlobals.version !== new MobXGlobals$$1().version)
        canMergeGlobalState = false;
    if (!canMergeGlobalState) {
        setTimeout(function () {
            if (!isolateCalled) {
                fail$$1("There are multiple, different versions of MobX active. Make sure MobX is loaded only once or use `configure({ isolateGlobalState: true })`");
            }
        }, 1);
        return new MobXGlobals$$1();
    }
    else if (global.__mobxGlobals) {
        global.__mobxInstanceCount += 1;
        if (!global.__mobxGlobals.UNCHANGED)
            global.__mobxGlobals.UNCHANGED = {}; // make merge backward compatible
        return global.__mobxGlobals;
    }
    else {
        global.__mobxInstanceCount = 1;
        return (global.__mobxGlobals = new MobXGlobals$$1());
    }
})();
function isolateGlobalState$$1() {
    if (globalState$$1.pendingReactions.length ||
        globalState$$1.inBatch ||
        globalState$$1.isRunningReactions)
        fail$$1("isolateGlobalState should be called before MobX is running any reactions");
    isolateCalled = true;
    if (canMergeGlobalState) {
        if (--getGlobal$$1().__mobxInstanceCount === 0)
            getGlobal$$1().__mobxGlobals = undefined;
        globalState$$1 = new MobXGlobals$$1();
    }
}
function getGlobalState$$1() {
    return globalState$$1;
}
/**
 * For testing purposes only; this will break the internal state of existing observables,
 * but can be used to get back at a stable state after throwing errors
 */
function resetGlobalState$$1() {
    var defaultGlobals = new MobXGlobals$$1();
    for (var key in defaultGlobals)
        if (persistentKeys.indexOf(key) === -1)
            globalState$$1[key] = defaultGlobals[key];
    globalState$$1.allowStateChanges = !globalState$$1.enforceActions;
}
function getGlobal$$1() {
    return typeof window !== "undefined" ? window : global;
}

function hasObservers$$1(observable$$1) {
    return observable$$1.observers && observable$$1.observers.size > 0;
}
function getObservers$$1(observable$$1) {
    return observable$$1.observers;
}
// function invariantObservers(observable: IObservable) {
//     const list = observable.observers
//     const map = observable.observersIndexes
//     const l = list.length
//     for (let i = 0; i < l; i++) {
//         const id = list[i].__mapid
//         if (i) {
//             invariant(map[id] === i, "INTERNAL ERROR maps derivation.__mapid to index in list") // for performance
//         } else {
//             invariant(!(id in map), "INTERNAL ERROR observer on index 0 shouldn't be held in map.") // for performance
//         }
//     }
//     invariant(
//         list.length === 0 || Object.keys(map).length === list.length - 1,
//         "INTERNAL ERROR there is no junk in map"
//     )
// }
function addObserver$$1(observable$$1, node) {
    // invariant(node.dependenciesState !== -1, "INTERNAL ERROR, can add only dependenciesState !== -1");
    // invariant(observable._observers.indexOf(node) === -1, "INTERNAL ERROR add already added node");
    // invariantObservers(observable);
    observable$$1.observers.add(node);
    if (observable$$1.lowestObserverState > node.dependenciesState)
        observable$$1.lowestObserverState = node.dependenciesState;
    // invariantObservers(observable);
    // invariant(observable._observers.indexOf(node) !== -1, "INTERNAL ERROR didn't add node");
}
function removeObserver$$1(observable$$1, node) {
    // invariant(globalState.inBatch > 0, "INTERNAL ERROR, remove should be called only inside batch");
    // invariant(observable._observers.indexOf(node) !== -1, "INTERNAL ERROR remove already removed node");
    // invariantObservers(observable);
    observable$$1.observers.delete(node);
    if (observable$$1.observers.size === 0) {
        // deleting last observer
        queueForUnobservation$$1(observable$$1);
    }
    // invariantObservers(observable);
    // invariant(observable._observers.indexOf(node) === -1, "INTERNAL ERROR remove already removed node2");
}
function queueForUnobservation$$1(observable$$1) {
    if (observable$$1.isPendingUnobservation === false) {
        // invariant(observable._observers.length === 0, "INTERNAL ERROR, should only queue for unobservation unobserved observables");
        observable$$1.isPendingUnobservation = true;
        globalState$$1.pendingUnobservations.push(observable$$1);
    }
}
/**
 * Batch starts a transaction, at least for purposes of memoizing ComputedValues when nothing else does.
 * During a batch `onBecomeUnobserved` will be called at most once per observable.
 * Avoids unnecessary recalculations.
 */
function startBatch$$1() {
    globalState$$1.inBatch++;
}
function endBatch$$1() {
    if (--globalState$$1.inBatch === 0) {
        runReactions$$1();
        // the batch is actually about to finish, all unobserving should happen here.
        var list = globalState$$1.pendingUnobservations;
        for (var i = 0; i < list.length; i++) {
            var observable$$1 = list[i];
            observable$$1.isPendingUnobservation = false;
            if (observable$$1.observers.size === 0) {
                if (observable$$1.isBeingObserved) {
                    // if this observable had reactive observers, trigger the hooks
                    observable$$1.isBeingObserved = false;
                    observable$$1.onBecomeUnobserved();
                }
                if (observable$$1 instanceof ComputedValue$$1) {
                    // computed values are automatically teared down when the last observer leaves
                    // this process happens recursively, this computed might be the last observabe of another, etc..
                    observable$$1.suspend();
                }
            }
        }
        globalState$$1.pendingUnobservations = [];
    }
}
function reportObserved$$1(observable$$1) {
    var derivation = globalState$$1.trackingDerivation;
    if (derivation !== null) {
        /**
         * Simple optimization, give each derivation run an unique id (runId)
         * Check if last time this observable was accessed the same runId is used
         * if this is the case, the relation is already known
         */
        if (derivation.runId !== observable$$1.lastAccessedBy) {
            observable$$1.lastAccessedBy = derivation.runId;
            // Tried storing newObserving, or observing, or both as Set, but performance didn't come close...
            derivation.newObserving[derivation.unboundDepsCount++] = observable$$1;
            if (!observable$$1.isBeingObserved) {
                observable$$1.isBeingObserved = true;
                observable$$1.onBecomeObserved();
            }
        }
        return true;
    }
    else if (observable$$1.observers.size === 0 && globalState$$1.inBatch > 0) {
        queueForUnobservation$$1(observable$$1);
    }
    return false;
}
// function invariantLOS(observable: IObservable, msg: string) {
//     // it's expensive so better not run it in produciton. but temporarily helpful for testing
//     const min = getObservers(observable).reduce((a, b) => Math.min(a, b.dependenciesState), 2)
//     if (min >= observable.lowestObserverState) return // <- the only assumption about `lowestObserverState`
//     throw new Error(
//         "lowestObserverState is wrong for " +
//             msg +
//             " because " +
//             min +
//             " < " +
//             observable.lowestObserverState
//     )
// }
/**
 * NOTE: current propagation mechanism will in case of self reruning autoruns behave unexpectedly
 * It will propagate changes to observers from previous run
 * It's hard or maybe impossible (with reasonable perf) to get it right with current approach
 * Hopefully self reruning autoruns aren't a feature people should depend on
 * Also most basic use cases should be ok
 */
// Called by Atom when its value changes
function propagateChanged$$1(observable$$1) {
    // invariantLOS(observable, "changed start");
    if (observable$$1.lowestObserverState === IDerivationState.STALE)
        return;
    observable$$1.lowestObserverState = IDerivationState.STALE;
    // Ideally we use for..of here, but the downcompiled version is really slow...
    observable$$1.observers.forEach(function (d) {
        if (d.dependenciesState === IDerivationState.UP_TO_DATE) {
            if (d.isTracing !== TraceMode$$1.NONE) {
                logTraceInfo(d, observable$$1);
            }
            d.onBecomeStale();
        }
        d.dependenciesState = IDerivationState.STALE;
    });
    // invariantLOS(observable, "changed end");
}
// Called by ComputedValue when it recalculate and its value changed
function propagateChangeConfirmed$$1(observable$$1) {
    // invariantLOS(observable, "confirmed start");
    if (observable$$1.lowestObserverState === IDerivationState.STALE)
        return;
    observable$$1.lowestObserverState = IDerivationState.STALE;
    observable$$1.observers.forEach(function (d) {
        if (d.dependenciesState === IDerivationState.POSSIBLY_STALE)
            d.dependenciesState = IDerivationState.STALE;
        else if (d.dependenciesState === IDerivationState.UP_TO_DATE // this happens during computing of `d`, just keep lowestObserverState up to date.
        )
            observable$$1.lowestObserverState = IDerivationState.UP_TO_DATE;
    });
    // invariantLOS(observable, "confirmed end");
}
// Used by computed when its dependency changed, but we don't wan't to immediately recompute.
function propagateMaybeChanged$$1(observable$$1) {
    // invariantLOS(observable, "maybe start");
    if (observable$$1.lowestObserverState !== IDerivationState.UP_TO_DATE)
        return;
    observable$$1.lowestObserverState = IDerivationState.POSSIBLY_STALE;
    observable$$1.observers.forEach(function (d) {
        if (d.dependenciesState === IDerivationState.UP_TO_DATE) {
            d.dependenciesState = IDerivationState.POSSIBLY_STALE;
            if (d.isTracing !== TraceMode$$1.NONE) {
                logTraceInfo(d, observable$$1);
            }
            d.onBecomeStale();
        }
    });
    // invariantLOS(observable, "maybe end");
}
function logTraceInfo(derivation, observable$$1) {
    console.log("[mobx.trace] '" + derivation.name + "' is invalidated due to a change in: '" + observable$$1.name + "'");
    if (derivation.isTracing === TraceMode$$1.BREAK) {
        var lines = [];
        printDepTree(getDependencyTree$$1(derivation), lines, 1);
        // prettier-ignore
        new Function("debugger;\n/*\nTracing '" + derivation.name + "'\n\nYou are entering this break point because derivation '" + derivation.name + "' is being traced and '" + observable$$1.name + "' is now forcing it to update.\nJust follow the stacktrace you should now see in the devtools to see precisely what piece of your code is causing this update\nThe stackframe you are looking for is at least ~6-8 stack-frames up.\n\n" + (derivation instanceof ComputedValue$$1 ? derivation.derivation.toString().replace(/[*]\//g, "/") : "") + "\n\nThe dependencies for this derivation are:\n\n" + lines.join("\n") + "\n*/\n    ")();
    }
}
function printDepTree(tree, lines, depth) {
    if (lines.length >= 1000) {
        lines.push("(and many more)");
        return;
    }
    lines.push("" + new Array(depth).join("\t") + tree.name); // MWE: not the fastest, but the easiest way :)
    if (tree.dependencies)
        tree.dependencies.forEach(function (child) { return printDepTree(child, lines, depth + 1); });
}

var Reaction$$1 = /** @class */ (function () {
    function Reaction$$1(name, onInvalidate, errorHandler) {
        if (name === void 0) { name = "Reaction@" + getNextId$$1(); }
        this.name = name;
        this.onInvalidate = onInvalidate;
        this.errorHandler = errorHandler;
        this.observing = []; // nodes we are looking at. Our value depends on these nodes
        this.newObserving = [];
        this.dependenciesState = IDerivationState.NOT_TRACKING;
        this.diffValue = 0;
        this.runId = 0;
        this.unboundDepsCount = 0;
        this.__mapid = "#" + getNextId$$1();
        this.isDisposed = false;
        this._isScheduled = false;
        this._isTrackPending = false;
        this._isRunning = false;
        this.isTracing = TraceMode$$1.NONE;
    }
    Reaction$$1.prototype.onBecomeStale = function () {
        this.schedule();
    };
    Reaction$$1.prototype.schedule = function () {
        if (!this._isScheduled) {
            this._isScheduled = true;
            globalState$$1.pendingReactions.push(this);
            runReactions$$1();
        }
    };
    Reaction$$1.prototype.isScheduled = function () {
        return this._isScheduled;
    };
    /**
     * internal, use schedule() if you intend to kick off a reaction
     */
    Reaction$$1.prototype.runReaction = function () {
        if (!this.isDisposed) {
            startBatch$$1();
            this._isScheduled = false;
            if (shouldCompute$$1(this)) {
                this._isTrackPending = true;
                try {
                    this.onInvalidate();
                    if (this._isTrackPending &&
                        isSpyEnabled$$1() &&
                        "development" !== "production") {
                        // onInvalidate didn't trigger track right away..
                        spyReport$$1({
                            name: this.name,
                            type: "scheduled-reaction"
                        });
                    }
                }
                catch (e) {
                    this.reportExceptionInDerivation(e);
                }
            }
            endBatch$$1();
        }
    };
    Reaction$$1.prototype.track = function (fn) {
        startBatch$$1();
        var notify = isSpyEnabled$$1();
        var startTime;
        if (notify && "development" !== "production") {
            startTime = Date.now();
            spyReportStart$$1({
                name: this.name,
                type: "reaction"
            });
        }
        this._isRunning = true;
        var result = trackDerivedFunction$$1(this, fn, undefined);
        this._isRunning = false;
        this._isTrackPending = false;
        if (this.isDisposed) {
            // disposed during last run. Clean up everything that was bound after the dispose call.
            clearObserving$$1(this);
        }
        if (isCaughtException$$1(result))
            this.reportExceptionInDerivation(result.cause);
        if (notify && "development" !== "production") {
            spyReportEnd$$1({
                time: Date.now() - startTime
            });
        }
        endBatch$$1();
    };
    Reaction$$1.prototype.reportExceptionInDerivation = function (error) {
        var _this = this;
        if (this.errorHandler) {
            this.errorHandler(error, this);
            return;
        }
        if (globalState$$1.disableErrorBoundaries)
            throw error;
        var message = "[mobx] Encountered an uncaught exception that was thrown by a reaction or observer component, in: '" + this + "'";
        if (globalState$$1.suppressReactionErrors) {
            console.warn("[mobx] (error in reaction '" + this.name + "' suppressed, fix error of causing action below)"); // prettier-ignore
        }
        else {
            console.error(message, error);
            /** If debugging brought you here, please, read the above message :-). Tnx! */
        }
        if (isSpyEnabled$$1()) {
            spyReport$$1({
                type: "error",
                name: this.name,
                message: message,
                error: "" + error
            });
        }
        globalState$$1.globalReactionErrorHandlers.forEach(function (f) { return f(error, _this); });
    };
    Reaction$$1.prototype.dispose = function () {
        if (!this.isDisposed) {
            this.isDisposed = true;
            if (!this._isRunning) {
                // if disposed while running, clean up later. Maybe not optimal, but rare case
                startBatch$$1();
                clearObserving$$1(this);
                endBatch$$1();
            }
        }
    };
    Reaction$$1.prototype.getDisposer = function () {
        var r = this.dispose.bind(this);
        r[$mobx$$1] = this;
        return r;
    };
    Reaction$$1.prototype.toString = function () {
        return "Reaction[" + this.name + "]";
    };
    Reaction$$1.prototype.trace = function (enterBreakPoint) {
        if (enterBreakPoint === void 0) { enterBreakPoint = false; }
        trace$$1(this, enterBreakPoint);
    };
    return Reaction$$1;
}());
function onReactionError$$1(handler) {
    globalState$$1.globalReactionErrorHandlers.push(handler);
    return function () {
        var idx = globalState$$1.globalReactionErrorHandlers.indexOf(handler);
        if (idx >= 0)
            globalState$$1.globalReactionErrorHandlers.splice(idx, 1);
    };
}
/**
 * Magic number alert!
 * Defines within how many times a reaction is allowed to re-trigger itself
 * until it is assumed that this is gonna be a never ending loop...
 */
var MAX_REACTION_ITERATIONS = 100;
var reactionScheduler = function (f) { return f(); };
function runReactions$$1() {
    // Trampolining, if runReactions are already running, new reactions will be picked up
    if (globalState$$1.inBatch > 0 || globalState$$1.isRunningReactions)
        return;
    reactionScheduler(runReactionsHelper);
}
function runReactionsHelper() {
    globalState$$1.isRunningReactions = true;
    var allReactions = globalState$$1.pendingReactions;
    var iterations = 0;
    // While running reactions, new reactions might be triggered.
    // Hence we work with two variables and check whether
    // we converge to no remaining reactions after a while.
    while (allReactions.length > 0) {
        if (++iterations === MAX_REACTION_ITERATIONS) {
            console.error("Reaction doesn't converge to a stable state after " + MAX_REACTION_ITERATIONS + " iterations." +
                (" Probably there is a cycle in the reactive function: " + allReactions[0]));
            allReactions.splice(0); // clear reactions
        }
        var remainingReactions = allReactions.splice(0);
        for (var i = 0, l = remainingReactions.length; i < l; i++)
            remainingReactions[i].runReaction();
    }
    globalState$$1.isRunningReactions = false;
}
var isReaction$$1 = createInstanceofPredicate$$1("Reaction", Reaction$$1);
function setReactionScheduler$$1(fn) {
    var baseScheduler = reactionScheduler;
    reactionScheduler = function (f) { return fn(function () { return baseScheduler(f); }); };
}

function isSpyEnabled$$1() {
    return  true && !!globalState$$1.spyListeners.length;
}
function spyReport$$1(event) {
    if (false)
        {} // dead code elimination can do the rest
    if (!globalState$$1.spyListeners.length)
        return;
    var listeners = globalState$$1.spyListeners;
    for (var i = 0, l = listeners.length; i < l; i++)
        listeners[i](event);
}
function spyReportStart$$1(event) {
    if (false)
        {}
    var change = __assign({}, event, { spyReportStart: true });
    spyReport$$1(change);
}
var END_EVENT = { spyReportEnd: true };
function spyReportEnd$$1(change) {
    if (false)
        {}
    if (change)
        spyReport$$1(__assign({}, change, { spyReportEnd: true }));
    else
        spyReport$$1(END_EVENT);
}
function spy$$1(listener) {
    if (false) {}
    else {
        globalState$$1.spyListeners.push(listener);
        return once$$1(function () {
            globalState$$1.spyListeners = globalState$$1.spyListeners.filter(function (l) { return l !== listener; });
        });
    }
}

function dontReassignFields() {
    fail$$1( true && "@action fields are not reassignable");
}
function namedActionDecorator$$1(name) {
    return function (target, prop, descriptor) {
        if (descriptor) {
            if ( true && descriptor.get !== undefined) {
                return fail$$1("@action cannot be used with getters");
            }
            // babel / typescript
            // @action method() { }
            if (descriptor.value) {
                // typescript
                return {
                    value: createAction$$1(name, descriptor.value),
                    enumerable: false,
                    configurable: true,
                    writable: true // for typescript, this must be writable, otherwise it cannot inherit :/ (see inheritable actions test)
                };
            }
            // babel only: @action method = () => {}
            var initializer_1 = descriptor.initializer;
            return {
                enumerable: false,
                configurable: true,
                writable: true,
                initializer: function () {
                    // N.B: we can't immediately invoke initializer; this would be wrong
                    return createAction$$1(name, initializer_1.call(this));
                }
            };
        }
        // bound instance methods
        return actionFieldDecorator$$1(name).apply(this, arguments);
    };
}
function actionFieldDecorator$$1(name) {
    // Simple property that writes on first invocation to the current instance
    return function (target, prop, descriptor) {
        Object.defineProperty(target, prop, {
            configurable: true,
            enumerable: false,
            get: function () {
                return undefined;
            },
            set: function (value) {
                addHiddenProp$$1(this, prop, action$$1(name, value));
            }
        });
    };
}
function boundActionDecorator$$1(target, propertyName, descriptor, applyToInstance) {
    if (applyToInstance === true) {
        defineBoundAction$$1(target, propertyName, descriptor.value);
        return null;
    }
    if (descriptor) {
        // if (descriptor.value)
        // Typescript / Babel: @action.bound method() { }
        // also: babel @action.bound method = () => {}
        return {
            configurable: true,
            enumerable: false,
            get: function () {
                defineBoundAction$$1(this, propertyName, descriptor.value || descriptor.initializer.call(this));
                return this[propertyName];
            },
            set: dontReassignFields
        };
    }
    // field decorator Typescript @action.bound method = () => {}
    return {
        enumerable: false,
        configurable: true,
        set: function (v) {
            defineBoundAction$$1(this, propertyName, v);
        },
        get: function () {
            return undefined;
        }
    };
}

var action$$1 = function action$$1(arg1, arg2, arg3, arg4) {
    // action(fn() {})
    if (arguments.length === 1 && typeof arg1 === "function")
        return createAction$$1(arg1.name || "<unnamed action>", arg1);
    // action("name", fn() {})
    if (arguments.length === 2 && typeof arg2 === "function")
        return createAction$$1(arg1, arg2);
    // @action("name") fn() {}
    if (arguments.length === 1 && typeof arg1 === "string")
        return namedActionDecorator$$1(arg1);
    // @action fn() {}
    if (arg4 === true) {
        // apply to instance immediately
        addHiddenProp$$1(arg1, arg2, createAction$$1(arg1.name || arg2, arg3.value));
    }
    else {
        return namedActionDecorator$$1(arg2).apply(null, arguments);
    }
};
action$$1.bound = boundActionDecorator$$1;
function runInAction$$1(arg1, arg2) {
    var actionName = typeof arg1 === "string" ? arg1 : arg1.name || "<unnamed action>";
    var fn = typeof arg1 === "function" ? arg1 : arg2;
    if (true) {
        invariant$$1(typeof fn === "function" && fn.length === 0, "`runInAction` expects a function without arguments");
        if (typeof actionName !== "string" || !actionName)
            fail$$1("actions should have valid names, got: '" + actionName + "'");
    }
    return executeAction$$1(actionName, fn, this, undefined);
}
function isAction$$1(thing) {
    return typeof thing === "function" && thing.isMobxAction === true;
}
function defineBoundAction$$1(target, propertyName, fn) {
    addHiddenProp$$1(target, propertyName, createAction$$1(propertyName, fn.bind(target)));
}

/**
 * Creates a named reactive view and keeps it alive, so that the view is always
 * updated if one of the dependencies changes, even when the view is not further used by something else.
 * @param view The reactive view
 * @returns disposer function, which can be used to stop the view from being updated in the future.
 */
function autorun$$1(view, opts) {
    if (opts === void 0) { opts = EMPTY_OBJECT$$1; }
    if (true) {
        invariant$$1(typeof view === "function", "Autorun expects a function as first argument");
        invariant$$1(isAction$$1(view) === false, "Autorun does not accept actions since actions are untrackable");
    }
    var name = (opts && opts.name) || view.name || "Autorun@" + getNextId$$1();
    var runSync = !opts.scheduler && !opts.delay;
    var reaction$$1;
    if (runSync) {
        // normal autorun
        reaction$$1 = new Reaction$$1(name, function () {
            this.track(reactionRunner);
        }, opts.onError);
    }
    else {
        var scheduler_1 = createSchedulerFromOptions(opts);
        // debounced autorun
        var isScheduled_1 = false;
        reaction$$1 = new Reaction$$1(name, function () {
            if (!isScheduled_1) {
                isScheduled_1 = true;
                scheduler_1(function () {
                    isScheduled_1 = false;
                    if (!reaction$$1.isDisposed)
                        reaction$$1.track(reactionRunner);
                });
            }
        }, opts.onError);
    }
    function reactionRunner() {
        view(reaction$$1);
    }
    reaction$$1.schedule();
    return reaction$$1.getDisposer();
}
var run = function (f) { return f(); };
function createSchedulerFromOptions(opts) {
    return opts.scheduler
        ? opts.scheduler
        : opts.delay
            ? function (f) { return setTimeout(f, opts.delay); }
            : run;
}
function reaction$$1(expression, effect, opts) {
    if (opts === void 0) { opts = EMPTY_OBJECT$$1; }
    if (true) {
        invariant$$1(typeof expression === "function", "First argument to reaction should be a function");
        invariant$$1(typeof opts === "object", "Third argument of reactions should be an object");
    }
    var name = opts.name || "Reaction@" + getNextId$$1();
    var effectAction = action$$1(name, opts.onError ? wrapErrorHandler(opts.onError, effect) : effect);
    var runSync = !opts.scheduler && !opts.delay;
    var scheduler = createSchedulerFromOptions(opts);
    var firstTime = true;
    var isScheduled = false;
    var value;
    var equals = opts.compareStructural
        ? comparer$$1.structural
        : opts.equals || comparer$$1.default;
    var r = new Reaction$$1(name, function () {
        if (firstTime || runSync) {
            reactionRunner();
        }
        else if (!isScheduled) {
            isScheduled = true;
            scheduler(reactionRunner);
        }
    }, opts.onError);
    function reactionRunner() {
        isScheduled = false; // Q: move into reaction runner?
        if (r.isDisposed)
            return;
        var changed = false;
        r.track(function () {
            var nextValue = expression(r);
            changed = firstTime || !equals(value, nextValue);
            value = nextValue;
        });
        if (firstTime && opts.fireImmediately)
            effectAction(value, r);
        if (!firstTime && changed === true)
            effectAction(value, r);
        if (firstTime)
            firstTime = false;
    }
    r.schedule();
    return r.getDisposer();
}
function wrapErrorHandler(errorHandler, baseFn) {
    return function () {
        try {
            return baseFn.apply(this, arguments);
        }
        catch (e) {
            errorHandler.call(this, e);
        }
    };
}

function onBecomeObserved$$1(thing, arg2, arg3) {
    return interceptHook("onBecomeObserved", thing, arg2, arg3);
}
function onBecomeUnobserved$$1(thing, arg2, arg3) {
    return interceptHook("onBecomeUnobserved", thing, arg2, arg3);
}
function interceptHook(hook, thing, arg2, arg3) {
    var atom = typeof arg2 === "string" ? getAtom$$1(thing, arg2) : getAtom$$1(thing);
    var cb = typeof arg2 === "string" ? arg3 : arg2;
    var listenersKey = hook + "Listeners";
    if (atom[listenersKey]) {
        atom[listenersKey].add(cb);
    }
    else {
        atom[listenersKey] = new Set([cb]);
    }
    var orig = atom[hook];
    if (typeof orig !== "function")
        return fail$$1( true && "Not an atom that can be (un)observed");
    return function () {
        var hookListeners = atom[listenersKey];
        if (hookListeners) {
            hookListeners.delete(cb);
            if (hookListeners.size === 0) {
                delete atom[listenersKey];
            }
        }
    };
}

function configure$$1(options) {
    var enforceActions = options.enforceActions, computedRequiresReaction = options.computedRequiresReaction, disableErrorBoundaries = options.disableErrorBoundaries, reactionScheduler = options.reactionScheduler;
    if (options.isolateGlobalState === true) {
        isolateGlobalState$$1();
    }
    if (enforceActions !== undefined) {
        if (typeof enforceActions === "boolean" || enforceActions === "strict")
            deprecated$$1("Deprecated value for 'enforceActions', use 'false' => '\"never\"', 'true' => '\"observed\"', '\"strict\"' => \"'always'\" instead");
        var ea = void 0;
        switch (enforceActions) {
            case true:
            case "observed":
                ea = true;
                break;
            case false:
            case "never":
                ea = false;
                break;
            case "strict":
            case "always":
                ea = "strict";
                break;
            default:
                fail$$1("Invalid value for 'enforceActions': '" + enforceActions + "', expected 'never', 'always' or 'observed'");
        }
        globalState$$1.enforceActions = ea;
        globalState$$1.allowStateChanges = ea === true || ea === "strict" ? false : true;
    }
    if (computedRequiresReaction !== undefined) {
        globalState$$1.computedRequiresReaction = !!computedRequiresReaction;
    }
    if (disableErrorBoundaries !== undefined) {
        if (disableErrorBoundaries === true)
            console.warn("WARNING: Debug feature only. MobX will NOT recover from errors when `disableErrorBoundaries` is enabled.");
        globalState$$1.disableErrorBoundaries = !!disableErrorBoundaries;
    }
    if (reactionScheduler) {
        setReactionScheduler$$1(reactionScheduler);
    }
}

function decorate$$1(thing, decorators) {
     true &&
        invariant$$1(isPlainObject$$1(decorators), "Decorators should be a key value map");
    var target = typeof thing === "function" ? thing.prototype : thing;
    var _loop_1 = function (prop) {
        var propertyDecorators = decorators[prop];
        if (!Array.isArray(propertyDecorators)) {
            propertyDecorators = [propertyDecorators];
        }
         true &&
            invariant$$1(propertyDecorators.every(function (decorator) { return typeof decorator === "function"; }), "Decorate: expected a decorator function or array of decorator functions for '" + prop + "'");
        var descriptor = Object.getOwnPropertyDescriptor(target, prop);
        var newDescriptor = propertyDecorators.reduce(function (accDescriptor, decorator) { return decorator(target, prop, accDescriptor); }, descriptor);
        if (newDescriptor)
            Object.defineProperty(target, prop, newDescriptor);
    };
    for (var prop in decorators) {
        _loop_1(prop);
    }
    return thing;
}

function extendObservable$$1(target, properties, decorators, options) {
    if (true) {
        invariant$$1(arguments.length >= 2 && arguments.length <= 4, "'extendObservable' expected 2-4 arguments");
        invariant$$1(typeof target === "object", "'extendObservable' expects an object as first argument");
        invariant$$1(!isObservableMap$$1(target), "'extendObservable' should not be used on maps, use map.merge instead");
    }
    options = asCreateObservableOptions$$1(options);
    var defaultDecorator = getDefaultDecoratorFromObjectOptions$$1(options);
    initializeInstance$$1(target); // Fixes #1740
    asObservableObject$$1(target, options.name, defaultDecorator.enhancer); // make sure object is observable, even without initial props
    if (properties)
        extendObservableObjectWithProperties$$1(target, properties, decorators, defaultDecorator);
    return target;
}
function getDefaultDecoratorFromObjectOptions$$1(options) {
    return options.defaultDecorator || (options.deep === false ? refDecorator$$1 : deepDecorator$$1);
}
function extendObservableObjectWithProperties$$1(target, properties, decorators, defaultDecorator) {
    if (true) {
        invariant$$1(!isObservable$$1(properties), "Extending an object with another observable (object) is not supported. Please construct an explicit propertymap, using `toJS` if need. See issue #540");
        if (decorators)
            for (var key in decorators)
                if (!(key in properties))
                    fail$$1("Trying to declare a decorator for unspecified property '" + key + "'");
    }
    startBatch$$1();
    try {
        for (var key in properties) {
            var descriptor = Object.getOwnPropertyDescriptor(properties, key);
            if (true) {
                if (Object.getOwnPropertyDescriptor(target, key))
                    fail$$1("'extendObservable' can only be used to introduce new properties. Use 'set' or 'decorate' instead. The property '" + key + "' already exists on '" + target + "'");
                if (isComputed$$1(descriptor.value))
                    fail$$1("Passing a 'computed' as initial property value is no longer supported by extendObservable. Use a getter or decorator instead");
            }
            var decorator = decorators && key in decorators
                ? decorators[key]
                : descriptor.get
                    ? computedDecorator$$1
                    : defaultDecorator;
            if ( true && typeof decorator !== "function")
                fail$$1("Not a valid decorator for '" + key + "', got: " + decorator);
            var resultDescriptor = decorator(target, key, descriptor, true);
            if (resultDescriptor // otherwise, assume already applied, due to `applyToInstance`
            )
                Object.defineProperty(target, key, resultDescriptor);
        }
    }
    finally {
        endBatch$$1();
    }
}

function getDependencyTree$$1(thing, property) {
    return nodeToDependencyTree(getAtom$$1(thing, property));
}
function nodeToDependencyTree(node) {
    var result = {
        name: node.name
    };
    if (node.observing && node.observing.length > 0)
        result.dependencies = unique$$1(node.observing).map(nodeToDependencyTree);
    return result;
}
function getObserverTree$$1(thing, property) {
    return nodeToObserverTree(getAtom$$1(thing, property));
}
function nodeToObserverTree(node) {
    var result = {
        name: node.name
    };
    if (hasObservers$$1(node))
        result.observers = Array.from(getObservers$$1(node)).map(nodeToObserverTree);
    return result;
}

var generatorId = 0;
function flow$$1(generator) {
    if (arguments.length !== 1)
        fail$$1( true && "Flow expects one 1 argument and cannot be used as decorator");
    var name = generator.name || "<unnamed flow>";
    // Implementation based on https://github.com/tj/co/blob/master/index.js
    return function () {
        var ctx = this;
        var args = arguments;
        var runId = ++generatorId;
        var gen = action$$1(name + " - runid: " + runId + " - init", generator).apply(ctx, args);
        var rejector;
        var pendingPromise = undefined;
        var promise = new Promise(function (resolve, reject) {
            var stepId = 0;
            rejector = reject;
            function onFulfilled(res) {
                pendingPromise = undefined;
                var ret;
                try {
                    ret = action$$1(name + " - runid: " + runId + " - yield " + stepId++, gen.next).call(gen, res);
                }
                catch (e) {
                    return reject(e);
                }
                next(ret);
            }
            function onRejected(err) {
                pendingPromise = undefined;
                var ret;
                try {
                    ret = action$$1(name + " - runid: " + runId + " - yield " + stepId++, gen.throw).call(gen, err);
                }
                catch (e) {
                    return reject(e);
                }
                next(ret);
            }
            function next(ret) {
                if (ret && typeof ret.then === "function") {
                    // an async iterator
                    ret.then(next, reject);
                    return;
                }
                if (ret.done)
                    return resolve(ret.value);
                pendingPromise = Promise.resolve(ret.value);
                return pendingPromise.then(onFulfilled, onRejected);
            }
            onFulfilled(undefined); // kick off the process
        });
        promise.cancel = action$$1(name + " - runid: " + runId + " - cancel", function () {
            try {
                if (pendingPromise)
                    cancelPromise(pendingPromise);
                // Finally block can return (or yield) stuff..
                var res = gen.return();
                // eat anything that promise would do, it's cancelled!
                var yieldedPromise = Promise.resolve(res.value);
                yieldedPromise.then(noop$$1, noop$$1);
                cancelPromise(yieldedPromise); // maybe it can be cancelled :)
                // reject our original promise
                rejector(new Error("FLOW_CANCELLED"));
            }
            catch (e) {
                rejector(e); // there could be a throwing finally block
            }
        });
        return promise;
    };
}
function cancelPromise(promise) {
    if (typeof promise.cancel === "function")
        promise.cancel();
}

function interceptReads$$1(thing, propOrHandler, handler) {
    var target;
    if (isObservableMap$$1(thing) || isObservableArray$$1(thing) || isObservableValue$$1(thing)) {
        target = getAdministration$$1(thing);
    }
    else if (isObservableObject$$1(thing)) {
        if (typeof propOrHandler !== "string")
            return fail$$1( true &&
                "InterceptReads can only be used with a specific property, not with an object in general");
        target = getAdministration$$1(thing, propOrHandler);
    }
    else {
        return fail$$1( true &&
            "Expected observable map, object or array as first array");
    }
    if (target.dehancer !== undefined)
        return fail$$1( true && "An intercept reader was already established");
    target.dehancer = typeof propOrHandler === "function" ? propOrHandler : handler;
    return function () {
        target.dehancer = undefined;
    };
}

function intercept$$1(thing, propOrHandler, handler) {
    if (typeof handler === "function")
        return interceptProperty(thing, propOrHandler, handler);
    else
        return interceptInterceptable(thing, propOrHandler);
}
function interceptInterceptable(thing, handler) {
    return getAdministration$$1(thing).intercept(handler);
}
function interceptProperty(thing, property, handler) {
    return getAdministration$$1(thing, property).intercept(handler);
}

function _isComputed$$1(value, property) {
    if (value === null || value === undefined)
        return false;
    if (property !== undefined) {
        if (isObservableObject$$1(value) === false)
            return false;
        if (!value[$mobx$$1].values.has(property))
            return false;
        var atom = getAtom$$1(value, property);
        return isComputedValue$$1(atom);
    }
    return isComputedValue$$1(value);
}
function isComputed$$1(value) {
    if (arguments.length > 1)
        return fail$$1( true &&
            "isComputed expects only 1 argument. Use isObservableProp to inspect the observability of a property");
    return _isComputed$$1(value);
}
function isComputedProp$$1(value, propName) {
    if (typeof propName !== "string")
        return fail$$1( true &&
            "isComputed expected a property name as second argument");
    return _isComputed$$1(value, propName);
}

function _isObservable(value, property) {
    if (value === null || value === undefined)
        return false;
    if (property !== undefined) {
        if ( true &&
            (isObservableMap$$1(value) || isObservableArray$$1(value)))
            return fail$$1("isObservable(object, propertyName) is not supported for arrays and maps. Use map.has or array.length instead.");
        if (isObservableObject$$1(value)) {
            return value[$mobx$$1].values.has(property);
        }
        return false;
    }
    // For first check, see #701
    return (isObservableObject$$1(value) ||
        !!value[$mobx$$1] ||
        isAtom$$1(value) ||
        isReaction$$1(value) ||
        isComputedValue$$1(value));
}
function isObservable$$1(value) {
    if (arguments.length !== 1)
        fail$$1( true &&
            "isObservable expects only 1 argument. Use isObservableProp to inspect the observability of a property");
    return _isObservable(value);
}
function isObservableProp$$1(value, propName) {
    if (typeof propName !== "string")
        return fail$$1( true && "expected a property name as second argument");
    return _isObservable(value, propName);
}

function keys$$1(obj) {
    if (isObservableObject$$1(obj)) {
        return obj[$mobx$$1].getKeys();
    }
    if (isObservableMap$$1(obj)) {
        return Array.from(obj.keys());
    }
    if (isObservableSet$$1(obj)) {
        return Array.from(obj.keys());
    }
    if (isObservableArray$$1(obj)) {
        return obj.map(function (_, index) { return index; });
    }
    return fail$$1( true &&
        "'keys()' can only be used on observable objects, arrays, sets and maps");
}
function values$$1(obj) {
    if (isObservableObject$$1(obj)) {
        return keys$$1(obj).map(function (key) { return obj[key]; });
    }
    if (isObservableMap$$1(obj)) {
        return keys$$1(obj).map(function (key) { return obj.get(key); });
    }
    if (isObservableSet$$1(obj)) {
        return Array.from(obj.values());
    }
    if (isObservableArray$$1(obj)) {
        return obj.slice();
    }
    return fail$$1( true &&
        "'values()' can only be used on observable objects, arrays, sets and maps");
}
function entries$$1(obj) {
    if (isObservableObject$$1(obj)) {
        return keys$$1(obj).map(function (key) { return [key, obj[key]]; });
    }
    if (isObservableMap$$1(obj)) {
        return keys$$1(obj).map(function (key) { return [key, obj.get(key)]; });
    }
    if (isObservableSet$$1(obj)) {
        return Array.from(obj.entries());
    }
    if (isObservableArray$$1(obj)) {
        return obj.map(function (key, index) { return [index, key]; });
    }
    return fail$$1( true &&
        "'entries()' can only be used on observable objects, arrays and maps");
}
function set$$1(obj, key, value) {
    if (arguments.length === 2) {
        startBatch$$1();
        var values_1 = key;
        try {
            for (var key_1 in values_1)
                set$$1(obj, key_1, values_1[key_1]);
        }
        finally {
            endBatch$$1();
        }
        return;
    }
    if (isObservableObject$$1(obj)) {
        var adm = obj[$mobx$$1];
        var existingObservable = adm.values.get(key);
        if (existingObservable) {
            adm.write(key, value);
        }
        else {
            adm.addObservableProp(key, value, adm.defaultEnhancer);
        }
    }
    else if (isObservableMap$$1(obj)) {
        obj.set(key, value);
    }
    else if (isObservableArray$$1(obj)) {
        if (typeof key !== "number")
            key = parseInt(key, 10);
        invariant$$1(key >= 0, "Not a valid index: '" + key + "'");
        startBatch$$1();
        if (key >= obj.length)
            obj.length = key + 1;
        obj[key] = value;
        endBatch$$1();
    }
    else {
        return fail$$1( true &&
            "'set()' can only be used on observable objects, arrays and maps");
    }
}
function remove$$1(obj, key) {
    if (isObservableObject$$1(obj)) {
        
        obj[$mobx$$1].remove(key);
    }
    else if (isObservableMap$$1(obj)) {
        obj.delete(key);
    }
    else if (isObservableSet$$1(obj)) {
        obj.delete(key);
    }
    else if (isObservableArray$$1(obj)) {
        if (typeof key !== "number")
            key = parseInt(key, 10);
        invariant$$1(key >= 0, "Not a valid index: '" + key + "'");
        obj.splice(key, 1);
    }
    else {
        return fail$$1( true &&
            "'remove()' can only be used on observable objects, arrays and maps");
    }
}
function has$$1(obj, key) {
    if (isObservableObject$$1(obj)) {
        // return keys(obj).indexOf(key) >= 0
        var adm = getAdministration$$1(obj);
        return adm.has(key);
    }
    else if (isObservableMap$$1(obj)) {
        return obj.has(key);
    }
    else if (isObservableSet$$1(obj)) {
        return obj.has(key);
    }
    else if (isObservableArray$$1(obj)) {
        return key >= 0 && key < obj.length;
    }
    else {
        return fail$$1( true &&
            "'has()' can only be used on observable objects, arrays and maps");
    }
}
function get$$1(obj, key) {
    if (!has$$1(obj, key))
        return undefined;
    if (isObservableObject$$1(obj)) {
        return obj[key];
    }
    else if (isObservableMap$$1(obj)) {
        return obj.get(key);
    }
    else if (isObservableArray$$1(obj)) {
        return obj[key];
    }
    else {
        return fail$$1( true &&
            "'get()' can only be used on observable objects, arrays and maps");
    }
}

function observe$$1(thing, propOrCb, cbOrFire, fireImmediately) {
    if (typeof cbOrFire === "function")
        return observeObservableProperty(thing, propOrCb, cbOrFire, fireImmediately);
    else
        return observeObservable(thing, propOrCb, cbOrFire);
}
function observeObservable(thing, listener, fireImmediately) {
    return getAdministration$$1(thing).observe(listener, fireImmediately);
}
function observeObservableProperty(thing, property, listener, fireImmediately) {
    return getAdministration$$1(thing, property).observe(listener, fireImmediately);
}

var defaultOptions = {
    detectCycles: true,
    exportMapsAsObjects: true,
    recurseEverything: false
};
function cache(map, key, value, options) {
    if (options.detectCycles)
        map.set(key, value);
    return value;
}
function toJSHelper(source, options, __alreadySeen) {
    if (!options.recurseEverything && !isObservable$$1(source))
        return source;
    if (typeof source !== "object")
        return source;
    // Directly return null if source is null
    if (source === null)
        return null;
    // Directly return the Date object itself if contained in the observable
    if (source instanceof Date)
        return source;
    if (isObservableValue$$1(source))
        return toJSHelper(source.get(), options, __alreadySeen);
    // make sure we track the keys of the object
    if (isObservable$$1(source))
        keys$$1(source);
    var detectCycles = options.detectCycles === true;
    if (detectCycles && source !== null && __alreadySeen.has(source)) {
        return __alreadySeen.get(source);
    }
    if (isObservableArray$$1(source) || Array.isArray(source)) {
        var res_1 = cache(__alreadySeen, source, [], options);
        var toAdd = source.map(function (value) { return toJSHelper(value, options, __alreadySeen); });
        res_1.length = toAdd.length;
        for (var i = 0, l = toAdd.length; i < l; i++)
            res_1[i] = toAdd[i];
        return res_1;
    }
    if (isObservableSet$$1(source) || Object.getPrototypeOf(source) === Set.prototype) {
        if (options.exportMapsAsObjects === false) {
            var res_2 = cache(__alreadySeen, source, new Set(), options);
            source.forEach(function (value) {
                res_2.add(toJSHelper(value, options, __alreadySeen));
            });
            return res_2;
        }
        else {
            var res_3 = cache(__alreadySeen, source, [], options);
            source.forEach(function (value) {
                res_3.push(toJSHelper(value, options, __alreadySeen));
            });
            return res_3;
        }
    }
    if (isObservableMap$$1(source) || Object.getPrototypeOf(source) === Map.prototype) {
        if (options.exportMapsAsObjects === false) {
            var res_4 = cache(__alreadySeen, source, new Map(), options);
            source.forEach(function (value, key) {
                res_4.set(key, toJSHelper(value, options, __alreadySeen));
            });
            return res_4;
        }
        else {
            var res_5 = cache(__alreadySeen, source, {}, options);
            source.forEach(function (value, key) {
                res_5[key] = toJSHelper(value, options, __alreadySeen);
            });
            return res_5;
        }
    }
    // Fallback to the situation that source is an ObservableObject or a plain object
    var res = cache(__alreadySeen, source, {}, options);
    for (var key in source) {
        res[key] = toJSHelper(source[key], options, __alreadySeen);
    }
    return res;
}
function toJS$$1(source, options) {
    // backward compatibility
    if (typeof options === "boolean")
        options = { detectCycles: options };
    if (!options)
        options = defaultOptions;
    options.detectCycles =
        options.detectCycles === undefined
            ? options.recurseEverything === true
            : options.detectCycles === true;
    var __alreadySeen;
    if (options.detectCycles)
        __alreadySeen = new Map();
    return toJSHelper(source, options, __alreadySeen);
}

function trace$$1() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var enterBreakPoint = false;
    if (typeof args[args.length - 1] === "boolean")
        enterBreakPoint = args.pop();
    var derivation = getAtomFromArgs(args);
    if (!derivation) {
        return fail$$1( true &&
            "'trace(break?)' can only be used inside a tracked computed value or a Reaction. Consider passing in the computed value or reaction explicitly");
    }
    if (derivation.isTracing === TraceMode$$1.NONE) {
        console.log("[mobx.trace] '" + derivation.name + "' tracing enabled");
    }
    derivation.isTracing = enterBreakPoint ? TraceMode$$1.BREAK : TraceMode$$1.LOG;
}
function getAtomFromArgs(args) {
    switch (args.length) {
        case 0:
            return globalState$$1.trackingDerivation;
        case 1:
            return getAtom$$1(args[0]);
        case 2:
            return getAtom$$1(args[0], args[1]);
    }
}

/**
 * During a transaction no views are updated until the end of the transaction.
 * The transaction will be run synchronously nonetheless.
 *
 * @param action a function that updates some reactive state
 * @returns any value that was returned by the 'action' parameter.
 */
function transaction$$1(action$$1, thisArg) {
    if (thisArg === void 0) { thisArg = undefined; }
    startBatch$$1();
    try {
        return action$$1.apply(thisArg);
    }
    finally {
        endBatch$$1();
    }
}

function when$$1(predicate, arg1, arg2) {
    if (arguments.length === 1 || (arg1 && typeof arg1 === "object"))
        return whenPromise(predicate, arg1);
    return _when(predicate, arg1, arg2 || {});
}
function _when(predicate, effect, opts) {
    var timeoutHandle;
    if (typeof opts.timeout === "number") {
        timeoutHandle = setTimeout(function () {
            if (!disposer[$mobx$$1].isDisposed) {
                disposer();
                var error = new Error("WHEN_TIMEOUT");
                if (opts.onError)
                    opts.onError(error);
                else
                    throw error;
            }
        }, opts.timeout);
    }
    opts.name = opts.name || "When@" + getNextId$$1();
    var effectAction = createAction$$1(opts.name + "-effect", effect);
    var disposer = autorun$$1(function (r) {
        if (predicate()) {
            r.dispose();
            if (timeoutHandle)
                clearTimeout(timeoutHandle);
            effectAction();
        }
    }, opts);
    return disposer;
}
function whenPromise(predicate, opts) {
    if ( true && opts && opts.onError)
        return fail$$1("the options 'onError' and 'promise' cannot be combined");
    var cancel;
    var res = new Promise(function (resolve, reject) {
        var disposer = _when(predicate, resolve, __assign({}, opts, { onError: reject }));
        cancel = function () {
            disposer();
            reject("WHEN_CANCELLED");
        };
    });
    res.cancel = cancel;
    return res;
}

function getAdm(target) {
    return target[$mobx$$1];
}
// Optimization: we don't need the intermediate objects and could have a completely custom administration for DynamicObjects,
// and skip either the internal values map, or the base object with its property descriptors!
var objectProxyTraps = {
    has: function (target, name) {
        if (name === $mobx$$1 || name === "constructor" || name === mobxDidRunLazyInitializersSymbol$$1)
            return true;
        var adm = getAdm(target);
        // MWE: should `in` operator be reactive? If not, below code path will be faster / more memory efficient
        // TODO: check performance stats!
        // if (adm.values.get(name as string)) return true
        if (typeof name === "string")
            return adm.has(name);
        return name in target;
    },
    get: function (target, name) {
        if (name === $mobx$$1 || name === "constructor" || name === mobxDidRunLazyInitializersSymbol$$1)
            return target[name];
        var adm = getAdm(target);
        var observable$$1 = adm.values.get(name);
        if (observable$$1 instanceof Atom$$1) {
            var result = observable$$1.get();
            if (result === undefined) {
                // This fixes #1796, because deleting a prop that has an
                // undefined value won't retrigger a observer (no visible effect),
                // the autorun wouldn't subscribe to future key changes (see also next comment)
                adm.has(name);
            }
            return result;
        }
        // make sure we start listening to future keys
        // note that we only do this here for optimization
        if (typeof name === "string")
            adm.has(name);
        return target[name];
    },
    set: function (target, name, value) {
        if (typeof name !== "string")
            return false;
        set$$1(target, name, value);
        return true;
    },
    deleteProperty: function (target, name) {
        if (typeof name !== "string")
            return false;
        var adm = getAdm(target);
        adm.remove(name);
        return true;
    },
    ownKeys: function (target) {
        var adm = getAdm(target);
        adm.keysAtom.reportObserved();
        return Reflect.ownKeys(target);
    },
    preventExtensions: function (target) {
        fail$$1("Dynamic observable objects cannot be frozen");
        return false;
    }
};
function createDynamicObservableObject$$1(base) {
    var proxy = new Proxy(base, objectProxyTraps);
    base[$mobx$$1].proxy = proxy;
    return proxy;
}

function hasInterceptors$$1(interceptable) {
    return interceptable.interceptors !== undefined && interceptable.interceptors.length > 0;
}
function registerInterceptor$$1(interceptable, handler) {
    var interceptors = interceptable.interceptors || (interceptable.interceptors = []);
    interceptors.push(handler);
    return once$$1(function () {
        var idx = interceptors.indexOf(handler);
        if (idx !== -1)
            interceptors.splice(idx, 1);
    });
}
function interceptChange$$1(interceptable, change) {
    var prevU = untrackedStart$$1();
    try {
        var interceptors = interceptable.interceptors;
        if (interceptors)
            for (var i = 0, l = interceptors.length; i < l; i++) {
                change = interceptors[i](change);
                invariant$$1(!change || change.type, "Intercept handlers should return nothing or a change object");
                if (!change)
                    break;
            }
        return change;
    }
    finally {
        untrackedEnd$$1(prevU);
    }
}

function hasListeners$$1(listenable) {
    return listenable.changeListeners !== undefined && listenable.changeListeners.length > 0;
}
function registerListener$$1(listenable, handler) {
    var listeners = listenable.changeListeners || (listenable.changeListeners = []);
    listeners.push(handler);
    return once$$1(function () {
        var idx = listeners.indexOf(handler);
        if (idx !== -1)
            listeners.splice(idx, 1);
    });
}
function notifyListeners$$1(listenable, change) {
    var prevU = untrackedStart$$1();
    var listeners = listenable.changeListeners;
    if (!listeners)
        return;
    listeners = listeners.slice();
    for (var i = 0, l = listeners.length; i < l; i++) {
        listeners[i](change);
    }
    untrackedEnd$$1(prevU);
}

var MAX_SPLICE_SIZE = 10000; // See e.g. https://github.com/mobxjs/mobx/issues/859
var arrayTraps = {
    get: function (target, name) {
        if (name === $mobx$$1)
            return target[$mobx$$1];
        if (name === "length")
            return target[$mobx$$1].getArrayLength();
        if (typeof name === "number") {
            return arrayExtensions.get.call(target, name);
        }
        if (typeof name === "string" && !isNaN(name)) {
            return arrayExtensions.get.call(target, parseInt(name));
        }
        if (arrayExtensions.hasOwnProperty(name)) {
            return arrayExtensions[name];
        }
        return target[name];
    },
    set: function (target, name, value) {
        if (name === "length") {
            target[$mobx$$1].setArrayLength(value);
            return true;
        }
        if (typeof name === "number") {
            arrayExtensions.set.call(target, name, value);
            return true;
        }
        if (!isNaN(name)) {
            arrayExtensions.set.call(target, parseInt(name), value);
            return true;
        }
        return false;
    },
    preventExtensions: function (target) {
        fail$$1("Observable arrays cannot be frozen");
        return false;
    }
};
function createObservableArray$$1(initialValues, enhancer, name, owned) {
    if (name === void 0) { name = "ObservableArray@" + getNextId$$1(); }
    if (owned === void 0) { owned = false; }
    var adm = new ObservableArrayAdministration(name, enhancer, owned);
    addHiddenFinalProp$$1(adm.values, $mobx$$1, adm);
    var proxy = new Proxy(adm.values, arrayTraps);
    adm.proxy = proxy;
    if (initialValues && initialValues.length) {
        var prev = allowStateChangesStart$$1(true);
        adm.spliceWithArray(0, 0, initialValues);
        allowStateChangesEnd$$1(prev);
    }
    return proxy;
}
var ObservableArrayAdministration = /** @class */ (function () {
    function ObservableArrayAdministration(name, enhancer, owned) {
        this.owned = owned;
        this.values = [];
        this.proxy = undefined;
        this.lastKnownLength = 0;
        this.atom = new Atom$$1(name || "ObservableArray@" + getNextId$$1());
        this.enhancer = function (newV, oldV) { return enhancer(newV, oldV, name + "[..]"); };
    }
    ObservableArrayAdministration.prototype.dehanceValue = function (value) {
        if (this.dehancer !== undefined)
            return this.dehancer(value);
        return value;
    };
    ObservableArrayAdministration.prototype.dehanceValues = function (values$$1) {
        if (this.dehancer !== undefined && values$$1.length > 0)
            return values$$1.map(this.dehancer);
        return values$$1;
    };
    ObservableArrayAdministration.prototype.intercept = function (handler) {
        return registerInterceptor$$1(this, handler);
    };
    ObservableArrayAdministration.prototype.observe = function (listener, fireImmediately) {
        if (fireImmediately === void 0) { fireImmediately = false; }
        if (fireImmediately) {
            listener({
                object: this.proxy,
                type: "splice",
                index: 0,
                added: this.values.slice(),
                addedCount: this.values.length,
                removed: [],
                removedCount: 0
            });
        }
        return registerListener$$1(this, listener);
    };
    ObservableArrayAdministration.prototype.getArrayLength = function () {
        this.atom.reportObserved();
        return this.values.length;
    };
    ObservableArrayAdministration.prototype.setArrayLength = function (newLength) {
        if (typeof newLength !== "number" || newLength < 0)
            throw new Error("[mobx.array] Out of range: " + newLength);
        var currentLength = this.values.length;
        if (newLength === currentLength)
            return;
        else if (newLength > currentLength) {
            var newItems = new Array(newLength - currentLength);
            for (var i = 0; i < newLength - currentLength; i++)
                newItems[i] = undefined; // No Array.fill everywhere...
            this.spliceWithArray(currentLength, 0, newItems);
        }
        else
            this.spliceWithArray(newLength, currentLength - newLength);
    };
    ObservableArrayAdministration.prototype.updateArrayLength = function (oldLength, delta) {
        if (oldLength !== this.lastKnownLength)
            throw new Error("[mobx] Modification exception: the internal structure of an observable array was changed.");
        this.lastKnownLength += delta;
    };
    ObservableArrayAdministration.prototype.spliceWithArray = function (index, deleteCount, newItems) {
        var _this = this;
        checkIfStateModificationsAreAllowed$$1(this.atom);
        var length = this.values.length;
        if (index === undefined)
            index = 0;
        else if (index > length)
            index = length;
        else if (index < 0)
            index = Math.max(0, length + index);
        if (arguments.length === 1)
            deleteCount = length - index;
        else if (deleteCount === undefined || deleteCount === null)
            deleteCount = 0;
        else
            deleteCount = Math.max(0, Math.min(deleteCount, length - index));
        if (newItems === undefined)
            newItems = EMPTY_ARRAY$$1;
        if (hasInterceptors$$1(this)) {
            var change = interceptChange$$1(this, {
                object: this.proxy,
                type: "splice",
                index: index,
                removedCount: deleteCount,
                added: newItems
            });
            if (!change)
                return EMPTY_ARRAY$$1;
            deleteCount = change.removedCount;
            newItems = change.added;
        }
        newItems = newItems.length === 0 ? newItems : newItems.map(function (v) { return _this.enhancer(v, undefined); });
        if (true) {
            var lengthDelta = newItems.length - deleteCount;
            this.updateArrayLength(length, lengthDelta); // checks if internal array wasn't modified
        }
        var res = this.spliceItemsIntoValues(index, deleteCount, newItems);
        if (deleteCount !== 0 || newItems.length !== 0)
            this.notifyArraySplice(index, newItems, res);
        return this.dehanceValues(res);
    };
    ObservableArrayAdministration.prototype.spliceItemsIntoValues = function (index, deleteCount, newItems) {
        var _a;
        if (newItems.length < MAX_SPLICE_SIZE) {
            return (_a = this.values).splice.apply(_a, __spread([index, deleteCount], newItems));
        }
        else {
            var res = this.values.slice(index, index + deleteCount);
            this.values = this.values
                .slice(0, index)
                .concat(newItems, this.values.slice(index + deleteCount));
            return res;
        }
    };
    ObservableArrayAdministration.prototype.notifyArrayChildUpdate = function (index, newValue, oldValue) {
        var notifySpy = !this.owned && isSpyEnabled$$1();
        var notify = hasListeners$$1(this);
        var change = notify || notifySpy
            ? {
                object: this.proxy,
                type: "update",
                index: index,
                newValue: newValue,
                oldValue: oldValue
            }
            : null;
        // The reason why this is on right hand side here (and not above), is this way the uglifier will drop it, but it won't
        // cause any runtime overhead in development mode without NODE_ENV set, unless spying is enabled
        if (notifySpy && "development" !== "production")
            spyReportStart$$1(__assign({}, change, { name: this.atom.name }));
        this.atom.reportChanged();
        if (notify)
            notifyListeners$$1(this, change);
        if (notifySpy && "development" !== "production")
            spyReportEnd$$1();
    };
    ObservableArrayAdministration.prototype.notifyArraySplice = function (index, added, removed) {
        var notifySpy = !this.owned && isSpyEnabled$$1();
        var notify = hasListeners$$1(this);
        var change = notify || notifySpy
            ? {
                object: this.proxy,
                type: "splice",
                index: index,
                removed: removed,
                added: added,
                removedCount: removed.length,
                addedCount: added.length
            }
            : null;
        if (notifySpy && "development" !== "production")
            spyReportStart$$1(__assign({}, change, { name: this.atom.name }));
        this.atom.reportChanged();
        // conform: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/observe
        if (notify)
            notifyListeners$$1(this, change);
        if (notifySpy && "development" !== "production")
            spyReportEnd$$1();
    };
    return ObservableArrayAdministration;
}());
var arrayExtensions = {
    intercept: function (handler) {
        return this[$mobx$$1].intercept(handler);
    },
    observe: function (listener, fireImmediately) {
        if (fireImmediately === void 0) { fireImmediately = false; }
        var adm = this[$mobx$$1];
        return adm.observe(listener, fireImmediately);
    },
    clear: function () {
        return this.splice(0);
    },
    replace: function (newItems) {
        var adm = this[$mobx$$1];
        return adm.spliceWithArray(0, adm.values.length, newItems);
    },
    /**
     * Converts this array back to a (shallow) javascript structure.
     * For a deep clone use mobx.toJS
     */
    toJS: function () {
        return this.slice();
    },
    toJSON: function () {
        // Used by JSON.stringify
        return this.toJS();
    },
    /*
     * functions that do alter the internal structure of the array, (based on lib.es6.d.ts)
     * since these functions alter the inner structure of the array, the have side effects.
     * Because the have side effects, they should not be used in computed function,
     * and for that reason the do not call dependencyState.notifyObserved
     */
    splice: function (index, deleteCount) {
        var newItems = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            newItems[_i - 2] = arguments[_i];
        }
        var adm = this[$mobx$$1];
        switch (arguments.length) {
            case 0:
                return [];
            case 1:
                return adm.spliceWithArray(index);
            case 2:
                return adm.spliceWithArray(index, deleteCount);
        }
        return adm.spliceWithArray(index, deleteCount, newItems);
    },
    spliceWithArray: function (index, deleteCount, newItems) {
        var adm = this[$mobx$$1];
        return adm.spliceWithArray(index, deleteCount, newItems);
    },
    push: function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        var adm = this[$mobx$$1];
        adm.spliceWithArray(adm.values.length, 0, items);
        return adm.values.length;
    },
    pop: function () {
        return this.splice(Math.max(this[$mobx$$1].values.length - 1, 0), 1)[0];
    },
    shift: function () {
        return this.splice(0, 1)[0];
    },
    unshift: function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        var adm = this[$mobx$$1];
        adm.spliceWithArray(0, 0, items);
        return adm.values.length;
    },
    reverse: function () {
        // reverse by default mutates in place before returning the result
        // which makes it both a 'derivation' and a 'mutation'.
        // so we deviate from the default and just make it an dervitation
        if (true) {
            console.warn("[mobx] `observableArray.reverse()` will not update the array in place. Use `observableArray.slice().reverse()` to supress this warning and perform the operation on a copy, or `observableArray.replace(observableArray.slice().reverse())` to reverse & update in place");
        }
        var clone = this.slice();
        return clone.reverse.apply(clone, arguments);
    },
    sort: function (compareFn) {
        // sort by default mutates in place before returning the result
        // which goes against all good practices. Let's not change the array in place!
        if (true) {
            console.warn("[mobx] `observableArray.sort()` will not update the array in place. Use `observableArray.slice().sort()` to supress this warning and perform the operation on a copy, or `observableArray.replace(observableArray.slice().sort())` to sort & update in place");
        }
        var clone = this.slice();
        return clone.sort.apply(clone, arguments);
    },
    remove: function (value) {
        var adm = this[$mobx$$1];
        var idx = adm.dehanceValues(adm.values).indexOf(value);
        if (idx > -1) {
            this.splice(idx, 1);
            return true;
        }
        return false;
    },
    get: function (index) {
        var adm = this[$mobx$$1];
        if (adm) {
            if (index < adm.values.length) {
                adm.atom.reportObserved();
                return adm.dehanceValue(adm.values[index]);
            }
            console.warn("[mobx.array] Attempt to read an array index (" + index + ") that is out of bounds (" + adm.values.length + "). Please check length first. Out of bound indices will not be tracked by MobX");
        }
        return undefined;
    },
    set: function (index, newValue) {
        var adm = this[$mobx$$1];
        var values$$1 = adm.values;
        if (index < values$$1.length) {
            // update at index in range
            checkIfStateModificationsAreAllowed$$1(adm.atom);
            var oldValue = values$$1[index];
            if (hasInterceptors$$1(adm)) {
                var change = interceptChange$$1(adm, {
                    type: "update",
                    object: this,
                    index: index,
                    newValue: newValue
                });
                if (!change)
                    return;
                newValue = change.newValue;
            }
            newValue = adm.enhancer(newValue, oldValue);
            var changed = newValue !== oldValue;
            if (changed) {
                values$$1[index] = newValue;
                adm.notifyArrayChildUpdate(index, newValue, oldValue);
            }
        }
        else if (index === values$$1.length) {
            // add a new item
            adm.spliceWithArray(index, 0, [newValue]);
        }
        else {
            // out of bounds
            throw new Error("[mobx.array] Index out of bounds, " + index + " is larger than " + values$$1.length);
        }
    }
};
[
    "concat",
    "every",
    "filter",
    "forEach",
    "indexOf",
    "join",
    "lastIndexOf",
    "map",
    "reduce",
    "reduceRight",
    "slice",
    "some",
    "toString",
    "toLocaleString"
].forEach(function (funcName) {
    arrayExtensions[funcName] = function () {
        var adm = this[$mobx$$1];
        adm.atom.reportObserved();
        var res = adm.dehanceValues(adm.values);
        return res[funcName].apply(res, arguments);
    };
});
var isObservableArrayAdministration = createInstanceofPredicate$$1("ObservableArrayAdministration", ObservableArrayAdministration);
function isObservableArray$$1(thing) {
    return isObject$$1(thing) && isObservableArrayAdministration(thing[$mobx$$1]);
}

var _a;
var ObservableMapMarker = {};
// just extend Map? See also https://gist.github.com/nestharus/13b4d74f2ef4a2f4357dbd3fc23c1e54
// But: https://github.com/mobxjs/mobx/issues/1556
var ObservableMap$$1 = /** @class */ (function () {
    function ObservableMap$$1(initialData, enhancer, name) {
        if (enhancer === void 0) { enhancer = deepEnhancer$$1; }
        if (name === void 0) { name = "ObservableMap@" + getNextId$$1(); }
        this.enhancer = enhancer;
        this.name = name;
        this[_a] = ObservableMapMarker;
        this._keysAtom = createAtom$$1(this.name + ".keys()");
        this[Symbol.toStringTag] = "Map";
        if (typeof Map !== "function") {
            throw new Error("mobx.map requires Map polyfill for the current browser. Check babel-polyfill or core-js/es6/map.js");
        }
        this._data = new Map();
        this._hasMap = new Map();
        this.merge(initialData);
    }
    ObservableMap$$1.prototype._has = function (key) {
        return this._data.has(key);
    };
    ObservableMap$$1.prototype.has = function (key) {
        if (this._hasMap.has(key))
            return this._hasMap.get(key).get();
        return this._updateHasMapEntry(key, false).get();
    };
    ObservableMap$$1.prototype.set = function (key, value) {
        var hasKey = this._has(key);
        if (hasInterceptors$$1(this)) {
            var change = interceptChange$$1(this, {
                type: hasKey ? "update" : "add",
                object: this,
                newValue: value,
                name: key
            });
            if (!change)
                return this;
            value = change.newValue;
        }
        if (hasKey) {
            this._updateValue(key, value);
        }
        else {
            this._addValue(key, value);
        }
        return this;
    };
    ObservableMap$$1.prototype.delete = function (key) {
        var _this = this;
        if (hasInterceptors$$1(this)) {
            var change = interceptChange$$1(this, {
                type: "delete",
                object: this,
                name: key
            });
            if (!change)
                return false;
        }
        if (this._has(key)) {
            var notifySpy = isSpyEnabled$$1();
            var notify = hasListeners$$1(this);
            var change = notify || notifySpy
                ? {
                    type: "delete",
                    object: this,
                    oldValue: this._data.get(key).value,
                    name: key
                }
                : null;
            if (notifySpy && "development" !== "production")
                spyReportStart$$1(__assign({}, change, { name: this.name, key: key }));
            transaction$$1(function () {
                _this._keysAtom.reportChanged();
                _this._updateHasMapEntry(key, false);
                var observable$$1 = _this._data.get(key);
                observable$$1.setNewValue(undefined);
                _this._data.delete(key);
            });
            if (notify)
                notifyListeners$$1(this, change);
            if (notifySpy && "development" !== "production")
                spyReportEnd$$1();
            return true;
        }
        return false;
    };
    ObservableMap$$1.prototype._updateHasMapEntry = function (key, value) {
        // optimization; don't fill the hasMap if we are not observing, or remove entry if there are no observers anymore
        var entry = this._hasMap.get(key);
        if (entry) {
            entry.setNewValue(value);
        }
        else {
            entry = new ObservableValue$$1(value, referenceEnhancer$$1, this.name + "." + key + "?", false);
            this._hasMap.set(key, entry);
        }
        return entry;
    };
    ObservableMap$$1.prototype._updateValue = function (key, newValue) {
        var observable$$1 = this._data.get(key);
        newValue = observable$$1.prepareNewValue(newValue);
        if (newValue !== globalState$$1.UNCHANGED) {
            var notifySpy = isSpyEnabled$$1();
            var notify = hasListeners$$1(this);
            var change = notify || notifySpy
                ? {
                    type: "update",
                    object: this,
                    oldValue: observable$$1.value,
                    name: key,
                    newValue: newValue
                }
                : null;
            if (notifySpy && "development" !== "production")
                spyReportStart$$1(__assign({}, change, { name: this.name, key: key }));
            observable$$1.setNewValue(newValue);
            if (notify)
                notifyListeners$$1(this, change);
            if (notifySpy && "development" !== "production")
                spyReportEnd$$1();
        }
    };
    ObservableMap$$1.prototype._addValue = function (key, newValue) {
        var _this = this;
        checkIfStateModificationsAreAllowed$$1(this._keysAtom);
        transaction$$1(function () {
            var observable$$1 = new ObservableValue$$1(newValue, _this.enhancer, _this.name + "." + key, false);
            _this._data.set(key, observable$$1);
            newValue = observable$$1.value; // value might have been changed
            _this._updateHasMapEntry(key, true);
            _this._keysAtom.reportChanged();
        });
        var notifySpy = isSpyEnabled$$1();
        var notify = hasListeners$$1(this);
        var change = notify || notifySpy
            ? {
                type: "add",
                object: this,
                name: key,
                newValue: newValue
            }
            : null;
        if (notifySpy && "development" !== "production")
            spyReportStart$$1(__assign({}, change, { name: this.name, key: key }));
        if (notify)
            notifyListeners$$1(this, change);
        if (notifySpy && "development" !== "production")
            spyReportEnd$$1();
    };
    ObservableMap$$1.prototype.get = function (key) {
        if (this.has(key))
            return this.dehanceValue(this._data.get(key).get());
        return this.dehanceValue(undefined);
    };
    ObservableMap$$1.prototype.dehanceValue = function (value) {
        if (this.dehancer !== undefined) {
            return this.dehancer(value);
        }
        return value;
    };
    ObservableMap$$1.prototype.keys = function () {
        this._keysAtom.reportObserved();
        return this._data.keys();
    };
    ObservableMap$$1.prototype.values = function () {
        var self = this;
        var nextIndex = 0;
        var keys$$1 = Array.from(this.keys());
        return makeIterable({
            next: function () {
                return nextIndex < keys$$1.length
                    ? { value: self.get(keys$$1[nextIndex++]), done: false }
                    : { done: true };
            }
        });
    };
    ObservableMap$$1.prototype.entries = function () {
        var self = this;
        var nextIndex = 0;
        var keys$$1 = Array.from(this.keys());
        return makeIterable({
            next: function () {
                if (nextIndex < keys$$1.length) {
                    var key = keys$$1[nextIndex++];
                    return {
                        value: [key, self.get(key)],
                        done: false
                    };
                }
                return { done: true };
            }
        });
    };
    ObservableMap$$1.prototype[(_a = $mobx$$1, Symbol.iterator)] = function () {
        return this.entries();
    };
    ObservableMap$$1.prototype.forEach = function (callback, thisArg) {
        var e_1, _a;
        try {
            for (var _b = __values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
                callback.call(thisArg, value, key, this);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    /** Merge another object into this object, returns this. */
    ObservableMap$$1.prototype.merge = function (other) {
        var _this = this;
        if (isObservableMap$$1(other)) {
            other = other.toJS();
        }
        transaction$$1(function () {
            if (isPlainObject$$1(other))
                Object.keys(other).forEach(function (key) { return _this.set(key, other[key]); });
            else if (Array.isArray(other))
                other.forEach(function (_a) {
                    var _b = __read(_a, 2), key = _b[0], value = _b[1];
                    return _this.set(key, value);
                });
            else if (isES6Map$$1(other)) {
                if (other.constructor !== Map)
                    return fail$$1("Cannot initialize from classes that inherit from Map: " + other.constructor.name); // prettier-ignore
                other.forEach(function (value, key) { return _this.set(key, value); });
            }
            else if (other !== null && other !== undefined)
                fail$$1("Cannot initialize map from " + other);
        });
        return this;
    };
    ObservableMap$$1.prototype.clear = function () {
        var _this = this;
        transaction$$1(function () {
            untracked$$1(function () {
                var e_2, _a;
                try {
                    for (var _b = __values(_this.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var key = _c.value;
                        _this.delete(key);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            });
        });
    };
    ObservableMap$$1.prototype.replace = function (values$$1) {
        var _this = this;
        transaction$$1(function () {
            // grab all the keys that are present in the new map but not present in the current map
            // and delete them from the map, then merge the new map
            // this will cause reactions only on changed values
            var newKeys = getMapLikeKeys$$1(values$$1);
            var oldKeys = Array.from(_this.keys());
            var missingKeys = oldKeys.filter(function (k) { return newKeys.indexOf(k) === -1; });
            missingKeys.forEach(function (k) { return _this.delete(k); });
            _this.merge(values$$1);
        });
        return this;
    };
    Object.defineProperty(ObservableMap$$1.prototype, "size", {
        get: function () {
            this._keysAtom.reportObserved();
            return this._data.size;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns a plain object that represents this map.
     * Note that all the keys being stringified.
     * If there are duplicating keys after converting them to strings, behaviour is undetermined.
     */
    ObservableMap$$1.prototype.toPOJO = function () {
        var e_3, _a;
        var res = {};
        try {
            for (var _b = __values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
                res["" + key] = value;
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return res;
    };
    /**
     * Returns a shallow non observable object clone of this map.
     * Note that the values migth still be observable. For a deep clone use mobx.toJS.
     */
    ObservableMap$$1.prototype.toJS = function () {
        return new Map(this);
    };
    ObservableMap$$1.prototype.toJSON = function () {
        // Used by JSON.stringify
        return this.toPOJO();
    };
    ObservableMap$$1.prototype.toString = function () {
        var _this = this;
        return (this.name +
            "[{ " +
            Array.from(this.keys())
                .map(function (key) { return key + ": " + ("" + _this.get(key)); })
                .join(", ") +
            " }]");
    };
    /**
     * Observes this object. Triggers for the events 'add', 'update' and 'delete'.
     * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe
     * for callback details
     */
    ObservableMap$$1.prototype.observe = function (listener, fireImmediately) {
         true &&
            invariant$$1(fireImmediately !== true, "`observe` doesn't support fireImmediately=true in combination with maps.");
        return registerListener$$1(this, listener);
    };
    ObservableMap$$1.prototype.intercept = function (handler) {
        return registerInterceptor$$1(this, handler);
    };
    return ObservableMap$$1;
}());
/* 'var' fixes small-build issue */
var isObservableMap$$1 = createInstanceofPredicate$$1("ObservableMap", ObservableMap$$1);

var _a$1;
var ObservableSetMarker = {};
var ObservableSet$$1 = /** @class */ (function () {
    function ObservableSet$$1(initialData, enhancer, name) {
        if (enhancer === void 0) { enhancer = deepEnhancer$$1; }
        if (name === void 0) { name = "ObservableSet@" + getNextId$$1(); }
        this.name = name;
        this[_a$1] = ObservableSetMarker;
        this._data = new Set();
        this._atom = createAtom$$1(this.name);
        this[Symbol.toStringTag] = "Set";
        if (typeof Set !== "function") {
            throw new Error("mobx.set requires Set polyfill for the current browser. Check babel-polyfill or core-js/es6/set.js");
        }
        this.enhancer = function (newV, oldV) { return enhancer(newV, oldV, name); };
        if (initialData) {
            this.replace(initialData);
        }
    }
    ObservableSet$$1.prototype.dehanceValue = function (value) {
        if (this.dehancer !== undefined) {
            return this.dehancer(value);
        }
        return value;
    };
    ObservableSet$$1.prototype.clear = function () {
        var _this = this;
        transaction$$1(function () {
            untracked$$1(function () {
                var e_1, _a;
                try {
                    for (var _b = __values(_this._data.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var value = _c.value;
                        _this.delete(value);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            });
        });
    };
    ObservableSet$$1.prototype.forEach = function (callbackFn, thisArg) {
        var e_2, _a;
        try {
            for (var _b = __values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
                var value = _c.value;
                callbackFn.call(thisArg, value, value, this);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    Object.defineProperty(ObservableSet$$1.prototype, "size", {
        get: function () {
            this._atom.reportObserved();
            return this._data.size;
        },
        enumerable: true,
        configurable: true
    });
    ObservableSet$$1.prototype.add = function (value) {
        var _this = this;
        checkIfStateModificationsAreAllowed$$1(this._atom);
        if (hasInterceptors$$1(this)) {
            var change = interceptChange$$1(this, {
                type: "add",
                object: this,
                newValue: value
            });
            if (!change)
                return this;
            // TODO: ideally, value = change.value would be done here, so that values can be
            // changed by interceptor. Same applies for other Set and Map api's.
        }
        if (!this.has(value)) {
            transaction$$1(function () {
                _this._data.add(_this.enhancer(value, undefined));
                _this._atom.reportChanged();
            });
            var notifySpy = isSpyEnabled$$1();
            var notify = hasListeners$$1(this);
            var change = notify || notifySpy
                ? {
                    type: "add",
                    object: this,
                    newValue: value
                }
                : null;
            if (notifySpy && "development" !== "production")
                spyReportStart$$1(change);
            if (notify)
                notifyListeners$$1(this, change);
            if (notifySpy && "development" !== "production")
                spyReportEnd$$1();
        }
        return this;
    };
    ObservableSet$$1.prototype.delete = function (value) {
        var _this = this;
        if (hasInterceptors$$1(this)) {
            var change = interceptChange$$1(this, {
                type: "delete",
                object: this,
                oldValue: value
            });
            if (!change)
                return false;
        }
        if (this.has(value)) {
            var notifySpy = isSpyEnabled$$1();
            var notify = hasListeners$$1(this);
            var change = notify || notifySpy
                ? {
                    type: "delete",
                    object: this,
                    oldValue: value
                }
                : null;
            if (notifySpy && "development" !== "production")
                spyReportStart$$1(__assign({}, change, { name: this.name }));
            transaction$$1(function () {
                _this._atom.reportChanged();
                _this._data.delete(value);
            });
            if (notify)
                notifyListeners$$1(this, change);
            if (notifySpy && "development" !== "production")
                spyReportEnd$$1();
            return true;
        }
        return false;
    };
    ObservableSet$$1.prototype.has = function (value) {
        this._atom.reportObserved();
        return this._data.has(this.dehanceValue(value));
    };
    ObservableSet$$1.prototype.entries = function () {
        var nextIndex = 0;
        var keys$$1 = Array.from(this.keys());
        var values$$1 = Array.from(this.values());
        return makeIterable({
            next: function () {
                var index = nextIndex;
                nextIndex += 1;
                return index < values$$1.length
                    ? { value: [keys$$1[index], values$$1[index]], done: false }
                    : { done: true };
            }
        });
    };
    ObservableSet$$1.prototype.keys = function () {
        return this.values();
    };
    ObservableSet$$1.prototype.values = function () {
        this._atom.reportObserved();
        var self = this;
        var nextIndex = 0;
        var observableValues = Array.from(this._data.values());
        return makeIterable({
            next: function () {
                return nextIndex < observableValues.length
                    ? { value: self.dehanceValue(observableValues[nextIndex++]), done: false }
                    : { done: true };
            }
        });
    };
    ObservableSet$$1.prototype.replace = function (other) {
        var _this = this;
        if (isObservableSet$$1(other)) {
            other = other.toJS();
        }
        transaction$$1(function () {
            if (Array.isArray(other)) {
                _this.clear();
                other.forEach(function (value) { return _this.add(value); });
            }
            else if (isES6Set$$1(other)) {
                _this.clear();
                other.forEach(function (value) { return _this.add(value); });
            }
            else if (other !== null && other !== undefined) {
                fail$$1("Cannot initialize set from " + other);
            }
        });
        return this;
    };
    ObservableSet$$1.prototype.observe = function (listener, fireImmediately) {
        // TODO 'fireImmediately' can be true?
         true &&
            invariant$$1(fireImmediately !== true, "`observe` doesn't support fireImmediately=true in combination with sets.");
        return registerListener$$1(this, listener);
    };
    ObservableSet$$1.prototype.intercept = function (handler) {
        return registerInterceptor$$1(this, handler);
    };
    ObservableSet$$1.prototype.toJS = function () {
        return new Set(this);
    };
    ObservableSet$$1.prototype.toString = function () {
        return this.name + "[ " + Array.from(this).join(", ") + " ]";
    };
    ObservableSet$$1.prototype[(_a$1 = $mobx$$1, Symbol.iterator)] = function () {
        return this.values();
    };
    return ObservableSet$$1;
}());
var isObservableSet$$1 = createInstanceofPredicate$$1("ObservableSet", ObservableSet$$1);

var ObservableObjectAdministration$$1 = /** @class */ (function () {
    function ObservableObjectAdministration$$1(target, values$$1, name, defaultEnhancer) {
        if (values$$1 === void 0) { values$$1 = new Map(); }
        this.target = target;
        this.values = values$$1;
        this.name = name;
        this.defaultEnhancer = defaultEnhancer;
        this.keysAtom = new Atom$$1(name + ".keys");
    }
    ObservableObjectAdministration$$1.prototype.read = function (key) {
        return this.values.get(key).get();
    };
    ObservableObjectAdministration$$1.prototype.write = function (key, newValue) {
        var instance = this.target;
        var observable$$1 = this.values.get(key);
        if (observable$$1 instanceof ComputedValue$$1) {
            observable$$1.set(newValue);
            return;
        }
        // intercept
        if (hasInterceptors$$1(this)) {
            var change = interceptChange$$1(this, {
                type: "update",
                object: this.proxy || instance,
                name: key,
                newValue: newValue
            });
            if (!change)
                return;
            newValue = change.newValue;
        }
        newValue = observable$$1.prepareNewValue(newValue);
        // notify spy & observers
        if (newValue !== globalState$$1.UNCHANGED) {
            var notify = hasListeners$$1(this);
            var notifySpy = isSpyEnabled$$1();
            var change = notify || notifySpy
                ? {
                    type: "update",
                    object: this.proxy || instance,
                    oldValue: observable$$1.value,
                    name: key,
                    newValue: newValue
                }
                : null;
            if (notifySpy && "development" !== "production")
                spyReportStart$$1(__assign({}, change, { name: this.name, key: key }));
            observable$$1.setNewValue(newValue);
            if (notify)
                notifyListeners$$1(this, change);
            if (notifySpy && "development" !== "production")
                spyReportEnd$$1();
        }
    };
    ObservableObjectAdministration$$1.prototype.has = function (key) {
        var map = this.pendingKeys || (this.pendingKeys = new Map());
        var entry = map.get(key);
        if (entry)
            return entry.get();
        else {
            var exists = !!this.values.get(key);
            // Possible optimization: Don't have a separate map for non existing keys,
            // but store them in the values map instead, using a special symbol to denote "not existing"
            entry = new ObservableValue$$1(exists, referenceEnhancer$$1, this.name + "." + key.toString() + "?", false);
            map.set(key, entry);
            return entry.get(); // read to subscribe
        }
    };
    ObservableObjectAdministration$$1.prototype.addObservableProp = function (propName, newValue, enhancer) {
        if (enhancer === void 0) { enhancer = this.defaultEnhancer; }
        var target = this.target;
        assertPropertyConfigurable$$1(target, propName);
        if (hasInterceptors$$1(this)) {
            var change = interceptChange$$1(this, {
                object: this.proxy || target,
                name: propName,
                type: "add",
                newValue: newValue
            });
            if (!change)
                return;
            newValue = change.newValue;
        }
        var observable$$1 = new ObservableValue$$1(newValue, enhancer, this.name + "." + propName, false);
        this.values.set(propName, observable$$1);
        newValue = observable$$1.value; // observableValue might have changed it
        Object.defineProperty(target, propName, generateObservablePropConfig$$1(propName));
        this.notifyPropertyAddition(propName, newValue);
    };
    ObservableObjectAdministration$$1.prototype.addComputedProp = function (propertyOwner, // where is the property declared?
    propName, options) {
        var target = this.target;
        options.name = options.name || this.name + "." + propName;
        this.values.set(propName, new ComputedValue$$1(options));
        if (propertyOwner === target || isPropertyConfigurable$$1(propertyOwner, propName))
            Object.defineProperty(propertyOwner, propName, generateComputedPropConfig$$1(propName));
    };
    ObservableObjectAdministration$$1.prototype.remove = function (key) {
        if (!this.values.has(key))
            return;
        var target = this.target;
        if (hasInterceptors$$1(this)) {
            var change = interceptChange$$1(this, {
                object: this.proxy || target,
                name: key,
                type: "remove"
            });
            if (!change)
                return;
        }
        try {
            startBatch$$1();
            var notify = hasListeners$$1(this);
            var notifySpy = isSpyEnabled$$1();
            var oldObservable = this.values.get(key);
            var oldValue = oldObservable && oldObservable.get();
            oldObservable && oldObservable.set(undefined);
            // notify key and keyset listeners
            this.keysAtom.reportChanged();
            this.values.delete(key);
            if (this.pendingKeys) {
                var entry = this.pendingKeys.get(key);
                if (entry)
                    entry.set(false);
            }
            // delete the prop
            delete this.target[key];
            var change = notify || notifySpy
                ? {
                    type: "remove",
                    object: this.proxy || target,
                    oldValue: oldValue,
                    name: key
                }
                : null;
            if (notifySpy && "development" !== "production")
                spyReportStart$$1(__assign({}, change, { name: this.name, key: key }));
            if (notify)
                notifyListeners$$1(this, change);
            if (notifySpy && "development" !== "production")
                spyReportEnd$$1();
        }
        finally {
            endBatch$$1();
        }
    };
    ObservableObjectAdministration$$1.prototype.illegalAccess = function (owner, propName) {
        /**
         * This happens if a property is accessed through the prototype chain, but the property was
         * declared directly as own property on the prototype.
         *
         * E.g.:
         * class A {
         * }
         * extendObservable(A.prototype, { x: 1 })
         *
         * classB extens A {
         * }
         * console.log(new B().x)
         *
         * It is unclear whether the property should be considered 'static' or inherited.
         * Either use `console.log(A.x)`
         * or: decorate(A, { x: observable })
         *
         * When using decorate, the property will always be redeclared as own property on the actual instance
         */
        console.warn("Property '" + propName + "' of '" + owner + "' was accessed through the prototype chain. Use 'decorate' instead to declare the prop or access it statically through it's owner");
    };
    /**
     * Observes this object. Triggers for the events 'add', 'update' and 'delete'.
     * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe
     * for callback details
     */
    ObservableObjectAdministration$$1.prototype.observe = function (callback, fireImmediately) {
         true &&
            invariant$$1(fireImmediately !== true, "`observe` doesn't support the fire immediately property for observable objects.");
        return registerListener$$1(this, callback);
    };
    ObservableObjectAdministration$$1.prototype.intercept = function (handler) {
        return registerInterceptor$$1(this, handler);
    };
    ObservableObjectAdministration$$1.prototype.notifyPropertyAddition = function (key, newValue) {
        var notify = hasListeners$$1(this);
        var notifySpy = isSpyEnabled$$1();
        var change = notify || notifySpy
            ? {
                type: "add",
                object: this.proxy || this.target,
                name: key,
                newValue: newValue
            }
            : null;
        if (notifySpy && "development" !== "production")
            spyReportStart$$1(__assign({}, change, { name: this.name, key: key }));
        if (notify)
            notifyListeners$$1(this, change);
        if (notifySpy && "development" !== "production")
            spyReportEnd$$1();
        if (this.pendingKeys) {
            var entry = this.pendingKeys.get(key);
            if (entry)
                entry.set(true);
        }
        this.keysAtom.reportChanged();
    };
    ObservableObjectAdministration$$1.prototype.getKeys = function () {
        var e_1, _a;
        this.keysAtom.reportObserved();
        // return Reflect.ownKeys(this.values) as any
        var res = [];
        try {
            for (var _b = __values(this.values), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
                if (value instanceof ObservableValue$$1)
                    res.push(key);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return res;
    };
    return ObservableObjectAdministration$$1;
}());
function asObservableObject$$1(target, name, defaultEnhancer) {
    if (name === void 0) { name = ""; }
    if (defaultEnhancer === void 0) { defaultEnhancer = deepEnhancer$$1; }
    if (Object.prototype.hasOwnProperty.call(target, $mobx$$1))
        return target[$mobx$$1];
     true &&
        invariant$$1(Object.isExtensible(target), "Cannot make the designated object observable; it is not extensible");
    if (!isPlainObject$$1(target))
        name = (target.constructor.name || "ObservableObject") + "@" + getNextId$$1();
    if (!name)
        name = "ObservableObject@" + getNextId$$1();
    var adm = new ObservableObjectAdministration$$1(target, new Map(), name, defaultEnhancer);
    addHiddenProp$$1(target, $mobx$$1, adm);
    return adm;
}
var observablePropertyConfigs = Object.create(null);
var computedPropertyConfigs = Object.create(null);
function generateObservablePropConfig$$1(propName) {
    return (observablePropertyConfigs[propName] ||
        (observablePropertyConfigs[propName] = {
            configurable: true,
            enumerable: true,
            get: function () {
                return this[$mobx$$1].read(propName);
            },
            set: function (v) {
                this[$mobx$$1].write(propName, v);
            }
        }));
}
function getAdministrationForComputedPropOwner(owner) {
    var adm = owner[$mobx$$1];
    if (!adm) {
        // because computed props are declared on proty,
        // the current instance might not have been initialized yet
        initializeInstance$$1(owner);
        return owner[$mobx$$1];
    }
    return adm;
}
function generateComputedPropConfig$$1(propName) {
    return (computedPropertyConfigs[propName] ||
        (computedPropertyConfigs[propName] = {
            configurable: false,
            enumerable: false,
            get: function () {
                return getAdministrationForComputedPropOwner(this).read(propName);
            },
            set: function (v) {
                getAdministrationForComputedPropOwner(this).write(propName, v);
            }
        }));
}
var isObservableObjectAdministration = createInstanceofPredicate$$1("ObservableObjectAdministration", ObservableObjectAdministration$$1);
function isObservableObject$$1(thing) {
    if (isObject$$1(thing)) {
        // Initializers run lazily when transpiling to babel, so make sure they are run...
        initializeInstance$$1(thing);
        return isObservableObjectAdministration(thing[$mobx$$1]);
    }
    return false;
}

function getAtom$$1(thing, property) {
    if (typeof thing === "object" && thing !== null) {
        if (isObservableArray$$1(thing)) {
            if (property !== undefined)
                fail$$1( true &&
                    "It is not possible to get index atoms from arrays");
            return thing[$mobx$$1].atom;
        }
        if (isObservableSet$$1(thing)) {
            return thing[$mobx$$1];
        }
        if (isObservableMap$$1(thing)) {
            var anyThing = thing;
            if (property === undefined)
                return anyThing._keysAtom;
            var observable$$1 = anyThing._data.get(property) || anyThing._hasMap.get(property);
            if (!observable$$1)
                fail$$1( true &&
                    "the entry '" + property + "' does not exist in the observable map '" + getDebugName$$1(thing) + "'");
            return observable$$1;
        }
        // Initializers run lazily when transpiling to babel, so make sure they are run...
        initializeInstance$$1(thing);
        if (property && !thing[$mobx$$1])
            thing[property]; // See #1072
        if (isObservableObject$$1(thing)) {
            if (!property)
                return fail$$1( true && "please specify a property");
            var observable$$1 = thing[$mobx$$1].values.get(property);
            if (!observable$$1)
                fail$$1( true &&
                    "no observable property '" + property + "' found on the observable object '" + getDebugName$$1(thing) + "'");
            return observable$$1;
        }
        if (isAtom$$1(thing) || isComputedValue$$1(thing) || isReaction$$1(thing)) {
            return thing;
        }
    }
    else if (typeof thing === "function") {
        if (isReaction$$1(thing[$mobx$$1])) {
            // disposer function
            return thing[$mobx$$1];
        }
    }
    return fail$$1( true && "Cannot obtain atom from " + thing);
}
function getAdministration$$1(thing, property) {
    if (!thing)
        fail$$1("Expecting some object");
    if (property !== undefined)
        return getAdministration$$1(getAtom$$1(thing, property));
    if (isAtom$$1(thing) || isComputedValue$$1(thing) || isReaction$$1(thing))
        return thing;
    if (isObservableMap$$1(thing) || isObservableSet$$1(thing))
        return thing;
    // Initializers run lazily when transpiling to babel, so make sure they are run...
    initializeInstance$$1(thing);
    if (thing[$mobx$$1])
        return thing[$mobx$$1];
    fail$$1( true && "Cannot obtain administration from " + thing);
}
function getDebugName$$1(thing, property) {
    var named;
    if (property !== undefined)
        named = getAtom$$1(thing, property);
    else if (isObservableObject$$1(thing) || isObservableMap$$1(thing) || isObservableSet$$1(thing))
        named = getAdministration$$1(thing);
    else
        named = getAtom$$1(thing); // valid for arrays as well
    return named.name;
}

var toString = Object.prototype.toString;
function deepEqual$$1(a, b) {
    return eq(a, b);
}
// Copied from https://github.com/jashkenas/underscore/blob/5c237a7c682fb68fd5378203f0bf22dce1624854/underscore.js#L1186-L1289
// Internal recursive comparison function for `isEqual`.
function eq(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b)
        return a !== 0 || 1 / a === 1 / b;
    // `null` or `undefined` only equal to itself (strict comparison).
    if (a == null || b == null)
        return false;
    // `NaN`s are equivalent, but non-reflexive.
    if (a !== a)
        return b !== b;
    // Exhaust primitive checks
    var type = typeof a;
    if (type !== "function" && type !== "object" && typeof b != "object")
        return false;
    return deepEq(a, b, aStack, bStack);
}
// Internal recursive comparison function for `isEqual`.
function deepEq(a, b, aStack, bStack) {
    // Unwrap any wrapped objects.
    a = unwrap(a);
    b = unwrap(b);
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b))
        return false;
    switch (className) {
        // Strings, numbers, regular expressions, dates, and booleans are compared by value.
        case "[object RegExp]":
        // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
        case "[object String]":
            // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
            // equivalent to `new String("5")`.
            return "" + a === "" + b;
        case "[object Number]":
            // `NaN`s are equivalent, but non-reflexive.
            // Object(NaN) is equivalent to NaN.
            if (+a !== +a)
                return +b !== +b;
            // An `egal` comparison is performed for other numeric values.
            return +a === 0 ? 1 / +a === 1 / b : +a === +b;
        case "[object Date]":
        case "[object Boolean]":
            // Coerce dates and booleans to numeric primitive values. Dates are compared by their
            // millisecond representations. Note that invalid dates with millisecond representations
            // of `NaN` are not equivalent.
            return +a === +b;
        case "[object Symbol]":
            return (typeof Symbol !== "undefined" && Symbol.valueOf.call(a) === Symbol.valueOf.call(b));
    }
    var areArrays = className === "[object Array]";
    if (!areArrays) {
        if (typeof a != "object" || typeof b != "object")
            return false;
        // Objects with different constructors are not equivalent, but `Object`s or `Array`s
        // from different frames are.
        var aCtor = a.constructor, bCtor = b.constructor;
        if (aCtor !== bCtor &&
            !(typeof aCtor === "function" &&
                aCtor instanceof aCtor &&
                typeof bCtor === "function" &&
                bCtor instanceof bCtor) &&
            ("constructor" in a && "constructor" in b)) {
            return false;
        }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
        // Linear search. Performance is inversely proportional to the number of
        // unique nested structures.
        if (aStack[length] === a)
            return bStack[length] === b;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    // Recursively compare objects and arrays.
    if (areArrays) {
        // Compare array lengths to determine if a deep comparison is necessary.
        length = a.length;
        if (length !== b.length)
            return false;
        // Deep compare the contents, ignoring non-numeric properties.
        while (length--) {
            if (!eq(a[length], b[length], aStack, bStack))
                return false;
        }
    }
    else {
        // Deep compare objects.
        var keys$$1 = Object.keys(a), key;
        length = keys$$1.length;
        // Ensure that both objects contain the same number of properties before comparing deep equality.
        if (Object.keys(b).length !== length)
            return false;
        while (length--) {
            // Deep compare each member
            key = keys$$1[length];
            if (!(has$1(b, key) && eq(a[key], b[key], aStack, bStack)))
                return false;
        }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
}
function unwrap(a) {
    if (isObservableArray$$1(a))
        return a.slice();
    if (isES6Map$$1(a) || isObservableMap$$1(a))
        return Array.from(a.entries());
    if (isES6Set$$1(a) || isObservableSet$$1(a))
        return Array.from(a.entries());
    return a;
}
function has$1(a, key) {
    return Object.prototype.hasOwnProperty.call(a, key);
}

function makeIterable(iterator) {
    iterator[Symbol.iterator] = self;
    return iterator;
}
function self() {
    return this;
}

/*
The only reason for this file to exist is pure horror:
Without it rollup can make the bundling fail at any point in time; when it rolls up the files in the wrong order
it will cause undefined errors (for example because super classes or local variables not being hosted).
With this file that will still happen,
but at least in this file we can magically reorder the imports with trial and error until the build succeeds again.
*/

/**
 * (c) Michel Weststrate 2015 - 2018
 * MIT Licensed
 *
 * Welcome to the mobx sources! To get an global overview of how MobX internally works,
 * this is a good place to start:
 * https://medium.com/@mweststrate/becoming-fully-reactive-an-in-depth-explanation-of-mobservable-55995262a254#.xvbh6qd74
 *
 * Source folders:
 * ===============
 *
 * - api/     Most of the public static methods exposed by the module can be found here.
 * - core/    Implementation of the MobX algorithm; atoms, derivations, reactions, dependency trees, optimizations. Cool stuff can be found here.
 * - types/   All the magic that is need to have observable objects, arrays and values is in this folder. Including the modifiers like `asFlat`.
 * - utils/   Utility stuff.
 *
 */
if (typeof Proxy === "undefined" || typeof Symbol === "undefined") {
    throw new Error("[mobx] MobX 5+ requires Proxy and Symbol objects. If your environment doesn't support Proxy objects, please downgrade to MobX 4. For React Native Android, consider upgrading JSCore.");
}
try {
    // define process.env if needed
    // if this is not a production build in the first place
    // (in which case the expression below would be substituted with 'production')
    "development";
}
catch (e) {
    var g = typeof window !== "undefined" ? window : global;
    if (typeof process === "undefined")
        g.process = {};
    g.process.env = {};
}

(function () {
    function testCodeMinification() { }
    if (testCodeMinification.name !== "testCodeMinification" &&
        "development" !== "production" &&
        process.env.IGNORE_MOBX_MINIFY_WARNING !== "true") {
        console.warn(
        // Template literal(backtick) is used for fix issue with rollup-plugin-commonjs https://github.com/rollup/rollup-plugin-commonjs/issues/344
        "[mobx] you are running a minified build, but 'process.env.NODE_ENV' was not set to 'production' in your bundler. This results in an unnecessarily large and slow bundle");
    }
})();
// Devtools support
if (typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ === "object") {
    // See: https://github.com/andykog/mobx-devtools/
    __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobx({
        spy: spy$$1,
        extras: {
            getDebugName: getDebugName$$1
        },
        $mobx: $mobx$$1
    });
}




/***/ }),

/***/ "./node_modules/ts-loader/index.js!./app/internal/renderer/video-renderer/worker.ts":
/*!*********************************************************************************!*\
  !*** ./node_modules/ts-loader!./app/internal/renderer/video-renderer/worker.ts ***!
  \*********************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var worker_postable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! worker-postable */ "./node_modules/worker-postable/dist/index.js");
/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderer */ "./app/internal/renderer/video-renderer/renderer.ts");


console.log('render running');
console.log(worker_postable__WEBPACK_IMPORTED_MODULE_0__["ObjectStore"], worker_postable__WEBPACK_IMPORTED_MODULE_0__["ConstructorStore"]);
_renderer__WEBPACK_IMPORTED_MODULE_1__["renderer"];


/***/ }),

/***/ "./node_modules/tstl/algorithm/binary_search.js":
/*!******************************************************!*\
  !*** ./node_modules/tstl/algorithm/binary_search.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var global_1 = __webpack_require__(/*! ../iterator/global */ "./node_modules/tstl/iterator/global.js");
var comparators_1 = __webpack_require__(/*! ../functional/comparators */ "./node_modules/tstl/functional/comparators.js");
var Pair_1 = __webpack_require__(/*! ../utility/Pair */ "./node_modules/tstl/utility/Pair.js");
/* =========================================================
    BINARY SEARCH
========================================================= */
/**
 * Get iterator to lower bound.
 *
 * @param first Input iterator of the first position.
 * @param last Input iterator of the last position.
 * @param val Value to search for.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Iterator to the first element equal or after the val.
 */
function lower_bound(first, last, val, comp) {
    if (comp === void 0) { comp = comparators_1.less; }
    var count = global_1.distance(first, last);
    while (count > 0) {
        var step = Math.floor(count / 2);
        var it = global_1.advance(first, step);
        if (comp(it.value, val)) {
            first = it.next();
            count -= step + 1;
        }
        else
            count = step;
    }
    return first;
}
exports.lower_bound = lower_bound;
/**
 * Get iterator to upper bound.
 *
 * @param first Input iterator of the first position.
 * @param last Input iterator of the last position.
 * @param val Value to search for.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Iterator to the first element after the key.
 */
function upper_bound(first, last, val, comp) {
    if (comp === void 0) { comp = comparators_1.less; }
    var count = global_1.distance(first, last);
    while (count > 0) {
        var step = Math.floor(count / 2);
        var it = global_1.advance(first, step);
        if (!comp(val, it.value)) {
            first = it.next();
            count -= step + 1;
        }
        else
            count = step;
    }
    return first;
}
exports.upper_bound = upper_bound;
/**
 * Get range of equal elements.
 *
 * @param first Input iterator of the first position.
 * @param last Input iterator of the last position.
 * @param val Value to search for.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Pair of {@link lower_bound} and {@link upper_bound}.
 */
function equal_range(first, last, val, comp) {
    if (comp === void 0) { comp = comparators_1.less; }
    var it = lower_bound(first, last, val, comp);
    return new Pair_1.Pair(it, upper_bound(it, last, val, comp));
}
exports.equal_range = equal_range;
/**
 * Test whether a value exists in sorted range.
 *
 * @param first Input iterator of the first position.
 * @param last Input iterator of the last position.
 * @param val Value to search for.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Whether the value exists or not.
 */
function binary_search(first, last, val, comp) {
    if (comp === void 0) { comp = comparators_1.less; }
    first = lower_bound(first, last, val, comp);
    return !first.equals(last) && !comp(val, first.value);
}
exports.binary_search = binary_search;
//# sourceMappingURL=binary_search.js.map

/***/ }),

/***/ "./node_modules/tstl/algorithm/heap.js":
/*!*********************************************!*\
  !*** ./node_modules/tstl/algorithm/heap.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var comparators_1 = __webpack_require__(/*! ../functional/comparators */ "./node_modules/tstl/functional/comparators.js");
var global_1 = __webpack_require__(/*! ../iterator/global */ "./node_modules/tstl/iterator/global.js");
/* =========================================================
    EA-STL (https://github.com/electronicarts/EASTL/blob/master/include/EASTL/heap.h)
        - PUSH
        - POP
        - SORT
        - INTERNAL
============================================================
    PUSH
--------------------------------------------------------- */
/**
 * Make a heap.
 *
 * @param first Random access iteartor of the first position.
 * @param last Random access iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 */
function make_heap(first, last, comp) {
    if (comp === void 0) { comp = comparators_1.less; }
    var heapSize = global_1.distance(first, last);
    if (heapSize < 2)
        return;
    var parentPosition = ((heapSize - 2) >> 1) + 1;
    do {
        var temp = first.advance(--parentPosition).value;
        _Adjust_heap(first, parentPosition, heapSize, parentPosition, temp, comp);
    } while (parentPosition !== 0);
}
exports.make_heap = make_heap;
/**
 * Push an element into heap.
 *
 * @param first Random access iteartor of the first position.
 * @param last Random access iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 */
function push_heap(first, last, comp) {
    if (comp === void 0) { comp = comparators_1.less; }
    var tempBottom = last.prev().value;
    _Promote_heap(first, 0, global_1.distance(first, last) - 1, tempBottom, comp);
}
exports.push_heap = push_heap;
/* ---------------------------------------------------------
    POP
--------------------------------------------------------- */
/**
 * Pop an element from heap.
 *
 * @param first Random access iteartor of the first position.
 * @param last Random access iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 */
function pop_heap(first, last, comp) {
    if (comp === void 0) { comp = comparators_1.less; }
    var tempBottom = last.prev().value;
    last.prev().value = first.value;
    _Adjust_heap(first, 0, global_1.distance(first, last) - 1, 0, tempBottom, comp);
}
exports.pop_heap = pop_heap;
/* ---------------------------------------------------------
    SORT
--------------------------------------------------------- */
/**
 * Test whether a range is heap.
 *
 * @param first Bi-directional iteartor of the first position.
 * @param last Bi-directional iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Whether the range is heap.
 */
function is_heap(first, last, comp) {
    if (comp === void 0) { comp = comparators_1.less; }
    var it = is_heap_until(first, last, comp);
    return it.equals(last);
}
exports.is_heap = is_heap;
/**
 * Find the first element not in heap order.
 *
 * @param first Bi-directional iteartor of the first position.
 * @param last Bi-directional iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Iterator to the first element not in heap order.
 */
function is_heap_until(first, last, comp) {
    if (comp === void 0) { comp = comparators_1.less; }
    var counter = 0;
    for (var child = first.next(); _Comp_it(child, last.index()); child = child.next(), counter ^= 1) {
        if (comp(first.value, child.value))
            return child;
        first = global_1.advance(first, counter);
    }
    return last;
}
exports.is_heap_until = is_heap_until;
/**
 * Sort elements of a heap.
 *
 * @param first Random access iteartor of the first position.
 * @param last Random access iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 */
function sort_heap(first, last, comp) {
    if (comp === void 0) { comp = comparators_1.less; }
    for (; global_1.distance(first, last) > 1; last = last.prev())
        pop_heap(first, last, comp);
}
exports.sort_heap = sort_heap;
/* ---------------------------------------------------------
    INTERNAL
--------------------------------------------------------- */
/**
 * @hidden
 */
function _Promote_heap(first, topPosition, position, value, comp) {
    for (var parentPosition = (position - 1) >> 1; (position > topPosition) && comp(first.advance(parentPosition).value, value); parentPosition = (position - 1) >> 1) {
        first.advance(position).value = first.advance(parentPosition).value;
        position = parentPosition;
    }
    first.advance(position).value = value;
}
/**
 * @hidden
 */
function _Adjust_heap(first, topPosition, heapSize, position, value, comp) {
    var childPosition = (2 * position) + 2;
    for (; childPosition < heapSize; childPosition = (2 * childPosition) + 2) {
        if (comp(first.advance(childPosition).value, first.advance(childPosition - 1).value))
            --childPosition;
        first.advance(position).value = first.advance(childPosition).value;
        position = childPosition;
    }
    if (childPosition === heapSize) {
        first.advance(position).value = first.advance(childPosition - 1).value;
        position = childPosition - 1;
    }
    _Promote_heap(first, topPosition, position, value, comp);
}
/**
 * @hidden
 */
function _Comp_it(x, y) {
    if (x.base instanceof Function)
        return y < x;
    else
        return x < y;
}
//# sourceMappingURL=heap.js.map

/***/ }),

/***/ "./node_modules/tstl/algorithm/index.js":
/*!**********************************************!*\
  !*** ./node_modules/tstl/algorithm/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

//================================================================ 
/** @module std */
//================================================================
// <algorithm>
//
// @reference http://www.cplusplus.com/reference/algorithm
// @author Jeongho Nam <http://samchon.org>
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./binary_search */ "./node_modules/tstl/algorithm/binary_search.js"));
__export(__webpack_require__(/*! ./heap */ "./node_modules/tstl/algorithm/heap.js"));
__export(__webpack_require__(/*! ./iterations */ "./node_modules/tstl/algorithm/iterations.js"));
__export(__webpack_require__(/*! ./mathematics */ "./node_modules/tstl/algorithm/mathematics.js"));
__export(__webpack_require__(/*! ./modifiers */ "./node_modules/tstl/algorithm/modifiers.js"));
__export(__webpack_require__(/*! ./partition */ "./node_modules/tstl/algorithm/partition.js"));
__export(__webpack_require__(/*! ./random */ "./node_modules/tstl/algorithm/random.js"));
__export(__webpack_require__(/*! ./sorting */ "./node_modules/tstl/algorithm/sorting.js"));
__export(__webpack_require__(/*! ./merge */ "./node_modules/tstl/algorithm/merge.js"));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/tstl/algorithm/iterations.js":
/*!***************************************************!*\
  !*** ./node_modules/tstl/algorithm/iterations.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Pair_1 = __webpack_require__(/*! ../utility/Pair */ "./node_modules/tstl/utility/Pair.js");
var comparators_1 = __webpack_require__(/*! ../functional/comparators */ "./node_modules/tstl/functional/comparators.js");
var global_1 = __webpack_require__(/*! ../iterator/global */ "./node_modules/tstl/iterator/global.js");
/* =========================================================
    ITERATIONS (NON-MODIFYING SEQUENCE)
        - FOR_EACH
        - AGGREGATE CONDITIONS
        - FINDERS
        - COUNTERS
============================================================
    FOR_EACH
--------------------------------------------------------- */
/**
 * Apply a function to elements in range.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param fn The function to apply.
 *
 * @return The function *fn* itself.
 */
function for_each(first, last, fn) {
    for (var it = first; !it.equals(last); it = it.next())
        fn(it.value);
    return fn;
}
exports.for_each = for_each;
/**
 * Apply a function to elements in steps.
 *
 * @param first Input iteartor of the starting position.
 * @param n Steps to maximum advance.
 * @param fn The function to apply.
 *
 * @return Iterator advanced from *first* for *n* steps.
 */
function for_each_n(first, n, fn) {
    for (var i = 0; i < n; ++i) {
        fn(first.value);
        first = first.next();
    }
    return first;
}
exports.for_each_n = for_each_n;
/* ---------------------------------------------------------
    AGGREGATE CONDITIONS
--------------------------------------------------------- */
/**
 * Test whether all elements meet a specific condition.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param pred A function predicates the specific condition.
 *
 * @return Whether the *pred* returns always `true` for all elements.
 */
function all_of(first, last, pred) {
    for (var it = first; !it.equals(last); it = it.next())
        if (pred(it.value) === false)
            return false;
    return true;
}
exports.all_of = all_of;
/**
 * Test whether any element meets a specific condition.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param pred A function predicates the specific condition.
 *
 * @return Whether the *pred* returns at least a `true` for all elements.
 */
function any_of(first, last, pred) {
    for (var it = first; !it.equals(last); it = it.next())
        if (pred(it.value) === true)
            return true;
    return false;
}
exports.any_of = any_of;
/**
 * Test whether any element doesn't meet a specific condition.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param pred A function predicates the specific condition.
 *
 * @return Whether the *pred* doesn't return `true` for all elements.
 */
function none_of(first, last, pred) {
    return !any_of(first, last, pred);
}
exports.none_of = none_of;
function equal(first1, last1, first2, pred) {
    if (pred === void 0) { pred = comparators_1.equal_to; }
    while (!first1.equals(last1))
        if (!pred(first1.value, first2.value))
            return false;
        else {
            first1 = first1.next();
            first2 = first2.next();
        }
    return true;
}
exports.equal = equal;
/**
 * Compare lexicographically.
 *
 * @param first1 Input iteartor of the first position of the 1st range.
 * @param last1 Input iterator of the last position of the 1st range.
 * @param first2 Input iterator of the first position of the 2nd range.
 * @param last2 Input iterator of the last position of the 2nd range.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Whether the 1st range precedes the 2nd.
 */
function lexicographical_compare(first1, last1, first2, last2, comp) {
    if (comp === void 0) { comp = comparators_1.less; }
    while (!first1.equals(last1))
        if (first2.equals(last2) || comp(first2.value, first1.value))
            return false;
        else if (comp(first1.value, first2.value))
            return true;
        else {
            first1 = first1.next();
            first2 = first2.next();
        }
    return !first2.equals(last2);
}
exports.lexicographical_compare = lexicographical_compare;
/* ---------------------------------------------------------
    FINDERS
--------------------------------------------------------- */
/**
 * Find a value in range.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param val The value to find.
 *
 * @return Iterator to the first element {@link equal to equal_to} the value.
 */
function find(first, last, val) {
    return find_if(first, last, function (elem) { return comparators_1.equal_to(elem, val); });
}
exports.find = find;
/**
 * Find a matched condition in range.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param pred A function predicates the specific condition.
 *
 * @return Iterator to the first element *pred* returns `true`.
 */
function find_if(first, last, pred) {
    for (var it = first; !it.equals(last); it = it.next())
        if (pred(it.value))
            return it;
    return last;
}
exports.find_if = find_if;
/**
 * Find a mismatched condition in range.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param pred A function predicates the specific condition.
 *
 * @return Iterator to the first element *pred* returns `false`.
 */
function find_if_not(first, last, pred) {
    return find_if(first, last, function (elem) { return !pred(elem); });
}
exports.find_if_not = find_if_not;
function find_end(first1, last1, first2, last2, pred) {
    if (pred === void 0) { pred = comparators_1.equal_to; }
    if (first2.equals(last2))
        return last1;
    var ret = last1;
    for (; !first1.equals(last1); first1 = first1.next()) {
        var it1 = first1;
        var it2 = first2;
        while (pred(it1.value, it2.value)) {
            it1 = it1.next();
            it2 = it2.next();
            if (it2.equals(last2)) {
                ret = first1;
                break;
            }
            else if (it1.equals(last1))
                return ret;
        }
    }
    return ret;
}
exports.find_end = find_end;
function find_first_of(first1, last1, first2, last2, pred) {
    if (pred === void 0) { pred = comparators_1.equal_to; }
    for (; !first1.equals(last1); first1 = first1.next())
        for (var it = first2; !it.equals(last2); it = it.next())
            if (pred(first1.value, it.value))
                return first1;
    return last1;
}
exports.find_first_of = find_first_of;
/**
 * Find the first adjacent element.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param pred A binary function predicates two arguments are equal. Default is {@link equal_to}.
 *
 * @return Iterator to the first element of adjacent find.
 */
function adjacent_find(first, last, pred) {
    if (pred === void 0) { pred = comparators_1.equal_to; }
    if (!first.equals(last)) {
        var next = first.next();
        while (!next.equals(last)) {
            if (pred(first.value, last.value))
                return first;
            first = first.next();
            next = next.next();
        }
    }
    return last;
}
exports.adjacent_find = adjacent_find;
function search(first1, last1, first2, last2, pred) {
    if (pred === void 0) { pred = comparators_1.equal_to; }
    if (first2.equals(last2))
        return first1;
    for (; !first1.equals(last1); first1 = first1.next()) {
        var it1 = first1;
        var it2 = first2;
        while (pred(it1.value, it2.value)) {
            it1 = it1.next();
            it2 = it2.next();
            if (it2.equals(last2))
                return first1;
            else if (it1.equals(last1))
                return last1;
        }
    }
    return last1;
}
exports.search = search;
/**
 * Search specific and repeated elements.
 *
 * @param first Forward iteartor of the first position.
 * @param last Forward iterator of the last position.
 * @param count Count to be repeated.
 * @param val Value to search.
 * @param pred A binary function predicates two arguments are equal. Default is {@link equal_to}.
 *
 * @return Iterator to the first element of the repetition.
 */
function search_n(first, last, count, val, pred) {
    if (pred === void 0) { pred = comparators_1.equal_to; }
    var limit = global_1.advance(first, global_1.distance(first, last) - count);
    for (; !first.equals(limit); first = first.next()) {
        var it = first;
        var i = 0;
        while (pred(it.value, val)) {
            it = it.next();
            if (++i === count)
                return first;
        }
    }
    return last;
}
exports.search_n = search_n;
function mismatch(first1, last1, first2, pred) {
    if (pred === void 0) { pred = comparators_1.equal_to; }
    while (!first1.equals(last1) && pred(first1.value, first2.value)) {
        first1 = first1.next();
        first2 = first2.next();
    }
    return new Pair_1.Pair(first1, first2);
}
exports.mismatch = mismatch;
/* ---------------------------------------------------------
    COUNTERS
--------------------------------------------------------- */
/**
 * Count matched value in range.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param val The value to count.
 *
 * @return The matched count.
 */
function count(first, last, val) {
    return count_if(first, last, function (elem) { return comparators_1.equal_to(elem, val); });
}
exports.count = count;
/**
 * Count matched condition in range.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param pred A function predicates the specific condition.
 *
 * @return The matched count.
 */
function count_if(first, last, pred) {
    var ret = 0;
    for (var it = first; !it.equals(last); it = it.next())
        if (pred(it.value))
            ++ret;
    return ret;
}
exports.count_if = count_if;
//# sourceMappingURL=iterations.js.map

/***/ }),

/***/ "./node_modules/tstl/algorithm/mathematics.js":
/*!****************************************************!*\
  !*** ./node_modules/tstl/algorithm/mathematics.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Pair_1 = __webpack_require__(/*! ../utility/Pair */ "./node_modules/tstl/utility/Pair.js");
var comparators_1 = __webpack_require__(/*! ../functional/comparators */ "./node_modules/tstl/functional/comparators.js");
var global_1 = __webpack_require__(/*! ../iterator/global */ "./node_modules/tstl/iterator/global.js");
var iterations_1 = __webpack_require__(/*! ./iterations */ "./node_modules/tstl/algorithm/iterations.js");
var modifiers_1 = __webpack_require__(/*! ./modifiers */ "./node_modules/tstl/algorithm/modifiers.js");
/* =========================================================
    MATHMATICS
        - MIN & MAX
        - PERMUTATION
        - MISCELLANEOUS
============================================================
    MIN & MAX
--------------------------------------------------------- */
/**
 * Get the minium value.
 *
 * @param items Items to search through.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return The minimum value.
 */
function min(items, comp) {
    if (comp === void 0) { comp = comparators_1.less; }
    var minimum = items[0];
    for (var i = 1; i < items.length; ++i)
        if (comp(items[i], minimum))
            minimum = items[i];
    return minimum;
}
exports.min = min;
/**
 * Get the maximum value.
 *
 * @param items Items to search through.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return The maximum value.
 */
function max(items, comp) {
    if (comp === void 0) { comp = comparators_1.less; }
    var maximum = items[0];
    for (var i = 1; i < items.length; ++i)
        if (comp(maximum, items[i]))
            maximum = items[i];
    return maximum;
}
exports.max = max;
/**
 * Get the minimum & maximum values.
 *
 * @param items Items to search through.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return A {@link Pair} of minimum & maximum values.
 */
function minmax(items, comp) {
    var minimum = items[0];
    var maximum = items[0];
    for (var i = 1; i < items.length; ++i) {
        if (comp(items[i], minimum))
            minimum = items[i];
        if (comp(maximum, items[i]))
            maximum = items[i];
    }
    return new Pair_1.Pair(minimum, maximum);
}
exports.minmax = minmax;
/**
 * Get the minimum element in range.
 *
 * @param first Forward iterator of the first position.
 * @param last Forward iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Iterator to the minimum element.
 */
function min_element(first, last, comp) {
    if (comp === void 0) { comp = comparators_1.less; }
    var smallest = first;
    first = first.next();
    for (; !first.equals(last); first = first.next())
        if (comp(first.value, smallest.value))
            smallest = first;
    return smallest;
}
exports.min_element = min_element;
/**
 * Get the maximum element in range.
 *
 * @param first Forward iterator of the first position.
 * @param last Forward iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Iterator to the maximum element.
 */
function max_element(first, last, comp) {
    if (comp === void 0) { comp = comparators_1.less; }
    var largest = first;
    first = first.next();
    for (; !first.equals(last); first = first.next())
        if (comp(largest.value, first.value))
            largest = first;
    return largest;
}
exports.max_element = max_element;
/**
 * Get the minimum & maximum elements in range.
 *
 * @param first Forward iterator of the first position.
 * @param last Forward iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return A {@link Pair} of iterators to the minimum & maximum elements.
 */
function minmax_element(first, last, comp) {
    if (comp === void 0) { comp = comparators_1.less; }
    var smallest = first;
    var largest = first;
    first = first.next();
    for (; !first.equals(last); first = first.next()) {
        if (comp(first.value, smallest.value)) // first is less than the smallest.
            smallest = first;
        if (comp(largest.value, first.value)) // first is not less than the largest.
            largest = first;
    }
    return new Pair_1.Pair(smallest, largest);
}
exports.minmax_element = minmax_element;
/**
 * Get the clamp value.
 *
 * @param v The value to clamp.
 * @param lo Lower value than *hi*.
 * @param hi Higher value than *lo*.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return The clamp value.
 */
function clamp(v, lo, hi, comp) {
    if (comp === void 0) { comp = comparators_1.less; }
    return comp(v, lo) ? lo
        : comp(hi, v) ? hi : v;
}
exports.clamp = clamp;
/* ---------------------------------------------------------
    PERMUATATIONS
--------------------------------------------------------- */
/**
 * Test whether two ranges are in permutation relationship.
 *
 * @param first1 Forward iteartor of the first position of the 1st range.
 * @param last1 Forward iterator of the last position of the 1st range.
 * @param first2 Forward iterator of the first position of the 2nd range.
 * @param pred A binary function predicates two arguments are equal. Default is {@link equal_to}.
 *
 * @return Whether permutation or not.
 */
function is_permutation(first1, last1, first2, pred) {
    if (pred === void 0) { pred = comparators_1.equal_to; }
    // find the mismatched
    var pair = iterations_1.mismatch(first1, last1, first2, pred);
    first1 = pair.first;
    first2 = pair.second;
    if (first1.equals(last1))
        return true;
    var last2 = global_1.advance(first2, global_1.distance(first1, last1));
    var _loop_1 = function (it) {
        var lambda = function (val) { return pred(val, it.value); };
        if (iterations_1.find_if(first1, it, lambda).equals(it)) {
            var n = iterations_1.count_if(first2, last2, lambda);
            if (n === 0 || iterations_1.count_if(it, last1, lambda) !== n)
                return { value: false };
        }
    };
    for (var it = first1; !it.equals(last1); it = it.next()) {
        var state_1 = _loop_1(it);
        if (typeof state_1 === "object")
            return state_1.value;
    }
    return true;
}
exports.is_permutation = is_permutation;
/**
 * Transform to the previous permutation.
 *
 * @param first Bidirectional iterator of the first position.
 * @param last Bidirectional iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Whether the transformation was meaningful.
 */
function prev_permutation(first, last, comp) {
    if (comp === void 0) { comp = comparators_1.less; }
    if (first.equals(last) === true)
        return false;
    var i = last.prev();
    if (first.equals(i) === true)
        return false;
    while (true) {
        var x = i;
        var y = void 0;
        i = i.prev();
        if (comp(x.value, i.value) === true) {
            y = last.prev();
            while (comp(y.value, i.value) === false)
                y = y.prev();
            modifiers_1.iter_swap(i, y);
            modifiers_1.reverse(x, last);
            return true;
        }
        if (i.equals(first) === true) {
            modifiers_1.reverse(first, last);
            return false;
        }
    }
}
exports.prev_permutation = prev_permutation;
/**
 * Transform to the next permutation.
 *
 * @param first Bidirectional iterator of the first position.
 * @param last Bidirectional iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Whether the transformation was meaningful.
 */
function next_permutation(first, last, comp) {
    if (comp === void 0) { comp = comparators_1.less; }
    if (first.equals(last) === true)
        return false;
    var i = last.prev();
    if (first.equals(i) === true)
        return false;
    while (true) {
        var x = i;
        var y = void 0;
        i = i.prev();
        if (comp(i.value, x.value) === true) {
            y = last.prev();
            while (comp(i.value, y.value) === false)
                y = y.prev();
            modifiers_1.iter_swap(i, y);
            modifiers_1.reverse(x, last);
            return true;
        }
        if (i.equals(first) === true) {
            modifiers_1.reverse(first, last);
            return false;
        }
    }
}
exports.next_permutation = next_permutation;
//# sourceMappingURL=mathematics.js.map

/***/ }),

/***/ "./node_modules/tstl/algorithm/merge.js":
/*!**********************************************!*\
  !*** ./node_modules/tstl/algorithm/merge.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var comparators_1 = __webpack_require__(/*! ../functional/comparators */ "./node_modules/tstl/functional/comparators.js");
var modifiers_1 = __webpack_require__(/*! ./modifiers */ "./node_modules/tstl/algorithm/modifiers.js");
var factory_1 = __webpack_require__(/*! ../iterator/factory */ "./node_modules/tstl/iterator/factory.js");
var Vector_1 = __webpack_require__(/*! ../container/Vector */ "./node_modules/tstl/container/Vector.js");
/* =========================================================
    MERGE & SET OPERATIONS
        - MERGE
        - SET OPERATION
============================================================
    MERGE
--------------------------------------------------------- */
/**
 * Merge two sorted ranges.
 *
 * @param first1 Input iteartor of the first position of the 1st range.
 * @param last1 Input iterator of the last position of the 1st range.
 * @param first2 Input iterator of the first position of the 2nd range.
 * @param last2 Input iterator of the last position of the 2nd range.
 * @param output Output iterator of the first position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Output Iterator of the last position by advancing.
 */
function merge(first1, last1, first2, last2, output, comp) {
    if (comp === void 0) { comp = comparators_1.less; }
    while (true) {
        if (first1.equals(last1))
            return modifiers_1.copy(first2, last2, output);
        else if (first2.equals(last2))
            return modifiers_1.copy(first1, last1, output);
        if (comp(first1.value, first2.value)) {
            output.value = first1.value;
            first1 = first1.next();
        }
        else {
            output.value = first2.value;
            first2 = first2.next();
        }
        output = output.next();
    }
}
exports.merge = merge;
/**
 * Merge two sorted & consecutive ranges.
 *
 * @param first Bidirectional iterator of the first position.
 * @param middle Bidirectional iterator of the initial position of the 2nd range.
 * @param last Bidirectional iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 */
function inplace_merge(first, middle, last, comp) {
    if (comp === void 0) { comp = comparators_1.less; }
    var vector = new Vector_1.Vector();
    merge(first, middle, middle, last, factory_1.back_inserter(vector), comp);
    modifiers_1.copy(vector.begin(), vector.end(), first);
}
exports.inplace_merge = inplace_merge;
/* ---------------------------------------------------------
    SET OPERATIONS
--------------------------------------------------------- */
/**
 * Test whether two sorted ranges are in inclusion relationship.
 *
 * @param first1 Input iteartor of the first position of the 1st range.
 * @param last1 Input iterator of the last position of the 1st range.
 * @param first2 Input iterator of the first position of the 2nd range.
 * @param last2 Input iterator of the last position of the 2nd range.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Whether [first, last1) includes [first2, last2).
 */
function includes(first1, last1, first2, last2, comp) {
    if (comp === void 0) { comp = comparators_1.less; }
    while (!first2.equals(last2)) {
        if (first1.equals(last1) || comp(first2.value, first1.value))
            return false;
        else if (!comp(first1.value, first2.value))
            first2 = first2.next();
        first1 = first1.next();
    }
    return true;
}
exports.includes = includes;
/**
 * Combine two sorted ranges to union relationship.
 *
 * @param first1 Input iteartor of the first position of the 1st range.
 * @param last1 Input iterator of the last position of the 1st range.
 * @param first2 Input iterator of the first position of the 2nd range.
 * @param last2 Input iterator of the last position of the 2nd range.
 * @param output Output iterator of the first position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Output Iterator of the last position by advancing.
 */
function set_union(first1, last1, first2, last2, output, comp) {
    if (comp === void 0) { comp = comparators_1.less; }
    while (true) {
        if (first1.equals(last1))
            return modifiers_1.copy(first2, last2, output);
        else if (first2.equals(last2))
            return modifiers_1.copy(first1, last1, output);
        if (comp(first1.value, first2.value)) {
            output.value = first1.value;
            first1 = first1.next();
        }
        else if (comp(first2.value, first1.value)) {
            output.value = first2.value;
            first2 = first2.next();
        }
        else { // equals
            output.value = first1.value;
            first1 = first1.next();
            first2 = first2.next();
        }
        output = output.next();
    }
}
exports.set_union = set_union;
/**
 * Combine two sorted ranges to intersection relationship.
 *
 * @param first1 Input iteartor of the first position of the 1st range.
 * @param last1 Input iterator of the last position of the 1st range.
 * @param first2 Input iterator of the first position of the 2nd range.
 * @param last2 Input iterator of the last position of the 2nd range.
 * @param output Output iterator of the first position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Output Iterator of the last position by advancing.
 */
function set_intersection(first1, last1, first2, last2, output, comp) {
    if (comp === void 0) { comp = comparators_1.less; }
    while (true) {
        if (first1.equals(last1))
            return modifiers_1.copy(first2, last2, output);
        else if (first2.equals(last2))
            return modifiers_1.copy(first1, last1, output);
        if (comp(first1.value, first2.value))
            first1 = first1.next();
        else if (comp(first2.value, first1.value))
            first2 = first2.next();
        else { // equals
            output.value = first1.value;
            output = output.next();
            first1 = first1.next();
            first2 = first2.next();
        }
    }
}
exports.set_intersection = set_intersection;
/**
 * Combine two sorted ranges to difference relationship.
 *
 * @param first1 Input iteartor of the first position of the 1st range.
 * @param last1 Input iterator of the last position of the 1st range.
 * @param first2 Input iterator of the first position of the 2nd range.
 * @param last2 Input iterator of the last position of the 2nd range.
 * @param output Output iterator of the first position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Output Iterator of the last position by advancing.
 */
function set_difference(first1, last1, first2, last2, output, comp) {
    if (comp === void 0) { comp = comparators_1.less; }
    while (!first1.equals(last1) && !first2.equals(last2))
        if (comp(first1.value, first2.value)) {
            output.value = first1.value;
            output = output.next();
            first1 = first1.next();
        }
        else if (comp(first2.value, first1.value))
            first2 = first2.next();
        else {
            first1 = first1.next();
            first2 = first2.next();
        }
    return modifiers_1.copy(first1, last1, output);
}
exports.set_difference = set_difference;
/**
 * Combine two sorted ranges to symmetric difference relationship.
 *
 * @param first1 Input iteartor of the first position of the 1st range.
 * @param last1 Input iterator of the last position of the 1st range.
 * @param first2 Input iterator of the first position of the 2nd range.
 * @param last2 Input iterator of the last position of the 2nd range.
 * @param output Output iterator of the first position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Output Iterator of the last position by advancing.
 */
function set_symmetric_difference(first1, last1, first2, last2, output, comp) {
    if (comp === void 0) { comp = comparators_1.less; }
    while (true) {
        if (first1.equals(last1))
            return modifiers_1.copy(first2, last2, output);
        else if (first2.equals(last2))
            return modifiers_1.copy(first1, last1, output);
        if (comp(first1.value, first2.value)) {
            output.value = first1.value;
            output = output.next();
            first1 = first1.next();
        }
        else if (comp(first2.value, first1.value)) {
            output.value = first2.value;
            output = output.next();
            first2 = first2.next();
        }
        else { // equals
            first1 = first1.next();
            first2 = first2.next();
        }
    }
}
exports.set_symmetric_difference = set_symmetric_difference;
//# sourceMappingURL=merge.js.map

/***/ }),

/***/ "./node_modules/tstl/algorithm/modifiers.js":
/*!**************************************************!*\
  !*** ./node_modules/tstl/algorithm/modifiers.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var comparators_1 = __webpack_require__(/*! ../functional/comparators */ "./node_modules/tstl/functional/comparators.js");
var random_1 = __webpack_require__(/*! ./random */ "./node_modules/tstl/algorithm/random.js");
var global_1 = __webpack_require__(/*! ../iterator/global */ "./node_modules/tstl/iterator/global.js");
/* =========================================================
    MODIFIERS (MODIFYING SEQUENCE)
        - FILL
        - REMOVE
        - REPLACE & SWAP
        - RE-ARRANGEMENT
============================================================
    FILL
--------------------------------------------------------- */
/**
 * Copy elements in range.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param output Output iterator of the first position.
 *
 * @return Output Iterator of the last position by advancing.
 */
function copy(first, last, output) {
    for (; !first.equals(last); first = first.next()) {
        output.value = first.value;
        output = output.next();
    }
    return output;
}
exports.copy = copy;
/**
 * Copy *n* elements.
 *
 * @param first Input iteartor of the first position.
 * @param n Number of elements to copy.
 * @param output Output iterator of the first position.
 *
 * @return Output Iterator of the last position by advancing.
 */
function copy_n(first, n, output) {
    for (var i = 0; i < n; ++i) {
        output.value = first.value;
        first = first.next();
        output = output.next();
    }
    return output;
}
exports.copy_n = copy_n;
/**
 * Copy specific elements by a condition.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param output Output iterator of the first position.
 * @param pred A function predicates the specific condition.
 *
 * @return Output Iterator of the last position by advancing.
 */
function copy_if(first, last, output, pred) {
    for (; !first.equals(last); first = first.next()) {
        if (!pred(first.value))
            continue;
        output.value = first.value;
        output = output.next();
    }
    return output;
}
exports.copy_if = copy_if;
/**
 * Copy elements reversely.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param output Output iterator of the first position.
 *
 * @return Output Iterator of the last position by advancing.
 */
function copy_backward(first, last, output) {
    last = last.prev();
    while (!last.equals(first)) {
        last = last.prev();
        output = output.prev();
        output.value = last.value;
    }
    return output;
}
exports.copy_backward = copy_backward;
/**
 * Fill range elements
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param val The value to fill.
 *
 * @return Output Iterator of the last position by advancing.
 */
function fill(first, last, val) {
    for (; !first.equals(last); first = first.next())
        first.value = val;
}
exports.fill = fill;
/**
 * Fill *n* elements.
 *
 * @param first Input iteartor of the first position.
 * @param n Number of elements to fill.
 * @param val The value to fill.
 *
 * @return Output Iterator of the last position by advancing.
 */
function fill_n(first, n, val) {
    for (var i = 0; i < n; ++i) {
        first.value = val;
        first = first.next();
    }
    return first;
}
exports.fill_n = fill_n;
function transform() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (args.length === 4)
        return _Unary_transform.apply(void 0, __spread(args));
    else // args: #5
        return _Binary_transform.apply(void 0, __spread(args));
}
exports.transform = transform;
/**
 * @hidden
 */
function _Unary_transform(first, last, result, op) {
    for (; !first.equals(last); first = first.next()) {
        result.value = op(first.value);
        result = result.next();
    }
    return result;
}
/**
 * @hidden
 */
function _Binary_transform(first1, last1, first2, result, binary_op) {
    while (!first1.equals(last1)) {
        result.value = binary_op(first1.value, first2.value);
        first1 = first1.next();
        first2 = first2.next();
        result = result.next();
    }
    return result;
}
/**
 * Generate range elements.
 *
 * @param first Forward iteartor of the first position.
 * @param last Forward iterator of the last position.
 * @param gen The generator function.
 */
function generate(first, last, gen) {
    for (; !first.equals(last); first = first.next())
        first.value = gen();
}
exports.generate = generate;
/**
 * Generate *n* elements.
 *
 * @param first Forward iteartor of the first position.
 * @param n Number of elements to generate.
 * @param gen The generator function.
 *
 * @return Forward Iterator to the last position by advancing.
 */
function generate_n(first, n, gen) {
    while (n-- > 0) {
        first.value = gen();
        first = first.next();
    }
    return first;
}
exports.generate_n = generate_n;
/* ---------------------------------------------------------
    REMOVE
--------------------------------------------------------- */
/**
 * Remove duplicated elements in sorted range.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param pred A binary function predicates two arguments are equal. Default is {@link equal_to}.
 *
 * @return Input iterator to the last element not removed.
 */
function unique(first, last, pred) {
    if (pred === void 0) { pred = comparators_1.equal_to; }
    if (first.equals(last))
        return last;
    var ret = first;
    for (first = first.next(); !first.equals(last); first = first.next())
        if (!pred(ret.value, first.value)) {
            ret = ret.next();
            ret.value = first.value;
        }
    return ret.next();
}
exports.unique = unique;
/**
 * Copy elements in range without duplicates.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param output Output iterator of the last position.
 * @param pred A binary function predicates two arguments are equal. Default is {@link equal_to}.
 *
 * @return Output Iterator of the last position by advancing.
 */
function unique_copy(first, last, output, pred) {
    if (pred === void 0) { pred = comparators_1.equal_to; }
    if (first.equals(last))
        return output;
    output.value = first.value;
    first = first.next();
    for (; !first.equals(last); first = first.next())
        if (!pred(first.value, output.value)) {
            output = output.next();
            output.value = first.value;
        }
    return output.next();
}
exports.unique_copy = unique_copy;
/**
 * Remove specific value in range.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param val The specific value to remove.
 *
 * @return Iterator tho the last element not removed.
 */
function remove(first, last, val) {
    return remove_if(first, last, function (elem) { return comparators_1.equal_to(elem, val); });
}
exports.remove = remove;
/**
 * Remove elements in range by a condition.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param pred An unary function predicates remove.
 *
 * @return Iterator tho the last element not removed.
 */
function remove_if(first, last, pred) {
    var ret = first;
    while (!first.equals(last)) {
        if (!pred(first.value)) {
            ret.value = first.value;
            ret = ret.next();
        }
        first = first.next();
    }
    return ret;
}
exports.remove_if = remove_if;
/**
 * Copy range removing specific value.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param output Output iterator of the last position.
 * @param val The condition predicates remove.
 *
 * @return Output Iterator of the last position by advancing.
 */
function remove_copy(first, last, output, val) {
    return remove_copy_if(first, last, output, function (elem) { return comparators_1.equal_to(elem, val); });
}
exports.remove_copy = remove_copy;
/**
 * Copy range removing elements by a condition.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param output Output iterator of the last position.
 * @param pred An unary function predicates remove.
 *
 * @return Output Iterator of the last position by advancing.
 */
function remove_copy_if(first, last, output, pred) {
    for (; !first.equals(last); first = first.next()) {
        if (pred(first.value))
            continue;
        output.value = first.value;
        output = output.next();
    }
    return output;
}
exports.remove_copy_if = remove_copy_if;
/* ---------------------------------------------------------
    REPLACE & SWAP
--------------------------------------------------------- */
/**
 * Replace specific value in range.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param old_val Specific value to change
 * @param new_val Specific value to be changed.
 */
function replace(first, last, old_val, new_val) {
    return replace_if(first, last, function (elem) { return comparators_1.equal_to(elem, old_val); }, new_val);
}
exports.replace = replace;
/**
 * Replace specific condition in range.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param pred An unary function predicates the change.
 * @param new_val Specific value to be changed.
 */
function replace_if(first, last, pred, new_val) {
    for (var it = first; !it.equals(last); it = it.next())
        if (pred(it.value) === true)
            it.value = new_val;
}
exports.replace_if = replace_if;
/**
 * Copy range replacing specific value.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param output Output iterator of the first position.
 * @param old_val Specific value to change
 * @param new_val Specific value to be changed.
 *
 * @return Output Iterator of the last position by advancing.
 */
function replace_copy(first, last, output, old_val, new_val) {
    return replace_copy_if(first, last, output, function (elem) { return comparators_1.equal_to(elem, old_val); }, new_val);
}
exports.replace_copy = replace_copy;
/**
 * Copy range replacing specfic condition.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param output Output iterator of the first position.
 * @param pred An unary function predicates the change.
 * @param new_val Specific value to be changed.
 *
 * @return Output Iterator of the last position by advancing.
 */
function replace_copy_if(first, last, result, pred, new_val) {
    for (; !first.equals(last); first = first.next()) {
        if (pred(first.value))
            result.value = new_val;
        else
            result.value = first.value;
        result = result.next();
    }
    return result;
}
exports.replace_copy_if = replace_copy_if;
/**
 * Swap values of two iterators.
 *
 * @param x Forward iterator to swap its value.
 * @param y Forward iterator to swap its value.
 */
function iter_swap(x, y) {
    var _a;
    _a = __read([y.value, x.value], 2), x.value = _a[0], y.value = _a[1];
}
exports.iter_swap = iter_swap;
/**
 * Swap values of two ranges.
 *
 * @param first1 Forward iteartor of the first position of the 1st range.
 * @param last1 Forward iterator of the last position of the 1st range.
 * @param first2 Forward iterator of the first position of the 2nd range.
 *
 * @return Forward Iterator of the last position of the 2nd range by advancing.
 */
function swap_ranges(first1, last1, first2) {
    for (; !first1.equals(last1); first1 = first1.next()) {
        iter_swap(first1, first2);
        first2 = first2.next();
    }
    return first2;
}
exports.swap_ranges = swap_ranges;
/* ---------------------------------------------------------
    RE-ARRANGEMENT
--------------------------------------------------------- */
/**
 * Reverse elements in range.
 *
 * @param first Bidirectional iterator of the first position.
 * @param last Bidirectional iterator of the last position.
 */
function reverse(first, last) {
    // first !== last && first !== --last
    while (first.equals(last) === false && first.equals((last = last.prev())) === false) {
        iter_swap(first, last);
        first = first.next();
    }
}
exports.reverse = reverse;
/**
 * Copy reversed elements in range.
 *
 * @param first Bidirectional iterator of the first position.
 * @param last Bidirectional iterator of the last position.
 * @param output Output iterator of the first position.
 *
 * @return Output Iterator of the last position by advancing.
 */
function reverse_copy(first, last, output) {
    while (!last.equals(first)) {
        last = last.prev();
        output.value = last.value;
        output = output.next();
    }
    return output;
}
exports.reverse_copy = reverse_copy;
function shift_left(first, last, n) {
    var mid = global_1.advance(first, n);
    return copy(mid, last, first);
}
exports.shift_left = shift_left;
function shift_right(first, last, n) {
    var mid = global_1.advance(last, -n);
    return copy_backward(first, mid, last);
}
exports.shift_right = shift_right;
/**
 * Rotate elements in range.
 *
 * @param first Input iteartor of the first position.
 * @param middle Input iteartor of the initial position of the right side.
 * @param last Input iteartor of the last position.
 *
 * @return Input iterator of the final position in the left side; *middle*.
 */
function rotate(first, middle, last) {
    while (!first.equals(middle) && !middle.equals(last)) {
        iter_swap(first, middle);
        first = first.next();
        middle = middle.next();
    }
    return first;
}
exports.rotate = rotate;
/**
 * Copy rotated elements in range.
 *
 * @param first Input iteartor of the first position.
 * @param middle Input iteartor of the initial position of the right side.
 * @param last Input iteartor of the last position.
 * @param output Output iterator of the last position.
 *
 * @return Output Iterator of the last position by advancing.
 */
function rotate_copy(first, middle, last, output) {
    output = copy(middle, last, output);
    return copy(first, middle, output);
}
exports.rotate_copy = rotate_copy;
/**
 * Shuffle elements in range.
 *
 * @param first Random access iteartor of the first position.
 * @param last Random access iteartor of the last position.
 */
function shuffle(first, last) {
    for (var it = first; !it.equals(last); it = it.next()) {
        var rand_index = random_1.randint(first.index(), last.index() - 1);
        iter_swap(it, first.advance(rand_index));
    }
}
exports.shuffle = shuffle;
//# sourceMappingURL=modifiers.js.map

/***/ }),

/***/ "./node_modules/tstl/algorithm/partition.js":
/*!**************************************************!*\
  !*** ./node_modules/tstl/algorithm/partition.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Pair_1 = __webpack_require__(/*! ../utility/Pair */ "./node_modules/tstl/utility/Pair.js");
var modifiers_1 = __webpack_require__(/*! ./modifiers */ "./node_modules/tstl/algorithm/modifiers.js");
var global_1 = __webpack_require__(/*! ../iterator/global */ "./node_modules/tstl/iterator/global.js");
/* =========================================================
    PARTITION
========================================================= */
/**
 * Test whether a range is partitioned.
 *
 * @param first Forward iterator of the first position.
 * @param last Forward iterator of the last position.
 * @param pred An unary function predicates partition. Returns `true`, if an element belongs to the first section, otherwise `false` which means the element belongs to the second section.
 *
 * @return Whether the range is partition or not.
 */
function is_partitioned(first, last, pred) {
    while (!first.equals(last) && pred(first.value))
        first = first.next();
    for (; !first.equals(last); first = first.next())
        if (pred(first.value))
            return false;
    return true;
}
exports.is_partitioned = is_partitioned;
/**
 * Get partition point.
 *
 * @param first Forward iterator of the first position.
 * @param last Forward iterator of the last position.
 * @param pred An unary function predicates partition. Returns `true`, if an element belongs to the first section, otherwise `false` which means the element belongs to the second section.
 *
 * @return Iterator to the first element of the second section.
 */
function partition_point(first, last, pred) {
    var n = global_1.distance(first, last);
    while (n > 0) {
        var step = Math.floor(n / 2);
        var it = global_1.advance(first, step);
        if (pred(it.value)) {
            first = it.next();
            n -= step + 1;
        }
        else
            n = step;
    }
    return first;
}
exports.partition_point = partition_point;
/**
 * Partition a range into two sections.
 *
 * @param first Bidirectional iterator of the first position.
 * @param last Bidirectional iterator of the last position.
 * @param pred An unary function predicates partition. Returns `true`, if an element belongs to the first section, otherwise `false` which means the element belongs to the second section.
 *
 * @return Iterator to the first element of the second section.
 */
function partition(first, last, pred) {
    return stable_partition(first, last, pred);
}
exports.partition = partition;
/**
 * Partition a range into two sections with stable ordering.
 *
 * @param first Bidirectional iterator of the first position.
 * @param last Bidirectional iterator of the last position.
 * @param pred An unary function predicates partition. Returns `true`, if an element belongs to the first section, otherwise `false` which means the element belongs to the second section.
 *
 * @return Iterator to the first element of the second section.
 */
function stable_partition(first, last, pred) {
    while (!first.equals(last) && pred(first.value)) {
        while (pred(first.value)) {
            first = first.next();
            if (first.equals(last))
                return first;
        }
        do {
            last = last.prev();
            if (first.equals(last))
                return first;
        } while (!pred(last.value));
        modifiers_1.iter_swap(first, last);
        first = first.next();
    }
    return last;
}
exports.stable_partition = stable_partition;
/**
 * Partition a range into two outputs.
 *
 * @param first Bidirectional iterator of the first position.
 * @param last Bidirectional iterator of the last position.
 * @param output_true Output iterator to the first position for the first section.
 * @param output_false Output iterator to the first position for the second section.
 * @param pred An unary function predicates partition. Returns `true`, if an element belongs to the first section, otherwise `false` which means the element belongs to the second section.
 *
 * @return Iterator to the first element of the second section.
 */
function partition_copy(first, last, output_true, output_false, pred) {
    for (; !first.equals(last); first = first.next())
        if (pred(first.value)) {
            output_true.value = first.value;
            output_true = output_true.next();
        }
        else {
            output_false.value = first.value;
            output_false = output_false.next();
        }
    return new Pair_1.Pair(output_true, output_false);
}
exports.partition_copy = partition_copy;
//# sourceMappingURL=partition.js.map

/***/ }),

/***/ "./node_modules/tstl/algorithm/random.js":
/*!***********************************************!*\
  !*** ./node_modules/tstl/algorithm/random.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sorting_1 = __webpack_require__(/*! ./sorting */ "./node_modules/tstl/algorithm/sorting.js");
var global_1 = __webpack_require__(/*! ../iterator/global */ "./node_modules/tstl/iterator/global.js");
var factory_1 = __webpack_require__(/*! ../iterator/factory */ "./node_modules/tstl/iterator/factory.js");
/**
 * Generate random integer.
 *
 * @param x Minimum value.
 * @param y Maximum value.
 *
 * @return A random integer between [x, y].
 */
function randint(x, y) {
    var rand = Math.random() * (y - x + 1);
    return Math.floor(rand) + x;
}
exports.randint = randint;
/**
 * Pick sample elements up.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param output Output iterator of the first position.
 * @param n Number of elements to pick up.
 *
 * @return Output Iterator of the last position by advancing.
 */
function sample(first, last, output, n) {
    var e_1, _a;
    // GENERATE REMAINDERS
    var step = global_1.distance(first, last);
    var remainders = [];
    for (var i = 0; i < step; ++i)
        remainders.push(i);
    //----
    // CONSTRUCT INDEXES
    //----
    var advances = [];
    n = Math.min(n, step);
    // PICK SAMPLE INDEXES
    for (var i = 0; i < n; ++i) {
        var idx = randint(0, remainders.length - 1);
        advances.push(remainders.splice(idx, 1)[0]);
    }
    sorting_1.sort(factory_1.begin(advances), factory_1.end(advances));
    // CHANGE INDEXES TO ADVANCES
    for (var i = n - 1; i >= 1; --i)
        advances[i] -= advances[i - 1];
    try {
        //----
        // FILL SAMPLES
        //----
        for (var advances_1 = __values(advances), advances_1_1 = advances_1.next(); !advances_1_1.done; advances_1_1 = advances_1.next()) {
            var adv = advances_1_1.value;
            first = global_1.advance(first, adv);
            output.value = first.value;
            output = output.next();
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (advances_1_1 && !advances_1_1.done && (_a = advances_1.return)) _a.call(advances_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return output;
}
exports.sample = sample;
//# sourceMappingURL=random.js.map

/***/ }),

/***/ "./node_modules/tstl/algorithm/sorting.js":
/*!************************************************!*\
  !*** ./node_modules/tstl/algorithm/sorting.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var comparators_1 = __webpack_require__(/*! ../functional/comparators */ "./node_modules/tstl/functional/comparators.js");
var modifiers_1 = __webpack_require__(/*! ./modifiers */ "./node_modules/tstl/algorithm/modifiers.js");
var global_1 = __webpack_require__(/*! ../iterator/global */ "./node_modules/tstl/iterator/global.js");
var Vector_1 = __webpack_require__(/*! ../container/Vector */ "./node_modules/tstl/container/Vector.js");
/* =========================================================
    SORTINGS
        - SORT
        - INSPECTOR
        - BACKGROUND
============================================================
    SORT
--------------------------------------------------------- */
/**
 * Sort elements in range.
 *
 * @param first Random access iterator of the first position.
 * @param last Random access iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 */
function sort(first, last, comp) {
    if (comp === void 0) { comp = comparators_1.less; }
    var size = last.index() - first.index();
    if (size <= 0)
        return;
    var pivot_it = first.advance(Math.floor(size / 2));
    var pivot = pivot_it.value;
    if (pivot_it.index() !== first.index())
        modifiers_1.iter_swap(first, pivot_it);
    var i = 1;
    for (var j = 1; j < size; ++j) {
        var j_it = first.advance(j);
        if (comp(j_it.value, pivot)) {
            modifiers_1.iter_swap(j_it, first.advance(i));
            ++i;
        }
    }
    modifiers_1.iter_swap(first, first.advance(i - 1));
    sort(first, first.advance(i - 1), comp);
    sort(first.advance(i), last, comp);
}
exports.sort = sort;
/**
 * Sort elements in range stably.
 *
 * @param first Random access iterator of the first position.
 * @param last Random access iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 */
function stable_sort(first, last, comp) {
    if (comp === void 0) { comp = comparators_1.less; }
    var ramda = function (x, y) {
        return comp(x, y) && !comp(y, x);
    };
    sort(first, last, ramda);
}
exports.stable_sort = stable_sort;
/**
 * Sort elements in range partially.
 *
 * @param first Random access iterator of the first position.
 * @param middle Random access iterator of the middle position between [first, last). Elements only in [first, middle) are fully sorted.
 * @param last Random access iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 */
function partial_sort(first, middle, last, comp) {
    if (comp === void 0) { comp = comparators_1.less; }
    for (var i = first; !i.equals(middle); i = i.next()) {
        var min = i;
        for (var j = i.next(); !j.equals(last); j = j.next())
            if (comp(j.value, min.value))
                min = j;
        if (!i.equals(min))
            modifiers_1.iter_swap(i, min);
    }
}
exports.partial_sort = partial_sort;
/**
 * Copy elements in range with partial sort.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param output_first Output iterator of the first position.
 * @param output_last Output iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Output Iterator of the last position by advancing.
 */
function partial_sort_copy(first, last, output_first, output_last, comp) {
    if (comp === void 0) { comp = comparators_1.less; }
    var input_size = global_1.distance(first, last);
    var result_size = global_1.distance(output_first, output_last);
    var vector = new Vector_1.Vector(first, last);
    sort(vector.begin(), vector.end(), comp);
    if (input_size > result_size)
        output_first = modifiers_1.copy(vector.begin(), vector.begin().advance(result_size), output_first);
    else
        output_first = modifiers_1.copy(vector.begin(), vector.end(), output_first);
    return output_first;
}
exports.partial_sort_copy = partial_sort_copy;
/**
 * Rearrange for the n'th element.
 *
 * @param first Random access iterator of the first position.
 * @param nth Random access iterator the n'th position.
 * @param last Random access iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 */
function nth_element(first, nth, last, comp) {
    if (comp === void 0) { comp = comparators_1.less; }
    var n = global_1.distance(first, nth);
    for (var i = first; !i.equals(last); i = i.next()) {
        var count = 0;
        for (var j = first; !j.equals(last); j = j.next())
            if (i.equals(j))
                continue;
            else if (comp(i.value, j.value) && ++count > n)
                break;
        if (count === n) {
            modifiers_1.iter_swap(nth, i);
            return;
        }
    }
}
exports.nth_element = nth_element;
/* ---------------------------------------------------------
    INSPECTOR
--------------------------------------------------------- */
/**
 * Test whether a range is sorted.
 *
 * @param first Input iterator of the first position.
 * @param last Input iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Whether sorted or not.
 */
function is_sorted(first, last, comp) {
    if (comp === void 0) { comp = comparators_1.less; }
    if (first.equals(last))
        return true;
    for (var next = first.next(); !next.equals(last); next = next.next()) {
        if (!(comparators_1.equal_to(next.value, first.value) || comp(first.value, next.value)))
            return false;
        first = first.next();
    }
    return true;
}
exports.is_sorted = is_sorted;
/**
 * Find the first unsorted element in range.
 *
 * @param first Input iterator of the first position.
 * @param last Input iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Iterator to the first element who violates the order.
 */
function is_sorted_until(first, last, comp) {
    if (comp === void 0) { comp = comparators_1.less; }
    if (first.equals(last))
        return first;
    for (var next = first.next(); !next.equals(last); next = next.next()) {
        if (!(comparators_1.equal_to(next.value, first.value) || comp(first.value, next.value)))
            return next;
        first = first.next();
    }
    return last;
}
exports.is_sorted_until = is_sorted_until;
//# sourceMappingURL=sorting.js.map

/***/ }),

/***/ "./node_modules/tstl/base/ErrorInstance.js":
/*!*************************************************!*\
  !*** ./node_modules/tstl/base/ErrorInstance.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Base class for error instances.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var ErrorInstance = /** @class */ (function () {
    function ErrorInstance(val, category) {
        if (val === void 0) { val = 0; }
        if (category === void 0) { category = null; }
        this.assign(val, category);
    }
    /**
     * Assign content.
     *
     * @param val Identifier of an error condition.
     * @param category An error category instance.
     */
    ErrorInstance.prototype.assign = function (val, category) {
        this.category_ = category;
        this.value_ = val;
    };
    /**
     * Clear content.
     */
    ErrorInstance.prototype.clear = function () {
        this.value_ = 0;
    };
    /* ---------------------------------------------------------
        ACCESSORS
    --------------------------------------------------------- */
    /**
     * Get category.
     *
     * @return The category object.
     */
    ErrorInstance.prototype.category = function () {
        return this.category_;
    };
    /**
     * Get value, the identifier.
     *
     * @return The value, identifier of this object.
     */
    ErrorInstance.prototype.value = function () {
        return this.value_;
    };
    /**
     * Get message.
     *
     * @return The message.
     */
    ErrorInstance.prototype.message = function () {
        return this.category_.message(this.value_);
    };
    /* ---------------------------------------------------------
        OPERATORS
    --------------------------------------------------------- */
    /**
     * Covert bo bool.
     *
     * @return Whether the {@link value} is not zero.
     */
    ErrorInstance.prototype.to_bool = function () {
        return this.value_ !== 0;
    };
    return ErrorInstance;
}());
exports.ErrorInstance = ErrorInstance;
//# sourceMappingURL=ErrorInstance.js.map

/***/ }),

/***/ "./node_modules/tstl/base/Global.js":
/*!******************************************!*\
  !*** ./node_modules/tstl/base/Global.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std.base */
//================================================================
var node_1 = __webpack_require__(/*! ../utility/node */ "./node_modules/tstl/utility/node.js");
/**
 * @hidden
 */
function _Get_root() {
    if (__s_pRoot === null) {
        __s_pRoot = (node_1.is_node() ? global : self);
        if (__s_pRoot.__s_iUID === undefined)
            __s_pRoot.__s_iUID = 0;
    }
    return __s_pRoot;
}
exports._Get_root = _Get_root;
/**
 * @hidden
 */
var __s_pRoot = null;
//# sourceMappingURL=Global.js.map

/***/ }),

/***/ "./node_modules/tstl/base/container/AdaptorContainer.js":
/*!**************************************************************!*\
  !*** ./node_modules/tstl/base/container/AdaptorContainer.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Base class for Adaptor Containers.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var AdaptorContainer = /** @class */ (function () {
    function AdaptorContainer() {
    }
    /* ---------------------------------------------------------
        ACCESSORS
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    AdaptorContainer.prototype.size = function () {
        return this.source_.size();
    };
    /**
     * @inheritDoc
     */
    AdaptorContainer.prototype.empty = function () {
        return this.source_.empty();
    };
    /* ---------------------------------------------------------
        ELEMENTS I/O
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    AdaptorContainer.prototype.push = function () {
        var elems = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            elems[_i] = arguments[_i];
        }
        var _a;
        return (_a = this.source_).push.apply(_a, __spread(elems));
    };
    /**
     * Swap elements.
     *
     * @param obj Target container to swap.
     */
    AdaptorContainer.prototype.swap = function (obj) {
        var _a;
        _a = __read([obj.source_, this.source_], 2), this.source_ = _a[0], obj.source_ = _a[1];
    };
    return AdaptorContainer;
}());
exports.AdaptorContainer = AdaptorContainer;
//# sourceMappingURL=AdaptorContainer.js.map

/***/ }),

/***/ "./node_modules/tstl/base/container/ArrayContainer.js":
/*!************************************************************!*\
  !*** ./node_modules/tstl/base/container/ArrayContainer.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std.base */
//================================================================
var Container_1 = __webpack_require__(/*! ./Container */ "./node_modules/tstl/base/container/Container.js");
var ArrayIterator_1 = __webpack_require__(/*! ../iterator/ArrayIterator */ "./node_modules/tstl/base/iterator/ArrayIterator.js");
var _Repeater_1 = __webpack_require__(/*! ../iterator/_Repeater */ "./node_modules/tstl/base/iterator/_Repeater.js");
var LogicError_1 = __webpack_require__(/*! ../../exception/LogicError */ "./node_modules/tstl/exception/LogicError.js");
var RuntimeError_1 = __webpack_require__(/*! ../../exception/RuntimeError */ "./node_modules/tstl/exception/RuntimeError.js");
/**
 * Base array container.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var ArrayContainer = /** @class */ (function (_super) {
    __extends(ArrayContainer, _super);
    function ArrayContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* =========================================================
        ACCESSORS
            - ITERATORS
            - INDEXES
    ============================================================
        ITERATORS
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    ArrayContainer.prototype.begin = function () {
        return new ArrayIterator_1.ArrayIterator(this, 0);
    };
    /**
     * @inheritDoc
     */
    ArrayContainer.prototype.end = function () {
        return new ArrayIterator_1.ArrayIterator(this, this.size());
    };
    ArrayContainer.prototype.front = function (val) {
        if (arguments.length === 0)
            return this.at(0);
        else
            this.set(0, val);
    };
    ArrayContainer.prototype.back = function (val) {
        var index = this.size() - 1;
        if (arguments.length === 0)
            return this.at(index);
        else
            this.set(index, val);
    };
    ArrayContainer.prototype.insert = function (pos) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        // VALIDATION
        if (pos.source() !== this)
            throw new LogicError_1.InvalidArgument("Parametric iterator is not this container's own.");
        else if (pos.index() < 0)
            throw new LogicError_1.LengthError("Parametric iterator is directing invalid position.");
        else if (pos.index() > this.size())
            pos = this.end();
        // BRANCHES
        if (args.length === 1)
            return this._Insert_by_repeating_val(pos, 1, args[0]);
        else if (args.length === 2 && typeof args[0] === "number")
            return this._Insert_by_repeating_val(pos, args[0], args[1]);
        else
            return this._Insert_by_range(pos, args[0], args[1]);
    };
    /**
     * @hidden
     */
    ArrayContainer.prototype._Insert_by_repeating_val = function (position, n, val) {
        var first = new _Repeater_1._Repeater(0, val);
        var last = new _Repeater_1._Repeater(n);
        return this._Insert_by_range(position, first, last);
    };
    ArrayContainer.prototype.erase = function (first, last) {
        if (last === void 0) { last = first.next(); }
        // VALIDATION
        if (first.source() !== this || last.source() !== this)
            throw new LogicError_1.InvalidArgument("Parametric iterator is not this container's own.");
        else if (first.index() < 0)
            throw new LogicError_1.LengthError("Invalid parameter: first is directing negative index.");
        // ADJUSTMENTS
        if (first.index() >= this.size())
            return this.end();
        else if (first.index() > last.index())
            throw new RuntimeError_1.RangeError("Invalid range. Paramter first is greater than last.");
        // ERASE ELEMENTS
        return this._Erase_by_range(first, last);
    };
    return ArrayContainer;
}(Container_1.Container));
exports.ArrayContainer = ArrayContainer;
//# sourceMappingURL=ArrayContainer.js.map

/***/ }),

/***/ "./node_modules/tstl/base/container/Container.js":
/*!*******************************************************!*\
  !*** ./node_modules/tstl/base/container/Container.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ForOfAdaptor_1 = __webpack_require__(/*! ../iterator/ForOfAdaptor */ "./node_modules/tstl/base/iterator/ForOfAdaptor.js");
/**
 * Basic container.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var Container = /** @class */ (function () {
    function Container() {
    }
    /**
     * @inheritDoc
     */
    Container.prototype.clear = function () {
        this.erase(this.begin(), this.end());
    };
    /**
     * @inheritDoc
     */
    Container.prototype.empty = function () {
        return this.size() === 0;
    };
    /**
     * @inheritDoc
     */
    Container.prototype.rbegin = function () {
        return this.end().reverse();
    };
    /**
     * @inheritDoc
     */
    Container.prototype.rend = function () {
        return this.begin().reverse();
    };
    /**
     * @inheritDoc
     */
    Container.prototype[Symbol.iterator] = function () {
        return new ForOfAdaptor_1.ForOfAdaptor(this.begin(), this.end());
    };
    /**
     * @inheritDoc
     */
    Container.prototype.toJSON = function () {
        var e_1, _a;
        var ret = [];
        try {
            for (var _b = __values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
                var elem = _c.value;
                ret.push(elem);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return ret;
    };
    return Container;
}());
exports.Container = Container;
//# sourceMappingURL=Container.js.map

/***/ }),

/***/ "./node_modules/tstl/base/container/ListContainer.js":
/*!***********************************************************!*\
  !*** ./node_modules/tstl/base/container/ListContainer.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = __webpack_require__(/*! ./Container */ "./node_modules/tstl/base/container/Container.js");
var ListIterator_1 = __webpack_require__(/*! ../iterator/ListIterator */ "./node_modules/tstl/base/iterator/ListIterator.js");
var _Repeater_1 = __webpack_require__(/*! ../iterator/_Repeater */ "./node_modules/tstl/base/iterator/_Repeater.js");
var _NativeArrayIterator_1 = __webpack_require__(/*! ../iterator/_NativeArrayIterator */ "./node_modules/tstl/base/iterator/_NativeArrayIterator.js");
var LogicError_1 = __webpack_require__(/*! ../../exception/LogicError */ "./node_modules/tstl/exception/LogicError.js");
var global_1 = __webpack_require__(/*! ../../iterator/global */ "./node_modules/tstl/iterator/global.js");
/**
 * Basic List Container.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var ListContainer = /** @class */ (function (_super) {
    __extends(ListContainer, _super);
    /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
    /**
     * Default Constructor.
     */
    function ListContainer() {
        var _this = _super.call(this) || this;
        // INIT MEMBERS
        _this.end_ = _this._Create_iterator(null, null);
        _this.clear();
        return _this;
    }
    ListContainer.prototype.assign = function (par1, par2) {
        this.clear();
        this.insert(this.end(), par1, par2);
    };
    /**
     * @inheritDoc
     */
    ListContainer.prototype.clear = function () {
        // DISCONNECT NODES
        ListIterator_1.ListIterator._Set_prev(this.end_, this.end_);
        ListIterator_1.ListIterator._Set_next(this.end_, this.end_);
        // RE-SIZE -> 0
        this.begin_ = this.end_;
        this.size_ = 0;
    };
    /**
     * @inheritDoc
     */
    ListContainer.prototype.resize = function (n) {
        var expansion = n - this.size();
        if (expansion > 0)
            this.insert(this.end(), expansion, undefined);
        else if (expansion < 0)
            this.erase(global_1.advance(this.end(), -expansion), this.end());
    };
    /* ---------------------------------------------------------
        ACCESSORS
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    ListContainer.prototype.begin = function () {
        return this.begin_;
    };
    /**
     * @inheritDoc
     */
    ListContainer.prototype.end = function () {
        return this.end_;
    };
    /**
     * @inheritDoc
     */
    ListContainer.prototype.size = function () {
        return this.size_;
    };
    /* =========================================================
        ELEMENTS I/O
            - PUSH & POP
            - INSERT
            - ERASE
            - POST-PROCESS
    ============================================================
                PUSH & POP
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    ListContainer.prototype.push_front = function (val) {
        this.insert(this.begin_, val);
    };
    /**
     * @inheritDoc
     */
    ListContainer.prototype.push_back = function (val) {
        this.insert(this.end_, val);
    };
    /**
     * @inheritDoc
     */
    ListContainer.prototype.pop_front = function () {
        this.erase(this.begin_);
    };
    /**
     * @inheritDoc
     */
    ListContainer.prototype.pop_back = function () {
        this.erase(this.end_.prev());
    };
    /* ---------------------------------------------------------
        INSERT
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    ListContainer.prototype.push = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        if (items.length === 0)
            return this.size();
        // INSERT BY RANGE
        var first = new _NativeArrayIterator_1._NativeArrayIterator(items, 0);
        var last = new _NativeArrayIterator_1._NativeArrayIterator(items, items.length);
        this._Insert_by_range(this.end(), first, last);
        // RETURN SIZE
        return this.size();
    };
    ListContainer.prototype.insert = function (pos) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        // VALIDATION
        if (pos.source() !== this.end_.source())
            throw new LogicError_1.InvalidArgument("Parametric iterator is not this container's own.");
        // BRANCHES
        if (args.length === 1)
            return this._Insert_by_repeating_val(pos, 1, args[0]);
        else if (args.length === 2 && typeof args[0] === "number")
            return this._Insert_by_repeating_val(pos, args[0], args[1]);
        else
            return this._Insert_by_range(pos, args[0], args[1]);
    };
    /**
     * @hidden
     */
    ListContainer.prototype._Insert_by_repeating_val = function (position, n, val) {
        var first = new _Repeater_1._Repeater(0, val);
        var last = new _Repeater_1._Repeater(n);
        return this._Insert_by_range(position, first, last);
    };
    /**
     * @hidden
     */
    ListContainer.prototype._Insert_by_range = function (position, begin, end) {
        var prev = position.prev();
        var first = null;
        var size = 0;
        for (var it = begin; it.equals(end) === false; it = it.next()) {
            // CONSTRUCT ITEM, THE NEW ELEMENT
            var item = this._Create_iterator(prev, null, it.value);
            if (size === 0)
                first = item;
            // PLACE ITEM ON THE NEXT OF "PREV"
            ListIterator_1.ListIterator._Set_next(prev, item);
            // SHIFT CURRENT ITEM TO PREVIOUS
            prev = item;
            ++size;
        }
        // WILL FIRST BE THE BEGIN?
        if (position.equals(this.begin()) === true)
            this.begin_ = (first);
        // CONNECT BETWEEN LAST AND POSITION
        ListIterator_1.ListIterator._Set_next(prev, position);
        ListIterator_1.ListIterator._Set_prev(position, prev);
        this.size_ += size;
        return first;
    };
    ListContainer.prototype.erase = function (first, last) {
        if (last === void 0) { last = first.next(); }
        return this._Erase_by_range(first, last);
    };
    /**
     * @hidden
     */
    ListContainer.prototype._Erase_by_range = function (first, last) {
        // VALIDATION
        if (first.source() !== this.end_.source() || last.source() !== this.end_.source())
            throw new LogicError_1.InvalidArgument("Parametric iterator is not this container's own.");
        // FIND PREV AND NEXT
        var prev = first.prev();
        var size = global_1.distance(first, last);
        // SHRINK
        ListIterator_1.ListIterator._Set_next(prev, last);
        ListIterator_1.ListIterator._Set_prev(last, prev);
        this.size_ -= size;
        if (first.equals(this.begin_))
            this.begin_ = (last);
        return last;
    };
    /* ---------------------------------------------------------
        SWAP
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    ListContainer.prototype.swap = function (obj) {
        var _a, _b, _c;
        _a = __read([obj.begin_, this.begin_], 2), this.begin_ = _a[0], obj.begin_ = _a[1];
        _b = __read([obj.end_, this.end_], 2), this.end_ = _b[0], obj.end_ = _b[1];
        _c = __read([obj.size_, this.size_], 2), this.size_ = _c[0], obj.size_ = _c[1];
    };
    return ListContainer;
}(Container_1.Container));
exports.ListContainer = ListContainer;
//# sourceMappingURL=ListContainer.js.map

/***/ }),

/***/ "./node_modules/tstl/base/container/MapContainer.js":
/*!**********************************************************!*\
  !*** ./node_modules/tstl/base/container/MapContainer.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std.base */
//================================================================
var Container_1 = __webpack_require__(/*! ./Container */ "./node_modules/tstl/base/container/Container.js");
var _MapElementList_1 = __webpack_require__(/*! ./_MapElementList */ "./node_modules/tstl/base/container/_MapElementList.js");
var MapIterator_1 = __webpack_require__(/*! ../iterator/MapIterator */ "./node_modules/tstl/base/iterator/MapIterator.js");
var _NativeArrayIterator_1 = __webpack_require__(/*! ../iterator/_NativeArrayIterator */ "./node_modules/tstl/base/iterator/_NativeArrayIterator.js");
/**
 * Base class for Map Containers.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var MapContainer = /** @class */ (function (_super) {
    __extends(MapContainer, _super);
    /* ---------------------------------------------------------
        CONSTURCTORS
    --------------------------------------------------------- */
    /**
     * Default Constructor.
     */
    function MapContainer() {
        var _this = _super.call(this) || this;
        _this.data_ = new _MapElementList_1._MapElementList(_this);
        return _this;
    }
    /**
     * @inheritDoc
     */
    MapContainer.prototype.assign = function (first, last) {
        // INSERT
        this.clear();
        this.insert(first, last);
    };
    /**
     * @inheritDoc
     */
    MapContainer.prototype.clear = function () {
        // TO BE ABSTRACT
        this.data_.clear();
    };
    /**
     * @inheritDoc
     */
    MapContainer.prototype.begin = function () {
        return this.data_.begin();
    };
    /**
     * @inheritDoc
     */
    MapContainer.prototype.end = function () {
        return this.data_.end();
    };
    /* ---------------------------------------------------------
        ELEMENTS
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    MapContainer.prototype.has = function (key) {
        return !this.find(key).equals(this.end());
    };
    /**
     * @inheritDoc
     */
    MapContainer.prototype.size = function () {
        return this.data_.size();
    };
    /* =========================================================
        ELEMENTS I/O
            - INSERT
            - ERASE
            - UTILITY
            - POST-PROCESS
    ============================================================
        INSERT
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    MapContainer.prototype.push = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        // INSERT BY RANGE
        var first = new _NativeArrayIterator_1._NativeArrayIterator(items, 0);
        var last = new _NativeArrayIterator_1._NativeArrayIterator(items, items.length);
        this.insert(first, last);
        // RETURN SIZE
        return this.size();
    };
    MapContainer.prototype.insert = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 1)
            return this.emplace(args[0].first, args[0].second);
        else if (args[0].next instanceof Function && args[1].next instanceof Function)
            return this._Insert_by_range(args[0], args[1]);
        else
            return this.emplace_hint(args[0], args[1].first, args[1].second);
    };
    MapContainer.prototype.erase = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 1 && (args[0] instanceof MapIterator_1.MapIterator === false || args[0].source() !== this))
            return this._Erase_by_key(args[0]);
        else if (args.length === 1)
            return this._Erase_by_range(args[0]);
        else
            return this._Erase_by_range(args[0], args[1]);
    };
    /**
     * @hidden
     */
    MapContainer.prototype._Erase_by_range = function (first, last) {
        if (last === void 0) { last = first.next(); }
        // ERASE
        var it = this.data_.erase(first, last);
        // POST-PROCESS
        this._Handle_erase(first, last);
        return it;
    };
    /* ---------------------------------------------------------
        UTILITY
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    MapContainer.prototype.swap = function (obj) {
        var _a;
        // CHANGE CONTENTS
        _a = __read([obj.data_, this.data_], 2), this.data_ = _a[0], obj.data_ = _a[1];
        // CHANGE ITERATORS' SOURCES
        _MapElementList_1._MapElementList._Swap_associative(this.data_, obj.data_);
    };
    return MapContainer;
}(Container_1.Container));
exports.MapContainer = MapContainer;
//# sourceMappingURL=MapContainer.js.map

/***/ }),

/***/ "./node_modules/tstl/base/container/MultiMap.js":
/*!******************************************************!*\
  !*** ./node_modules/tstl/base/container/MultiMap.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std.base */
//================================================================
var MapContainer_1 = __webpack_require__(/*! ./MapContainer */ "./node_modules/tstl/base/container/MapContainer.js");
/**
 * Base class for Multiple-key Map Containers.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var MultiMap = /** @class */ (function (_super) {
    __extends(MultiMap, _super);
    function MultiMap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MultiMap.prototype.insert = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return _super.prototype.insert.apply(this, __spread(args));
    };
    /**
     * @hidden
     */
    MultiMap.prototype._Erase_by_key = function (key) {
        var first = this.find(key);
        if (first.equals(this.end()) === true)
            return 0;
        var last = first.next();
        var ret = 1;
        while (!last.equals(this.end()) && this._Key_eq(key, last.first)) {
            last = last.next();
            ++ret;
        }
        this._Erase_by_range(first, last);
        return ret;
    };
    /* ---------------------------------------------------------
        UTILITY
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    MultiMap.prototype.merge = function (source) {
        this.insert(source.begin(), source.end());
        source.clear();
    };
    return MultiMap;
}(MapContainer_1.MapContainer));
exports.MultiMap = MultiMap;
//# sourceMappingURL=MultiMap.js.map

/***/ }),

/***/ "./node_modules/tstl/base/container/MultiSet.js":
/*!******************************************************!*\
  !*** ./node_modules/tstl/base/container/MultiSet.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std.base */
//================================================================
var SetContainer_1 = __webpack_require__(/*! ./SetContainer */ "./node_modules/tstl/base/container/SetContainer.js");
/**
 * Base class for Multiple-key Set Containers.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var MultiSet = /** @class */ (function (_super) {
    __extends(MultiSet, _super);
    function MultiSet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MultiSet.prototype.insert = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return _super.prototype.insert.apply(this, __spread(args));
    };
    /**
     * @hidden
     */
    MultiSet.prototype._Erase_by_val = function (key) {
        var first = this.find(key);
        if (first.equals(this.end()) === true)
            return 0;
        var last = first.next();
        var ret = 1;
        while (!last.equals(this.end()) && this._Key_eq(key, last.value)) {
            last = last.next();
            ++ret;
        }
        this._Erase_by_range(first, last);
        return ret;
    };
    /* ---------------------------------------------------------
        UTILITY
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    MultiSet.prototype.merge = function (source) {
        this.insert(source.begin(), source.end());
        source.clear();
    };
    return MultiSet;
}(SetContainer_1.SetContainer));
exports.MultiSet = MultiSet;
//# sourceMappingURL=MultiSet.js.map

/***/ }),

/***/ "./node_modules/tstl/base/container/SetContainer.js":
/*!**********************************************************!*\
  !*** ./node_modules/tstl/base/container/SetContainer.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std.base */
//================================================================
var Container_1 = __webpack_require__(/*! ./Container */ "./node_modules/tstl/base/container/Container.js");
var _SetElementList_1 = __webpack_require__(/*! ./_SetElementList */ "./node_modules/tstl/base/container/_SetElementList.js");
var SetIterator_1 = __webpack_require__(/*! ../iterator/SetIterator */ "./node_modules/tstl/base/iterator/SetIterator.js");
var _NativeArrayIterator_1 = __webpack_require__(/*! ../iterator/_NativeArrayIterator */ "./node_modules/tstl/base/iterator/_NativeArrayIterator.js");
/**
 * Base class for Set Containers.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var SetContainer = /** @class */ (function (_super) {
    __extends(SetContainer, _super);
    /* ---------------------------------------------------------
        CONSTURCTORS
    --------------------------------------------------------- */
    /**
     * Default Constructor.
     */
    function SetContainer() {
        var _this = _super.call(this) || this;
        _this.data_ = new _SetElementList_1._SetElementList(_this);
        return _this;
    }
    /**
     * @inheritDoc
     */
    SetContainer.prototype.assign = function (first, last) {
        // INSERT
        this.clear();
        this.insert(first, last);
    };
    /**
     * @inheritDoc
     */
    SetContainer.prototype.clear = function () {
        // TO BE ABSTRACT
        this.data_.clear();
    };
    /**
     * @inheritDoc
     */
    SetContainer.prototype.begin = function () {
        return this.data_.begin();
    };
    /**
     * @inheritDoc
     */
    SetContainer.prototype.end = function () {
        return this.data_.end();
    };
    /* ---------------------------------------------------------
        ELEMENTS
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    SetContainer.prototype.has = function (key) {
        return !this.find(key).equals(this.end());
    };
    /**
     * @inheritDoc
     */
    SetContainer.prototype.size = function () {
        return this.data_.size();
    };
    /* =========================================================
        ELEMENTS I/O
            - INSERT
            - ERASE
            - UTILITY
            - POST-PROCESS
    ============================================================
        INSERT
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    SetContainer.prototype.push = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        if (items.length === 0)
            return this.size();
        // INSERT BY RANGE
        var first = new _NativeArrayIterator_1._NativeArrayIterator(items, 0);
        var last = new _NativeArrayIterator_1._NativeArrayIterator(items, items.length);
        this._Insert_by_range(first, last);
        // RETURN SIZE
        return this.size();
    };
    SetContainer.prototype.insert = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 1)
            return this._Insert_by_key(args[0]);
        else if (args[0].next instanceof Function && args[1].next instanceof Function)
            return this._Insert_by_range(args[0], args[1]);
        else
            return this._Insert_by_hint(args[0], args[1]);
    };
    SetContainer.prototype.erase = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 1 && !(args[0] instanceof SetIterator_1.SetIterator && args[0].source() === this))
            return this._Erase_by_val(args[0]);
        else if (args.length === 1)
            return this._Erase_by_range(args[0]);
        else
            return this._Erase_by_range(args[0], args[1]);
    };
    /**
     * @hidden
     */
    SetContainer.prototype._Erase_by_range = function (first, last) {
        if (last === void 0) { last = first.next(); }
        // ERASE
        var it = this.data_.erase(first, last);
        // POST-PROCESS
        this._Handle_erase(first, last);
        return it;
    };
    /* ---------------------------------------------------------
        UTILITY
    --------------------------------------------------------- */
    /**
     * @hidden
     */
    SetContainer.prototype.swap = function (obj) {
        var _a;
        // CHANGE CONTENTS
        _a = __read([obj.data_, this.data_], 2), this.data_ = _a[0], obj.data_ = _a[1];
        // CHANGE ITERATORS' SOURCES
        _SetElementList_1._SetElementList._Swap_associative(this.data_, obj.data_);
    };
    return SetContainer;
}(Container_1.Container));
exports.SetContainer = SetContainer;
//# sourceMappingURL=SetContainer.js.map

/***/ }),

/***/ "./node_modules/tstl/base/container/UniqueMap.js":
/*!*******************************************************!*\
  !*** ./node_modules/tstl/base/container/UniqueMap.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std.base */
//================================================================
var MapContainer_1 = __webpack_require__(/*! ./MapContainer */ "./node_modules/tstl/base/container/MapContainer.js");
var MapIterator_1 = __webpack_require__(/*! ../iterator/MapIterator */ "./node_modules/tstl/base/iterator/MapIterator.js");
var LogicError_1 = __webpack_require__(/*! ../../exception/LogicError */ "./node_modules/tstl/exception/LogicError.js");
/**
 * Base class for Unique-key Map Containers.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var UniqueMap = /** @class */ (function (_super) {
    __extends(UniqueMap, _super);
    function UniqueMap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* ---------------------------------------------------------
        ACCESSORS
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    UniqueMap.prototype.count = function (key) {
        return this.find(key).equals(this.end()) ? 0 : 1;
    };
    /**
     * Get a value.
     *
     * @param key Key to search for.
     * @return The value mapped by the key.
     */
    UniqueMap.prototype.get = function (key) {
        var it = this.find(key);
        if (it.equals(this.end()) === true)
            throw new LogicError_1.OutOfRange("unable to find the matched key.");
        return it.second;
    };
    /**
     * Set a value with key.
     *
     * @param key Key to be mapped or search for.
     * @param val Value to insert or assign.
     */
    UniqueMap.prototype.set = function (key, val) {
        this.insert_or_assign(key, val);
    };
    UniqueMap.prototype.insert = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return _super.prototype.insert.apply(this, __spread(args));
    };
    UniqueMap.prototype.insert_or_assign = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 2) {
            return this._Insert_or_assign_with_key_value(args[0], args[1]);
        }
        else if (args.length === 3) {
            // INSERT OR ASSIGN AN ELEMENT
            return this._Insert_or_assign_with_hint(args[0], args[1], args[2]);
        }
    };
    /**
     * @hidden
     */
    UniqueMap.prototype._Insert_or_assign_with_key_value = function (key, value) {
        var ret = this.emplace(key, value);
        if (ret.second === false)
            ret.first.second = value;
        return ret;
    };
    /**
     * @hidden
     */
    UniqueMap.prototype._Insert_or_assign_with_hint = function (hint, key, value) {
        var ret = this.emplace_hint(hint, key, value);
        if (ret.second !== value)
            ret.second = value;
        return ret;
    };
    UniqueMap.prototype.extract = function (param) {
        if (param instanceof MapIterator_1.MapIterator)
            return this._Extract_by_iterator(param);
        else
            return this._Extract_by_key(param);
    };
    /**
     * @hidden
     */
    UniqueMap.prototype._Extract_by_key = function (key) {
        var it = this.find(key);
        if (it.equals(this.end()) === true)
            throw new LogicError_1.OutOfRange("No such key exists.");
        var ret = it.value;
        this._Erase_by_range(it);
        return ret;
    };
    /**
     * @hidden
     */
    UniqueMap.prototype._Extract_by_iterator = function (it) {
        if (it.equals(this.end()) === true)
            return this.end();
        this._Erase_by_range(it);
        return it;
    };
    /**
     * @hidden
     */
    UniqueMap.prototype._Erase_by_key = function (key) {
        var it = this.find(key);
        if (it.equals(this.end()) === true)
            return 0;
        this._Erase_by_range(it);
        return 1;
    };
    /* ---------------------------------------------------------
        UTILITY
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    UniqueMap.prototype.merge = function (source) {
        for (var it = source.begin(); !it.equals(source.end());)
            if (this.has(it.first) === false) {
                this.insert(it.value);
                it = source.erase(it);
            }
            else
                it = it.next();
    };
    return UniqueMap;
}(MapContainer_1.MapContainer));
exports.UniqueMap = UniqueMap;
//# sourceMappingURL=UniqueMap.js.map

/***/ }),

/***/ "./node_modules/tstl/base/container/UniqueSet.js":
/*!*******************************************************!*\
  !*** ./node_modules/tstl/base/container/UniqueSet.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std.base */
//================================================================
var SetContainer_1 = __webpack_require__(/*! ./SetContainer */ "./node_modules/tstl/base/container/SetContainer.js");
var SetIterator_1 = __webpack_require__(/*! ../iterator/SetIterator */ "./node_modules/tstl/base/iterator/SetIterator.js");
var LogicError_1 = __webpack_require__(/*! ../../exception/LogicError */ "./node_modules/tstl/exception/LogicError.js");
/**
 * Base class for Unique-key Set Containers.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var UniqueSet = /** @class */ (function (_super) {
    __extends(UniqueSet, _super);
    function UniqueSet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* ---------------------------------------------------------
        ACCESSOR
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    UniqueSet.prototype.count = function (key) {
        return this.find(key).equals(this.end()) ? 0 : 1;
    };
    UniqueSet.prototype.insert = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return _super.prototype.insert.apply(this, __spread(args));
    };
    UniqueSet.prototype.extract = function (param) {
        if (param instanceof SetIterator_1.SetIterator)
            return this._Extract_by_iterator(param);
        else
            return this._Extract_by_val(param);
    };
    /**
     * @hidden
     */
    UniqueSet.prototype._Extract_by_val = function (key) {
        var it = this.find(key);
        if (it.equals(this.end()) === true)
            throw new LogicError_1.OutOfRange("No such key exists.");
        this._Erase_by_range(it);
        return key;
    };
    /**
     * @hidden
     */
    UniqueSet.prototype._Extract_by_iterator = function (it) {
        if (it.equals(this.end()) === true || this.has(it.value) === false)
            return this.end();
        this._Erase_by_range(it);
        return it;
    };
    /**
     * @hidden
     */
    UniqueSet.prototype._Erase_by_val = function (key) {
        var it = this.find(key);
        if (it.equals(this.end()) === true)
            return 0;
        this._Erase_by_range(it);
        return 1;
    };
    /* ---------------------------------------------------------
        UTILITY
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    UniqueSet.prototype.merge = function (source) {
        for (var it = source.begin(); !it.equals(source.end());) {
            if (this.has(it.value) === false) {
                this.insert(it.value);
                it = source.erase(it);
            }
            else
                it = it.next();
        }
    };
    return UniqueSet;
}(SetContainer_1.SetContainer));
exports.UniqueSet = UniqueSet;
//# sourceMappingURL=UniqueSet.js.map

/***/ }),

/***/ "./node_modules/tstl/base/container/_IAssociativeContainer.js":
/*!********************************************************************!*\
  !*** ./node_modules/tstl/base/container/_IAssociativeContainer.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @hidden
 */
function _Fetch_arguments(source) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var ramda;
    var tail;
    if (args.length >= 1 && args[0] instanceof Array) {
        // INITIALIZER LIST CONSTRUCTOR
        ramda = function () {
            var items = args[0];
            source.push.apply(source, __spread(items));
        };
        tail = args.slice(1);
    }
    else if (args.length >= 2 && args[0].next instanceof Function && args[1].next instanceof Function) {
        // RANGE CONSTRUCTOR
        ramda = function () {
            var first = args[0];
            var last = args[1];
            source.assign(first, last);
        };
        tail = args.slice(2);
    }
    else {
        // DEFAULT CONSTRUCTOR
        ramda = null;
        tail = args;
    }
    return { ramda: ramda, tail: tail };
}
exports._Fetch_arguments = _Fetch_arguments;
//# sourceMappingURL=_IAssociativeContainer.js.map

/***/ }),

/***/ "./node_modules/tstl/base/container/_IHashContainer.js":
/*!*************************************************************!*\
  !*** ./node_modules/tstl/base/container/_IHashContainer.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std.base */
//================================================================
var _IAssociativeContainer_1 = __webpack_require__(/*! ./_IAssociativeContainer */ "./node_modules/tstl/base/container/_IAssociativeContainer.js");
var hash_1 = __webpack_require__(/*! ../../functional/hash */ "./node_modules/tstl/functional/hash.js");
var comparators_1 = __webpack_require__(/*! ../../functional/comparators */ "./node_modules/tstl/functional/comparators.js");
/**
 * @hidden
 */
function _Construct(source, Source, bucketFactory) {
    var args = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        args[_i - 3] = arguments[_i];
    }
    // DECLARE MEMBERS
    var post_process = null;
    var hash_function = hash_1.hash;
    var key_eq = comparators_1.equal_to;
    //----
    // INITIALIZE MEMBERS AND POST-PROCESS
    //----
    // BRANCH - METHOD OVERLOADINGS
    if (args.length === 1 && args[0] instanceof Source) {
        // PARAMETERS
        var container_1 = args[0];
        hash_function = container_1.hash_function();
        key_eq = container_1.key_eq();
        // COPY CONSTRUCTOR
        post_process = function () {
            var first = container_1.begin();
            var last = container_1.end();
            source.assign(first, last);
        };
    }
    else {
        var tuple = _IAssociativeContainer_1._Fetch_arguments.apply(void 0, __spread([source], args));
        post_process = tuple.ramda;
        if (tuple.tail.length >= 1)
            hash_function = tuple.tail[0];
        if (tuple.tail.length >= 2)
            key_eq = tuple.tail[1];
    }
    //----
    // DO PROCESS
    //----
    // CONSTRUCT BUCKET
    bucketFactory(hash_function, key_eq);
    // ACT POST-PROCESS
    if (post_process !== null)
        post_process();
}
exports._Construct = _Construct;
//# sourceMappingURL=_IHashContainer.js.map

/***/ }),

/***/ "./node_modules/tstl/base/container/_ITreeContainer.js":
/*!*************************************************************!*\
  !*** ./node_modules/tstl/base/container/_ITreeContainer.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std.base */
//================================================================
var _IAssociativeContainer_1 = __webpack_require__(/*! ./_IAssociativeContainer */ "./node_modules/tstl/base/container/_IAssociativeContainer.js");
var comparators_1 = __webpack_require__(/*! ../../functional/comparators */ "./node_modules/tstl/functional/comparators.js");
/**
 * @hidden
 */
function _Construct(source, Source, treeFactory) {
    var args = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        args[_i - 3] = arguments[_i];
    }
    // DECLARE MEMBERS
    var post_process = null;
    var comp = comparators_1.less;
    //----
    // INITIALIZE MEMBERS AND POST-PROCESS
    //----
    // BRANCH - METHOD OVERLOADINGS
    if (args.length === 1 && args[0] instanceof Source) {
        // PARAMETERS
        var container_1 = args[0];
        comp = container_1.key_comp();
        // COPY CONSTRUCTOR
        post_process = function () {
            var first = container_1.begin();
            var last = container_1.end();
            source.assign(first, last);
        };
    }
    else {
        var tuple = _IAssociativeContainer_1._Fetch_arguments.apply(void 0, __spread([source], args));
        post_process = tuple.ramda;
        if (tuple.tail.length >= 1)
            comp = tuple.tail[0];
    }
    //----
    // DO PROCESS
    //----
    // CONSTRUCT TREE
    treeFactory(comp);
    // ACT POST-PROCESS
    if (post_process !== null)
        post_process();
}
exports._Construct = _Construct;
/**
 * @hidden
 */
function _Emplace_hint(source, hint, elem, data, handleInsert, breaker) {
    var prev = hint.prev();
    var meet = prev.equals(source.end()) || source.value_comp()(prev.value, elem);
    meet = meet && (hint.equals(source.end()) || source.value_comp()(elem, hint.value));
    if (!meet) // NOT VALIDATE
        return breaker();
    hint = data.insert(hint, elem);
    handleInsert(hint, hint.next());
    return hint;
}
exports._Emplace_hint = _Emplace_hint;
//# sourceMappingURL=_ITreeContainer.js.map

/***/ }),

/***/ "./node_modules/tstl/base/container/_MapElementList.js":
/*!*************************************************************!*\
  !*** ./node_modules/tstl/base/container/_MapElementList.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std.base */
//================================================================
var ListContainer_1 = __webpack_require__(/*! ./ListContainer */ "./node_modules/tstl/base/container/ListContainer.js");
var MapIterator_1 = __webpack_require__(/*! ../iterator/MapIterator */ "./node_modules/tstl/base/iterator/MapIterator.js");
/**
 * @hidden
 */
var _MapElementList = /** @class */ (function (_super) {
    __extends(_MapElementList, _super);
    /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
    function _MapElementList(associative) {
        var _this = _super.call(this) || this;
        _this.associative_ = associative;
        return _this;
    }
    /**
     * @hidden
     */
    _MapElementList.prototype._Create_iterator = function (prev, next, val) {
        return new MapIterator_1.MapIterator(this, prev, next, val);
    };
    /**
     * @internal
     */
    _MapElementList._Swap_associative = function (x, y) {
        var _a;
        _a = __read([y.associative_, x.associative_], 2), x.associative_ = _a[0], y.associative_ = _a[1];
    };
    /* ---------------------------------------------------------
        ACCESSORS
    --------------------------------------------------------- */
    _MapElementList.prototype.associative = function () {
        return this.associative_;
    };
    return _MapElementList;
}(ListContainer_1.ListContainer));
exports._MapElementList = _MapElementList;
//# sourceMappingURL=_MapElementList.js.map

/***/ }),

/***/ "./node_modules/tstl/base/container/_SetElementList.js":
/*!*************************************************************!*\
  !*** ./node_modules/tstl/base/container/_SetElementList.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std.base */
//================================================================
var ListContainer_1 = __webpack_require__(/*! ./ListContainer */ "./node_modules/tstl/base/container/ListContainer.js");
var SetIterator_1 = __webpack_require__(/*! ../iterator/SetIterator */ "./node_modules/tstl/base/iterator/SetIterator.js");
/**
 * @hidden
 */
var _SetElementList = /** @class */ (function (_super) {
    __extends(_SetElementList, _super);
    /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
    function _SetElementList(associative) {
        var _this = _super.call(this) || this;
        _this.associative_ = associative;
        return _this;
    }
    /**
     * @hidden
     */
    _SetElementList.prototype._Create_iterator = function (prev, next, val) {
        return new SetIterator_1.SetIterator(this, prev, next, val);
    };
    /**
     * @internal
     */
    _SetElementList._Swap_associative = function (x, y) {
        var _a;
        _a = __read([y.associative_, x.associative_], 2), x.associative_ = _a[0], y.associative_ = _a[1];
    };
    /* ---------------------------------------------------------
        ACCESSORS
    --------------------------------------------------------- */
    _SetElementList.prototype.associative = function () {
        return this.associative_;
    };
    return _SetElementList;
}(ListContainer_1.ListContainer));
exports._SetElementList = _SetElementList;
//# sourceMappingURL=_SetElementList.js.map

/***/ }),

/***/ "./node_modules/tstl/base/hash/_HashBuckets.js":
/*!*****************************************************!*\
  !*** ./node_modules/tstl/base/hash/_HashBuckets.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std.base */
//================================================================
/**
 * @hidden
 */
var MIN_BUCKET_COUNT = 10;
/**
 * @hidden
 */
var DEFAULT_MAX_FACTOR = 1.0;
/**
 * @hidden
 */
var _HashBuckets = /** @class */ (function () {
    /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
    function _HashBuckets() {
        this.clear();
        this.max_load_factor_ = DEFAULT_MAX_FACTOR;
    }
    _HashBuckets.prototype.clear = function () {
        this.buckets_ = [];
        this.item_size_ = 0;
        for (var i = 0; i < MIN_BUCKET_COUNT; ++i)
            this.buckets_.push([]);
    };
    _HashBuckets.prototype.rehash = function (size) {
        var e_1, _a, e_2, _b;
        if (size < MIN_BUCKET_COUNT)
            size = MIN_BUCKET_COUNT;
        var prev_matrix = this.buckets_;
        this.buckets_ = [];
        for (var i = 0; i < size; ++i)
            this.buckets_.push([]);
        try {
            for (var prev_matrix_1 = __values(prev_matrix), prev_matrix_1_1 = prev_matrix_1.next(); !prev_matrix_1_1.done; prev_matrix_1_1 = prev_matrix_1.next()) {
                var row = prev_matrix_1_1.value;
                try {
                    for (var row_1 = __values(row), row_1_1 = row_1.next(); !row_1_1.done; row_1_1 = row_1.next()) {
                        var col = row_1_1.value;
                        var index = this.hash_index(col);
                        var bucket = this.buckets_[index];
                        bucket.push(col);
                        ++this.item_size_;
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (row_1_1 && !row_1_1.done && (_b = row_1.return)) _b.call(row_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (prev_matrix_1_1 && !prev_matrix_1_1.done && (_a = prev_matrix_1.return)) _a.call(prev_matrix_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    _HashBuckets.prototype.reserve = function (size) {
        this.item_size_ += size;
        if (this.item_size_ > this.capacity())
            this.rehash(Math.max(this.item_size_, this.capacity() * 2));
    };
    /* ---------------------------------------------------------
        ACCESSORS
    --------------------------------------------------------- */
    _HashBuckets.prototype.size = function () {
        return this.buckets_.length;
    };
    _HashBuckets.prototype.capacity = function () {
        return this.buckets_.length * this.max_load_factor_;
    };
    _HashBuckets.prototype.at = function (index) {
        return this.buckets_[index];
    };
    _HashBuckets.prototype.load_factor = function () {
        return this.item_size_ / this.size();
    };
    _HashBuckets.prototype.max_load_factor = function (z) {
        if (z === void 0) { z = null; }
        if (z === null)
            return this.max_load_factor_;
        else
            this.max_load_factor_ = z;
    };
    /* ---------------------------------------------------------
        ELEMENTS I/O
    --------------------------------------------------------- */
    _HashBuckets.prototype.insert = function (val) {
        var capacity = this.capacity();
        if (++this.item_size_ > capacity)
            this.rehash(capacity * 2);
        var index = this.hash_index(val);
        this.buckets_[index].push(val);
    };
    _HashBuckets.prototype.erase = function (val) {
        var index = this.hash_index(val);
        var bucket = this.buckets_[index];
        for (var i = 0; i < bucket.length; ++i)
            if (bucket[i] === val) {
                bucket.splice(i, 1);
                --this.item_size_;
                break;
            }
    };
    return _HashBuckets;
}());
exports._HashBuckets = _HashBuckets;
//# sourceMappingURL=_HashBuckets.js.map

/***/ }),

/***/ "./node_modules/tstl/base/hash/_MapHashBuckets.js":
/*!********************************************************!*\
  !*** ./node_modules/tstl/base/hash/_MapHashBuckets.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std.base */
//================================================================
var _HashBuckets_1 = __webpack_require__(/*! ./_HashBuckets */ "./node_modules/tstl/base/hash/_HashBuckets.js");
/**
 * @hidden
 */
var _MapHashBuckets = /** @class */ (function (_super) {
    __extends(_MapHashBuckets, _super);
    /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
    function _MapHashBuckets(source, hash, pred) {
        var _this = _super.call(this) || this;
        _this.source_ = source;
        _this.hash_function_ = hash;
        _this.key_eq_ = pred;
        return _this;
    }
    /**
     * @internal
     */
    _MapHashBuckets._Swap_source = function (x, y) {
        var _a;
        _a = __read([y.source_, x.source_], 2), x.source_ = _a[0], y.source_ = _a[1];
    };
    /* ---------------------------------------------------------
        ACCESSORS
    --------------------------------------------------------- */
    _MapHashBuckets.prototype.hash_function = function () {
        return this.hash_function_;
    };
    _MapHashBuckets.prototype.key_eq = function () {
        return this.key_eq_;
    };
    /* ---------------------------------------------------------
        FINDERS
    --------------------------------------------------------- */
    _MapHashBuckets.prototype.find = function (key) {
        var e_1, _a;
        var index = this.hash_function_(key) % this.size();
        var bucket = this.at(index);
        try {
            for (var bucket_1 = __values(bucket), bucket_1_1 = bucket_1.next(); !bucket_1_1.done; bucket_1_1 = bucket_1.next()) {
                var it = bucket_1_1.value;
                if (this.key_eq_(it.first, key))
                    return it;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (bucket_1_1 && !bucket_1_1.done && (_a = bucket_1.return)) _a.call(bucket_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return this.source_.end();
    };
    _MapHashBuckets.prototype.hash_index = function (it) {
        return this.hash_function_(it.first) % this.size();
    };
    return _MapHashBuckets;
}(_HashBuckets_1._HashBuckets));
exports._MapHashBuckets = _MapHashBuckets;
//# sourceMappingURL=_MapHashBuckets.js.map

/***/ }),

/***/ "./node_modules/tstl/base/hash/_SetHashBuckets.js":
/*!********************************************************!*\
  !*** ./node_modules/tstl/base/hash/_SetHashBuckets.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std.base */
//================================================================
var _HashBuckets_1 = __webpack_require__(/*! ./_HashBuckets */ "./node_modules/tstl/base/hash/_HashBuckets.js");
/**
 * @hidden
 */
var _SetHashBuckets = /** @class */ (function (_super) {
    __extends(_SetHashBuckets, _super);
    /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
    function _SetHashBuckets(source, hash, pred) {
        var _this = _super.call(this) || this;
        _this.source_ = source;
        _this.hash_function_ = hash;
        _this.key_eq_ = pred;
        return _this;
    }
    /**
     * @internal
     */
    _SetHashBuckets._Swap_source = function (x, y) {
        var _a;
        _a = __read([y.source_, x.source_], 2), x.source_ = _a[0], y.source_ = _a[1];
    };
    /* ---------------------------------------------------------
        ACCESSORS
    --------------------------------------------------------- */
    _SetHashBuckets.prototype.hash_function = function () {
        return this.hash_function_;
    };
    _SetHashBuckets.prototype.key_eq = function () {
        return this.key_eq_;
    };
    /* ---------------------------------------------------------
        FINDERS
    --------------------------------------------------------- */
    _SetHashBuckets.prototype.find = function (val) {
        var e_1, _a;
        var index = this.hash_function_(val) % this.size();
        var bucket = this.at(index);
        try {
            for (var bucket_1 = __values(bucket), bucket_1_1 = bucket_1.next(); !bucket_1_1.done; bucket_1_1 = bucket_1.next()) {
                var it = bucket_1_1.value;
                if (this.key_eq_(it.value, val))
                    return it;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (bucket_1_1 && !bucket_1_1.done && (_a = bucket_1.return)) _a.call(bucket_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return this.source_.end();
    };
    _SetHashBuckets.prototype.hash_index = function (it) {
        return this.hash_function_(it.value) % this.size();
    };
    return _SetHashBuckets;
}(_HashBuckets_1._HashBuckets));
exports._SetHashBuckets = _SetHashBuckets;
//# sourceMappingURL=_SetHashBuckets.js.map

/***/ }),

/***/ "./node_modules/tstl/base/index.js":
/*!*****************************************!*\
  !*** ./node_modules/tstl/base/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./container/Container */ "./node_modules/tstl/base/container/Container.js"));
__export(__webpack_require__(/*! ./container/ArrayContainer */ "./node_modules/tstl/base/container/ArrayContainer.js"));
__export(__webpack_require__(/*! ./container/ListContainer */ "./node_modules/tstl/base/container/ListContainer.js"));
// SETS
__export(__webpack_require__(/*! ./container/SetContainer */ "./node_modules/tstl/base/container/SetContainer.js"));
__export(__webpack_require__(/*! ./container/UniqueSet */ "./node_modules/tstl/base/container/UniqueSet.js"));
__export(__webpack_require__(/*! ./container/MultiSet */ "./node_modules/tstl/base/container/MultiSet.js"));
// MAPS
__export(__webpack_require__(/*! ./container/MapContainer */ "./node_modules/tstl/base/container/MapContainer.js"));
__export(__webpack_require__(/*! ./container/UniqueMap */ "./node_modules/tstl/base/container/UniqueMap.js"));
__export(__webpack_require__(/*! ./container/MultiMap */ "./node_modules/tstl/base/container/MultiMap.js"));
__export(__webpack_require__(/*! ./iterator/ReverseIterator */ "./node_modules/tstl/base/iterator/ReverseIterator.js"));
__export(__webpack_require__(/*! ./iterator/ForOfAdaptor */ "./node_modules/tstl/base/iterator/ForOfAdaptor.js"));
// DERIVED
__export(__webpack_require__(/*! ./iterator/ArrayIterator */ "./node_modules/tstl/base/iterator/ArrayIterator.js"));
__export(__webpack_require__(/*! ./iterator/SetIterator */ "./node_modules/tstl/base/iterator/SetIterator.js"));
__export(__webpack_require__(/*! ./iterator/MapIterator */ "./node_modules/tstl/base/iterator/MapIterator.js"));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/tstl/base/iterator/ArrayIterator.js":
/*!**********************************************************!*\
  !*** ./node_modules/tstl/base/iterator/ArrayIterator.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ReverseIterator_1 = __webpack_require__(/*! ./ReverseIterator */ "./node_modules/tstl/base/iterator/ReverseIterator.js");
var comparators_1 = __webpack_require__(/*! ../../functional/comparators */ "./node_modules/tstl/functional/comparators.js");
/**
 * Iterator of Array Containers.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var ArrayIterator = /** @class */ (function () {
    /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
    /**
     * Initializer Constructor.
     *
     * @param source Source container.
     * @param index Index number.
     */
    function ArrayIterator(source, index) {
        this.source_ = source;
        this.index_ = index;
    }
    /**
     * @inheritDoc
     */
    ArrayIterator.prototype.reverse = function () {
        return new ArrayReverseIterator(this);
    };
    /* ---------------------------------------------------------
        ACCESSORS
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    ArrayIterator.prototype.source = function () {
        return this.source_;
    };
    /**
     * @inheritDoc
     */
    ArrayIterator.prototype.index = function () {
        return this.index_;
    };
    Object.defineProperty(ArrayIterator.prototype, "value", {
        /**
         * @inheritDoc
         */
        get: function () {
            return this.source().at(this.index_);
        },
        /**
         * @inheritDoc
         */
        set: function (val) {
            this.source().set(this.index_, val);
        },
        enumerable: true,
        configurable: true
    });
    /* ---------------------------------------------------------
        MOVERS
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    ArrayIterator.prototype.prev = function () {
        return new ArrayIterator(this.source(), this.index_ - 1);
    };
    /**
     * @inheritDoc
     */
    ArrayIterator.prototype.next = function () {
        return new ArrayIterator(this.source(), this.index_ + 1);
    };
    /**
     * @inheritDoc
     */
    ArrayIterator.prototype.advance = function (n) {
        return new ArrayIterator(this.source(), this.index_ + n);
    };
    /* ---------------------------------------------------------
        COMPARES
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    ArrayIterator.prototype.equals = function (obj) {
        return comparators_1.equal_to(this.source_, obj.source_) && this.index_ === obj.index_;
    };
    return ArrayIterator;
}());
exports.ArrayIterator = ArrayIterator;
/**
 * Reverse iterator of Array Containers.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var ArrayReverseIterator = /** @class */ (function (_super) {
    __extends(ArrayReverseIterator, _super);
    /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
    /**
     * Initializer Constructor.
     *
     * @param base The base iterator.
     */
    function ArrayReverseIterator(base) {
        return _super.call(this, base) || this;
    }
    /**
     * @hidden
     */
    ArrayReverseIterator.prototype._Create_neighbor = function (base) {
        return new ArrayReverseIterator(base);
    };
    /**
     * @inheritDoc
     */
    ArrayReverseIterator.prototype.advance = function (n) {
        return this._Create_neighbor(this.base().advance(-n));
    };
    /* ---------------------------------------------------------
        ACCESSORS
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    ArrayReverseIterator.prototype.index = function () {
        return this.base_.index();
    };
    Object.defineProperty(ArrayReverseIterator.prototype, "value", {
        /**
         * @inheritDoc
         */
        get: function () {
            return this.base_.value;
        },
        /**
         * @inheritDoc
         */
        set: function (val) {
            this.base_.value = val;
        },
        enumerable: true,
        configurable: true
    });
    return ArrayReverseIterator;
}(ReverseIterator_1.ReverseIterator));
exports.ArrayReverseIterator = ArrayReverseIterator;
//# sourceMappingURL=ArrayIterator.js.map

/***/ }),

/***/ "./node_modules/tstl/base/iterator/ForOfAdaptor.js":
/*!*********************************************************!*\
  !*** ./node_modules/tstl/base/iterator/ForOfAdaptor.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Adaptor for `for ... of` iteration.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var ForOfAdaptor = /** @class */ (function () {
    /**
     * Initializer Constructor.
     *
     * @param first Input iteartor of the first position.
     * @param last Input iterator of the last position.
     */
    function ForOfAdaptor(first, last) {
        this.it_ = first;
        this.last_ = last;
    }
    /**
     * @inheritDoc
     */
    ForOfAdaptor.prototype.next = function () {
        if (this.it_.equals(this.last_))
            return {
                done: true,
                value: undefined
            };
        else {
            var it = this.it_;
            this.it_ = this.it_.next();
            return {
                done: false,
                value: it.value
            };
        }
    };
    /**
     * @inheritDoc
     */
    ForOfAdaptor.prototype[Symbol.iterator] = function () {
        return this;
    };
    return ForOfAdaptor;
}());
exports.ForOfAdaptor = ForOfAdaptor;
//# sourceMappingURL=ForOfAdaptor.js.map

/***/ }),

/***/ "./node_modules/tstl/base/iterator/ListIterator.js":
/*!*********************************************************!*\
  !*** ./node_modules/tstl/base/iterator/ListIterator.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Basic List Iterator.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var ListIterator = /** @class */ (function () {
    /* ---------------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------------- */
    /**
     * @hidden
     */
    function ListIterator(prev, next, value) {
        this.prev_ = prev;
        this.next_ = next;
        this.value_ = value;
    }
    /**
     * @internal
     */
    ListIterator._Set_prev = function (it, prev) {
        it.prev_ = prev;
    };
    /**
     * @internal
     */
    ListIterator._Set_next = function (it, next) {
        it.next_ = next;
    };
    /**
     * @inheritDoc
     */
    ListIterator.prototype.prev = function () {
        return this.prev_;
    };
    /**
     * @inheritDoc
     */
    ListIterator.prototype.next = function () {
        return this.next_;
    };
    Object.defineProperty(ListIterator.prototype, "value", {
        /**
         * @inheritDoc
         */
        get: function () {
            return this.value_;
        },
        enumerable: true,
        configurable: true
    });
    /* ---------------------------------------------------------------
        COMPARISON
    --------------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    ListIterator.prototype.equals = function (obj) {
        return this === obj;
    };
    return ListIterator;
}());
exports.ListIterator = ListIterator;
//# sourceMappingURL=ListIterator.js.map

/***/ }),

/***/ "./node_modules/tstl/base/iterator/MapIterator.js":
/*!********************************************************!*\
  !*** ./node_modules/tstl/base/iterator/MapIterator.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std.base */
//================================================================
var ListIterator_1 = __webpack_require__(/*! ./ListIterator */ "./node_modules/tstl/base/iterator/ListIterator.js");
var ReverseIterator_1 = __webpack_require__(/*! ./ReverseIterator */ "./node_modules/tstl/base/iterator/ReverseIterator.js");
/**
 * Iterator of Map Containers.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var MapIterator = /** @class */ (function (_super) {
    __extends(MapIterator, _super);
    /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
    /**
     * @hidden
     */
    function MapIterator(list, prev, next, val) {
        var _this = _super.call(this, prev, next, val) || this;
        _this.source_ = list;
        return _this;
    }
    /**
     * @inheritDoc
     */
    MapIterator.prototype.reverse = function () {
        return new MapReverseIterator(this);
    };
    /* ---------------------------------------------------------
        ACCESSORS
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    MapIterator.prototype.source = function () {
        return this.source_.associative();
    };
    Object.defineProperty(MapIterator.prototype, "first", {
        /**
         * Get the first, key element.
         *
         * @return The first element.
         */
        get: function () {
            return this.value.first;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapIterator.prototype, "second", {
        /**
         * Get the second, stored element.
         *
         * @return The second element.
         */
        get: function () {
            return this.value.second;
        },
        /**
         * Set the second, stored element.
         *
         * @param val The value to set.
         */
        set: function (val) {
            this.value.second = val;
        },
        enumerable: true,
        configurable: true
    });
    return MapIterator;
}(ListIterator_1.ListIterator));
exports.MapIterator = MapIterator;
/**
 * Reverse iterator of Map Containers.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var MapReverseIterator = /** @class */ (function (_super) {
    __extends(MapReverseIterator, _super);
    /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
    /**
     * Initializer Constructor.
     *
     * @param base The base iterator.
     */
    function MapReverseIterator(base) {
        return _super.call(this, base) || this;
    }
    /**
     * @hidden
     */
    MapReverseIterator.prototype._Create_neighbor = function (base) {
        return new MapReverseIterator(base);
    };
    Object.defineProperty(MapReverseIterator.prototype, "first", {
        /* ---------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------- */
        /**
         * Get the first, key element.
         *
         * @return The first element.
         */
        get: function () {
            return this.base_.first;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapReverseIterator.prototype, "second", {
        /**
         * Get the second, stored element.
         *
         * @return The second element.
         */
        get: function () {
            return this.base_.second;
        },
        /**
         * Set the second, stored element.
         *
         * @param val The value to set.
         */
        set: function (val) {
            this.base_.second = val;
        },
        enumerable: true,
        configurable: true
    });
    return MapReverseIterator;
}(ReverseIterator_1.ReverseIterator));
exports.MapReverseIterator = MapReverseIterator;
//# sourceMappingURL=MapIterator.js.map

/***/ }),

/***/ "./node_modules/tstl/base/iterator/ReverseIterator.js":
/*!************************************************************!*\
  !*** ./node_modules/tstl/base/iterator/ReverseIterator.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Base reverse iterator for {@link IContainer}
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var ReverseIterator = /** @class */ (function () {
    /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
    /**
     * Initializer Constructor.
     *
     * @param base The base iterator.
     */
    function ReverseIterator(base) {
        this.base_ = base.prev();
    }
    /* ---------------------------------------------------------
        ACCESSORS
    --------------------------------------------------------- */
    /**
     * Get source container.
     *
     * @return The source container.
     */
    ReverseIterator.prototype.source = function () {
        return this.base_.source();
    };
    /**
     * @inheritDoc
     */
    ReverseIterator.prototype.base = function () {
        return this.base_.next();
    };
    Object.defineProperty(ReverseIterator.prototype, "value", {
        /**
         * @inheritDoc
         */
        get: function () {
            return this.base_.value;
        },
        enumerable: true,
        configurable: true
    });
    /* ---------------------------------------------------------
        MOVERS
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    ReverseIterator.prototype.prev = function () {
        // this.base().next()
        return this._Create_neighbor(this.base().next());
    };
    /**
     * @inheritDoc
     */
    ReverseIterator.prototype.next = function () {
        // this.base().prev()
        return this._Create_neighbor(this.base_);
    };
    /* ---------------------------------------------------------
        COMPARES
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    ReverseIterator.prototype.equals = function (obj) {
        return this.base_.equals(obj.base_);
    };
    return ReverseIterator;
}());
exports.ReverseIterator = ReverseIterator;
//# sourceMappingURL=ReverseIterator.js.map

/***/ }),

/***/ "./node_modules/tstl/base/iterator/SetIterator.js":
/*!********************************************************!*\
  !*** ./node_modules/tstl/base/iterator/SetIterator.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std.base */
//================================================================
var ListIterator_1 = __webpack_require__(/*! ./ListIterator */ "./node_modules/tstl/base/iterator/ListIterator.js");
var ReverseIterator_1 = __webpack_require__(/*! ./ReverseIterator */ "./node_modules/tstl/base/iterator/ReverseIterator.js");
/**
 * Iterator of Set Containers.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var SetIterator = /** @class */ (function (_super) {
    __extends(SetIterator, _super);
    /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
    /**
     * @hidden
     */
    function SetIterator(list, prev, next, key) {
        var _this = _super.call(this, prev, next, key) || this;
        _this.source_ = list;
        return _this;
    }
    /**
     * @inheritDoc
     */
    SetIterator.prototype.reverse = function () {
        return new SetReverseIterator(this);
    };
    /* ---------------------------------------------------------
        ACCESSORS
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    SetIterator.prototype.source = function () {
        return this.source_.associative();
    };
    return SetIterator;
}(ListIterator_1.ListIterator));
exports.SetIterator = SetIterator;
/**
 * Reverse iterator of Set Containers.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var SetReverseIterator = /** @class */ (function (_super) {
    __extends(SetReverseIterator, _super);
    /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
    /**
     * Initializer Constructor.
     *
     * @param base The base iterator.
     */
    function SetReverseIterator(base) {
        return _super.call(this, base) || this;
    }
    /**
     * @hidden
     */
    SetReverseIterator.prototype._Create_neighbor = function (base) {
        return new SetReverseIterator(base);
    };
    return SetReverseIterator;
}(ReverseIterator_1.ReverseIterator));
exports.SetReverseIterator = SetReverseIterator;
//# sourceMappingURL=SetIterator.js.map

/***/ }),

/***/ "./node_modules/tstl/base/iterator/_DequeForOfAdaptor.js":
/*!***************************************************************!*\
  !*** ./node_modules/tstl/base/iterator/_DequeForOfAdaptor.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std.base */
//================================================================
/**
 * @hidden
 */
var _DequeForOfAdaptor = /** @class */ (function () {
    function _DequeForOfAdaptor(matrix) {
        this.matrix_ = matrix;
        this.row_ = 0;
        this.col_ = 0;
    }
    _DequeForOfAdaptor.prototype.next = function () {
        if (this.row_ === this.matrix_.length)
            return {
                done: true,
                value: undefined
            };
        else {
            var val = this.matrix_[this.row_][this.col_];
            if (++this.col_ === this.matrix_[this.row_].length) {
                ++this.row_;
                this.col_ = 0;
            }
            return {
                done: false,
                value: val
            };
        }
    };
    _DequeForOfAdaptor.prototype[Symbol.iterator] = function () {
        return this;
    };
    return _DequeForOfAdaptor;
}());
exports._DequeForOfAdaptor = _DequeForOfAdaptor;
//# sourceMappingURL=_DequeForOfAdaptor.js.map

/***/ }),

/***/ "./node_modules/tstl/base/iterator/_InsertIterator.js":
/*!************************************************************!*\
  !*** ./node_modules/tstl/base/iterator/_InsertIterator.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @hidden
 */
var _InsertIterator = /** @class */ (function () {
    function _InsertIterator() {
    }
    /**
     * @inheritDoc
     */
    _InsertIterator.prototype.next = function () {
        return this;
    };
    return _InsertIterator;
}());
exports._InsertIterator = _InsertIterator;
//# sourceMappingURL=_InsertIterator.js.map

/***/ }),

/***/ "./node_modules/tstl/base/iterator/_NativeArrayIterator.js":
/*!*****************************************************************!*\
  !*** ./node_modules/tstl/base/iterator/_NativeArrayIterator.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @hidden
 */
var _NativeArrayIterator = /** @class */ (function () {
    /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
    function _NativeArrayIterator(data, index) {
        this.data_ = data;
        this.index_ = index;
    }
    /* ---------------------------------------------------------
        ACCESSORS
    --------------------------------------------------------- */
    _NativeArrayIterator.prototype.index = function () {
        return this.index_;
    };
    Object.defineProperty(_NativeArrayIterator.prototype, "value", {
        get: function () {
            return this.data_[this.index_];
        },
        enumerable: true,
        configurable: true
    });
    /* ---------------------------------------------------------
        MOVERS
    --------------------------------------------------------- */
    _NativeArrayIterator.prototype.prev = function () {
        --this.index_;
        return this;
    };
    _NativeArrayIterator.prototype.next = function () {
        ++this.index_;
        return this;
    };
    _NativeArrayIterator.prototype.advance = function (n) {
        this.index_ += n;
        return this;
    };
    /* ---------------------------------------------------------
        COMPARES
    --------------------------------------------------------- */
    _NativeArrayIterator.prototype.equals = function (obj) {
        return this.data_ === obj.data_ && this.index_ === obj.index_;
    };
    _NativeArrayIterator.prototype.swap = function (obj) {
        var _a, _b;
        _a = __read([obj.data_, this.data_], 2), this.data_ = _a[0], obj.data_ = _a[1];
        _b = __read([obj.index_, this.index_], 2), this.index_ = _b[0], obj.index_ = _b[1];
    };
    return _NativeArrayIterator;
}());
exports._NativeArrayIterator = _NativeArrayIterator;
//# sourceMappingURL=_NativeArrayIterator.js.map

/***/ }),

/***/ "./node_modules/tstl/base/iterator/_Repeater.js":
/*!******************************************************!*\
  !*** ./node_modules/tstl/base/iterator/_Repeater.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @hidden
 */
var _Repeater = /** @class */ (function () {
    /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
    function _Repeater(index, value) {
        this.index_ = index;
        this.value_ = value;
    }
    /* ---------------------------------------------------------
        ACCESSORS
    --------------------------------------------------------- */
    _Repeater.prototype.index = function () {
        return this.index_;
    };
    Object.defineProperty(_Repeater.prototype, "value", {
        get: function () {
            return this.value_;
        },
        enumerable: true,
        configurable: true
    });
    /* ---------------------------------------------------------
        MOVERS & COMPARE
    --------------------------------------------------------- */
    _Repeater.prototype.next = function () {
        ++this.index_;
        return this;
    };
    _Repeater.prototype.equals = function (obj) {
        return this.index_ === obj.index_;
    };
    return _Repeater;
}());
exports._Repeater = _Repeater;
//# sourceMappingURL=_Repeater.js.map

/***/ }),

/***/ "./node_modules/tstl/base/numeric/MathUtil.js":
/*!****************************************************!*\
  !*** ./node_modules/tstl/base/numeric/MathUtil.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std.base */
//================================================================
/**
 * @hidden
 */
var MathUtil;
(function (MathUtil) {
    function factorial(k) {
        if (FACTORIALS.length <= k)
            for (var i = FACTORIALS.length; i <= k; ++i)
                FACTORIALS.push(FACTORIALS[i - 1] * i);
        return FACTORIALS[k];
    }
    MathUtil.factorial = factorial;
    function integral(formula, first, last, segment_count) {
        if (segment_count === void 0) { segment_count = 100 * 1000; }
        var _a;
        if (first > last)
            _a = __read([last, first], 2), first = _a[0], last = _a[1];
        else if (first === last)
            return 0;
        var ret = 0.0;
        var interval = (last - first) / segment_count;
        for (; first < last; first += interval)
            ret += formula(first) * interval;
        return ret;
    }
    MathUtil.integral = integral;
    function sigma(formula, first, last) {
        var ret = 0.0;
        for (; first <= last; ++first)
            ret += formula(first);
        return ret;
    }
    MathUtil.sigma = sigma;
    var FACTORIALS = [1, 1];
})(MathUtil = exports.MathUtil || (exports.MathUtil = {}));
//# sourceMappingURL=MathUtil.js.map

/***/ }),

/***/ "./node_modules/tstl/base/thread/_SafeLock.js":
/*!****************************************************!*\
  !*** ./node_modules/tstl/base/thread/_SafeLock.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std.base */
//================================================================
/**
 * @hidden
 */
var _SafeLock;
(function (_SafeLock) {
    function lock(locker, unlocker, lambda) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, try_lock(locker, unlocker, lambda)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    _SafeLock.lock = lock;
    function try_lock(locker, unlocker, lambda) {
        return __awaiter(this, void 0, void 0, function () {
            var ret, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, locker()];
                    case 1:
                        ret = _a.sent();
                        if (ret === false)
                            return [2 /*return*/, false];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 6]);
                        return [4 /*yield*/, lambda()];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        error_1 = _a.sent();
                        return [4 /*yield*/, unlocker()];
                    case 5:
                        _a.sent();
                        throw error_1;
                    case 6: 
                    // TERMINATE THE CRITICAL SECTION
                    return [4 /*yield*/, unlocker()];
                    case 7:
                        // TERMINATE THE CRITICAL SECTION
                        _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    }
    _SafeLock.try_lock = try_lock;
})(_SafeLock = exports._SafeLock || (exports._SafeLock = {}));
//# sourceMappingURL=_SafeLock.js.map

/***/ }),

/***/ "./node_modules/tstl/base/tree/_MapTree.js":
/*!*************************************************!*\
  !*** ./node_modules/tstl/base/tree/_MapTree.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std.base */
//================================================================
var _XTree_1 = __webpack_require__(/*! ./_XTree */ "./node_modules/tstl/base/tree/_XTree.js");
var Pair_1 = __webpack_require__(/*! ../../utility/Pair */ "./node_modules/tstl/utility/Pair.js");
/**
 * @hidden
 */
var _MapTree = /** @class */ (function (_super) {
    __extends(_MapTree, _super);
    /* ---------------------------------------------------------
        CONSTRUCTOR
    --------------------------------------------------------- */
    function _MapTree(source, comp, it_comp) {
        var _this = _super.call(this, it_comp) || this;
        _this.source_ = source;
        _this.key_compare_ = comp;
        _this.key_eq_ = function (x, y) {
            return !comp(x, y) && !comp(y, x);
        };
        _this.value_compare_ = function (x, y) {
            return comp(x.first, y.first);
        };
        return _this;
    }
    /**
     * @internal
     */
    _MapTree._Swap_source = function (x, y) {
        var _a;
        _a = __read([y.source_, x.source_], 2), x.source_ = _a[0], y.source_ = _a[1];
    };
    /* ---------------------------------------------------------
        FINDERS
    --------------------------------------------------------- */
    _MapTree.prototype.get_by_key = function (key) {
        var ret = this.nearest_by_key(key);
        if (ret === null || !this.key_eq_(key, ret.value.first))
            return null;
        else
            return ret;
    };
    _MapTree.prototype.lower_bound = function (key) {
        var node = this.nearest_by_key(key);
        if (node === null)
            return this.source().end();
        else if (this.key_comp()(node.value.first, key)) // it < key
            return node.value.next();
        else
            return node.value;
    };
    _MapTree.prototype.equal_range = function (key) {
        return new Pair_1.Pair(this.lower_bound(key), this.upper_bound(key));
    };
    /* ---------------------------------------------------------
        ACCECSSORS
    --------------------------------------------------------- */
    _MapTree.prototype.source = function () {
        return this.source_;
    };
    _MapTree.prototype.key_comp = function () {
        return this.key_compare_;
    };
    _MapTree.prototype.key_eq = function () {
        return this.key_eq_;
    };
    _MapTree.prototype.value_comp = function () {
        return this.value_compare_;
    };
    return _MapTree;
}(_XTree_1._XTree));
exports._MapTree = _MapTree;
//# sourceMappingURL=_MapTree.js.map

/***/ }),

/***/ "./node_modules/tstl/base/tree/_MultiMapTree.js":
/*!******************************************************!*\
  !*** ./node_modules/tstl/base/tree/_MultiMapTree.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std.base */
//================================================================
var _MapTree_1 = __webpack_require__(/*! ./_MapTree */ "./node_modules/tstl/base/tree/_MapTree.js");
var uid_1 = __webpack_require__(/*! ../../functional/uid */ "./node_modules/tstl/functional/uid.js");
/**
 * @hidden
 */
var _MultiMapTree = /** @class */ (function (_super) {
    __extends(_MultiMapTree, _super);
    /* ---------------------------------------------------------
        CONSTRUCTOR
    --------------------------------------------------------- */
    function _MultiMapTree(source, comp) {
        return _super.call(this, source, comp, function (x, y) {
            var ret = comp(x.first, y.first);
            if (!ret && !comp(y.first, x.first))
                return uid_1.get_uid(x) < uid_1.get_uid(y);
            else
                return ret;
        }) || this;
    }
    _MultiMapTree.prototype.insert = function (val) {
        // ISSUE UID BEFORE INSERTION
        uid_1.get_uid(val);
        _super.prototype.insert.call(this, val);
    };
    /* ---------------------------------------------------------
        FINDERS
    --------------------------------------------------------- */
    _MultiMapTree.prototype._Nearest_by_key = function (key, equal_mover) {
        // NEED NOT TO ITERATE
        if (this.root_ === null)
            return null;
        //----
        // ITERATE
        //----
        var ret = this.root_;
        var matched = null;
        while (true) {
            var it = ret.value;
            var my_node = null;
            // COMPARE
            if (this.key_comp()(key, it.first))
                my_node = ret.left;
            else if (this.key_comp()(it.first, key))
                my_node = ret.right;
            else {
                // EQUAL, RESERVE THAT POINT
                matched = ret;
                my_node = equal_mover(ret);
            }
            // ULTIL CHILD NODE EXISTS
            if (my_node === null)
                break;
            else
                ret = my_node;
        }
        // RETURNS -> MATCHED OR NOT
        return (matched !== null) ? matched : ret;
    };
    _MultiMapTree.prototype.nearest_by_key = function (key) {
        return this._Nearest_by_key(key, function (node) {
            return node.left;
        });
    };
    _MultiMapTree.prototype.upper_bound = function (key) {
        // FIND MATCHED NODE
        var node = this._Nearest_by_key(key, function (node) {
            return node.right;
        });
        if (node === null) // NOTHING
            return this.source().end();
        // MUST BE it.first > key
        var it = node.value;
        if (this.key_comp()(key, it.first))
            return it;
        else
            return it.next();
    };
    return _MultiMapTree;
}(_MapTree_1._MapTree));
exports._MultiMapTree = _MultiMapTree;
//# sourceMappingURL=_MultiMapTree.js.map

/***/ }),

/***/ "./node_modules/tstl/base/tree/_MultiSetTree.js":
/*!******************************************************!*\
  !*** ./node_modules/tstl/base/tree/_MultiSetTree.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std.base */
//================================================================
var _SetTree_1 = __webpack_require__(/*! ./_SetTree */ "./node_modules/tstl/base/tree/_SetTree.js");
var uid_1 = __webpack_require__(/*! ../../functional/uid */ "./node_modules/tstl/functional/uid.js");
/**
 * @hidden
 */
var _MultiSetTree = /** @class */ (function (_super) {
    __extends(_MultiSetTree, _super);
    /* ---------------------------------------------------------
        CONSTRUCTOR
    --------------------------------------------------------- */
    function _MultiSetTree(source, comp) {
        return _super.call(this, source, comp, function (x, y) {
            var ret = comp(x.value, y.value);
            if (!ret && !comp(y.value, x.value))
                return uid_1.get_uid(x) < uid_1.get_uid(y);
            else
                return ret;
        }) || this;
    }
    _MultiSetTree.prototype.insert = function (val) {
        // ISSUE UID BEFORE INSERTION
        uid_1.get_uid(val);
        _super.prototype.insert.call(this, val);
    };
    /* ---------------------------------------------------------
        FINDERS
    --------------------------------------------------------- */
    _MultiSetTree.prototype._Nearest_by_key = function (val, equal_mover) {
        // NEED NOT TO ITERATE
        if (this.root_ === null)
            return null;
        //----
        // ITERATE
        //----
        var ret = this.root_;
        var matched = null;
        while (true) {
            var it = ret.value;
            var my_node = null;
            // COMPARE
            if (this.key_comp()(val, it.value))
                my_node = ret.left;
            else if (this.key_comp()(it.value, val))
                my_node = ret.right;
            else {
                // EQUAL, RESERVE THAT POINT
                matched = ret;
                my_node = equal_mover(ret);
            }
            // ULTIL CHILD NODE EXISTS
            if (my_node === null)
                break;
            else
                ret = my_node;
        }
        // RETURNS -> MATCHED OR NOT
        return (matched !== null) ? matched : ret;
    };
    _MultiSetTree.prototype.nearest_by_key = function (val) {
        return this._Nearest_by_key(val, function (node) {
            return node.left;
        });
    };
    _MultiSetTree.prototype.upper_bound = function (val) {
        // FIND MATCHED NODE
        var node = this._Nearest_by_key(val, function (node) {
            return node.right;
        });
        if (node === null) // NOTHING
            return this.source().end();
        // MUST BE it.first > key
        var it = node.value;
        if (this.key_comp()(val, it.value))
            return it;
        else
            return it.next();
    };
    return _MultiSetTree;
}(_SetTree_1._SetTree));
exports._MultiSetTree = _MultiSetTree;
//# sourceMappingURL=_MultiSetTree.js.map

/***/ }),

/***/ "./node_modules/tstl/base/tree/_SetTree.js":
/*!*************************************************!*\
  !*** ./node_modules/tstl/base/tree/_SetTree.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std.base */
//================================================================
var _XTree_1 = __webpack_require__(/*! ./_XTree */ "./node_modules/tstl/base/tree/_XTree.js");
var Pair_1 = __webpack_require__(/*! ../../utility/Pair */ "./node_modules/tstl/utility/Pair.js");
/**
 * @hidden
 */
var _SetTree = /** @class */ (function (_super) {
    __extends(_SetTree, _super);
    /* ---------------------------------------------------------
        CONSTRUCTOR
    --------------------------------------------------------- */
    function _SetTree(set, comp, it_comp) {
        var _this = _super.call(this, it_comp) || this;
        _this.source_ = set;
        _this.key_comp_ = comp;
        _this.key_eq_ = function (x, y) {
            return !comp(x, y) && !comp(y, x);
        };
        return _this;
    }
    /**
     * @internal
     */
    _SetTree._Swap_source = function (x, y) {
        var _a;
        _a = __read([y.source_, x.source_], 2), x.source_ = _a[0], y.source_ = _a[1];
    };
    /* ---------------------------------------------------------
        FINDERS
    --------------------------------------------------------- */
    _SetTree.prototype.get_by_key = function (val) {
        var ret = this.nearest_by_key(val);
        if (ret === null || !this.key_eq_(val, ret.value.value))
            return null;
        else
            return ret;
    };
    _SetTree.prototype.lower_bound = function (val) {
        var node = this.nearest_by_key(val);
        if (node === null)
            return this.source_.end();
        else if (this.key_comp_(node.value.value, val)) // it < key
            return node.value.next();
        else
            return node.value;
    };
    _SetTree.prototype.equal_range = function (val) {
        return new Pair_1.Pair(this.lower_bound(val), this.upper_bound(val));
    };
    /* ---------------------------------------------------------
        ACCESSORS
    --------------------------------------------------------- */
    _SetTree.prototype.source = function () {
        return this.source_;
    };
    _SetTree.prototype.key_comp = function () {
        return this.key_comp_;
    };
    _SetTree.prototype.key_eq = function () {
        return this.key_eq_;
    };
    _SetTree.prototype.value_comp = function () {
        return this.key_comp_;
    };
    return _SetTree;
}(_XTree_1._XTree));
exports._SetTree = _SetTree;
//# sourceMappingURL=_SetTree.js.map

/***/ }),

/***/ "./node_modules/tstl/base/tree/_UniqueMapTree.js":
/*!*******************************************************!*\
  !*** ./node_modules/tstl/base/tree/_UniqueMapTree.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std.base */
//================================================================
var _MapTree_1 = __webpack_require__(/*! ./_MapTree */ "./node_modules/tstl/base/tree/_MapTree.js");
/**
 * @hidden
 */
var _UniqueMapTree = /** @class */ (function (_super) {
    __extends(_UniqueMapTree, _super);
    /* ---------------------------------------------------------
        CONSTRUCTOR
    --------------------------------------------------------- */
    function _UniqueMapTree(source, comp) {
        return _super.call(this, source, comp, function (x, y) {
            return comp(x.first, y.first);
        }) || this;
    }
    /* ---------------------------------------------------------
        FINDERS
    --------------------------------------------------------- */
    _UniqueMapTree.prototype.nearest_by_key = function (key) {
        // NEED NOT TO ITERATE
        if (this.root_ === null)
            return null;
        //----
        // ITERATE
        //----
        var ret = this.root_;
        while (true) // UNTIL MEET THE MATCHED VALUE OR FINAL BRANCH
         {
            var it = ret.value;
            var my_node = null;
            // COMPARE
            if (this.key_comp()(key, it.first))
                my_node = ret.left;
            else if (this.key_comp()(it.first, key))
                my_node = ret.right;
            else
                return ret; // MATCHED VALUE
            // FINAL BRANCH? OR KEEP GOING
            if (my_node === null)
                break;
            else
                ret = my_node;
        }
        return ret; // DIFFERENT NODE
    };
    _UniqueMapTree.prototype.upper_bound = function (key) {
        // FIND MATCHED NODE
        var node = this.nearest_by_key(key);
        if (node === null)
            return this.source().end();
        // MUST BE it.first > key
        var it = node.value;
        if (this.key_comp()(key, it.first))
            return it;
        else
            return it.next();
    };
    return _UniqueMapTree;
}(_MapTree_1._MapTree));
exports._UniqueMapTree = _UniqueMapTree;
//# sourceMappingURL=_UniqueMapTree.js.map

/***/ }),

/***/ "./node_modules/tstl/base/tree/_UniqueSetTree.js":
/*!*******************************************************!*\
  !*** ./node_modules/tstl/base/tree/_UniqueSetTree.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std.base */
//================================================================
var _SetTree_1 = __webpack_require__(/*! ./_SetTree */ "./node_modules/tstl/base/tree/_SetTree.js");
/**
 * @hidden
 */
var _UniqueSetTree = /** @class */ (function (_super) {
    __extends(_UniqueSetTree, _super);
    /* ---------------------------------------------------------
        CONSTRUCTOR
    --------------------------------------------------------- */
    function _UniqueSetTree(source, comp) {
        return _super.call(this, source, comp, function (x, y) {
            return comp(x.value, y.value);
        }) || this;
    }
    /* ---------------------------------------------------------
        FINDERS
    --------------------------------------------------------- */
    _UniqueSetTree.prototype.nearest_by_key = function (val) {
        // NEED NOT TO ITERATE
        if (this.root_ === null)
            return null;
        //----
        // ITERATE
        //----
        var ret = this.root_;
        while (true) // UNTIL MEET THE MATCHED VALUE OR FINAL BRANCH
         {
            var it = ret.value;
            var my_node = null;
            // COMPARE
            if (this.key_comp()(val, it.value))
                my_node = ret.left;
            else if (this.key_comp()(it.value, val))
                my_node = ret.right;
            else
                return ret; // MATCHED VALUE
            // FINAL BRANCH? OR KEEP GOING
            if (my_node === null)
                break;
            else
                ret = my_node;
        }
        return ret; // DIFFERENT NODE
    };
    _UniqueSetTree.prototype.upper_bound = function (val) {
        //--------
        // FIND MATCHED NODE
        //--------
        var node = this.nearest_by_key(val);
        if (node === null)
            return this.source().end();
        //--------
        // RETURN BRANCH
        //--------
        var it = node.value;
        // MUST BE it.value > key
        if (this.key_comp()(val, it.value))
            return it;
        else
            return it.next();
    };
    return _UniqueSetTree;
}(_SetTree_1._SetTree));
exports._UniqueSetTree = _UniqueSetTree;
//# sourceMappingURL=_UniqueSetTree.js.map

/***/ }),

/***/ "./node_modules/tstl/base/tree/_XTree.js":
/*!***********************************************!*\
  !*** ./node_modules/tstl/base/tree/_XTree.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std.base */
//================================================================
var _XTreeNode_1 = __webpack_require__(/*! ./_XTreeNode */ "./node_modules/tstl/base/tree/_XTreeNode.js");
//--------
// The Red-Black Tree
//
// Reference: https://en.wikipedia.org/w/index.php?title=Red%E2%80%93black_tree
// Inventor: Rudolf Bayer
//--------
/**
 * @hidden
 */
var _XTree = /** @class */ (function () {
    /* ---------------------------------------------------------
        CONSTRUCTOR
    --------------------------------------------------------- */
    function _XTree(comp) {
        this.root_ = null;
        this.comp_ = comp;
        this.equal_ = function (x, y) {
            return !comp(x, y) && !comp(y, x);
        };
    }
    _XTree.prototype.clear = function () {
        this.root_ = null;
    };
    /* =========================================================
        ACCESSORS
            - GETTERS
            - COMPARISON
    ============================================================
        GETTERS
    --------------------------------------------------------- */
    _XTree.prototype.root = function () {
        return this.root_;
    };
    _XTree.prototype.get = function (val) {
        var ret = this.nearest(val);
        if (ret === null || !this.equal_(val, ret.value))
            return null;
        else
            return ret;
        // let ret: _XTreeNode<T> = this.root_;
        // while (ret !== null)
        // {
        // 	if (this.comp_(val, ret.value))
        // 		ret = ret.left;
        // 	else if (this.comp_(ret.value, val))
        // 		ret = ret.right;
        // 	else
        // 		return ret; // MATCHED VALUE
        // }
        // return ret; // NULL -> UNABLE TO FIND THE MATCHED VALUE
    };
    _XTree.prototype.nearest = function (val) {
        // NEED NOT TO ITERATE
        if (this.root_ === null)
            return null;
        //----
        // ITERATE
        //----
        var ret = this.root_;
        while (true) // UNTIL MEET THE MATCHED VALUE OR FINAL BRANCH
         {
            var my_node = null;
            // COMPARE
            if (this.comp_(val, ret.value))
                my_node = ret.left;
            else if (this.comp_(ret.value, val))
                my_node = ret.right;
            else
                return ret; // MATCHED VALUE
            // FINAL BRANCH? OR KEEP GOING
            if (my_node !== null)
                ret = my_node;
            else
                break;
        }
        return ret; // DIFFERENT NODE
    };
    _XTree.prototype._Fetch_maximum = function (node) {
        while (node.right !== null)
            node = node.right;
        return node;
    };
    /* =========================================================
        ELEMENTS I/O
            - INSERT
            - ERASE
            - COLOR
            - ROTATION
    ============================================================
        INSERT
    --------------------------------------------------------- */
    _XTree.prototype.insert = function (val) {
        var parent = this.nearest(val);
        var node = new _XTreeNode_1._XTreeNode(val, 1 /* RED */);
        if (parent === null)
            this.root_ = node;
        else {
            node.parent = parent;
            if (this.comp_(node.value, parent.value))
                parent.left = node;
            else
                parent.right = node;
        }
        this._Insert_case1(node);
    };
    _XTree.prototype._Insert_case1 = function (n) {
        if (n.parent === null)
            n.color = 0 /* BLACK */;
        else
            this._Insert_case2(n);
    };
    _XTree.prototype._Insert_case2 = function (n) {
        if (this._Fetch_color(n.parent) === 0 /* BLACK */)
            return;
        else
            this._Insert_case3(n);
    };
    _XTree.prototype._Insert_case3 = function (n) {
        if (this._Fetch_color(n.uncle) === 1 /* RED */) {
            n.parent.color = 0 /* BLACK */;
            n.uncle.color = 0 /* BLACK */;
            n.grand.color = 1 /* RED */;
            this._Insert_case1(n.grand);
        }
        else
            this._Insert_case4(n);
    };
    _XTree.prototype._Insert_case4 = function (n) {
        if (n === n.parent.right && n.parent === n.grand.left) {
            this._Rotate_left(n.parent);
            n = n.left;
        }
        else if (n === n.parent.left && n.parent === n.grand.right) {
            this._Rotate_right(n.parent);
            n = n.right;
        }
        this._Insert_case5(n);
    };
    _XTree.prototype._Insert_case5 = function (n) {
        n.parent.color = 0 /* BLACK */;
        n.grand.color = 1 /* RED */;
        if (n === n.parent.left && n.parent === n.grand.left)
            this._Rotate_right(n.grand);
        else
            this._Rotate_left(n.grand);
    };
    /* ---------------------------------------------------------
        ERASE
    --------------------------------------------------------- */
    _XTree.prototype.erase = function (val) {
        var node = this.get(val);
        if (node === null)
            return; // UNABLE TO FIND THE MATCHED NODE
        if (node.left !== null && node.right !== null) {
            var pred = this._Fetch_maximum(node.left);
            node.value = pred.value;
            node = pred;
        }
        var child = (node.right === null) ? node.left : node.right;
        if (this._Fetch_color(node) === 0 /* BLACK */) {
            node.color = this._Fetch_color(child);
            this._Erase_case1(node);
        }
        this._Replace_node(node, child);
        if (this._Fetch_color(this.root_) === 1 /* RED */)
            this.root_.color = 0 /* BLACK */;
    };
    _XTree.prototype._Erase_case1 = function (n) {
        if (n.parent === null)
            return;
        else
            this._Erase_case2(n);
    };
    _XTree.prototype._Erase_case2 = function (n) {
        if (this._Fetch_color(n.sibling) === 1 /* RED */) {
            n.parent.color = 1 /* RED */;
            n.sibling.color = 0 /* BLACK */;
            if (n === n.parent.left)
                this._Rotate_left(n.parent);
            else
                this._Rotate_right(n.parent);
        }
        this._Erase_case3(n);
    };
    _XTree.prototype._Erase_case3 = function (n) {
        if (this._Fetch_color(n.parent) === 0 /* BLACK */ &&
            this._Fetch_color(n.sibling) === 0 /* BLACK */ &&
            this._Fetch_color(n.sibling.left) === 0 /* BLACK */ &&
            this._Fetch_color(n.sibling.right) === 0 /* BLACK */) {
            n.sibling.color = 1 /* RED */;
            this._Erase_case1(n.parent);
        }
        else
            this._Erase_case4(n);
    };
    _XTree.prototype._Erase_case4 = function (N) {
        if (this._Fetch_color(N.parent) === 1 /* RED */ &&
            N.sibling !== null &&
            this._Fetch_color(N.sibling) === 0 /* BLACK */ &&
            this._Fetch_color(N.sibling.left) === 0 /* BLACK */ &&
            this._Fetch_color(N.sibling.right) === 0 /* BLACK */) {
            N.sibling.color = 1 /* RED */;
            N.parent.color = 0 /* BLACK */;
        }
        else
            this._Erase_case5(N);
    };
    _XTree.prototype._Erase_case5 = function (n) {
        if (n === n.parent.left &&
            n.sibling !== null &&
            this._Fetch_color(n.sibling) === 0 /* BLACK */ &&
            this._Fetch_color(n.sibling.left) === 1 /* RED */ &&
            this._Fetch_color(n.sibling.right) === 0 /* BLACK */) {
            n.sibling.color = 1 /* RED */;
            n.sibling.left.color = 0 /* BLACK */;
            this._Rotate_right(n.sibling);
        }
        else if (n === n.parent.right &&
            n.sibling !== null &&
            this._Fetch_color(n.sibling) === 0 /* BLACK */ &&
            this._Fetch_color(n.sibling.left) === 0 /* BLACK */ &&
            this._Fetch_color(n.sibling.right) === 1 /* RED */) {
            n.sibling.color = 1 /* RED */;
            n.sibling.right.color = 0 /* BLACK */;
            this._Rotate_left(n.sibling);
        }
        this._Erase_case6(n);
    };
    _XTree.prototype._Erase_case6 = function (n) {
        n.sibling.color = this._Fetch_color(n.parent);
        n.parent.color = 0 /* BLACK */;
        if (n === n.parent.left) {
            n.sibling.right.color = 0 /* BLACK */;
            this._Rotate_left(n.parent);
        }
        else {
            n.sibling.left.color = 0 /* BLACK */;
            this._Rotate_right(n.parent);
        }
    };
    /* ---------------------------------------------------------
        ROTATION
    --------------------------------------------------------- */
    _XTree.prototype._Rotate_left = function (node) {
        var right = node.right;
        this._Replace_node(node, right);
        node.right = right.left;
        if (right.left !== null)
            right.left.parent = node;
        right.left = node;
        node.parent = right;
    };
    _XTree.prototype._Rotate_right = function (node) {
        var left = node.left;
        this._Replace_node(node, left);
        node.left = left.right;
        if (left.right !== null)
            left.right.parent = node;
        left.right = node;
        node.parent = left;
    };
    _XTree.prototype._Replace_node = function (oldNode, newNode) {
        if (oldNode.parent === null)
            this.root_ = newNode;
        else {
            if (oldNode === oldNode.parent.left)
                oldNode.parent.left = newNode;
            else
                oldNode.parent.right = newNode;
        }
        if (newNode !== null)
            newNode.parent = oldNode.parent;
    };
    /* ---------------------------------------------------------
        COLOR
    --------------------------------------------------------- */
    _XTree.prototype._Fetch_color = function (node) {
        if (node === null)
            return 0 /* BLACK */;
        else
            return node.color;
    };
    return _XTree;
}());
exports._XTree = _XTree;
//# sourceMappingURL=_XTree.js.map

/***/ }),

/***/ "./node_modules/tstl/base/tree/_XTreeNode.js":
/*!***************************************************!*\
  !*** ./node_modules/tstl/base/tree/_XTreeNode.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @hidden
 */
var _XTreeNode = /** @class */ (function () {
    /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
    function _XTreeNode(value, color) {
        this.value = value;
        this.color = color;
        this.parent = null;
        this.left = null;
        this.right = null;
    }
    Object.defineProperty(_XTreeNode.prototype, "grand", {
        get: function () {
            return this.parent.parent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_XTreeNode.prototype, "sibling", {
        get: function () {
            if (this === this.parent.left)
                return this.parent.right;
            else
                return this.parent.left;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_XTreeNode.prototype, "uncle", {
        get: function () {
            return this.parent.sibling;
        },
        enumerable: true,
        configurable: true
    });
    return _XTreeNode;
}());
exports._XTreeNode = _XTreeNode;
//# sourceMappingURL=_XTreeNode.js.map

/***/ }),

/***/ "./node_modules/tstl/container/Deque.js":
/*!**********************************************!*\
  !*** ./node_modules/tstl/container/Deque.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std */
//================================================================
var ArrayContainer_1 = __webpack_require__(/*! ../base/container/ArrayContainer */ "./node_modules/tstl/base/container/ArrayContainer.js");
var ArrayIterator_1 = __webpack_require__(/*! ../base/iterator/ArrayIterator */ "./node_modules/tstl/base/iterator/ArrayIterator.js");
var _DequeForOfAdaptor_1 = __webpack_require__(/*! ../base/iterator/_DequeForOfAdaptor */ "./node_modules/tstl/base/iterator/_DequeForOfAdaptor.js");
var _NativeArrayIterator_1 = __webpack_require__(/*! ../base/iterator/_NativeArrayIterator */ "./node_modules/tstl/base/iterator/_NativeArrayIterator.js");
var Pair_1 = __webpack_require__(/*! ../utility/Pair */ "./node_modules/tstl/utility/Pair.js");
var LogicError_1 = __webpack_require__(/*! ../exception/LogicError */ "./node_modules/tstl/exception/LogicError.js");
var global_1 = __webpack_require__(/*! ../iterator/global */ "./node_modules/tstl/iterator/global.js");
/**
 * Double ended queue.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var Deque = /** @class */ (function (_super) {
    __extends(Deque, _super);
    function Deque() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        // CONSTRUCTORS BRANCH
        if (args.length === 0) {
            _this.clear();
        }
        if (args.length === 1 && args[0] instanceof Array) {
            // INITIALIZER CONSTRUCTOR
            var array = args[0];
            var first = new _NativeArrayIterator_1._NativeArrayIterator(array, 0);
            var last = new _NativeArrayIterator_1._NativeArrayIterator(array, array.length);
            _this.assign(first, last);
        }
        else if (args.length === 1 && args[0] instanceof Deque) {
            // COPY CONSTRUCTOR
            var container = args[0];
            _this.assign(container.begin(), container.end());
        }
        else if (args.length === 2) {
            // ASSIGN CONSTRUCTOR
            _this.assign(args[0], args[1]);
        }
        return _this;
    }
    Deque.prototype.assign = function (first, second) {
        // CLEAR PREVIOUS CONTENTS
        this.clear();
        // INSERT ITEMS
        this.insert(this.end(), first, second);
    };
    /**
     * @inheritDoc
     */
    Deque.prototype.clear = function () {
        // CLEAR CONTENTS
        this.matrix_ = [[]];
        // RE-INDEX
        this.size_ = 0;
        this.capacity_ = Deque.MIN_CAPACITY;
    };
    /**
     * Reserve {@link capacity} enable to store *n* elements.
     *
     * @param n The capacity to reserve.
     */
    Deque.prototype.reserve = function (n) {
        if (n < this.capacity_)
            return;
        // NEW MEMBERS TO BE ASSSIGNED
        var matrix = [[]];
        var col_size = this._Compute_col_size(n);
        //--------
        // RE-FILL
        //--------
        for (var r = 0; r < this.matrix_.length; ++r) {
            var row = this.matrix_[r];
            for (var c = 0; c < row.length; ++c) {
                var new_row = matrix[matrix.length - 1];
                if (matrix.length < Deque.ROW_SIZE && new_row.length === col_size) {
                    new_row = [];
                    matrix.push(new_row);
                }
                new_row.push(row[c]);
            }
        }
        // ASSIGN MEMBERS
        this.matrix_ = matrix;
        this.capacity_ = n;
    };
    /**
     * @inheritDoc
     */
    Deque.prototype.resize = function (n) {
        var expansion = n - this.size();
        if (expansion > 0)
            this.insert(this.end(), expansion, undefined);
        else if (expansion < 0)
            this.erase(this.end().advance(-expansion), this.end());
    };
    /**
     * Shrink {@link capacity} to actual {@link size}.
     */
    Deque.prototype.shrink_to_fit = function () {
        this.reserve(this.size());
    };
    /**
     * @inheritDoc
     */
    Deque.prototype.swap = function (obj) {
        var _a, _b, _c;
        // SWAP CONTENTS
        _a = __read([obj.matrix_, this.matrix_], 2), this.matrix_ = _a[0], obj.matrix_ = _a[1];
        _b = __read([obj.size_, this.size_], 2), this.size_ = _b[0], obj.size_ = _b[1];
        _c = __read([obj.capacity_, this.capacity_], 2), this.capacity_ = _c[0], obj.capacity_ = _c[1];
    };
    /* =========================================================
        ACCESSORS
            - BASIC ELEMENTS
            - INDEX ACCESSORS
    ============================================================
        BASIC ELEMENTS
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    Deque.prototype.size = function () {
        return this.size_;
    };
    /**
     * The capacity to store elements.
     *
     * @return The capacity.
     */
    Deque.prototype.capacity = function () {
        return this.capacity_;
    };
    /**
     * @inheritDoc
     */
    Deque.prototype[Symbol.iterator] = function () {
        return new _DequeForOfAdaptor_1._DequeForOfAdaptor(this.matrix_);
    };
    /* ---------------------------------------------------------
        INDEX ACCESSORS
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    Deque.prototype.at = function (index) {
        if (0 <= index && index < this.size()) {
            var indexPair = this._Fetch_index(index);
            return this.matrix_[indexPair.first][indexPair.second];
        }
        else
            throw new LogicError_1.OutOfRange("Target index is greater than Deque's size.");
    };
    /**
     * @inheritDoc
     */
    Deque.prototype.set = function (index, val) {
        if (index >= this.size() || index < 0)
            throw new LogicError_1.OutOfRange("Target index is greater than Deque's size.");
        var indexPair = this._Fetch_index(index);
        this.matrix_[indexPair.first][indexPair.second] = val;
    };
    /**
     * @hidden
     */
    Deque.prototype._Fetch_index = function (index) {
        // Fetch row and column's index.
        var row;
        for (row = 0; row < this.matrix_.length; row++) {
            var array = this.matrix_[row];
            if (index < array.length)
                break;
            index -= array.length;
        }
        if (row === this.matrix_.length)
            row--;
        return new Pair_1.Pair(row, index);
    };
    /**
     * @hidden
     */
    Deque.prototype._Compute_col_size = function (capacity) {
        if (capacity === void 0) { capacity = this.capacity_; }
        // Get column size; {@link capacity_ capacity} / {@link ROW_SIZE row}.
        return Math.floor(capacity / Deque.ROW_SIZE);
    };
    /* =========================================================
        ELEMENTS I/O
            - PUSH & POP
            - INSERT
            - ERASE
    ============================================================
        PUSH & POP
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    Deque.prototype.push = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        if (items.length === 0)
            return this.size();
        // INSERT BY RANGE
        var first = new _NativeArrayIterator_1._NativeArrayIterator(items, 0);
        var last = new _NativeArrayIterator_1._NativeArrayIterator(items, items.length);
        this._Insert_by_range(this.end(), first, last);
        // RETURN SIZE
        return this.size();
    };
    /**
     * @inheritDoc
     */
    Deque.prototype.push_front = function (val) {
        // ADD CAPACITY & ROW
        this._Try_expand_capacity(this.size_ + 1);
        this._Try_add_row_at_front();
        // INSERT VALUE
        this.matrix_[0].unshift(val);
        ++this.size_;
    };
    /**
     * @inheritDoc
     */
    Deque.prototype.push_back = function (val) {
        // ADD CAPACITY & ROW
        this._Try_expand_capacity(this.size_ + 1);
        this._Try_add_row_at_back();
        // INSERT VALUE
        this.matrix_[this.matrix_.length - 1].push(val);
        ++this.size_;
    };
    /**
     * @inheritDoc
     */
    Deque.prototype.pop_front = function () {
        if (this.empty() === true)
            return; // TODO: THROW EXCEPTION
        // EREASE FIRST ELEMENT
        this.matrix_[0].shift();
        if (this.matrix_[0].length === 0 && this.matrix_.length > 1)
            this.matrix_.shift();
        // SHRINK SIZE
        this.size_--;
    };
    /**
     * @inheritDoc
     */
    Deque.prototype.pop_back = function () {
        if (this.empty() === true)
            return; // TODO: THROW EXCEPTION
        // ERASE LAST ELEMENT
        var lastArray = this.matrix_[this.matrix_.length - 1];
        lastArray.pop();
        if (lastArray.length === 0 && this.matrix_.length > 1)
            this.matrix_.pop();
        // SHRINK SIZE
        this.size_--;
    };
    /* ---------------------------------------------------------
        INSERT
    --------------------------------------------------------- */
    /**
     * @hidden
     */
    Deque.prototype._Insert_by_range = function (pos, first, last) {
        var size = this.size_ + global_1.distance(first, last);
        if (size === this.size_) // FIRST === LAST
            return pos;
        if (pos.equals(this.end()) === true) {
            // EXPAND CAPACITY IF REQUIRED
            this._Try_expand_capacity(size);
            // INSERT TO END
            this._Insert_to_end(first, last);
            // CHANGE POS TO RETURN
            pos = new ArrayIterator_1.ArrayIterator(this, this.size_);
        }
        else {
            // INSERT ITEMS IN THE MIDDLE
            if (size > this.capacity_) {
                // A TEMPORARY DEQUE
                var deque_1 = new Deque();
                deque_1.reserve(Math.max(size, Math.floor(this.capacity_ * Deque.MAGNIFIER)));
                // INSERT ITEM SEQUENTIALLY
                deque_1._Insert_to_end(this.begin(), pos);
                deque_1._Insert_to_end(first, last);
                deque_1._Insert_to_end(pos, this.end());
                // AND SWAP THIS WITH THE TEMP
                this.swap(deque_1);
            }
            else
                this._Insert_to_middle(pos, first, last);
        }
        this.size_ = size;
        return pos;
    };
    /**
     * @hidden
     */
    Deque.prototype._Insert_to_middle = function (pos, first, last) {
        var _a, _b;
        var col_size = this._Compute_col_size();
        // POSITION OF MATRIX
        var indexes = this._Fetch_index(pos.index());
        var row = this.matrix_[indexes.first];
        var col = indexes.second;
        // MOVE BACK SIDE TO TEMPORARY ARRAY
        var back_items = row.splice(col);
        // INSERT ITEMS
        for (; !first.equals(last); first = first.next()) {
            if (row.length === col_size && this.matrix_.length < Deque.ROW_SIZE) {
                row = new Array();
                var spliced_array = this.matrix_.splice(++indexes.first);
                this.matrix_.push(row);
                (_a = this.matrix_).push.apply(_a, __spread(spliced_array));
            }
            row.push(first.value);
        }
        // INSERT ITEMS IN THE BACK SIDE
        for (var i = 0; i < back_items.length; ++i) {
            if (row.length === col_size && this.matrix_.length < Deque.ROW_SIZE) {
                row = new Array();
                var spliced_array = this.matrix_.splice(++indexes.first);
                this.matrix_.push(row);
                (_b = this.matrix_).push.apply(_b, __spread(spliced_array));
            }
            row.push(back_items[i]);
        }
    };
    /**
     * @hidden
     */
    Deque.prototype._Insert_to_end = function (first, last) {
        // INSERT ITEMS IN THE BACK
        for (; !first.equals(last); first = first.next()) {
            // ADD ROW IF REQUIRED
            this._Try_add_row_at_back();
            // INSERT VALUE
            this.matrix_[this.matrix_.length - 1].push(first.value);
        }
    };
    /**
     * @hidden
     */
    Deque.prototype._Try_expand_capacity = function (size) {
        if (size <= this.capacity_)
            return false;
        // MAX (CAPACITY * 1.5, TARGET SIZE)
        size = Math.max(size, Math.floor(this.capacity_ * Deque.MAGNIFIER));
        this.reserve(size);
        return true;
    };
    /**
     * @hidden
     */
    Deque.prototype._Try_add_row_at_front = function () {
        var _a;
        var col_size = this._Compute_col_size();
        if (this.matrix_[0].length >= col_size && this.matrix_.length < Deque.ROW_SIZE) {
            this.matrix_ = (_a = [[]]).concat.apply(_a, __spread(this.matrix_));
            return true;
        }
        else
            return false;
    };
    /**
     * @hidden
     */
    Deque.prototype._Try_add_row_at_back = function () {
        var col_size = this._Compute_col_size();
        if (this.matrix_[this.matrix_.length - 1].length >= col_size && this.matrix_.length < Deque.ROW_SIZE) {
            this.matrix_.push([]);
            return true;
        }
        else
            return false;
    };
    /* ---------------------------------------------------------
        ERASE
    --------------------------------------------------------- */
    /**
     * @hidden
     */
    Deque.prototype._Erase_by_range = function (first, last) {
        if (first.index() >= this.size())
            return first;
        // INDEXING
        var size;
        if (last.index() >= this.size()) // LAST IS END()
            size = this.size() - first.index();
        else // LAST IS NOT END()
            size = last.index() - first.index();
        this.size_ -= size;
        // ERASING
        var first_row = null;
        var second_row = null;
        var i = 0;
        while (size !== 0) {
            // FIND MATCHED ROW AND COLUMN
            var indexes = this._Fetch_index(first.index());
            var row = this.matrix_[indexes.first];
            var col = indexes.second;
            // EARSE FROM THE ROW
            var my_delete_size = Math.min(size, row.length - col);
            row.splice(col, my_delete_size);
            // TO MERGE
            if (row.length !== 0)
                if (i === 0)
                    first_row = row;
                else
                    second_row = row;
            // ERASE THE ENTIRE ROW IF REQUIRED
            if (row.length === 0 && this.matrix_.length > 1)
                this.matrix_.splice(indexes.first, 1);
            // TO THE NEXT STEP
            size -= my_delete_size;
            ++i;
        }
        // MERGE FIRST AND SECOND ROW
        if (first_row !== null && second_row !== null
            && first_row.length + second_row.length <= this._Compute_col_size()) {
            first_row.push.apply(first_row, __spread(second_row));
            this.matrix_.splice(this.matrix_.indexOf(second_row), 1);
        }
        return first;
    };
    Object.defineProperty(Deque, "ROW_SIZE", {
        /* ---------------------------------------------------------
            STATIC MEMBERS
        --------------------------------------------------------- */
        ///
        // Row size of the {@link matrix_ matrix} which contains elements.
        // 
        // Note that the {@link ROW_SIZE} affects on time complexity of accessing and inserting element. 
        // Accessing element is {@link ROW_SIZE} times slower than ordinary {@link Vector} and inserting element 
        // in middle position is {@link ROW_SIZE} times faster than ordinary {@link Vector}.
        // 
        // When the {@link ROW_SIZE} returns 8, time complexity of accessing element is O(8) and inserting 
        // element in middle position is O(N/8). ({@link Vector}'s time complexity of accessement is O(1)
        // and inserting element is O(N)).
        /**
         * @hidden
         */
        get: function () { return 8; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Deque, "MIN_CAPACITY", {
        ///
        // Minimum {@link capacity}.
        // 
        // Although a {@link Deque} has few elements, even no element is belonged to, the {@link Deque} 
        // keeps the minimum {@link capacity} at least.
        /**
         * @hidden
         */
        get: function () { return 36; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Deque, "MAGNIFIER", {
        /**
         * @hidden
         */
        get: function () { return 1.5; },
        enumerable: true,
        configurable: true
    });
    return Deque;
}(ArrayContainer_1.ArrayContainer));
exports.Deque = Deque;
(function (Deque) {
    // BODY
    Deque.Iterator = ArrayIterator_1.ArrayIterator;
    Deque.ReverseIterator = ArrayIterator_1.ArrayReverseIterator;
    // BODY
    Deque.iterator = Deque.Iterator;
    Deque.reverse_iterator = Deque.ReverseIterator;
})(Deque = exports.Deque || (exports.Deque = {}));
exports.Deque = Deque;
exports.deque = Deque;
//# sourceMappingURL=Deque.js.map

/***/ }),

/***/ "./node_modules/tstl/container/ForwardList.js":
/*!****************************************************!*\
  !*** ./node_modules/tstl/container/ForwardList.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ForOfAdaptor_1 = __webpack_require__(/*! ../base/iterator/ForOfAdaptor */ "./node_modules/tstl/base/iterator/ForOfAdaptor.js");
var _Repeater_1 = __webpack_require__(/*! ../base/iterator/_Repeater */ "./node_modules/tstl/base/iterator/_Repeater.js");
var Vector_1 = __webpack_require__(/*! ./Vector */ "./node_modules/tstl/container/Vector.js");
var global_1 = __webpack_require__(/*! ../iterator/global */ "./node_modules/tstl/iterator/global.js");
var comparators_1 = __webpack_require__(/*! ../functional/comparators */ "./node_modules/tstl/functional/comparators.js");
var sorting_1 = __webpack_require__(/*! ../algorithm/sorting */ "./node_modules/tstl/algorithm/sorting.js");
/**
 * Singly Linked List.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var ForwardList = /** @class */ (function () {
    function ForwardList() {
        var e_1, _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.ptr_ = { value: this };
        this.clear();
        if (args.length === 1 && args[0] instanceof Array) {
            var array = args[0];
            var it = this.before_begin();
            try {
                for (var array_1 = __values(array), array_1_1 = array_1.next(); !array_1_1.done; array_1_1 = array_1.next()) {
                    var val = array_1_1.value;
                    it = this.insert_after(it, val);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (array_1_1 && !array_1_1.done && (_a = array_1.return)) _a.call(array_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        else if (args.length === 1 && args[0] instanceof ForwardList) {
            this.assign(args[0].begin(), args[0].end());
        }
        else if (args.length === 2)
            this.assign(args[0], args[1]);
    }
    ForwardList.prototype.assign = function (first, last) {
        this.clear();
        this.insert_after(this.before_begin_, first, last);
    };
    /**
     * @inheritDoc
     */
    ForwardList.prototype.clear = function () {
        this.end_ = new ForwardList.Iterator(this.ptr_, null, null);
        this.before_begin_ = new ForwardList.Iterator(this.ptr_, this.end_);
        this.size_ = 0;
    };
    /* ===============================================================
        ACCESSORS
    =============================================================== */
    /**
     * @inheritDoc
     */
    ForwardList.prototype.size = function () {
        return this.size_;
    };
    /**
     * @inheritDoc
     */
    ForwardList.prototype.empty = function () {
        return this.size_ === 0;
    };
    ForwardList.prototype.front = function (val) {
        var it = this.begin();
        if (arguments.length === 0)
            return it.value;
        else
            it.value = val;
    };
    /**
     * Iterator to before beginning.
     *
     * @return Iterator to the before beginning.
     */
    ForwardList.prototype.before_begin = function () {
        return this.before_begin_;
    };
    /**
     * @inheritDoc
     */
    ForwardList.prototype.begin = function () {
        return this.before_begin_.next();
    };
    /**
     * @inheritDoc
     */
    ForwardList.prototype.end = function () {
        return this.end_;
        ;
    };
    /**
     * @inheritDoc
     */
    ForwardList.prototype[Symbol.iterator] = function () {
        return new ForOfAdaptor_1.ForOfAdaptor(this.begin(), this.end());
    };
    /* ===============================================================
        ELEMENTS I/O
            - INSERT
            - ERASE
    ==================================================================
        INSERT
    --------------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    ForwardList.prototype.push_front = function (val) {
        this.insert_after(this.before_begin_, val);
    };
    ForwardList.prototype.insert_after = function (pos) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var ret;
        // BRANCHES
        if (args.length === 1)
            ret = this._Insert_by_repeating_val(pos, 1, args[0]);
        else if (typeof args[0] === "number")
            ret = this._Insert_by_repeating_val(pos, args[0], args[1]);
        else
            ret = this._Insert_by_range(pos, args[0], args[1]);
        // RETURNS
        return ret;
    };
    /**
     * @hidden
     */
    ForwardList.prototype._Insert_by_repeating_val = function (pos, n, val) {
        var first = new _Repeater_1._Repeater(0, val);
        var last = new _Repeater_1._Repeater(n);
        return this._Insert_by_range(pos, first, last);
    };
    /**
     * @hidden
     */
    ForwardList.prototype._Insert_by_range = function (pos, first, last) {
        var nodes = [];
        var count = 0;
        for (; !first.equals(last); first = first.next()) {
            var node = new ForwardList.Iterator(this.ptr_, null, first.value);
            nodes.push(node);
            ++count;
        }
        if (count === 0)
            return pos;
        for (var i = 0; i < count - 1; ++i)
            ForwardList.Iterator._Set_next(nodes[i], nodes[i + 1]);
        ForwardList.Iterator._Set_next(nodes[nodes.length - 1], pos.next());
        ForwardList.Iterator._Set_next(pos, nodes[0]);
        this.size_ += count;
        return nodes[nodes.length - 1];
    };
    /* ---------------------------------------------------------------
        ERASE
    --------------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    ForwardList.prototype.pop_front = function () {
        this.erase_after(this.before_begin());
    };
    ForwardList.prototype.erase_after = function (first, last) {
        if (last === void 0) { last = global_1.advance(first, 2); }
        // SHRINK SIZE
        this.size_ -= Math.max(0, global_1.distance(first, last) - 1);
        // RE-CONNECT
        ForwardList.Iterator._Set_next(first, last);
        return last;
    };
    /* ===============================================================
        ALGORITHMS
            - UNIQUE & REMOVE(_IF)
            - MERGE & SPLICE
            - SORT
    ==================================================================
        UNIQUE & REMOVE(_IF)
    --------------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    ForwardList.prototype.unique = function (binary_pred) {
        if (binary_pred === void 0) { binary_pred = comparators_1.equal_to; }
        for (var it = this.begin().next(); !it.equals(this.end()); it = it.next()) {
            var next_it = it.next();
            if (next_it.equals(this.end()))
                break;
            if (binary_pred(it.value, next_it.value))
                this.erase_after(it);
        }
    };
    /**
     * @inheritDoc
     */
    ForwardList.prototype.remove = function (val) {
        return this.remove_if(function (elem) { return comparators_1.equal_to(elem, val); });
    };
    /**
     * @inheritDoc
     */
    ForwardList.prototype.remove_if = function (pred) {
        var count = 0;
        for (var it = this.before_begin(); !it.next().equals(this.end()); it = it.next())
            if (pred(it.next().value) === true) {
                ForwardList.Iterator._Set_next(it, it.next().next());
                ++count;
            }
        this.size_ -= count;
    };
    /* ---------------------------------------------------------------
        MERGE & SPLICE
    --------------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    ForwardList.prototype.merge = function (from, comp) {
        if (comp === void 0) { comp = comparators_1.less; }
        if (this === from)
            return;
        var it = this.before_begin();
        while (from.empty() === false) {
            var value = from.begin().value;
            while (!it.next().equals(this.end()) && comp(it.next().value, value))
                it = it.next();
            this.splice_after(it, from, from.before_begin());
        }
    };
    ForwardList.prototype.splice_after = function (pos, from, first_before, last) {
        if (first_before === void 0) { first_before = from.before_begin(); }
        if (last === void 0) { last = first_before.next().next(); }
        // DEFAULT PARAMETERS
        if (last === null)
            last = from.end();
        // INSERT & ERASE
        this.insert_after(pos, first_before.next(), last);
        from.erase_after(first_before, last);
    };
    /* ---------------------------------------------------------------
        SORT
    --------------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    ForwardList.prototype.sort = function (comp) {
        if (comp === void 0) { comp = comparators_1.less; }
        var vec = new Vector_1.Vector(this.begin(), this.end());
        sorting_1.sort(vec.begin(), vec.end(), comp);
        this.assign(vec.begin(), vec.end());
    };
    /**
     * @inheritDoc
     */
    ForwardList.prototype.reverse = function () {
        var vec = new Vector_1.Vector(this.begin(), this.end());
        this.assign(vec.rbegin(), vec.rend());
    };
    /* ---------------------------------------------------------------
        UTILITIES
    --------------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    ForwardList.prototype.swap = function (obj) {
        var _a, _b, _c, _d, _e;
        // SIZE AND NODES
        _a = __read([obj.size_, this.size_], 2), this.size_ = _a[0], obj.size_ = _a[1];
        _b = __read([obj.before_begin_, this.before_begin_], 2), this.before_begin_ = _b[0], obj.before_begin_ = _b[1];
        _c = __read([obj.end_, this.end_], 2), this.end_ = _c[0], obj.end_ = _c[1];
        // POINTER OF THE SOURCE
        _d = __read([obj.ptr_, this.ptr_], 2), this.ptr_ = _d[0], obj.ptr_ = _d[1];
        _e = __read([obj.ptr_.value, this.ptr_.value], 2), this.ptr_.value = _e[0], obj.ptr_.value = _e[1];
    };
    /**
     * Native function for `JSON.stringify()`.
     *
     * @return An array containing children elements.
     */
    ForwardList.prototype.toJSON = function () {
        var e_2, _a;
        var ret = [];
        try {
            for (var _b = __values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
                var elem = _c.value;
                ret.push(elem);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return ret;
    };
    return ForwardList;
}());
exports.ForwardList = ForwardList;
(function (ForwardList) {
    /**
     * Iterator of the ForwardList.
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    var Iterator = /** @class */ (function () {
        function Iterator(source, next, value) {
            this.source_ptr_ = source;
            this.next_ = next;
            this.value_ = value;
        }
        /* ---------------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------------- */
        /**
         * Get source container.
         *
         * @return The source container.
         */
        Iterator.prototype.source = function () {
            return this.source_ptr_.value;
        };
        Object.defineProperty(Iterator.prototype, "value", {
            /**
             * @inheritDoc
             */
            get: function () {
                return this.value_;
            },
            /**
             * @inheritDoc
             */
            set: function (val) {
                this.value_ = val;
            },
            enumerable: true,
            configurable: true
        });
        /* ---------------------------------------------------------
            MOVERS
        --------------------------------------------------------- */
        /**
         * @inheritDoc
         */
        Iterator.prototype.next = function () {
            return this.next_;
        };
        /**
         * @inheritDoc
         */
        Iterator.prototype.equals = function (obj) {
            return this === obj;
        };
        /**
         * @internal
         */
        Iterator._Set_next = function (it, next) {
            it.next_ = next;
        };
        return Iterator;
    }());
    ForwardList.Iterator = Iterator;
})(ForwardList = exports.ForwardList || (exports.ForwardList = {}));
exports.ForwardList = ForwardList;
exports.forward_list = ForwardList;
//# sourceMappingURL=ForwardList.js.map

/***/ }),

/***/ "./node_modules/tstl/container/HashMap.js":
/*!************************************************!*\
  !*** ./node_modules/tstl/container/HashMap.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std */
//================================================================
var UniqueMap_1 = __webpack_require__(/*! ../base/container/UniqueMap */ "./node_modules/tstl/base/container/UniqueMap.js");
var _IHashContainer_1 = __webpack_require__(/*! ../base/container/_IHashContainer */ "./node_modules/tstl/base/container/_IHashContainer.js");
var _MapHashBuckets_1 = __webpack_require__(/*! ../base/hash/_MapHashBuckets */ "./node_modules/tstl/base/hash/_MapHashBuckets.js");
var MapIterator_1 = __webpack_require__(/*! ../base/iterator/MapIterator */ "./node_modules/tstl/base/iterator/MapIterator.js");
var Entry_1 = __webpack_require__(/*! ../utility/Entry */ "./node_modules/tstl/utility/Entry.js");
var Pair_1 = __webpack_require__(/*! ../utility/Pair */ "./node_modules/tstl/utility/Pair.js");
/**
 * Unique-key Map based on Hash buckets.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var HashMap = /** @class */ (function (_super) {
    __extends(HashMap, _super);
    function HashMap() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        _IHashContainer_1._Construct.apply(void 0, __spread([_this, HashMap,
            function (hash, pred) {
                _this.buckets_ = new _MapHashBuckets_1._MapHashBuckets(_this, hash, pred);
            }], args));
        return _this;
    }
    /* ---------------------------------------------------------
        ASSIGN & CLEAR
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    HashMap.prototype.clear = function () {
        this.buckets_.clear();
        _super.prototype.clear.call(this);
    };
    /**
     * @inheritDoc
     */
    HashMap.prototype.swap = function (obj) {
        var _a;
        // SWAP CONTENTS
        _super.prototype.swap.call(this, obj);
        // SWAP BUCKETS
        _MapHashBuckets_1._MapHashBuckets._Swap_source(this.buckets_, obj.buckets_);
        _a = __read([obj.buckets_, this.buckets_], 2), this.buckets_ = _a[0], obj.buckets_ = _a[1];
    };
    /* =========================================================
        ACCESSORS
            - MEMBER
            - HASH
    ============================================================
        MEMBER
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    HashMap.prototype.find = function (key) {
        return this.buckets_.find(key);
    };
    HashMap.prototype.begin = function (index) {
        if (index === void 0) { index = null; }
        if (index === null)
            return _super.prototype.begin.call(this);
        else
            return this.buckets_.at(index)[0];
    };
    HashMap.prototype.end = function (index) {
        if (index === void 0) { index = null; }
        if (index === null)
            return _super.prototype.end.call(this);
        else {
            var bucket = this.buckets_.at(index);
            return bucket[bucket.length - 1].next();
        }
    };
    HashMap.prototype.rbegin = function (index) {
        if (index === void 0) { index = null; }
        return this.end(index).reverse();
    };
    HashMap.prototype.rend = function (index) {
        if (index === void 0) { index = null; }
        return this.begin(index).reverse();
    };
    /* ---------------------------------------------------------
        HASH
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    HashMap.prototype.bucket_count = function () {
        return this.buckets_.size();
    };
    /**
     * @inheritDoc
     */
    HashMap.prototype.bucket_size = function (index) {
        return this.buckets_.at(index).length;
    };
    /**
     * @inheritDoc
     */
    HashMap.prototype.load_factor = function () {
        return this.buckets_.load_factor();
    };
    /**
     * @inheritDoc
     */
    HashMap.prototype.hash_function = function () {
        return this.buckets_.hash_function();
    };
    /**
     * @inheritDoc
     */
    HashMap.prototype.key_eq = function () {
        return this.buckets_.key_eq();
    };
    /**
     * @inheritDoc
     */
    HashMap.prototype.bucket = function (key) {
        return this.hash_function()(key) % this.buckets_.size();
    };
    HashMap.prototype.max_load_factor = function (z) {
        if (z === void 0) { z = null; }
        return this.buckets_.max_load_factor(z);
    };
    /**
     * @inheritDoc
     */
    HashMap.prototype.reserve = function (n) {
        this.buckets_.reserve(n);
    };
    /**
     * @inheritDoc
     */
    HashMap.prototype.rehash = function (n) {
        if (n <= this.bucket_count())
            return;
        this.buckets_.rehash(n);
    };
    /* =========================================================
        ELEMENTS I/O
            - INSERT
            - POST-PROCESS
    ============================================================
        INSERT
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    HashMap.prototype.emplace = function (key, val) {
        // TEST WHETHER EXIST
        var it = this.find(key);
        if (it.equals(this.end()) === false)
            return new Pair_1.Pair(it, false);
        // INSERT
        this.data_.push(new Entry_1.Entry(key, val));
        it = it.prev();
        // POST-PROCESS
        this._Handle_insert(it, it.next());
        return new Pair_1.Pair(it, true);
    };
    /**
     * @inheritDoc
     */
    HashMap.prototype.emplace_hint = function (hint, key, val) {
        // FIND DUPLICATED KEY
        var it = this.find(key);
        if (it.equals(this.end()) === true) {
            // INSERT
            it = this.data_.insert(hint, new Entry_1.Entry(key, val));
            // POST-PROCESS
            this._Handle_insert(it, it.next());
        }
        return it;
    };
    /**
     * @hidden
     */
    HashMap.prototype._Insert_by_range = function (first, last) {
        //--------
        // INSERTIONS
        //--------
        // PRELIMINY
        var my_first = this.end().prev();
        // INSERT ELEMENTS
        for (var it = first; !it.equals(last); it = it.next()) {
            // TEST WHETER EXIST
            if (this.has(it.value.first))
                continue;
            // INSERTS
            this.data_.push(new Entry_1.Entry(it.value.first, it.value.second));
        }
        my_first = my_first.next();
        //--------
        // HASHING INSERTED ITEMS
        //--------
        // IF NEEDED, HASH_BUCKET TO HAVE SUITABLE SIZE
        if (this.size() > this.buckets_.capacity())
            this.reserve(Math.max(this.size(), this.buckets_.capacity() * 2));
        // POST-PROCESS
        this._Handle_insert(my_first, this.end());
    };
    /* ---------------------------------------------------------
        POST-PROCESS
    --------------------------------------------------------- */
    /**
     * @hidden
     */
    HashMap.prototype._Handle_insert = function (first, last) {
        for (; !first.equals(last); first = first.next())
            this.buckets_.insert(first);
    };
    /**
     * @hidden
     */
    HashMap.prototype._Handle_erase = function (first, last) {
        for (; !first.equals(last); first = first.next())
            this.buckets_.erase(first);
    };
    return HashMap;
}(UniqueMap_1.UniqueMap));
exports.HashMap = HashMap;
(function (HashMap) {
    // BODY
    HashMap.Iterator = MapIterator_1.MapIterator;
    HashMap.ReverseIterator = MapIterator_1.MapReverseIterator;
    // BODY
    HashMap.iterator = HashMap.Iterator;
    HashMap.reverse_iterator = HashMap.ReverseIterator;
})(HashMap = exports.HashMap || (exports.HashMap = {}));
exports.HashMap = HashMap;
exports.unordered_map = HashMap;
//# sourceMappingURL=HashMap.js.map

/***/ }),

/***/ "./node_modules/tstl/container/HashMultiMap.js":
/*!*****************************************************!*\
  !*** ./node_modules/tstl/container/HashMultiMap.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std */
//================================================================
var MultiMap_1 = __webpack_require__(/*! ../base/container/MultiMap */ "./node_modules/tstl/base/container/MultiMap.js");
var _IHashContainer_1 = __webpack_require__(/*! ../base/container/_IHashContainer */ "./node_modules/tstl/base/container/_IHashContainer.js");
var _MapHashBuckets_1 = __webpack_require__(/*! ../base/hash/_MapHashBuckets */ "./node_modules/tstl/base/hash/_MapHashBuckets.js");
var MapIterator_1 = __webpack_require__(/*! ../base/iterator/MapIterator */ "./node_modules/tstl/base/iterator/MapIterator.js");
var Entry_1 = __webpack_require__(/*! ../utility/Entry */ "./node_modules/tstl/utility/Entry.js");
var _NativeArrayIterator_1 = __webpack_require__(/*! ../base/iterator/_NativeArrayIterator */ "./node_modules/tstl/base/iterator/_NativeArrayIterator.js");
/**
 * Multiple-key Map based on Hash buckets.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var HashMultiMap = /** @class */ (function (_super) {
    __extends(HashMultiMap, _super);
    function HashMultiMap() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        _IHashContainer_1._Construct.apply(void 0, __spread([_this, HashMultiMap,
            function (hash, pred) {
                _this.buckets_ = new _MapHashBuckets_1._MapHashBuckets(_this, hash, pred);
            }], args));
        return _this;
    }
    /* ---------------------------------------------------------
        ASSIGN & CLEAR
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    HashMultiMap.prototype.clear = function () {
        this.buckets_.clear();
        _super.prototype.clear.call(this);
    };
    /**
     * @inheritDoc
     */
    HashMultiMap.prototype.swap = function (obj) {
        var _a;
        // SWAP CONTENTS
        _super.prototype.swap.call(this, obj);
        // SWAP BUCKETS
        _MapHashBuckets_1._MapHashBuckets._Swap_source(this.buckets_, obj.buckets_);
        _a = __read([obj.buckets_, this.buckets_], 2), this.buckets_ = _a[0], obj.buckets_ = _a[1];
    };
    /* =========================================================
        ACCESSORS
            - MEMBER
            - HASH
    ============================================================
        MEMBER
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    HashMultiMap.prototype.find = function (key) {
        return this.buckets_.find(key);
    };
    /**
     * @inheritDoc
     */
    HashMultiMap.prototype.count = function (key) {
        var e_1, _a;
        // FIND MATCHED BUCKET
        var index = this.bucket(key);
        var bucket = this.buckets_.at(index);
        // ITERATE THE BUCKET
        var cnt = 0;
        try {
            for (var bucket_1 = __values(bucket), bucket_1_1 = bucket_1.next(); !bucket_1_1.done; bucket_1_1 = bucket_1.next()) {
                var it = bucket_1_1.value;
                if (this.buckets_.key_eq()(it.first, key))
                    ++cnt;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (bucket_1_1 && !bucket_1_1.done && (_a = bucket_1.return)) _a.call(bucket_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return cnt;
    };
    HashMultiMap.prototype.begin = function (index) {
        if (index === void 0) { index = null; }
        if (index === null)
            return _super.prototype.begin.call(this);
        else
            return this.buckets_.at(index)[0];
    };
    HashMultiMap.prototype.end = function (index) {
        if (index === void 0) { index = null; }
        if (index === null)
            return _super.prototype.end.call(this);
        else {
            var bucket = this.buckets_.at(index);
            return bucket[bucket.length - 1].next();
        }
    };
    HashMultiMap.prototype.rbegin = function (index) {
        if (index === void 0) { index = null; }
        return this.end(index).reverse();
    };
    HashMultiMap.prototype.rend = function (index) {
        if (index === void 0) { index = null; }
        return this.begin(index).reverse();
    };
    /* ---------------------------------------------------------
        HASH
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    HashMultiMap.prototype.bucket_count = function () {
        return this.buckets_.size();
    };
    /**
     * @inheritDoc
     */
    HashMultiMap.prototype.bucket_size = function (index) {
        return this.buckets_.at(index).length;
    };
    /**
     * @inheritDoc
     */
    HashMultiMap.prototype.load_factor = function () {
        return this.buckets_.load_factor();
    };
    /**
     * @inheritDoc
     */
    HashMultiMap.prototype.hash_function = function () {
        return this.buckets_.hash_function();
    };
    /**
     * @inheritDoc
     */
    HashMultiMap.prototype.key_eq = function () {
        return this.buckets_.key_eq();
    };
    /**
     * @inheritDoc
     */
    HashMultiMap.prototype.bucket = function (key) {
        return this.hash_function()(key) % this.buckets_.size();
    };
    HashMultiMap.prototype.max_load_factor = function (z) {
        if (z === void 0) { z = null; }
        return this.buckets_.max_load_factor(z);
    };
    /**
     * @inheritDoc
     */
    HashMultiMap.prototype.reserve = function (n) {
        this.buckets_.reserve(n);
    };
    /**
     * @inheritDoc
     */
    HashMultiMap.prototype.rehash = function (n) {
        if (n <= this.bucket_count())
            return;
        this.buckets_.rehash(n);
    };
    /**
     * @hidden
     */
    HashMultiMap.prototype._Key_eq = function (x, y) {
        return this.key_eq()(x, y);
    };
    /* =========================================================
        ELEMENTS I/O
            - INSERT
            - POST-PROCESS
    ============================================================
        INSERT
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    HashMultiMap.prototype.emplace = function (key, val) {
        // INSERT
        var it = this.data_.insert(this.data_.end(), new Entry_1.Entry(key, val));
        this._Handle_insert(it, it.next()); // POST-PROCESS
        return it;
    };
    /**
     * @inheritDoc
     */
    HashMultiMap.prototype.emplace_hint = function (hint, key, val) {
        // INSERT
        var it = this.data_.insert(hint, new Entry_1.Entry(key, val));
        // POST-PROCESS
        this._Handle_insert(it, it.next());
        return it;
    };
    /**
     * @hidden
     */
    HashMultiMap.prototype._Insert_by_range = function (first, last) {
        //--------
        // INSERTIONS
        //--------
        // PRELIMINARIES
        var entries = [];
        for (var it = first; !it.equals(last); it = it.next())
            entries.push(new Entry_1.Entry(it.value.first, it.value.second));
        // INSERT ELEMENTS
        var my_first = this.data_.insert(this.data_.end(), new _NativeArrayIterator_1._NativeArrayIterator(entries, 0), new _NativeArrayIterator_1._NativeArrayIterator(entries, entries.length));
        //--------
        // HASHING INSERTED ITEMS
        //--------
        // IF NEEDED, HASH_BUCKET TO HAVE SUITABLE SIZE
        if (this.size() > this.buckets_.capacity())
            this.reserve(Math.max(this.size(), this.buckets_.capacity() * 2));
        // POST-PROCESS
        this._Handle_insert(my_first, this.end());
    };
    /* ---------------------------------------------------------
        POST-PROCESS
    --------------------------------------------------------- */
    /**
     * @hidden
     */
    HashMultiMap.prototype._Handle_insert = function (first, last) {
        for (; !first.equals(last); first = first.next())
            this.buckets_.insert(first);
    };
    /**
     * @hidden
     */
    HashMultiMap.prototype._Handle_erase = function (first, last) {
        for (; !first.equals(last); first = first.next())
            this.buckets_.erase(first);
    };
    return HashMultiMap;
}(MultiMap_1.MultiMap));
exports.HashMultiMap = HashMultiMap;
(function (HashMultiMap) {
    // BODY
    HashMultiMap.Iterator = MapIterator_1.MapIterator;
    HashMultiMap.ReverseIterator = MapIterator_1.MapReverseIterator;
    // BODY
    HashMultiMap.iterator = HashMultiMap.Iterator;
    HashMultiMap.reverse_iterator = HashMultiMap.ReverseIterator;
})(HashMultiMap = exports.HashMultiMap || (exports.HashMultiMap = {}));
exports.HashMultiMap = HashMultiMap;
exports.unordered_multimap = HashMultiMap;
//# sourceMappingURL=HashMultiMap.js.map

/***/ }),

/***/ "./node_modules/tstl/container/HashMultiSet.js":
/*!*****************************************************!*\
  !*** ./node_modules/tstl/container/HashMultiSet.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std */
//================================================================
var MultiSet_1 = __webpack_require__(/*! ../base/container/MultiSet */ "./node_modules/tstl/base/container/MultiSet.js");
var _IHashContainer_1 = __webpack_require__(/*! ../base/container/_IHashContainer */ "./node_modules/tstl/base/container/_IHashContainer.js");
var _SetHashBuckets_1 = __webpack_require__(/*! ../base/hash/_SetHashBuckets */ "./node_modules/tstl/base/hash/_SetHashBuckets.js");
var SetIterator_1 = __webpack_require__(/*! ../base/iterator/SetIterator */ "./node_modules/tstl/base/iterator/SetIterator.js");
/**
 * Multiple-key Set based on Hash buckets.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var HashMultiSet = /** @class */ (function (_super) {
    __extends(HashMultiSet, _super);
    function HashMultiSet() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        _IHashContainer_1._Construct.apply(void 0, __spread([_this, HashMultiSet,
            function (hash, pred) {
                _this.buckets_ = new _SetHashBuckets_1._SetHashBuckets(_this, hash, pred);
            }], args));
        return _this;
    }
    /* ---------------------------------------------------------
        ASSIGN & CLEAR
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    HashMultiSet.prototype.clear = function () {
        this.buckets_.clear();
        _super.prototype.clear.call(this);
    };
    /**
     * @inheritDoc
     */
    HashMultiSet.prototype.swap = function (obj) {
        var _a;
        // SWAP CONTENTS
        _super.prototype.swap.call(this, obj);
        // SWAP BUCKETS
        _SetHashBuckets_1._SetHashBuckets._Swap_source(this.buckets_, obj.buckets_);
        _a = __read([obj.buckets_, this.buckets_], 2), this.buckets_ = _a[0], obj.buckets_ = _a[1];
    };
    /* =========================================================
        ACCESSORS
            - MEMBER
            - HASH
    ============================================================
        MEMBER
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    HashMultiSet.prototype.find = function (key) {
        return this.buckets_.find(key);
    };
    /**
     * @inheritDoc
     */
    HashMultiSet.prototype.count = function (key) {
        var e_1, _a;
        // FIND MATCHED BUCKET
        var index = this.bucket(key);
        var bucket = this.buckets_.at(index);
        // ITERATE THE BUCKET
        var cnt = 0;
        try {
            for (var bucket_1 = __values(bucket), bucket_1_1 = bucket_1.next(); !bucket_1_1.done; bucket_1_1 = bucket_1.next()) {
                var it = bucket_1_1.value;
                if (this.buckets_.key_eq()(it.value, key))
                    ++cnt;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (bucket_1_1 && !bucket_1_1.done && (_a = bucket_1.return)) _a.call(bucket_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return cnt;
    };
    HashMultiSet.prototype.begin = function (index) {
        if (index === void 0) { index = null; }
        if (index === null)
            return _super.prototype.begin.call(this);
        else
            return this.buckets_.at(index)[0];
    };
    HashMultiSet.prototype.end = function (index) {
        if (index === void 0) { index = null; }
        if (index === null)
            return _super.prototype.end.call(this);
        else {
            var bucket = this.buckets_.at(index);
            return bucket[bucket.length - 1].next();
        }
    };
    HashMultiSet.prototype.rbegin = function (index) {
        if (index === void 0) { index = null; }
        return this.end(index).reverse();
    };
    HashMultiSet.prototype.rend = function (index) {
        if (index === void 0) { index = null; }
        return this.begin(index).reverse();
    };
    /* ---------------------------------------------------------
        HASH
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    HashMultiSet.prototype.bucket_count = function () {
        return this.buckets_.size();
    };
    /**
     * @inheritDoc
     */
    HashMultiSet.prototype.bucket_size = function (n) {
        return this.buckets_.at(n).length;
    };
    /**
     * @inheritDoc
     */
    HashMultiSet.prototype.load_factor = function () {
        return this.buckets_.load_factor();
    };
    /**
     * @inheritDoc
     */
    HashMultiSet.prototype.hash_function = function () {
        return this.buckets_.hash_function();
    };
    /**
     * @inheritDoc
     */
    HashMultiSet.prototype.key_eq = function () {
        return this.buckets_.key_eq();
    };
    /**
     * @inheritDoc
     */
    HashMultiSet.prototype.bucket = function (key) {
        return this.hash_function()(key) % this.buckets_.size();
    };
    HashMultiSet.prototype.max_load_factor = function (z) {
        if (z === void 0) { z = null; }
        return this.buckets_.max_load_factor(z);
    };
    /**
     * @inheritDoc
     */
    HashMultiSet.prototype.reserve = function (n) {
        this.buckets_.rehash(Math.ceil(n * this.max_load_factor()));
    };
    /**
     * @inheritDoc
     */
    HashMultiSet.prototype.rehash = function (n) {
        if (n <= this.bucket_count())
            return;
        this.buckets_.rehash(n);
    };
    /**
     * @hidden
     */
    HashMultiSet.prototype._Key_eq = function (x, y) {
        return this.key_eq()(x, y);
    };
    /* =========================================================
        ELEMENTS I/O
            - INSERT
            - POST-PROCESS
    ============================================================
        INSERT
    --------------------------------------------------------- */
    /**
     * @hidden
     */
    HashMultiSet.prototype._Insert_by_key = function (key) {
        // INSERT
        var it = this.data_.insert(this.data_.end(), key);
        this._Handle_insert(it, it.next()); // POST-PROCESS
        return it;
    };
    /**
     * @hidden
     */
    HashMultiSet.prototype._Insert_by_hint = function (hint, key) {
        // INSERT
        var it = this.data_.insert(hint, key);
        // POST-PROCESS
        this._Handle_insert(it, it.next());
        return it;
    };
    /**
     * @hidden
     */
    HashMultiSet.prototype._Insert_by_range = function (first, last) {
        // INSERT ELEMENTS
        var my_first = this.data_.insert(this.data_.end(), first, last);
        // IF NEEDED, HASH_BUCKET TO HAVE SUITABLE SIZE
        if (this.size() > this.buckets_.capacity())
            this.reserve(Math.max(this.size(), this.buckets_.capacity() * 2));
        // POST-PROCESS
        this._Handle_insert(my_first, this.end());
    };
    /* ---------------------------------------------------------
        POST-PROCESS
    --------------------------------------------------------- */
    /**
     * @hidden
     */
    HashMultiSet.prototype._Handle_insert = function (first, last) {
        for (; !first.equals(last); first = first.next())
            this.buckets_.insert(first);
    };
    /**
     * @hidden
     */
    HashMultiSet.prototype._Handle_erase = function (first, last) {
        for (; !first.equals(last); first = first.next())
            this.buckets_.erase(first);
    };
    return HashMultiSet;
}(MultiSet_1.MultiSet));
exports.HashMultiSet = HashMultiSet;
(function (HashMultiSet) {
    // BODY
    HashMultiSet.Iterator = SetIterator_1.SetIterator;
    HashMultiSet.ReverseIterator = SetIterator_1.SetReverseIterator;
    // BODY
    HashMultiSet.iterator = HashMultiSet.Iterator;
    HashMultiSet.reverse_iterator = HashMultiSet.ReverseIterator;
})(HashMultiSet = exports.HashMultiSet || (exports.HashMultiSet = {}));
exports.HashMultiSet = HashMultiSet;
exports.unordered_multiset = HashMultiSet;
//# sourceMappingURL=HashMultiSet.js.map

/***/ }),

/***/ "./node_modules/tstl/container/HashSet.js":
/*!************************************************!*\
  !*** ./node_modules/tstl/container/HashSet.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std */
//================================================================
var UniqueSet_1 = __webpack_require__(/*! ../base/container/UniqueSet */ "./node_modules/tstl/base/container/UniqueSet.js");
var _IHashContainer_1 = __webpack_require__(/*! ../base/container/_IHashContainer */ "./node_modules/tstl/base/container/_IHashContainer.js");
var _SetHashBuckets_1 = __webpack_require__(/*! ../base/hash/_SetHashBuckets */ "./node_modules/tstl/base/hash/_SetHashBuckets.js");
var SetIterator_1 = __webpack_require__(/*! ../base/iterator/SetIterator */ "./node_modules/tstl/base/iterator/SetIterator.js");
var Pair_1 = __webpack_require__(/*! ../utility/Pair */ "./node_modules/tstl/utility/Pair.js");
/**
 * Unique-key Set based on Hash buckets.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var HashSet = /** @class */ (function (_super) {
    __extends(HashSet, _super);
    function HashSet() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        _IHashContainer_1._Construct.apply(void 0, __spread([_this, HashSet,
            function (hash, pred) {
                _this.buckets_ = new _SetHashBuckets_1._SetHashBuckets(_this, hash, pred);
            }], args));
        return _this;
    }
    /* ---------------------------------------------------------
        ASSIGN & CLEAR
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    HashSet.prototype.clear = function () {
        this.buckets_.clear();
        _super.prototype.clear.call(this);
    };
    /**
     * @inheritDoc
     */
    HashSet.prototype.swap = function (obj) {
        var _a;
        // SWAP CONTENTS
        _super.prototype.swap.call(this, obj);
        // SWAP BUCKETS
        _SetHashBuckets_1._SetHashBuckets._Swap_source(this.buckets_, obj.buckets_);
        _a = __read([obj.buckets_, this.buckets_], 2), this.buckets_ = _a[0], obj.buckets_ = _a[1];
    };
    /* =========================================================
        ACCESSORS
            - MEMBER
            - HASH
    ============================================================
        MEMBER
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    HashSet.prototype.find = function (key) {
        return this.buckets_.find(key);
    };
    HashSet.prototype.begin = function (index) {
        if (index === void 0) { index = null; }
        if (index === null)
            return _super.prototype.begin.call(this);
        else
            return this.buckets_.at(index)[0];
    };
    HashSet.prototype.end = function (index) {
        if (index === void 0) { index = null; }
        if (index === null)
            return _super.prototype.end.call(this);
        else {
            var bucket = this.buckets_.at(index);
            return bucket[bucket.length - 1].next();
        }
    };
    HashSet.prototype.rbegin = function (index) {
        if (index === void 0) { index = null; }
        return this.end(index).reverse();
    };
    HashSet.prototype.rend = function (index) {
        if (index === void 0) { index = null; }
        return this.begin(index).reverse();
    };
    /* ---------------------------------------------------------
        HASH
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    HashSet.prototype.bucket_count = function () {
        return this.buckets_.size();
    };
    /**
     * @inheritDoc
     */
    HashSet.prototype.bucket_size = function (n) {
        return this.buckets_.at(n).length;
    };
    /**
     * @inheritDoc
     */
    HashSet.prototype.load_factor = function () {
        return this.buckets_.load_factor();
    };
    /**
     * @inheritDoc
     */
    HashSet.prototype.hash_function = function () {
        return this.buckets_.hash_function();
    };
    /**
     * @inheritDoc
     */
    HashSet.prototype.key_eq = function () {
        return this.buckets_.key_eq();
    };
    /**
     * @inheritDoc
     */
    HashSet.prototype.bucket = function (key) {
        return this.hash_function()(key) % this.buckets_.size();
    };
    HashSet.prototype.max_load_factor = function (z) {
        if (z === void 0) { z = null; }
        return this.buckets_.max_load_factor(z);
    };
    /**
     * @inheritDoc
     */
    HashSet.prototype.reserve = function (n) {
        this.buckets_.rehash(Math.ceil(n * this.max_load_factor()));
    };
    /**
     * @inheritDoc
     */
    HashSet.prototype.rehash = function (n) {
        if (n <= this.bucket_count())
            return;
        this.buckets_.rehash(n);
    };
    /* =========================================================
        ELEMENTS I/O
            - INSERT
            - POST-PROCESS
            - SWAP
    ============================================================
        INSERT
    --------------------------------------------------------- */
    /**
     * @hidden
     */
    HashSet.prototype._Insert_by_key = function (key) {
        // TEST WHETHER EXIST
        var it = this.find(key);
        if (it.equals(this.end()) === false)
            return new Pair_1.Pair(it, false);
        // INSERT
        this.data_.push(key);
        it = it.prev();
        // POST-PROCESS
        this._Handle_insert(it, it.next());
        return new Pair_1.Pair(it, true);
    };
    /**
     * @hidden
     */
    HashSet.prototype._Insert_by_hint = function (hint, key) {
        // FIND DUPLICATED KEY
        var it = this.find(key);
        if (it.equals(this.end()) === true) {
            // INSERT
            it = this.data_.insert(hint, key);
            // POST-PROCESS
            this._Handle_insert(it, it.next());
        }
        return it;
    };
    /**
     * @hidden
     */
    HashSet.prototype._Insert_by_range = function (first, last) {
        //--------
        // INSERTIONS
        //--------
        // PRELIMINARY
        var my_first = this.end().prev();
        // INSERT ELEMENTS
        for (; !first.equals(last); first = first.next()) {
            // TEST WHETER EXIST
            if (this.has(first.value))
                continue;
            // INSERTS
            this.data_.push(first.value);
        }
        my_first = my_first.next();
        //--------
        // HASHING INSERTED ITEMS
        //--------
        // IF NEEDED, HASH_BUCKET TO HAVE SUITABLE SIZE
        if (this.size() > this.buckets_.capacity())
            this.reserve(Math.max(this.size(), this.buckets_.capacity() * 2));
        // POST-PROCESS
        this._Handle_insert(my_first, this.end());
    };
    /* ---------------------------------------------------------
        POST-PROCESS
    --------------------------------------------------------- */
    /**
     * @hidden
     */
    HashSet.prototype._Handle_insert = function (first, last) {
        for (; !first.equals(last); first = first.next())
            this.buckets_.insert(first);
    };
    /**
     * @hidden
     */
    HashSet.prototype._Handle_erase = function (first, last) {
        for (; !first.equals(last); first = first.next())
            this.buckets_.erase(first);
    };
    return HashSet;
}(UniqueSet_1.UniqueSet));
exports.HashSet = HashSet;
(function (HashSet) {
    // BODY
    HashSet.Iterator = SetIterator_1.SetIterator;
    HashSet.ReverseIterator = SetIterator_1.SetReverseIterator;
    // BODY
    HashSet.iterator = HashSet.Iterator;
    HashSet.reverse_iterator = HashSet.ReverseIterator;
})(HashSet = exports.HashSet || (exports.HashSet = {}));
exports.HashSet = HashSet;
exports.unordered_set = HashSet;
//# sourceMappingURL=HashSet.js.map

/***/ }),

/***/ "./node_modules/tstl/container/List.js":
/*!*********************************************!*\
  !*** ./node_modules/tstl/container/List.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std */
//================================================================
var ListContainer_1 = __webpack_require__(/*! ../base/container/ListContainer */ "./node_modules/tstl/base/container/ListContainer.js");
var ListIterator_1 = __webpack_require__(/*! ../base/iterator/ListIterator */ "./node_modules/tstl/base/iterator/ListIterator.js");
var ReverseIterator_1 = __webpack_require__(/*! ../base/iterator/ReverseIterator */ "./node_modules/tstl/base/iterator/ReverseIterator.js");
var comparators_1 = __webpack_require__(/*! ../functional/comparators */ "./node_modules/tstl/functional/comparators.js");
/**
 * Doubly Linked List.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var List = /** @class */ (function (_super) {
    __extends(List, _super);
    function List() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = 
        //----
        // DEFAULT CONFIGURATIONS
        //----
        // INHERITS
        _super.call(this) || this;
        // DECLARE SOURCE POINTER
        _this.ptr_ = { value: _this };
        List.Iterator._Set_source_ptr(_this.end_, _this.ptr_);
        //----
        // BRANCHES
        //----
        if (args.length === 0) {
            // DEFAULT CONSTRUCTOR
        }
        else if (args.length === 1 && args[0] instanceof Array) {
            // INITIALIZER CONSTRUCTOR
            var array = args[0];
            _this.push.apply(_this, __spread(array));
        }
        else if (args.length === 1 && (args[0] instanceof List)) {
            // COPY CONSTRUCTOR
            var container = args[0];
            _this.assign(container.begin(), container.end());
        }
        else if (args.length === 2) {
            // ASSIGN CONTRUCTOR
            _this.assign(args[0], args[1]);
        }
        return _this;
    }
    /**
     * @hidden
     */
    List.prototype._Create_iterator = function (prev, next, val) {
        return new List.Iterator(this.ptr_, prev, next, val);
    };
    List.prototype.front = function (val) {
        if (arguments.length === 0)
            return this.begin_.value;
        else
            this.begin_.value = val;
    };
    List.prototype.back = function (val) {
        var it = this.end().prev();
        if (arguments.length === 0)
            return it.value;
        else
            it.value = val;
    };
    /* ===============================================================
        ALGORITHMS
            - UNIQUE & REMOVE(_IF)
            - MERGE & SPLICE
            - SORT & SWAP
    ==================================================================
        UNIQUE & REMOVE(_IF)
    --------------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    List.prototype.unique = function (binary_pred) {
        if (binary_pred === void 0) { binary_pred = comparators_1.equal_to; }
        var it = this.begin().next();
        while (!it.equals(this.end())) {
            if (binary_pred(it.value, it.prev().value) === true)
                it = this.erase(it);
            else
                it = it.next();
        }
    };
    /**
     * @inheritDoc
     */
    List.prototype.remove = function (val) {
        return this.remove_if(function (elem) { return comparators_1.equal_to(elem, val); });
    };
    /**
     * @inheritDoc
     */
    List.prototype.remove_if = function (pred) {
        var it = this.begin();
        while (!it.equals(this.end())) {
            if (pred(it.value) === true)
                it = this.erase(it);
            else
                it = it.next();
        }
    };
    /* ---------------------------------------------------------
        MERGE & SPLICE
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    List.prototype.merge = function (source, comp) {
        if (comp === void 0) { comp = comparators_1.less; }
        if (this === source)
            return;
        var it = this.begin();
        while (source.empty() === false) {
            var first = source.begin();
            while (!it.equals(this.end()) && comp(it.value, first.value) === true)
                it = it.next();
            this.splice(it, source, first);
        }
    };
    List.prototype.splice = function (pos, obj, first, last) {
        if (first === undefined) {
            first = obj.begin();
            last = obj.end();
        }
        else if (last === undefined)
            last = first.next();
        this.insert(pos, first, last);
        obj.erase(first, last);
    };
    /* ---------------------------------------------------------
        SORT & SWAP
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    List.prototype.sort = function (comp) {
        if (comp === void 0) { comp = comparators_1.less; }
        this._Quick_sort(this.begin(), this.end().prev(), comp);
    };
    /**
     * @hidden
     */
    List.prototype._Quick_sort = function (first, last, comp) {
        if (!first.equals(last) && !last.equals(this.end()) && !first.equals(last.next())) {
            var temp = this._Quick_sort_partition(first, last, comp);
            this._Quick_sort(first, temp.prev(), comp);
            this._Quick_sort(temp.next(), last, comp);
        }
    };
    /**
     * @hidden
     */
    List.prototype._Quick_sort_partition = function (first, last, comp) {
        var _a, _b;
        var standard = last.value; // TO BE COMPARED
        var prev = first.prev(); // TO BE SMALLEST
        var it = first;
        for (; !it.equals(last); it = it.next())
            if (comp(it.value, standard)) {
                prev = prev.equals(this.end()) ? first : prev.next();
                _a = __read([it.value, prev.value], 2), prev.value = _a[0], it.value = _a[1];
            }
        prev = prev.equals(this.end()) ? first : prev.next();
        _b = __read([it.value, prev.value], 2), prev.value = _b[0], it.value = _b[1];
        return prev;
    };
    /**
     * @inheritDoc
     */
    List.prototype.reverse = function () {
        var begin = this.end_.prev();
        var prev_of_end = this.begin();
        for (var it = this.begin(); !it.equals(this.end());) {
            var prev = it.prev();
            var next = it.next();
            List.Iterator._Set_prev(it, next);
            List.Iterator._Set_next(it, prev);
            it = next;
        }
        // ADJUST THE BEGIN AND END
        this.begin_ = begin; // THE NEW BEGIN
        List.Iterator._Set_prev(this.end_, prev_of_end);
        List.Iterator._Set_next(this.end_, begin);
    };
    /**
     * @inheritDoc
     */
    List.prototype.swap = function (obj) {
        var _a, _b;
        // CHANGE CONTENTS
        _super.prototype.swap.call(this, obj);
        // CHANGE ITERATORS' SOURCES
        _a = __read([obj.ptr_, this.ptr_], 2), this.ptr_ = _a[0], obj.ptr_ = _a[1];
        _b = __read([obj.ptr_.value, this.ptr_.value], 2), this.ptr_.value = _b[0], obj.ptr_.value = _b[1];
    };
    return List;
}(ListContainer_1.ListContainer));
exports.List = List;
(function (List) {
    /**
     * Iterator of the List.
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    var Iterator = /** @class */ (function (_super) {
        __extends(Iterator, _super);
        /* ---------------------------------------------------------------
            CONSTRUCTORS
        --------------------------------------------------------------- */
        /**
         * @hidden
         */
        function Iterator(sourcePtr, prev, next, value) {
            var _this = _super.call(this, prev, next, value) || this;
            _this.source_ptr_ = sourcePtr;
            return _this;
        }
        /**
         * @inheritDoc
         */
        Iterator.prototype.reverse = function () {
            return new ReverseIterator(this);
        };
        /**
         * @internal
         */
        Iterator._Set_source_ptr = function (it, ptr) {
            it.source_ptr_ = ptr;
        };
        /* ---------------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------------- */
        /**
         * @inheritDoc
         */
        Iterator.prototype.source = function () {
            return this.source_ptr_.value;
        };
        Object.defineProperty(Iterator.prototype, "value", {
            /**
             * @inheritDoc
             */
            get: function () {
                return this.value_;
            },
            /**
             * @inheritDoc
             */
            set: function (val) {
                this.value_ = val;
            },
            enumerable: true,
            configurable: true
        });
        /* ---------------------------------------------------------------
            COMPARISON
        --------------------------------------------------------------- */
        Iterator.prototype.equals = function (obj) {
            return this === obj;
        };
        return Iterator;
    }(ListIterator_1.ListIterator));
    List.Iterator = Iterator;
    /**
     * Reverse iterator of the List.
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    var ReverseIterator = /** @class */ (function (_super) {
        __extends(ReverseIterator, _super);
        /* ---------------------------------------------------------------
            CONSTRUCTORS
        --------------------------------------------------------------- */
        function ReverseIterator(base) {
            return _super.call(this, base) || this;
        }
        /**
         * @hidden
         */
        ReverseIterator.prototype._Create_neighbor = function (base) {
            return new ReverseIterator(base);
        };
        Object.defineProperty(ReverseIterator.prototype, "value", {
            /* ---------------------------------------------------------
                ACCESSORS
            --------------------------------------------------------- */
            /**
             * @inheritDoc
             */
            get: function () {
                return this.base_.value;
            },
            /**
             * @inheritDoc
             */
            set: function (val) {
                this.base_.value = val;
            },
            enumerable: true,
            configurable: true
        });
        return ReverseIterator;
    }(ReverseIterator_1.ReverseIterator));
    List.ReverseIterator = ReverseIterator;
})(List = exports.List || (exports.List = {}));
exports.List = List;
exports.list = List;
//# sourceMappingURL=List.js.map

/***/ }),

/***/ "./node_modules/tstl/container/PriorityQueue.js":
/*!******************************************************!*\
  !*** ./node_modules/tstl/container/PriorityQueue.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std */
//================================================================
var AdaptorContainer_1 = __webpack_require__(/*! ../base/container/AdaptorContainer */ "./node_modules/tstl/base/container/AdaptorContainer.js");
var Vector_1 = __webpack_require__(/*! ./Vector */ "./node_modules/tstl/container/Vector.js");
var comparators_1 = __webpack_require__(/*! ../functional/comparators */ "./node_modules/tstl/functional/comparators.js");
var heap_1 = __webpack_require__(/*! ../algorithm/heap */ "./node_modules/tstl/algorithm/heap.js");
/**
 * Priority Queue; Greater Out First.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var PriorityQueue = /** @class */ (function (_super) {
    __extends(PriorityQueue, _super);
    function PriorityQueue() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        // DECLARE MEMBERS
        var comp = comparators_1.less;
        var post_process = null;
        //----
        // INITIALIZE MEMBERS AND POST-PROCESS
        //----
        // BRANCH - METHOD OVERLOADINGS
        if (args.length === 1 && args[0] instanceof PriorityQueue) {
            var obj_1 = args[0];
            comp = obj_1.comp_;
            post_process = function () {
                var first = obj_1.source_.begin();
                var last = obj_1.source_.end();
                _this.source_.assign(first, last);
            };
        }
        else if (args.length >= 2 && args[0].next instanceof Function && args[1].next instanceof Function) {
            // FUNCTION TEMPLATE
            if (args.length === 3)
                comp = args[2];
            post_process = function () {
                // RANGE CONSTRUCTOR
                var first = args[0]; // PARAMETER 1
                var last = args[1]; // PARAMETER 2
                _this.source_.assign(first, last);
            };
        }
        else if (args.length === 1)
            comp = args[0];
        //----
        // DO PROCESS
        //----
        // CONSTRUCT CONTAINER
        _this.source_ = new Vector_1.Vector();
        _this.comp_ = comp;
        // ACT POST-PROCESS
        if (post_process !== null)
            post_process();
        return _this;
    }
    /* ---------------------------------------------------------
        ACCESSORS
    --------------------------------------------------------- */
    /**
     * Get value comparison function.
     */
    PriorityQueue.prototype.value_comp = function () {
        return this.comp_;
    };
    /**
     * Get top element.
     */
    PriorityQueue.prototype.top = function () {
        return this.source_.front();
    };
    /* ---------------------------------------------------------
        ELEMENTS I/O
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    PriorityQueue.prototype.push = function () {
        var elems = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            elems[_i] = arguments[_i];
        }
        var e_1, _a;
        try {
            for (var elems_1 = __values(elems), elems_1_1 = elems_1.next(); !elems_1_1.done; elems_1_1 = elems_1.next()) {
                var elem = elems_1_1.value;
                this.source_.push_back(elem);
                heap_1.push_heap(this.source_.begin(), this.source_.end(), this.comp_);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (elems_1_1 && !elems_1_1.done && (_a = elems_1.return)) _a.call(elems_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return this.size();
    };
    /**
     * @inheritDoc
     */
    PriorityQueue.prototype.pop = function () {
        heap_1.pop_heap(this.source_.begin(), this.source_.end(), this.comp_);
        this.source_.pop_back();
    };
    /**
     * @inheritDoc
     */
    PriorityQueue.prototype.swap = function (obj) {
        var _a;
        _super.prototype.swap.call(this, obj);
        _a = __read([obj.comp_, this.comp_], 2), this.comp_ = _a[0], obj.comp_ = _a[1];
    };
    return PriorityQueue;
}(AdaptorContainer_1.AdaptorContainer));
exports.PriorityQueue = PriorityQueue;
//# sourceMappingURL=PriorityQueue.js.map

/***/ }),

/***/ "./node_modules/tstl/container/Queue.js":
/*!**********************************************!*\
  !*** ./node_modules/tstl/container/Queue.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std */
//================================================================
var AdaptorContainer_1 = __webpack_require__(/*! ../base/container/AdaptorContainer */ "./node_modules/tstl/base/container/AdaptorContainer.js");
var List_1 = __webpack_require__(/*! ./List */ "./node_modules/tstl/container/List.js");
/**
 * Queue; FIFO (First In First Out).
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var Queue = /** @class */ (function (_super) {
    __extends(Queue, _super);
    function Queue(obj) {
        var _this = _super.call(this) || this;
        _this.source_ = new List_1.List();
        if (obj !== undefined)
            _this.source_.assign(obj.source_.begin(), obj.source_.end());
        return _this;
    }
    /* ---------------------------------------------------------
        ACCESSORS
    --------------------------------------------------------- */
    /**
     * Get the first element.
     *
     * @return The first element.
     */
    Queue.prototype.front = function () {
        return this.source_.front();
    };
    /**
     * Get the last element.
     *
     * @return The last element.
     */
    Queue.prototype.back = function () {
        return this.source_.back();
    };
    /**
     * @inheritDoc
     */
    Queue.prototype.pop = function () {
        this.source_.pop_front();
    };
    return Queue;
}(AdaptorContainer_1.AdaptorContainer));
exports.Queue = Queue;
exports.queue = Queue;
//# sourceMappingURL=Queue.js.map

/***/ }),

/***/ "./node_modules/tstl/container/Stack.js":
/*!**********************************************!*\
  !*** ./node_modules/tstl/container/Stack.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std */
//================================================================
var AdaptorContainer_1 = __webpack_require__(/*! ../base/container/AdaptorContainer */ "./node_modules/tstl/base/container/AdaptorContainer.js");
var Vector_1 = __webpack_require__(/*! ./Vector */ "./node_modules/tstl/container/Vector.js");
/**
 * Stack; LIFO (Last In First Out).
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var Stack = /** @class */ (function (_super) {
    __extends(Stack, _super);
    function Stack(obj) {
        var _this = _super.call(this) || this;
        _this.source_ = new Vector_1.Vector();
        if (obj !== undefined)
            _this.source_.assign(obj.source_.begin(), obj.source_.end());
        return _this;
    }
    /* ---------------------------------------------------------
        ACCESSOR
    --------------------------------------------------------- */
    /**
     * Get the last element.
     *
     * @return The last element.
     */
    Stack.prototype.top = function () {
        return this.source_.back();
    };
    /**
     * @inheritDoc
     */
    Stack.prototype.pop = function () {
        this.source_.pop_back();
    };
    return Stack;
}(AdaptorContainer_1.AdaptorContainer));
exports.Stack = Stack;
exports.stack = Stack;
//# sourceMappingURL=Stack.js.map

/***/ }),

/***/ "./node_modules/tstl/container/TreeMap.js":
/*!************************************************!*\
  !*** ./node_modules/tstl/container/TreeMap.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std */
//================================================================
var UniqueMap_1 = __webpack_require__(/*! ../base/container/UniqueMap */ "./node_modules/tstl/base/container/UniqueMap.js");
var _ITreeContainer_1 = __webpack_require__(/*! ../base/container/_ITreeContainer */ "./node_modules/tstl/base/container/_ITreeContainer.js");
var _UniqueMapTree_1 = __webpack_require__(/*! ../base/tree/_UniqueMapTree */ "./node_modules/tstl/base/tree/_UniqueMapTree.js");
var MapIterator_1 = __webpack_require__(/*! ../base/iterator/MapIterator */ "./node_modules/tstl/base/iterator/MapIterator.js");
var Entry_1 = __webpack_require__(/*! ../utility/Entry */ "./node_modules/tstl/utility/Entry.js");
var Pair_1 = __webpack_require__(/*! ../utility/Pair */ "./node_modules/tstl/utility/Pair.js");
/**
 * Unique-key Map based on Tree.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var TreeMap = /** @class */ (function (_super) {
    __extends(TreeMap, _super);
    function TreeMap() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        _ITreeContainer_1._Construct.apply(void 0, __spread([_this, TreeMap,
            function (comp) {
                _this.tree_ = new _UniqueMapTree_1._UniqueMapTree(_this, comp);
            }], args));
        return _this;
    }
    /* ---------------------------------------------------------
        ASSIGN & CLEAR
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    TreeMap.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.tree_.clear();
    };
    /**
     * @inheritDoc
     */
    TreeMap.prototype.swap = function (obj) {
        var _a;
        // SWAP CONTENTS
        _super.prototype.swap.call(this, obj);
        // SWAP RB-TREE
        _UniqueMapTree_1._UniqueMapTree._Swap_source(this.tree_, obj.tree_);
        _a = __read([obj.tree_, this.tree_], 2), this.tree_ = _a[0], obj.tree_ = _a[1];
    };
    /* =========================================================
        ACCESSORS
    ========================================================= */
    /**
     * @inheritDoc
     */
    TreeMap.prototype.find = function (key) {
        var node = this.tree_.nearest_by_key(key);
        if (node === null || this.tree_.key_eq()(node.value.first, key) === false)
            return this.end();
        else
            return node.value;
    };
    /**
     * @inheritDoc
     */
    TreeMap.prototype.key_comp = function () {
        return this.tree_.key_comp();
    };
    /**
     * @inheritDoc
     */
    TreeMap.prototype.value_comp = function () {
        return this.tree_.value_comp();
    };
    /**
     * @inheritDoc
     */
    TreeMap.prototype.lower_bound = function (key) {
        return this.tree_.lower_bound(key);
    };
    /**
     * @inheritDoc
     */
    TreeMap.prototype.upper_bound = function (key) {
        return this.tree_.upper_bound(key);
    };
    /**
     * @inheritDoc
     */
    TreeMap.prototype.equal_range = function (key) {
        return this.tree_.equal_range(key);
    };
    /* =========================================================
        ELEMENTS I/O
            - INSERT
            - POST-PROCESS
    ============================================================
        INSERT
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    TreeMap.prototype.emplace = function (key, val) {
        // FIND POSITION TO INSERT
        var it = this.lower_bound(key);
        if (!it.equals(this.end()) && this.tree_.key_eq()(it.first, key))
            return new Pair_1.Pair(it, false);
        // ITERATOR TO RETURN
        it = this.data_.insert(it, new Entry_1.Entry(key, val));
        this._Handle_insert(it, it.next()); // POST-PROCESS
        return new Pair_1.Pair(it, true);
    };
    /**
     * @inheritDoc
     */
    TreeMap.prototype.emplace_hint = function (hint, key, val) {
        var _this = this;
        var elem = new Entry_1.Entry(key, val);
        return _ITreeContainer_1._Emplace_hint(this, hint, elem, this.data_, this._Handle_insert.bind(this), function () { return _this.emplace(key, val).first; });
    };
    /**
     * @hidden
     */
    TreeMap.prototype._Insert_by_range = function (first, last) {
        for (var it = first; !it.equals(last); it = it.next())
            this.emplace(it.value.first, it.value.second);
    };
    /* ---------------------------------------------------------
        POST-PROCESS
    --------------------------------------------------------- */
    /**
     * @hidden
     */
    TreeMap.prototype._Handle_insert = function (first, last) {
        for (; !first.equals(last); first = first.next())
            this.tree_.insert(first);
    };
    /**
     * @hidden
     */
    TreeMap.prototype._Handle_erase = function (first, last) {
        for (; !first.equals(last); first = first.next())
            this.tree_.erase(first);
    };
    return TreeMap;
}(UniqueMap_1.UniqueMap));
exports.TreeMap = TreeMap;
(function (TreeMap) {
    // BODY
    TreeMap.Iterator = MapIterator_1.MapIterator;
    TreeMap.ReverseIterator = MapIterator_1.MapReverseIterator;
    // BODY
    TreeMap.iterator = TreeMap.Iterator;
    TreeMap.reverse_iterator = TreeMap.ReverseIterator;
})(TreeMap = exports.TreeMap || (exports.TreeMap = {}));
exports.TreeMap = TreeMap;
exports.map = TreeMap;
//# sourceMappingURL=TreeMap.js.map

/***/ }),

/***/ "./node_modules/tstl/container/TreeMultiMap.js":
/*!*****************************************************!*\
  !*** ./node_modules/tstl/container/TreeMultiMap.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std */
//================================================================
var MultiMap_1 = __webpack_require__(/*! ../base/container/MultiMap */ "./node_modules/tstl/base/container/MultiMap.js");
var _ITreeContainer_1 = __webpack_require__(/*! ../base/container/_ITreeContainer */ "./node_modules/tstl/base/container/_ITreeContainer.js");
var _MultiMapTree_1 = __webpack_require__(/*! ../base/tree/_MultiMapTree */ "./node_modules/tstl/base/tree/_MultiMapTree.js");
var MapIterator_1 = __webpack_require__(/*! ../base/iterator/MapIterator */ "./node_modules/tstl/base/iterator/MapIterator.js");
var Entry_1 = __webpack_require__(/*! ../utility/Entry */ "./node_modules/tstl/utility/Entry.js");
/**
 * Multiple-key Map based on Tree.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var TreeMultiMap = /** @class */ (function (_super) {
    __extends(TreeMultiMap, _super);
    function TreeMultiMap() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        _ITreeContainer_1._Construct.apply(void 0, __spread([_this, TreeMultiMap,
            function (comp) {
                _this.tree_ = new _MultiMapTree_1._MultiMapTree(_this, comp);
            }], args));
        return _this;
    }
    /* ---------------------------------------------------------
        ASSIGN & CLEAR
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    TreeMultiMap.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.tree_.clear();
    };
    /**
     * @inheritDoc
     */
    TreeMultiMap.prototype.swap = function (obj) {
        var _a;
        // SWAP CONTENTS
        _super.prototype.swap.call(this, obj);
        // SWAP RB-TREE
        _MultiMapTree_1._MultiMapTree._Swap_source(this.tree_, obj.tree_);
        _a = __read([obj.tree_, this.tree_], 2), this.tree_ = _a[0], obj.tree_ = _a[1];
    };
    /* =========================================================
        ACCESSORS
    ========================================================= */
    /**
     * @inheritDoc
     */
    TreeMultiMap.prototype.find = function (key) {
        var node = this.tree_.nearest_by_key(key);
        if (node === null || this.tree_.key_eq()(node.value.first, key) === false)
            return this.end();
        else
            return node.value;
    };
    /**
     * @inheritDoc
     */
    TreeMultiMap.prototype.count = function (key) {
        var it = this.find(key);
        var ret = 0;
        for (; !it.equals(this.end()) && this.tree_.key_eq()(it.first, key); it = it.next())
            ++ret;
        return ret;
    };
    /**
     * @inheritDoc
     */
    TreeMultiMap.prototype.key_comp = function () {
        return this.tree_.key_comp();
    };
    /**
     * @inheritDoc
     */
    TreeMultiMap.prototype.value_comp = function () {
        return this.tree_.value_comp();
    };
    /**
     * @inheritDoc
     */
    TreeMultiMap.prototype.lower_bound = function (key) {
        return this.tree_.lower_bound(key);
    };
    /**
     * @inheritDoc
     */
    TreeMultiMap.prototype.upper_bound = function (key) {
        return this.tree_.upper_bound(key);
    };
    /**
     * @inheritDoc
     */
    TreeMultiMap.prototype.equal_range = function (key) {
        return this.tree_.equal_range(key);
    };
    /**
     * @hidden
     */
    TreeMultiMap.prototype._Key_eq = function (x, y) {
        return this.tree_.key_eq()(x, y);
    };
    /* =========================================================
        ELEMENTS I/O
            - INSERT
            - POST-PROCESS
    ============================================================
        INSERT
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    TreeMultiMap.prototype.emplace = function (key, val) {
        // FIND POSITION TO INSERT
        var it = this.upper_bound(key);
        // ITERATOR TO RETURN
        it = this.data_.insert(it, new Entry_1.Entry(key, val));
        this._Handle_insert(it, it.next()); // POST-PROCESS
        return it;
    };
    /**
     * @inheritDoc
     */
    TreeMultiMap.prototype.emplace_hint = function (hint, key, val) {
        var _this = this;
        var elem = new Entry_1.Entry(key, val);
        return _ITreeContainer_1._Emplace_hint(this, hint, elem, this.data_, this._Handle_insert.bind(this), function () { return _this.emplace(key, val); });
    };
    /**
     * @hidden
     */
    TreeMultiMap.prototype._Insert_by_range = function (first, last) {
        for (var it = first; !it.equals(last); it = it.next())
            this.emplace(it.value.first, it.value.second);
    };
    /* ---------------------------------------------------------
        POST-PROCESS
    --------------------------------------------------------- */
    /**
     * @hidden
     */
    TreeMultiMap.prototype._Handle_insert = function (first, last) {
        for (; !first.equals(last); first = first.next())
            this.tree_.insert(first);
    };
    /**
     * @hidden
     */
    TreeMultiMap.prototype._Handle_erase = function (first, last) {
        for (; !first.equals(last); first = first.next())
            this.tree_.erase(first);
    };
    return TreeMultiMap;
}(MultiMap_1.MultiMap));
exports.TreeMultiMap = TreeMultiMap;
(function (TreeMultiMap) {
    // BODY
    TreeMultiMap.Iterator = MapIterator_1.MapIterator;
    TreeMultiMap.ReverseIterator = MapIterator_1.MapReverseIterator;
    // BODY
    TreeMultiMap.iterator = TreeMultiMap.Iterator;
    TreeMultiMap.reverse_iterator = TreeMultiMap.ReverseIterator;
})(TreeMultiMap = exports.TreeMultiMap || (exports.TreeMultiMap = {}));
exports.TreeMultiMap = TreeMultiMap;
exports.multimap = TreeMultiMap;
//# sourceMappingURL=TreeMultiMap.js.map

/***/ }),

/***/ "./node_modules/tstl/container/TreeMultiSet.js":
/*!*****************************************************!*\
  !*** ./node_modules/tstl/container/TreeMultiSet.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std */
//================================================================
var MultiSet_1 = __webpack_require__(/*! ../base/container/MultiSet */ "./node_modules/tstl/base/container/MultiSet.js");
var _ITreeContainer_1 = __webpack_require__(/*! ../base/container/_ITreeContainer */ "./node_modules/tstl/base/container/_ITreeContainer.js");
var _MultiSetTree_1 = __webpack_require__(/*! ../base/tree/_MultiSetTree */ "./node_modules/tstl/base/tree/_MultiSetTree.js");
var SetIterator_1 = __webpack_require__(/*! ../base/iterator/SetIterator */ "./node_modules/tstl/base/iterator/SetIterator.js");
/**
 * Multiple-key Set based on Tree.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var TreeMultiSet = /** @class */ (function (_super) {
    __extends(TreeMultiSet, _super);
    function TreeMultiSet() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        _ITreeContainer_1._Construct.apply(void 0, __spread([_this, TreeMultiSet,
            function (comp) {
                _this.tree_ = new _MultiSetTree_1._MultiSetTree(_this, comp);
            }], args));
        return _this;
    }
    /* ---------------------------------------------------------
        ASSIGN & CLEAR
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    TreeMultiSet.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.tree_.clear();
    };
    /**
     * @inheritDoc
     */
    TreeMultiSet.prototype.swap = function (obj) {
        var _a;
        // SWAP CONTENTS
        _super.prototype.swap.call(this, obj);
        // SWAP RB-TREE
        _MultiSetTree_1._MultiSetTree._Swap_source(this.tree_, obj.tree_);
        _a = __read([obj.tree_, this.tree_], 2), this.tree_ = _a[0], obj.tree_ = _a[1];
    };
    /* =========================================================
        ACCESSORS
    ========================================================= */
    /**
     * @inheritDoc
     */
    TreeMultiSet.prototype.find = function (key) {
        var node = this.tree_.nearest_by_key(key);
        if (node === null || this.tree_.key_eq()(node.value.value, key) === false)
            return this.end();
        else
            return node.value;
    };
    /**
     * @inheritDoc
     */
    TreeMultiSet.prototype.count = function (key) {
        var it = this.find(key);
        var ret = 0;
        for (; !it.equals(this.end()) && this.tree_.key_eq()(it.value, key); it = it.next())
            ++ret;
        return ret;
    };
    /**
     * @inheritDoc
     */
    TreeMultiSet.prototype.key_comp = function () {
        return this.tree_.key_comp();
    };
    /**
     * @inheritDoc
     */
    TreeMultiSet.prototype.value_comp = function () {
        return this.tree_.key_comp();
    };
    /**
     * @inheritDoc
     */
    TreeMultiSet.prototype.lower_bound = function (key) {
        return this.tree_.lower_bound(key);
    };
    /**
     * @inheritDoc
     */
    TreeMultiSet.prototype.upper_bound = function (key) {
        return this.tree_.upper_bound(key);
    };
    /**
     * @inheritDoc
     */
    TreeMultiSet.prototype.equal_range = function (key) {
        return this.tree_.equal_range(key);
    };
    /**
     * @hidden
     */
    TreeMultiSet.prototype._Key_eq = function (x, y) {
        return this.tree_.key_eq()(x, y);
    };
    /* =========================================================
        ELEMENTS I/O
            - INSERT
            - POST-PROCESS
    ============================================================
        INSERT
    --------------------------------------------------------- */
    /**
     * @hidden
     */
    TreeMultiSet.prototype._Insert_by_key = function (key) {
        // FIND POSITION TO INSERT
        var it = this.upper_bound(key);
        // ITERATOR TO RETURN
        it = this.data_.insert(it, key);
        this._Handle_insert(it, it.next()); // POST-PROCESS
        return it;
    };
    /**
     * @hidden
     */
    TreeMultiSet.prototype._Insert_by_hint = function (hint, key) {
        var _this = this;
        return _ITreeContainer_1._Emplace_hint(this, hint, key, this.data_, this._Handle_insert.bind(this), function () { return _this._Insert_by_key(key); });
    };
    /**
     * @hidden
     */
    TreeMultiSet.prototype._Insert_by_range = function (first, last) {
        for (; !first.equals(last); first = first.next())
            this._Insert_by_key(first.value);
    };
    /* ---------------------------------------------------------
        POST-PROCESS
    --------------------------------------------------------- */
    /**
     * @hidden
     */
    TreeMultiSet.prototype._Handle_insert = function (first, last) {
        for (; !first.equals(last); first = first.next())
            this.tree_.insert(first);
    };
    /**
     * @hidden
     */
    TreeMultiSet.prototype._Handle_erase = function (first, last) {
        for (; !first.equals(last); first = first.next())
            this.tree_.erase(first);
    };
    return TreeMultiSet;
}(MultiSet_1.MultiSet));
exports.TreeMultiSet = TreeMultiSet;
(function (TreeMultiSet) {
    // BODY
    TreeMultiSet.Iterator = SetIterator_1.SetIterator;
    TreeMultiSet.ReverseIterator = SetIterator_1.SetReverseIterator;
    // BODY
    TreeMultiSet.iterator = TreeMultiSet.Iterator;
    TreeMultiSet.reverse_iterator = TreeMultiSet.ReverseIterator;
})(TreeMultiSet = exports.TreeMultiSet || (exports.TreeMultiSet = {}));
exports.TreeMultiSet = TreeMultiSet;
exports.multiset = TreeMultiSet;
//# sourceMappingURL=TreeMultiSet.js.map

/***/ }),

/***/ "./node_modules/tstl/container/TreeSet.js":
/*!************************************************!*\
  !*** ./node_modules/tstl/container/TreeSet.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std */
//================================================================
var UniqueSet_1 = __webpack_require__(/*! ../base/container/UniqueSet */ "./node_modules/tstl/base/container/UniqueSet.js");
var _ITreeContainer_1 = __webpack_require__(/*! ../base/container/_ITreeContainer */ "./node_modules/tstl/base/container/_ITreeContainer.js");
var _UniqueSetTree_1 = __webpack_require__(/*! ../base/tree/_UniqueSetTree */ "./node_modules/tstl/base/tree/_UniqueSetTree.js");
var SetIterator_1 = __webpack_require__(/*! ../base/iterator/SetIterator */ "./node_modules/tstl/base/iterator/SetIterator.js");
var Pair_1 = __webpack_require__(/*! ../utility/Pair */ "./node_modules/tstl/utility/Pair.js");
/**
 * Unique-key Set based on Tree.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var TreeSet = /** @class */ (function (_super) {
    __extends(TreeSet, _super);
    function TreeSet() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        _ITreeContainer_1._Construct.apply(void 0, __spread([_this, TreeSet,
            function (comp) {
                _this.tree_ = new _UniqueSetTree_1._UniqueSetTree(_this, comp);
            }], args));
        return _this;
    }
    /* ---------------------------------------------------------
        ASSIGN & CLEAR
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    TreeSet.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.tree_.clear();
    };
    /**
     * @inheritDoc
     */
    TreeSet.prototype.swap = function (obj) {
        var _a;
        // SWAP CONTENTS
        _super.prototype.swap.call(this, obj);
        // SWAP RB-TREE
        _UniqueSetTree_1._UniqueSetTree._Swap_source(this.tree_, obj.tree_);
        _a = __read([obj.tree_, this.tree_], 2), this.tree_ = _a[0], obj.tree_ = _a[1];
    };
    /* =========================================================
        ACCESSORS
    ========================================================= */
    /**
     * @inheritDoc
     */
    TreeSet.prototype.find = function (key) {
        var node = this.tree_.nearest_by_key(key);
        if (node === null || this.tree_.key_eq()(node.value.value, key) === false)
            return this.end();
        else
            return node.value;
    };
    /**
     * @inheritDoc
     */
    TreeSet.prototype.key_comp = function () {
        return this.tree_.key_comp();
    };
    /**
     * @inheritDoc
     */
    TreeSet.prototype.value_comp = function () {
        return this.tree_.key_comp();
    };
    /**
     * @inheritDoc
     */
    TreeSet.prototype.lower_bound = function (key) {
        return this.tree_.lower_bound(key);
    };
    /**
     * @inheritDoc
     */
    TreeSet.prototype.upper_bound = function (key) {
        return this.tree_.upper_bound(key);
    };
    /**
     * @inheritDoc
     */
    TreeSet.prototype.equal_range = function (key) {
        return this.tree_.equal_range(key);
    };
    /* =========================================================
        ELEMENTS I/O
            - INSERT
            - POST-PROCESS
    ============================================================
        INSERT
    --------------------------------------------------------- */
    /**
     * @hidden
     */
    TreeSet.prototype._Insert_by_key = function (key) {
        // FIND POSITION TO INSERT
        var it = this.lower_bound(key);
        if (!it.equals(this.end()) && this.tree_.key_eq()(it.value, key))
            return new Pair_1.Pair(it, false);
        // ITERATOR TO RETURN
        it = this.data_.insert(it, key);
        this._Handle_insert(it, it.next()); // POST-PROCESS
        return new Pair_1.Pair(it, true);
    };
    /**
     * @hidden
     */
    TreeSet.prototype._Insert_by_hint = function (hint, key) {
        var _this = this;
        return _ITreeContainer_1._Emplace_hint(this, hint, key, this.data_, this._Handle_insert.bind(this), function () { return _this._Insert_by_key(key).first; });
    };
    /**
     * @hidden
     */
    TreeSet.prototype._Insert_by_range = function (first, last) {
        for (; !first.equals(last); first = first.next())
            this._Insert_by_key(first.value);
    };
    /* ---------------------------------------------------------
        POST-PROCESS
    --------------------------------------------------------- */
    /**
     * @hidden
     */
    TreeSet.prototype._Handle_insert = function (first, last) {
        for (; !first.equals(last); first = first.next())
            this.tree_.insert(first);
    };
    /**
     * @hidden
     */
    TreeSet.prototype._Handle_erase = function (first, last) {
        for (; !first.equals(last); first = first.next())
            this.tree_.erase(first);
    };
    return TreeSet;
}(UniqueSet_1.UniqueSet));
exports.TreeSet = TreeSet;
(function (TreeSet) {
    // BODY
    TreeSet.Iterator = SetIterator_1.SetIterator;
    TreeSet.ReverseIterator = SetIterator_1.SetReverseIterator;
    // BODY
    TreeSet.iterator = TreeSet.Iterator;
    TreeSet.reverse_iterator = TreeSet.ReverseIterator;
})(TreeSet = exports.TreeSet || (exports.TreeSet = {}));
exports.TreeSet = TreeSet;
exports.set = TreeSet;
//# sourceMappingURL=TreeSet.js.map

/***/ }),

/***/ "./node_modules/tstl/container/Vector.js":
/*!***********************************************!*\
  !*** ./node_modules/tstl/container/Vector.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std */
//================================================================
var ArrayContainer_1 = __webpack_require__(/*! ../base/container/ArrayContainer */ "./node_modules/tstl/base/container/ArrayContainer.js");
var ArrayIterator_1 = __webpack_require__(/*! ../base/iterator/ArrayIterator */ "./node_modules/tstl/base/iterator/ArrayIterator.js");
var LogicError_1 = __webpack_require__(/*! ../exception/LogicError */ "./node_modules/tstl/exception/LogicError.js");
/**
 * Vector, an array with variable capacity.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var Vector = /** @class */ (function (_super) {
    __extends(Vector, _super);
    function Vector() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        // THE DATA
        _this.data_ = [];
        // CONSTRUCTORS BRANCH
        if (args.length === 0) {
            // DEFAULT CONSTRUCTOR
        }
        else if (args.length === 1 && args[0] instanceof Array) {
            // INITIALIZER CONSTRUCTOR
            var array = args[0];
            _this.data_ = array.slice();
        }
        else if (args.length === 1 && args[0] instanceof Vector) {
            // COPY CONSTRUCTOR
            _this.data_ = args[0].data_.slice();
        }
        else if (args.length === 2) {
            // ASSIGN CONSTRUCTOR
            _this.assign(args[0], args[1]);
        }
        return _this;
    }
    /**
     * @internal
     */
    Vector._Capsule = function (data) {
        var ret = new Vector();
        ret.data_ = data;
        return ret;
    };
    Vector.prototype.assign = function (first, second) {
        this.clear();
        this.insert(this.end(), first, second);
    };
    /**
     * @inheritDoc
     */
    Vector.prototype.clear = function () {
        this.data_.splice(0, this.data_.length);
    };
    /**
     * @inheritDoc
     */
    Vector.prototype.resize = function (n) {
        this.data_.length = n;
    };
    /* =========================================================
        ACCESSORS
    ========================================================= */
    /**
     * @inheritDoc
     */
    Vector.prototype.size = function () {
        return this.data_.length;
    };
    /**
     * @inheritDoc
     */
    Vector.prototype.at = function (index) {
        if (0 <= index && index < this.size())
            return this.data_[index];
        else
            throw new LogicError_1.OutOfRange("Target index is greater than Vector's size: " + index + ", " + this.size());
    };
    /**
     * @inheritDoc
     */
    Vector.prototype.set = function (index, val) {
        if (index < 0 || index >= this.size())
            throw new LogicError_1.OutOfRange("Target index is greater than Vector's size: " + index + ", " + this.size());
        this.data_[index] = val;
    };
    /**
     * Access data.
     *
     * @return An array capsuled by this {@link Vector}.
     */
    Vector.prototype.data = function () {
        return this.data_;
    };
    /**
     * @inheritDoc
     */
    Vector.prototype[Symbol.iterator] = function () {
        return this.data_[Symbol.iterator]();
    };
    /* =========================================================
        ELEMENTS I/O
            - INSERT
            - ERASE
    ============================================================
        INSERT
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    Vector.prototype.push = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        var _a;
        return (_a = this.data_).push.apply(_a, __spread(items));
    };
    /**
     * @inheritDoc
     */
    Vector.prototype.push_back = function (val) {
        this.data_.push(val);
    };
    /**
     * @hidden
     */
    Vector.prototype._Insert_by_range = function (position, first, last) {
        var _a;
        if (position.index() >= this.size()) {
            // WHEN INSERT TO THE LAST
            var prev_size = this.size();
            for (; !first.equals(last); first = first.next())
                this.data_.push(first.value);
            return new Vector.Iterator(this, prev_size);
        }
        else {
            //----
            // INSERT TO THE MIDDLE POSITION
            //----
            // CUT RIGHT SIDE
            var spliced_array = this.data_.splice(position.index());
            // INSERT ELEMENTS
            for (; !first.equals(last); first = first.next())
                this.data_.push(first.value);
            (_a = this.data_).push.apply(_a, __spread(spliced_array)); // CONCAT THE SPLICEDS
            return position;
        }
    };
    /* ---------------------------------------------------------
        ERASE
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    Vector.prototype.pop_back = function () {
        this.data_.pop();
    };
    /**
     * @hidden
     */
    Vector.prototype._Erase_by_range = function (first, last) {
        if (first.index() >= this.size())
            return first;
        // ERASE ELEMENTS
        if (last.index() >= this.size()) {
            this.data_.splice(first.index());
            return this.end();
        }
        else
            this.data_.splice(first.index(), last.index() - first.index());
        return first;
    };
    /* ---------------------------------------------------------------
        UTILITIES
    --------------------------------------------------------------- */
    /**
     * @hidden
     */
    Vector.prototype.equals = function (obj) {
        return this.data_ === obj.data_;
    };
    /**
     * @inheritDoc
     */
    Vector.prototype.swap = function (obj) {
        var _a;
        _a = __read([obj.data_, this.data_], 2), this.data_ = _a[0], obj.data_ = _a[1];
    };
    /**
     * @inheritDoc
     */
    Vector.prototype.toJSON = function () {
        return this.data_;
    };
    return Vector;
}(ArrayContainer_1.ArrayContainer));
exports.Vector = Vector;
(function (Vector) {
    // BODY
    Vector.Iterator = ArrayIterator_1.ArrayIterator;
    Vector.ReverseIterator = ArrayIterator_1.ArrayReverseIterator;
    // BODY
    Vector.iterator = Vector.Iterator;
    Vector.reverse_iterator = Vector.ReverseIterator;
})(Vector = exports.Vector || (exports.Vector = {}));
exports.Vector = Vector;
exports.vector = Vector;
//# sourceMappingURL=Vector.js.map

/***/ }),

/***/ "./node_modules/tstl/container/VectorBoolean.js":
/*!******************************************************!*\
  !*** ./node_modules/tstl/container/VectorBoolean.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std */
//================================================================
var ArrayContainer_1 = __webpack_require__(/*! ../base/container/ArrayContainer */ "./node_modules/tstl/base/container/ArrayContainer.js");
var ArrayIterator_1 = __webpack_require__(/*! ../base/iterator/ArrayIterator */ "./node_modules/tstl/base/iterator/ArrayIterator.js");
var TreeMap_1 = __webpack_require__(/*! ./TreeMap */ "./node_modules/tstl/container/TreeMap.js");
var _NativeArrayIterator_1 = __webpack_require__(/*! ../base/iterator/_NativeArrayIterator */ "./node_modules/tstl/base/iterator/_NativeArrayIterator.js");
var LogicError_1 = __webpack_require__(/*! ../exception/LogicError */ "./node_modules/tstl/exception/LogicError.js");
var Pair_1 = __webpack_require__(/*! ../utility/Pair */ "./node_modules/tstl/utility/Pair.js");
var comparators_1 = __webpack_require__(/*! ../functional/comparators */ "./node_modules/tstl/functional/comparators.js");
/**
 * Vector only for `boolean`.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var VectorBoolean = /** @class */ (function (_super) {
    __extends(VectorBoolean, _super);
    function VectorBoolean() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        if (args.length === 1 && args[0] instanceof VectorBoolean) {
            // COPY CONSTRUCTOR
            var obj = args[0];
            _this.data_ = new TreeMap_1.TreeMap(obj.data_.begin(), obj.data_.end());
            _this.size_ = obj.size_;
        }
        else if (args.length === 1 && args[0] instanceof Array) {
            // INITIALIZER
            _this.clear();
            _this.push.apply(_this, __spread(args[0]));
        }
        else if (args.length === 2) {
            // ASSIGNER
            _this.assign(args[0], args[1]);
        }
        else // DEFAULT CONSTRUCTOR
            _this.clear();
        return _this;
    }
    VectorBoolean.prototype.assign = function (first, last) {
        this.clear();
        this.insert(this.end(), first, last);
    };
    /**
     * @inheritDoc
     */
    VectorBoolean.prototype.clear = function () {
        this.data_ = new TreeMap_1.TreeMap();
        this.size_ = 0;
    };
    /**
     * @inheritDoc
     */
    VectorBoolean.prototype.resize = function (n) {
        var expansion = n - this.size();
        if (expansion > 0)
            this.insert(this.end(), expansion, false);
        else if (expansion < 0)
            this.erase(this.end().advance(-expansion), this.end());
    };
    /**
     * Flip all values.
     */
    VectorBoolean.prototype.flip = function () {
        var e_1, _a;
        try {
            for (var _b = __values(this.data_), _c = _b.next(); !_c.done; _c = _b.next()) {
                var entry = _c.value;
                entry.second = !entry.second;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    /**
     * @inheritDoc
     */
    VectorBoolean.prototype.swap = function (obj) {
        var _a, _b;
        _a = __read([obj.data_, this.data_], 2), this.data_ = _a[0], obj.data_ = _a[1];
        _b = __read([obj.size_, this.size_], 2), this.size_ = _b[0], obj.size_ = _b[1];
    };
    /* =========================================================
        ACCESSORS
    ========================================================= */
    /**
     * @inheritDoc
     */
    VectorBoolean.prototype.size = function () {
        return this.size_;
    };
    /**
     * @inheritDoc
     */
    VectorBoolean.prototype.at = function (index) {
        // IS OUT OF RANGE?
        if (index < 0 || index > this.size())
            throw new LogicError_1.OutOfRange("Target index is greater than Vector's size.");
        // FIND THE NEAREST NODE OF LEFT
        var it = this._Find_node(index);
        return it.second; // RETURNS
    };
    /**
     * @inheritDoc
     */
    VectorBoolean.prototype.set = function (index, val) {
        val = !!val; // SIFT
        //----
        // PRELIMINARIES
        //----
        // IS OUT OF RANGE?
        if (index < 0 || index > this.size())
            throw new LogicError_1.OutOfRange("Target index is greater than Vector's size.");
        // FIND THE NEAREAST NODE OF LEFT
        var it = this._Find_node(index);
        if (it.second === val)
            return; // NO NEED TO CHANGE
        //----
        // CHANGE VALUE
        //----
        if (it.first === index) {
            // CHANGE VALUE DIRECTLY
            it.second = val;
        }
        else {
            // EMPLACE NEW NODE
            it = this.data_.emplace(index, val).first;
        }
        //----
        // POST-PROCESS
        //----
        // THE LAST ELEMENT, NO POST-PROCESS REQUIRED
        if (index === this.size() - 1)
            return;
        // LIST UP NEIGHBORS
        var prev = it.prev();
        var next = it.next();
        // ARRANGE LEFT SIDE
        if (comparators_1.not_equal_to(prev, this.data_.end()) && prev.second === it.second)
            this.data_.erase(it);
        // ARRANGE RIGHT SIDE
        if (next.equals(this.data_.end()) === true
            || (next.first !== index + 1 || next.second !== val)) {
            // 1) IT'S THE LAST NODE
            // 2) NEXT NODE DOES NOT POINT THE INDEX + 1 (NEAREST NEIGHBOR)
            // 3) NEXT NODE'S VALUE IS DIFFERENT WITH THE CHANGED VALUE
            //----
            // EMPLACE NEW NODE WITH OLD
            this.data_.emplace(index + 1, !val);
        }
        else {
            // NEXT NODE'S VALUE IS SAME WITH THE CHANGED VALUE
            //----
            // ERASE THE NEXT NODE
            this.data_.erase(next);
        }
    };
    /**
     * @hidden
     */
    VectorBoolean.prototype._Find_node = function (index) {
        return this.data_.upper_bound(index).prev();
    };
    /* =========================================================
        ELEMENTS I/O
            - PUSH & POP
            - INSERT
            - ERASE
    ============================================================
        PUSH & POP
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    VectorBoolean.prototype.push = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        if (items.length === 0)
            return this.size();
        var first = new _NativeArrayIterator_1._NativeArrayIterator(items, 0);
        var last = new _NativeArrayIterator_1._NativeArrayIterator(items, items.length);
        this._Insert_by_range(this.end(), first, last);
        return this.size();
    };
    /**
     * @inheritDoc
     */
    VectorBoolean.prototype.push_back = function (val) {
        var it = this.data_.rbegin();
        var index = this.size_++;
        val = !!val; // SIFT
        // EMPLACE OR NOT
        if (this.data_.empty() || it.second !== val)
            this.data_.emplace(index, val);
    };
    /**
     * @inheritDoc
     */
    VectorBoolean.prototype.pop_back = function () {
        if (this.empty())
            return; // TODO: THROW EXCEPTION
        var it = this.data_.rbegin();
        var index = --this.size_;
        // ERASE OR NOT
        if (it.first === index)
            this.data_.erase(it.base());
    };
    /* ---------------------------------------------------------
        INSERT
    --------------------------------------------------------- */
    /**
     * @hidden
     */
    VectorBoolean.prototype._Insert_by_repeating_val = function (pos, n, val) {
        // RESERVE ELEMENTS -> THE REPEATED COUNT AND VALUE
        var elements = [];
        elements.push(new Pair_1.Pair(n, val));
        // DO INSERT
        if (pos.equals(this.end()) === true)
            return this._Insert_to_end(elements);
        else
            return this._Insert_to_middle(pos, elements);
    };
    /**
     * @hidden
     */
    VectorBoolean.prototype._Insert_by_range = function (pos, first, last) {
        // RESERVE ELEMENTS -> REPEATED SIZE & VALUE
        var elements = [];
        for (var it = first; !it.equals(last); it = it.next()) {
            if (elements.length === 0 || elements[elements.length - 1].second !== it.value)
                elements.push(new Pair_1.Pair(1, it.value));
            else
                ++elements[elements.length - 1].first;
        }
        if (pos.equals(this.end()) === true)
            return this._Insert_to_end(elements);
        else
            return this._Insert_to_middle(pos, elements);
    };
    /**
     * @hidden
     */
    VectorBoolean.prototype._Insert_to_middle = function (pos, elements) {
        var first = this._Find_node(pos.index());
        for (var it = first; !it.equals(this.data_.end()); it = it.next()) {
            // COMPUTE SIZE TO ENROLL
            var next = it.next();
            var sx = (it.first < pos.index())
                ? pos.index() // POSITION TO INSERT
                : it.first; // CURRENT POINT
            var sy = next.equals(this.data_.end())
                ? this.size() // IT'S THE LAST ELEMENT
                : next.first; // TO NEXT ELEMENT
            // DO ENROLL
            var size = sy - sx;
            var value = !!it.second;
            elements.push(new Pair_1.Pair(size, value));
        }
        // ERASE BACK-SIDE ELEMENTS FOR THE POST-INSERTION
        this.size_ = pos.index();
        this.data_.erase(first.first === pos.index()
            ? first
            : first.next(), this.data_.end());
        // DO POST-INSERTION
        return this._Insert_to_end(elements);
    };
    /**
     * @hidden
     */
    VectorBoolean.prototype._Insert_to_end = function (elements) {
        var old_size = this.size();
        var last_value = this.data_.empty()
            ? null
            : this.data_.rbegin().second;
        for (var i = 0; i < elements.length; ++i) {
            var p = elements[i];
            // INDEXING
            var index = this.size();
            var value = !!p.second;
            this.size_ += p.first;
            // NEED NOT TO EMPLACE, JUST SKIP
            if (i === 0 && value === last_value)
                continue;
            // DO EMPLACE
            this.data_.emplace(index, value);
        }
        return this.begin().advance(old_size);
    };
    /* ---------------------------------------------------------
        ERASE
    --------------------------------------------------------- */
    /**
     * @hidden
     */
    VectorBoolean.prototype._Erase_by_range = function (first, last) {
        var elements = [];
        if (last.equals(this.end()) === false) {
            var last_index = Math.min(this.size(), last.index());
            for (var it = this._Find_node(last_index); !it.equals(this.data_.end()); it = it.next()) {
                var next = it.next();
                var sx = Math.max(it.first, last_index);
                var sy = next.equals(this.data_.end())
                    ? this.size() // IT'S THE LAST ELEMENT
                    : next.first; // TO NEXT ELEMENT
                var size = sy - sx;
                var value = it.second;
                elements.push(new Pair_1.Pair(size, value));
            }
        }
        this.size_ = first.index();
        this.data_.erase(this.data_.lower_bound(this.size_), this.data_.end());
        return this._Insert_to_end(elements);
    };
    return VectorBoolean;
}(ArrayContainer_1.ArrayContainer));
exports.VectorBoolean = VectorBoolean;
(function (VectorBoolean) {
    // BODY
    VectorBoolean.Iterator = ArrayIterator_1.ArrayIterator;
    VectorBoolean.ReverseIterator = ArrayIterator_1.ArrayReverseIterator;
    // BODY
    VectorBoolean.iterator = VectorBoolean.Iterator;
    VectorBoolean.reverse_iterator = VectorBoolean.ReverseIterator;
})(VectorBoolean = exports.VectorBoolean || (exports.VectorBoolean = {}));
exports.VectorBoolean = VectorBoolean;
exports.vetor_bool = VectorBoolean;
//# sourceMappingURL=VectorBoolean.js.map

/***/ }),

/***/ "./node_modules/tstl/container/index.js":
/*!**********************************************!*\
  !*** ./node_modules/tstl/container/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std */
//================================================================
//--------
// LINEAR CONTAINERS
//--------
// FORMAL CONTAINERS
__export(__webpack_require__(/*! ./Vector */ "./node_modules/tstl/container/Vector.js"));
__export(__webpack_require__(/*! ./Deque */ "./node_modules/tstl/container/Deque.js"));
__export(__webpack_require__(/*! ./List */ "./node_modules/tstl/container/List.js"));
// SPECIAL CONTAINERS
__export(__webpack_require__(/*! ./VectorBoolean */ "./node_modules/tstl/container/VectorBoolean.js"));
__export(__webpack_require__(/*! ./ForwardList */ "./node_modules/tstl/container/ForwardList.js"));
//--------
// ASSOCIATIVE CONTAINERS
//--------
// SETS
__export(__webpack_require__(/*! ./TreeSet */ "./node_modules/tstl/container/TreeSet.js"));
__export(__webpack_require__(/*! ./HashSet */ "./node_modules/tstl/container/HashSet.js"));
__export(__webpack_require__(/*! ./TreeMultiSet */ "./node_modules/tstl/container/TreeMultiSet.js"));
__export(__webpack_require__(/*! ./HashMultiSet */ "./node_modules/tstl/container/HashMultiSet.js"));
// MAPS
__export(__webpack_require__(/*! ./TreeMap */ "./node_modules/tstl/container/TreeMap.js"));
__export(__webpack_require__(/*! ./HashMap */ "./node_modules/tstl/container/HashMap.js"));
__export(__webpack_require__(/*! ./TreeMultiMap */ "./node_modules/tstl/container/TreeMultiMap.js"));
__export(__webpack_require__(/*! ./HashMultiMap */ "./node_modules/tstl/container/HashMultiMap.js"));
//--------
// ADAPTOR CONTAINERS
//--------
__export(__webpack_require__(/*! ./Stack */ "./node_modules/tstl/container/Stack.js"));
__export(__webpack_require__(/*! ./Queue */ "./node_modules/tstl/container/Queue.js"));
__export(__webpack_require__(/*! ./PriorityQueue */ "./node_modules/tstl/container/PriorityQueue.js"));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/tstl/exception/ErrorCategory.js":
/*!******************************************************!*\
  !*** ./node_modules/tstl/exception/ErrorCategory.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ErrorCondition_1 = __webpack_require__(/*! ./ErrorCondition */ "./node_modules/tstl/exception/ErrorCondition.js");
var comparators_1 = __webpack_require__(/*! ../functional/comparators */ "./node_modules/tstl/functional/comparators.js");
/**
 * Error category.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var ErrorCategory = /** @class */ (function () {
    /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
    /**
     * Default Constructor.
     */
    function ErrorCategory() {
    }
    /* ---------------------------------------------------------
        OPERATORS
    --------------------------------------------------------- */
    /**
     * Get default error condition.
     *
     * @param val Identifier of an error condition.
     * @return The error condition.
     */
    ErrorCategory.prototype.default_error_condition = function (val) {
        return new ErrorCondition_1.ErrorCondition(val, this);
    };
    ErrorCategory.prototype.equivalent = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args[1] instanceof ErrorCondition_1.ErrorCondition) {
            var val_code = args[0];
            var cond = args[1];
            return comparators_1.equal_to(this.default_error_condition(val_code), cond);
        }
        else {
            var code = args[0];
            var valcond = args[1];
            return comparators_1.equal_to(this, code.category()) && code.value() === valcond;
        }
    };
    return ErrorCategory;
}());
exports.ErrorCategory = ErrorCategory;
exports.error_category = ErrorCategory;
//# sourceMappingURL=ErrorCategory.js.map

/***/ }),

/***/ "./node_modules/tstl/exception/ErrorCode.js":
/*!**************************************************!*\
  !*** ./node_modules/tstl/exception/ErrorCode.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std */
//================================================================
var ErrorInstance_1 = __webpack_require__(/*! ../base/ErrorInstance */ "./node_modules/tstl/base/ErrorInstance.js");
/**
 * Error code.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var ErrorCode = /** @class */ (function (_super) {
    __extends(ErrorCode, _super);
    function ErrorCode(val, category) {
        if (val === void 0) { val = 0; }
        if (category === void 0) { category = null; }
        return _super.call(this, val, category) || this;
    }
    /**
     * Get default error condition.
     *
     * @return The default error condition object.
     */
    ErrorCode.prototype.default_error_condition = function () {
        return this.category_.default_error_condition(this.value_);
    };
    return ErrorCode;
}(ErrorInstance_1.ErrorInstance));
exports.ErrorCode = ErrorCode;
exports.error_code = ErrorCode;
//# sourceMappingURL=ErrorCode.js.map

/***/ }),

/***/ "./node_modules/tstl/exception/ErrorCondition.js":
/*!*******************************************************!*\
  !*** ./node_modules/tstl/exception/ErrorCondition.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std */
//================================================================
var ErrorInstance_1 = __webpack_require__(/*! ../base/ErrorInstance */ "./node_modules/tstl/base/ErrorInstance.js");
/**
 * Error condition.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var ErrorCondition = /** @class */ (function (_super) {
    __extends(ErrorCondition, _super);
    function ErrorCondition(val, category) {
        if (val === void 0) { val = 0; }
        if (category === void 0) { category = null; }
        return _super.call(this, val, category) || this;
    }
    return ErrorCondition;
}(ErrorInstance_1.ErrorInstance));
exports.ErrorCondition = ErrorCondition;
exports.error_condition = ErrorCondition;
//# sourceMappingURL=ErrorCondition.js.map

/***/ }),

/***/ "./node_modules/tstl/exception/Exception.js":
/*!**************************************************!*\
  !*** ./node_modules/tstl/exception/Exception.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std */
//================================================================
/**
 * Base Exception.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var Exception = /** @class */ (function (_super) {
    __extends(Exception, _super);
    function Exception(message) {
        var _newTarget = this.constructor;
        if (message === void 0) { message = ""; }
        var _this = _super.call(this, message) || this;
        // INHERITANCE POLYFILL
        var proto = _newTarget.prototype;
        if (Object.setPrototypeOf)
            Object.setPrototypeOf(_this, proto);
        else
            _this.__proto__ = proto;
        return _this;
    }
    Object.defineProperty(Exception.prototype, "name", {
        /* ---------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------- */
        /**
         * The error name.
         */
        get: function () {
            return "exception";
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Get error message.
     *
     * @return The error message.
     */
    Exception.prototype.what = function () {
        return this.message;
    };
    return Exception;
}(Error));
exports.Exception = Exception;
exports.exception = Exception;
//# sourceMappingURL=Exception.js.map

/***/ }),

/***/ "./node_modules/tstl/exception/LogicError.js":
/*!***************************************************!*\
  !*** ./node_modules/tstl/exception/LogicError.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std */
//================================================================
var Exception_1 = __webpack_require__(/*! ./Exception */ "./node_modules/tstl/exception/Exception.js");
/**
 * Logic Error.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var LogicError = /** @class */ (function (_super) {
    __extends(LogicError, _super);
    /**
     * Initializer Constructor.
     *
     * @param message The error messgae.
     */
    function LogicError(message) {
        return _super.call(this, message) || this;
    }
    Object.defineProperty(LogicError.prototype, "name", {
        /**
         * @inheritDoc
         */
        get: function () {
            return "logic_error";
        },
        enumerable: true,
        configurable: true
    });
    return LogicError;
}(Exception_1.Exception));
exports.LogicError = LogicError;
/**
 * Domain Error.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var DomainError = /** @class */ (function (_super) {
    __extends(DomainError, _super);
    /**
     * Initializer Constructor.
     *
     * @param message The error messgae.
     */
    function DomainError(message) {
        return _super.call(this, message) || this;
    }
    Object.defineProperty(DomainError.prototype, "name", {
        /**
         * @inheritDoc
         */
        get: function () {
            return "domain_error";
        },
        enumerable: true,
        configurable: true
    });
    return DomainError;
}(LogicError));
exports.DomainError = DomainError;
/**
 * Invalid Argument Exception.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var InvalidArgument = /** @class */ (function (_super) {
    __extends(InvalidArgument, _super);
    /**
     * Initializer Constructor.
     *
     * @param message The error messgae.
     */
    function InvalidArgument(message) {
        return _super.call(this, message) || this;
    }
    Object.defineProperty(InvalidArgument.prototype, "name", {
        /**
         * @inheritDoc
         */
        get: function () {
            return "invalid_argument";
        },
        enumerable: true,
        configurable: true
    });
    return InvalidArgument;
}(LogicError));
exports.InvalidArgument = InvalidArgument;
/**
 * Length Error.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var LengthError = /** @class */ (function (_super) {
    __extends(LengthError, _super);
    /**
     * Initializer Constructor.
     *
     * @param message The error messgae.
     */
    function LengthError(message) {
        return _super.call(this, message) || this;
    }
    Object.defineProperty(LengthError.prototype, "name", {
        /**
         * @inheritDoc
         */
        get: function () {
            return "length_error";
        },
        enumerable: true,
        configurable: true
    });
    return LengthError;
}(LogicError));
exports.LengthError = LengthError;
/**
 * Out-of-range Exception.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var OutOfRange = /** @class */ (function (_super) {
    __extends(OutOfRange, _super);
    /**
     * Initializer Constructor.
     *
     * @param message The error messgae.
     */
    function OutOfRange(message) {
        return _super.call(this, message) || this;
    }
    Object.defineProperty(OutOfRange.prototype, "name", {
        /**
         * @inheritDoc
         */
        get: function () {
            return "out_of_range";
        },
        enumerable: true,
        configurable: true
    });
    return OutOfRange;
}(LogicError));
exports.OutOfRange = OutOfRange;
exports.logic_error = LogicError;
exports.domain_error = DomainError;
exports.invalid_argument = InvalidArgument;
exports.length_error = LengthError;
exports.out_of_range = OutOfRange;
//# sourceMappingURL=LogicError.js.map

/***/ }),

/***/ "./node_modules/tstl/exception/RuntimeError.js":
/*!*****************************************************!*\
  !*** ./node_modules/tstl/exception/RuntimeError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std */
//================================================================
var Exception_1 = __webpack_require__(/*! ./Exception */ "./node_modules/tstl/exception/Exception.js");
/**
 * Runtime Error.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var RuntimeError = /** @class */ (function (_super) {
    __extends(RuntimeError, _super);
    /**
     * Initializer Constructor.
     *
     * @param message The error messgae.
     */
    function RuntimeError(message) {
        return _super.call(this, message) || this;
    }
    Object.defineProperty(RuntimeError.prototype, "name", {
        /**
         * @inheritDoc
         */
        get: function () {
            return "runtime_error";
        },
        enumerable: true,
        configurable: true
    });
    return RuntimeError;
}(Exception_1.Exception));
exports.RuntimeError = RuntimeError;
/**
 * Overflow Error.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var OverflowError = /** @class */ (function (_super) {
    __extends(OverflowError, _super);
    /**
     * Initializer Constructor.
     *
     * @param message The error messgae.
     */
    function OverflowError(message) {
        return _super.call(this, message) || this;
    }
    Object.defineProperty(OverflowError.prototype, "name", {
        /**
         * @inheritDoc
         */
        get: function () {
            return "overflow_error";
        },
        enumerable: true,
        configurable: true
    });
    return OverflowError;
}(RuntimeError));
exports.OverflowError = OverflowError;
/**
 * Underflow Error.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var UnderflowError = /** @class */ (function (_super) {
    __extends(UnderflowError, _super);
    /**
     * Initializer Constructor.
     *
     * @param message The error messgae.
     */
    function UnderflowError(message) {
        return _super.call(this, message) || this;
    }
    Object.defineProperty(UnderflowError.prototype, "name", {
        /**
         * @inheritDoc
         */
        get: function () {
            return "underflow_error";
        },
        enumerable: true,
        configurable: true
    });
    return UnderflowError;
}(RuntimeError));
exports.UnderflowError = UnderflowError;
/**
 * Range Error.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var RangeError = /** @class */ (function (_super) {
    __extends(RangeError, _super);
    /**
     * Initializer Constructor.
     *
     * @param message The error messgae.
     */
    function RangeError(message) {
        return _super.call(this, message) || this;
    }
    Object.defineProperty(RangeError.prototype, "name", {
        /**
         * @inheritDoc
         */
        get: function () {
            return "range_error";
        },
        enumerable: true,
        configurable: true
    });
    return RangeError;
}(RuntimeError));
exports.RangeError = RangeError;
exports.runtime_error = RuntimeError;
exports.overflow_error = OverflowError;
exports.underflow_error = UnderflowError;
exports.range_error = RangeError;
//# sourceMappingURL=RuntimeError.js.map

/***/ }),

/***/ "./node_modules/tstl/exception/SystemError.js":
/*!****************************************************!*\
  !*** ./node_modules/tstl/exception/SystemError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std */
//================================================================
var RuntimeError_1 = __webpack_require__(/*! ./RuntimeError */ "./node_modules/tstl/exception/RuntimeError.js");
var ErrorCode_1 = __webpack_require__(/*! ./ErrorCode */ "./node_modules/tstl/exception/ErrorCode.js");
/**
 * System Error.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var SystemError = /** @class */ (function (_super) {
    __extends(SystemError, _super);
    function SystemError() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this, "") || this;
        if (args.length >= 2 && typeof args[0].valueOf() === "number") {
            var val = args[0];
            var category = args[1];
            _this.code_ = new ErrorCode_1.ErrorCode(val, category);
            _this.message = args[2];
        }
        else {
            _this.code_ = args[0];
            _this.message = args[1];
        }
        return _this;
    }
    Object.defineProperty(SystemError.prototype, "name", {
        /* ---------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------- */
        /**
         * @inheritDoc
         */
        get: function () {
            return "system_error";
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Get error code.
     *
     * @return The error code.
     */
    SystemError.prototype.code = function () {
        return this.code_;
    };
    return SystemError;
}(RuntimeError_1.RuntimeError));
exports.SystemError = SystemError;
exports.system_error = SystemError;
//# sourceMappingURL=SystemError.js.map

/***/ }),

/***/ "./node_modules/tstl/exception/global.js":
/*!***********************************************!*\
  !*** ./node_modules/tstl/exception/global.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std */
//================================================================
var node_1 = __webpack_require__(/*! ../utility/node */ "./node_modules/tstl/utility/node.js");
var Global_1 = __webpack_require__(/*! ../base/Global */ "./node_modules/tstl/base/Global.js");
/**
 * Terminate program.
 */
function terminate() {
    if (node_1.is_node() === true)
        global.process.exit();
    else {
        if (typeof window !== "undefined" && self.open instanceof Function)
            self.open("", "_self", "");
        self.close();
    }
}
exports.terminate = terminate;
/**
 * Set terminate handler.
 *
 * @param func The terminate handler.
 */
function set_terminate(func) {
    //----
    // PREPARE EVENT LISTENER
    //----
    var type;
    var register;
    var eraser;
    if (node_1.is_node() === true) {
        type = "exit";
        register = function (type, listener) { return global.process.addListener(type, listener); };
        eraser = function (type, listener) { return global.process.removeListener(type, listener); };
    }
    else {
        // IF WORKER, THEN CANNOT ASSURE ACTIVATION.
        type = (typeof window !== "undefined")
            ? "unload"
            : "close";
        register = function (type, listener) { return self.addEventListener(type, listener); };
        eraser = function (type, listener) { return self.removeEventListener(type, listener); };
    }
    //----
    // ENROLL THE LISTENER
    //----
    // ERASE ORDINARY
    if (Global_1._Get_root().__s_pTerminate_handler !== undefined)
        eraser(type, Global_1._Get_root().__s_pTerminate_handler);
    // DO REGISTER
    register("exit", func);
    // ARCHIVE THE LISTENER
    Global_1._Get_root().__s_pTerminate_handler = func;
}
exports.set_terminate = set_terminate;
/**
 * Get terminate handler.
 *
 * @return The terminate handler.
 */
function get_terminate() {
    return Global_1._Get_root().__s_pTerminate_handler;
}
exports.get_terminate = get_terminate;
//# sourceMappingURL=global.js.map

/***/ }),

/***/ "./node_modules/tstl/exception/index.js":
/*!**********************************************!*\
  !*** ./node_modules/tstl/exception/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

//================================================================ 
/** @module std */
//================================================================
// <exception>
//
// @reference http://www.cplusplus.com/reference/exception/
// @author Jeongho Nam <http://samchon.org>
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./Exception */ "./node_modules/tstl/exception/Exception.js"));
__export(__webpack_require__(/*! ./LogicError */ "./node_modules/tstl/exception/LogicError.js"));
__export(__webpack_require__(/*! ./RuntimeError */ "./node_modules/tstl/exception/RuntimeError.js"));
__export(__webpack_require__(/*! ./SystemError */ "./node_modules/tstl/exception/SystemError.js"));
__export(__webpack_require__(/*! ./ErrorCategory */ "./node_modules/tstl/exception/ErrorCategory.js"));
__export(__webpack_require__(/*! ./ErrorCode */ "./node_modules/tstl/exception/ErrorCode.js"));
__export(__webpack_require__(/*! ./ErrorCondition */ "./node_modules/tstl/exception/ErrorCondition.js"));
__export(__webpack_require__(/*! ./global */ "./node_modules/tstl/exception/global.js"));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/tstl/experimental/algorithm.js":
/*!*****************************************************!*\
  !*** ./node_modules/tstl/experimental/algorithm.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = __webpack_require__(/*! ../base */ "./node_modules/tstl/base/index.js");
var algorithm_1 = __webpack_require__(/*! ../algorithm */ "./node_modules/tstl/algorithm/index.js");
var comparators_1 = __webpack_require__(/*! ../functional/comparators */ "./node_modules/tstl/functional/comparators.js");
function erase(container, val) {
    return erase_if(container, function (elem) { return comparators_1.equal_to(elem, val); });
}
exports.erase = erase;
function erase_if(container, predicator) {
    if (container.remove_if instanceof Function)
        container.remove_if(predicator);
    else if (container.at instanceof base_1.ArrayContainer) {
        var it = algorithm_1.remove_if(container.begin(), container.end(), predicator);
        container.erase(it, container.end());
    }
    else {
        for (var it = container.begin(); !it.equals(container.end());)
            if (predicator(it.value))
                it = container.erase(it);
            else
                it = it.next();
    }
}
exports.erase_if = erase_if;
//# sourceMappingURL=algorithm.js.map

/***/ }),

/***/ "./node_modules/tstl/experimental/index.js":
/*!*************************************************!*\
  !*** ./node_modules/tstl/experimental/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std.experimental */
//================================================================
__export(__webpack_require__(/*! ./algorithm */ "./node_modules/tstl/experimental/algorithm.js"));
__export(__webpack_require__(/*! ./thread */ "./node_modules/tstl/experimental/thread/index.js"));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/tstl/experimental/thread/Barrier.js":
/*!**********************************************************!*\
  !*** ./node_modules/tstl/experimental/thread/Barrier.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std.experimental */
//================================================================
var FlexBarrier_1 = __webpack_require__(/*! ./FlexBarrier */ "./node_modules/tstl/experimental/thread/FlexBarrier.js");
/**
 * Barrier for critical sections.
 *
 * The Barrier class blocks critical sections until the downward counter to be zero. Unlike the {@link Latch} class, Barrier can re-use the downward counter repeatedly.
 *
 * @author Jeongho Nam <samchon@samchon.org>
 */
var Barrier = /** @class */ (function (_super) {
    __extends(Barrier, _super);
    function Barrier(size) {
        var _this = _super.call(this, size, function () { return _this.size_; }) || this;
        return _this;
    }
    return Barrier;
}(FlexBarrier_1.FlexBarrier));
exports.Barrier = Barrier;
exports.barrier = Barrier;
//# sourceMappingURL=Barrier.js.map

/***/ }),

/***/ "./node_modules/tstl/experimental/thread/FlexBarrier.js":
/*!**************************************************************!*\
  !*** ./node_modules/tstl/experimental/thread/FlexBarrier.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std.experimental */
//================================================================
var ConditionVariable_1 = __webpack_require__(/*! ../../thread/ConditionVariable */ "./node_modules/tstl/thread/ConditionVariable.js");
/**
 * Flex Barrier for critical sections.
 *
 * The FlexBarrier class blocks critical sections until the downward counter to be zero. Unlike the {@link Barrier} class, FlexBarrier can re-define downward count size by custom function.
 *
 * @author Jeongho Nam <samchon@samchon.org>
 */
var FlexBarrier = /** @class */ (function () {
    /* ---------------------------------------------------------
        CONSTRUCTOR
    --------------------------------------------------------- */
    /**
     * Initializer Constructor.
     *
     * @param size Size of the downward counter.
     * @param complete Complete function re-configuring *size* when downward count be zero. Default is a function always returning -1, which means the barrier is not reusable more.
     */
    function FlexBarrier(size, complete) {
        if (complete === void 0) { complete = function () { return -1; }; }
        this.cv_ = new ConditionVariable_1.ConditionVariable();
        this.complete_ = complete;
        this.size_ = size;
        this.count_ = 0;
    }
    /* ---------------------------------------------------------
        ARRIVES
    --------------------------------------------------------- */
    FlexBarrier.prototype.arrive = function (n) {
        if (n === void 0) { n = 1; }
        return __awaiter(this, void 0, void 0, function () {
            var complete;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        complete = (this.count_ += n) >= this.size_;
                        if (complete === false)
                            return [2 /*return*/];
                        this.size_ = this.complete_();
                        this.count_ %= this.size_;
                        return [4 /*yield*/, this.cv_.notify_all()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FlexBarrier.prototype.arrive_and_wait = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.arrive()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.wait()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FlexBarrier.prototype.arrive_and_reset = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        --this.size_;
                        return [4 /*yield*/, this.arrive(0)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /* ---------------------------------------------------------
        WAIT FUNCTIONS
    --------------------------------------------------------- */
    FlexBarrier.prototype.wait = function () {
        return this.cv_.wait();
    };
    FlexBarrier.prototype.wait_for = function (ms) {
        return this.cv_.wait_for(ms);
    };
    FlexBarrier.prototype.wait_until = function (at) {
        return this.cv_.wait_until(at);
    };
    return FlexBarrier;
}());
exports.FlexBarrier = FlexBarrier;
exports.flex_barrier = FlexBarrier;
//# sourceMappingURL=FlexBarrier.js.map

/***/ }),

/***/ "./node_modules/tstl/experimental/thread/Latch.js":
/*!********************************************************!*\
  !*** ./node_modules/tstl/experimental/thread/Latch.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std.experimental */
//================================================================
var ConditionVariable_1 = __webpack_require__(/*! ../../thread/ConditionVariable */ "./node_modules/tstl/thread/ConditionVariable.js");
/**
 * Latch for critical sections.
 *
 * The Latch class blocks critical sections until the downward counter to be zero.
 */
var Latch = /** @class */ (function () {
    /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
    /**
     * Initializer Constructor.
     *
     * @param size Size of the downward counter.
     */
    function Latch(size) {
        this.cv_ = new ConditionVariable_1.ConditionVariable();
        this.count_ = size;
    }
    Latch.prototype.arrive = function (n) {
        if (n === void 0) { n = 1; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.count_ -= n;
                        if (!(this.is_ready() === true)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.cv_.notify_all()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    Latch.prototype.arrive_and_wait = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.arrive()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.wait()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /* ---------------------------------------------------------
        WAIT FUNCTIONS
    --------------------------------------------------------- */
    Latch.prototype.is_ready = function () {
        return this.count_ <= 0;
    };
    Latch.prototype.wait = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.is_ready() === false)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.cv_.wait()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    Latch.prototype.wait_for = function (ms) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.is_ready()) return [3 /*break*/, 1];
                        return [2 /*return*/, true];
                    case 1: return [4 /*yield*/, this.cv_.wait_for(ms)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Latch.prototype.wait_until = function (at) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.is_ready()) return [3 /*break*/, 1];
                        return [2 /*return*/, true];
                    case 1: return [4 /*yield*/, this.cv_.wait_until(at)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Latch;
}());
exports.Latch = Latch;
exports.latch = Latch;
//# sourceMappingURL=Latch.js.map

/***/ }),

/***/ "./node_modules/tstl/experimental/thread/Semaphore.js":
/*!************************************************************!*\
  !*** ./node_modules/tstl/experimental/thread/Semaphore.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Queue_1 = __webpack_require__(/*! ../../container/Queue */ "./node_modules/tstl/container/Queue.js");
var Pair_1 = __webpack_require__(/*! ../../utility/Pair */ "./node_modules/tstl/utility/Pair.js");
var LogicError_1 = __webpack_require__(/*! ../../exception/LogicError */ "./node_modules/tstl/exception/LogicError.js");
var RuntimeError_1 = __webpack_require__(/*! ../../exception/RuntimeError */ "./node_modules/tstl/exception/RuntimeError.js");
/**
 * Semaphore.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var Semaphore = /** @class */ (function () {
    /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
    function Semaphore(size) {
        this.hold_count_ = 0;
        this.locked_count_ = 0;
        this.size_ = size;
        this.listeners_ = new Queue_1.Queue();
    }
    /**
     * @inheritDoc
     */
    Semaphore.prototype.size = function () {
        return this.size_;
    };
    /**
     * @hidden
     */
    Semaphore.prototype._Compute_excess_count = function (count) {
        return Math.max(0, Math.min(this.locked_count_, this.size_) + count - this.size_);
    };
    /* ---------------------------------------------------------
        ACQURE & RELEASE
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    Semaphore.prototype.lock = function (count) {
        var _this = this;
        if (count === void 0) { count = 1; }
        return new Promise(function (resolve, reject) {
            // VALIDATE PARAMETER
            if (count < 1 || count > _this.size_) {
                reject(new LogicError_1.OutOfRange("Lock count to semaphore is out of its range."));
                return;
            }
            // INCREASE COUNT PROPERTIES
            var exceeded_count = _this._Compute_excess_count(count);
            _this.hold_count_ += exceeded_count;
            _this.locked_count_ += count;
            // BRANCH; KEEP OR GO?
            if (exceeded_count > 0)
                _this.listeners_.push(new Pair_1.Pair(resolve, exceeded_count));
            else
                resolve();
        });
    };
    /**
     * @inheritDoc
     */
    Semaphore.prototype.try_lock = function (count) {
        if (count === void 0) { count = 1; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // VALIDATE PARAMETER
                if (count < 1 || count > this.size_)
                    throw new LogicError_1.OutOfRange("Lock count to semaphore is out of its range.");
                // ALL OR NOTHING
                if (this.locked_count_ + count > this.size_)
                    return [2 /*return*/, false];
                this.locked_count_ += count;
                return [2 /*return*/, true];
            });
        });
    };
    /**
     * @inheritDoc
     */
    Semaphore.prototype.unlock = function (count) {
        if (count === void 0) { count = 1; }
        return __awaiter(this, void 0, void 0, function () {
            var resolved_count, front, fn;
            return __generator(this, function (_a) {
                // VALIDATE PARAMETER
                if (count < 1 || count > this.size_)
                    throw new LogicError_1.OutOfRange("Unlock count to semaphore is out of its range.");
                else if (count > this.locked_count_)
                    throw new RuntimeError_1.RangeError("Number of unlocks to semaphore is greater than its locks.");
                resolved_count = Math.min(count, this.hold_count_);
                this.hold_count_ -= resolved_count;
                this.locked_count_ -= count;
                while (resolved_count !== 0) {
                    front = this.listeners_.front();
                    if (front.second > resolved_count) {
                        front.second -= resolved_count;
                        resolved_count = 0;
                    }
                    else {
                        fn = front.first;
                        // POP AND DECREAE COUNT FIRST
                        resolved_count -= front.second;
                        this.listeners_.pop();
                        fn(); // AND CALL LATER
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    return Semaphore;
}());
exports.Semaphore = Semaphore;
exports.semaphore = Semaphore;
//# sourceMappingURL=Semaphore.js.map

/***/ }),

/***/ "./node_modules/tstl/experimental/thread/TimedSemaphore.js":
/*!*****************************************************************!*\
  !*** ./node_modules/tstl/experimental/thread/TimedSemaphore.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var HashMap_1 = __webpack_require__(/*! ../../container/HashMap */ "./node_modules/tstl/container/HashMap.js");
var LogicError_1 = __webpack_require__(/*! ../../exception/LogicError */ "./node_modules/tstl/exception/LogicError.js");
var RuntimeError_1 = __webpack_require__(/*! ../../exception/RuntimeError */ "./node_modules/tstl/exception/RuntimeError.js");
var global_1 = __webpack_require__(/*! ../../thread/global */ "./node_modules/tstl/thread/global.js");
/**
 * Timed semaphore.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var TimedSemaphore = /** @class */ (function () {
    /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
    /**
     * Construct from section size.
     *
     * @param size Number of maximum sections lockable.
     */
    function TimedSemaphore(size) {
        this.locked_count_ = 0;
        this.hold_count_ = 0;
        this.size_ = size;
        this.resolvers_ = new HashMap_1.HashMap();
    }
    /**
     * @inheritDoc
     */
    TimedSemaphore.prototype.size = function () {
        return this.size_;
    };
    /**
     * @hidden
     */
    TimedSemaphore.prototype._Compute_excess_count = function (count) {
        return Math.max(0, Math.min(this.locked_count_, this.size_) + count - this.size_);
    };
    /**
     * @hidden
     */
    TimedSemaphore.prototype._Compute_resolve_count = function (count) {
        return Math.min(count, this.hold_count_);
    };
    /* ---------------------------------------------------------
        ACQURE & RELEASE
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    TimedSemaphore.prototype.lock = function (count) {
        var _this = this;
        if (count === void 0) { count = 1; }
        return new Promise(function (resolve, reject) {
            // VALIDATE PARAMETER
            if (count < 1 || count > _this.size_) {
                reject(new LogicError_1.OutOfRange("Lock count to semaphore is out of its range."));
                return;
            }
            // INCREASE COUNT PROPERTIES
            var exceeded_count = _this._Compute_excess_count(count);
            _this.hold_count_ += exceeded_count;
            _this.locked_count_ += count;
            // BRANCH; KEEP OR GO?
            if (exceeded_count > 0)
                _this.resolvers_.emplace(resolve, {
                    count: exceeded_count,
                    type: 0 /* HOLD */
                });
            else
                resolve();
        });
    };
    /**
     * @inheritDoc
     */
    TimedSemaphore.prototype.try_lock = function (count) {
        if (count === void 0) { count = 1; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // VALIDATE PARAMETER
                if (count < 1 || count > this.size_)
                    throw new LogicError_1.OutOfRange("Lock count to semaphore is out of its range.");
                // ALL OR NOTHING
                if (this.locked_count_ + count > this.size_)
                    return [2 /*return*/, false];
                this.locked_count_ += count;
                return [2 /*return*/, true];
            });
        });
    };
    /**
     * @inheritDoc
     */
    TimedSemaphore.prototype.unlock = function (count) {
        if (count === void 0) { count = 1; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // VALIDATE PARAMETER
                        if (count < 1 || count > this.size_)
                            throw new LogicError_1.OutOfRange("Unlock count to semaphore is out of its range.");
                        else if (count > this.locked_count_)
                            throw new RuntimeError_1.RangeError("Number of unlocks to semaphore is greater than its locks.");
                        // DO RELEASE
                        this.locked_count_ -= count;
                        return [4 /*yield*/, this._Unlock(count)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @hidden
     */
    TimedSemaphore.prototype._Unlock = function (resolved_count) {
        return __awaiter(this, void 0, void 0, function () {
            var it /*Iterator*/, props;
            return __generator(this, function (_a) {
                // COMPUTE PROPERTY
                resolved_count = this._Compute_resolve_count(resolved_count);
                this.hold_count_ -= resolved_count;
                while (resolved_count !== 0) {
                    it = this.resolvers_.begin();
                    props = it.second;
                    if (props.count > resolved_count) {
                        props.count -= resolved_count;
                        resolved_count = 0;
                    }
                    else {
                        // POP AND DECREAE COUNT FIRST
                        resolved_count -= props.count;
                        this.resolvers_.erase(it);
                        // INFORM UNLOCK
                        if (props.type === 0 /* HOLD */)
                            it.first();
                        else
                            it.first(true);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    /* ---------------------------------------------------------
        TIMED ACQUIRE
    --------------------------------------------------------- */
    /**
     * Try lock sections until timeout.
     *
     * @param ms The maximum miliseconds for waiting.
     * @param count Count to lock.
     * @return Whether succeded to lock or not.
     */
    TimedSemaphore.prototype.try_lock_for = function (ms, count) {
        if (count === void 0) { count = 1; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        // VALIDATE PARAMETER
                        if (count < 1 || count > _this.size_) {
                            reject(new LogicError_1.OutOfRange("Lock count to semaphore is out of its range."));
                            return;
                        }
                        // INCRESE COUNT PROPERTIES
                        var exceeded_count = _this._Compute_excess_count(count);
                        _this.hold_count_ += exceeded_count;
                        _this.locked_count_ += count;
                        // BRANCH; KEEP OR GO?
                        if (exceeded_count > 0) {
                            // RESERVATE LOCK
                            _this.resolvers_.emplace(resolve, {
                                count: exceeded_count,
                                type: 1 /* KNOCK */
                            });
                            // DO SLEEP
                            global_1.sleep_for(ms).then(function () {
                                var it /*Iterator*/ = _this.resolvers_.find(resolve);
                                if (it.equals(_this.resolvers_.end()) === true)
                                    return; // ALREADY BE RETURNED
                                //----
                                // ADJUSTMENTS
                                //----
                                // ALL OR NOTHING
                                _this.locked_count_ -= count - (exceeded_count - it.second.count);
                                // ERASE RESOLVER
                                _this.hold_count_ -= it.second.count;
                                _this.resolvers_.erase(it);
                                // RELEASE FOR THE NEXT HOLDERS
                                _this._Unlock(it.second.count).then(function () {
                                    // RETURNS
                                    resolve(false);
                                });
                            });
                        }
                        else // SUCCEEDED AT ONCE
                            resolve(true);
                    })];
            });
        });
    };
    /**
     * Try lock sections until time expiration.
     *
     * @param at The maximum time point to wait.
     * @param count Count to lock.
     * @return Whether succeded to lock or not.
     */
    TimedSemaphore.prototype.try_lock_until = function (at, count) {
        if (count === void 0) { count = 1; }
        // COMPUTE MILLISECONDS TO WAIT
        var now = new Date();
        var ms = at.getTime() - now.getTime();
        return this.try_lock_for(ms, count);
    };
    return TimedSemaphore;
}());
exports.TimedSemaphore = TimedSemaphore;
exports.timed_semaphore = TimedSemaphore;
//# sourceMappingURL=TimedSemaphore.js.map

/***/ }),

/***/ "./node_modules/tstl/experimental/thread/index.js":
/*!********************************************************!*\
  !*** ./node_modules/tstl/experimental/thread/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std.experimental */
//================================================================
__export(__webpack_require__(/*! ./Semaphore */ "./node_modules/tstl/experimental/thread/Semaphore.js"));
__export(__webpack_require__(/*! ./TimedSemaphore */ "./node_modules/tstl/experimental/thread/TimedSemaphore.js"));
__export(__webpack_require__(/*! ./Latch */ "./node_modules/tstl/experimental/thread/Latch.js"));
__export(__webpack_require__(/*! ./Barrier */ "./node_modules/tstl/experimental/thread/Barrier.js"));
__export(__webpack_require__(/*! ./FlexBarrier */ "./node_modules/tstl/experimental/thread/FlexBarrier.js"));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/tstl/functional/bit_operations.js":
/*!********************************************************!*\
  !*** ./node_modules/tstl/functional/bit_operations.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std */
//================================================================
function logical_and(x, y) {
    return !!x && !!y;
}
exports.logical_and = logical_and;
function logical_or(x, y) {
    return !!x || !!y;
}
exports.logical_or = logical_or;
function logical_not(x) {
    return !x;
}
exports.logical_not = logical_not;
function bit_and(x, y) {
    return x & y;
}
exports.bit_and = bit_and;
function bit_or(x, y) {
    return x | y;
}
exports.bit_or = bit_or;
function bit_xor(x, y) {
    return x ^ y;
}
exports.bit_xor = bit_xor;
//# sourceMappingURL=bit_operations.js.map

/***/ }),

/***/ "./node_modules/tstl/functional/comparators.js":
/*!*****************************************************!*\
  !*** ./node_modules/tstl/functional/comparators.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var uid_1 = __webpack_require__(/*! ./uid */ "./node_modules/tstl/functional/uid.js");
/**
 * Test whether two arguments are equal.
 *
 * @param x The first argument to compare.
 * @param y The second argument to compare.
 * @return Whether two arguments are equal or not.
 */
function equal_to(x, y) {
    // CONVERT TO PRIMITIVE TYPE
    x = x.valueOf();
    y = y.valueOf();
    // DO COMPARE
    if (x instanceof Object && x.equals instanceof Function)
        return x.equals(y);
    else
        return x === y;
}
exports.equal_to = equal_to;
/**
 * Test whether two arguments are not equal.
 *
 * @param x The first argument to compare.
 * @param y The second argument to compare.
 * @return Returns `true`, if two arguments are not equal, otherwise `false`.
 */
function not_equal_to(x, y) {
    return !equal_to(x, y);
}
exports.not_equal_to = not_equal_to;
/**
 * Test whether *x* is less than *y*.
 *
 * @param x The first argument to compare.
 * @param y The second argument to compare.
 * @return Whether *x* is less than *y*.
 */
function less(x, y) {
    // CONVERT TO PRIMITIVE TYPE
    x = x.valueOf();
    y = y.valueOf();
    // DO COMPARE
    if (x instanceof Object)
        if (x.less instanceof Function) // has less()
            return x.less(y);
        else
            return uid_1.get_uid(x) < uid_1.get_uid(y);
    else
        return x < y;
}
exports.less = less;
/**
 * Test whether *x* is less than or equal to *y*.
 *
 * @param x The first argument to compare.
 * @param y The second argument to compare.
 * @return Whether *x* is less than or equal to *y*.
 */
function less_equal(x, y) {
    return less(x, y) || equal_to(x, y);
}
exports.less_equal = less_equal;
/**
 * Test whether *x* is greater than *y*.
 *
 * @param x The first argument to compare.
 * @param y The second argument to compare.
 * @return Whether *x* is greater than *y*.
 */
function greater(x, y) {
    return !less_equal(x, y);
}
exports.greater = greater;
/**
 * Test whether *x* is greater than or equal to *y*.
 *
 * @param x The first argument to compare.
 * @param y The second argument to compare.
 * @return Whether *x* is greater than or equal to *y*.
 */
function greater_equal(x, y) {
    return !less(x, y);
}
exports.greater_equal = greater_equal;
//# sourceMappingURL=comparators.js.map

/***/ }),

/***/ "./node_modules/tstl/functional/hash.js":
/*!**********************************************!*\
  !*** ./node_modules/tstl/functional/hash.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var uid_1 = __webpack_require__(/*! ./uid */ "./node_modules/tstl/functional/uid.js");
/**
 * Hash function.
 *
 * @param items The items to be hashed.
 * @return The hash code.
 */
function hash() {
    var items = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        items[_i] = arguments[_i];
    }
    var e_1, _a;
    var ret = _HASH_INIT_VALUE;
    try {
        for (var items_1 = __values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
            var item = items_1_1.value;
            item = item.valueOf();
            var type = typeof item;
            if (type === "boolean") // BOOLEAN -> 1 BYTE
                ret = _Hash_boolean(item, ret);
            else if (type === "number" || type === "bigint") // NUMBER -> 8 BYTES
                ret = _Hash_number(item, ret);
            else if (type === "string") // STRING -> {LENGTH} BYTES
                ret = _Hash_string(item, ret);
            else if (item instanceof Object) {
                // CALL THE HASH_CODE FUNCTION ?
                if (item.hashCode instanceof Function) {
                    var hashed = item.hashCode();
                    if (items.length === 1)
                        return hashed;
                    else {
                        ret = ret ^ hashed;
                        ret *= _HASH_MULTIPLIER;
                    }
                }
                else
                    ret = _Hash_number(uid_1.get_uid(item), ret);
            }
            else // NULL OR UNDEFINED
                ret *= _HASH_MULTIPLIER;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return ret;
}
exports.hash = hash;
/**
 * @hidden
 */
function _Hash_boolean(val, ret) {
    ret ^= val ? 1 : 0;
    ret *= _HASH_MULTIPLIER;
    return ret;
}
/**
 * @hidden
 */
function _Hash_number(val, ret) {
    return _Hash_string(val.toString(), ret);
    // // ------------------------------------------
    // //	IN C++
    // //		CONSIDER A NUMBER AS A STRING
    // //		HASH<STRING>((CHAR*)&VAL, 8)
    // // ------------------------------------------
    // // CONSTRUCT BUFFER AND BYTE_ARRAY
    // let buffer: ArrayBuffer = new ArrayBuffer(8);
    // let byteArray: Int8Array = new Int8Array(buffer);
    // let valueArray: Float64Array = new Float64Array(buffer);
    // valueArray[0] = val;
    // for (let i: number = 0; i < byteArray.length; ++i)
    // {
    // 	let byte = (byteArray[i] < 0) ? byteArray[i] + 256 : byteArray[i];
    // 	ret ^= byte;
    // 	ret *= _HASH_MULTIPLIER;
    // }
    // return Math.abs(ret);
}
/**
 * @hidden
 */
function _Hash_string(str, ret) {
    for (var i = 0; i < str.length; ++i) {
        ret ^= str.charCodeAt(i);
        ret *= _HASH_MULTIPLIER;
    }
    return Math.abs(ret);
}
/* ---------------------------------------------------------
    RESERVED ITEMS
--------------------------------------------------------- */
/**
 * @hidden
 */
var _HASH_INIT_VALUE = 2166136261;
/**
 * @hidden
 */
var _HASH_MULTIPLIER = 16777619;
//# sourceMappingURL=hash.js.map

/***/ }),

/***/ "./node_modules/tstl/functional/index.js":
/*!***********************************************!*\
  !*** ./node_modules/tstl/functional/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

//================================================================ 
/** @module std */
//================================================================
// <functional>
//
// @reference http://www.cplusplus.com/reference/functional/
// @author Jeongho Nam <http://samchon.org>
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./bit_operations */ "./node_modules/tstl/functional/bit_operations.js"));
__export(__webpack_require__(/*! ./comparators */ "./node_modules/tstl/functional/comparators.js"));
__export(__webpack_require__(/*! ./hash */ "./node_modules/tstl/functional/hash.js"));
__export(__webpack_require__(/*! ./uid */ "./node_modules/tstl/functional/uid.js"));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/tstl/functional/uid.js":
/*!*********************************************!*\
  !*** ./node_modules/tstl/functional/uid.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std */
//================================================================
var Global_1 = __webpack_require__(/*! ../base/Global */ "./node_modules/tstl/base/Global.js");
/**
 * Get unique identifier.
 *
 * @param obj Target object.
 * @return The identifier number.
 */
function get_uid(obj) {
    // NO UID EXISTS, THEN ISSUE ONE.
    if (obj.hasOwnProperty("__get_m_iUID") === false) {
        var uid = ++Global_1._Get_root().__s_iUID;
        Object.defineProperty(obj, "__get_m_iUID", {
            value: function () {
                return uid;
            }
        });
    }
    // RETURNS
    return obj.__get_m_iUID();
}
exports.get_uid = get_uid;
//# sourceMappingURL=uid.js.map

/***/ }),

/***/ "./node_modules/tstl/index.js":
/*!************************************!*\
  !*** ./node_modules/tstl/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std */
//================================================================
/**
 * Basic, internal features.
 */
exports.base = __webpack_require__(/*! ./base */ "./node_modules/tstl/base/index.js");
/**
 * Experimental Features.
 */
exports.experimental = __webpack_require__(/*! ./experimental */ "./node_modules/tstl/experimental/index.js");
__export(__webpack_require__(/*! ./container */ "./node_modules/tstl/container/index.js"));
__export(__webpack_require__(/*! ./iterator */ "./node_modules/tstl/iterator/index.js"));
__export(__webpack_require__(/*! ./algorithm */ "./node_modules/tstl/algorithm/index.js"));
__export(__webpack_require__(/*! ./exception */ "./node_modules/tstl/exception/index.js"));
__export(__webpack_require__(/*! ./functional */ "./node_modules/tstl/functional/index.js"));
__export(__webpack_require__(/*! ./numeric */ "./node_modules/tstl/numeric/index.js"));
__export(__webpack_require__(/*! ./thread */ "./node_modules/tstl/thread/index.js"));
__export(__webpack_require__(/*! ./utility */ "./node_modules/tstl/utility/index.js"));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/tstl/iterator/BackInsertIterator.js":
/*!**********************************************************!*\
  !*** ./node_modules/tstl/iterator/BackInsertIterator.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std */
//================================================================
var _InsertIterator_1 = __webpack_require__(/*! ../base/iterator/_InsertIterator */ "./node_modules/tstl/base/iterator/_InsertIterator.js");
var comparators_1 = __webpack_require__(/*! ../functional/comparators */ "./node_modules/tstl/functional/comparators.js");
/**
 * Back insert iterator.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var BackInsertIterator = /** @class */ (function (_super) {
    __extends(BackInsertIterator, _super);
    /* ---------------------------------------------------------
        METHODS
    --------------------------------------------------------- */
    /**
     * Initializer Constructor.
     *
     * @param source The source container.
     */
    function BackInsertIterator(source) {
        var _this = _super.call(this) || this;
        _this.source_ = source;
        return _this;
    }
    Object.defineProperty(BackInsertIterator.prototype, "value", {
        /**
         * @inheritDoc
         */
        set: function (val) {
            this.source_.push_back(val);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @inheritDoc
     */
    BackInsertIterator.prototype.equals = function (obj) {
        return comparators_1.equal_to(this.source_, obj.source_);
    };
    return BackInsertIterator;
}(_InsertIterator_1._InsertIterator));
exports.BackInsertIterator = BackInsertIterator;
//# sourceMappingURL=BackInsertIterator.js.map

/***/ }),

/***/ "./node_modules/tstl/iterator/FrontInsertIterator.js":
/*!***********************************************************!*\
  !*** ./node_modules/tstl/iterator/FrontInsertIterator.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std */
//================================================================
var _InsertIterator_1 = __webpack_require__(/*! ../base/iterator/_InsertIterator */ "./node_modules/tstl/base/iterator/_InsertIterator.js");
var comparators_1 = __webpack_require__(/*! ../functional/comparators */ "./node_modules/tstl/functional/comparators.js");
/**
 * Front insert iterator.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var FrontInsertIterator = /** @class */ (function (_super) {
    __extends(FrontInsertIterator, _super);
    /* ---------------------------------------------------------
        METHODS
    --------------------------------------------------------- */
    /**
     * Initializer Constructor.
     *
     * @param source The source container.
     */
    function FrontInsertIterator(source) {
        var _this = _super.call(this) || this;
        _this.source_ = source;
        return _this;
    }
    Object.defineProperty(FrontInsertIterator.prototype, "value", {
        /**
         * @inheritDoc
         */
        set: function (val) {
            this.source_.push_front(val);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @inheritDoc
     */
    FrontInsertIterator.prototype.equals = function (obj) {
        return comparators_1.equal_to(this.source_, obj.source_);
    };
    return FrontInsertIterator;
}(_InsertIterator_1._InsertIterator));
exports.FrontInsertIterator = FrontInsertIterator;
//# sourceMappingURL=FrontInsertIterator.js.map

/***/ }),

/***/ "./node_modules/tstl/iterator/InsertIterator.js":
/*!******************************************************!*\
  !*** ./node_modules/tstl/iterator/InsertIterator.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std */
//================================================================
var _InsertIterator_1 = __webpack_require__(/*! ../base/iterator/_InsertIterator */ "./node_modules/tstl/base/iterator/_InsertIterator.js");
var comparators_1 = __webpack_require__(/*! ../functional/comparators */ "./node_modules/tstl/functional/comparators.js");
/**
 * Insert iterator.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var InsertIterator = /** @class */ (function (_super) {
    __extends(InsertIterator, _super);
    /* ---------------------------------------------------------
        METHODS
    --------------------------------------------------------- */
    /**
     * Initializer Constructor.
     *
     * @param container Target container to insert.
     * @param it Iterator to the position to insert.
     */
    function InsertIterator(container, it) {
        var _this = _super.call(this) || this;
        _this.container_ = container;
        _this.it_ = it;
        return _this;
    }
    Object.defineProperty(InsertIterator.prototype, "value", {
        /**
         * @inheritDoc
         */
        set: function (val) {
            this.container_.insert(this.it_, val);
            this.it_ = this.it_.next();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @inheritDoc
     */
    InsertIterator.prototype.equals = function (obj) {
        return comparators_1.equal_to(this.it_, obj.it_);
    };
    return InsertIterator;
}(_InsertIterator_1._InsertIterator));
exports.InsertIterator = InsertIterator;
//# sourceMappingURL=InsertIterator.js.map

/***/ }),

/***/ "./node_modules/tstl/iterator/factory.js":
/*!***********************************************!*\
  !*** ./node_modules/tstl/iterator/factory.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Vector_1 = __webpack_require__(/*! ../container/Vector */ "./node_modules/tstl/container/Vector.js");
var InsertIterator_1 = __webpack_require__(/*! ./InsertIterator */ "./node_modules/tstl/iterator/InsertIterator.js");
var FrontInsertIterator_1 = __webpack_require__(/*! ./FrontInsertIterator */ "./node_modules/tstl/iterator/FrontInsertIterator.js");
var BackInsertIterator_1 = __webpack_require__(/*! ./BackInsertIterator */ "./node_modules/tstl/iterator/BackInsertIterator.js");
function begin(container) {
    if (container instanceof Array)
        container = Vector_1.Vector._Capsule(container);
    return container.begin();
}
exports.begin = begin;
function end(container) {
    if (container instanceof Array)
        container = Vector_1.Vector._Capsule(container);
    return container.end();
}
exports.end = end;
function inserter(container, it) {
    if (container instanceof Array)
        container = Vector_1.Vector._Capsule(container);
    return new InsertIterator_1.InsertIterator(container, it);
}
exports.inserter = inserter;
/**
 * Construct front insert iterator.
 *
 * @param source Target container.
 * @return The {@link FrontInsertIterator front insert iterator} object.
 */
function front_inserter(source) {
    return new FrontInsertIterator_1.FrontInsertIterator(source);
}
exports.front_inserter = front_inserter;
function back_inserter(source) {
    if (source instanceof Array)
        source = Vector_1.Vector._Capsule(source);
    return new BackInsertIterator_1.BackInsertIterator(source);
}
exports.back_inserter = back_inserter;
//----
// REVERSE ITERATORS
//----
/**
 * Construct reverse iterator.
 *
 * @param it Target iterator that reversable.
 * @return The reverse iterator object.
 */
function make_reverse_iterator(it) {
    return it.reverse();
}
exports.make_reverse_iterator = make_reverse_iterator;
function rbegin(source) {
    if (source instanceof Array)
        source = Vector_1.Vector._Capsule(source);
    source.rbegin();
}
exports.rbegin = rbegin;
function rend(source) {
    if (source instanceof Array)
        source = Vector_1.Vector._Capsule(source);
    source.rend();
}
exports.rend = rend;
//# sourceMappingURL=factory.js.map

/***/ }),

/***/ "./node_modules/tstl/iterator/global.js":
/*!**********************************************!*\
  !*** ./node_modules/tstl/iterator/global.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LogicError_1 = __webpack_require__(/*! ../exception/LogicError */ "./node_modules/tstl/exception/LogicError.js");
function empty(source) {
    if (source instanceof Array)
        return source.length === 0;
    else
        return source.empty();
}
exports.empty = empty;
function size(source) {
    if (source instanceof Array)
        return source.length;
    else
        return source.size();
}
exports.size = size;
/**
 * Get distance between two iterators.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 *
 * @return The distance.
 */
function distance(first, last) {
    if (first.index !== undefined)
        return _Distance_via_index(first, last);
    var ret = 0;
    for (; !first.equals(last); first = first.next())
        ++ret;
    return ret;
}
exports.distance = distance;
/**
 * @hidden
 */
function _Distance_via_index(first, last) {
    var start = first.index();
    var end = last.index();
    if (first.base instanceof Function)
        return start - end;
    else
        return end - start;
}
/* ---------------------------------------------------------
    ACCESSORS
--------------------------------------------------------- */
/**
 * Advance iterator.
 *
 * @param it Target iterator to advance.
 * @param n Step to advance.
 *
 * @return The advanced iterator.
 */
function advance(it, n) {
    if (it.advance instanceof Function)
        it = it.advance(n);
    else if (n > 0)
        for (var i = 0; i < n; ++i)
            it = it.next();
    else {
        var p_it = it;
        if (!(p_it.next instanceof Function))
            throw new LogicError_1.OutOfRange("It's not bidirectional iterator. Advancing to negative value is impossible.");
        n = -n;
        for (var i = 0; i < n; ++i)
            p_it = p_it.prev();
        it = p_it;
    }
    return it;
}
exports.advance = advance;
/**
 * Get previous iterator.
 *
 * @param it Iterator to move.
 * @param n Step to move prev.
 * @return An iterator moved to prev *n* steps.
 */
function prev(it, n) {
    if (n === void 0) { n = 1; }
    if (n === 1)
        return it.prev();
    else
        return advance(it, -n);
}
exports.prev = prev;
/**
 * Get next iterator.
 *
 * @param it Iterator to move.
 * @param n Step to move next.
 * @return Iterator moved to next *n* steps.
 */
function next(it, n) {
    if (n === void 0) { n = 1; }
    if (n === 1)
        return it.next();
    else
        return advance(it, n);
}
exports.next = next;
//# sourceMappingURL=global.js.map

/***/ }),

/***/ "./node_modules/tstl/iterator/index.js":
/*!*********************************************!*\
  !*** ./node_modules/tstl/iterator/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

//================================================================ 
/** @module std */
//================================================================
// <iterator>
//
// @reference http://www.cplusplus.com/reference/iterator
// @author Jeongho Nam <http://samchon.org>
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./InsertIterator */ "./node_modules/tstl/iterator/InsertIterator.js"));
__export(__webpack_require__(/*! ./FrontInsertIterator */ "./node_modules/tstl/iterator/FrontInsertIterator.js"));
__export(__webpack_require__(/*! ./BackInsertIterator */ "./node_modules/tstl/iterator/BackInsertIterator.js"));
__export(__webpack_require__(/*! ./factory */ "./node_modules/tstl/iterator/factory.js"));
__export(__webpack_require__(/*! ./global */ "./node_modules/tstl/iterator/global.js"));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/tstl/numeric/index.js":
/*!********************************************!*\
  !*** ./node_modules/tstl/numeric/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std */
//================================================================
__export(__webpack_require__(/*! ./operators */ "./node_modules/tstl/numeric/operators.js"));
__export(__webpack_require__(/*! ./operations */ "./node_modules/tstl/numeric/operations.js"));
__export(__webpack_require__(/*! ./special_math */ "./node_modules/tstl/numeric/special_math/index.js"));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/tstl/numeric/operations.js":
/*!*************************************************!*\
  !*** ./node_modules/tstl/numeric/operations.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! ./operators */ "./node_modules/tstl/numeric/operators.js");
/**
 * Greatest Common Divider.
 */
function gcd(x, y) {
    var _a;
    y = y.valueOf(); // `Number` to `number`
    while (y !== 0)
        _a = __read([y, x % y], 2), x = _a[0], y = _a[1];
    return x;
}
exports.gcd = gcd;
/**
 * Least Common Multiple.
 */
function lcm(x, y) {
    return x * y / gcd(x, y);
}
exports.lcm = lcm;
/* ---------------------------------------------------------
    COMMON ALGORITHMS
--------------------------------------------------------- */
function iota(first, last, value) {
    for (; !first.equals(last); first = first.next())
        first.value = value++;
}
exports.iota = iota;
function accumulate(first, last, init, op) {
    if (op === void 0) { op = operators_1.plus; }
    for (; !first.equals(last); first = first.next())
        init = op(init, first.value);
    return init;
}
exports.accumulate = accumulate;
function inner_product(first1, last1, first2, value, op1, op2) {
    if (op1 === void 0) { op1 = operators_1.plus; }
    if (op2 === void 0) { op2 = operators_1.multiplies; }
    for (; !first1.equals(last1); first1 = first1.next()) {
        value = op1(value, op2(first1.value, first2.value));
        first2 = first2.next();
    }
    return value;
}
exports.inner_product = inner_product;
function adjacent_difference(first, last, output, op) {
    if (op === void 0) { op = operators_1.minus; }
    var _a;
    if (first.equals(last))
        return output;
    // INITIALIZE
    var before;
    _a = __read(_Initialize(first, output), 3), first = _a[0], output = _a[1], before = _a[2];
    // COMPUTE OPERATIONS
    for (; !first.equals(last); first = first.next()) {
        output.value = op(first.value, before);
        before = first.value;
        output = output.next();
    }
    return output;
}
exports.adjacent_difference = adjacent_difference;
function partial_sum(first, last, output, op) {
    if (op === void 0) { op = operators_1.plus; }
    var _a;
    if (first.equals(last))
        return output;
    // INITIALIZE
    var sum;
    _a = __read(_Initialize(first, output), 3), first = _a[0], output = _a[1], sum = _a[2];
    // COMPUTE OPERATIONS
    for (; !first.equals(last); first = first.next()) {
        sum = op(sum, first.value);
        output.value = sum;
        output = output.next();
    }
    return output;
}
exports.partial_sum = partial_sum;
/* ---------------------------------------------------------
    PREFIX SUMS
--------------------------------------------------------- */
function inclusive_scan(first, last, output, op, init) {
    if (op === void 0) { op = operators_1.plus; }
    return transform_inclusive_scan(first, last, output, op, _Capsule, init);
}
exports.inclusive_scan = inclusive_scan;
function exclusive_scan(first, last, output, init, op) {
    if (op === void 0) { op = operators_1.plus; }
    return transform_exclusive_scan(first, last, output, init, op, _Capsule);
}
exports.exclusive_scan = exclusive_scan;
function transform_inclusive_scan(first, last, output, binary, unary, init) {
    var _a;
    if (first.equals(last))
        return output;
    // INITIALIZE
    var before;
    _a = __read(_Transform_initialize(first, output, unary, init), 3), first = _a[0], output = _a[1], before = _a[2];
    // COMPUTE OPERATIONS
    for (; !first.equals(last); first = first.next()) {
        before = binary(before, unary(first.value));
        output.value = before;
        output = output.next();
    }
    return output;
}
exports.transform_inclusive_scan = transform_inclusive_scan;
function transform_exclusive_scan(first, last, output, init, binary, unary) {
    var _a;
    if (first.equals(last))
        return output;
    // INITIALIZE
    var x = unary(first.value);
    var y;
    _a = __read(_Transform_initialize(first, output, unary, init), 3), first = _a[0], output = _a[1], y = _a[2];
    // COMPUTE OPERATIONS
    for (; !first.equals(last); first = first.next()) {
        y = binary(x, y);
        x = unary(first.value);
        output.value = y;
        output = output.next();
    }
    return output;
}
exports.transform_exclusive_scan = transform_exclusive_scan;
/**
 * @hidden
 */
function _Capsule(x) {
    return x;
}
/**
 * @hidden
 */
function _Initialize(first, output, init) {
    return _Transform_initialize(first, output, _Capsule, init);
}
/**
 * @hidden
 */
function _Transform_initialize(first, output, unary, init) {
    // WRITE THE FIRST OR INITIAL VALUE
    var ret = unary(init === undefined
        ? first.value
        : init);
    output.value = ret;
    // RETURNS WITH ADVANCES
    return [first.next(), output.next(), ret];
}
//# sourceMappingURL=operations.js.map

/***/ }),

/***/ "./node_modules/tstl/numeric/operators.js":
/*!************************************************!*\
  !*** ./node_modules/tstl/numeric/operators.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/* ---------------------------------------------------------
    PLUS
--------------------------------------------------------- */
function plus(x, y) {
    if (x.plus instanceof Function)
        return x.plus(y);
    else
        return x + y;
}
exports.plus = plus;
function minus(x, y) {
    if (x.minus instanceof Function)
        return x.minus(y);
    else
        return (x - y);
}
exports.minus = minus;
function negate(x) {
    if (x.negate instanceof Function)
        return x.negate();
    else
        return -x;
}
exports.negate = negate;
/* ---------------------------------------------------------
    MULTIPLY
--------------------------------------------------------- */
function multiplies(x, y) {
    if (x.multiplies instanceof Function)
        return x.multiplies(y);
    else
        return (x * y);
}
exports.multiplies = multiplies;
function divides(x, y) {
    if (x.divides instanceof Function)
        return x.divides(y);
    else
        return (x / y);
}
exports.divides = divides;
function modules(x, y) {
    if (x.modules instanceof Function)
        return x.modules(y);
    else
        return (x % y);
}
exports.modules = modules;
//# sourceMappingURL=operators.js.map

/***/ }),

/***/ "./node_modules/tstl/numeric/special_math/bessels.js":
/*!***********************************************************!*\
  !*** ./node_modules/tstl/numeric/special_math/bessels.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std */
//================================================================
var MathUtil_1 = __webpack_require__(/*! ../../base/numeric/MathUtil */ "./node_modules/tstl/base/numeric/MathUtil.js");
var LogicError_1 = __webpack_require__(/*! ../../exception/LogicError */ "./node_modules/tstl/exception/LogicError.js");
var gamma_1 = __webpack_require__(/*! ./gamma */ "./node_modules/tstl/numeric/special_math/gamma.js");
/**
 * @hidden
 */
var INFINITY = 100; // (1 / 30!) is nearby 0.
/*================================================================
    ORIGINAL FUNCTIONS
        - CYLINDRICAL
        - SPHERICAL
==================================================================
    FIRST KIND
--------------------------------------------------------------- */
/**
 * Bessel function of the 1st kind.
 *
 * @reference https://en.wikipedia.org/wiki/Bessel_function#Bessel_functions_of_the_first_kind:_J.CE.B1
 */
function cyl_bessel_j(n, x) {
    // VALIDATION
    if (x < 0 && Math.floor(n) !== n)
        throw new LogicError_1.DomainError("In cyl_bessel_j function, n must be integer when x is negative.");
    else if (x === 0 && n !== 0)
        throw new LogicError_1.DomainError("In cyl_bessel_j function, n must be zero when x is zero.");
    // COMPUTATION
    if (n === Math.floor(n))
        return _J_int(n, x);
    else
        return _J_positive(n, x);
}
exports.cyl_bessel_j = cyl_bessel_j;
/**
 * Bessel function of the 2nd kind.
 *
 * @reference https://en.wikipedia.org/wiki/Bessel_function#Bessel_functions_of_the_second_kind:_Y.CE.B1
 */
function cyl_neumann(v, x) {
    if (x <= 0)
        throw new LogicError_1.DomainError("cyl_neumann function requires x > 0");
    var numerator = cyl_bessel_j(v, x) * Math.cos(v * Math.PI) - cyl_bessel_j(-v, x);
    var denominator = Math.sin(v * Math.PI);
    return numerator / denominator;
}
exports.cyl_neumann = cyl_neumann;
/**
 * @hidden
 */
function _J_int(n, x) {
    if (n < 0)
        return Math.pow(-1, n) * _J_positive(-n, x);
    else
        return _J_positive(n, x);
}
/**
 * @hidden
 */
function _J_positive(v, x) {
    var sigma = MathUtil_1.MathUtil.sigma(function (k) {
        var ret = Math.pow(-1, k) * Math.pow(x / 2, v + 2 * k);
        ret /= MathUtil_1.MathUtil.factorial(k) * gamma_1.tgamma(v + k + 1);
        return ret;
    }, 0, INFINITY);
    return sigma;
}
/* ---------------------------------------------------------------
    SPHERICAL
--------------------------------------------------------------- */
/**
 * Spherical Bessel function of the 1st kind.
 *
 * @reference https://en.wikipedia.org/wiki/Bessel_function#Spherical_Bessel_functions:_jn.2C_yn
 */
function sph_bessel(n, x) {
    return Math.sqrt(Math.PI / (2 * x)) * cyl_bessel_j(n + .5, x);
}
exports.sph_bessel = sph_bessel;
/**
 * Spherical Bessel function of the 2nd kind.
 *
 * @reference https://en.wikipedia.org/wiki/Bessel_function#Spherical_Bessel_functions:_jn.2C_yn
 */
function sph_neumann(n, x) {
    var ret = Math.sqrt(Math.PI / (2 * x));
    ret *= cyl_neumann(n + .5, x);
    return ret;
}
exports.sph_neumann = sph_neumann;
/*================================================================
    REQGULAR MODIFIED
        - FIRST KIND
        - SECOND KIND
==================================================================
    FIRST KIND
--------------------------------------------------------------- */
/**
 * Modified cylindrical Bessel function of the 1st kind.
 *
 * @reference https://en.wikipedia.org/wiki/Bessel_function#Modified_Bessel_functions:_I.CE.B1_.2C_K.CE.B1
 */
function cyl_bessel_i(n, x) {
    // VALIDATION
    if (x < 0 && n !== Math.floor(n))
        throw new LogicError_1.DomainError("In cyl_bessel_i function, n must integer when x < 0");
    else if (x === 0 && n !== 0)
        throw new LogicError_1.DomainError("In cyl_bessel_i function, n must be zero when x is zero.");
    // COMPUTATION
    if (n === .5)
        return Math.sqrt(2.0 / (Math.PI * x)) * Math.sinh(x);
    else
        return _Bessel_i(n, x);
}
exports.cyl_bessel_i = cyl_bessel_i;
/**
 * @hidden
 */
function _Bessel_i(v, x) {
    return MathUtil_1.MathUtil.sigma(function (k) {
        var numerator = Math.pow(x / 2, v + 2 * k);
        var denominator = MathUtil_1.MathUtil.factorial(k) * gamma_1.tgamma(v + k + 1);
        return numerator / denominator;
    }, 0, INFINITY);
}
/* ---------------------------------------------------------------
    SECOND KIND
--------------------------------------------------------------- */
/**
 * Modified cylindrical Bessel function of the 2nd kind.
 *
 * @reference https://en.wikipedia.org/wiki/Bessel_function#Modified_Bessel_functions:_I.CE.B1_.2C_K.CE.B1
 */
function cyl_bessel_k(n, x) {
    if (x <= 0)
        throw new LogicError_1.DomainError("cyl_bessel_k function requires x <= 0");
    return _Bessel_k(n, x);
}
exports.cyl_bessel_k = cyl_bessel_k;
/**
 * @hidden
 */
function _Bessel_k(v, z) {
    var ret = Math.PI / 2;
    ret *= cyl_bessel_i(-v, z) - cyl_bessel_i(v, z);
    ret /= Math.sin(v * Math.PI);
    return ret;
}
//# sourceMappingURL=bessels.js.map

/***/ }),

/***/ "./node_modules/tstl/numeric/special_math/beta.js":
/*!********************************************************!*\
  !*** ./node_modules/tstl/numeric/special_math/beta.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std */
//================================================================
var gamma_1 = __webpack_require__(/*! ./gamma */ "./node_modules/tstl/numeric/special_math/gamma.js");
/**
 * Beta function.
 *
 * @reference https://en.wikipedia.org/wiki/Beta_function
 */
function beta(x, y) {
    return gamma_1.tgamma(x) * gamma_1.tgamma(y) / gamma_1.tgamma(x + y);
}
exports.beta = beta;
//# sourceMappingURL=beta.js.map

/***/ }),

/***/ "./node_modules/tstl/numeric/special_math/ellints.js":
/*!***********************************************************!*\
  !*** ./node_modules/tstl/numeric/special_math/ellints.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std */
//================================================================
var MathUtil_1 = __webpack_require__(/*! ../../base/numeric/MathUtil */ "./node_modules/tstl/base/numeric/MathUtil.js");
var LogicError_1 = __webpack_require__(/*! ../../exception/LogicError */ "./node_modules/tstl/exception/LogicError.js");
/* ---------------------------------------------------------------
    FIRST
--------------------------------------------------------------- */
/**
 * Incomplete elliptic integral of the 1st kind.
 *
 * @reference https://en.wikipedia.org/wiki/Elliptic_integral#Complete_elliptic_integral_of_the_first_kind
 */
function ellint_1(k, phi) {
    // FORMULA OF INTEGRAL
    var formula = function (x) {
        return 1.0 / _Common_formula(k, x);
    };
    return _Post_process(k, phi, formula);
}
exports.ellint_1 = ellint_1;
/**
 * Complete elliptic integral of the 1st kind.
 *
 * @reference https://en.wikipedia.org/wiki/Elliptic_integral#Elliptic_integral_of_the_first_kind
 */
function comp_ellint_1(k) {
    return ellint_1(k, Math.PI / 2);
}
exports.comp_ellint_1 = comp_ellint_1;
/* ---------------------------------------------------------------
    SECOND
--------------------------------------------------------------- */
/**
 * Incomplete elliptic integral of the 2nd kind.
 *
 * @reference https://en.wikipedia.org/wiki/Elliptic_integral#Incomplete_elliptic_integral_of_the_second_kind
 */
function ellint_2(k, phi) {
    var formula = function (x) {
        return _Common_formula(k, x);
    };
    return _Post_process(k, phi, formula);
}
exports.ellint_2 = ellint_2;
/**
 * Complete elliptic integral of the 2nd kind.
 *
 * @reference https://en.wikipedia.org/wiki/Elliptic_integral#Complete_elliptic_integral_of_the_second_kind
 */
function comp_ellint_2(k) {
    return ellint_2(k, Math.PI / 2);
}
exports.comp_ellint_2 = comp_ellint_2;
/* ---------------------------------------------------------------
    THIRD
--------------------------------------------------------------- */
/**
 * Incomplete elliptic integral of the 3rd kind.
 *
 * @reference https://en.wikipedia.org/wiki/Elliptic_integral#Complete_elliptic_integral_of_the_third_kind
 */
function ellint_3(k, v, phi) {
    // SPECIAL VALIDATIONS ONLY FOR SERIES-3
    if (v > 1 / Math.pow(Math.sin(phi), 2))
        throw new LogicError_1.DomainError("ellint_3 function requires n < (1 / sin^2(phi))");
    return _Ellint_3(k, v, phi);
}
exports.ellint_3 = ellint_3;
/**
 * Complete elliptic integral of the 3rd kind.
 *
 * @reference https://en.wikipedia.org/wiki/Elliptic_integral#Incomplete_elliptic_integral_of_the_third_kind
 */
function comp_ellint_3(k, n) {
    return ellint_3(k, n, Math.PI / 2);
}
exports.comp_ellint_3 = comp_ellint_3;
/**
 * @hidden
 */
function _Ellint_3(k, v, phi) {
    var formula = function (x) {
        var denominator = 1 - v * Math.pow(Math.sin(x), 2);
        denominator *= _Common_formula(k, x);
        return 1.0 / denominator;
    };
    return _Post_process(k, phi, formula);
}
/* ---------------------------------------------------------------
    BACKGROUNDS
--------------------------------------------------------------- */
/**
 * @hidden
 */
function _Common_formula(k, x) {
    return Math.sqrt(1 - Math.pow(k * Math.sin(x), 2));
}
/**
 * @hidden
 */
function _Post_process(k, phi, formula) {
    if (Math.abs(k) > 1)
        throw new LogicError_1.DomainError("ellint functions require |k| <= 1");
    var area = MathUtil_1.MathUtil.integral(formula, 0, phi);
    return (phi < 0) ? -area : area;
}
//# sourceMappingURL=ellints.js.map

/***/ }),

/***/ "./node_modules/tstl/numeric/special_math/expint.js":
/*!**********************************************************!*\
  !*** ./node_modules/tstl/numeric/special_math/expint.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std */
//================================================================
var MathUtil_1 = __webpack_require__(/*! ../../base/numeric/MathUtil */ "./node_modules/tstl/base/numeric/MathUtil.js");
/**
 * @hidden
 */
var EULER = 0.57721566490153286060;
/**
 * @hidden
 */
var MAX_K = 150;
/**
 * Exponential integral.
 */
function expint(x) {
    if (x === 0)
        return -Infinity;
    else if (x < 0)
        return -_E1_G(-x);
    else
        return _EI_Factorial(x);
}
exports.expint = expint;
/**
 * @hidden
 */
function _EI_Factorial(x) {
    return EULER + Math.log(Math.abs(x)) / Math.log(Math.E)
        + MathUtil_1.MathUtil.sigma(function (k) {
            return Math.pow(x, k) / (k * MathUtil_1.MathUtil.factorial(k));
        }, 1, MAX_K);
}
/* ---------------------------------------------------------------
    SWAMEE AND OHIJA APPROXIMATION
--------------------------------------------------------------- */
// function _E1_AB(x: number): number
// {
// 	let A: number = _Compute_A(x);
// 	let B: number = _Compute_B(x);
// 	let ret: number = Math.pow(A, -7.7) + B;
// 	return Math.pow(ret, -0.13);
// }
// function _Compute_A(x: number): number
// {
// 	let ret: number = 0.56146 / x + 0.65;
// 	ret *= 1 + x;
// 	ret = Math.log(ret) / Math.log(Math.E);
// 	return ret;
// }
// function _Compute_B(x: number): number
// {
// 	let ret: number = Math.pow(x, 4);
// 	ret *= Math.pow(Math.E, 7.7*x);
// 	ret *= Math.pow(2 + x, 3.7);
// 	return ret;
// }
/* ---------------------------------------------------------------
    BARRY APPROXIMATION
--------------------------------------------------------------- */
/**
 * @hidden
 */
function _E1_G(x) {
    var h = _Compute_h(x);
    var ret = G + (1 - G) * Math.pow(Math.E, -x / (1 - G));
    ret = Math.pow(Math.E, -x) / ret;
    var ln = 1 + G / x - (1 - G) / Math.pow(h + B * x, 2);
    ln = Math.log(ln) / Math.log(Math.E);
    return ret * ln;
}
/**
 * @hidden
 */
function _Compute_h(x) {
    var q = _Compute_q(x);
    var left = 1 / (1 + Math.pow(x, 1.5));
    var right = (H_INF * q) / (1 + q);
    return left + right;
}
/**
 * @hidden
 */
function _Compute_q(x) {
    return 20 / 47 * Math.pow(x, Math.sqrt(31 / 26));
}
/**
 * @hidden
 */
var G = Math.pow(Math.E, -EULER);
/**
 * @hidden
 */
var B = Math.sqrt((2 * (1 - G)) / (G * (2 - G)));
/**
 * @hidden
 */
var H_INF = (1 - G)
    * (G * G - 6 * G + 12)
    / (3 * G * Math.pow(2 - G, 2) * B);
//# sourceMappingURL=expint.js.map

/***/ }),

/***/ "./node_modules/tstl/numeric/special_math/gamma.js":
/*!*********************************************************!*\
  !*** ./node_modules/tstl/numeric/special_math/gamma.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std */
//================================================================
/**
 * Gamma function.
 *
 * @reference https://en.wikipedia.org/wiki/Gamma_function, https://rosettacode.org/wiki/Gamma_function#JavaScript
 */
function tgamma(x) {
    if (x < 0.5)
        return Math.PI / (Math.sin(Math.PI * x) * tgamma(1 - x));
    /*else if (x >= 1 && x === Math.floor(x))
        return base.MathUtil.factorial(x - 1);*/
    x -= 1;
    var a = P[0];
    var t = x + G + 0.5;
    for (var i = 1; i < P.length; ++i)
        a += P[i] / (x + i);
    return Math.sqrt(2 * Math.PI) * Math.pow(t, x + 0.5) * Math.exp(-t) * a;
}
exports.tgamma = tgamma;
/**
 * Log gamma function.
 */
function lgamma(x) {
    return Math.log(tgamma(x));
}
exports.lgamma = lgamma;
/**
 * @hidden
 */
var P = [
    0.99999999999980993, 676.5203681218851, -1259.1392167224028,
    771.32342877765313, -176.61502916214059, 12.507343278686905,
    -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7
];
/**
 * @hidden
 */
var G = 7;
//# sourceMappingURL=gamma.js.map

/***/ }),

/***/ "./node_modules/tstl/numeric/special_math/hermite.js":
/*!***********************************************************!*\
  !*** ./node_modules/tstl/numeric/special_math/hermite.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std */
//================================================================
var LogicError_1 = __webpack_require__(/*! ../../exception/LogicError */ "./node_modules/tstl/exception/LogicError.js");
/**
 * Hermite polynomial
 *
 * @reference https://en.wikipedia.org/wiki/Hermite_polynomials
 */
function hermite(n, x) {
    // VALIDATE PARAMETER
    if ((n = Math.floor(n)) < 0)
        throw new LogicError_1.InvalidArgument("In hermite function, n must be unsigned integer.");
    // MEMORIZATION
    var solutions = [1, 2 * x];
    // COMPUTE RETURN VALUE
    return _Hermite(n, x, solutions);
}
exports.hermite = hermite;
/**
 * @hidden
 */
function _Hermite(n, x, solutions) {
    if (solutions.length > n)
        return solutions[n];
    var hn_1 = _Hermite(n - 1, x, solutions);
    var hn_2 = _Hermite(n - 2, x, solutions);
    var ret = x * hn_1 - (n - 1) * hn_2;
    ret *= 2;
    solutions[n] = ret;
    return ret;
}
//# sourceMappingURL=hermite.js.map

/***/ }),

/***/ "./node_modules/tstl/numeric/special_math/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/tstl/numeric/special_math/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

//================================================================ 
/** @module std */
//================================================================
// <special_math>
//
// @reference http://en.cppreference.com/w/cpp/numeric/special_math
// @author Jeongho Nam <http://samchon.org>
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./beta */ "./node_modules/tstl/numeric/special_math/beta.js"));
__export(__webpack_require__(/*! ./gamma */ "./node_modules/tstl/numeric/special_math/gamma.js"));
__export(__webpack_require__(/*! ./bessels */ "./node_modules/tstl/numeric/special_math/bessels.js"));
__export(__webpack_require__(/*! ./ellints */ "./node_modules/tstl/numeric/special_math/ellints.js"));
__export(__webpack_require__(/*! ./expint */ "./node_modules/tstl/numeric/special_math/expint.js"));
__export(__webpack_require__(/*! ./hermite */ "./node_modules/tstl/numeric/special_math/hermite.js"));
__export(__webpack_require__(/*! ./legendres */ "./node_modules/tstl/numeric/special_math/legendres.js"));
__export(__webpack_require__(/*! ./laguerres */ "./node_modules/tstl/numeric/special_math/laguerres.js"));
__export(__webpack_require__(/*! ./zeta */ "./node_modules/tstl/numeric/special_math/zeta.js"));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/tstl/numeric/special_math/laguerres.js":
/*!*************************************************************!*\
  !*** ./node_modules/tstl/numeric/special_math/laguerres.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std */
//================================================================
var LogicError_1 = __webpack_require__(/*! ../../exception/LogicError */ "./node_modules/tstl/exception/LogicError.js");
/**
 * Laguerre polynomials.
 *
 * @reference https://en.wikipedia.org/wiki/Laguerre_polynomials
 */
function laguerre(n, x) {
    return assoc_laguerre(n, 0, x);
}
exports.laguerre = laguerre;
/**
 * Associated laguerre polynomials.
 *
 * @reference https://en.wikipedia.org/wiki/Laguerre_polynomials#Generalized_Laguerre_polynomials
 */
function assoc_laguerre(n, m, x) {
    // VALIDATE PARAMETERS
    if ((n = Math.floor(n)) < 0 || (m = Math.floor(m)) < 0)
        throw new LogicError_1.InvalidArgument("In assoc_laguerre function, both n and m must be unsigned integer.");
    // MEMORIZATION
    var solutions = [1, -x + m + 1];
    // COMPUTE RETURN VALUE
    return _Compute_assoc_laguerre(n, m, x, solutions);
}
exports.assoc_laguerre = assoc_laguerre;
/**
 * @hidden
 */
function _Compute_assoc_laguerre(n, m, x, solutions) {
    if (solutions.length > n)
        return solutions[n];
    var ln_1 = _Compute_assoc_laguerre(n - 1, m, x, solutions);
    var ln_2 = _Compute_assoc_laguerre(n - 2, m, x, solutions);
    var ret = (2 * n - 1 + m - x) * ln_1 - (n + m - 1) * ln_2;
    ret = ret / n;
    solutions[n] = ret;
    return ret;
}
//# sourceMappingURL=laguerres.js.map

/***/ }),

/***/ "./node_modules/tstl/numeric/special_math/legendres.js":
/*!*************************************************************!*\
  !*** ./node_modules/tstl/numeric/special_math/legendres.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std */
//================================================================
var LogicError_1 = __webpack_require__(/*! ../../exception/LogicError */ "./node_modules/tstl/exception/LogicError.js");
/**
 * Legendre polynomials.
 *
 * @reference http://en.cppreference.com/w/cpp/numeric/special_math/legendre
 */
function legendre(n, x) {
    return assoc_legendre(n, 0, x);
}
exports.legendre = legendre;
/**
 * Associated Legendre polynomials.
 *
 * @reference https://en.wikipedia.org/wiki/Associated_Legendre_polynomials
 */
function assoc_legendre(n, m, x) {
    // VALIDATE PARAMETERS
    if ((n = Math.floor(n)) < 0 || (m = Math.floor(m)) < 0)
        throw new LogicError_1.InvalidArgument("In assoc_legendre function, both n and m must be unsigned integer");
    else if (Math.abs(x) > 1)
        throw new LogicError_1.DomainError("assoc_legendre function requires -1 <= x <= 1");
    // MEMORIZATION
    var matrix = [[1, x]];
    matrix.length = m + 1;
    for (var i = 1; i < matrix.length; ++i)
        matrix[i] = [];
    // COMPUTE RETURN VALUE
    return _Compute_assoc_legendre(n, m, x, matrix);
}
exports.assoc_legendre = assoc_legendre;
/**
 * @hidden
 */
function _Compute_legendre(n, x, memory) {
    if (memory.length > n)
        return memory[n];
    var pn_1 = _Compute_legendre(n - 1, x, memory);
    var pn_2 = _Compute_legendre(n - 2, x, memory);
    var ret = (2 * n - 1) * x * pn_1 - (n - 1) * pn_2;
    ret /= n;
    memory[n] = ret;
    return ret;
}
/**
 * @hidden
 */
function _Compute_assoc_legendre(n, m, x, matrix) {
    if (n < 0)
        n = -n - 1;
    if (m === 0)
        return _Compute_legendre(n, x, matrix[0]);
    else if (matrix[m].length > n && matrix[m][n] !== undefined)
        return matrix[m][n];
    var left = (n - m + 1) * (n - m + 2) * _Compute_assoc_legendre(n + 1, m - 1, x, matrix);
    var right = (n + m - 1) * (n + m) * _Compute_assoc_legendre(n - 1, m - 1, x, matrix);
    var ret = (left - right) / (2 * n + 1);
    ret /= Math.sqrt(1 - x * x);
    matrix[m][n] = ret;
    return ret;
}
//# sourceMappingURL=legendres.js.map

/***/ }),

/***/ "./node_modules/tstl/numeric/special_math/zeta.js":
/*!********************************************************!*\
  !*** ./node_modules/tstl/numeric/special_math/zeta.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std */
//================================================================
var MathUtil_1 = __webpack_require__(/*! ../../base/numeric/MathUtil */ "./node_modules/tstl/base/numeric/MathUtil.js");
var gamma_1 = __webpack_require__(/*! ./gamma */ "./node_modules/tstl/numeric/special_math/gamma.js");
/**
 * @hidden
 */
var INFINITY = 100 * 1000;
/**
 * Riemann zeta function.
 *
 * @reference http://en.cppreference.com/w/cpp/numeric/special_math/riemann_zeta
 */
function riemann_zeta(arg) {
    if (arg < 0)
        return _Negative(arg);
    else if (arg === 0)
        return -0.5;
    else if (arg < 1)
        return _Fractional(arg);
    else if (arg === 1)
        return Infinity;
    else
        return _Positive(arg);
}
exports.riemann_zeta = riemann_zeta;
/**
 * @hidden
 */
function _Negative(arg) {
    return Math.pow(2, arg)
        * Math.pow(Math.PI, arg - 1)
        * Math.sin(Math.PI * arg / 2)
        * gamma_1.tgamma(1 - arg)
        * riemann_zeta(1 - arg);
}
/**
 * @hidden
 */
function _Fractional(arg) {
    var divider = 1 - Math.pow(2, 1 - arg);
    var sigma = MathUtil_1.MathUtil.sigma(function (n) {
        return Math.pow(-1, n - 1) * Math.pow(n, -arg);
    }, 1, INFINITY);
    return sigma / divider;
}
/**
 * @hidden
 */
function _Positive(arg) {
    return MathUtil_1.MathUtil.sigma(function (n) {
        return Math.pow(n, -arg);
    }, 1, INFINITY);
}
//# sourceMappingURL=zeta.js.map

/***/ }),

/***/ "./node_modules/tstl/thread/ConditionVariable.js":
/*!*******************************************************!*\
  !*** ./node_modules/tstl/thread/ConditionVariable.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std */
//================================================================
var HashMap_1 = __webpack_require__(/*! ../container/HashMap */ "./node_modules/tstl/container/HashMap.js");
var global_1 = __webpack_require__(/*! ./global */ "./node_modules/tstl/thread/global.js");
/**
 * Condition variable.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var ConditionVariable = /** @class */ (function () {
    /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
    /**
     * Default Constructor.
     */
    function ConditionVariable() {
        this.resolvers_ = new HashMap_1.HashMap();
    }
    /* ---------------------------------------------------------
        NOTIFIERS
    --------------------------------------------------------- */
    /**
     * Notify, wake one.
     */
    ConditionVariable.prototype.notify_one = function () {
        return __awaiter(this, void 0, void 0, function () {
            var it;
            return __generator(this, function (_a) {
                // NOTHING TO NOTIFY
                if (this.resolvers_.empty())
                    return [2 /*return*/];
                it = this.resolvers_.begin();
                this.resolvers_.erase(it);
                // CALL ITS HANDLER
                if (it.second === 0 /* HOLD */)
                    it.first();
                else
                    it.first(true);
                return [2 /*return*/];
            });
        });
    };
    /**
     * Notify, wake all
     */
    ConditionVariable.prototype.notify_all = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1, _a, resolvers, resolvers_1, resolvers_1_1, pair;
            return __generator(this, function (_b) {
                // NOTHING TO NOTIFY
                if (this.resolvers_.empty())
                    return [2 /*return*/];
                resolvers = this.resolvers_.toJSON();
                this.resolvers_.clear();
                try {
                    // ITERATE RESOLVERS
                    for (resolvers_1 = __values(resolvers), resolvers_1_1 = resolvers_1.next(); !resolvers_1_1.done; resolvers_1_1 = resolvers_1.next()) {
                        pair = resolvers_1_1.value;
                        if (pair.second === 0 /* HOLD */)
                            pair.first();
                        else
                            pair.first(true);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (resolvers_1_1 && !resolvers_1_1.done && (_a = resolvers_1.return)) _a.call(resolvers_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return [2 /*return*/];
            });
        });
    };
    ConditionVariable.prototype.wait = function (predicator) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!predicator) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._Wait()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [4 /*yield*/, predicator()];
                    case 3:
                        if (!!(_a.sent())) return [3 /*break*/, 5];
                        return [4 /*yield*/, this._Wait()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ConditionVariable.prototype.wait_for = function (ms, predicator) {
        var at = new Date(Date.now() + ms);
        return this.wait_until(at, predicator);
    };
    ConditionVariable.prototype.wait_until = function (at, predicator) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!predicator) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._Wait_until(at)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [4 /*yield*/, predicator()];
                    case 3:
                        if (!!(_a.sent())) return [3 /*break*/, 7];
                        return [4 /*yield*/, this._Wait_until(at)];
                    case 4:
                        if (!!(_a.sent())) return [3 /*break*/, 6];
                        return [4 /*yield*/, predicator()];
                    case 5: return [2 /*return*/, _a.sent()];
                    case 6: return [3 /*break*/, 2];
                    case 7: return [2 /*return*/, true];
                }
            });
        });
    };
    /**
     * @hidden
     */
    ConditionVariable.prototype._Wait = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.resolvers_.emplace(resolve, 0 /* HOLD */);
        });
    };
    /**
     * @hidden
     */
    ConditionVariable.prototype._Wait_until = function (at) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.resolvers_.emplace(resolve, 1 /* KNOCK */);
            // AUTOMATIC UNLOCK
            global_1.sleep_until(at).then(function () {
                if (_this.resolvers_.has(resolve) === false)
                    return;
                // DO UNLOCK
                _this.resolvers_.erase(resolve); // POP THE LISTENER
                resolve(false); // RETURN FAILURE
            });
        });
    };
    return ConditionVariable;
}());
exports.ConditionVariable = ConditionVariable;
exports.condition_variable = ConditionVariable;
//# sourceMappingURL=ConditionVariable.js.map

/***/ }),

/***/ "./node_modules/tstl/thread/Mutex.js":
/*!*******************************************!*\
  !*** ./node_modules/tstl/thread/Mutex.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Queue_1 = __webpack_require__(/*! ../container/Queue */ "./node_modules/tstl/container/Queue.js");
var RuntimeError_1 = __webpack_require__(/*! ../exception/RuntimeError */ "./node_modules/tstl/exception/RuntimeError.js");
/**
 * Mutex.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var Mutex = /** @class */ (function () {
    /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
    /**
     * Default Constructor.
     */
    function Mutex() {
        this.lock_count_ = 0;
        this.resolvers_ = new Queue_1.Queue();
    }
    /* ---------------------------------------------------------
        LOCK & UNLOCK
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    Mutex.prototype.lock = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this.lock_count_++ === 0)
                resolve();
            else
                _this.resolvers_.push(resolve);
        });
    };
    /**
     * @inheritDoc
     */
    Mutex.prototype.try_lock = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.lock_count_ !== 0)
                    return [2 /*return*/, false]; // HAVE LOCKED
                ++this.lock_count_;
                return [2 /*return*/, true];
            });
        });
    };
    /**
     * @inheritDoc
     */
    Mutex.prototype.unlock = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fn;
            return __generator(this, function (_a) {
                if (this.lock_count_ === 0)
                    throw new RuntimeError_1.RangeError("This mutex is free.");
                --this.lock_count_; // DECREASE LOCKED COUNT
                if (this.resolvers_.empty() === false) {
                    fn = this.resolvers_.front();
                    this.resolvers_.pop(); // POP FIRST
                    fn(); // AND CALL LATER
                }
                return [2 /*return*/];
            });
        });
    };
    return Mutex;
}());
exports.Mutex = Mutex;
exports.mutex = Mutex;
//# sourceMappingURL=Mutex.js.map

/***/ }),

/***/ "./node_modules/tstl/thread/SharedLock.js":
/*!************************************************!*\
  !*** ./node_modules/tstl/thread/SharedLock.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _SafeLock_1 = __webpack_require__(/*! ../base/thread/_SafeLock */ "./node_modules/tstl/base/thread/_SafeLock.js");
var SharedLock = /** @class */ (function () {
    /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
    function SharedLock(mutex) {
        this.mutex_ = mutex;
        this.try_lock_for = mutex.try_lock_shared_for instanceof Function
            ? SharedLock.try_lock_for.bind(undefined, this.mutex_)
            : undefined;
        this.try_lock_until = mutex.try_lock_shared_until instanceof Function
            ? SharedLock.try_lock_until.bind(undefined, this.mutex_)
            : undefined;
    }
    /* ---------------------------------------------------------
        COMMON METHODS
    --------------------------------------------------------- */
    SharedLock.prototype.lock = function (closure) {
        return SharedLock.lock(this.mutex_, closure);
    };
    SharedLock.prototype.try_lock = function (closure) {
        return SharedLock.try_lock(this.mutex_, closure);
    };
    return SharedLock;
}());
exports.SharedLock = SharedLock;
(function (SharedLock) {
    /* ---------------------------------------------------------
        STATIC FUNCTIONS
    --------------------------------------------------------- */
    function lock(mutex, closure) {
        return _SafeLock_1._SafeLock.lock(function () { return mutex.lock_shared(); }, function () { return mutex.unlock_shared(); }, closure);
    }
    SharedLock.lock = lock;
    function try_lock(mutex, closure) {
        return _SafeLock_1._SafeLock.try_lock(function () { return mutex.try_lock_shared(); }, function () { return mutex.unlock_shared(); }, closure);
    }
    SharedLock.try_lock = try_lock;
    function try_lock_for(mutex, ms, closure) {
        return _SafeLock_1._SafeLock.try_lock(function () { return mutex.try_lock_shared_for(ms); }, function () { return mutex.unlock_shared(); }, closure);
    }
    SharedLock.try_lock_for = try_lock_for;
    function try_lock_until(mutex, at, closure) {
        return _SafeLock_1._SafeLock.try_lock(function () { return mutex.try_lock_shared_until(at); }, function () { return mutex.unlock_shared(); }, closure);
    }
    SharedLock.try_lock_until = try_lock_until;
})(SharedLock = exports.SharedLock || (exports.SharedLock = {}));
exports.SharedLock = SharedLock;
exports.shared_lock = SharedLock;
//# sourceMappingURL=SharedLock.js.map

/***/ }),

/***/ "./node_modules/tstl/thread/SharedMutex.js":
/*!*************************************************!*\
  !*** ./node_modules/tstl/thread/SharedMutex.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Queue_1 = __webpack_require__(/*! ../container/Queue */ "./node_modules/tstl/container/Queue.js");
var Pair_1 = __webpack_require__(/*! ../utility/Pair */ "./node_modules/tstl/utility/Pair.js");
var RuntimeError_1 = __webpack_require__(/*! ../exception/RuntimeError */ "./node_modules/tstl/exception/RuntimeError.js");
/**
 * Shared mutex.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var SharedMutex = /** @class */ (function () {
    /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
    /**
     * Default Constructor.
     */
    function SharedMutex() {
        this.read_lock_count_ = 0;
        this.write_lock_count_ = 0;
        this.resolvers_ = new Queue_1.Queue();
    }
    /* =========================================================
        LOCK & UNLOCK
            - WRITE LOCK
            - READ LOCK
    ============================================================
        WRITE LOCK
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    SharedMutex.prototype.lock = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this.write_lock_count_++ === 0 && _this.read_lock_count_ === 0)
                resolve();
            else
                _this.resolvers_.push(new Pair_1.Pair(0 /* WRITE */, resolve));
        });
    };
    /**
     * @inheritDoc
     */
    SharedMutex.prototype.try_lock = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.write_lock_count_ !== 0 || this.read_lock_count_ !== 0)
                    return [2 /*return*/, false];
                this.write_lock_count_++;
                return [2 /*return*/, true];
            });
        });
    };
    /**
     * @inheritDoc
     */
    SharedMutex.prototype.unlock = function () {
        return __awaiter(this, void 0, void 0, function () {
            var access, fn;
            return __generator(this, function (_a) {
                if (this.write_lock_count_ === 0)
                    throw new RuntimeError_1.RangeError("This mutex is free on the unique lock.");
                while (this.resolvers_.empty() === false) {
                    access = this.resolvers_.front().first;
                    fn = this.resolvers_.front().second;
                    this.resolvers_.pop(); // POP FIRST
                    fn(); // AND CALL LATER
                    // UNTIL MEET THE WRITE LOCK
                    if (access === 0 /* WRITE */)
                        break;
                }
                --this.write_lock_count_;
                return [2 /*return*/];
            });
        });
    };
    /* ---------------------------------------------------------
        READ LOCK
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    SharedMutex.prototype.lock_shared = function () {
        var _this = this;
        return new Promise(function (resolve) {
            ++_this.read_lock_count_;
            if (_this.write_lock_count_ === 0)
                resolve();
            else
                _this.resolvers_.push(new Pair_1.Pair(1 /* READ */, resolve));
        });
    };
    /**
     * @inheritDoc
     */
    SharedMutex.prototype.try_lock_shared = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.write_lock_count_ !== 0)
                    return [2 /*return*/, false];
                ++this.read_lock_count_;
                return [2 /*return*/, true];
            });
        });
    };
    /**
     * @inheritDoc
     */
    SharedMutex.prototype.unlock_shared = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fn;
            return __generator(this, function (_a) {
                if (this.read_lock_count_ === 0)
                    throw new RuntimeError_1.RangeError("This mutex is free on the shared lock.");
                --this.read_lock_count_;
                if (this.resolvers_.empty() === false) {
                    fn = this.resolvers_.front().second;
                    this.resolvers_.pop(); // POP FIRST
                    fn(); // AND CALL LATER
                }
                return [2 /*return*/];
            });
        });
    };
    return SharedMutex;
}());
exports.SharedMutex = SharedMutex;
exports.shared_mutex = SharedMutex;
//# sourceMappingURL=SharedMutex.js.map

/***/ }),

/***/ "./node_modules/tstl/thread/SharedTimedMutex.js":
/*!******************************************************!*\
  !*** ./node_modules/tstl/thread/SharedTimedMutex.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var HashMap_1 = __webpack_require__(/*! ../container/HashMap */ "./node_modules/tstl/container/HashMap.js");
var RuntimeError_1 = __webpack_require__(/*! ../exception/RuntimeError */ "./node_modules/tstl/exception/RuntimeError.js");
var global_1 = __webpack_require__(/*! ./global */ "./node_modules/tstl/thread/global.js");
/**
 * Shared timed mutex.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var SharedTimedMutex = /** @class */ (function () {
    /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
    /**
     * Default Constructor.
     */
    function SharedTimedMutex() {
        this.read_lock_count_ = 0;
        this.write_lock_count_ = 0;
        this.resolvers_ = new HashMap_1.HashMap();
    }
    /* =========================================================
        LOCK & UNLOCK
            - WRITE LOCK
            - READ LOCK
    ============================================================
        WRITE LOCK
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    SharedTimedMutex.prototype.lock = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this.write_lock_count_++ === 0 && _this.read_lock_count_ === 0)
                resolve();
            else
                _this.resolvers_.emplace(resolve, {
                    access: 0 /* WRITE */,
                    lock: 0 /* HOLD */
                });
        });
    };
    /**
     * @inheritDoc
     */
    SharedTimedMutex.prototype.try_lock = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.write_lock_count_ !== 0 || this.read_lock_count_ !== 0)
                    return [2 /*return*/, false];
                ++this.write_lock_count_;
                return [2 /*return*/, true];
            });
        });
    };
    /**
     * @inheritDoc
     */
    SharedTimedMutex.prototype.try_lock_for = function (ms) {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this.write_lock_count_++ === 0 && _this.read_lock_count_ === 0)
                resolve(true);
            else {
                // DO LOCK
                _this.resolvers_.emplace(resolve, {
                    access: 0 /* WRITE */,
                    lock: 1 /* KNOCK */
                });
                // AUTOMATIC UNLOCK
                global_1.sleep_for(ms).then(function () {
                    if (_this.resolvers_.has(resolve) === false)
                        return;
                    // DO UNLOCK
                    _this.resolvers_.erase(resolve); // POP THE LISTENER
                    --_this.write_lock_count_; // DECREAE LOCEKD COUNT
                    resolve(false); // RETURN FAILURE
                });
            }
        });
    };
    /**
     * @inheritDoc
     */
    SharedTimedMutex.prototype.try_lock_until = function (at) {
        // COMPUTE MILLISECONDS TO WAIT
        var now = new Date();
        var ms = at.getTime() - now.getTime();
        return this.try_lock_for(ms);
    };
    /**
     * @inheritDoc
     */
    SharedTimedMutex.prototype.unlock = function () {
        return __awaiter(this, void 0, void 0, function () {
            var it, listener, type;
            return __generator(this, function (_a) {
                if (this.write_lock_count_ === 0)
                    throw new RuntimeError_1.RangeError("This mutex is free on the unique lock.");
                while (this.resolvers_.empty() === false) {
                    it = this.resolvers_.begin();
                    listener = it.first;
                    type = it.second;
                    this.resolvers_.erase(it); // POP FIRST
                    // AND CALL LATER
                    if (type.lock === 0 /* HOLD */)
                        listener();
                    else
                        listener(true);
                    // UNTIL MEET THE WRITE LOCK
                    if (type.access === 0 /* WRITE */)
                        break;
                }
                --this.write_lock_count_;
                return [2 /*return*/];
            });
        });
    };
    /* ---------------------------------------------------------
        READ LOCK
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    SharedTimedMutex.prototype.lock_shared = function () {
        var _this = this;
        return new Promise(function (resolve) {
            ++_this.read_lock_count_;
            if (_this.write_lock_count_ === 0)
                resolve();
            else
                _this.resolvers_.emplace(resolve, {
                    access: 1 /* READ */,
                    lock: 0 /* HOLD */
                });
        });
    };
    /**
     * @inheritDoc
     */
    SharedTimedMutex.prototype.try_lock_shared = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.write_lock_count_ !== 0)
                    return [2 /*return*/, false];
                ++this.read_lock_count_;
                return [2 /*return*/, true];
            });
        });
    };
    /**
     * @inheritDoc
     */
    SharedTimedMutex.prototype.try_lock_shared_for = function (ms) {
        var _this = this;
        return new Promise(function (resolve) {
            ++_this.read_lock_count_;
            if (_this.write_lock_count_ === 0)
                resolve(true);
            else {
                // DO LOCK
                _this.resolvers_.emplace(resolve, {
                    access: 1 /* READ */,
                    lock: 1 /* KNOCK */
                });
                // AUTOMATIC UNLOCK
                global_1.sleep_for(ms).then(function () {
                    var it = _this.resolvers_.find(resolve);
                    if (it.equals(_this.resolvers_.end()))
                        return;
                    // DO UNLOCK
                    _this.resolvers_.erase(it); // POP THE LISTENER
                    --_this.read_lock_count_; // DECREASE LOCKED COUNT
                    resolve(false); // RETURN FAILURE
                });
            }
        });
    };
    /**
     * @inheritDoc
     */
    SharedTimedMutex.prototype.try_lock_shared_until = function (at) {
        // COMPUTE MILLISECONDS TO WAIT
        var now = new Date();
        var ms = at.getTime() - now.getTime();
        return this.try_lock_shared_for(ms);
    };
    /**
     * @inheritDoc
     */
    SharedTimedMutex.prototype.unlock_shared = function () {
        return __awaiter(this, void 0, void 0, function () {
            var it, listener, type;
            return __generator(this, function (_a) {
                if (this.read_lock_count_ === 0)
                    throw new RuntimeError_1.RangeError("This mutex is free on the shared lock.");
                --this.read_lock_count_;
                if (this.resolvers_.empty() === false) {
                    it = this.resolvers_.begin();
                    listener = it.first;
                    type = it.second;
                    this.resolvers_.erase(it); // POP FIRST
                    // AND CALL LATER
                    if (type.lock === 0 /* HOLD */)
                        listener();
                    else
                        listener(true);
                }
                return [2 /*return*/];
            });
        });
    };
    return SharedTimedMutex;
}());
exports.SharedTimedMutex = SharedTimedMutex;
exports.shared_timed_mutex = SharedTimedMutex;
//# sourceMappingURL=SharedTimedMutex.js.map

/***/ }),

/***/ "./node_modules/tstl/thread/TimedMutex.js":
/*!************************************************!*\
  !*** ./node_modules/tstl/thread/TimedMutex.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var HashMap_1 = __webpack_require__(/*! ../container/HashMap */ "./node_modules/tstl/container/HashMap.js");
var RuntimeError_1 = __webpack_require__(/*! ../exception/RuntimeError */ "./node_modules/tstl/exception/RuntimeError.js");
var global_1 = __webpack_require__(/*! ./global */ "./node_modules/tstl/thread/global.js");
/**
 * Timed mutex.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var TimedMutex = /** @class */ (function () {
    /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
    /**
     * Default Constructor.
     */
    function TimedMutex() {
        this.lock_count_ = 0;
        this.resolvers_ = new HashMap_1.HashMap();
    }
    /* ---------------------------------------------------------
        LOCK & UNLOCK
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    TimedMutex.prototype.lock = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this.lock_count_++ === 0)
                resolve();
            else
                _this.resolvers_.emplace(resolve, 0 /* HOLD */);
        });
    };
    /**
     * @inheritDoc
     */
    TimedMutex.prototype.try_lock = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.lock_count_ !== 0)
                    return [2 /*return*/, false]; // HAVE LOCKED
                ++this.lock_count_;
                return [2 /*return*/, true];
            });
        });
    };
    /**
     * @inheritDoc
     */
    TimedMutex.prototype.unlock = function () {
        return __awaiter(this, void 0, void 0, function () {
            var it, listener;
            return __generator(this, function (_a) {
                if (this.lock_count_ === 0)
                    throw new RuntimeError_1.RangeError("This mutex is free.");
                --this.lock_count_; // DECREASE LOCKED COUNT
                if (this.resolvers_.empty() === false) {
                    it = this.resolvers_.begin();
                    listener = it.first;
                    this.resolvers_.erase(it); // POP FIRST
                    // AND CALL LATER
                    if (it.second === 0 /* HOLD */)
                        listener();
                    else
                        listener(true);
                }
                return [2 /*return*/];
            });
        });
    };
    /* ---------------------------------------------------------
        TIMED LOCK
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    TimedMutex.prototype.try_lock_for = function (ms) {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this.lock_count_++ === 0)
                resolve(true);
            else {
                // DO LOCK
                _this.resolvers_.emplace(resolve, 1 /* KNOCK */);
                // AUTOMATIC UNLOCK
                global_1.sleep_for(ms).then(function () {
                    var it = _this.resolvers_.find(resolve);
                    if (it.equals(_this.resolvers_.end()))
                        return;
                    // DO UNLOCK
                    _this.resolvers_.erase(it); // POP THE LISTENER
                    --_this.lock_count_; // DECREASE LOCKED COUNT
                    resolve(false); // RETURN FAILURE
                });
            }
        });
    };
    /**
     * @inheritDoc
     */
    TimedMutex.prototype.try_lock_until = function (at) {
        // COMPUTE MILLISECONDS TO WAIT
        var now = new Date();
        var ms = at.getTime() - now.getTime();
        return this.try_lock_for(ms);
    };
    return TimedMutex;
}());
exports.TimedMutex = TimedMutex;
exports.timed_mutex = TimedMutex;
//# sourceMappingURL=TimedMutex.js.map

/***/ }),

/***/ "./node_modules/tstl/thread/UniqueLock.js":
/*!************************************************!*\
  !*** ./node_modules/tstl/thread/UniqueLock.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _SafeLock_1 = __webpack_require__(/*! ../base/thread/_SafeLock */ "./node_modules/tstl/base/thread/_SafeLock.js");
var UniqueLock = /** @class */ (function () {
    /* ---------------------------------------------------------
        CONSTRUCTOR
    --------------------------------------------------------- */
    function UniqueLock(mutex) {
        this.mutex_ = mutex;
        this.try_lock_for = mutex.try_lock_for instanceof Function
            ? UniqueLock.try_lock_for.bind(undefined, this.mutex_)
            : undefined;
        this.try_lock_until = mutex.try_lock_until instanceof Function
            ? UniqueLock.try_lock_until.bind(undefined, this.mutex_)
            : undefined;
    }
    /* ---------------------------------------------------------
        COMMON METHODS
    --------------------------------------------------------- */
    UniqueLock.prototype.lock = function (closure) {
        return UniqueLock.lock(this.mutex_, closure);
    };
    UniqueLock.prototype.try_lock = function (closure) {
        return UniqueLock.try_lock(this.mutex_, closure);
    };
    return UniqueLock;
}());
exports.UniqueLock = UniqueLock;
(function (UniqueLock) {
    /* ---------------------------------------------------------
        STATIC FUNCTIONS
    --------------------------------------------------------- */
    function lock(mutex, closure) {
        return _SafeLock_1._SafeLock.lock(function () { return mutex.lock(); }, function () { return mutex.unlock(); }, closure);
    }
    UniqueLock.lock = lock;
    function try_lock(mutex, closure) {
        return _SafeLock_1._SafeLock.try_lock(function () { return mutex.try_lock(); }, function () { return mutex.unlock(); }, closure);
    }
    UniqueLock.try_lock = try_lock;
    function try_lock_for(mutex, ms, closure) {
        return _SafeLock_1._SafeLock.try_lock(function () { return mutex.try_lock_for(ms); }, function () { return mutex.unlock(); }, closure);
    }
    UniqueLock.try_lock_for = try_lock_for;
    function try_lock_until(mutex, at, closure) {
        return _SafeLock_1._SafeLock.try_lock(function () { return mutex.try_lock_until(at); }, function () { return mutex.unlock(); }, closure);
    }
    UniqueLock.try_lock_until = try_lock_until;
})(UniqueLock = exports.UniqueLock || (exports.UniqueLock = {}));
exports.UniqueLock = UniqueLock;
exports.unique_lock = UniqueLock;
//# sourceMappingURL=UniqueLock.js.map

/***/ }),

/***/ "./node_modules/tstl/thread/global.js":
/*!********************************************!*\
  !*** ./node_modules/tstl/thread/global.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sleep for time span.
 *
 * @param ms The milliseconds to sleep.
 */
function sleep_for(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}
exports.sleep_for = sleep_for;
/**
 * Sleep until time expiration.
 *
 * @param at The time point to wake up.
 */
function sleep_until(at) {
    var now = new Date();
    var ms = at.getTime() - now.getTime(); // MILLISECONDS TO WAIT
    return sleep_for(ms); // CONVERT TO THE SLEEP_FOR
}
exports.sleep_until = sleep_until;
/**
 * Lock multiple mutexes.
 *
 * @param items Items to lock.
 */
function lock() {
    var items = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        items[_i] = arguments[_i];
    }
    return new Promise(function (resolve) {
        var e_1, _a;
        var count = 0;
        try {
            for (var items_1 = __values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                var mtx = items_1_1.value;
                mtx.lock().then(function () {
                    if (++count === items.length)
                        resolve();
                });
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
}
exports.lock = lock;
/**
 * Try lock mutexes.
 *
 * @param items Items to try lock.
 * @return Index of mutex who failed to lock. None of them're failed, then returns `-1`.
 */
function try_lock() {
    var items = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        items[_i] = arguments[_i];
    }
    return __awaiter(this, void 0, void 0, function () {
        var i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < items.length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, items[i].try_lock()];
                case 2:
                    if ((_a.sent()) === false)
                        return [2 /*return*/, i];
                    _a.label = 3;
                case 3:
                    ++i;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, -1];
            }
        });
    });
}
exports.try_lock = try_lock;
//# sourceMappingURL=global.js.map

/***/ }),

/***/ "./node_modules/tstl/thread/index.js":
/*!*******************************************!*\
  !*** ./node_modules/tstl/thread/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std */
//================================================================
__export(__webpack_require__(/*! ./global */ "./node_modules/tstl/thread/global.js"));
__export(__webpack_require__(/*! ./Mutex */ "./node_modules/tstl/thread/Mutex.js"));
__export(__webpack_require__(/*! ./TimedMutex */ "./node_modules/tstl/thread/TimedMutex.js"));
__export(__webpack_require__(/*! ./SharedMutex */ "./node_modules/tstl/thread/SharedMutex.js"));
__export(__webpack_require__(/*! ./SharedTimedMutex */ "./node_modules/tstl/thread/SharedTimedMutex.js"));
__export(__webpack_require__(/*! ./ConditionVariable */ "./node_modules/tstl/thread/ConditionVariable.js"));
__export(__webpack_require__(/*! ./UniqueLock */ "./node_modules/tstl/thread/UniqueLock.js"));
__export(__webpack_require__(/*! ./SharedLock */ "./node_modules/tstl/thread/SharedLock.js"));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/tstl/utility/Entry.js":
/*!********************************************!*\
  !*** ./node_modules/tstl/utility/Entry.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var hash_1 = __webpack_require__(/*! ../functional/hash */ "./node_modules/tstl/functional/hash.js");
var comparators_1 = __webpack_require__(/*! ../functional/comparators */ "./node_modules/tstl/functional/comparators.js");
/**
 * Entry for mapping.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var Entry = /** @class */ (function () {
    /**
     * Intializer Constructor.
     *
     * @param first The first, key element.
     * @param second The second, mapped element.
     */
    function Entry(first, second) {
        this.first = first;
        this.second = second;
    }
    /**
     * @inheritDoc
     */
    Entry.prototype.equals = function (obj) {
        return comparators_1.equal_to(this.first, obj.first);
    };
    /**
     * @inheritDoc
     */
    Entry.prototype.less = function (obj) {
        return comparators_1.less(this.first, obj.first);
    };
    /**
     * @inheritDoc
     */
    Entry.prototype.hashCode = function () {
        return hash_1.hash(this.first);
    };
    return Entry;
}());
exports.Entry = Entry;
//# sourceMappingURL=Entry.js.map

/***/ }),

/***/ "./node_modules/tstl/utility/Pair.js":
/*!*******************************************!*\
  !*** ./node_modules/tstl/utility/Pair.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var hash_1 = __webpack_require__(/*! ../functional/hash */ "./node_modules/tstl/functional/hash.js");
var comparators_1 = __webpack_require__(/*! ../functional/comparators */ "./node_modules/tstl/functional/comparators.js");
/**
 * Pair of two elements.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var Pair = /** @class */ (function () {
    /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
    /**
     * Initializer Constructor.
     *
     * @param first The first element.
     * @param second The second element.
     */
    function Pair(first, second) {
        this.first = first;
        this.second = second;
    }
    /* ---------------------------------------------------------
        COMPARISON
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    Pair.prototype.equals = function (pair) {
        return comparators_1.equal_to(this.first, pair.first) && comparators_1.equal_to(this.second, pair.second);
    };
    /**
     * @inheritDoc
     */
    Pair.prototype.less = function (pair) {
        if (comparators_1.equal_to(this.first, pair.first) === false)
            return comparators_1.less(this.first, pair.first);
        else
            return comparators_1.less(this.second, pair.second);
    };
    /**
     * @inheritDoc
     */
    Pair.prototype.hashCode = function () {
        return hash_1.hash(this.first, this.second);
    };
    return Pair;
}());
exports.Pair = Pair;
exports.pair = Pair;
/**
 * Create a {@link Pair}.
 *
 * @param first The 1st element.
 * @param second The 2nd element.
 *
 * @return A {@link Pair} object.
 */
function make_pair(first, second) {
    return new Pair(first, second);
}
exports.make_pair = make_pair;
//# sourceMappingURL=Pair.js.map

/***/ }),

/***/ "./node_modules/tstl/utility/index.js":
/*!********************************************!*\
  !*** ./node_modules/tstl/utility/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

//================================================================ 
/** @module std */
//================================================================
// <utility>
//
// @reference http://www.cplusplus.com/reference/utility/
// @author Jeongho Nam <http://samchon.org>
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./Pair */ "./node_modules/tstl/utility/Pair.js"));
__export(__webpack_require__(/*! ./Entry */ "./node_modules/tstl/utility/Entry.js"));
__export(__webpack_require__(/*! ./node */ "./node_modules/tstl/utility/node.js"));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/tstl/utility/node.js":
/*!*******************************************!*\
  !*** ./node_modules/tstl/utility/node.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
//================================================================ 
/** @module std */
//================================================================
/**
 * @hidden
 */
var is_node_ = null;
/**
 * Test whether the code is running on NodeJS.
 *
 * @return Whether NodeJS or not.
 */
function is_node() {
    if (is_node_ === null)
        is_node_ = typeof global === "object"
            && typeof global.process === "object"
            && typeof global.process.versions === "object"
            && typeof global.process.versions.node !== "undefined";
    return is_node_;
}
exports.is_node = is_node;
//# sourceMappingURL=node.js.map

/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./node_modules/worker-postable/dist/index.js":
/*!****************************************************!*\
  !*** ./node_modules/worker-postable/dist/index.js ***!
  \****************************************************/
/*! exports provided: context, PostableEvent, Postable, postable, ref, unref, getPostableID, ObjectStore, ConstructorStore, PostedEvent, Posted, posted, postableMessageHandler, listenable, listen */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_server_postable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/server/postable */ "./node_modules/worker-postable/dist/src/server/postable.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "context", function() { return _src_server_postable__WEBPACK_IMPORTED_MODULE_0__["context"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PostableEvent", function() { return _src_server_postable__WEBPACK_IMPORTED_MODULE_0__["PostableEvent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Postable", function() { return _src_server_postable__WEBPACK_IMPORTED_MODULE_0__["Postable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "postable", function() { return _src_server_postable__WEBPACK_IMPORTED_MODULE_0__["postable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ref", function() { return _src_server_postable__WEBPACK_IMPORTED_MODULE_0__["ref"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "unref", function() { return _src_server_postable__WEBPACK_IMPORTED_MODULE_0__["unref"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getPostableID", function() { return _src_server_postable__WEBPACK_IMPORTED_MODULE_0__["getPostableID"]; });

/* harmony import */ var _src_client_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/client/client */ "./node_modules/worker-postable/dist/src/client/client.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ObjectStore", function() { return _src_client_client__WEBPACK_IMPORTED_MODULE_1__["ObjectStore"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ConstructorStore", function() { return _src_client_client__WEBPACK_IMPORTED_MODULE_1__["ConstructorStore"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PostedEvent", function() { return _src_client_client__WEBPACK_IMPORTED_MODULE_1__["PostedEvent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Posted", function() { return _src_client_client__WEBPACK_IMPORTED_MODULE_1__["Posted"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "posted", function() { return _src_client_client__WEBPACK_IMPORTED_MODULE_1__["posted"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "postableMessageHandler", function() { return _src_client_client__WEBPACK_IMPORTED_MODULE_1__["postableMessageHandler"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "listenable", function() { return _src_client_client__WEBPACK_IMPORTED_MODULE_1__["listenable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "listen", function() { return _src_client_client__WEBPACK_IMPORTED_MODULE_1__["listen"]; });



//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/worker-postable/dist/src/base/message-type.js":
/*!********************************************************************!*\
  !*** ./node_modules/worker-postable/dist/src/base/message-type.js ***!
  \********************************************************************/
/*! exports provided: MessageType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageType", function() { return MessageType; });
var MessageType;
(function (MessageType) {
    MessageType[MessageType["OBJECT_CREATED"] = 1] = "OBJECT_CREATED";
    MessageType[MessageType["ARRAY_CREATED"] = 2] = "ARRAY_CREATED";
    MessageType[MessageType["SET_CREATED"] = 3] = "SET_CREATED";
    MessageType[MessageType["MAP_CREATED"] = 4] = "MAP_CREATED";
    MessageType[MessageType["OBJECT_DESTROIED"] = 5] = "OBJECT_DESTROIED";
    MessageType[MessageType["ARRAY_DESTROIED"] = 6] = "ARRAY_DESTROIED";
    MessageType[MessageType["SET_DESTROIED"] = 7] = "SET_DESTROIED";
    MessageType[MessageType["MAP_DESTROIED"] = 8] = "MAP_DESTROIED";
    MessageType[MessageType["OBJECT_UPDTAED"] = 9] = "OBJECT_UPDTAED";
    MessageType[MessageType["MAP_UPDATED"] = 10] = "MAP_UPDATED";
    MessageType[MessageType["MAP_ADDED"] = 11] = "MAP_ADDED";
    MessageType[MessageType["MAP_DELETED"] = 12] = "MAP_DELETED";
    MessageType[MessageType["SET_ADDED"] = 13] = "SET_ADDED";
    MessageType[MessageType["SET_DELETED"] = 14] = "SET_DELETED";
    MessageType[MessageType["ARRAY_UPDATED"] = 15] = "ARRAY_UPDATED";
    MessageType[MessageType["ARRAY_SPLICED"] = 16] = "ARRAY_SPLICED";
    MessageType[MessageType["SERVER_EVENT"] = 17] = "SERVER_EVENT";
})(MessageType || (MessageType = {}));

//# sourceMappingURL=message-type.js.map

/***/ }),

/***/ "./node_modules/worker-postable/dist/src/client/client.js":
/*!****************************************************************!*\
  !*** ./node_modules/worker-postable/dist/src/client/client.js ***!
  \****************************************************************/
/*! exports provided: ObjectStore, ConstructorStore, PostedEvent, Posted, posted, postableMessageHandler, listenable, listen */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObjectStore", function() { return ObjectStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConstructorStore", function() { return ConstructorStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostedEvent", function() { return PostedEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Posted", function() { return Posted; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "posted", function() { return posted; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postableMessageHandler", function() { return postableMessageHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "listenable", function() { return listenable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "listen", function() { return listen; });
/* harmony import */ var _base_message_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base/message-type */ "./node_modules/worker-postable/dist/src/base/message-type.js");
/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mobx */ "./node_modules/mobx/lib/mobx.module.js");
/* harmony import */ var base_common_assert__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! base/common/assert */ "./app/base/common/assert.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var POSTABLE_PROPS = Symbol('postable_props');
var POSTABLE_ID = Symbol('postable_id');
var POSTABLE_ADMINISTRATOR = Symbol('postable_administrator');
var ObjectStore = new Map();
var ConstructorStore = new Map();
function getObject(id) {
    var obj = ObjectStore.get(id);
    Object(base_common_assert__WEBPACK_IMPORTED_MODULE_2__["assert"])(obj, 'Object not exists. ' + id);
    return obj;
}
function onServerEvent(data) {
    var event = getObject(data.object);
    event.fire(data.event);
}
var PostedEvent = /** @class */ (function () {
    function PostedEvent() {
    }
    PostedEvent.prototype.fire = function (event) {
        if (this.on)
            this.on(event);
    };
    PostedEvent = __decorate([
        Posted('PostableEvent')
    ], PostedEvent);
    return PostedEvent;
}());

function Posted(name) {
    return function (constructor) {
        ConstructorStore.set(name, constructor);
    };
}
function posted(self, prop) {
}
var postableMessageHandler = function (data) {
    switch (data.type) {
        case _base_message_type__WEBPACK_IMPORTED_MODULE_0__["MessageType"].OBJECT_CREATED:
            createObject(data);
            break;
        case _base_message_type__WEBPACK_IMPORTED_MODULE_0__["MessageType"].MAP_CREATED:
            createMap(data);
            break;
        case _base_message_type__WEBPACK_IMPORTED_MODULE_0__["MessageType"].SET_CREATED:
            createSet(data);
            break;
        case _base_message_type__WEBPACK_IMPORTED_MODULE_0__["MessageType"].ARRAY_CREATED:
            createArray(data);
            break;
        case _base_message_type__WEBPACK_IMPORTED_MODULE_0__["MessageType"].OBJECT_DESTROIED:
        case _base_message_type__WEBPACK_IMPORTED_MODULE_0__["MessageType"].MAP_DESTROIED:
        case _base_message_type__WEBPACK_IMPORTED_MODULE_0__["MessageType"].SET_DESTROIED:
        case _base_message_type__WEBPACK_IMPORTED_MODULE_0__["MessageType"].ARRAY_DESTROIED:
            destroyObject(data);
            break;
        case _base_message_type__WEBPACK_IMPORTED_MODULE_0__["MessageType"].OBJECT_UPDTAED:
            updateObject(data);
            break;
        case _base_message_type__WEBPACK_IMPORTED_MODULE_0__["MessageType"].MAP_UPDATED:
            updateMap(data);
            break;
        case _base_message_type__WEBPACK_IMPORTED_MODULE_0__["MessageType"].MAP_ADDED:
            addMap(data);
            break;
        case _base_message_type__WEBPACK_IMPORTED_MODULE_0__["MessageType"].MAP_DELETED:
            deleteMap(data);
            break;
        case _base_message_type__WEBPACK_IMPORTED_MODULE_0__["MessageType"].SET_ADDED:
            addSet(data);
            break;
        case _base_message_type__WEBPACK_IMPORTED_MODULE_0__["MessageType"].SET_DELETED:
            deleteSet(data);
            break;
        case _base_message_type__WEBPACK_IMPORTED_MODULE_0__["MessageType"].ARRAY_UPDATED:
            updateArray(data);
            break;
        case _base_message_type__WEBPACK_IMPORTED_MODULE_0__["MessageType"].ARRAY_SPLICED:
            spliceArray(data);
            break;
        case _base_message_type__WEBPACK_IMPORTED_MODULE_0__["MessageType"].SERVER_EVENT:
            onServerEvent(data);
            break;
    }
};
function deserialize(d) {
    if (d.valueType == 'primitive')
        return d.value;
    return ObjectStore.get(d.value);
}
var PostableAdministrator = /** @class */ (function () {
    function PostableAdministrator(instance) {
        this.reactions = new Set();
    }
    PostableAdministrator.prototype.addReaction = function (reaction) {
        this.reactions.add(reaction);
    };
    PostableAdministrator.prototype.removeReaction = function (reaction) {
        Object(base_common_assert__WEBPACK_IMPORTED_MODULE_2__["assert"])(this.reactions.has(reaction), '[postable] no reaction exists');
        reaction();
        this.reactions.delete(reaction);
    };
    PostableAdministrator.prototype.destroy = function () {
        this.reactions.forEach(function (reaction) { return reaction(); });
    };
    return PostableAdministrator;
}());
var ObjectPostableAdministrator = /** @class */ (function (_super) {
    __extends(ObjectPostableAdministrator, _super);
    function ObjectPostableAdministrator(instance, props) {
        var _this = _super.call(this, instance) || this;
        var values = {};
        props.forEach(function (prop) {
            values[prop] = instance[prop];
        });
        _this.values = Object(mobx__WEBPACK_IMPORTED_MODULE_1__["observable"])(values);
        return _this;
    }
    return ObjectPostableAdministrator;
}(PostableAdministrator));
var ContainerPostableAdministrator = /** @class */ (function (_super) {
    __extends(ContainerPostableAdministrator, _super);
    function ContainerPostableAdministrator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ContainerPostableAdministrator;
}(PostableAdministrator));
function listenable(target, prop) {
    asListenableProptotype(target);
    return addPostableProp(target, prop);
}
function listen(instance, callback) {
    asListenableObject(instance);
    var disposer;
    var admin = instance[POSTABLE_ADMINISTRATOR];
    if (admin.hasOwnProperty('values'))
        disposer = Object(mobx__WEBPACK_IMPORTED_MODULE_1__["observe"])(admin.values, callback);
    else
        disposer = Object(mobx__WEBPACK_IMPORTED_MODULE_1__["observe"])(instance, callback);
    admin.addReaction(disposer);
}
function asListenableProptotype(target) {
    if (target.hasOwnProperty(POSTABLE_PROPS))
        return;
    var set;
    if (target.__proto__.hasOwnProperty(POSTABLE_PROPS))
        set = new Set(target.__proto__[POSTABLE_PROPS]);
    else
        set = new Set();
    Object.defineProperty(target, POSTABLE_PROPS, {
        enumerable: false,
        writable: true,
        configurable: true,
        value: set
    });
}
function addPostableProp(target, prop) {
    return {
        enumerable: true,
        configurable: true,
        get: function () {
            asListenableObject(this);
            redefineProperty(this, prop);
            return this[prop];
        },
        set: function (value) {
            asListenableObject(this);
            redefineProperty(this, prop);
            this[prop] = value;
        }
    };
}
function redefineProperty(instance, prop) {
    delete instance[prop];
    Object.defineProperty(instance, prop, {
        get: function () {
            return instance[POSTABLE_ADMINISTRATOR].values[prop];
        },
        set: function (value) {
            if (typeof value != 'object') {
                instance[POSTABLE_ADMINISTRATOR].values[prop] = value;
                return;
            }
            instance[POSTABLE_ADMINISTRATOR].values[prop] = value;
            var postableID = value[POSTABLE_ID];
            var v = instance[POSTABLE_ADMINISTRATOR].values[prop];
            ObjectStore.set(postableID, v);
        }
    });
}
function asListenableObject(instance) {
    if (instance.hasOwnProperty(POSTABLE_ADMINISTRATOR))
        return;
    if (instance instanceof mobx__WEBPACK_IMPORTED_MODULE_1__["ObservableSet"] ||
        instance instanceof mobx__WEBPACK_IMPORTED_MODULE_1__["ObservableMap"] ||
        Array.isArray(instance)) {
        Object.defineProperty(instance, POSTABLE_ADMINISTRATOR, {
            configurable: false,
            enumerable: false,
            value: new ContainerPostableAdministrator(instance)
        });
        return;
    }
    var props = instance[POSTABLE_PROPS];
    Object.defineProperty(instance, POSTABLE_ADMINISTRATOR, {
        configurable: false,
        enumerable: false,
        value: new ObjectPostableAdministrator(instance, props)
    });
}
function createObject(data) {
    var constructor = ConstructorStore.get(data.constructor);
    Object(base_common_assert__WEBPACK_IMPORTED_MODULE_2__["assert"])(constructor, "[postable] " + data.constructor + " not exist");
    var object = new constructor();
    for (var i = 0; i < data.props.length; i++) {
        var prop = data.props[i][0];
        var value = deserialize(data.props[i][1]);
        object[prop] = value;
    }
    if (typeof object.onPostableInstanceCreated == 'function')
        object.onPostableInstanceCreated();
    Object.defineProperty(object, POSTABLE_ID, { value: data.id });
    ObjectStore.set(data.id, object);
}
function destroyObject(data) {
    Object(base_common_assert__WEBPACK_IMPORTED_MODULE_2__["assert"])(ObjectStore.has(data.id), "[postable] Destroy failed. No such object " + data.id);
    ObjectStore.delete(data.id);
}
function updateObject(data) {
    var object = ObjectStore.get(data.object);
    object[data.property] = deserialize(data.value);
}
function createMap(data) {
    var map = new Map();
    for (var i = 0; i < data.values.length; i++) {
        var key = deserialize(data.values[i][1]);
        var value = deserialize(data.values[i][0]);
        map.set(key, value);
    }
    Object.defineProperty(map, POSTABLE_ID, { value: data.id });
    ObjectStore.set(data.id, map);
}
function updateMap(data) {
    var object = ObjectStore.get(data.object);
    object.set(deserialize(data.name), deserialize(data.newValue));
}
function addMap(data) {
    var object = ObjectStore.get(data.object);
    object.set(deserialize(data.name), deserialize(data.newValue));
}
function deleteMap(data) {
    var object = ObjectStore.get(data.object);
    object.delete(deserialize(data.name));
}
function createSet(data) {
    var set = new Set();
    data.values.forEach(function (v) {
        var value = deserialize(v);
        set.add(value);
    });
    Object.defineProperty(set, POSTABLE_ID, { value: data.id });
    ObjectStore.set(data.id, set);
}
function addSet(data) {
    var object = ObjectStore.get(data.object);
    object.add(deserialize(data.newValue));
}
function deleteSet(data) {
    var object = ObjectStore.get(data.object);
    object.delete(deserialize(data.oldValue));
}
function createArray(data) {
    var array = new Array();
    data.values.forEach(function (v) {
        var value = deserialize(v);
        array.push(value);
    });
    Object.defineProperty(array, POSTABLE_ID, { value: data.id });
    ObjectStore.set(data.id, array);
}
function updateArray(data) {
    var object = ObjectStore.get(data.object);
    object[data.index] = deserialize(data.newValue);
}
function spliceArray(data) {
    var object = ObjectStore.get(data.object);
    data.added = data.added.map(function (d) { return deserialize(d); });
    object.splice(data.index, data.removedCount, data.added);
}
//# sourceMappingURL=client.js.map

/***/ }),

/***/ "./node_modules/worker-postable/dist/src/server/postable.js":
/*!******************************************************************!*\
  !*** ./node_modules/worker-postable/dist/src/server/postable.js ***!
  \******************************************************************/
/*! exports provided: context, PostableEvent, Postable, postable, ref, unref, getPostableID */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "context", function() { return context; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostableEvent", function() { return PostableEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Postable", function() { return Postable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postable", function() { return postable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ref", function() { return ref; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unref", function() { return unref; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPostableID", function() { return getPostableID; });
/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mobx */ "./node_modules/mobx/lib/mobx.module.js");
/* harmony import */ var _base_message_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../base/message-type */ "./node_modules/worker-postable/dist/src/base/message-type.js");
/* harmony import */ var base_common_assert__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! base/common/assert */ "./app/base/common/assert.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var DEBUG = "development" !== "production";
var POSTABLE_PROPS = Symbol('postable_props');
var POSTABLE_FUNC_POST_CREATED = Symbol('postable_func_post_created');
var POSTABLE_FUNC_POST_DESTROIED = Symbol('postable_func_post_destroied');
var POSTABLE_ADMINISTRATOR = Symbol('postable_administrator');
var context = {
    onMessage: function () { }
};
function isObject(value) {
    return (typeof value === 'object' && value != null);
}
var __next_postable_object_id = 0;
function getNextPostableObjectID() {
    return __next_postable_object_id++;
}
var PostableEvent = /** @class */ (function () {
    function PostableEvent() {
    }
    PostableEvent.prototype.emit = function (event) {
        postMessage({
            type: _base_message_type__WEBPACK_IMPORTED_MODULE_1__["MessageType"].SERVER_EVENT,
            object: getPostableID(this),
            event: event
        });
    };
    PostableEvent = __decorate([
        Postable
    ], PostableEvent);
    return PostableEvent;
}());

function Postable /*<T extends {new(...args:any[]):{}}>*/(constructor /*:T*/) {
    asPostablePrototype(constructor.prototype);
}
/*
function Postable<T extends {new(...args:any[]):{}}>(constructor:T) {
  const handler:ProxyHandler<T> = {
    construct: function(target, args) {
      let instance = Object.create(constructor.prototype);
      target.apply(instance, args);
      asPostableObject(instance);
      return instance;
    }
  }
  return new Proxy(constructor, handler)
}
*/
function postable(target, prop) {
    if (typeof target[prop] == 'function')
        return;
    asPostablePrototype(target);
    // Define property to __proto__
    target[POSTABLE_PROPS].add(prop);
    return Object(mobx__WEBPACK_IMPORTED_MODULE_0__["observable"])(target, prop);
}
function asPostablePrototype(target) {
    if (!target.hasOwnProperty(POSTABLE_PROPS)) {
        var set = void 0;
        if (target.__proto__.hasOwnProperty(POSTABLE_PROPS))
            set = new Set(target.__proto__[POSTABLE_PROPS]);
        else
            set = new Set();
        Object.defineProperty(target, POSTABLE_PROPS, {
            enumerable: false,
            writable: true,
            configurable: true,
            value: set
        });
        Object.defineProperty(target, POSTABLE_FUNC_POST_CREATED, {
            enumerable: false,
            writable: false,
            configurable: false,
            value: function () {
                var _this = this;
                var props = [];
                this[POSTABLE_PROPS].forEach(function (prop) {
                    var value = _this[prop];
                    if (isObject(value)) {
                        asPostableObject(value);
                        ref(value);
                    }
                    props.push([prop, serialize(value)]);
                });
                postMessage({
                    type: _base_message_type__WEBPACK_IMPORTED_MODULE_1__["MessageType"].OBJECT_CREATED,
                    constructor: this.constructor.name,
                    id: this[POSTABLE_ADMINISTRATOR].id,
                    props: props
                });
                this[POSTABLE_PROPS].forEach(function (prop) {
                    _this[POSTABLE_ADMINISTRATOR].observeDisposers.add(Object(mobx__WEBPACK_IMPORTED_MODULE_0__["observe"])(_this, prop, function (change) {
                        if (change.type == 'update') {
                            var oldValue = change.oldValue;
                            if (isObject(oldValue))
                                unref(oldValue);
                            var value = change.newValue;
                            if (isObject(value)) {
                                var postable_1 = asPostableObject(value);
                                ref(postable_1);
                            }
                            postMessage({
                                type: _base_message_type__WEBPACK_IMPORTED_MODULE_1__["MessageType"].OBJECT_UPDTAED,
                                object: _this[POSTABLE_ADMINISTRATOR].id,
                                property: prop,
                                value: serialize(value)
                            });
                        }
                    }));
                });
            }
        });
        Object.defineProperty(target, POSTABLE_FUNC_POST_DESTROIED, {
            enumerable: false,
            writable: false,
            configurable: false,
            value: function () {
                var _this = this;
                this[POSTABLE_PROPS].forEach(function (prop) {
                    var value = _this[prop];
                    if (typeof value == 'object' && value != null)
                        unref(value);
                });
                this[POSTABLE_ADMINISTRATOR].observeDisposers.forEach(function (disposer) {
                    disposer();
                });
                postMessage({
                    type: _base_message_type__WEBPACK_IMPORTED_MODULE_1__["MessageType"].OBJECT_DESTROIED,
                    id: this[POSTABLE_ADMINISTRATOR].id
                });
                this[POSTABLE_ADMINISTRATOR].observeDisposers.forEach(function (disposer) { return disposer(); });
                this[POSTABLE_ADMINISTRATOR].observeDisposers.clear();
            }
        });
    }
}
function asPostableObject(target) {
    if (!target.__proto__.hasOwnProperty(POSTABLE_FUNC_POST_CREATED)) {
        Object(base_common_assert__WEBPACK_IMPORTED_MODULE_2__["assert"])(null, "[postable] " + target + " is not a Postable object.");
        return null;
    }
    if (target.hasOwnProperty(POSTABLE_ADMINISTRATOR))
        return target;
    Object.defineProperty(target, POSTABLE_ADMINISTRATOR, {
        enumerable: false,
        writable: false,
        configurable: false,
        value: {
            id: getNextPostableObjectID(),
            refCount: 0,
            observeDisposers: new Set()
        }
    });
    return target;
}
Object.defineProperty(Array.prototype, POSTABLE_FUNC_POST_CREATED, {
    enumerable: false,
    writable: false,
    configurable: false,
    value: function () {
        var values = [];
        this.forEach(function (el) {
            if (isObject(el)) {
                asPostableObject(el);
                ref(el);
            }
            values.push(serialize(el));
        });
        postMessage({
            type: _base_message_type__WEBPACK_IMPORTED_MODULE_1__["MessageType"].ARRAY_CREATED,
            id: this[POSTABLE_ADMINISTRATOR].id,
            values: values
        });
        this[POSTABLE_ADMINISTRATOR].observeDisposers.add(observeArray(this));
    }
});
Object.defineProperty(Array.prototype, POSTABLE_FUNC_POST_DESTROIED, {
    enumerable: false,
    writable: false,
    configurable: false,
    value: function () {
        this.forEach(function (el) {
            if (isObject(el))
                unref(el);
        });
        this[POSTABLE_ADMINISTRATOR].observeDisposers.forEach(function (disposer) {
            disposer();
        });
        postMessage({
            type: _base_message_type__WEBPACK_IMPORTED_MODULE_1__["MessageType"].ARRAY_DESTROIED,
            id: this[POSTABLE_ADMINISTRATOR].id
        });
        this[POSTABLE_ADMINISTRATOR].observeDisposers.forEach(function (disposer) { return disposer(); });
        this[POSTABLE_ADMINISTRATOR].observeDisposers.clear();
    }
});
Object.defineProperty(mobx__WEBPACK_IMPORTED_MODULE_0__["ObservableSet"].prototype, POSTABLE_FUNC_POST_CREATED, {
    enumerable: false,
    writable: false,
    configurable: false,
    value: function () {
        var values = [];
        this.forEach(function (el) {
            if (isObject(el)) {
                asPostableObject(el);
                ref(el);
            }
            values.push(serialize(el));
        });
        postMessage({
            type: _base_message_type__WEBPACK_IMPORTED_MODULE_1__["MessageType"].SET_CREATED,
            id: this[POSTABLE_ADMINISTRATOR].id,
            values: values
        });
        this[POSTABLE_ADMINISTRATOR].observeDisposers.add(observeSet(this));
    }
});
Object.defineProperty(mobx__WEBPACK_IMPORTED_MODULE_0__["ObservableSet"].prototype, POSTABLE_FUNC_POST_DESTROIED, {
    enumerable: false,
    writable: false,
    configurable: false,
    value: function () {
        this.forEach(function (el) {
            if (isObject(el))
                unref(el);
        });
        this[POSTABLE_ADMINISTRATOR].observeDisposers.forEach(function (disposer) {
            disposer();
        });
        postMessage({
            type: _base_message_type__WEBPACK_IMPORTED_MODULE_1__["MessageType"].SET_DESTROIED,
            id: this[POSTABLE_ADMINISTRATOR].id
        });
        this[POSTABLE_ADMINISTRATOR].observeDisposers.forEach(function (disposer) { return disposer(); });
        this[POSTABLE_ADMINISTRATOR].observeDisposers.clear();
    }
});
Object.defineProperty(mobx__WEBPACK_IMPORTED_MODULE_0__["ObservableMap"].prototype, POSTABLE_FUNC_POST_CREATED, {
    enumerable: false,
    writable: false,
    configurable: false,
    value: function () {
        var values = [];
        this.forEach(function (k, v) {
            if (isObject(k)) {
                asPostableObject(k);
                ref(k);
            }
            if (isObject(v)) {
                asPostableObject(v);
                ref(v);
            }
            values.push([serialize(k), serialize(v)]);
        });
        postMessage({
            type: _base_message_type__WEBPACK_IMPORTED_MODULE_1__["MessageType"].MAP_CREATED,
            id: this[POSTABLE_ADMINISTRATOR].id,
            values: values
        });
        this[POSTABLE_ADMINISTRATOR].observeDisposers.add(observeMap(this));
    }
});
Object.defineProperty(mobx__WEBPACK_IMPORTED_MODULE_0__["ObservableMap"].prototype, POSTABLE_FUNC_POST_DESTROIED, {
    enumerable: false,
    writable: false,
    configurable: false,
    value: function () {
        this.forEach(function (k, v) {
            if (isObject(k))
                unref(k);
            if (isObject(v))
                unref(v);
        });
        this[POSTABLE_ADMINISTRATOR].observeDisposers.forEach(function (disposer) {
            disposer();
        });
        postMessage({
            type: _base_message_type__WEBPACK_IMPORTED_MODULE_1__["MessageType"].MAP_DESTROIED,
            id: this[POSTABLE_ADMINISTRATOR].id
        });
        this[POSTABLE_ADMINISTRATOR].observeDisposers.forEach(function (disposer) { return disposer(); });
        this[POSTABLE_ADMINISTRATOR].observeDisposers.clear();
    }
});
function ref(object) {
    asPostableObject(object);
    if (object[POSTABLE_ADMINISTRATOR].refCount == 0)
        object[POSTABLE_FUNC_POST_CREATED].call(object);
    object[POSTABLE_ADMINISTRATOR].refCount++;
}
function unref(object) {
    asPostableObject(object);
    object[POSTABLE_ADMINISTRATOR].refCount--;
    if (object[POSTABLE_ADMINISTRATOR].refCount == 0)
        object[POSTABLE_FUNC_POST_DESTROIED].call(object);
}
function serialize(d) {
    return (isObject(d) ?
        {
            valueType: 'object',
            value: d[POSTABLE_ADMINISTRATOR].id
        } : {
        valueType: 'primitive',
        value: d
    });
}
function observeMap(data) {
    return Object(mobx__WEBPACK_IMPORTED_MODULE_0__["observe"])(data, function (change) {
        if (change.type == 'update')
            postMapUpdate(change);
        else if (change.type == 'add')
            postMapAdd(change);
        else if (change.type == 'delete')
            postMapDelete(change);
    });
}
function postMapUpdate(c) {
    if (isObject(c.newValue)) {
        asPostableObject(c.newValue);
        ref(c.newValue);
    }
    var message = {
        type: _base_message_type__WEBPACK_IMPORTED_MODULE_1__["MessageType"].MAP_UPDATED,
        object: c.object[POSTABLE_ADMINISTRATOR].id,
        name: serialize(c.name),
        newValue: serialize(c.newValue),
        oldValue: serialize(c.oldValue)
    };
    postMessage(message);
    if (isObject(c.oldValue))
        unref(c.oldValue);
}
function postMapAdd(c) {
    if (isObject(c.name)) {
        asPostableObject(c.name);
        ref(c.name);
    }
    if (isObject(c.newValue)) {
        asPostableObject(c.newValue);
        ref(c.newValue);
    }
    var message = {
        type: _base_message_type__WEBPACK_IMPORTED_MODULE_1__["MessageType"].MAP_ADDED,
        object: c.object[POSTABLE_ADMINISTRATOR].id,
        name: serialize(c.name),
        newValue: serialize(c.newValue)
    };
    postMessage(message);
}
function postMapDelete(c) {
    var message = {
        type: _base_message_type__WEBPACK_IMPORTED_MODULE_1__["MessageType"].MAP_DELETED,
        object: c.object[POSTABLE_ADMINISTRATOR].id,
        name: serialize(c.name),
        oldValue: serialize(c.oldValue)
    };
    postMessage(message);
    if (isObject(c.oldValue))
        unref(c.oldValue);
    if (isObject(c.name))
        unref(c.name);
}
function observeSet(data) {
    return Object(mobx__WEBPACK_IMPORTED_MODULE_0__["observe"])(data, function (change) {
        if (change.type == 'add')
            postSetAdd(change);
        if (change.type == 'delete')
            postSetDelete(change);
    });
}
function postSetAdd(c) {
    if (isObject(c.newValue)) {
        asPostableObject(c.newValue);
        ref(c.newValue);
    }
    var message = {
        type: _base_message_type__WEBPACK_IMPORTED_MODULE_1__["MessageType"].SET_ADDED,
        object: c.object[POSTABLE_ADMINISTRATOR].id,
        newValue: serialize(c.newValue)
    };
    postMessage(message);
}
function postSetDelete(c) {
    var message = {
        type: _base_message_type__WEBPACK_IMPORTED_MODULE_1__["MessageType"].SET_DELETED,
        object: c.object[POSTABLE_ADMINISTRATOR].id,
        oldValue: serialize(c.oldvalue)
    };
    postMessage(message);
    if (isObject(c.oldValue))
        unref(c.oldValue);
}
function observeArray(data) {
    return Object(mobx__WEBPACK_IMPORTED_MODULE_0__["observe"])(data, function (change) {
        if (change.type == 'update')
            postArrayUpdate(change);
        else if (change.type == 'splice')
            postArraySplice(change);
    });
}
function postArrayUpdate(c) {
    if (isObject(c.newValue)) {
        asPostableObject(c.newValue);
        ref(c.newValue);
    }
    var message = {
        type: _base_message_type__WEBPACK_IMPORTED_MODULE_1__["MessageType"].ARRAY_UPDATED,
        object: c.object[POSTABLE_ADMINISTRATOR].id,
        newValue: serialize(c.newValue),
        oldValue: serialize(c.oldValue)
    };
    postMessage(message);
    if (isObject(c.oldValue))
        unref(c.oldValue);
}
function postArraySplice(c) {
    var message = {
        type: _base_message_type__WEBPACK_IMPORTED_MODULE_1__["MessageType"].ARRAY_SPLICED,
        object: c.object[POSTABLE_ADMINISTRATOR].id,
        added: [],
        removed: []
    };
    c.added.forEach(function (d) {
        if (isObject(d)) {
            asPostableObject(d);
            ref(d);
        }
        message.added.push(serialize(d));
    });
    var unrefs = [];
    c.removed.forEach(function (d) {
        if (isObject(d))
            unrefs.push(d);
        message.removed.push(serialize(d));
    });
    postMessage(message);
    unrefs.forEach(function (u) { return unref(u); });
}
function postMessage(message) {
    context.onMessage(message);
}
function getPostableID(object) {
    return object[POSTABLE_ADMINISTRATOR].id;
}
//# sourceMappingURL=postable.js.map

/***/ }),

/***/ "./renderer/build/Release/olive_renderer_module.node":
/*!***********************************************************!*\
  !*** ./renderer/build/Release/olive_renderer_module.node ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {try {global.process.dlopen(module, "D:\\source\\olive\\renderer\\build\\Release\\olive_renderer_module.node"); } catch(e) {throw new Error('Cannot open ' + "D:\\source\\olive\\renderer\\build\\Release\\olive_renderer_module.node" + ': ' + e);}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ })

/******/ });
//# sourceMappingURL=f21acb7dcdc69d881f87.worker.js.map