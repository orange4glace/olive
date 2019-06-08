import { IStorageItem, StorageItem, SerializedStorageItem, IStorageItemFactory, StorageItemFactoryRegistry } from "internal/storage/storage-item";
import { observable } from "mobx";
import { assert } from "base/olive/assert";
import { Event, Emitter } from "base/common/event";
import { ITrackItem } from "internal/timeline/track-item/track-item";
import { IInstantiationService } from "platform/instantiation/common/instantiation";
import { ILogService } from "platform/log/common/log";
import { Registry } from "platform/registry/common/platform";

export interface SerializedStorageDirectory extends SerializedStorageItem {
  items: SerializedStorageItem[];
}

export interface IStorageDirectory extends IStorageItem {

  /*@observable*/ readonly items: IStorageItem[];

  addItem(item: IStorageItem): void;
  getItem(name: string): IStorageItem;

  onItemAdded: Event<IStorageItem>;
  onItemRemoved: Event<IStorageItem>;

}

export class StorageDirectory extends StorageItem implements IStorageDirectory {
  static readonly TYPE = 'olive.storage.item.Directory';

  private onItemAdded_: Emitter<IStorageItem> = new Emitter<IStorageItem>();
  public onItemAdded = this.onItemAdded_.event;

  private onItemRemoved_: Emitter<IStorageItem> = new Emitter<IStorageItem>();
  public onItemRemoved = this.onItemRemoved_.event;

  readonly isDirectory = true;

  @observable items: IStorageItem[];

  constructor(name: string, uuid?: string) {
    super(StorageDirectory.TYPE, name, uuid);

    this.items = [];
  }

  trackItemize(): ITrackItem {
    return null;
  }

  addItem(item: IStorageItem): void {
    this.items.push(item);
    item.setParent(this);
    this.onItemAdded_.fire(item);
  }

  removeItem(item: IStorageItem): void {
    const index = this.items.indexOf(item);
    assert(index != -1, 'StorageItem not found. ' + this.getAbsolutePath() + ' ' + item.name );
    this.items.splice(index, 1);
    item.setParent(null);
    this.onItemRemoved_.fire(item);
  }

  getItem(uuid: string): IStorageItem {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item.uuid == uuid) return item;
    }
    return null;
  }

  navigate(path: string): IStorageItem {
    if (path[0] == '/') {
      if (this.parent) return this.parent.navigate(path);
      else return this.navigate(path.substr(1, path.length - 1));
    }
    const parsed = path.split('/');
    const target = parsed[0];
    const next = parsed.splice(1).join('/');
    if (target == '.') return this.navigate(next);
    if (target == '..') {
      if (!this.parent) throw '[Storage] Navigate ' + path + ' failed. Directory is root.';
      this.parent.navigate(next);
    }
    const item = this.getItem(target);
    if (!item) throw '[Storage] Navigate ' + path + ' failed. Item ' + target + ' not found in ' + this.getAbsolutePath();
    return item.navigate(next);
  }

  serialize(): SerializedStorageDirectory {
    const serial: SerializedStorageDirectory = {
      ...super.serialize(),
      items: []
    }
    this.items.forEach(item => {
      serial.items.push(item.serialize() as SerializedStorageItem);
    })
    return serial;
  }

  static deserialize(instantiationService: IInstantiationService, serial: SerializedStorageDirectory): StorageDirectory {
    return instantiationService.invokeFunction<StorageDirectory>(accessor => {
      const logger = accessor.get(ILogService);
      const directory = new StorageDirectory(serial.name, serial.uuid);
      const items: StorageItem[] = [];
      serial.items.forEach(itemSerial => {
        const item = StorageItem.deserialize(instantiationService, itemSerial);
        if (!item) {
          try {
            console.log('Tryin');
            throw new Error();
          } catch (e) {
            console.log(e.stack);
          }
          logger.error('Failed to deserialize StorageItem. ' + JSON.stringify(itemSerial));
          return;
        }
        items.push(item);
      })
      directory.name = serial.name;
      directory.items = items;
      return directory;
    })
  }

}

class StorageDirectoryFactory implements IStorageItemFactory<StorageDirectory> {
  serialize(directory: StorageDirectory): SerializedStorageDirectory {
    return directory.serialize();
  }
  deserialize(instantiationService: IInstantiationService, serial: SerializedStorageDirectory): StorageDirectory {
    return StorageDirectory.deserialize(instantiationService, serial);
  }
}

Registry.as<StorageItemFactoryRegistry>(StorageItemFactoryRegistry.ID).registerFactory(StorageDirectory.TYPE, StorageDirectoryFactory);