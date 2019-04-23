import { mat2d } from "gl-matrix";

export interface MonitorWidgetSelectableViewModel {

  /*@observable*/ readonly focused: boolean;

  traverse(func: (self: MonitorWidgetSelectableViewModel)=>void): void;
  select(x: number, y: number): MonitorWidgetSelectableViewModel;
  getTransformMat(): mat2d;

}