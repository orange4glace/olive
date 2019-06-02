import { IAbstractTreeOptions, IAbstractTreeOptionsUpdate } from 'base/browser/ui/tree/abstractTree';
import { IListVirtualDelegate, IIdentityProvider } from 'base/browser/ui/list/list';
import { ITreeNode, ITreeRenderer, ITreeEvent, ITreeMouseEvent, ITreeContextMenuEvent, ITreeSorter, IAsyncDataSource } from 'base/browser/ui/tree/tree';
import { IDisposable } from 'base/common/lifecycle';
import { Event } from 'base/common/event';
import { IListStyles } from 'base/browser/ui/list/listWidget';
import { ScrollEvent } from 'base/common/scrollable';
interface IAsyncDataTreeNode<TInput, T> {
    element: TInput | T;
    readonly parent: IAsyncDataTreeNode<TInput, T> | null;
    readonly children: IAsyncDataTreeNode<TInput, T>[];
    readonly id?: string | null;
    loading: boolean;
    hasChildren: boolean;
    stale: boolean;
    slow: boolean;
}
export declare enum ChildrenResolutionReason {
    Refresh = 0,
    Expand = 1
}
export interface IChildrenResolutionEvent<T> {
    readonly element: T | null;
    readonly reason: ChildrenResolutionReason;
}
export interface IAsyncDataTreeOptionsUpdate extends IAbstractTreeOptionsUpdate {
}
export interface IAsyncDataTreeOptions<T, TFilterData = void> extends IAsyncDataTreeOptionsUpdate, IAbstractTreeOptions<T, TFilterData> {
    identityProvider?: IIdentityProvider<T>;
    sorter?: ITreeSorter<T>;
    autoExpandSingleChildren?: boolean;
}
export interface IAsyncDataTreeViewState {
    readonly focus?: string[];
    readonly selection?: string[];
    readonly expanded?: string[];
    readonly scrollTop?: number;
}
interface IAsyncDataTreeViewStateContext<TInput, T> {
    readonly viewState: IAsyncDataTreeViewState;
    readonly selection: IAsyncDataTreeNode<TInput, T>[];
    readonly focus: IAsyncDataTreeNode<TInput, T>[];
}
export declare class AsyncDataTree<TInput, T, TFilterData = void> implements IDisposable {
    private dataSource;
    private readonly tree;
    private readonly root;
    private readonly nodes;
    private readonly sorter?;
    private readonly subTreeRefreshPromises;
    private readonly refreshPromises;
    private readonly identityProvider?;
    private readonly autoExpandSingleChildren;
    private readonly _onDidRender;
    private readonly _onDidChangeNodeSlowState;
    protected readonly disposables: IDisposable[];
    readonly onDidScroll: Event<ScrollEvent>;
    readonly onDidChangeFocus: Event<ITreeEvent<T>>;
    readonly onDidChangeSelection: Event<ITreeEvent<T>>;
    readonly onDidOpen: Event<ITreeEvent<T>>;
    readonly onKeyDown: Event<KeyboardEvent>;
    readonly onMouseClick: Event<ITreeMouseEvent<T>>;
    readonly onMouseDblClick: Event<ITreeMouseEvent<T>>;
    readonly onContextMenu: Event<ITreeContextMenuEvent<T>>;
    readonly onDidFocus: Event<void>;
    readonly onDidBlur: Event<void>;
    readonly onDidUpdateOptions: Event<IAsyncDataTreeOptionsUpdate>;
    readonly filterOnType: boolean;
    readonly openOnSingleClick: boolean;
    readonly onDidDispose: Event<void>;
    constructor(container: HTMLElement, delegate: IListVirtualDelegate<T>, renderers: ITreeRenderer<any, TFilterData, any>[], dataSource: IAsyncDataSource<TInput, T>, options?: IAsyncDataTreeOptions<T, TFilterData>);
    updateOptions(options?: IAsyncDataTreeOptionsUpdate): void;
    getHTMLElement(): HTMLElement;
    readonly contentHeight: number;
    readonly onDidChangeContentHeight: Event<number>;
    scrollTop: number;
    readonly scrollHeight: number;
    readonly renderHeight: number;
    readonly firstVisibleElement: T;
    readonly lastVisibleElement: T;
    domFocus(): void;
    layout(height?: number, width?: number): void;
    style(styles: IListStyles): void;
    getInput(): TInput | undefined;
    setInput(input: TInput, viewState?: IAsyncDataTreeViewState): Promise<void>;
    updateChildren(element?: TInput | T, recursive?: boolean, viewStateContext?: IAsyncDataTreeViewStateContext<TInput, T>): Promise<void>;
    resort(element?: TInput | T, recursive?: boolean): void;
    hasNode(element: TInput | T): boolean;
    rerender(element?: T): void;
    updateWidth(element: T): void;
    getNode(element?: TInput | T): ITreeNode<TInput | T, TFilterData>;
    collapse(element: T, recursive?: boolean): boolean;
    expand(element: T, recursive?: boolean): Promise<boolean>;
    toggleCollapsed(element: T, recursive?: boolean): boolean;
    expandAll(): void;
    collapseAll(): void;
    isCollapsible(element: T): boolean;
    isCollapsed(element: T): boolean;
    toggleKeyboardNavigation(): void;
    refilter(): void;
    setSelection(elements: T[], browserEvent?: UIEvent): void;
    getSelection(): T[];
    setFocus(elements: T[], browserEvent?: UIEvent): void;
    focusNext(n?: number, loop?: boolean, browserEvent?: UIEvent): void;
    focusPrevious(n?: number, loop?: boolean, browserEvent?: UIEvent): void;
    focusNextPage(browserEvent?: UIEvent): void;
    focusPreviousPage(browserEvent?: UIEvent): void;
    focusLast(browserEvent?: UIEvent): void;
    focusFirst(browserEvent?: UIEvent): void;
    getFocus(): T[];
    open(elements: T[]): void;
    reveal(element: T, relativeTop?: number): void;
    getRelativeTop(element: T): number | null;
    getParentElement(element: T): TInput | T;
    getFirstElementChild(element?: TInput | T): TInput | T | undefined;
    private getDataNode;
    private refreshAndRenderNode;
    private refreshNode;
    private doRefreshSubTree;
    private doRefreshNode;
    private doGetChildren;
    private _onDidChangeCollapseState;
    private setChildren;
    private render;
    getViewState(): IAsyncDataTreeViewState;
    dispose(): void;
}
export {};
