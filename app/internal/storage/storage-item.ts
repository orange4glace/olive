import { observable } from "mobx";
import { ITrackItem } from "internal/timeline/track-item/track-item";
import { Serializable } from "base/olive/serialize";
import uuid from "uuid";

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

export interface StorageItemSerial {
  uuid: string;
  name: string;
  type: string;
}

export abstract class StorageItem implements IStorageItem {

  @observable parent: IStorageItem;

  get uuid(): string { return this.uuid_; }
  private uuid_: string;
  readonly name: string;
  readonly type: string;
  readonly isDirectory: boolean;

  constructor() {
    this.uuid_ = uuid();
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

  serialize(): StorageItemSerial {
    const serial: StorageItemSerial = {
      uuid: this.uuid_,
      name: this.name,
      type: this.type
    };
    return serial;
  }

}