import { IStorageDirectory } from "internal/storage/storage-directory";
import { IStorageItem } from "internal/storage/storage-item";
import { ViewModelImpl } from "window/view/view-model";
import { IStorageWidgetStorageItemViewModel, StorageWidgetStorageItemViewModel } from "window/view/storage/model/storage-item-model";
import { observable } from "window/app-mobx";

export interface IStorageWidgetStorageDirectoryViewModel extends IStorageWidgetStorageItemViewModel {

  readonly storageItem: IStorageDirectory;

  /*@observable*/ readonly storageItemViewModelChildren: ReadonlyArray<IStorageWidgetStorageItemViewModel>;

}

export class StorageWidgetStorageDirectoryViewModel extends ViewModelImpl implements IStorageWidgetStorageDirectoryViewModel {

  @observable storageItemViewModelChildren: Array<IStorageWidgetStorageItemViewModel>;
  private storageItemChildrenMap_: Map<IStorageItem, IStorageWidgetStorageItemViewModel>;

  constructor(
    public readonly storageItem: IStorageDirectory) {
    super();

    this.storageItemViewModelChildren = [];
    this.storageItemChildrenMap_= new Map();
    
    storageItem.items.forEach(item => this.itemAddedHandler(item));
    this._register(storageItem.onItemAdded(this.itemAddedHandler, this));
    this._register(storageItem.onItemRemoved(this.itemRemovedHandler, this));
  }

  itemAddedHandler(item: IStorageItem) {
    if (item.isDirectory) {
      const vm = new StorageWidgetStorageDirectoryViewModel(<IStorageDirectory>item);
      this.storageItemViewModelChildren.push(vm);
      this.storageItemChildrenMap_.set(item, vm);
    }
    else {
      const vm = new StorageWidgetStorageItemViewModel(<IStorageItem>item);
      this.storageItemViewModelChildren.push(vm);
      this.storageItemChildrenMap_.set(item, vm);
    }
  }

  itemRemovedHandler(item: IStorageItem) {
    const vm = this.storageItemChildrenMap_.get(item);
    this.storageItemViewModelChildren.splice(this.storageItemViewModelChildren.indexOf(vm), 1);
    this.storageItemChildrenMap_.delete(item);
  }

}