import { AbstractTree, IAbstractTreeOptions } from 'base/browser/ui/tree/abstractTree';
import { ISpliceable } from 'base/common/sequence';
import { ITreeNode, ITreeModel, ITreeRenderer, ITreeSorter, IDataSource } from 'base/browser/ui/tree/tree';
import { ObjectTreeModel } from 'base/browser/ui/tree/objectTreeModel';
import { IListVirtualDelegate } from 'base/browser/ui/list/list';
export interface IDataTreeOptions<T, TFilterData = void> extends IAbstractTreeOptions<T, TFilterData> {
    sorter?: ITreeSorter<T>;
}
export interface IDataTreeViewState {
    readonly focus: string[];
    readonly selection: string[];
    readonly expanded: string[];
}
export declare class DataTree<TInput, T, TFilterData = void> extends AbstractTree<T | null, TFilterData, T | null> {
    private dataSource;
    protected model: ObjectTreeModel<T, TFilterData>;
    private input;
    private identityProvider;
    private nodesByIdentity;
    constructor(container: HTMLElement, delegate: IListVirtualDelegate<T>, renderers: ITreeRenderer<any, TFilterData, any>[], dataSource: IDataSource<TInput, T>, options?: IDataTreeOptions<T, TFilterData>);
    getInput(): TInput | undefined;
    setInput(input: TInput, viewState?: IDataTreeViewState): void;
    updateChildren(element?: TInput | T): void;
    resort(element?: T | TInput, recursive?: boolean): void;
    refresh(element?: T): void;
    private _refresh;
    private iterate;
    protected createModel(view: ISpliceable<ITreeNode<T, TFilterData>>, options: IDataTreeOptions<T, TFilterData>): ITreeModel<T | null, TFilterData, T | null>;
    getViewState(): IDataTreeViewState;
}
