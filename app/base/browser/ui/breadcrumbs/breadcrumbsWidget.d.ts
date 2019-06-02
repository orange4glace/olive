import * as dom from 'base/browser/dom';
import { Color } from 'base/common/color';
import { Event } from 'base/common/event';
import './breadcrumbsWidget.css';
export declare abstract class BreadcrumbsItem {
    dispose(): void;
    abstract equals(other: BreadcrumbsItem): boolean;
    abstract render(container: HTMLElement): void;
}
export declare class SimpleBreadcrumbsItem extends BreadcrumbsItem {
    readonly text: string;
    readonly title: string;
    constructor(text: string, title?: string);
    equals(other: this): boolean;
    render(container: HTMLElement): void;
}
export interface IBreadcrumbsWidgetStyles {
    breadcrumbsBackground?: Color;
    breadcrumbsForeground?: Color;
    breadcrumbsHoverForeground?: Color;
    breadcrumbsFocusForeground?: Color;
    breadcrumbsFocusAndSelectionForeground?: Color;
}
export interface IBreadcrumbsItemEvent {
    type: 'select' | 'focus';
    item: BreadcrumbsItem;
    node: HTMLElement;
    payload: any;
}
export declare class BreadcrumbsWidget {
    private readonly _disposables;
    private readonly _domNode;
    private readonly _styleElement;
    private readonly _scrollable;
    private readonly _onDidSelectItem;
    private readonly _onDidFocusItem;
    private readonly _onDidChangeFocus;
    readonly onDidSelectItem: Event<IBreadcrumbsItemEvent>;
    readonly onDidFocusItem: Event<IBreadcrumbsItemEvent>;
    readonly onDidChangeFocus: Event<boolean>;
    private readonly _items;
    private readonly _nodes;
    private readonly _freeNodes;
    private _focusedItemIdx;
    private _selectedItemIdx;
    private _pendingLayout;
    private _dimension;
    constructor(container: HTMLElement);
    dispose(): void;
    layout(dim: dom.Dimension | undefined): void;
    private _updateDimensions;
    private _updateScrollbar;
    style(style: IBreadcrumbsWidgetStyles): void;
    domFocus(): void;
    isDOMFocused(): boolean;
    getFocused(): BreadcrumbsItem;
    setFocused(item: BreadcrumbsItem | undefined, payload?: any): void;
    focusPrev(payload?: any): any;
    focusNext(payload?: any): any;
    private _focus;
    reveal(item: BreadcrumbsItem): void;
    private _reveal;
    getSelection(): BreadcrumbsItem;
    setSelection(item: BreadcrumbsItem | undefined, payload?: any): void;
    private _select;
    getItems(): BreadcrumbsItem[];
    setItems(items: BreadcrumbsItem[]): void;
    private _render;
    private _renderItem;
    private _onClick;
}
