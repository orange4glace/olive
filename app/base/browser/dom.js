/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as browser from 'base/browser/browser';
import { domEvent } from 'base/browser/event';
import { StandardKeyboardEvent } from 'base/browser/keyboardEvent';
import { StandardMouseEvent } from 'base/browser/mouseEvent';
import { TimeoutTimer } from 'base/common/async';
import { CharCode } from 'base/common/charCode';
import { onUnexpectedError } from 'base/common/errors';
import { Emitter } from 'base/common/event';
import { Disposable, dispose, toDisposable } from 'base/common/lifecycle';
import * as platform from 'base/common/platform';
import { coalesce } from 'base/common/arrays';
export function clearNode(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}
export function removeNode(node) {
    if (node.parentNode) {
        node.parentNode.removeChild(node);
    }
}
export function isInDOM(node) {
    while (node) {
        if (node === document.body) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}
const _manualClassList = new class {
    _findClassName(node, className) {
        let classes = node.className;
        if (!classes) {
            this._lastStart = -1;
            return;
        }
        className = className.trim();
        let classesLen = classes.length, classLen = className.length;
        if (classLen === 0) {
            this._lastStart = -1;
            return;
        }
        if (classesLen < classLen) {
            this._lastStart = -1;
            return;
        }
        if (classes === className) {
            this._lastStart = 0;
            this._lastEnd = classesLen;
            return;
        }
        let idx = -1, idxEnd;
        while ((idx = classes.indexOf(className, idx + 1)) >= 0) {
            idxEnd = idx + classLen;
            // a class that is followed by another class
            if ((idx === 0 || classes.charCodeAt(idx - 1) === CharCode.Space) && classes.charCodeAt(idxEnd) === CharCode.Space) {
                this._lastStart = idx;
                this._lastEnd = idxEnd + 1;
                return;
            }
            // last class
            if (idx > 0 && classes.charCodeAt(idx - 1) === CharCode.Space && idxEnd === classesLen) {
                this._lastStart = idx - 1;
                this._lastEnd = idxEnd;
                return;
            }
            // equal - duplicate of cmp above
            if (idx === 0 && idxEnd === classesLen) {
                this._lastStart = 0;
                this._lastEnd = idxEnd;
                return;
            }
        }
        this._lastStart = -1;
    }
    hasClass(node, className) {
        this._findClassName(node, className);
        return this._lastStart !== -1;
    }
    addClasses(node, ...classNames) {
        classNames.forEach(nameValue => nameValue.split(' ').forEach(name => this.addClass(node, name)));
    }
    addClass(node, className) {
        if (!node.className) { // doesn't have it for sure
            node.className = className;
        }
        else {
            this._findClassName(node, className); // see if it's already there
            if (this._lastStart === -1) {
                node.className = node.className + ' ' + className;
            }
        }
    }
    removeClass(node, className) {
        this._findClassName(node, className);
        if (this._lastStart === -1) {
            return; // Prevent styles invalidation if not necessary
        }
        else {
            node.className = node.className.substring(0, this._lastStart) + node.className.substring(this._lastEnd);
        }
    }
    removeClasses(node, ...classNames) {
        classNames.forEach(nameValue => nameValue.split(' ').forEach(name => this.removeClass(node, name)));
    }
    toggleClass(node, className, shouldHaveIt) {
        this._findClassName(node, className);
        if (this._lastStart !== -1 && (shouldHaveIt === undefined || !shouldHaveIt)) {
            this.removeClass(node, className);
        }
        if (this._lastStart === -1 && (shouldHaveIt === undefined || shouldHaveIt)) {
            this.addClass(node, className);
        }
    }
};
const _nativeClassList = new class {
    hasClass(node, className) {
        return Boolean(className) && node.classList && node.classList.contains(className);
    }
    addClasses(node, ...classNames) {
        classNames.forEach(nameValue => nameValue.split(' ').forEach(name => this.addClass(node, name)));
    }
    addClass(node, className) {
        if (className && node.classList) {
            node.classList.add(className);
        }
    }
    removeClass(node, className) {
        if (className && node.classList) {
            node.classList.remove(className);
        }
    }
    removeClasses(node, ...classNames) {
        classNames.forEach(nameValue => nameValue.split(' ').forEach(name => this.removeClass(node, name)));
    }
    toggleClass(node, className, shouldHaveIt) {
        if (node.classList) {
            node.classList.toggle(className, shouldHaveIt);
        }
    }
};
// In IE11 there is only partial support for `classList` which makes us keep our
// custom implementation. Otherwise use the native implementation, see: http://caniuse.com/#search=classlist
const _classList = browser.isIE ? _manualClassList : _nativeClassList;
export const hasClass = _classList.hasClass.bind(_classList);
export const addClass = _classList.addClass.bind(_classList);
export const addClasses = _classList.addClasses.bind(_classList);
export const removeClass = _classList.removeClass.bind(_classList);
export const removeClasses = _classList.removeClasses.bind(_classList);
export const toggleClass = _classList.toggleClass.bind(_classList);
class DomListener {
    constructor(node, type, handler, useCapture) {
        this._node = node;
        this._type = type;
        this._handler = handler;
        this._useCapture = (useCapture || false);
        this._node.addEventListener(this._type, this._handler, this._useCapture);
    }
    dispose() {
        if (!this._handler) {
            // Already disposed
            return;
        }
        this._node.removeEventListener(this._type, this._handler, this._useCapture);
        // Prevent leakers from holding on to the dom or handler func
        this._node = null;
        this._handler = null;
    }
}
export function addDisposableListener(node, type, handler, useCapture) {
    return new DomListener(node, type, handler, useCapture);
}
function _wrapAsStandardMouseEvent(handler) {
    return function (e) {
        return handler(new StandardMouseEvent(e));
    };
}
function _wrapAsStandardKeyboardEvent(handler) {
    return function (e) {
        return handler(new StandardKeyboardEvent(e));
    };
}
export let addStandardDisposableListener = function addStandardDisposableListener(node, type, handler, useCapture) {
    let wrapHandler = handler;
    if (type === 'click' || type === 'mousedown') {
        wrapHandler = _wrapAsStandardMouseEvent(handler);
    }
    else if (type === 'keydown' || type === 'keypress' || type === 'keyup') {
        wrapHandler = _wrapAsStandardKeyboardEvent(handler);
    }
    return addDisposableListener(node, type, wrapHandler, useCapture);
};
export function addDisposableNonBubblingMouseOutListener(node, handler) {
    return addDisposableListener(node, 'mouseout', (e) => {
        // Mouse out bubbles, so this is an attempt to ignore faux mouse outs coming from children elements
        let toElement = (e.relatedTarget || e.target);
        while (toElement && toElement !== node) {
            toElement = toElement.parentNode;
        }
        if (toElement === node) {
            return;
        }
        handler(e);
    });
}
let _animationFrame = null;
function doRequestAnimationFrame(callback) {
    if (!_animationFrame) {
        const emulatedRequestAnimationFrame = (callback) => {
            return setTimeout(() => callback(new Date().getTime()), 0);
        };
        _animationFrame = (self.requestAnimationFrame
            || self.msRequestAnimationFrame
            || self.webkitRequestAnimationFrame
            || self.mozRequestAnimationFrame
            || self.oRequestAnimationFrame
            || emulatedRequestAnimationFrame);
    }
    return _animationFrame.call(self, callback);
}
/**
 * Schedule a callback to be run at the next animation frame.
 * This allows multiple parties to register callbacks that should run at the next animation frame.
 * If currently in an animation frame, `runner` will be executed immediately.
 * @return token that can be used to cancel the scheduled runner (only if `runner` was not executed immediately).
 */
export let runAtThisOrScheduleAtNextAnimationFrame;
/**
 * Schedule a callback to be run at the next animation frame.
 * This allows multiple parties to register callbacks that should run at the next animation frame.
 * If currently in an animation frame, `runner` will be executed at the next animation frame.
 * @return token that can be used to cancel the scheduled runner.
 */
export let scheduleAtNextAnimationFrame;
class AnimationFrameQueueItem {
    constructor(runner, priority = 0) {
        this._runner = runner;
        this.priority = priority;
        this._canceled = false;
    }
    dispose() {
        this._canceled = true;
    }
    execute() {
        if (this._canceled) {
            return;
        }
        try {
            this._runner();
        }
        catch (e) {
            onUnexpectedError(e);
        }
    }
    // Sort by priority (largest to lowest)
    static sort(a, b) {
        return b.priority - a.priority;
    }
}
(function () {
    /**
     * The runners scheduled at the next animation frame
     */
    let NEXT_QUEUE = [];
    /**
     * The runners scheduled at the current animation frame
     */
    let CURRENT_QUEUE = null;
    /**
     * A flag to keep track if the native requestAnimationFrame was already called
     */
    let animFrameRequested = false;
    /**
     * A flag to indicate if currently handling a native requestAnimationFrame callback
     */
    let inAnimationFrameRunner = false;
    let animationFrameRunner = () => {
        animFrameRequested = false;
        CURRENT_QUEUE = NEXT_QUEUE;
        NEXT_QUEUE = [];
        inAnimationFrameRunner = true;
        while (CURRENT_QUEUE.length > 0) {
            CURRENT_QUEUE.sort(AnimationFrameQueueItem.sort);
            let top = CURRENT_QUEUE.shift();
            top.execute();
        }
        inAnimationFrameRunner = false;
    };
    scheduleAtNextAnimationFrame = (runner, priority = 0) => {
        let item = new AnimationFrameQueueItem(runner, priority);
        NEXT_QUEUE.push(item);
        if (!animFrameRequested) {
            animFrameRequested = true;
            doRequestAnimationFrame(animationFrameRunner);
        }
        return item;
    };
    runAtThisOrScheduleAtNextAnimationFrame = (runner, priority) => {
        if (inAnimationFrameRunner) {
            let item = new AnimationFrameQueueItem(runner, priority);
            CURRENT_QUEUE.push(item);
            return item;
        }
        else {
            return scheduleAtNextAnimationFrame(runner, priority);
        }
    };
})();
export function measure(callback) {
    return scheduleAtNextAnimationFrame(callback, 10000 /* must be early */);
}
export function modify(callback) {
    return scheduleAtNextAnimationFrame(callback, -10000 /* must be late */);
}
const MINIMUM_TIME_MS = 16;
const DEFAULT_EVENT_MERGER = function (lastEvent, currentEvent) {
    return currentEvent;
};
class TimeoutThrottledDomListener extends Disposable {
    constructor(node, type, handler, eventMerger = DEFAULT_EVENT_MERGER, minimumTimeMs = MINIMUM_TIME_MS) {
        super();
        let lastEvent = null;
        let lastHandlerTime = 0;
        let timeout = this._register(new TimeoutTimer());
        let invokeHandler = () => {
            lastHandlerTime = (new Date()).getTime();
            handler(lastEvent);
            lastEvent = null;
        };
        this._register(addDisposableListener(node, type, (e) => {
            lastEvent = eventMerger(lastEvent, e);
            let elapsedTime = (new Date()).getTime() - lastHandlerTime;
            if (elapsedTime >= minimumTimeMs) {
                timeout.cancel();
                invokeHandler();
            }
            else {
                timeout.setIfNotSet(invokeHandler, minimumTimeMs - elapsedTime);
            }
        }));
    }
}
export function addDisposableThrottledListener(node, type, handler, eventMerger, minimumTimeMs) {
    return new TimeoutThrottledDomListener(node, type, handler, eventMerger, minimumTimeMs);
}
export function getComputedStyle(el) {
    return document.defaultView.getComputedStyle(el, null);
}
export function getClientArea(element) {
    // Try with DOM clientWidth / clientHeight
    if (element !== document.body) {
        return new Dimension(element.clientWidth, element.clientHeight);
    }
    // Try innerWidth / innerHeight
    if (window.innerWidth && window.innerHeight) {
        return new Dimension(window.innerWidth, window.innerHeight);
    }
    // Try with document.body.clientWidth / document.body.clientHeight
    if (document.body && document.body.clientWidth && document.body.clientHeight) {
        return new Dimension(document.body.clientWidth, document.body.clientHeight);
    }
    // Try with document.documentElement.clientWidth / document.documentElement.clientHeight
    if (document.documentElement && document.documentElement.clientWidth && document.documentElement.clientHeight) {
        return new Dimension(document.documentElement.clientWidth, document.documentElement.clientHeight);
    }
    throw new Error('Unable to figure out browser width and height');
}
class SizeUtils {
    // Adapted from WinJS
    // Converts a CSS positioning string for the specified element to pixels.
    static convertToPixels(element, value) {
        return parseFloat(value) || 0;
    }
    static getDimension(element, cssPropertyName, jsPropertyName) {
        let computedStyle = getComputedStyle(element);
        let value = '0';
        if (computedStyle) {
            if (computedStyle.getPropertyValue) {
                value = computedStyle.getPropertyValue(cssPropertyName);
            }
            else {
                // IE8
                value = computedStyle.getAttribute(jsPropertyName);
            }
        }
        return SizeUtils.convertToPixels(element, value);
    }
    static getBorderLeftWidth(element) {
        return SizeUtils.getDimension(element, 'border-left-width', 'borderLeftWidth');
    }
    static getBorderRightWidth(element) {
        return SizeUtils.getDimension(element, 'border-right-width', 'borderRightWidth');
    }
    static getBorderTopWidth(element) {
        return SizeUtils.getDimension(element, 'border-top-width', 'borderTopWidth');
    }
    static getBorderBottomWidth(element) {
        return SizeUtils.getDimension(element, 'border-bottom-width', 'borderBottomWidth');
    }
    static getPaddingLeft(element) {
        return SizeUtils.getDimension(element, 'padding-left', 'paddingLeft');
    }
    static getPaddingRight(element) {
        return SizeUtils.getDimension(element, 'padding-right', 'paddingRight');
    }
    static getPaddingTop(element) {
        return SizeUtils.getDimension(element, 'padding-top', 'paddingTop');
    }
    static getPaddingBottom(element) {
        return SizeUtils.getDimension(element, 'padding-bottom', 'paddingBottom');
    }
    static getMarginLeft(element) {
        return SizeUtils.getDimension(element, 'margin-left', 'marginLeft');
    }
    static getMarginTop(element) {
        return SizeUtils.getDimension(element, 'margin-top', 'marginTop');
    }
    static getMarginRight(element) {
        return SizeUtils.getDimension(element, 'margin-right', 'marginRight');
    }
    static getMarginBottom(element) {
        return SizeUtils.getDimension(element, 'margin-bottom', 'marginBottom');
    }
}
// ----------------------------------------------------------------------------------------
// Position & Dimension
export class Dimension {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    static equals(a, b) {
        if (a === b) {
            return true;
        }
        if (!a || !b) {
            return false;
        }
        return a.width === b.width && a.height === b.height;
    }
}
export function getTopLeftOffset(element) {
    // Adapted from WinJS.Utilities.getPosition
    // and added borders to the mix
    let offsetParent = element.offsetParent, top = element.offsetTop, left = element.offsetLeft;
    while ((element = element.parentNode) !== null && element !== document.body && element !== document.documentElement) {
        top -= element.scrollTop;
        let c = getComputedStyle(element);
        if (c) {
            left -= c.direction !== 'rtl' ? element.scrollLeft : -element.scrollLeft;
        }
        if (element === offsetParent) {
            left += SizeUtils.getBorderLeftWidth(element);
            top += SizeUtils.getBorderTopWidth(element);
            top += element.offsetTop;
            left += element.offsetLeft;
            offsetParent = element.offsetParent;
        }
    }
    return {
        left: left,
        top: top
    };
}
export function size(element, width, height) {
    if (typeof width === 'number') {
        element.style.width = `${width}px`;
    }
    if (typeof height === 'number') {
        element.style.height = `${height}px`;
    }
}
export function position(element, top, right, bottom, left, position = 'absolute') {
    if (typeof top === 'number') {
        element.style.top = `${top}px`;
    }
    if (typeof right === 'number') {
        element.style.right = `${right}px`;
    }
    if (typeof bottom === 'number') {
        element.style.bottom = `${bottom}px`;
    }
    if (typeof left === 'number') {
        element.style.left = `${left}px`;
    }
    element.style.position = position;
}
/**
 * Returns the position of a dom node relative to the entire page.
 */
export function getDomNodePagePosition(domNode) {
    let bb = domNode.getBoundingClientRect();
    return {
        left: bb.left + StandardWindow.scrollX,
        top: bb.top + StandardWindow.scrollY,
        width: bb.width,
        height: bb.height
    };
}
export const StandardWindow = new class {
    get scrollX() {
        if (typeof window.scrollX === 'number') {
            // modern browsers
            return window.scrollX;
        }
        else {
            return document.body.scrollLeft + document.documentElement.scrollLeft;
        }
    }
    get scrollY() {
        if (typeof window.scrollY === 'number') {
            // modern browsers
            return window.scrollY;
        }
        else {
            return document.body.scrollTop + document.documentElement.scrollTop;
        }
    }
};
// Adapted from WinJS
// Gets the width of the element, including margins.
export function getTotalWidth(element) {
    let margin = SizeUtils.getMarginLeft(element) + SizeUtils.getMarginRight(element);
    return element.offsetWidth + margin;
}
export function getContentWidth(element) {
    let border = SizeUtils.getBorderLeftWidth(element) + SizeUtils.getBorderRightWidth(element);
    let padding = SizeUtils.getPaddingLeft(element) + SizeUtils.getPaddingRight(element);
    return element.offsetWidth - border - padding;
}
export function getTotalScrollWidth(element) {
    let margin = SizeUtils.getMarginLeft(element) + SizeUtils.getMarginRight(element);
    return element.scrollWidth + margin;
}
// Adapted from WinJS
// Gets the height of the content of the specified element. The content height does not include borders or padding.
export function getContentHeight(element) {
    let border = SizeUtils.getBorderTopWidth(element) + SizeUtils.getBorderBottomWidth(element);
    let padding = SizeUtils.getPaddingTop(element) + SizeUtils.getPaddingBottom(element);
    return element.offsetHeight - border - padding;
}
// Adapted from WinJS
// Gets the height of the element, including its margins.
export function getTotalHeight(element) {
    let margin = SizeUtils.getMarginTop(element) + SizeUtils.getMarginBottom(element);
    return element.offsetHeight + margin;
}
// Gets the left coordinate of the specified element relative to the specified parent.
function getRelativeLeft(element, parent) {
    if (element === null) {
        return 0;
    }
    let elementPosition = getTopLeftOffset(element);
    let parentPosition = getTopLeftOffset(parent);
    return elementPosition.left - parentPosition.left;
}
export function getLargestChildWidth(parent, children) {
    let childWidths = children.map((child) => {
        return Math.max(getTotalScrollWidth(child), getTotalWidth(child)) + getRelativeLeft(child, parent) || 0;
    });
    let maxWidth = Math.max(...childWidths);
    return maxWidth;
}
// ----------------------------------------------------------------------------------------
export function isAncestor(testChild, testAncestor) {
    while (testChild) {
        if (testChild === testAncestor) {
            return true;
        }
        testChild = testChild.parentNode;
    }
    return false;
}
export function findParentWithClass(node, clazz, stopAtClazzOrNode) {
    while (node) {
        if (hasClass(node, clazz)) {
            return node;
        }
        if (stopAtClazzOrNode) {
            if (typeof stopAtClazzOrNode === 'string') {
                if (hasClass(node, stopAtClazzOrNode)) {
                    return null;
                }
            }
            else {
                if (node === stopAtClazzOrNode) {
                    return null;
                }
            }
        }
        node = node.parentNode;
    }
    return null;
}
export function createStyleSheet(container = document.getElementsByTagName('head')[0]) {
    let style = document.createElement('style');
    style.type = 'text/css';
    style.media = 'screen';
    container.appendChild(style);
    return style;
}
let _sharedStyleSheet = null;
function getSharedStyleSheet() {
    if (!_sharedStyleSheet) {
        _sharedStyleSheet = createStyleSheet();
    }
    return _sharedStyleSheet;
}
function getDynamicStyleSheetRules(style) {
    if (style && style.sheet && style.sheet.rules) {
        // Chrome, IE
        return style.sheet.rules;
    }
    if (style && style.sheet && style.sheet.cssRules) {
        // FF
        return style.sheet.cssRules;
    }
    return [];
}
export function createCSSRule(selector, cssText, style = getSharedStyleSheet()) {
    if (!style || !cssText) {
        return;
    }
    style.sheet.insertRule(selector + '{' + cssText + '}', 0);
}
export function removeCSSRulesContainingSelector(ruleName, style = getSharedStyleSheet()) {
    if (!style) {
        return;
    }
    let rules = getDynamicStyleSheetRules(style);
    let toDelete = [];
    for (let i = 0; i < rules.length; i++) {
        let rule = rules[i];
        if (rule.selectorText.indexOf(ruleName) !== -1) {
            toDelete.push(i);
        }
    }
    for (let i = toDelete.length - 1; i >= 0; i--) {
        style.sheet.deleteRule(toDelete[i]);
    }
}
export function isHTMLElement(o) {
    if (typeof HTMLElement === 'object') {
        return o instanceof HTMLElement;
    }
    return o && typeof o === 'object' && o.nodeType === 1 && typeof o.nodeName === 'string';
}
export const EventType = {
    // Mouse
    CLICK: 'click',
    DBLCLICK: 'dblclick',
    MOUSE_UP: 'mouseup',
    MOUSE_DOWN: 'mousedown',
    MOUSE_OVER: 'mouseover',
    MOUSE_MOVE: 'mousemove',
    MOUSE_OUT: 'mouseout',
    MOUSE_ENTER: 'mouseenter',
    MOUSE_LEAVE: 'mouseleave',
    CONTEXT_MENU: 'contextmenu',
    WHEEL: 'wheel',
    // Keyboard
    KEY_DOWN: 'keydown',
    KEY_PRESS: 'keypress',
    KEY_UP: 'keyup',
    // HTML Document
    LOAD: 'load',
    UNLOAD: 'unload',
    ABORT: 'abort',
    ERROR: 'error',
    RESIZE: 'resize',
    SCROLL: 'scroll',
    // Form
    SELECT: 'select',
    CHANGE: 'change',
    SUBMIT: 'submit',
    RESET: 'reset',
    FOCUS: 'focus',
    FOCUS_IN: 'focusin',
    FOCUS_OUT: 'focusout',
    BLUR: 'blur',
    INPUT: 'input',
    // Local Storage
    STORAGE: 'storage',
    // Drag
    DRAG_START: 'dragstart',
    DRAG: 'drag',
    DRAG_ENTER: 'dragenter',
    DRAG_LEAVE: 'dragleave',
    DRAG_OVER: 'dragover',
    DROP: 'drop',
    DRAG_END: 'dragend',
    // Animation
    ANIMATION_START: browser.isWebKit ? 'webkitAnimationStart' : 'animationstart',
    ANIMATION_END: browser.isWebKit ? 'webkitAnimationEnd' : 'animationend',
    ANIMATION_ITERATION: browser.isWebKit ? 'webkitAnimationIteration' : 'animationiteration'
};
export const EventHelper = {
    stop: function (e, cancelBubble) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        else {
            // IE8
            e.returnValue = false;
        }
        if (cancelBubble) {
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            else {
                // IE8
                e.cancelBubble = true;
            }
        }
    }
};
export function saveParentsScrollTop(node) {
    let r = [];
    for (let i = 0; node && node.nodeType === node.ELEMENT_NODE; i++) {
        r[i] = node.scrollTop;
        node = node.parentNode;
    }
    return r;
}
export function restoreParentsScrollTop(node, state) {
    for (let i = 0; node && node.nodeType === node.ELEMENT_NODE; i++) {
        if (node.scrollTop !== state[i]) {
            node.scrollTop = state[i];
        }
        node = node.parentNode;
    }
}
class FocusTracker {
    constructor(element) {
        this._onDidFocus = new Emitter();
        this.onDidFocus = this._onDidFocus.event;
        this._onDidBlur = new Emitter();
        this.onDidBlur = this._onDidBlur.event;
        this.disposables = [];
        let hasFocus = isAncestor(document.activeElement, element);
        let loosingFocus = false;
        let onFocus = () => {
            loosingFocus = false;
            if (!hasFocus) {
                hasFocus = true;
                this._onDidFocus.fire();
            }
        };
        let onBlur = () => {
            if (hasFocus) {
                loosingFocus = true;
                window.setTimeout(() => {
                    if (loosingFocus) {
                        loosingFocus = false;
                        hasFocus = false;
                        this._onDidBlur.fire();
                    }
                }, 0);
            }
        };
        domEvent(element, EventType.FOCUS, true)(onFocus, null, this.disposables);
        domEvent(element, EventType.BLUR, true)(onBlur, null, this.disposables);
    }
    dispose() {
        this.disposables = dispose(this.disposables);
        this._onDidFocus.dispose();
        this._onDidBlur.dispose();
    }
}
export function trackFocus(element) {
    return new FocusTracker(element);
}
export function append(parent, ...children) {
    children.forEach(child => parent.appendChild(child));
    return children[children.length - 1];
}
export function prepend(parent, child) {
    parent.insertBefore(child, parent.firstChild);
    return child;
}
const SELECTOR_REGEX = /([\w\-]+)?(#([\w\-]+))?((.([\w\-]+))*)/;
export function $(description, attrs, ...children) {
    let match = SELECTOR_REGEX.exec(description);
    if (!match) {
        throw new Error('Bad use of emmet');
    }
    let result = document.createElement(match[1] || 'div');
    if (match[3]) {
        result.id = match[3];
    }
    if (match[4]) {
        result.className = match[4].replace(/\./g, ' ').trim();
    }
    attrs = attrs || {};
    Object.keys(attrs).forEach(name => {
        const value = attrs[name];
        if (/^on\w+$/.test(name)) {
            result[name] = value;
        }
        else if (name === 'selected') {
            if (value) {
                result.setAttribute(name, 'true');
            }
        }
        else {
            result.setAttribute(name, value);
        }
    });
    coalesce(children)
        .forEach(child => {
        if (child instanceof Node) {
            result.appendChild(child);
        }
        else {
            result.appendChild(document.createTextNode(child));
        }
    });
    return result;
}
export function join(nodes, separator) {
    const result = [];
    nodes.forEach((node, index) => {
        if (index > 0) {
            if (separator instanceof Node) {
                result.push(separator.cloneNode());
            }
            else {
                result.push(document.createTextNode(separator));
            }
        }
        result.push(node);
    });
    return result;
}
export function show(...elements) {
    for (let element of elements) {
        element.style.display = '';
        element.removeAttribute('aria-hidden');
    }
}
export function hide(...elements) {
    for (let element of elements) {
        element.style.display = 'none';
        element.setAttribute('aria-hidden', 'true');
    }
}
function findParentWithAttribute(node, attribute) {
    while (node) {
        if (node instanceof HTMLElement && node.hasAttribute(attribute)) {
            return node;
        }
        node = node.parentNode;
    }
    return null;
}
export function removeTabIndexAndUpdateFocus(node) {
    if (!node || !node.hasAttribute('tabIndex')) {
        return;
    }
    // If we are the currently focused element and tabIndex is removed,
    // standard DOM behavior is to move focus to the <body> element. We
    // typically never want that, rather put focus to the closest element
    // in the hierarchy of the parent DOM nodes.
    if (document.activeElement === node) {
        let parentFocusable = findParentWithAttribute(node.parentElement, 'tabIndex');
        if (parentFocusable) {
            parentFocusable.focus();
        }
    }
    node.removeAttribute('tabindex');
}
export function getElementsByTagName(tag) {
    return Array.prototype.slice.call(document.getElementsByTagName(tag), 0);
}
export function finalHandler(fn) {
    return e => {
        e.preventDefault();
        e.stopPropagation();
        fn(e);
    };
}
export function domContentLoaded() {
    return new Promise(resolve => {
        const readyState = document.readyState;
        if (readyState === 'complete' || (document && document.body !== null)) {
            platform.setImmediate(resolve);
        }
        else {
            window.addEventListener('DOMContentLoaded', resolve, false);
        }
    });
}
/**
 * Find a value usable for a dom node size such that the likelihood that it would be
 * displayed with constant screen pixels size is as high as possible.
 *
 * e.g. We would desire for the cursors to be 2px (CSS px) wide. Under a devicePixelRatio
 * of 1.25, the cursor will be 2.5 screen pixels wide. Depending on how the dom node aligns/"snaps"
 * with the screen pixels, it will sometimes be rendered with 2 screen pixels, and sometimes with 3 screen pixels.
 */
export function computeScreenAwareSize(cssPx) {
    const screenPx = window.devicePixelRatio * cssPx;
    return Math.max(1, Math.floor(screenPx)) / window.devicePixelRatio;
}
/**
 * See https://github.com/Microsoft/monaco-editor/issues/601
 * To protect against malicious code in the linked site, particularly phishing attempts,
 * the window.opener should be set to null to prevent the linked site from having access
 * to change the location of the current page.
 * See https://mathiasbynens.github.io/rel-noopener/
 */
export function windowOpenNoOpener(url) {
    if (platform.isNative || browser.isEdgeWebView) {
        // In VSCode, window.open() always returns null...
        // The same is true for a WebView (see https://github.com/Microsoft/monaco-editor/issues/628)
        window.open(url);
    }
    else {
        let newTab = window.open();
        if (newTab) {
            newTab.opener = null;
            newTab.location.href = url;
        }
    }
}
export function animate(fn) {
    const step = () => {
        fn();
        stepDisposable = scheduleAtNextAnimationFrame(step);
    };
    let stepDisposable = scheduleAtNextAnimationFrame(step);
    return toDisposable(() => stepDisposable.dispose());
}
//# sourceMappingURL=dom.js.map