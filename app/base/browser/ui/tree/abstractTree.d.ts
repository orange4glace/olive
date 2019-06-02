import './media/tree.css';
import { IDisposable } from 'base/common/lifecycle';
import { IListOptions, List, IListStyles, MouseController } from 'base/browser/ui/list/listWidget';
import { IListVirtualDelegate, IListRenderer, IIdentityProvider } from 'base/browser/ui/list/list';
import { Event } from 'base/common/event';
import { StandardKeyboardEvent } from 'base/browser/keyboardEvent';
import { ITreeModel, ITreeNode, ITreeRenderer, ITreeEvent, ITreeMouseEvent, ITreeContextMenuEvent, ITreeFilter, ITreeNavigator, ICollapseStateChangeEvent, ITreeDragAndDrop, ITreeModelSpliceEvent } from 'base/browser/ui/tree/tree';
import { ISpliceable } from 'base/common/sequence';
import { ScrollEvent } from 'base/common/scrollable';
export declare class ComposedTreeDelegate<T, N extends {
    element: T;
}> implements IListVirtualDelegate<N> {
    private delegate;
    constructor(delegate: IListVirtualDelegate<T>);
    getHeight(element: N): number;
    getTemplateId(element: N): string;
    hasDynamicHeight(element: N): boolean;
    setDynamicHeight(element: N, height: number): void;
}
interface ITreeRendererOptions {
    readonly indent?: number;
}
export interface IKeyboardNavigationEventFilter {
    (e: StandardKeyboardEvent): boolean;
}
export interface IAbstractTreeOptionsUpdate extends ITreeRendererOptions {
    readonly automaticKeyboardNavigation?: boolean;
    readonly simpleKeyboardNavigation?: boolean;
    readonly filterOnType?: boolean;
    readonly openOnSingleClick?: boolean;
}
export interface IAbstractTreeOptions<T, TFilterData = void> extends IAbstractTreeOptionsUpdate, IListOptions<T> {
    readonly collapseByDefault?: boolean;
    readonly filter?: ITreeFilter<T, TFilterData>;
    readonly dnd?: ITreeDragAndDrop<T>;
    readonly autoExpandSingleChildren?: boolean;
    readonly keyboardNavigationEventFilter?: IKeyboardNavigationEventFilter;
    readonly expandOnlyOnTwistieClick?: boolean | ((e: T) => boolean);
}
/**
 * The trait concept needs to exist at the tree level, because collapsed
 * tree nodes will not be known by the list.
 */
declare class Trait<T> {
    private identityProvider?;
    private nodes;
    private elements;
    private _onDidChange;
    readonly onDidChange: Event<ITreeEvent<T>>;
    private _nodeSet;
    private readonly nodeSet;
    constructor(identityProvider?: IIdentityProvider<T>);
    set(nodes: ITreeNode<T, any>[], browserEvent?: UIEvent): void;
    get(): T[];
    has(node: ITreeNode<T, any>): boolean;
    onDidModelSplice({ insertedNodes, deletedNodes }: ITreeModelSpliceEvent<T, any>): void;
    private createNodeSet;
}
interface ITreeNodeListOptions<T, TFilterData, TRef> extends IListOptions<ITreeNode<T, TFilterData>> {
    readonly tree: AbstractTree<T, TFilterData, TRef>;
}
/**
 * We use this List subclass to restore selection and focus as nodes
 * get rendered in the list, possibly due to a node expand() call.
 */
