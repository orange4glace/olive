import { ICollapseStateChangeEvent, ITreeElement, ITreeFilter, ITreeFilterDataResult, ITreeModel, ITreeNode, TreeVisibility, ITreeModelSpliceEvent } from 'base/browser/ui/tree/tree';
import { Event } from 'base/common/event';
import { ISequence, Iterator } from 'base/common/iterator';
import { ISpliceable } from 'base/common/sequence';
export declare function isFilterResult<T>(obj: any): obj is ITreeFilterDataResult<T>;
export declare function getVisibleState(visibility: boolean | TreeVisibility): TreeVisibility;
export interface IIndexTreeModelOptions<T, TFilterData> {
    readonly collapseByDefault?: boolean;
    readonly filter?: ITreeFilter<T, TFilterData>;
    readonly autoExpandSingleChildren?: boolean;
}
export declare class IndexTreeModel<T extends Exclude<any, undefined>, TFilterData = void> implements ITreeModel<T, TFilterData, number[]> {
    private list;
    readonly rootRef: any[];
    private root;
    private eventBufferer;
    private _onDidChangeCollapseState;
    readonly onDidChangeCollapseState: Event<ICollapseStateChangeEvent<T, TFilterData>>;
    private _onDidChangeRenderNodeCount;
    readonly onDidChangeRenderNodeCount: Event<ITreeNode<T, TFilterData>>;
    private collapseByDefault;
    private filter?;
    private autoExpandSingleChildren;
    private _onDidSplice;
    readonly onDidSplice: Event<ITreeModelSpliceEvent<T, TFilterData>>;
    constructor(list: ISpliceable<ITreeNode<T, TFilterData>>, rootElement: T, options?: IIndexTreeModelOptions<T, TFilterData>);
    splice(location: number[], deleteCount: number, toInsert?: ISequence<ITreeElement<T>>, onDidCreateNode?: (node: ITreeNode<T, TFilterData>) => void, onDidDeleteNode?: (node: ITreeNode<T, TFilterData>) => void): Iterator<ITreeElement<T>>;
    rerender(location: number[]): void;
    getListIndex(location: number[]): number;
    getListRenderCount(location: number[]): number;
    isCollapsible(location: number[]): boolean;
    isCollapsed(location: number[]): boolean;
    setCollapsed(location: number[], collapsed?: boolean, recursive?: boolean): boolean;
    private _setCollapsed;
    private _setListNodeCollapsed;
    private _setNodeCollapsed;
    expandTo(location: number[]): void;
    refilter(): void;
    private createTreeNode;
    private updateNodeAfterCollapseChange;
    private _updateNodeAfterCollapseChange;
    private updateNodeAfterFilterChange;
    private _updateNodeAfterFilterChange;
    private _updateAncestorsRenderNodeCount;
    private _filterNode;
    private getTreeNode;
    private getTreeNodeWithListIndex;
    private getParentNodeWithListIndex;
    getNode(location?: number[]): ITreeNode<T, TFilterData>;
    getNodeLocation(node: ITreeNode<T, TFilterData>): number[];
    getParentNodeLocation(location: number[]): number[];
    getParentElement(location: number[]): T;
    getFirstElementChild(location: number[]): T | undefined;
    getLastElementAncestor(location?: number[]): T | undefined;
    private _getLastElementAncestor;
}