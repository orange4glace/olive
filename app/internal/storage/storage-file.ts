import { IStorageItem, StorageItem, SerializedStorageItem } from "internal/storage/storage-item";
import { ITrackItem } from "internal/timeline/base/track-item/track-item";

export interface IStorageFile extends IStorageItem {

}

export interface SerializedStorageFile extends SerializedStorageItem {
}

export abstract class StorageFile extends StorageItem implements IStorageFile {

  readonly isDirectory = false;

  constructor(type: string, name: string, uuid?: string) {
    super(type, name, uuid);
  }

  abstract trackItemize(): ITrackItem;

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