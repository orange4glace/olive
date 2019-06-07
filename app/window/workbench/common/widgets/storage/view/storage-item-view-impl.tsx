import * as React from 'react'
import { IStorageWidgetStorageItemView } from "window/workbench/common/widgets/storage/view/storage-item-view";
import { IStorageItem } from "internal/storage/storage-item";
import { StorageWidgetViewOutgoingEvents } from 'window/workbench/common/widgets/storage/view-outgoing-events';
import { observer } from 'window/app-mobx';

export class StorageWidgetStorageItemView implements IStorageWidgetStorageItemView {

  constructor(
    public readonly storageItem: IStorageItem,
    private readonly outgoingEvents: StorageWidgetViewOutgoingEvents) {
  }

  render(): React.ReactNode {
    return <StorageWidgetStorageItemViewComponent view={this} outgoingEvents={this.outgoingEvents}/>
  }

}

interface Props {
  view: StorageWidgetStorageItemView;
  outgoingEvents: StorageWidgetViewOutgoingEvents;
}

@observer
class StorageWidgetStorageItemViewComponent extends React.Component<Props> {

  constructor(props: Props) {
    super(props);

    this.dragStartHandler = this.dragStartHandler.bind(this);
    this.dragEndHandler = this.dragEndHandler.bind(this);
  }

  dragStartHandler(e: React.DragEvent) {
    this.props.outgoingEvents.emitStorageItemDragStart(this.props.view);
  }

  dragEndHandler(e: React.DragEvent) {
    this.props.outgoingEvents.emitStorageItemDragEnd(this.props.view);
  }

  render() {
    const storageItem = this.props.view.storageItem;
    return (
      <div className='storage-item' draggable
          onDragStart={this.dragStartHandler}
          onDragEnd={this.dragEndHandler}>
        {storageItem.name}
      </div>
    );
  }

}