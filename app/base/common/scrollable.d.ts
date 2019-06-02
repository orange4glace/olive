import { Event } from 'base/common/event';
import { Disposable, IDisposable } from 'base/common/lifecycle';
export declare enum ScrollbarVisibility {
    Auto = 1,
    Hidden = 2,
    Visible = 3
}
export interface ScrollEvent {
    width: number;
    scrollWidth: number;
    scrollLeft: number;
    height: number;
    scrollHeight: number;
    scrollTop: number;
    widthChanged: boolean;
    scrollWidthChanged: boolean;
    scrollLeftChanged: boolean;
    heightChanged: boolean;
    scrollHeightChanged: boolean;
    scrollTopChanged: boolean;
}
export declare class ScrollState implements IScrollDimensions, IScrollPosition {
    _scrollStateBrand: void;
    readonly width: number;
    readonly scrollWidth: number;
    readonly scrollLeft: number;
    readonly height: number;
    readonly scrollHeight: number;
    readonly scrollTop: number;
    constructor(width: number, scrollWidth: number, scrollLeft: number, height: number, scrollHeight: number, scrollTop: number);
    equals(other: ScrollState): boolean;
    withScrollDimensions(update: INewScrollDimensions): ScrollState;
    withScrollPosition(update: INewScrollPosition): ScrollState;
    createScrollEvent(previous: ScrollState): ScrollEvent;
}
export interface IScrollDimensions {
    readonly width: number;
    readonly scrollWidth: number;
    readonly height: number;
    readonly scrollHeight: number;
}
export interface INewScrollDimensions {
    width?: number;
    scrollWidth?: number;
    height?: number;
    scrollHeight?: number;
}
export interface IScrollPosition {
    readonly scrollLeft: number;
    readonly scrollTop: number;
}
export interface ISmoothScrollPosition {
    readonly scrollLeft: number;
    readonly scrollTop: number;
    readonly width: number;
    readonly height: number;
}
export interface INewScrollPosition {
    scrollLeft?: number;
    scrollTop?: number;
}
export declare class Scrollable extends Disposable {
    _scrollableBrand: void;
    private _smoothScrollDuration;
    private readonly _scheduleAtNextAnimationFrame;
    private _state;
    private _smoothScrolling;
    private _onScroll;
    readonly onScroll: Event<ScrollEvent>;
    constructor(smoothScrollDuration: number, scheduleAtNextAnimationFrame: (callback: () => void) => IDisposable);
    dispose(): void;
    setSmoothScrollDuration(smoothScrollDuration: number): void;
    validateScrollPosition(scrollPosition: INewScrollPosition): IScrollPosition;
    getScrollDimensions(): IScrollDimensions;
    setScrollDimensions(dimensions: INewScrollDimensions): void;
    /**
     * Returns the final scroll position that the instance will have once the smooth scroll animation concludes.
     * If no scroll animation is occurring, it will return the current scroll position instead.
     */
    getFutureScrollPosition(): IScrollPosition;
    /**
     * Returns the current scroll position.
     * Note: This result might be an intermediate scroll position, as there might be an ongoing smooth scroll animation.
     */
    getCurrentScrollPosition(): IScrollPosition;
    setScrollPositionNow(update: INewScrollPosition): void;
    setScrollPositionSmooth(update: INewScrollPosition): void;
    private _performSmoothScrolling;
    private _setState;
}
export declare class SmoothScrollingUpdate {
    readonly scrollLeft: number;
    readonly scrollTop: number;
    readonly isDone: boolean;
    constructor(scrollLeft: number, scrollTop: number, isDone: boolean);
}
export interface IAnimation {
    (completion: number): number;
}
export declare class SmoothScrollingOperation {
    readonly from: ISmoothScrollPosition;
    to: ISmoothScrollPosition;
    readonly duration: number;
    private readonly _startTime;
    animationFrameDisposable: IDisposable | null;
    private scrollLeft;
    private scrollTop;
    protected constructor(from: ISmoothScrollPosition, to: ISmoothScrollPosition, startTime: number, duration: number);
    private _initAnimations;
    private _initAnimation;
    dispose(): void;
    acceptScrollDimensions(state: ScrollState): void;
    tick(): SmoothScrollingUpdate;
    protected _tick(now: number): SmoothScrollingUpdate;
    combine(from: ISmoothScrollPosition, to: ISmoothScrollPosition, duration: number): SmoothScrollingOperation;
    static start(from: ISmoothScrollPosition, to: ISmoothScrollPosition, duration: number): SmoothScrollingOperation;
}
