import { Widget } from "window/view/widget";
import { ResourceWidgetModel } from "window/view/resource/model/model";
import { ResourceWidgetController } from "window/view/resource/controller/controller";

export abstract class ResourceWidget extends Widget {

  model: ResourceWidgetModel;
  controller: ResourceWidgetController;

}