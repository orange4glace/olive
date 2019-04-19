import app from 'internal/app';
import { observable, action } from 'mobx';
import { Probe, VideoProbeResult } from './probe'
import ResourceType from './type_t';
import { VideoResource } from './video-resource';
import { Resource } from './resource';
import { Emitter, Event } from 'base/common/event';

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
      let result = await this.probe.probe(path);
      switch (result.type) {
        case ResourceType.VIDEO:
          const videoResult = result as VideoProbeResult;
          const videoResource = new VideoResource(path, videoResult.width, videoResult.height, videoResult.duration);
          this.resources.add(videoResource);
          this.onResourceAdded_.fire({resource: videoResource});
          return videoResource;
        default:
          return null;
      }
    } catch (e) {
      return e;
    }
  }

  private onResourceAdded_: Emitter<ResourceManagerResourceEvent> = new Emitter();
  onResourceAdded: Event<ResourceManagerResourceEvent> = this.onResourceAdded_.event;

}