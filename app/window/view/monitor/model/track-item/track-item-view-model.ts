import { MonitorWidgetSelectableViewModel, MonitorWidgetSelectableViewModelImpl } from "window/view/monitor/model/selectable-view-model";
import { TrackItem } from "internal/timeline/track-item";
import { declareViewModel } from "window/view/view-model";
import { Timeline } from "internal/timeline/timeline";
import { mat2d } from "gl-matrix";

export const MonitorWidgetTrackItemViewModel = declareViewModel<MonitorWidgetTrackItemViewModel<any>>('MonitorWidgetTrackItemViewModel')
export interface MonitorWidgetTrackItemViewModel<T extends TrackItem> 
    extends MonitorWidgetSelectableViewModel {

  readonly trackItem: T;

}

export abstract class MonitorWidgetTrackItemViewModelImpl<T extends TrackItem>
    extends MonitorWidgetSelectableViewModelImpl
    implements MonitorWidgetTrackItemViewModel<T> {

  constructor(
    parent: MonitorWidgetSelectableViewModelImpl,
    protected readonly timeline_: Timeline,
    readonly trackItem: T) {
    super(parent);
  }

  __getLocalTransformMatrix() {
    let mat = mat2d.create();
    mat2d.identity(mat);
    return mat;
  }

  __getLocalInverseTransformMatrix() {
    let mat = mat2d.create();
    mat2d.identity(mat);
    return mat;
  }

  __select(x: number, y: number): boolean {
    return false;
  }
}