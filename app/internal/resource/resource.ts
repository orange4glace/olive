import ResourceType from "./type_t";

let next_resource_id = 0;

export default class Resource {
  readonly id: number;
  readonly type: ResourceType;

  constructor(type: ResourceType) {
    this.id = next_resource_id ++;
    this.type = type;
  }
}