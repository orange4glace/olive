import { IStorageWidgetStorageDirectoryViewModel } from "window/view/storage/model/storage-directory-model";

export interface IStorageWidgetViewModel {

  readonly rootStorageDirectoryViewModel: IStorageWidgetStorageDirectoryViewModel;
  /*@observable*/ readonly targetStorageDirectoryViewModel: IStorageWidgetStorageDirectoryViewModel;

}