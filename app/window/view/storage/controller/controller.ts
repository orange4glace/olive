import { IStorageWidget } from "window/view/storage/widget";
import { StaticDND, IDragAndDropData } from "base/view/dnd";
import { DesktopDragAndDropData, StorageItemDragAndDropData } from "window/view/dnd/dnd";
import { Disposable } from "base/common/lifecycle";
import { IProjectCoreService } from "internal/project/project-core-service";
import { IStorageWidgetStorageItemViewModel } from "window/view/storage/model/storage-item-model";

export interface IStorageWidgetController {

}

export class StorageWidgetController extends Disposable implements IStorageWidgetController {

  private currentDNDData: IDragAndDropData;

  constructor(
    private readonly widget_: IStorageWidget,
    @IProjectCoreService private readonly project_: IProjectCoreService) {
    super();
    
    this._register(widget_.onDropOver(this.dropOverHandler, this));
    this._register(widget_.onDrop(this.dropHandler, this));
    this._register(widget_.onStorageItemDragStart(this.storageItemDragStartHandler, this));
    this._register(widget_.onStorageItemDragEnd(this.storageItemDragEndHandler, this));
  }

  storageItemDragStartHandler(vm: IStorageWidgetStorageItemViewModel) {
    StaticDND.CurrentDragAndDropData = new StorageItemDragAndDropData(vm.storageItem);
  }

  storageItemDragEndHandler(vm: IStorageWidgetStorageItemViewModel) {
    StaticDND.CurrentDragAndDropData = null;
  }

  dropOverHandler(e: React.DragEvent) {
    e.preventDefault();
    if (StaticDND.CurrentDragAndDropData) // Non-desktop DND data
      return;

    if (!this.currentDNDData) {
      this.currentDNDData = new DesktopDragAndDropData();
    }
  }

  dropHandler(e: React.DragEvent) {
    if (StaticDND.CurrentDragAndDropData) return;
    const dragData = this.currentDNDData;
    if (!dragData || !e.dataTransfer) return;
    dragData.update(e.dataTransfer);
    console.log(dragData.getData());

    dragData.getData().files.forEach((file: File) => {
      console.log('Add resource', file.path);
      this.project_.importResource(file.path, this.widget_.model.targetStorageDirectoryViewModel.storageItem);
    })
  }

}