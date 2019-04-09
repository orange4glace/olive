import ResourceType from "./type_t";
import { postable, Postable } from "worker-postable";

let next_resource_id = 0;

export interface ResourceBase {
  id: number;
  path: string;
}

@Postable
export class Resource implements ResourceBase {
  @postable readonly id: number;
  @postable readonly path: string;
  readonly type: ResourceType;

  constructor(type: ResourceType, path: string) {
    this.id = next_resource_id ++;
    this.type = type;
    this.path = path;
  }
}