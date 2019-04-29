import { Drawing } from "internal/rendering/drawing/drawing";
import { MonitorWidgetSelectableViewModel, MonitorWidgetSelectableViewModelImpl } from "window/view/monitor/model/selectable-view-model";
import { Timeline } from "internal/timeline/timeline";
import { TrackItem } from "internal/timeline/track-item";

export interface MonitorWidgetDrawingViewModel<T extends Drawing>
    extends MonitorWidgetSelectableViewModel {

  readonly drawing: T;

}

export abstract class MonitorWidgetDrawingViewModelImpl<T extends Drawing>
    extends MonitorWidgetSelectableViewModelImpl
    implements MonitorWidgetDrawingViewModel<T> {

  constructor(
      parent: MonitorWidgetSelectableViewModelImpl,
      protected readonly timeline_: Timeline,
      protected readonly trackItem_: TrackItem,
      readonly drawing: T) {
    super(parent);
  }

}