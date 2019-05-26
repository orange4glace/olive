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
/******/ 	return __webpack_require__(__webpack_require__.s = "./main/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./main/app-window-main-service.ts":
/*!*****************************************!*\
  !*** ./main/app-window-main-service.ts ***!
  \*****************************************/
/*! exports provided: AppWindowMainService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppWindowMainService", function() { return AppWindowMainService; });
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
// ./main.js

class AppWindowMainService {
    constructor(mainWin) {
        this.mainWindow = mainWin;
        this.requests = new Map();
        this.webContents = mainWin.webContents;
        this.mainWindow.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
            const request = this.requests.get(frameName);
            if (!request)
                return;
            console.log("[WindowRequestHost] new-window from BrowserMain.BrowserRequest ", frameName, request.options);
            event.preventDefault();
            Object.assign(options, request.options);
            if (request.options.parent)
                options.parent = electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"].fromId(request.options.parent);
            event.newGuest = new electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"](options);
            this.sendWrapResultToRenderer({
                ok: true,
                name: frameName,
                id: event.newGuest.id
            });
        });
        electron__WEBPACK_IMPORTED_MODULE_0__["ipcMain"].on('request-app-window', (e, arg) => {
            console.log("[WindowRequestHost] Request window", arg.name);
            this.requests.set(arg.name, arg);
            this.webContents.send('start-app-window', arg);
        });
    }
    sendWrapResultToRenderer(open) {
        this.webContents.send('app-window-started', open);
    }
}


/***/ }),

/***/ "./main/main.ts":
/*!**********************!*\
  !*** ./main/main.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _app_window_main_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-window-main-service */ "./main/app-window-main-service.ts");
// ./main.js


process.on('uncaughtException', err => {
    console.error(err);
});
console.log("Start electron main");
let win = null;
function createApp() {
    let promise = new Promise((resolve, reject) => {
        win = new electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"]({
            width: 1000,
            height: 600,
            webPreferences: {
                nativeWindowOpen: true,
                nodeIntegrationInWorker: true
            }
        });
        const appWindowMainService = new _app_window_main_service__WEBPACK_IMPORTED_MODULE_1__["AppWindowMainService"](win);
        // I don't know but because of some bug of electron, 
        // napi_threadsafe_function works properly when page is reloaded at least once.
        win.webContents.once('did-finish-load', () => {
            win.webContents.once('did-finish-load', () => {
                resolve(win);
            });
            win.loadURL('http://localhost:8080/starter.html');
            // win.webContents.reload();
        });
        win.loadURL('http://localhost:8080/blank.html');
        win.webContents.openDevTools();
        win.on('closed', function () {
            win = null;
        });
    });
    return promise;
}
electron__WEBPACK_IMPORTED_MODULE_0__["app"].on('ready', function () {
    createApp();
});
electron__WEBPACK_IMPORTED_MODULE_0__["app"].on('window-all-closed', function () {
    if (process.platform != 'darwin') {
        electron__WEBPACK_IMPORTED_MODULE_0__["app"].quit();
    }
});


/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ })

/******/ });
//# sourceMappingURL=main.js.map