import { ITimeline, TimelineIdentifier } from "internal/timeline/timeline";
import { IStorageFile, StorageFile, SerializedStorageFile } from "internal/storage/storage-file";
import { IStorageItem, IStorageItemFactory, StorageItemFactoryRegistry } from "internal/storage/storage-item";
import { ITrackItem } from "internal/timeline/track-item/track-item";
import { IInstantiationService } from "platform/instantiation/common/instantiation";
import { ITimelinesService } from "internal/timeline/timelines-service";
import { ILogService } from "platform/log/common/log";
import { Registry } from "platform/registry/common/platform";

export interface SerializedTimelineStorageFile extends SerializedStorageFile {
  timelineID: TimelineIdentifier;
}

export interface ITimelineStorageFile extends IStorageFile {

  readonly timeline: ITimeline;

}

export class TimelineStorageFile extends StorageFile implements ITimelineStorageFile {
  static readonly TYPE = 'olive.storage.item.Timeline';

  readonly timeline: ITimeline;

  constructor(name: string, timeline: ITimeline) {
    super(TimelineStorageFile.TYPE, name);
    this.timeline = timeline;
  }

  trackItemize(): ITrackItem {
    return null;
  }

  serialize(): SerializedTimelineStorageFile {
    return {
      ...super.serialize(),
      timelineID: this.timeline.id
    }
  }

  static deserialize(instantiationService: IInstantiationService, serial: SerializedTimelineStorageFile): TimelineStorageFile | null {
    return instantiationService.invokeFunction<TimelineStorageFile | null>(accessor => {
      const logger = accessor.get(ILogService);
      const timelinesService = accessor.get(ITimelinesService);
      const timeline = timelinesService.getTimeline(serial.timelineID);
      if (!timeline) {
        logger.error('Timeline not found. ' + serial.timelineID);
        return null;
      }
      return new TimelineStorageFile(serial.name, timeline);
    })
  }

}

class TimelineStorageFileFactory implements IStorageItemFactory<TimelineStorageFile> {
  serialize(directory: TimelineStorageFile): SerializedTimelineStorageFile {
    return directory.serialize();
  }
  deserialize(instantiationService: IInstantiationService, serial: SerializedTimelineStorageFile): TimelineStorageFile {
    return TimelineStorageFile.deserialize(instantiationService, serial);
  }
}

Registry.as<StorageItemFactoryRegistry>(StorageItemFactoryRegistry.ID).registerFactory(TimelineStorageFile.TYPE, TimelineStorageFileFactory);