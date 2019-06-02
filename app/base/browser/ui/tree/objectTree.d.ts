import { Iterator, ISequence } from 'base/common/iterator';
import { AbstractTree, IAbstractTreeOptions } from 'base/browser/ui/tree/abstractTree';
import { ISpliceable } from 'base/common/sequence';
import { ITreeNode, ITreeModel, ITreeElement, ITreeRenderer, ITreeSorter } from 'base/browser/ui/tree/tree';
import { ObjectTreeModel } from 'base/browser/ui/tree/objectTreeModel';
import { IListVirtualDelegate } from 'base/browser/ui/list/list';
export interface IObjectTreeOptions<T, TFilterData = void> extends IAbstractTreeOptions<T, TFilterData> {
    sorter?: ITreeSorter<T>;
}
export declare class ObjectTree<T extends NonNullable<any>, TFilterData = void> extends AbstractTree<T | null, TFilterData, T | null> {
    protected model: ObjectTreeModel<T, TFilterData>;
    constructor(container: HTMLElement, delegate: IListVirtualDelegate<T>, renderers: ITreeRenderer<any, TFilterData, any>[], options?: IObjectTreeOptions<T, TFilterData>);
    setChildren(element: T | null, children?: ISequence<ITreeElement<T>>, onDidCreateNode?: (node: ITreeNode<T, TFilterData>) => void, onDidDeleteNode?: (node: ITreeNode<T, TFilterData>) => void): Iterator<ITreeElement<T | null>>;
    rerender(element?: T): void;
    resort(element: T, recursive?: boolean): void;
    protected createModel(view: ISpliceable<ITreeNode<T, TFilterData>>, options: IObjectTreeOptions<T, TFilterData>): ITreeModel<T | null, TFilterData, T | null>;
}
