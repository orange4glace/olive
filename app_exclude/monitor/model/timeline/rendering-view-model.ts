import { Rendering } from "internal/rendering/rendering/rendering";
import { MonitorWidgetSelectableViewModel } from "window/view/monitor/model/timeline/selectable-view-model";

export interface MonitorWidgetRenderingViewModel<T extends Rendering> extends MonitorWidgetSelectableViewModel {

  readonly rendering: T;

}