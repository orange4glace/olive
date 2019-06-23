import { ITrackItem } from "internal/timeline/base/track-item/track-item";
import { ITimeline } from "internal/timeline/base/timeline";
import { IStorageItem } from "internal/storage/storage-item";

export interface IStorageItemTrackItemizer {

  trackItemize(timeline: ITimeline, storageItem: IStorageItem): ITrackItem;

}

class StorageItemTrackItemizerRegistryImpl {

  static readonly ID = 'olive.trackItemizer.ResourceTrackItemizerRegistry';

  private itemizers_: Map<string, IStorageItemTrackItemizer> = new Map();

  register(type: string, itemizer: IStorageItemTrackItemizer): void {
    this.itemizers_.set(type, itemizer);
  }

  getTrackItemizer(type: string): IStorageItemTrackItemizer {
    return this.itemizers_.get(type);
  }

}

export const StorageItemTrackItemizerRegistry = new StorageItemTrackItemizerRegistryImpl();