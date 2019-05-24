import * as React from 'react';
import { observer } from 'window/app-mobx';

import { StorageWidgetViewProps } from 'window/view/storage/view/widget-view';
import { IStorageWidgetStorageItemViewModel } from 'window/view/storage/model/storage-item-model';
import { StorageWidgetStorageDirectoryView } from 'window/view/storage/view/storage-directory-view';
import { IStorageWidgetStorageDirectoryViewModel } from 'window/view/storage/model/storage-directory-model';
import { IStorageWidgetStorageFileViewModel } from 'window/view/storage/model/storage-file-model';
import { StaticDND } from 'base/view/dnd';
import { StorageItemDragAndDropData } from 'window/view/dnd/dnd';

export interface StorageWidgetStorageItemViewProps extends StorageWidgetViewProps {
  storageItemViewModel: IStorageWidgetStorageItemViewModel;
}

@observer
export class StorageWidgetStorageItemView extends React.Component<StorageWidgetStorageItemViewProps> {

  constructor(props: any) {
    super(props);

    this.dragStartHandler = this.dragStartHandler.bind(this);
    this.dropHandler = this.dropHandler.bind(this);
    this.dragEndHandler = this.dragEndHandler.bind(this);
  }

  dragStartHandler(e: React.DragEvent) {
    StaticDND.CurrentDragAndDropData = new StorageItemDragAndDropData(this.props.storageItemViewModel.storageItem);
  }

  dropHandler(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  dragEndHandler(e: React.DragEvent) {
    StaticDND.CurrentDragAndDropData = null;
  }


  render() {
    const storageItem = this.props.storageItemViewModel.storageItem;
    return (
      <div draggable>
        {storageItem.name}
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