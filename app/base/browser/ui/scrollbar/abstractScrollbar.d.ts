import { FastDomNode } from 'base/browser/fastDomNode';
import { IMouseEvent, StandardWheelEvent } from 'base/browser/mouseEvent';
import { ScrollbarArrowOptions } from 'base/browser/ui/scrollbar/scrollbarArrow';
import { ScrollbarState } from 'base/browser/ui/scrollbar/scrollbarState';
import { Widget } from 'base/browser/ui/widget';
import { INewScrollPosition, Scrollable, ScrollbarVisibility } from 'base/common/scrollable';
export interface ISimplifiedMouseEvent {
    posx: number;
    posy: number;
}
export interface ScrollbarHost {
    onMouseWheel(mouseWheelEvent: StandardWheelEvent): void;
    onDragStart(): void;
    onDragEnd(): void;
}
export interface AbstractScrollbarOptions {
    lazyRender: boolean;
    host: ScrollbarHost;
    scrollbarState: ScrollbarState;
    visibility: ScrollbarVisibility;
    extraScrollbarClassName: string;
    scrollable: Scrollable;
}
export declare abstract class AbstractScrollbar extends Widget {
    protected _host: ScrollbarHost;
    protected _scrollable: Scrollable;
    private _lazyRender;
    protected _scrollbarState: ScrollbarState;
    private _visibilityController;
    private _mouseMoveMonitor;
    domNode: FastDomNode<HTMLElement>;
    slider: FastDomNode<HTMLElement>;
    protected _shouldRender: boolean;
    constructor(opts: AbstractScrollbarOptions);
    /**
     * Creates the dom node for an arrow & adds it to the container
     */
    protected _createArrow(opts: ScrollbarArrowOptions): void;
    /**
     * Creates the slider dom node, adds it to the container & hooks up the events
     */
    protected _createSlider(top: number, left: number, width: number | undefined, height: number | undefined): void;
    protected _onElementSize(visibleSize: number): boolean;
    protected _onElementScrollSize(elementScrollSize: number): boolean;
    protected _onElementScrollPosition(elementScrollPosition: number): boolean;
    beginReveal(): void;
    beginHide(): void;
    render(): void;
    private _domNodeMouseDown;
    delegateMouseDown(e: IMouseEvent): void;
    private _onMouseDown;
    private _sliderMouseDown;
    private _setDesiredScrollPositionNow;
    protected abstract _renderDomNode(largeSize: number, smallSize: number): void;
    protected abstract _updateSlider(sliderSize: number, sliderPosition: number): void;
    protected abstract _mouseDownRelativePosition(offsetX: number, offsetY: number): number;
    protected abstract _sliderMousePosition(e: ISimplifiedMouseEvent): number;
    protected abstract _sliderOrthogonalMousePosition(e: ISimplifiedMouseEvent): number;
    abstract writeScrollPosition(target: INewScrollPosition, scrollPosition: number): void;
}
