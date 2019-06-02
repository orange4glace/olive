import { IKeyboardEvent } from 'base/browser/keyboardEvent';
import { IMouseEvent } from 'base/browser/mouseEvent';
import { Event } from 'base/common/event';
import { IDisposable } from 'base/common/lifecycle';
export declare function clearNode(node: HTMLElement): void;
export declare function removeNode(node: HTMLElement): void;
export declare function isInDOM(node: Node | null): boolean;
export declare const hasClass: (node: HTMLElement, className: string) => boolean;
export declare const addClass: (node: HTMLElement, className: string) => void;
export declare const addClasses: (node: HTMLElement, ...classNames: string[]) => void;
export declare const removeClass: (node: HTMLElement, className: string) => void;
export declare const removeClasses: (node: HTMLElement, ...classNames: string[]) => void;
export declare const toggleClass: (node: HTMLElement, className: string, shouldHaveIt?: boolean) => void;
export declare function addDisposableListener<K extends keyof GlobalEventHandlersEventMap>(node: Element | Window | Document, type: K, handler: (event: GlobalEventHandlersEventMap[K]) => void, useCapture?: boolean): IDisposable;
export declare function addDisposableListener(node: Element | Window | Document, type: string, handler: (event: any) => void, useCapture?: boolean): IDisposable;
export interface IAddStandardDisposableListenerSignature {
    (node: HTMLElement, type: 'click', handler: (event: IMouseEvent) => void, useCapture?: boolean): IDisposable;
    (node: HTMLElement, type: 'mousedown', handler: (event: IMouseEvent) => void, useCapture?: boolean): IDisposable;
    (node: HTMLElement, type: 'keydown', handler: (event: IKeyboardEvent) => void, useCapture?: boolean): IDisposable;
    (node: HTMLElement, type: 'keypress', handler: (event: IKeyboardEvent) => void, useCapture?: boolean): IDisposable;
    (node: HTMLElement, type: 'keyup', handler: (event: IKeyboardEvent) => void, useCapture?: boolean): IDisposable;
    (node: HTMLElement, type: string, handler: (event: any) => void, useCapture?: boolean): IDisposable;
}
export declare let addStandardDisposableListener: IAddStandardDisposableListenerSignature;
export declare function addDisposableNonBubblingMouseOutListener(node: Element, handler: (event: MouseEvent) => void): IDisposable;
/**
 * Schedule a callback to be run at the next animation frame.
 * This allows multiple parties to register callbacks that should run at the next animation frame.
 * If currently in an animation frame, `runner` will be executed immediately.
 * @return token that can be used to cancel the scheduled runner (only if `runner` was not executed immediately).
 */
export declare let runAtThisOrScheduleAtNextAnimationFrame: (runner: () => void, priority?: number) => IDisposable;
/**
 * Schedule a callback to be run at the next animation frame.
 * This allows multiple parties to register callbacks that should run at the next animation frame.
 * If currently in an animation frame, `runner` will be executed at the next animation frame.
 * @return token that can be used to cancel the scheduled runner.
 */
export declare let scheduleAtNextAnimationFrame: (runner: () => void, priority?: number) => IDisposable;
export declare function measure(callback: () => void): IDisposable;
export declare function modify(callback: () => void): IDisposable;
/**
 * Add a throttled listener. `handler` is fired at most every 16ms or with the next animation frame (if browser supports it).
 */
export interface IEventMerger<R, E> {
    (lastEvent: R | null, currentEvent: E): R;
}
export interface DOMEvent {
    preventDefault(): void;
    stopPropagation(): void;
}
export declare function addDisposableThrottledListener<R, E extends DOMEvent = DOMEvent>(node: any, type: string, handler: (event: R) => void, eventMerger?: IEventMerger<R, E>, minimumTimeMs?: number): IDisposable;
export declare function getComputedStyle(el: HTMLElement): CSSStyleDeclaration;
export declare function getClientArea(element: HTMLElement): Dimension;
export declare class Dimension {
    width: number;
    height: number;
    constructor(width: number, height: number);
    static equals(a: Dimension | undefined, b: Dimension | undefined): boolean;
}
export declare function getTopLeftOffset(element: HTMLElement): {
    left: number;
    top: number;
};
export interface IDomNodePagePosition {
    left: number;
    top: number;
    width: number;
    height: number;
}
export declare function size(element: HTMLElement, width: number | null, height: number | null): void;
export declare function position(element: HTMLElement, top: number, right?: number, bottom?: number, left?: number, position?: string): void;
/**
 * Returns the position of a dom node relative to the entire page.
 */
