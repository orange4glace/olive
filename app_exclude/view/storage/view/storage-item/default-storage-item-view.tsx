import * as React from 'react'
import { StorageWidgetStorageItemViewProps } from 'window/view/storage/view/storage-item-view';

export class StorageWidgetDefaultStorageItemView extends React.Component<StorageWidgetStorageItemViewProps> {

  render() {
    const vm = this.props.storageItemViewModel;
    const item = vm.storageItem;
    return (
      <div>
        <div className='name'>{item.name}</div>
      </div>
    )
  }

}