import { IStorageFile } from "internal/storage/storage-file";
import { IStorageWidgetStorageItemView } from "window/workbench/common/widgets/storage/view/storage-item-view";

export interface IStorageWidgetStorageFileView extends IStorageWidgetStorageItemView {

  readonly storageItem: IStorageFile;

}