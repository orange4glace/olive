import { ResourceWidgetResourceViewModel } from "window/view/resource/model/resource-view-model";
import { ResourceManager } from "internal/resource";

export interface ResourceWidgetModel {

  readonly resourceManager: ResourceManager;
  readonly resourceViewModels: ReadonlyArray<ResourceWidgetResourceViewModel>;

}