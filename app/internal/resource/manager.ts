import app from 'internal/app';
import { observable, action } from 'mobx';
import { Probe, VideoProbeResult } from './probe'
import ResourceType from './type_t';
import { VideoResource } from './video-resource';
import { Resource } from './resource';

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
          return videoResource;
        default:
          return null;
      }
    } catch (e) {
      return e;
    }
  }
}