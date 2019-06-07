import { IStorageDirectory } from "internal/storage/storage-directory";
import { IStorageItem } from "internal/storage/storage-item";
import { observable } from "window/app-mobx";
import { IStorageWidgetStorageItemView } from "window/workbench/common/widgets/storage/view/storage-item-view";
import { Disposable } from "base/common/lifecycle";

export interface IStorageWidgetStorageDirectoryView extends IStorageWidgetStorageItemView {

  readonly storageItem: IStorageDirectory;

  /*@observable*/ readonly storageItemViews: ReadonlyArray<IStorageWidgetStorageItemView>;

}