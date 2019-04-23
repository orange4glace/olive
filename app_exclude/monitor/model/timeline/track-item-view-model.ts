import { MonitorWidgetSelectableViewModel } from "window/view/monitor/model/timeline/selectable-view-model";
import { MonitorWidgetRenderingViewModel } from "window/view/monitor/model/timeline/rendering-view-model";
import { Timeline } from "internal/timeline/timeline";
import { TrackItem } from "internal/timeline/track-item";

export interface MonitorWidgetTrackItemViewModel extends MonitorWidgetSelectableViewModel {

  renderingViewModels: ReadonlyArray<MonitorWidgetRenderingViewModel<any>>;

}