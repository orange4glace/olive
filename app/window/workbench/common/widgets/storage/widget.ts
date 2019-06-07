import { Widget } from "window/view/widget";
import { Event } from "base/common/event";
import { IStorageWidgetStorageItemView } from "window/workbench/common/widgets/storage/view/storage-item-view";
import { IStorageWidgetView } from "window/workbench/common/widgets/storage/view/widget-view";
import { StorageWidgetViewOutgoingEvents } from "window/workbench/common/widgets/storage/view-outgoing-events";
import { IWidget } from "window/workbench/common/editor/widget";

export interface IStorageWidget extends IWidget {

  // UI Events
  onDropOver: Event<React.DragEvent>;
  onDrop: Event<React.DragEvent>;
  onStorageItemDragStart: Event<IStorageWidgetStorageItemView>;
  onStorageItemDragEnd: Event<IStorageWidgetStorageItemView>;

  view: IStorageWidgetView;

}