import { MonitorWidgetSelectableViewModel } from "window/view/monitor/model/timeline/selectable-view-model";
import { ViewModel } from "window/view/view-model";

export interface MonitorWidgetModel extends ViewModel {

  readonly 

  select(x: number, y: number): void;

}