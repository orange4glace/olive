import { observable, action } from 'mobx';
import { Probe, VideoProbeResult, AudioProbeResult } from './probe'
import ResourceType from './type_t';
import { VideoResource } from './video-resource';
import { Resource } from './resource';
import { Emitter, Event } from 'base/common/event';
import { TrackItemTime } from 'internal/timeline/track-item/track-item-time';
import { VideoMediaTrackItemImpl } from 'internal/timeline/track-item/video-media-track-item';
import { AudioResource } from 'internal/resource/audio-resource';
import { AudioTrackItemImpl } from 'internal/timeline/track-item/audio-track-item';

export interface ResourceManagerResourceEvent {
  resource: Resource
}

export default class ResourceManager {
  @observable resources: Set<Resource> = new Set();
  probe: Probe;

  constructor() {
    this.probe = new Probe();
  }

  @action
  async addResource(path: string) {
    try {
      let results = await this.probe.probe(path);
      results.forEach(result => {
        switch (result.type) {
          case ResourceType.VIDEO:
            const videoResult = result as VideoProbeResult;
            const videoResource = new VideoResource(path, videoResult.width, videoResult.height, videoResult.duration);
            this.resources.add(videoResource);
            this.onResourceAdded_.fire({resource: videoResource});
            break;
          case ResourceType.AUDIO:
            const audioResult = result as AudioProbeResult;
            const audioResource = new AudioResource(path, audioResult.duration);
            this.resources.add(audioResource);
            this.onResourceAdded_.fire({resource: audioResource});
            break;
          default:
            return null;
        }
      })
    } catch (e) {
      return e;
    }
  }

  trackItemize(resource: Resource) {
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

  private onResourceAdded_: Emitter<ResourceManagerResourceEvent> = new Emitter();
  onResourceAdded: Event<ResourceManagerResourceEvent> = this.onResourceAdded_.event;

}