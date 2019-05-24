import { Disposable } from "base/common/lifecycle";
import { IStorageWidgetStorageItemViewModel } from "window/view/storage/model/storage-item-model";
export interface EventCallback<T> {
	(event: T): void;
}

export class StorageWidgetViewOutgoingEvents extends Disposable {

  // UI Event
  onDropOver: EventCallback<React.DragEvent>;
  onDrop: EventCallback<React.DragEvent>;
  onStorageItemDragStart: EventCallback<IStorageWidgetStorageItemViewModel>;
  onStorageItemDragEnd: EventCallback<IStorageWidgetStorageItemViewModel>;

  constructor() {
    super();
  }

  emitDropOver(e: React.DragEvent) {
    if (this.onDropOver) this.onDropOver(e);
  }

  emitDrop(e: React.DragEvent) {
    if (this.onDrop) this.onDrop(e);
  }

  emitStorageItemDragStart(e: IStorageWidgetStorageItemViewModel) {
    if (this.onStorageItemDragStart) this.onStorageItemDragStart(e);
  }

  emitStorageItemDragEnd(e: IStorageWidgetStorageItemViewModel) {
    if (this.onStorageItemDragEnd) this.onStorageItemDragEnd(e);
  }

}