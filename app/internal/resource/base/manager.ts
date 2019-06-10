import { observable, action } from 'mobx';
import { Probe, VideoProbeResult, AudioProbeResult } from './probe'
import { VideoResource, IVideoResource } from './video-resource';
import { Resource, IResource, ISerializedResource } from './resource';
import { Emitter, Event } from 'base/common/event';
import { AudioResource, IAudioResource } from 'internal/resource/base/audio-resource';
import { IResourcesService } from 'internal/resource/base/resource-service';
import { IInstantiationService } from 'platform/instantiation/common/instantiation';
import { ResourceIdentifier } from 'internal/resource/common/resouce';
import { ITrackItem } from 'internal/timeline/base/track-item/track-item';
import { TrackItemTime } from 'internal/timeline/base/track-item/track-item-time';
import { VideoMediaTrackItem } from 'internal/timeline/base/track-item/video-media-track-item';
import { AudioTrackItem } from 'internal/timeline/base/track-item/audio-track-item';

export interface ResourceManagerResourceEvent {
  resource: Resource
}

export interface SerializedResourceManager {
  resources: ISerializedResource[];
}

export interface IResourceManager extends IResourcesService {

  /*@observable*/ resources: Map<ResourceIdentifier, IResource>;

  createResource(path: string): Promise<{
    video: IVideoResource,
    audio: IAudioResource
  }>;
  trackItemize(resource: IResource): ITrackItem;

}

export class ResourceManager implements IResourceManager {

  _serviceBrand: any;

  private onResourceAdded_: Emitter<IResource> = new Emitter();
  onResourceAdded: Event<IResource> = this.onResourceAdded_.event;

  @observable resources: Map<ResourceIdentifier, IResource> = new Map();

  private probe_: Probe;

  constructor() {
    this.probe_ = new Probe();
  }

  @action
  async createResource(path: string) {
    try {
      let results = await this.probe_.probe(path);

      let videoResource: IVideoResource = null;
      let audioResource: IAudioResource = null;

      results.forEach(result => {
        console.log(result);
        switch (result.type) {
          case VideoResource.TYPE:
            const videoResult = result as VideoProbeResult;
            videoResource = new VideoResource(null, path, videoResult.width, videoResult.height, videoResult.duration);
            this.doAddResource(videoResource);
            break;
          case AudioResource.TYPE:
            const audioResult = result as AudioProbeResult;
            audioResource = new AudioResource(null, path, audioResult.duration);
            this.doAddResource(audioResource);
            break;
          default:
            break;
        }
      })
      return {
        video: videoResource,
        audio: audioResource
      }
    } catch (e) {
      return e;
    }
  }

  private doAddResource(resource: IResource) {
    this.resources.set(resource.id, resource);
    this.onResourceAdded_.fire(resource);
  }

  getResource(id: ResourceIdentifier): IResource | null {
    return this.resources.get(id);
  }
  
  trackItemize(resource: IResource) {
    let trackItem;
    if (resource.type == VideoResource.TYPE) {
      const videoResource = resource as VideoResource;
      trackItem = new VideoMediaTrackItem(resource as VideoResource);
      trackItem.__setTime(new TrackItemTime(0, videoResource.duration, 0));
    }
    if (resource.type == AudioResource.TYPE) {
      const audioResource = resource as AudioResource;
      trackItem = new AudioTrackItem(resource as AudioResource);
      trackItem.__setTime(new TrackItemTime(0, audioResource.duration, 0));
    }
    return trackItem;
  }

  serialize(): SerializedResourceManager {
    const resources: ISerializedResource[] = [];
    this.resources.forEach(r => {
      resources.push(r.serialize());
    })
    return {
      resources: resources
    };
  }

  deserialize(instantiationService: IInstantiationService, serial: SerializedResourceManager): ResourceManager {
    const instance = this;
    serial.resources.forEach(r => {
      const resource = Resource.deserialize(instantiationService, r);
      if (!resource) {
        console.warn('Failed to deserialize resource. ' + r);
        return;
      }
      instance.doAddResource(resource);
    })
    return instance;
  }

}