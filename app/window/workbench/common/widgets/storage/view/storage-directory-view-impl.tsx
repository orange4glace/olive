import * as React from 'react'
import { observable, observer } from "window/app-mobx";
import { IStorageWidgetStorageDirectoryView } from "window/workbench/common/widgets/storage/view/storage-directory-view";
import { Disposable } from "base/common/lifecycle";
import { IStorageWidgetStorageItemView } from "window/workbench/common/widgets/storage/view/storage-item-view";
import { IStorageItem } from "internal/storage/storage-item";
import { IStorageDirectory } from "internal/storage/storage-directory";
import { StorageWidgetViewOutgoingEvents } from "window/workbench/common/widgets/storage/view-outgoing-events";
import { StorageWidgetStorageItemView } from 'window/workbench/common/widgets/storage/view/storage-item-view-impl';

export class StorageWidgetStorageDirectoryView extends Disposable implements IStorageWidgetStorageDirectoryView {

  @observable readonly storageItemViews: Array<IStorageWidgetStorageItemView>;
  private storageItemViewMap_: Map<IStorageItem, IStorageWidgetStorageItemView>;

  @observable name: string;

  constructor(
    public readonly storageItem: IStorageDirectory,
    private readonly outgoingEvents: StorageWidgetViewOutgoingEvents) {
    super();
    this.storageItemViews = [];
    this.storageItemViewMap_= new Map();
    
    storageItem.items.forEach(item => this.itemAddedHandler(item));
    this._register(storageItem.onItemAdded(this.itemAddedHandler, this));
    this._register(storageItem.onItemRemoved(this.itemRemovedHandler, this));

    this.name = storageItem.name;
  }

  itemAddedHandler(item: IStorageItem) {
    if (item.isDirectory) {
      const vm = new StorageWidgetStorageDirectoryView(item as IStorageDirectory, this.outgoingEvents);
      this.storageItemViews.push(vm);
      this.storageItemViewMap_.set(item, vm);
    }
    else {
      const vm = new StorageWidgetStorageItemView(item as IStorageItem, this.outgoingEvents);
      this.storageItemViews.push(vm);
      this.storageItemViewMap_.set(item, vm);
    }
  }

  itemRemovedHandler(item: IStorageItem) {
    const vm = this.storageItemViewMap_.get(item);
    this.storageItemViews.splice(this.storageItemViews.indexOf(vm), 1);
    this.storageItemViewMap_.delete(item);
  }

  render(): React.ReactNode {
    return React.createElement(StorageWidgetStorageDirectoryViewComponent, {
      view: this,
      outgoingEvents: this.outgoingEvents
    });
  }

}

interface Props {
  view: StorageWidgetStorageDirectoryView;
  outgoingEvents: StorageWidgetViewOutgoingEvents;
}

@observer
class StorageWidgetStorageDirectoryViewComponent extends React.Component<Props> {

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
    const view = this.props.view;
    return(
      <div
        onDragOver={this.dragOverHandler}
        onDrop={this.dropHandler}>
        <div className='label'>Folder {view.name}</div>
        <div>
          {view.storageItemViews.map(view => view.render())}
        </div>
      </div>);
  }

}