declare class TreeNodeList<T, TFilterData, TRef> extends List<ITreeNode<T, TFilterData>> {
    private focusTrait;
    private selectionTrait;
    constructor(container: HTMLElement, virtualDelegate: IListVirtualDelegate<ITreeNode<T, TFilterData>>, renderers: IListRenderer<any, any>[], focusTrait: Trait<T>, selectionTrait: Trait<T>, options: ITreeNodeListOptions<T, TFilterData, TRef>);
    protected createMouseController(options: ITreeNodeListOptions<T, TFilterData, TRef>): MouseController<ITreeNode<T, TFilterData>>;
    splice(start: number, deleteCount: number, elements?: ITreeNode<T, TFilterData>[]): void;
    setFocus(indexes: number[], browserEvent?: UIEvent, fromAPI?: boolean): void;
    setSelection(indexes: number[], browserEvent?: UIEvent, fromAPI?: boolean): void;
}
export declare abstract class AbstractTree<T, TFilterData, TRef> implements IDisposable {
    private _options;
    protected view: TreeNodeList<T, TFilterData, TRef>;
    private renderers;
    protected model: ITreeModel<T, TFilterData, TRef>;
    private focus;
    private selection;
    private eventBufferer;
    private typeFilterController?;
    private focusNavigationFilter;
    protected disposables: IDisposable[];
    readonly onDidScroll: Event<ScrollEvent>;
    readonly onDidChangeFocus: Event<ITreeEvent<T>>;
    readonly onDidChangeSelection: Event<ITreeEvent<T>>;
    readonly onDidOpen: Event<ITreeEvent<T>>;
    readonly onMouseClick: Event<ITreeMouseEvent<T>>;
    readonly onMouseDblClick: Event<ITreeMouseEvent<T>>;
    readonly onContextMenu: Event<ITreeContextMenuEvent<T>>;
    readonly onKeyDown: Event<KeyboardEvent>;
    readonly onKeyUp: Event<KeyboardEvent>;
    readonly onKeyPress: Event<KeyboardEvent>;
    readonly onDidFocus: Event<void>;
    readonly onDidBlur: Event<void>;
    readonly onDidChangeCollapseState: Event<ICollapseStateChangeEvent<T, TFilterData>>;
    readonly onDidChangeRenderNodeCount: Event<ITreeNode<T, TFilterData>>;
    private _onWillRefilter;
    readonly onWillRefilter: Event<void>;
    readonly filterOnType: boolean;
    readonly onDidChangeTypeFilterPattern: Event<string>;
    readonly openOnSingleClick: boolean;
    readonly expandOnlyOnTwistieClick: boolean | ((e: T) => boolean);
    private _onDidUpdateOptions;
    readonly onDidUpdateOptions: Event<IAbstractTreeOptions<T, TFilterData>>;
    readonly onDidDispose: Event<void>;
    constructor(container: HTMLElement, delegate: IListVirtualDelegate<T>, renderers: ITreeRenderer<any, TFilterData, any>[], _options?: IAbstractTreeOptions<T, TFilterData>);
    updateOptions(optionsUpdate?: IAbstractTreeOptionsUpdate): void;
    readonly options: IAbstractTreeOptions<T, TFilterData>;
    updateWidth(element: TRef): void;
    getHTMLElement(): HTMLElement;
    readonly contentHeight: number;
    readonly onDidChangeContentHeight: Event<number>;
    scrollTop: number;
    readonly scrollHeight: number;
    readonly renderHeight: number;
    readonly firstVisibleElement: T;
    readonly lastVisibleElement: T;
    domFocus(): void;
    isDOMFocused(): boolean;
    layout(height?: number, width?: number): void;
    style(styles: IListStyles): void;
    getParentElement(location: TRef): T;
    getFirstElementChild(location: TRef): T | undefined;
    getNode(location?: TRef): ITreeNode<T, TFilterData>;
    collapse(location: TRef, recursive?: boolean): boolean;
    expand(location: TRef, recursive?: boolean): boolean;
    toggleCollapsed(location: TRef, recursive?: boolean): boolean;
    expandAll(): void;
    collapseAll(): void;
    isCollapsible(location: TRef): boolean;
    isCollapsed(location: TRef): boolean;
    toggleKeyboardNavigation(): void;
    refilter(): void;
    setSelection(elements: TRef[], browserEvent?: UIEvent): void;
    getSelection(): T[];
    setFocus(elements: TRef[], browserEvent?: UIEvent): void;
    focusNext(n?: number, loop?: boolean, browserEvent?: UIEvent, filter?: (node: ITreeNode<T, TFilterData>) => boolean): void;
    focusPrevious(n?: number, loop?: boolean, browserEvent?: UIEvent, filter?: (node: ITreeNode<T, TFilterData>) => boolean): void;
    focusNextPage(browserEvent?: UIEvent, filter?: (node: ITreeNode<T, TFilterData>) => boolean): void;
    focusPreviousPage(browserEvent?: UIEvent, filter?: (node: ITreeNode<T, TFilterData>) => boolean): void;
    focusLast(browserEvent?: UIEvent, filter?: (node: ITreeNode<T, TFilterData>) => boolean): void;
    focusFirst(browserEvent?: UIEvent, filter?: (node: ITreeNode<T, TFilterData>) => boolean): void;
    getFocus(): T[];
    open(elements: TRef[], browserEvent?: UIEvent): void;
    reveal(location: TRef, relativeTop?: number): void;
    /**
     * Returns the relative position of an element rendered in the list.
     * Returns `null` if the element isn't *entirely* in the visible viewport.
     */
    getRelativeTop(location: TRef): number | null;
    private onLeftArrow;
    private onRightArrow;
    private onSpace;
    protected abstract createModel(view: ISpliceable<ITreeNode<T, TFilterData>>, options: IAbstractTreeOptions<T, TFilterData>): ITreeModel<T, TFilterData, TRef>;
    navigate(start?: TRef): ITreeNavigator<T>;
    dispose(): void;
}
export {};
