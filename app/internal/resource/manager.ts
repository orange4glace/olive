import app from 'internal/app';
import { observable, action } from 'mobx';

import { IResourceManager } from 'standard'
import Resource from 'internal/resource/resource';

type PathString = string;

export default class ResourceManager implements IResourceManager {
  private resourceMap: Map<PathString, Resource>;
  @observable resources: Array<Resource>;

  constructor() {
    this.resourceMap = new Map<PathString, Resource>();
    this.resources = [];
  }

  @action
  addResource(path: PathString): void {
    // Check if resource already exists
    if (this.resourceMap.has(path)) return;

    let resource = new Resource(path);
    if (resource.isImage()) {
      
    }
    else if (resource.isVideo()) {
    }
    console.log(app.decoder)
    app.decoder.AddResource(resource.path);
    this.resourceMap.set(path, resource);
    this.resources.push(resource);
  }
}