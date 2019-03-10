import app from 'internal/app';
import { observable, action } from 'mobx';

import { IResourceManager, IResource } from 'standard'
import Resource from 'internal/resource/resource';

type PathString = string;

export default class ResourceManager implements IResourceManager {
  @observable resources: Set<IResource> = new Set();

  constructor() {
  }

  @action
  addResource(resource: IResource): void {
    this.resources.add(resource);
  }
}