export declare function getDomNodePagePosition(domNode: HTMLElement): IDomNodePagePosition;
export interface IStandardWindow {
    readonly scrollX: number;
    readonly scrollY: number;
}
export declare const StandardWindow: IStandardWindow;
export declare function getTotalWidth(element: HTMLElement): number;
export declare function getContentWidth(element: HTMLElement): number;
export declare function getTotalScrollWidth(element: HTMLElement): number;
export declare function getContentHeight(element: HTMLElement): number;
export declare function getTotalHeight(element: HTMLElement): number;
export declare function getLargestChildWidth(parent: HTMLElement, children: HTMLElement[]): number;
export declare function isAncestor(testChild: Node | null, testAncestor: Node | null): boolean;
export declare function findParentWithClass(node: HTMLElement, clazz: string, stopAtClazzOrNode?: string | HTMLElement): HTMLElement | null;
export declare function createStyleSheet(container?: HTMLElement): HTMLStyleElement;
export declare function createCSSRule(selector: string, cssText: string, style?: HTMLStyleElement): void;
export declare function removeCSSRulesContainingSelector(ruleName: string, style?: HTMLStyleElement): void;
export declare function isHTMLElement(o: any): o is HTMLElement;
export declare const EventType: {
    CLICK: string;
    DBLCLICK: string;
    MOUSE_UP: string;
    MOUSE_DOWN: string;
    MOUSE_OVER: string;
    MOUSE_MOVE: string;
    MOUSE_OUT: string;
    MOUSE_ENTER: string;
    MOUSE_LEAVE: string;
    CONTEXT_MENU: string;
    WHEEL: string;
    KEY_DOWN: string;
    KEY_PRESS: string;
    KEY_UP: string;
    LOAD: string;
    UNLOAD: string;
    ABORT: string;
    ERROR: string;
    RESIZE: string;
    SCROLL: string;
    SELECT: string;
    CHANGE: string;
    SUBMIT: string;
    RESET: string;
    FOCUS: string;
    FOCUS_IN: string;
    FOCUS_OUT: string;
    BLUR: string;
    INPUT: string;
    STORAGE: string;
    DRAG_START: string;
    DRAG: string;
    DRAG_ENTER: string;
    DRAG_LEAVE: string;
    DRAG_OVER: string;
    DROP: string;
    DRAG_END: string;
    ANIMATION_START: string;
    ANIMATION_END: string;
    ANIMATION_ITERATION: string;
};
export interface EventLike {
    preventDefault(): void;
    stopPropagation(): void;
}
export declare const EventHelper: {
    stop: (e: EventLike, cancelBubble?: boolean) => void;
};
export interface IFocusTracker {
    onDidFocus: Event<void>;
    onDidBlur: Event<void>;
    dispose(): void;
}
export declare function saveParentsScrollTop(node: Element): number[];
export declare function restoreParentsScrollTop(node: Element, state: number[]): void;
export declare function trackFocus(element: HTMLElement | Window): IFocusTracker;
export declare function append<T extends Node>(parent: HTMLElement, ...children: T[]): T;
export declare function prepend<T extends Node>(parent: HTMLElement, child: T): T;
export declare function $<T extends HTMLElement>(description: string, attrs?: {
    [key: string]: any;
}, ...children: Array<Node | string>): T;
export declare function join(nodes: Node[], separator: Node | string): Node[];
export declare function show(...elements: HTMLElement[]): void;
export declare function hide(...elements: HTMLElement[]): void;
export declare function removeTabIndexAndUpdateFocus(node: HTMLElement): void;
export declare function getElementsByTagName(tag: string): HTMLElement[];
export declare function finalHandler<T extends DOMEvent>(fn: (event: T) => any): (event: T) => any;
export declare function domContentLoaded(): Promise<any>;
/**
 * Find a value usable for a dom node size such that the likelihood that it would be
 * displayed with constant screen pixels size is as high as possible.
 *
 * e.g. We would desire for the cursors to be 2px (CSS px) wide. Under a devicePixelRatio
 * of 1.25, the cursor will be 2.5 screen pixels wide. Depending on how the dom node aligns/"snaps"
 * with the screen pixels, it will sometimes be rendered with 2 screen pixels, and sometimes with 3 screen pixels.
 */
export declare function computeScreenAwareSize(cssPx: number): number;
/**
 * See https://github.com/Microsoft/monaco-editor/issues/601
 * To protect against malicious code in the linked site, particularly phishing attempts,
 * the window.opener should be set to null to prevent the linked site from having access
 * to change the location of the current page.
 * See https://mathiasbynens.github.io/rel-noopener/
 */
export declare function windowOpenNoOpener(url: string): void;
export declare function animate(fn: () => void): IDisposable;
