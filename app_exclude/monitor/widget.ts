import { Widget } from "window/view/widget";
import { MonitorWidgetModel } from "window/view/monitor/model/timeline/model";

export abstract class MonitorWidget extends Widget {
  
  model: MonitorWidgetModel;

}