import { ResourceWidgetResourceViewModel } from "window/view/resource/model/resource-view-model";
import { Resource } from "internal/resource";

let __next_id = 0;

export class ResourceWidgetResourceViewModelImpl implements ResourceWidgetResourceViewModel {

  readonly id: number;
  readonly resource: Resource;

  constructor(resource: Resource) {
    this.id = __next_id++;
    this.resource = resource;
  }

}