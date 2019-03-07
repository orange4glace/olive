import { IResource } from 'standard'

export default class ResourceHost {

  resource: IResource;

  constructor(resource: IResource) {
    this.resource = resource;
  }

}