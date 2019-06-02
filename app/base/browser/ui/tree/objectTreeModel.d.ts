import { ISpliceable } from 'base/common/sequence';
import { Iterator, ISequence } from 'base/common/iterator';
import { IIndexTreeModelOptions } from 'base/browser/ui/tree/indexTreeModel';
import { Event } from 'base/common/event';
import { ITreeModel, ITreeNode, ITreeElement, ITreeSorter, ICollapseStateChangeEvent, ITreeModelSpliceEvent } from 'base/browser/ui/tree/tree';
export interface IObjectTreeModelOptions<T, TFilterData> extends IIndexTreeModelOptions<T, TFilterData> {
    readonly sorter?: ITreeSorter<T>;
}
export declare class ObjectTreeModel<T extends NonNullable<any>, TFilterData extends NonNullable<any> = void> implements ITreeModel<T | null, TFilterData, T | null> {
    readonly rootRef: any;
    private model;
    private nodes;
    private sorter?;
    readonly onDidSplice: Event<ITreeModelSpliceEvent<T | null, TFilterData>>;
    readonly onDidChangeCollapseState: Event<ICollapseStateChangeEvent<T, TFilterData>>;
    readonly onDidChangeRenderNodeCount: Event<ITreeNode<T, TFilterData>>;
    readonly size: number;
    constructor(list: ISpliceable<ITreeNode<T, TFilterData>>, options?: IObjectTreeModelOptions<T, TFilterData>);
    setChildren(element: T | null, children: ISequence<ITreeElement<T>> | undefined, onDidCreateNode?: (node: ITreeNode<T, TFilterData>) => void, onDidDeleteNode?: (node: ITreeNode<T, TFilterData>) => void): Iterator<ITreeElement<T | null>>;
    private _setChildren;
    private preserveCollapseState;
    rerender(element: T): void;
    resort(element?: T | null, recursive?: boolean): void;
    private resortChildren;
    getParentElement(ref?: T | null): T | null;
    getFirstElementChild(ref?: T | null): T | null | undefined;
    getLastElementAncestor(ref?: T | null): T | null | undefined;
    getListIndex(element: T): number;
    getListRenderCount(element: T): number;
    isCollapsible(element: T): boolean;
    isCollapsed(element: T): boolean;
    setCollapsed(element: T, collapsed?: boolean, recursive?: boolean): boolean;
    expandTo(element: T): void;
    refilter(): void;
    getNode(element?: T | null): ITreeNode<T | null, TFilterData>;
    getNodeLocation(node: ITreeNode<T, TFilterData>): T;
    getParentNodeLocation(element: T): T | null;
    private getElementLocation;
}
