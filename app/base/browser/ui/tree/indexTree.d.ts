import './media/tree.css';
import { Iterator, ISequence } from 'base/common/iterator';
import { AbstractTree, IAbstractTreeOptions } from 'base/browser/ui/tree/abstractTree';
import { ISpliceable } from 'base/common/sequence';
import { IndexTreeModel } from 'base/browser/ui/tree/indexTreeModel';
import { ITreeElement, ITreeModel, ITreeNode, ITreeRenderer } from 'base/browser/ui/tree/tree';
import { IListVirtualDelegate } from 'base/browser/ui/list/list';
export interface IIndexTreeOptions<T, TFilterData = void> extends IAbstractTreeOptions<T, TFilterData> {
}
export declare class IndexTree<T, TFilterData = void> extends AbstractTree<T, TFilterData, number[]> {
    private rootElement;
    protected model: IndexTreeModel<T, TFilterData>;
    constructor(container: HTMLElement, delegate: IListVirtualDelegate<T>, renderers: ITreeRenderer<any, TFilterData, any>[], rootElement: T, options?: IIndexTreeOptions<T, TFilterData>);
    splice(location: number[], deleteCount: number, toInsert?: ISequence<ITreeElement<T>>): Iterator<ITreeElement<T>>;
    rerender(location?: number[]): void;
    protected createModel(view: ISpliceable<ITreeNode<T, TFilterData>>, options: IIndexTreeOptions<T, TFilterData>): ITreeModel<T, TFilterData, number[]>;
}
