// import * as React from 'react';
// import { observer } from 'window/app-mobx';

// import { StorageWidgetViewProps } from 'window/view/storage/view/widget-view';
// import { IStorageWidgetStorageItemViewModel } from 'window/view/storage/model/storage-item-model';
// import { StaticDND } from 'base/view/dnd';
// import { StorageItemDragAndDropData } from 'window/view/dnd/dnd';
// import { StorageWidgetViewOutgoingEvents } from 'window/view/storage/view-outgoing-events';

// export interface StorageWidgetStorageItemViewProps extends StorageWidgetViewProps {
//   outgoingEvent: StorageWidgetViewOutgoingEvents;
//   storageItemViewModel: IStorageWidgetStorageItemViewModel;
// }

// @observer
// export class StorageWidgetStorageItemView extends React.Component<StorageWidgetStorageItemViewProps> {

//   constructor(props: any) {
//     super(props);

//     this.dragStartHandler = this.dragStartHandler.bind(this);
//     this.dragEndHandler = this.dragEndHandler.bind(this);
//   }

//   dragStartHandler(e: React.DragEvent) {
//     this.props.outgoingEvent.emitStorageItemDragStart(this.props.storageItemViewModel);
//     StaticDND.CurrentDragAndDropData = new StorageItemDragAndDropData(this.props.storageItemViewModel.storageItem);
//   }

//   dragEndHandler(e: React.DragEvent) {

//   }

//   render() {
//     const storageItem = this.props.storageItemViewModel.storageItem;
//     return (
//       <div draggable
//           onDragStart={this.dragStartHandler}
//           onDragEnd={this.dragEndHandler}>
//         {storageItem.name}
//       </div>
//     );
//     // if (storageItem.isDirectory) {
//     //   const vm = this.props.storageItemViewModel as IStorageWidgetStorageDirectoryViewModel;
//     //   return <StorageWidgetStorageDirectoryView
//     //     widget={this.props.widget} storageDirectoryViewModel={vm}/>
//     // }
//     // if (!storageItem.isDirectory) {
//     //   const vm = this.props.storageItemViewModel as IStorageWidgetStorageFileViewModel;
//     //   return <StorageWidgetStorageDirectoryView
//     //     widget={this.props.widget} storageDirectoryViewModel={vm}/>
//     // }
//   }

// }