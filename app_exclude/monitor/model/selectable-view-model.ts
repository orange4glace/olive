import { mat2d } from "gl-matrix";

export interface MonitorWidgetSelectableViewModel {

  /*@observable*/ readonly selected: boolean;

  select(x: number, y: number): MonitorWidgetSelectableViewModel;
  getTransformMat(): mat2d;

}