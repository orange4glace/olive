import { postable, Postable } from "worker-postable";
import { Serializable } from "base/olive/serialize";

let next_resource_id = 0;

export interface ResourceBase {
  id: number;
  path: string;
}

export interface IResource extends ResourceBase, Serializable {
  readonly type: string;
}

export interface ResourceSerial {
  id: number;
  path: string;
  type: string;
}

@Postable
export abstract class Resource implements IResource {
  @postable readonly id: number;
  @postable readonly path: string;
  readonly type: string;

  constructor(type: string, path: string) {
    this.id = next_resource_id ++;
    this.type = type;
    this.path = path;
  }

  serialize() {
    const serial: ResourceSerial = {
      id: this.id,
      path: this.path,
      type: this.type
    };
    return serial;
  }
}