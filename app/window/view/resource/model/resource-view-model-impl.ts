import { ResourceWidgetResourceViewModel } from "window/view/resource/model/resource-view-model";
import { IResource } from "internal/resource/resource";

let __next_id = 0;

export class ResourceWidgetResourceViewModelImpl implements ResourceWidgetResourceViewModel {

  readonly id: number;
  readonly resource: IResource;

  constructor(resource: IResource) {
    this.id = __next_id++;
    this.resource = resource;
  }

}