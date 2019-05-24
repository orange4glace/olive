import { IStorageFile, StorageFile } from "internal/storage/storage-file";
import { IResource } from "internal/resource/resource";
import { IVideoResource } from "internal/resource/video-resource";
import { IAudioResource } from "internal/resource/audio-resource";
import { ITrackItem } from "internal/timeline/track-item/track-item";
import { VideoMediaTrackItemImpl } from "internal/timeline/track-item/video-media-track-item";
import { AudioTrackItemImpl } from "internal/timeline/track-item/audio-track-item";
import { TrackItemTime } from "internal/timeline/track-item/track-item-time";

export interface IResourceStorageFile extends IStorageFile {

}

export abstract class ResourceStorageFile extends StorageFile implements IResourceStorageFile {

  readonly type = 'olive.Resource';

}

export class MediaResourceStorageFile extends ResourceStorageFile {

  constructor(
    name: string,
    readonly videoResource: IVideoResource,
    readonly audioResource: IAudioResource) {
    super(name);
  }

  trackItemize(): ITrackItem {
    const trackItem = new VideoMediaTrackItemImpl(this.videoResource);
    trackItem.__setTime(new TrackItemTime(0, this.videoResource.duration, 0));
    return trackItem;
  }

}

export class AudioResourceStorageFile extends ResourceStorageFile {

  constructor(
    name: string,
    readonly audioResource: IAudioResource) {
    super(name);
  }

  trackItemize(): ITrackItem {
    return new AudioTrackItemImpl(this.audioResource);
  }

}