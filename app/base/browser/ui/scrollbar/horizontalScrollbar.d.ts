import { AbstractScrollbar, ISimplifiedMouseEvent, ScrollbarHost } from 'base/browser/ui/scrollbar/abstractScrollbar';
import { ScrollableElementResolvedOptions } from 'base/browser/ui/scrollbar/scrollableElementOptions';
import { INewScrollPosition, ScrollEvent, Scrollable } from 'base/common/scrollable';
export declare class HorizontalScrollbar extends AbstractScrollbar {
    constructor(scrollable: Scrollable, options: ScrollableElementResolvedOptions, host: ScrollbarHost);
    protected _updateSlider(sliderSize: number, sliderPosition: number): void;
    protected _renderDomNode(largeSize: number, smallSize: number): void;
    onDidScroll(e: ScrollEvent): boolean;
    protected _mouseDownRelativePosition(offsetX: number, offsetY: number): number;
    protected _sliderMousePosition(e: ISimplifiedMouseEvent): number;
    protected _sliderOrthogonalMousePosition(e: ISimplifiedMouseEvent): number;
    writeScrollPosition(target: INewScrollPosition, scrollPosition: number): void;
}
