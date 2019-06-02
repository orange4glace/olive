import './media/scrollbars.css';
import { IMouseEvent } from 'base/browser/mouseEvent';
import { ScrollableElementChangeOptions, ScrollableElementCreationOptions } from 'base/browser/ui/scrollbar/scrollableElementOptions';
import { Widget } from 'base/browser/ui/widget';
import { Event } from 'base/common/event';
import { INewScrollDimensions, INewScrollPosition, IScrollDimensions, IScrollPosition, ScrollEvent, Scrollable } from 'base/common/scrollable';
export interface IOverviewRulerLayoutInfo {
    parent: HTMLElement;
    insertBefore: HTMLElement;
}
export declare class MouseWheelClassifier {
    static readonly INSTANCE: MouseWheelClassifier;
    private readonly _capacity;
    private _memory;
    private _front;
    private _rear;
    constructor();
    isPhysicalMouseWheel(): boolean;
    accept(timestamp: number, deltaX: number, deltaY: number): void;
    /**
     * A score between 0 and 1 for `item`.
     *  - a score towards 0 indicates that the source appears to be a physical mouse wheel
     *  - a score towards 1 indicates that the source appears to be a touchpad or magic mouse, etc.
     */
    private _computeScore;
}
export declare abstract class AbstractScrollableElement extends Widget {
    private readonly _options;
    protected readonly _scrollable: Scrollable;
    private readonly _verticalScrollbar;
    private readonly _horizontalScrollbar;
    private readonly _domNode;
    private readonly _leftShadowDomNode;
    private readonly _topShadowDomNode;
    private readonly _topLeftShadowDomNode;
    private readonly _listenOnDomNode;
    private _mouseWheelToDispose;
    private _isDragging;
    private _mouseIsOver;
    private readonly _hideTimeout;
    private _shouldRender;
    private _revealOnScroll;
    private readonly _onScroll;
    readonly onScroll: Event<ScrollEvent>;
    protected constructor(element: HTMLElement, options: ScrollableElementCreationOptions, scrollable: Scrollable);
    dispose(): void;
    /**
     * Get the generated 'scrollable' dom node
     */
    getDomNode(): HTMLElement;
    getOverviewRulerLayoutInfo(): IOverviewRulerLayoutInfo;
    /**
     * Delegate a mouse down event to the vertical scrollbar.
     * This is to help with clicking somewhere else and having the scrollbar react.
     */
    delegateVerticalScrollbarMouseDown(browserEvent: IMouseEvent): void;
    getScrollDimensions(): IScrollDimensions;
    setScrollDimensions(dimensions: INewScrollDimensions): void;
    /**
     * Update the class name of the scrollable element.
     */
    updateClassName(newClassName: string): void;
    /**
     * Update configuration options for the scrollbar.
     * Really this is Editor.IEditorScrollbarOptions, but base shouldn't
     * depend on Editor.
     */
    updateOptions(newOptions: ScrollableElementChangeOptions): void;
    setRevealOnScroll(value: boolean): void;
    private _setListeningToMouseWheel;
    private _onMouseWheel;
    private _onDidScroll;
    /**
     * Render / mutate the DOM now.
     * Should be used together with the ctor option `lazyRender`.
     */
    renderNow(): void;
    private _render;
    private _onDragStart;
    private _onDragEnd;
    private _onMouseOut;
    private _onMouseOver;
    private _reveal;
    private _hide;
    private _scheduleHide;
}
export declare class ScrollableElement extends AbstractScrollableElement {
    constructor(element: HTMLElement, options: ScrollableElementCreationOptions);
    setScrollPosition(update: INewScrollPosition): void;
    getScrollPosition(): IScrollPosition;
}
export declare class SmoothScrollableElement extends AbstractScrollableElement {
    constructor(element: HTMLElement, options: ScrollableElementCreationOptions, scrollable: Scrollable);
}
export declare class DomScrollableElement extends ScrollableElement {
    private _element;
    constructor(element: HTMLElement, options: ScrollableElementCreationOptions);
    scanDomNode(): void;
}
