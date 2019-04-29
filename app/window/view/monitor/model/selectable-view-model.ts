import { Event, Emitter } from "base/common/event";
import { ViewModel, ViewModelImpl } from "window/view/view-model";
import { mat2d } from "gl-matrix";
import { observable } from "window/app-mobx";

export interface MonitorWidgetSelectableViewModelSelectedEvent {
  target: MonitorWidgetSelectableViewModel;
  capture: boolean;
}

export interface MonitorWidgetSelectableViewModel extends ViewModel {

  readonly parent: MonitorWidgetSelectableViewModel;
  readonly onFocused: Event<MonitorWidgetSelectableViewModelSelectedEvent>;

  /*@observable*/ readonly focused: boolean;

  select(timeOFfset: number, x: number, y: number): boolean;
  getTransformMatrix(timeOffset: number): mat2d;
  getInverseTransformMatrix(timeOffset: number): mat2d;

}

 export abstract class MonitorWidgetSelectableViewModelImpl
    extends ViewModelImpl
    implements MonitorWidgetSelectableViewModel {

  onFocused_: Emitter<MonitorWidgetSelectableViewModelSelectedEvent> = new Emitter();
  readonly onFocused: Event<MonitorWidgetSelectableViewModelSelectedEvent> = this.onFocused_.event;

  @observable focused: boolean;

  constructor(readonly parent: MonitorWidgetSelectableViewModel) {
    super();
    this.focused = false;
  }

  abstract select(timeOffset: number, x: number, y: number): boolean;
  abstract getTransformMatrix(timeOffset: number): mat2d;
  abstract getInverseTransformMatrix(timeOffset: number): mat2d;

}