import { IStorageFile } from "internal/storage/storage-file";
import { IStorageWidgetStorageItemViewModel } from "window/view/storage/model/storage-item-model";
import { ViewModelImpl } from "window/view/view-model";

export interface IStorageWidgetStorageFileViewModel extends IStorageWidgetStorageItemViewModel {

  readonly storageItem: IStorageFile;

}

export class StorageWidgetStorageFileViewModel extends ViewModelImpl implements IStorageWidgetStorageFileViewModel {

  constructor(
    public readonly storageItem: IStorageFile) {
    super();
  }

}