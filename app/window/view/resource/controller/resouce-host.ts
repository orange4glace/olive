import { Resource } from "internal/resource";

export default class ResourceHost {

  resource: Resource;

  constructor(resource: Resource) {
    this.resource = resource;
  }

}