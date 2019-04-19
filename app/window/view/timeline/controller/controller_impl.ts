import { TimelineWidgetModel } from "window/view/timeline/model/model";
import { TimelineWidgetController } from "window/view/timeline/controller/controller";
import { TimelineWidgetManipulatorControllerImpl } from "window/view/timeline/controller/manipulator_impl";

export class TimelineWidgetControllerImpl extends TimelineWidgetController {

  readonly manipulator: TimelineWidgetManipulatorControllerImpl;

  constructor(model: TimelineWidgetModel) {
    super();
    this.manipulator = new TimelineWidgetManipulatorControllerImpl(model);
  }

}