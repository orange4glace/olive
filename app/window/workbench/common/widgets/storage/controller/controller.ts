import { StaticDND, IDragAndDropData } from "base/browser/dnd";
import { DesktopDragAndDropData, StorageItemDragAndDropData } from "window/view/dnd/dnd";
import { Disposable } from "base/common/lifecycle";
import { IProject } from "internal/project/project";
import { IStorageWidgetStorageItemView } from "window/workbench/common/widgets/storage/view/storage-item-view";
import { IStorageWidget } from "window/workbench/common/widgets/storage/widget";

export interface IStorageWidgetController {

}

export class StorageWidgetController extends Disposable implements IStorageWidgetController {

  private currentDNDData: IDragAndDropData;

  constructor(
    private readonly widget_: IStorageWidget,
    private readonly project_: IProject) {
    super();
    
    this._register(widget_.onDropOver(this.dropOverHandler, this));
    this._register(widget_.onDrop(this.dropHandler, this));
    this._register(widget_.onStorageItemDragStart(this.storageItemDragStartHandler, this));
    this._register(widget_.onStorageItemDragEnd(this.storageItemDragEndHandler, this));
  }

  storageItemDragStartHandler(vm: IStorageWidgetStorageItemView) {
    StaticDND.CurrentDragAndDropData = new StorageItemDragAndDropData(this.project_, vm.storageItem);
  }

  storageItemDragEndHandler(vm: IStorageWidgetStorageItemView) {
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

    dragData.getData().files.forEach((file: File) => {
      console.log('Add resource', file.path);
      this.project_.importResource(file.path, this.widget_.view.targetStorageDirectoryView.storageItem);
    })
  }

}