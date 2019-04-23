import { MonitorWidgetSelectableViewModel } from "window/view/monitor/model/timeline/selectable-view-model";

export interface MonitorWidgetModel {

  readonly currentSelectable: MonitorWidgetSelectableViewModel;

  select(x: number, y: number): void;

}