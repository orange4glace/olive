import { MonitorWidgetDrawingViewModel, MonitorWidgetDrawingViewModelImpl } from "window/view/monitor/model/drawing/drawing-view-model";
import { RectangleDrawing } from "internal/rendering/drawing/rectangle-drawing";
import { mat2d, vec2 } from "gl-matrix";
import { declareViewModel } from "window/view/view-model";
import { StandardMouseEvent } from "base/view/mouseEvent";
import { InterruptableMouseMoveMonitor } from "window/view/common/interruptable-mouse-move-monitor";
import { Timeline } from "internal/timeline/timeline";
import { TrackItem } from "internal/timeline/track-item/track-item";
import { MonitorWidgetSelectableViewModelImpl, MonitorWidgetSelectableViewModelEvent } from "window/view/monitor/model/selectable-view-model";

export const MonitorWidgetRectangleDrawingViewModel =
    declareViewModel<MonitorWidgetRectangleDrawingViewModel>('MonitorWidgetRectangleDrawingViewModel')

export interface MonitorWidgetRectangleDrawingViewModel 
    extends MonitorWidgetDrawingViewModel<RectangleDrawing> {

  /*@observable*/ getControlPoints(): [vec2,vec2,vec2,vec2];

  onControlPointMouseDown(controlPointIndex: number, e: StandardMouseEvent): void;
  onControlPointMouseMoveStart(controlPointIndex: number, e: StandardMouseEvent): void;
}

