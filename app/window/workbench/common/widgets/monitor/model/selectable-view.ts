import { Event, Emitter } from "base/common/event";
import { mat2d, vec2 } from "gl-matrix";
import { Disposable } from "base/common/lifecycle";

export class MonitorWidgetSelectableViewEvent {
  type: 'mousedown' | 'mousemovestart';
  target: MonitorWidgetSelectableView;
  stopped: boolean;

  constructor(type: 'mousedown' | 'mousemovestart') {
    this.type = type;
  }

  stopPropagation(): void {
    this.stopped = true;
  }
}

export interface IMonitorWidgetSelectableView {

  readonly onMouseDown: Event<MonitorWidgetSelectableViewEvent>;

  fireMouseDown(x: number, y: number): void;

}

 export abstract class MonitorWidgetSelectableView extends Disposable
    implements IMonitorWidgetSelectableView {

  onMouseDown_: Emitter<MonitorWidgetSelectableViewEvent> = new Emitter();
  readonly onMouseDown: Event<MonitorWidgetSelectableViewEvent> = this.onMouseDown_.event;

  protected onMouseDownFailed_: Emitter<MonitorWidgetSelectableViewEvent> = new Emitter();
  protected readonly onMouseDownFailed: Event<MonitorWidgetSelectableViewEvent> = this.onMouseDownFailed_.event;

  constructor(readonly parent: MonitorWidgetSelectableView) {
    super();
  }

  fireMouseDown(x: number, y: number): void {
    const e = new MonitorWidgetSelectableViewEvent('mousedown');
    this.__fireMouseDown(x, y, x, y, e);
  }

  private __fireMouseDown(x: number, y: number, localX: number, localY: number, e: MonitorWidgetSelectableViewEvent): void {
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
        e.target = this as MonitorWidgetSelectableView;
    if (e.target != null) {
      if (!e.stopped) this.onMouseDown_.fire(e);
      else this.onMouseDownFailed_.fire(e);
    }
  }

  private __fireMouseDownFailed(x: number, y: number, localX: number, localY: number, e: MonitorWidgetSelectableViewEvent): void {
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

  protected abstract __getChildren(): MonitorWidgetSelectableView[];
  protected abstract __select(localX: number, localY: number): boolean;

  protected abstract __getLocalTransformMatrix(): mat2d;
  protected abstract __getLocalInverseTransformMatrix(): mat2d;

}