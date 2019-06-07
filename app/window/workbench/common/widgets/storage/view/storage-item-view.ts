import { IStorageItem } from "internal/storage/storage-item";

export interface IStorageWidgetStorageItemView {

  readonly storageItem: IStorageItem;

  render(): React.ReactNode;

}