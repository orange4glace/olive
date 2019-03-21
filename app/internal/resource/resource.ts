import ResourceType from "./type_t";
import { postable, Postable } from "worker-postable";

let next_resource_id = 0;

export interface ResourceBase {
  id: number;
}

@Postable
export class Resource implements ResourceBase {
  @postable readonly id: number;
  readonly type: ResourceType;

  constructor(type: ResourceType) {
    this.id = next_resource_id ++;
    this.type = type;
  }
}