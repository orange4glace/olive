import { IResourceManager, IResource } from 'standard'

import ResourceHost from './resouce-host'

export default class ResourceViewController {

  private resourceManager: IResourceManager;
  private resourceHosts: Map<IResource, ResourceHost> = new Map();

  constructor(resourceManager: IResourceManager) {
    this.resourceManager = resourceManager;
    console.log(resourceManager)
  }

  addResource(path: string): void {
    this.resourceManager.addResource(path);
  }

}