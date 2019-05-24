import { IStorageItem, StorageItem } from "internal/storage/storage-item";
import { observable } from "mobx";
import { assert } from "base/common/assert";

export interface IStorageDirectory extends IStorageItem {

  /*@observable*/ readonly items: IStorageItem[];

  addItem(item: IStorageItem): void;
  getItem(name: string): IStorageItem;

}

export class StorageDirectory extends StorageItem implements IStorageDirectory {

  @observable private name_: string;
  get name() { return this.name_; }

  readonly type = 'directory';
  readonly isDirectory = true;

  @observable readonly items: IStorageItem[];

  constructor(name: string) {
    super();
    this.name_ = name;

    this.items = [];
  }

  addItem(item: IStorageItem): void {
    this.items.push(item);
    item.setParent(this);
  }

  removeItem(item: IStorageItem): void {
    const index = this.items.indexOf(item);
    assert(index != -1, 'StorageItem not found. ' + this.getAbsolutePath() + ' ' + item.name );
    this.items.splice(index, 1);
    item.setParent(null);
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

}