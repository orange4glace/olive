import { ITrackItem } from "internal/timeline/base/track-item/track-item"
import { createDecorator } from "platform/instantiation/common/instantiation";
import { ITimeline } from "internal/timeline/base/timeline";
import { IStorageItem } from "internal/storage/storage-item";
import { StorageItemTrackItemizerRegistry } from "internal/services/track-itemizer/storage-item-track-itemizer-registry";

export const ITrackItemzierService = createDecorator<ITrackItemzierService>('olive.trackItemizer.TrackItemizerService');

export interface ITrackItemzierService {

  _serviceBrand: any;

  trackItemizeStorageItem(timeline: ITimeline, storageItem: IStorageItem): ITrackItem | null;

}

export class TrackItemizerService implements ITrackItemzierService {

  _serviceBrand: any;

  trackItemizeStorageItem(timeline: ITimeline, storageItem: IStorageItem): ITrackItem | null {
    const itemizer = StorageItemTrackItemizerRegistry.getTrackItemizer(storageItem.type);
    if (!itemizer) return null;
    return itemizer.trackItemize(timeline, storageItem);
  }

}