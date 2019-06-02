/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Emitter } from 'base/common/event';
class WindowManager {
    constructor() {
        // --- Zoom Level
        this._zoomLevel = 0;
        this._lastZoomLevelChangeTime = 0;
        this._onDidChangeZoomLevel = new Emitter();
        this.onDidChangeZoomLevel = this._onDidChangeZoomLevel.event;
        // --- Zoom Factor
        this._zoomFactor = 1;
        this._onDidChangeFullscreen = new Emitter();
        this.onDidChangeFullscreen = this._onDidChangeFullscreen.event;
    }
    getZoomLevel() {
        return this._zoomLevel;
    }
    getTimeSinceLastZoomLevelChanged() {
        return Date.now() - this._lastZoomLevelChangeTime;
    }
    setZoomLevel(zoomLevel, isTrusted) {
        if (this._zoomLevel === zoomLevel) {
            return;
        }
        this._zoomLevel = zoomLevel;
        // See https://github.com/Microsoft/vscode/issues/26151
        this._lastZoomLevelChangeTime = isTrusted ? 0 : Date.now();
        this._onDidChangeZoomLevel.fire(this._zoomLevel);
    }
    getZoomFactor() {
        return this._zoomFactor;
    }
    setZoomFactor(zoomFactor) {
        this._zoomFactor = zoomFactor;
    }
    // --- Pixel Ratio
    getPixelRatio() {
        let ctx = document.createElement('canvas').getContext('2d');
        let dpr = window.devicePixelRatio || 1;
        let bsr = ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio || 1;
        return dpr / bsr;
    }
    setFullscreen(fullscreen) {
        if (this._fullscreen === fullscreen) {
            return;
        }
        this._fullscreen = fullscreen;
        this._onDidChangeFullscreen.fire();
    }
    isFullscreen() {
        return this._fullscreen;
    }
}
WindowManager.INSTANCE = new WindowManager();
/** A zoom index, e.g. 1, 2, 3 */
export function setZoomLevel(zoomLevel, isTrusted) {
    WindowManager.INSTANCE.setZoomLevel(zoomLevel, isTrusted);
}
export function getZoomLevel() {
    return WindowManager.INSTANCE.getZoomLevel();
}
/** Returns the time (in ms) since the zoom level was changed */
export function getTimeSinceLastZoomLevelChanged() {
    return WindowManager.INSTANCE.getTimeSinceLastZoomLevelChanged();
}
export function onDidChangeZoomLevel(callback) {
    return WindowManager.INSTANCE.onDidChangeZoomLevel(callback);
}
/** The zoom scale for an index, e.g. 1, 1.2, 1.4 */
export function getZoomFactor() {
    return WindowManager.INSTANCE.getZoomFactor();
}
export function setZoomFactor(zoomFactor) {
    WindowManager.INSTANCE.setZoomFactor(zoomFactor);
}
export function getPixelRatio() {
    return WindowManager.INSTANCE.getPixelRatio();
}
export function setFullscreen(fullscreen) {
    WindowManager.INSTANCE.setFullscreen(fullscreen);
}
export function isFullscreen() {
    return WindowManager.INSTANCE.isFullscreen();
}
export const onDidChangeFullscreen = WindowManager.INSTANCE.onDidChangeFullscreen;
const userAgent = navigator.userAgent;
export const isIE = (userAgent.indexOf('Trident') >= 0);
export const isEdge = (userAgent.indexOf('Edge/') >= 0);
export const isEdgeOrIE = isIE || isEdge;
export const isOpera = (userAgent.indexOf('Opera') >= 0);
export const isFirefox = (userAgent.indexOf('Firefox') >= 0);
export const isWebKit = (userAgent.indexOf('AppleWebKit') >= 0);
export const isChrome = (userAgent.indexOf('Chrome') >= 0);
export const isSafari = (!isChrome && (userAgent.indexOf('Safari') >= 0));
export const isWebkitWebView = (!isChrome && !isSafari && isWebKit);
export const isIPad = (userAgent.indexOf('iPad') >= 0);
export const isEdgeWebView = isEdge && (userAgent.indexOf('WebView/') >= 0);
export function hasClipboardSupport() {
    if (isIE) {
        return false;
    }
    if (isEdge) {
        let index = userAgent.indexOf('Edge/');
        let version = parseInt(userAgent.substring(index + 5, userAgent.indexOf('.', index)), 10);
        if (!version || (version >= 12 && version <= 16)) {
            return false;
        }
    }
    return true;
}
//# sourceMappingURL=browser.js.map