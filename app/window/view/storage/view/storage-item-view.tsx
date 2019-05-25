import * as React from 'react';
import { observer } from 'window/app-mobx';

import { StorageWidgetViewProps } from 'window/view/storage/view/widget-view';
import { IStorageWidgetStorageItemViewModel } from 'window/view/storage/model/storage-item-model';
import { StorageWidgetViewOutgoingEvents } from 'window/view/storage/view-outgoing-events';
import { SelectorView } from 'window/base/common/view-selector-registry';
import { WindowRegistry } from 'window/registry';
import { StorageWidgetStorageItemViewSelector, Extensions } from 'window/view/storage/view/storage-item-view-registry';

export interface StorageWidgetStorageItemViewProps extends StorageWidgetViewProps {
  storageItemViewModel: IStorageWidgetStorageItemViewModel;
  outgoingEvents: StorageWidgetViewOutgoingEvents;
}

@observer
export class StorageWidgetStorageItemView extends React.Component<StorageWidgetStorageItemViewProps> {

  constructor(props: StorageWidgetStorageItemViewProps) {
    super(props);

    this.dragStartHandler = this.dragStartHandler.bind(this);
    this.dragEndHandler = this.dragEndHandler.bind(this);
  }

  dragStartHandler(e: React.DragEvent) {
    this.props.outgoingEvents.emitStorageItemDragStart(this.props.storageItemViewModel);
  }

  dragEndHandler(e: React.DragEvent) {
    this.props.outgoingEvents.emitStorageItemDragEnd(this.props.storageItemViewModel);
  }


  render() {
    const storageItem = this.props.storageItemViewModel.storageItem;
    return (
      <div className='storage-item' draggable
          onDragStart={this.dragStartHandler}
          onDragEnd={this.dragEndHandler}>
        <SelectorView selector={WindowRegistry.as<StorageWidgetStorageItemViewSelector>(Extensions.StorageWidgetStorageItemViewSelector)}
                      props={this.props} />
      </div>
    );
    // if (storageItem.isDirectory) {
    //   const vm = this.props.storageItemViewModel as IStorageWidgetStorageDirectoryViewModel;
    //   return <StorageWidgetStorageDirectoryView
    //     widget={this.props.widget} storageDirectoryViewModel={vm}/>
    // }
    // if (!storageItem.isDirectory) {
    //   const vm = this.props.storageItemViewModel as IStorageWidgetStorageFileViewModel;
    //   return <StorageWidgetStorageDirectoryView
    //     widget={this.props.widget} storageDirectoryViewModel={vm}/>
    // }
  }

}