import './list.css';
import { IDisposable } from 'base/common/lifecycle';
import { IListVirtualDelegate, IListRenderer, IListEvent, IListContextMenuEvent } from './list';
import { List, IListStyles, IListOptions } from './listWidget';
import { IPagedModel } from 'base/common/paging';
import { Event } from 'base/common/event';
export interface IPagedRenderer<TElement, TTemplateData> extends IListRenderer<TElement, TTemplateData> {
    renderPlaceholder(index: number, templateData: TTemplateData): void;
}
export interface ITemplateData<T> {
    data?: T;
    disposable?: IDisposable;
}
export declare class PagedList<T> implements IDisposable {
    private list;
    private _model;
    constructor(container: HTMLElement, virtualDelegate: IListVirtualDelegate<number>, renderers: IPagedRenderer<T, any>[], options?: IListOptions<any>);
    getHTMLElement(): HTMLElement;
    isDOMFocused(): boolean;
    domFocus(): void;
    readonly onDidFocus: Event<void>;
    readonly onDidBlur: Event<void>;
    readonly widget: List<number>;
    readonly onDidDispose: Event<void>;
    readonly onFocusChange: Event<IListEvent<T>>;
    readonly onOpen: Event<IListEvent<T>>;
    readonly onSelectionChange: Event<IListEvent<T>>;
    readonly onPin: Event<IListEvent<T>>;
    readonly onContextMenu: Event<IListContextMenuEvent<T>>;
    model: IPagedModel<T>;
    readonly length: number;
    scrollTop: number;
    open(indexes: number[], browserEvent?: UIEvent): void;
    setFocus(indexes: number[]): void;
    focusNext(n?: number, loop?: boolean): void;
    focusPrevious(n?: number, loop?: boolean): void;
    focusNextPage(): void;
    focusPreviousPage(): void;
    getFocus(): number[];
    setSelection(indexes: number[]): void;
    getSelection(): number[];
    layout(height?: number, width?: number): void;
    toggleKeyboardNavigation(): void;
    reveal(index: number, relativeTop?: number): void;
    style(styles: IListStyles): void;
    dispose(): void;
}
