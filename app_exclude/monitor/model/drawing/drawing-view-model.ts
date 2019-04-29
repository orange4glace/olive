import { Drawing } from "internal/rendering/drawing/drawing";
import { VideoDrawing } from "internal/rendering/drawing/video-drawing";
import { MonitorWidgetSelectableViewModel } from "window/view/monitor/model/selectable-view-model";

export interface MonitorWidgetDrawingViewModel<T extends Drawing> extends MonitorWidgetSelectableViewModel {

}

export abstract class MonitorWidgetDrawingViewModelImpl
    implements MonitorWidgetDrawingViewModel<any> {

  selected: boolean;

  abstract select(x: number, y: number): MonitorWidgetDrawingViewModel;
  
}

export interface MonitorWidgetVideoDrawingViewModel<T extends VideoDrawing> extends MonitorWidgetDrawingViewModel<T> {

}

export abstract class 