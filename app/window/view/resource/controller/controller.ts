import { IResourceManager, IResource } from 'standard'
import app from 'internal/app';

import ResourceHost from './resouce-host'

export default class ResourceViewController {

  private resourceManager: IResourceManager;
  private resourceHosts: Map<IResource, ResourceHost> = new Map();

  constructor(resourceManager: IResourceManager) {
    this.resourceManager = resourceManager;
    console.log(resourceManager)
  }

  addResource(path: string): void {
    const resource = app.factory.createResource(path);
    this.resourceManager.addResource(resource);
  }

}