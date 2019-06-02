import { IDisposable } from 'base/common/lifecycle';
import { Event } from 'base/common/event';
import { ScrollEvent, ScrollbarVisibility } from 'base/common/scrollable';
import { IListVirtualDelegate, IListRenderer, IListMouseEvent, IListTouchEvent, IListGestureEvent, IListDragAndDrop } from './list';
import { ISpliceable } from 'base/common/sequence';
import { IDragAndDropData } from 'base/browser/dnd';
export interface IListViewDragAndDrop<T> extends IListDragAndDrop<T> {
    getDragElements(element: T): T[];
}
export interface IAriaSetProvider<T> {
    getSetSize(element: T, index: number, listLength: number): number;
    getPosInSet(element: T, index: number): number;
}
export interface IListViewOptions<T> {
    readonly dnd?: IListViewDragAndDrop<T>;
    readonly useShadows?: boolean;
    readonly verticalScrollMode?: ScrollbarVisibility;
    readonly setRowLineHeight?: boolean;
    readonly supportDynamicHeights?: boolean;
    readonly mouseSupport?: boolean;
    readonly horizontalScrolling?: boolean;
    readonly ariaSetProvider?: IAriaSetProvider<T>;
}
export declare class ElementsDragAndDropData<T> implements IDragAndDropData {
    readonly elements: T[];
    constructor(elements: T[]);
    update(): void;
    getData(): any;
}
export declare class ExternalElementsDragAndDropData<T> implements IDragAndDropData {
    readonly elements: T[];
    constructor(elements: T[]);
    update(): void;
    getData(): any;
}
export declare class DesktopDragAndDropData implements IDragAndDropData {
    readonly types: any[];
    readonly files: any[];
    constructor();
    update(dataTransfer: DataTransfer): void;
    getData(): any;
}
export declare class ListView<T> implements ISpliceable<T>, IDisposable {
    private virtualDelegate;
    private static InstanceCount;
    readonly domId: string;
    readonly domNode: HTMLElement;
    private items;
    private itemId;
    private rangeMap;
    private cache;
    private renderers;
    private lastRenderTop;
    private lastRenderHeight;
    private renderWidth;
    private gesture;
    private rowsContainer;
    private scrollableElement;
    private _scrollHeight;
    private scrollableElementUpdateDisposable;
    private scrollableElementWidthDelayer;
    private splicing;
    private dragOverAnimationDisposable;
    private dragOverAnimationStopDisposable;
    private dragOverMouseY;
    private setRowLineHeight;
    private supportDynamicHeights;
    private horizontalScrolling;
    private ariaSetProvider;
    private scrollWidth;
    private canUseTranslate3d;
    private dnd;
    private canDrop;
    private currentDragData;
    private currentDragFeedback;
    private currentDragFeedbackDisposable;
    private onDragLeaveTimeout;
    private disposables;
    private _onDidChangeContentHeight;
    readonly onDidChangeContentHeight: Event<number>;
    readonly contentHeight: number;
    readonly onDidScroll: Event<ScrollEvent>;
    constructor(container: HTMLElement, virtualDelegate: IListVirtualDelegate<T>, renderers: IListRenderer<any, any>[], options?: IListViewOptions<T>);
    splice(start: number, deleteCount: number, elements?: T[]): T[];
    private _splice;
    private eventuallyUpdateScrollDimensions;
    private eventuallyUpdateScrollWidth;
    private updateScrollWidth;
    updateWidth(index: number): void;
    rerender(): void;
    readonly length: number;
    readonly renderHeight: number;
    readonly firstVisibleIndex: number;
    readonly lastVisibleIndex: number;
    element(index: number): T;
    domElement(index: number): HTMLElement | null;
    elementHeight(index: number): number;
    elementTop(index: number): number;
    indexAt(position: number): number;
    indexAfter(position: number): number;
    layout(height?: number, width?: number): void;
    private render;
    private insertItemInDOM;
    private measureItemWidth;
    private updateItemInDOM;
    private removeItemFromDOM;
    getScrollTop(): number;
    setScrollTop(scrollTop: number): void;
    scrollTop: number;
    readonly scrollHeight: number;
    readonly onMouseClick: Event<IListMouseEvent<T>>;
    readonly onMouseDblClick: Event<IListMouseEvent<T>>;
    readonly onMouseMiddleClick: Event<IListMouseEvent<T>>;
    readonly onMouseUp: Event<IListMouseEvent<T>>;
    readonly onMouseDown: Event<IListMouseEvent<T>>;
    readonly onMouseOver: Event<IListMouseEvent<T>>;
    readonly onMouseMove: Event<IListMouseEvent<T>>;
    readonly onMouseOut: Event<IListMouseEvent<T>>;
    readonly onContextMenu: Event<IListMouseEvent<T>>;
    readonly onTouchStart: Event<IListTouchEvent<T>>;
    readonly onTap: Event<IListGestureEvent<T>>;
    private toMouseEvent;
    private toTouchEvent;
    private toGestureEvent;
    private toDragEvent;
    private onScroll;
    private onTouchChange;
    private onDragStart;
    private onDragOver;
    private onDragLeave;
    private onDrop;
    private onDragEnd;
    private clearDragOverFeedback;
    private setupDragAndDropScrollTopAnimation;
    private animateDragAndDropScrollTop;
    private teardownDragAndDropScrollTopAnimation;
    private getItemIndexFromEventTarget;
    private getRenderRange;
    /**
     * Given a stable rendered state, checks every rendered element whether it needs
     * to be probed for dynamic height. Adjusts scroll height and top if necessary.
     */
    private _rerender;
    private probeDynamicHeight;
    private getNextToLastElement;
    getElementDomId(index: number): string;
    dispose(): void;
}
