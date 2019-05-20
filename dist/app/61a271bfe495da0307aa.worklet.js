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
/******/ 	return __webpack_require__(__webpack_require__.s = "./node_modules/ts-loader/index.js!./app/internal/renderer/audio-renderer/renderer-worklet.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/internal/renderer/audio-renderer/common.ts":
/*!********************************************************!*\
  !*** ./app/internal/renderer/audio-renderer/common.ts ***!
  \********************************************************/
/*! exports provided: createAudioRendererOption, createAudioRendererBuffers, AudioRendererStateIndex, AudioRendererSlotState, getSlotBufferView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createAudioRendererOption", function() { return createAudioRendererOption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createAudioRendererBuffers", function() { return createAudioRendererBuffers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AudioRendererStateIndex", function() { return AudioRendererStateIndex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AudioRendererSlotState", function() { return AudioRendererSlotState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSlotBufferView", function() { return getSlotBufferView; });
function createAudioRendererOption(opt) {
    return {
        frequency: opt.frequency,
        maxSlot: opt.maxSlot,
        bytesPerFrame: 4,
        framesPerKernel: 128,
        kernelsPerSlot: opt.kernelsPerSlot,
        framesPerSlot: 128 * opt.kernelsPerSlot,
        bytesPerKernel: 128 * 4,
        bytesPerSlot: 128 * 4 * opt.kernelsPerSlot,
        slotLayout: {
            INDEX: 0,
            DATA: 4,
            __SIZE: 4 + 128 * 4 * opt.kernelsPerSlot
        }
    };
}
function createAudioRendererBuffers(opt) {
    return {
        state: new SharedArrayBuffer(AudioRendererStateIndex._SIZE * 4),
        slotState: new SharedArrayBuffer(opt.maxSlot * 4),
        slotData: new SharedArrayBuffer(opt.slotLayout.__SIZE * opt.maxSlot)
    };
}
var AudioRendererStateIndex;
(function (AudioRendererStateIndex) {
    AudioRendererStateIndex[AudioRendererStateIndex["PRODUCER_OFFSET"] = 0] = "PRODUCER_OFFSET";
    AudioRendererStateIndex[AudioRendererStateIndex["PRODUCER_SIGNAL"] = 1] = "PRODUCER_SIGNAL";
    AudioRendererStateIndex[AudioRendererStateIndex["PRODUCER_SIGNAL_RESPONSE"] = 2] = "PRODUCER_SIGNAL_RESPONSE";
    AudioRendererStateIndex[AudioRendererStateIndex["PRODUCER_REQUEST"] = 3] = "PRODUCER_REQUEST";
    AudioRendererStateIndex[AudioRendererStateIndex["_SIZE"] = 4] = "_SIZE";
})(AudioRendererStateIndex || (AudioRendererStateIndex = {}));
var AudioRendererSlotState;
(function (AudioRendererSlotState) {
    AudioRendererSlotState[AudioRendererSlotState["IDLE"] = 0] = "IDLE";
    AudioRendererSlotState[AudioRendererSlotState["BUSY"] = 1] = "BUSY";
})(AudioRendererSlotState || (AudioRendererSlotState = {}));
function getSlotBufferView(option, slotBuffer, slotOffset) {
    const slotLayout = option.slotLayout;
    return {
        header: new Int32Array(slotBuffer, slotLayout.__SIZE * slotOffset, slotLayout.DATA / 4),
        data: new Float32Array(slotBuffer, slotLayout.__SIZE * slotOffset + slotLayout.DATA, option.bytesPerSlot / 4)
    };
}


/***/ }),

/***/ "./app/internal/renderer/audio-renderer/message.ts":
/*!*********************************************************!*\
  !*** ./app/internal/renderer/audio-renderer/message.ts ***!
  \*********************************************************/
/*! exports provided: AudioRendererMessageEventType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AudioRendererMessageEventType", function() { return AudioRendererMessageEventType; });
var AudioRendererMessageEventType;
(function (AudioRendererMessageEventType) {
    AudioRendererMessageEventType[AudioRendererMessageEventType["INIT"] = 0] = "INIT";
    AudioRendererMessageEventType[AudioRendererMessageEventType["PLAY_RENDER"] = 1] = "PLAY_RENDER";
    AudioRendererMessageEventType[AudioRendererMessageEventType["PAUSE_RENDER"] = 2] = "PAUSE_RENDER";
    AudioRendererMessageEventType[AudioRendererMessageEventType["RENDER"] = 3] = "RENDER";
})(AudioRendererMessageEventType || (AudioRendererMessageEventType = {}));


/***/ }),

/***/ "./node_modules/ts-loader/index.js!./app/internal/renderer/audio-renderer/renderer-worklet.ts":
/*!*******************************************************************************************!*\
  !*** ./node_modules/ts-loader!./app/internal/renderer/audio-renderer/renderer-worklet.ts ***!
  \*******************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var internal_renderer_audio_renderer_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! internal/renderer/audio-renderer/common */ "./app/internal/renderer/audio-renderer/common.ts");
/* harmony import */ var internal_renderer_audio_renderer_message__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! internal/renderer/audio-renderer/message */ "./app/internal/renderer/audio-renderer/message.ts");


class AudioRendererWorkletProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this.initialized = false;
        this.currentKernelIndex = 0;
        console.log(this);
        this.port.onmessage = this.handleMessage.bind(this);
    }
    handleMessage(e) {
        const data = e.data;
        switch (data.type) {
            case internal_renderer_audio_renderer_message__WEBPACK_IMPORTED_MODULE_1__["AudioRendererMessageEventType"].INIT:
                this.initialize(data.data);
                break;
        }
    }
    initialize(data) {
        console.log(data);
        const buffers = data.buffers;
        this.buffers = {
            state: new Int32Array(buffers.state),
            slotState: new Int32Array(buffers.slotState),
            slotData: buffers.slotData
        };
        this.option = data.option;
        this.ZERO_FILLED_SLOT_BUFFER = new Float32Array(new ArrayBuffer(this.option.bytesPerSlot));
        this.currentSlotDataBuffer = new Float32Array(new ArrayBuffer(this.option.bytesPerSlot));
        this.initialized = true;
    }
    process(inputs, outputs, parameters) {
        if (!this.initialized)
            return true;
        this.stepKernel(outputs[0][0]);
        return true;
    }
    stepKernel(outBuffer) {
        const option = this.option;
        if ((this.currentKernelIndex + 1) % option.kernelsPerSlot == 0) {
            const slotIndex = (this.currentKernelIndex + 1) / option.kernelsPerSlot;
            this.getSlotData(slotIndex, this.currentSlotDataBuffer);
            Atomics.sub(this.buffers.state, internal_renderer_audio_renderer_common__WEBPACK_IMPORTED_MODULE_0__["AudioRendererStateIndex"].PRODUCER_OFFSET, 1);
            this.checkSignal();
            Atomics.notify(this.buffers.state, internal_renderer_audio_renderer_common__WEBPACK_IMPORTED_MODULE_0__["AudioRendererStateIndex"].PRODUCER_OFFSET, 1);
        }
        this.currentKernelIndex = this.currentKernelIndex + 1;
        this.getKernelData(this.currentSlotDataBuffer, this.currentKernelIndex, outBuffer);
    }
    checkSignal() {
        const signal = Atomics.compareExchange(this.buffers.state, internal_renderer_audio_renderer_common__WEBPACK_IMPORTED_MODULE_0__["AudioRendererStateIndex"].PRODUCER_SIGNAL, 1, 0);
        if (signal == 1) {
            const producerOffset = Atomics.load(this.buffers.state, internal_renderer_audio_renderer_common__WEBPACK_IMPORTED_MODULE_0__["AudioRendererStateIndex"].PRODUCER_OFFSET);
            Atomics.store(this.buffers.state, internal_renderer_audio_renderer_common__WEBPACK_IMPORTED_MODULE_0__["AudioRendererStateIndex"].PRODUCER_SIGNAL_RESPONSE, producerOffset);
            Atomics.notify(this.buffers.state, internal_renderer_audio_renderer_common__WEBPACK_IMPORTED_MODULE_0__["AudioRendererStateIndex"].PRODUCER_SIGNAL, 1);
        }
    }
    getKernelData(slotDataBuffer, kernelIndex, outBuffer) {
        const option = this.option;
        const kernelOffset = kernelIndex % option.kernelsPerSlot;
        const kernelData = new Float32Array(slotDataBuffer.buffer, option.bytesPerKernel * kernelOffset, option.bytesPerKernel / 4);
        outBuffer.set(kernelData);
    }
    getSlotData(slotIndex, outBuffer) {
        const option = this.option;
        const slotOffset = slotIndex % option.maxSlot;
        if (Atomics.compareExchange(this.buffers.slotState, slotOffset, internal_renderer_audio_renderer_common__WEBPACK_IMPORTED_MODULE_0__["AudioRendererSlotState"].IDLE, internal_renderer_audio_renderer_common__WEBPACK_IMPORTED_MODULE_0__["AudioRendererSlotState"].BUSY)
            == internal_renderer_audio_renderer_common__WEBPACK_IMPORTED_MODULE_0__["AudioRendererSlotState"].IDLE) {
            const slotView = Object(internal_renderer_audio_renderer_common__WEBPACK_IMPORTED_MODULE_0__["getSlotBufferView"])(option, this.buffers.slotData, slotOffset);
            const slotHeaderView = slotView.header;
            const slotDataView = slotView.data;
            if (slotHeaderView[option.slotLayout.INDEX] != slotIndex) {
                outBuffer.set(this.ZERO_FILLED_SLOT_BUFFER);
                // console.warn('miss! ' + 'expected = ' + slotIndex + ', got = ' + slotHeaderView[option.slotLayout.INDEX]);
            }
            else {
                outBuffer.set(slotDataView);
            }
            Atomics.store(this.buffers.slotState, slotOffset, internal_renderer_audio_renderer_common__WEBPACK_IMPORTED_MODULE_0__["AudioRendererSlotState"].IDLE);
        }
        else {
            outBuffer.set(this.ZERO_FILLED_SLOT_BUFFER);
            // console.warn('Slot is busy by Producer');
        }
    }
}
registerProcessor('audio-renderer-worklet-processor', AudioRendererWorkletProcessor);


/***/ })

/******/ });
//# sourceMappingURL=61a271bfe495da0307aa.worklet.js.map