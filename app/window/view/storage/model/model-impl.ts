import { Disposable } from "base/common/lifecycle";
import { IStorageService } from "internal/storage/storage-service";
import { IStorageWidgetStorageDirectoryViewModel, StorageWidgetStorageDirectoryViewModel } from "window/view/storage/model/storage-directory-model";
import { IStorageWidgetViewModel } from "window/view/storage/model/model";
import { IObservableValue } from "mobx";
import { observable } from "window/app-mobx";

export class StorageWidgetViewModel extends Disposable implements IStorageWidgetViewModel {

  readonly rootStorageDirectoryViewModel: IStorageWidgetStorageDirectoryViewModel;

  public get targetStorageDirectoryViewModel() { return this.targetStorageDirectoryViewModel_.get(); }
  private readonly targetStorageDirectoryViewModel_: IObservableValue<IStorageWidgetStorageDirectoryViewModel>;

  constructor(
    @IStorageService private readonly storageService_: IStorageService) {
    super();

    this.rootStorageDirectoryViewModel =
      new StorageWidgetStorageDirectoryViewModel(this.storageService_.root);
    this.targetStorageDirectoryViewModel_ = observable.box(this.rootStorageDirectoryViewModel);
  }

}