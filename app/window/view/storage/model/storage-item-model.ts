import { IStorageItem } from "internal/storage/storage-item";
import { ViewModel, ViewModelImpl } from "window/view/view-model";

export interface IStorageWidgetStorageItemViewModel extends ViewModel {

  readonly storageItem: IStorageItem;

}

export class StorageWidgetStorageItemViewModel extends ViewModelImpl implements IStorageWidgetStorageItemViewModel {

  constructor(
    public readonly storageItem: IStorageItem) {
    super();
  }

}