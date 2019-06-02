import './list.css';
import { IDisposable } from 'base/common/lifecycle';
import { IKeyboardEvent } from 'base/browser/keyboardEvent';
import { Event } from 'base/common/event';
import { IListVirtualDelegate, IListRenderer, IListEvent, IListContextMenuEvent, IListMouseEvent, IListTouchEvent, IListGestureEvent, IIdentityProvider, IKeyboardNavigationLabelProvider, IListDragAndDrop, ListAriaRootRole } from './list';
import { IAriaSetProvider } from './listView';
import { Color } from 'base/common/color';
import { ScrollbarVisibility, ScrollEvent } from 'base/common/scrollable';
import { ISpliceable } from 'base/common/sequence';
export declare function mightProducePrintableCharacter(event: IKeyboardEvent): boolean;
export declare function isSelectionSingleChangeEvent(event: IListMouseEvent<any> | IListTouchEvent<any>): boolean;
export declare function isSelectionRangeChangeEvent(event: IListMouseEvent<any> | IListTouchEvent<any>): boolean;
export declare class MouseController<T> implements IDisposable {
    protected list: List<T>;
    private multipleSelectionSupport;
    readonly multipleSelectionController: IMultipleSelectionController<T>;
    private openController;
    private mouseSupport;
    private disposables;
    constructor(list: List<T>);
    protected isSelectionSingleChangeEvent(event: IListMouseEvent<any> | IListTouchEvent<any>): boolean;
    protected isSelectionRangeChangeEvent(event: IListMouseEvent<any> | IListTouchEvent<any>): boolean;
    private isSelectionChangeEvent;
    private onMouseDown;
    private onContextMenu;
    protected onPointer(e: IListMouseEvent<T>): void;
    private onDoubleClick;
    private changeSelection;
    dispose(): void;
}
export interface IMultipleSelectionController<T> {
    isSelectionSingleChangeEvent(event: IListMouseEvent<T> | IListTouchEvent<T>): boolean;
    isSelectionRangeChangeEvent(event: IListMouseEvent<T> | IListTouchEvent<T>): boolean;
}
export interface IOpenController {
    shouldOpen(event: UIEvent): boolean;
}
export interface IStyleController {
    style(styles: IListStyles): void;
}
export interface IAccessibilityProvider<T> {
    /**
     * Given an element in the tree, return the ARIA label that should be associated with the
     * item. This helps screen readers to provide a meaningful label for the currently focused
     * tree element.
     *
     * Returning null will not disable ARIA for the element. Instead it is up to the screen reader
     * to compute a meaningful label based on the contents of the element in the DOM
     *
     * See also: https://www.w3.org/TR/wai-aria/#aria-label
     */
    getAriaLabel(element: T): string | null;
    /**
     * https://www.w3.org/TR/wai-aria/#aria-level
     */
    getAriaLevel?(element: T): number | undefined;
}
export declare class DefaultStyleController implements IStyleController {
    private styleElement;
    private selectorSuffix?;
    constructor(styleElement: HTMLStyleElement, selectorSuffix?: string);
    style(styles: IListStyles): void;
}
export interface IListOptions<T> extends IListStyles {
    readonly identityProvider?: IIdentityProvider<T>;
    readonly dnd?: IListDragAndDrop<T>;
    readonly enableKeyboardNavigation?: boolean;
    readonly automaticKeyboardNavigation?: boolean;
    readonly keyboardNavigationLabelProvider?: IKeyboardNavigationLabelProvider<T>;
    readonly ariaRole?: ListAriaRootRole;
    readonly ariaLabel?: string;
    readonly keyboardSupport?: boolean;
    readonly multipleSelectionSupport?: boolean;
    readonly multipleSelectionController?: IMultipleSelectionController<T>;
    readonly openController?: IOpenController;
    readonly styleController?: IStyleController;
    readonly accessibilityProvider?: IAccessibilityProvider<T>;
    readonly useShadows?: boolean;
    readonly verticalScrollMode?: ScrollbarVisibility;
    readonly setRowLineHeight?: boolean;
    readonly supportDynamicHeights?: boolean;
    readonly mouseSupport?: boolean;
    readonly horizontalScrolling?: boolean;
    readonly ariaSetProvider?: IAriaSetProvider<T>;
}
export interface IListStyles {
    listFocusBackground?: Color;
    listFocusForeground?: Color;
    listActiveSelectionBackground?: Color;
    listActiveSelectionForeground?: Color;
    listFocusAndSelectionBackground?: Color;
    listFocusAndSelectionForeground?: Color;
    listInactiveSelectionBackground?: Color;
    listInactiveSelectionForeground?: Color;
    listInactiveFocusBackground?: Color;
    listHoverBackground?: Color;
    listHoverForeground?: Color;
    listDropBackground?: Color;
    listFocusOutline?: Color;
    listInactiveFocusOutline?: Color;
    listSelectionOutline?: Color;
    listHoverOutline?: Color;
    listFilterWidgetBackground?: Color;
    listFilterWidgetOutline?: Color;
    listFilterWidgetNoMatchesOutline?: Color;
    listMatchesShadow?: Color;
}
export interface IListOptionsUpdate {
    readonly enableKeyboardNavigation?: boolean;
    readonly automaticKeyboardNavigation?: boolean;
}
export declare class List<T> implements ISpliceable<T>, IDisposable {
    private _options;
    private focus;
    private selection;
    private eventBufferer;
    private view;
    private spliceable;
    private styleElement;
    private styleController;
    private typeLabelController?;
    protected disposables: IDisposable[];
    readonly onFocusChange: Event<IListEvent<T>>;
    readonly onSelectionChange: Event<IListEvent<T>>;
    private _onDidOpen;
    readonly onDidOpen: Event<IListEvent<T>>;
    private _onPin;
    readonly onPin: Event<IListEvent<T>>;
    readonly onDidScroll: Event<ScrollEvent>;
    readonly onMouseClick: Event<IListMouseEvent<T>>;
    readonly onMouseDblClick: Event<IListMouseEvent<T>>;
    readonly onMouseMiddleClick: Event<IListMouseEvent<T>>;
    readonly onMouseUp: Event<IListMouseEvent<T>>;
    readonly onMouseDown: Event<IListMouseEvent<T>>;
    readonly onMouseOver: Event<IListMouseEvent<T>>;
    readonly onMouseMove: Event<IListMouseEvent<T>>;
    readonly onMouseOut: Event<IListMouseEvent<T>>;
    readonly onTouchStart: Event<IListTouchEvent<T>>;
    readonly onTap: Event<IListGestureEvent<T>>;
    private didJustPressContextMenuKey;
    readonly onContextMenu: Event<IListContextMenuEvent<T>>;
    readonly onKeyDown: Event<KeyboardEvent>;
    readonly onKeyUp: Event<KeyboardEvent>;
    readonly onKeyPress: Event<KeyboardEvent>;
    readonly onDidFocus: Event<void>;
    readonly onDidBlur: Event<void>;
    private _onDidDispose;
    readonly onDidDispose: Event<void>;
    constructor(container: HTMLElement, virtualDelegate: IListVirtualDelegate<T>, renderers: IListRenderer<any, any>[], _options?: IListOptions<T>);
    protected createMouseController(options: IListOptions<T>): MouseController<T>;
    updateOptions(optionsUpdate?: IListOptionsUpdate): void;
    readonly options: IListOptions<T>;
    splice(start: number, deleteCount: number, elements?: T[]): void;
    updateWidth(index: number): void;
    rerender(): void;
    element(index: number): T;
    readonly length: number;
    readonly contentHeight: number;
    readonly onDidChangeContentHeight: Event<number>;
    scrollTop: number;
    readonly scrollHeight: number;
    readonly renderHeight: number;
    readonly firstVisibleIndex: number;
    readonly lastVisibleIndex: number;
    domFocus(): void;
    layout(height?: number, width?: number): void;
    toggleKeyboardNavigation(): void;
    setSelection(indexes: number[], browserEvent?: UIEvent): void;
    getSelection(): number[];
    getSelectedElements(): T[];
    setFocus(indexes: number[], browserEvent?: UIEvent): void;
    focusNext(n?: number, loop?: boolean, browserEvent?: UIEvent, filter?: (element: T) => boolean): void;
    focusPrevious(n?: number, loop?: boolean, browserEvent?: UIEvent, filter?: (element: T) => boolean): void;
    focusNextPage(browserEvent?: UIEvent, filter?: (element: T) => boolean): void;
    focusPreviousPage(browserEvent?: UIEvent, filter?: (element: T) => boolean): void;
    focusLast(browserEvent?: UIEvent, filter?: (element: T) => boolean): void;
    focusFirst(browserEvent?: UIEvent, filter?: (element: T) => boolean): void;
    private findNextIndex;
    private findPreviousIndex;
    getFocus(): number[];
    getFocusedElements(): T[];
    reveal(index: number, relativeTop?: number): void;
    /**
     * Returns the relative position of an element rendered in the list.
     * Returns `null` if the element isn't *entirely* in the visible viewport.
     */
    getRelativeTop(index: number): number | null;
    isDOMFocused(): boolean;
    getHTMLElement(): HTMLElement;
    open(indexes: number[], browserEvent?: UIEvent): void;
    pin(indexes: number[]): void;
    style(styles: IListStyles): void;
    private toListEvent;
    private _onFocusChange;
    private _onSelectionChange;
    dispose(): void;
}
