import { IStorageItem, StorageItem } from "internal/storage/storage-item";
import { observable } from "mobx";

export interface IStorageFile extends IStorageItem {

}

export abstract class StorageFile extends StorageItem implements IStorageFile {

  @observable private name_: string;
  get name() { return this.name_; }

  abstract get type(): string;
  readonly isDirectory = false;

  constructor(name: string) {
    super();
    this.name_ = name;
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
      if (!this.parent) throw '[Storage] Navigate ' + path + ' failed. Item is a root.';
      this.parent.navigate(next);
    }
    throw '[Storage] Navigate ' + path + ' failed. Item is a file.'
  }

}