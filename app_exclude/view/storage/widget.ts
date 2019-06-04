import { Widget } from "window/view/widget";
import { IStorageWidgetViewModel } from "window/view/storage/model/model";
import { Event } from "base/common/event";
import { StorageWidgetViewOutgoingEvents } from "window/view/storage/view-outgoing-events";
import { IStorageWidgetStorageItemViewModel } from "window/view/storage/model/storage-item-model";

export interface IStorageWidget extends Widget {

  // UI Events
  onDropOver: Event<React.DragEvent>;
  onDrop: Event<React.DragEvent>;
  onStorageItemDragStart: Event<IStorageWidgetStorageItemViewModel>;
  onStorageItemDragEnd: Event<IStorageWidgetStorageItemViewModel>;

  model: IStorageWidgetViewModel;
  
  registerViewOutgoingEvents(outingEvents: StorageWidgetViewOutgoingEvents): void;

}