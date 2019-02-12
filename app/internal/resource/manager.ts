import app from 'internal/app';
import { observable, action } from 'mobx';

import Resource from 'internal/resource/resource';

type PathString = string;

export default class ResourceManager {
  private resourceMap: Map<PathString, Resource>;
  @observable resources: Array<Resource>;

  constructor() {
    this.resourceMap = new Map<PathString, Resource>();
    this.resources = [];
  }

  @action
  addResource(path: PathString) {
    // Check if resource already exists
    if (this.resourceMap.has(path)) return;

    let resource = new Resource(path);
    if (resource.isImage()) {
      
    }
    else if (resource.isVideo()) {
      app.decoder.addVideoResource(resource.path);
    }
    this.resourceMap.set(path, resource);
    this.resources.push(resource);
  }
}