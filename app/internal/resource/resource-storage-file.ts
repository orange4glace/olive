import { IStorageFile, StorageFile, SerializedStorageFile } from "internal/storage/storage-file";
import { IVideoResource, VideoResource } from "internal/resource/video-resource";
import { IAudioResource, AudioResource } from "internal/resource/audio-resource";
import { ITrackItem } from "internal/timeline/track-item/track-item";
import { VideoMediaTrackItemImpl } from "internal/timeline/track-item/video-media-track-item";
import { AudioTrackItemImpl } from "internal/timeline/track-item/audio-track-item";
import { TrackItemTime } from "internal/timeline/track-item/track-item-time";
import { ResourceIdentifier } from "internal/resource/resource";
import { IStorageItemFactory, StorageItemFactoryRegistry } from "internal/storage/storage-item";
import { IInstantiationService } from "platform/instantiation/common/instantiation";
import { ILogService } from "platform/log/common/log";
import { IResourcesService } from "internal/resource/resource-service";
import { Registry } from "platform/registry/common/platform";

export interface IResourceStorageFile extends IStorageFile {

}

export abstract class ResourceStorageFile extends StorageFile implements IResourceStorageFile {

}

export interface SerializedMediaResourceStorageFile extends SerializedStorageFile {
  videoResourceID: ResourceIdentifier;
  audioResourceID: ResourceIdentifier;
}

export class MediaResourceStorageFile extends ResourceStorageFile {
  static readonly TYPE = 'olive.storage.item.MediaResource';

  constructor(
    name: string,
    readonly videoResource: IVideoResource,
    readonly audioResource: IAudioResource) {
    super(MediaResourceStorageFile.TYPE, name);
  }

  trackItemize(): ITrackItem {
    const trackItem = new VideoMediaTrackItemImpl(this.videoResource);
    trackItem.__setTime(new TrackItemTime(0, this.videoResource.duration, 0));
    return trackItem;
  }

  serialize() {
    const serial: SerializedMediaResourceStorageFile = {
      ...super.serialize(),
      videoResourceID: this.videoResource.id,
      audioResourceID: this.audioResource.id
    }
    return serial;
  }

  static deserialize(instantiation: IInstantiationService, serial: SerializedMediaResourceStorageFile): MediaResourceStorageFile {
    return instantiation.invokeFunction<MediaResourceStorageFile | null>(accessor => {
      const logger = accessor.get(ILogService);
      const resourcesService = accessor.get(IResourcesService);
      const videoResource = resourcesService.getResource(serial.videoResourceID) as VideoResource;
      console.log(instantiation, resourcesService)
      if (!videoResource) {
        logger.error('Resource not found. ' + serial.audioResourceID);
        return null;
      }
      if (videoResource.type !== VideoResource.TYPE) {
        logger.error('MediaResourceStorageFile Resource type not match. ID=' + serial.audioResourceID + ', TYPE=' + videoResource.type);
        return null;
      }
      const audioResource = resourcesService.getResource(serial.audioResourceID) as AudioResource;
      if (!audioResource) {
        logger.error('MediaResourceStorageFile Resource not found. ' + serial.audioResourceID);
        return null;
      }
      if (audioResource.type !== AudioResource.TYPE) {
        logger.error('MediaResourceStorageFile Resource type not match. ID=' + serial.audioResourceID + ', TYPE=' + audioResource.type);
        return null;
      }
      return new MediaResourceStorageFile(serial.name, videoResource, audioResource);
    })
  }

}

class MediaResourceStorageFileFactory implements IStorageItemFactory<MediaResourceStorageFile> {
  serialize(directory: MediaResourceStorageFile): SerializedMediaResourceStorageFile {
    return directory.serialize();
  }
  deserialize(instantiationService: IInstantiationService, serial: SerializedMediaResourceStorageFile): MediaResourceStorageFile | null {
    return MediaResourceStorageFile.deserialize(instantiationService, serial);
  }
}

Registry.as<StorageItemFactoryRegistry>(StorageItemFactoryRegistry.ID).registerFactory(MediaResourceStorageFile.TYPE, MediaResourceStorageFileFactory);




export interface SerializedAudioResourceStorageFile extends SerializedStorageFile {
  audioResourceID: ResourceIdentifier;
}

export class AudioResourceStorageFile extends ResourceStorageFile {
  static readonly TYPE = 'olive.storage.item.AudioResource';

  constructor(
    name: string,
    readonly audioResource: IAudioResource) {
    super(AudioResourceStorageFile.TYPE, name);
  }

  trackItemize(): ITrackItem {
    return new AudioTrackItemImpl(this.audioResource);
  }

  serialize() {
    const serial: SerializedAudioResourceStorageFile = {
      ...super.serialize(),
      audioResourceID: this.audioResource.id
    }
    return serial;
  }

  static deserialize(instantiation: IInstantiationService, serial: SerializedAudioResourceStorageFile): AudioResourceStorageFile {
    return instantiation.invokeFunction<AudioResourceStorageFile | null>(accessor => {
      const logger = accessor.get(ILogService);
      const resourcesService = accessor.get(IResourcesService);
      const resource = resourcesService.getResource(serial.audioResourceID);
      if (!resource) {
        logger.error('Resource not found. ' + serial.audioResourceID);
        return null;
      }
      if (resource.type !== AudioResource.TYPE) {
        logger.error('Resource type not match. ID=' + serial.audioResourceID + ', TYPE=' + resource.type);
        return null;
      }
      return new AudioResourceStorageFile(serial.name, resource);
    })
  }

}

class AudioResourceStorageFileFactory implements IStorageItemFactory<AudioResourceStorageFile> {
  serialize(directory: AudioResourceStorageFile): SerializedAudioResourceStorageFile {
    return directory.serialize();
  }
  deserialize(instantiationService: IInstantiationService, serial: SerializedAudioResourceStorageFile): AudioResourceStorageFile | null {
    return AudioResourceStorageFile.deserialize(instantiationService, serial);
  }
}

Registry.as<StorageItemFactoryRegistry>(StorageItemFactoryRegistry.ID).registerFactory(AudioResourceStorageFile.TYPE, AudioResourceStorageFileFactory);