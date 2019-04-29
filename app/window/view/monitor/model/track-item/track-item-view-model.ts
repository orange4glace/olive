import { MonitorWidgetSelectableViewModel, MonitorWidgetSelectableViewModelImpl } from "window/view/monitor/model/selectable-view-model";
import { TrackItem } from "internal/timeline/track-item";
import { declareViewModel } from "window/view/view-model";
import { Timeline } from "internal/timeline/timeline";

export const MonitorWidgetTrackItemViewModel = declareViewModel<MonitorWidgetTrackItemViewModel<any>>('MonitorWidgetTrackItemViewModel')
export interface MonitorWidgetTrackItemViewModel<T extends TrackItem> 
    extends MonitorWidgetSelectableViewModel {

  readonly trackItem: T;

}

export abstract class MonitorWidgetTrackItemViewModelImpl<T extends TrackItem>
    extends MonitorWidgetSelectableViewModelImpl
    implements MonitorWidgetTrackItemViewModel<T> {

  constructor(
    parent: MonitorWidgetSelectableViewModel,
    protected readonly timeline_: Timeline,
    readonly trackItem: T) {
    super(parent);
  }
}