import { observable } from "mobx";

export interface IStorageItem {

  readonly uuid: string;
  /*@observable*/ readonly name: string;
  /*@observable*/ readonly parent: IStorageItem;
  readonly type: string;
  readonly isDirectory: boolean;

  setParent(item: IStorageItem): void;
  getAbsolutePath(): string;
  navigate(path: string): IStorageItem;

}

export abstract class StorageItem implements IStorageItem {

  @observable parent: IStorageItem;

  get uuid(): string { return this.uuid_; }
  private uuid_: string;
  readonly name: string;
  readonly type: string;
  readonly isDirectory: boolean;

  private _uuid() {
    function s4() {
      return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  constructor() {
    this.uuid_ = this._uuid();
  }

  setParent(item: IStorageItem): void {
    this.parent = item;
  }

  getAbsolutePath(): string {
    if (!this.parent) return this.name;
    this.parent.getAbsolutePath() + '/' + this.name;
  }

  abstract navigate(path: string): IStorageItem;

}