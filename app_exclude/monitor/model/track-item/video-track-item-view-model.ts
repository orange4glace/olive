import { VideoTrackItem } from "internal/timeline/video-track-item";
import { MonitorWidgetVideoDrawingViewModel } from "window/view/monitor/model/drawing/drawing-view-model";
import { MonitorWidgetTrackItemViewModel } from "window/view/monitor/model/track-item/track-item-view-model";

export interface MonitorWidgetVideoTrackItemViewModel
    extends MonitorWidgetTrackItemViewModel<VideoTrackItem> {

  readonly drawingViewModel: MonitorWidgetVideoDrawingViewModel<any>;

}