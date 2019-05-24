import * as React from 'react';
import { observer } from 'window/app-mobx';

import { StorageWidgetViewProps } from 'window/view/storage/view/widget-view';
import { IStorageWidgetStorageDirectoryViewModel } from 'window/view/storage/model/storage-directory-model';
import * as style from './storage-directory-view.scss'
import { StorageWidgetViewOutgoingEvents } from 'window/view/storage/view-outgoing-events';
import { StorageWidgetStorageItemView } from 'window/view/storage/view/storage-item-view';

export interface StorageWidgetStorageDirectoryViewProps extends StorageWidgetViewProps {
  outgoingEvents: StorageWidgetViewOutgoingEvents;
  storageDirectoryViewModel: IStorageWidgetStorageDirectoryViewModel;
}

@observer
export class StorageWidgetStorageDirectoryView extends React.Component<StorageWidgetStorageDirectoryViewProps> {

  constructor(props: any) {
    super(props);

    this.dragOverHandler = this.dragOverHandler.bind(this);
    this.dropHandler = this.dropHandler.bind(this);
  }

  dragOverHandler(e: React.DragEvent) {
    this.props.outgoingEvents.emitDropOver(e);
  }

  dropHandler(e: React.DragEvent) {
    this.props.outgoingEvents.emitDrop(e);
  }

  render() {
    const storageDirectoryVM = this.props.storageDirectoryViewModel;
    const storageDirectory = storageDirectoryVM.storageItem;
    return (
      <div className={style.component}
        onDragOver={this.dragOverHandler}
        onDrop={this.dropHandler}>
        <div className='title'>
          name {storageDirectory.name} {storageDirectory.items.length}
        </div>
        <div className='items'>
        {
           storageDirectoryVM.storageItemViewModelChildren.map(vm => (
             <StorageWidgetStorageItemView key={vm.viewModelID} {...this.props} storageItemViewModel={vm}/>
           ))
        }
        </div>
      </div>
    )
  }

}