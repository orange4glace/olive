import { Drawing } from "internal/rendering/drawing/drawing";
import { VideoDrawing } from "internal/rendering/drawing/video-drawing";
import { MonitorWidgetSelectableViewModel } from "window/view/monitor/model/timeline/selectable-view-model";

export interface MonitorWidgetDrawingViewModel<T extends Drawing> extends MonitorWidgetSelectableViewModel {

  readonly drawing: T;

}

export interface MonitorWidgetVideoDrawingViewModel extends MonitorWidgetDrawingViewModel<VideoDrawing> {

}