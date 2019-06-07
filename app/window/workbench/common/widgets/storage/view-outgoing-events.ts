import { Disposable } from "base/common/lifecycle";
import { IStorageWidgetStorageItemView } from "window/workbench/common/widgets/storage/view/storage-item-view";
export interface EventCallback<T> {
	(event: T): void;
}

export class StorageWidgetViewOutgoingEvents extends Disposable {

  // UI Event
  onDropOver: EventCallback<React.DragEvent>;
  onDrop: EventCallback<React.DragEvent>;
  onStorageItemDragStart: EventCallback<IStorageWidgetStorageItemView>;
  onStorageItemDragEnd: EventCallback<IStorageWidgetStorageItemView>;

  constructor() {
    super();
  }

  emitDropOver(e: React.DragEvent) {
    if (this.onDropOver) this.onDropOver(e);
  }

  emitDrop(e: React.DragEvent) {
    if (this.onDrop) this.onDrop(e);
  }

  emitStorageItemDragStart(e: IStorageWidgetStorageItemView) {
    if (this.onStorageItemDragStart) this.onStorageItemDragStart(e);
  }

  emitStorageItemDragEnd(e: IStorageWidgetStorageItemView) {
    if (this.onStorageItemDragEnd) this.onStorageItemDragEnd(e);
  }

}