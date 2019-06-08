import { observable } from "mobx";
import { ITrackItem } from "internal/timeline/track-item/track-item";
import { Serializable } from "base/olive/serialize";
import uuid from "uuid";
import { IFactory, FactoryRegistry } from "internal/common/factory-registry";
import { Registry } from "platform/registry/common/platform";
import { IInstantiationService } from "platform/instantiation/common/instantiation";
import { ILogService } from "platform/log/common/log";

export interface IStorageItem extends Serializable {

  readonly uuid: string;
  /*@observable*/ readonly name: string;
  /*@observable*/ readonly parent: IStorageItem;
  readonly type: string;
  readonly isDirectory: boolean;

  trackItemize(): ITrackItem;
  setParent(item: IStorageItem): void;
  getAbsolutePath(): string;
  navigate(path: string): IStorageItem;

}

export interface SerializedStorageItem {
  uuid: string;
  name: string;
  type: string;
}

export abstract class StorageItem implements IStorageItem {

  @observable parent: IStorageItem;

  get uuid(): string { return this.uuid_; }
  protected uuid_: string;
  @observable name: string;
  readonly isDirectory: boolean;
  
  private type_: string;
  public get type() { return this.type_; }

  constructor(type: string, name: string, uuid_?: string) {
    this.type_ = type;
    this.name = name;
    this.uuid_ = uuid_ || uuid();
  }

  abstract trackItemize(): ITrackItem;

  setParent(item: IStorageItem): void {
    this.parent = item;
  }

  getAbsolutePath(): string {
    if (!this.parent) return this.name;
    this.parent.getAbsolutePath() + '/' + this.name;
  }

  abstract navigate(path: string): IStorageItem;

  serialize(): SerializedStorageItem {
    return {
      uuid: this.uuid_,
      name: this.name,
      type: this.type
    };
  }

  static deserialize(instantiationService: IInstantiationService, serial: SerializedStorageItem): StorageItem | null {
    return instantiationService.invokeFunction<StorageItem | null>(accessor => {
      const logService = accessor.get(ILogService);
      const factory = Registry.as<StorageItemFactoryRegistry>(StorageItemFactoryRegistry.ID).getFactory(serial.type);
      if (!factory) {
        logService.error('StorageItem Factory not found. ' + serial.type);
        return null;
      }
      return factory.deserialize(instantiationService, serial);
    })
  }

}

export interface IStorageItemFactory<T extends StorageItem> extends IFactory<T, SerializedStorageItem> {}
export class StorageItemFactoryRegistry extends FactoryRegistry<IStorageItemFactory<any>> {
  static readonly ID = 'olive.storage.StorageItemFactoryRegistry';
}
Registry.add(StorageItemFactoryRegistry.ID, new StorageItemFactoryRegistry());