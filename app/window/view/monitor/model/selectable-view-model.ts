import { Event, Emitter } from "base/common/event";
import { ViewModel, ViewModelImpl } from "window/view/view-model";
import { mat2d, vec2 } from "gl-matrix";
import { observable } from "window/app-mobx";

export class MonitorWidgetSelectableViewModelEvent {
  type: 'mousedown' | 'mousemovestart';
  target: MonitorWidgetSelectableViewModel;
  stopped: boolean;

  constructor(type: 'mousedown' | 'mousemovestart') {
    this.type = type;
  }

  stopPropagation(): void {
    this.stopped = true;
  }
}

export interface MonitorWidgetSelectableViewModel extends ViewModel {

  readonly onMouseDown: Event<MonitorWidgetSelectableViewModelEvent>;

  fireMouseDown(x: number, y: number): void;

}

 export abstract class MonitorWidgetSelectableViewModelImpl
    extends ViewModelImpl
    implements MonitorWidgetSelectableViewModel {

  onMouseDown_: Emitter<MonitorWidgetSelectableViewModelEvent> = new Emitter();
  readonly onMouseDown: Event<MonitorWidgetSelectableViewModelEvent> = this.onMouseDown_.event;

  protected onMouseDownFailed_: Emitter<MonitorWidgetSelectableViewModelEvent> = new Emitter();
  protected readonly onMouseDownFailed: Event<MonitorWidgetSelectableViewModelEvent> = this.onMouseDownFailed_.event;

  constructor(readonly parent: MonitorWidgetSelectableViewModelImpl) {
    super();
  }

  fireMouseDown(x: number, y: number): void {
    const e = new MonitorWidgetSelectableViewModelEvent('mousedown');
    this.__fireMouseDown(x, y, x, y, e);
  }

  private __fireMouseDown(x: number, y: number, localX: number, localY: number, e: MonitorWidgetSelectableViewModelEvent): void {
    let localVec = vec2.fromValues(localX, localY);
    vec2.transformMat2d(localVec, localVec, this.__getLocalInverseTransformMatrix());
    const children = this.__getChildren();

    for (let i = 0; i < children.length; i ++) {
      const child = children[i];
      if (e.target) child.__fireMouseDownFailed(x, y, localX, localY, e);
      else {
        child.__fireMouseDown(x, y, localVec[0], localVec[1], e);
        if (!e.target) child.onMouseDownFailed_.fire(e);
      }
    }

    if (e.target == null && this.__select(localX, localY))
        e.target = this as MonitorWidgetSelectableViewModel;
    if (e.target != null) {
      if (!e.stopped) this.onMouseDown_.fire(e);
      else this.onMouseDownFailed_.fire(e);
    }
  }

  private __fireMouseDownFailed(x: number, y: number, localX: number, localY: number, e: MonitorWidgetSelectableViewModelEvent): void {
    let localVec = vec2.fromValues(localX, localY);
    vec2.transformMat2d(localVec, localVec, this.__getLocalInverseTransformMatrix());
    const children = this.__getChildren();
    for (let i = 0; i < children.length; i ++) {
      const child = children[i];
      child.__fireMouseDownFailed(x, y, localVec[0], localVec[1], e);
    }
    this.onMouseDownFailed_.fire(e);
  }

  protected __getTransformMatrix(): mat2d {
    let mat = this.__getLocalTransformMatrix();
    if (this.parent)
      mat2d.mul(mat, this.parent.__getTransformMatrix(), mat);
    return mat;
  }

  protected __getInverseTransformMatrix(): mat2d {
    let mat = this.__getLocalInverseTransformMatrix();
    if (this.parent)
      mat2d.mul(mat, this.parent.__getInverseTransformMatrix(), mat);
    return mat;
  }

  protected abstract __getChildren(): MonitorWidgetSelectableViewModelImpl[];
  protected abstract __select(localX: number, localY: number): boolean;

  protected abstract __getLocalTransformMatrix(): mat2d;
  protected abstract __getLocalInverseTransformMatrix(): mat2d;

}