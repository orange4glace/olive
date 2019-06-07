import * as React from 'react'
import { IStorageWidgetStorageFileView } from "window/workbench/common/widgets/storage/view/storage-file-view";
import { IStorageFile } from "internal/storage/storage-file";
import { StorageWidgetViewOutgoingEvents } from 'window/workbench/common/widgets/storage/view-outgoing-events';
import { IStorageItem } from 'internal/storage/storage-item';

export class StorageWidgetStorageFileView implements IStorageWidgetStorageFileView {

  constructor(
    public readonly storageItem: IStorageItem,
    private readonly outgoingEvents: StorageWidgetViewOutgoingEvents) {
  }

  render(): React.ReactNode {
    return <StorageWidgetStorageFileViewComponent view={this} outgoingEvents={this.outgoingEvents}/>
  }

}

interface Props {
  view: StorageWidgetStorageFileView;
  outgoingEvents: StorageWidgetViewOutgoingEvents
}

class StorageWidgetStorageFileViewComponent extends React.Component<Props> {

  render() {
    return <div>FILE!</div>
  }

}