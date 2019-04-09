import app from 'internal/app';

import ResourceHost from './resouce-host'
import { ResourceManager, Resource } from 'internal/resource';

export default class ResourceViewController {

  private resourceManager: ResourceManager;
  private resourceHosts: Map<Resource, ResourceHost> = new Map();

  constructor(resourceManager: ResourceManager) {
    this.resourceManager = resourceManager;
    console.log(resourceManager)
  }

  addResource(path: string): void {
    app.resource.addResource(path);
    // const resource = app.factory.createResource(path);
    // this.resourceManager.addResource(resource);
  }

}