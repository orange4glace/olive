import { ITimeline } from "internal/timeline/timeline";
import { IStorageFile, StorageFile } from "internal/storage/storage-file";
import { IStorageItem } from "internal/storage/storage-item";

export interface ITimelineStorageFile extends IStorageFile {

  readonly timeline: ITimeline;

}

export class TimelineStorageFile extends StorageFile implements ITimelineStorageFile {

  readonly timeline: ITimeline;
  readonly type = 'olive.Timeline';

  constructor(name: string, timeline: ITimeline) {
    super(name);
    this.timeline = timeline;
  }

}