@MonitorWidgetRectangleDrawingViewModel
export class MonitorWidgetRectangleDrawingViewModelImpl
    extends MonitorWidgetDrawingViewModelImpl<RectangleDrawing> 
    implements MonitorWidgetRectangleDrawingViewModel {

  private readonly mouseMoveMonitor = new InterruptableMouseMoveMonitor();

  constructor(parent: MonitorWidgetSelectableViewModelImpl, timeline: Timeline, trackItem: TrackItem, drawing: RectangleDrawing) {
    super(parent, timeline, trackItem, drawing);

    this.moveHandler = this.moveHandler.bind(this);

    this._register(this.mouseMoveMonitor);
    this._register(this.onMouseDown(e => this.mouseDownHandler(e)));
  }

  getControlPoints() {
    const timeOffset = this.trackItem_.getTimeoffset(this.timeline_.currentTime);
    const transMat = this.__getTransformMatrix();

    const size = this.drawing.rectangleEffect.size.getInterpolatedPropertyValue(timeOffset);
    const topLeft = vec2.fromValues(size.w, size.x);
    const topRight = vec2.fromValues(size.y, size.x);
    const bottomRight = vec2.fromValues(size.y, size.z);
    const bottomLeft = vec2.fromValues(size.w, size.z);
    let points: [vec2,vec2,vec2,vec2] =
        [topLeft, topRight, bottomRight, bottomLeft];
    points.forEach(point => { vec2.transformMat2d(point, point, transMat); });
    return points;
  }
  
  onControlPointMouseDown(controlPointIndex: number, e: StandardMouseEvent): void {
    e.stopPropagation();
  }

  onControlPointMouseMoveStart(controlPointIndex: number, e: StandardMouseEvent): void {
    e.stopPropagation();
    const flagMap = [
      [true, false, false, true],
      [true, true, false, false],
      [false, true, true, false],
      [false, false, true, true]];
    const resizeHandler = this.resize.bind(this, flagMap[controlPointIndex]);

    this.mouseMoveMonitor.startMonitoring(resizeHandler, null);
  }

  private resize(resizeFlag: [boolean, boolean, boolean, boolean], e: StandardMouseEvent) {
    const timeline = this.timeline_;
    const trackItem = this.trackItem_;
    const drawing = this.drawing;
    const timeoffset = trackItem.getTimeoffset(timeline.currentTime);

    const [dx, dy] = [e.movementX, e.movementY];
    let ori = vec2.fromValues(0, 0);
    let vec = vec2.fromValues(dx, dy);
    const invTransMat = this.__getInverseTransformMatrix();
    vec2.transformMat2d(ori, ori, invTransMat);
    vec2.transformMat2d(vec, vec, invTransMat);
    vec2.sub(vec, vec, ori);
    
    const sizeProperty = drawing.rectangleEffect.size;
    const currentSize = sizeProperty.getInterpolatedPropertyValue(timeoffset);

    let top = currentSize.x;
    let right = currentSize.y;
    let bottom = currentSize.z;
    let left = currentSize.w;

    if (resizeFlag[0]) top += vec[1];
    if (resizeFlag[1]) right += vec[0];
    if (resizeFlag[2]) bottom += vec[1];
    if (resizeFlag[3]) left += vec[0];

    sizeProperty.addKeyframeAt(timeoffset, sizeProperty.createValue(top, right, bottom, left));
  }

  mouseDownHandler(e: MonitorWidgetSelectableViewModelEvent) {
    this.__setFocused(true);
    this.mouseMoveMonitor.startMonitoring(this.moveHandler, null);
  }

  moveHandler(e: StandardMouseEvent) {
    const timeline = this.timeline_;
    const trackItem = this.trackItem_;
    const drawing = this.drawing;
    const timeoffset = trackItem.getTimeoffset(timeline.currentTime);

    const [dx, dy] = [e.movementX, e.movementY];
    let ori = vec2.fromValues(0, 0);
    let vec = vec2.fromValues(dx, dy);
    const invTransMat = this.__getInverseTransformMatrix();
    vec2.transformMat2d(ori, ori, invTransMat);
    vec2.transformMat2d(vec, vec, invTransMat);
    vec2.sub(vec, vec, ori);
    
    const positionProperty = drawing.transformEffect.position;
    const position = positionProperty.getInterpolatedPropertyValue(timeoffset);

    const x = position.x + vec[0];
    const y = position.y + vec[1];

    positionProperty.addKeyframeAt(timeoffset, positionProperty.createValue(x, y));
  }

  __select(x: number, y: number) {
    if (!this.trackItem_.isInTime(this.timeline_.currentTime)) return false;
    
    const drawing = this.drawing;
    const timeOffset = this.trackItem_.getTimeoffset(this.timeline_.currentTime);
    const vec: vec2 = vec2.fromValues(x, y);
    const transMat: mat2d = mat2d.create();
    mat2d.identity(transMat);

    const position = drawing.transformEffect.position.getInterpolatedPropertyValue(timeOffset);
    mat2d.translate(transMat, transMat, [-position.x, -position.y]);
    const scale = drawing.transformEffect.scale.getInterpolatedPropertyValue(timeOffset);
    mat2d.scale(transMat, transMat, [1 / scale.x, 1 / scale.y]);

    vec2.transformMat2d(vec, vec, transMat);

    const size = drawing.rectangleEffect.size.getInterpolatedPropertyValue(timeOffset);
    if (size.w <= vec[0] && vec[0] <= size.y && size.x <= vec[1] && vec[1] <= size.z) {
      return true;
    }
    return false;
  }

  __getChildren() {
    return [] as any;
  }

  __getLocalTransformMatrix(): mat2d {
    const drawing = this.drawing;
    const timeOffset = this.trackItem_.getTimeoffset(this.timeline_.currentTime);
    const transMat: mat2d = mat2d.create();

    const position = drawing.transformEffect.position.getInterpolatedPropertyValue(timeOffset);
    mat2d.translate(transMat, transMat, [position.x, position.y]);
    const scale = drawing.transformEffect.scale.getInterpolatedPropertyValue(timeOffset);
    mat2d.scale(transMat, transMat, [scale.x, scale.y]);

    return transMat;
  }

  __getLocalInverseTransformMatrix(): mat2d {
    const drawing = this.drawing;
    const timeOffset = this.trackItem_.getTimeoffset(this.timeline_.currentTime);
    const transMat: mat2d = mat2d.create();

    const position = drawing.transformEffect.position.getInterpolatedPropertyValue(timeOffset);
    mat2d.translate(transMat, transMat, [-position.x, -position.y]);
    const scale = drawing.transformEffect.scale.getInterpolatedPropertyValue(timeOffset);
    mat2d.scale(transMat, transMat, [1 / scale.x, 1 / scale.y]);

    return transMat;
  }

}