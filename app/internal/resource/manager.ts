import { observable, action } from 'mobx';
import { Probe, VideoProbeResult, AudioProbeResult } from './probe'
import ResourceType from './type_t';
import { VideoResource, IVideoResource } from './video-resource';
import { Resource, IResource } from './resource';
import { Emitter, Event } from 'base/common/event';
import { TrackItemTime } from 'internal/timeline/track-item/track-item-time';
import { VideoMediaTrackItemImpl } from 'internal/timeline/track-item/video-media-track-item';
import { AudioResource, IAudioResource } from 'internal/resource/audio-resource';
import { AudioTrackItemImpl } from 'internal/timeline/track-item/audio-track-item';
import { ITrackItem } from 'internal/timeline/track-item/track-item';

export interface ResourceManagerResourceEvent {
  resource: Resource
}

export interface IResourceManager {

  /*@observable*/ resources: Set<IResource>;

  createResource(path: string): Promise<{
    video: IVideoResource,
    audio: IAudioResource
  }>;
  trackItemize(resource: IResource): ITrackItem;

}

export class ResourceManager implements IResourceManager {

  @observable resources: Set<IResource> = new Set();

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
          case ResourceType.VIDEO:
            const videoResult = result as VideoProbeResult;
            videoResource = new VideoResource(path, videoResult.width, videoResult.height, videoResult.duration);
            this.resources.add(videoResource);
            this.onResourceAdded_.fire(videoResource);
            break;
          case ResourceType.AUDIO:
            const audioResult = result as AudioProbeResult;
            audioResource = new AudioResource(path, audioResult.duration);
            this.resources.add(audioResource);
            this.onResourceAdded_.fire(audioResource);
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
  
  trackItemize(resource: IResource) {
    let trackItem;
    if (resource.type == ResourceType.VIDEO) {
      const videoResource = resource as VideoResource;
      trackItem = new VideoMediaTrackItemImpl(resource as VideoResource);
      trackItem.__setTime(new TrackItemTime(0, videoResource.duration, 0));
    }
    if (resource.type == ResourceType.AUDIO) {
      const audioResource = resource as AudioResource;
      trackItem = new AudioTrackItemImpl(resource as AudioResource);
      trackItem.__setTime(new TrackItemTime(0, audioResource.duration, 0));
    }
    return trackItem;
  }

  private onResourceAdded_: Emitter<IResource> = new Emitter();
  onResourceAdded: Event<IResource> = this.onResourceAdded_.event;

}