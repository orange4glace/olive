import * as React from 'react'
import { IMonitorWidgetDrawingView, MonitorWidgetDrawingView, MonitorWidgetDrawingViewComponent, MonitorWidgetDrawingProps, DrawingViewSelectorRegistry } from "window/workbench/common/widgets/monitor/model/drawing/drawing-view";
import { VideoMediaDrawing } from "internal/rendering/drawing/video-media-drawing";
import { vec2, mat2d } from "gl-matrix";
import { StandardMouseEvent } from "base/browser/mouseEvent";
import { InterruptableMouseMoveMonitor } from "window/view/common/interruptable-mouse-move-monitor";
import { MonitorWidgetSelectableView, MonitorWidgetSelectableViewEvent } from "window/workbench/common/widgets/monitor/model/selectable-view";
import { ITimeline } from "internal/timeline/timeline";
import { ITrackItem } from "internal/timeline/track-item/track-item";
import { observer } from "window/app-mobx";
import { createStandardMouseEvent } from "base/olive/mouse-event";
import { MonitorWidgetDrawingControlPoint } from 'window/workbench/common/widgets/monitor/model/drawing/drawing-control-views';
import { Registry } from 'platform/registry/common/platform';
import { RectangleDrawing } from 'internal/rendering/drawing/rectangle-drawing';

export interface IMonitorWidgetVideoMediaDrawingView
    extends IMonitorWidgetDrawingView<VideoMediaDrawing> {

  /*@observable*/ getControlPoints(): [vec2,vec2,vec2,vec2];

  onControlPointMouseDown(controlPointIndex: number, e: StandardMouseEvent): void;
  onControlPointMouseMoveStart(controlPointIndex: number, e: StandardMouseEvent): void;
}

export class MonitorWidgetVideoMediaDrawingView
    extends MonitorWidgetDrawingView<VideoMediaDrawing> 
    implements IMonitorWidgetVideoMediaDrawingView {

  private readonly mouseMoveMonitor = new InterruptableMouseMoveMonitor();

  constructor(parent: MonitorWidgetSelectableView, timeline: ITimeline, trackItem: ITrackItem, drawing: VideoMediaDrawing) {
    super(parent, timeline, trackItem, drawing);

    this.moveHandler = this.moveHandler.bind(this);

    this._register(this.mouseMoveMonitor);
    this._register(this.onMouseDown(e => this.mouseDownHandler(e)));
  }

  getControlPoints() {
    const transMat = this.__getTransformMatrix();

    const w = this.drawing.resource.width;
    const h = this.drawing.resource.height;
    const topLeft = vec2.fromValues(0, 0);
    const topRight = vec2.fromValues(w, 0);
    const bottomRight = vec2.fromValues(w, h);
    const bottomLeft = vec2.fromValues(0, h);
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
    // const timeline = this.timeline_;
    // const trackItem = this.trackItem_;
    // const drawing = this.drawing;
    // const timeoffset = trackItem.getTimeoffset(timeline.currentTime);

    // const [dx, dy] = [e.movementX, e.movementY];
    // let ori = vec2.fromValues(0, 0);
    // let vec = vec2.fromValues(dx, dy);
    // const invTransMat = this.__getInverseTransformMatrix();
    // vec2.transformMat2d(ori, ori, invTransMat);
    // vec2.transformMat2d(vec, vec, invTransMat);
    // vec2.sub(vec, vec, ori);
    
    // const scaleProperty = drawing.transformEffect.scale;
    // const currentScale = scaleProperty.getInterpolatedPropertyValue(timeoffset);

    // let top = currentSize.x;
    // let right = currentSize.y;
    // let bottom = currentSize.z;
    // let left = currentSize.w;

    // if (resizeFlag[0]) top += vec[1];
    // if (resizeFlag[1]) right += vec[0];
    // if (resizeFlag[2]) bottom += vec[1];
    // if (resizeFlag[3]) left += vec[0];

    // sizeProperty.addKeyframeAt(timeoffset, sizeProperty.createValue(top, right, bottom, left));
  }

  mouseDownHandler(e: MonitorWidgetSelectableViewEvent) {
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

    const w = this.drawing.resource.width;
    const h = this.drawing.resource.height;

    if (0 <= vec[0] && vec[0] <= w && 0 <= vec[1] && vec[1] <= h)
      return true;
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

  render(): React.ReactNode {
    return <MonitorWidgetVideoMediaDrawingViewComponent view={this}/>
  }

}




@observer
export class MonitorWidgetVideoMediaDrawingViewComponent extends
    MonitorWidgetDrawingViewComponent<MonitorWidgetVideoMediaDrawingView> {

  readonly p0ControlPointMouseDownHandler: (e: React.MouseEvent) => void;
  readonly p1ControlPointMouseDownHandler: (e: React.MouseEvent) => void;
  readonly p2ControlPointMouseDownHandler: (e: React.MouseEvent) => void;
  readonly p3ControlPointMouseDownHandler: (e: React.MouseEvent) => void;

  readonly p0ControlPointMouseMoveStartHandler: (e: MouseEvent) => void;
  readonly p1ControlPointMouseMoveStartHandler: (e: MouseEvent) => void;
  readonly p2ControlPointMouseMoveStartHandler: (e: MouseEvent) => void;
  readonly p3ControlPointMouseMoveStartHandler: (e: MouseEvent) => void;

  constructor(props: MonitorWidgetDrawingProps<MonitorWidgetVideoMediaDrawingView>) {
    super(props);

    this.p0ControlPointMouseDownHandler = 
        this.controlPointMouseDownHandler.bind(this, 0);
    this.p1ControlPointMouseDownHandler = 
        this.controlPointMouseDownHandler.bind(this, 1);
    this.p2ControlPointMouseDownHandler = 
        this.controlPointMouseDownHandler.bind(this, 2);
    this.p3ControlPointMouseDownHandler = 
        this.controlPointMouseDownHandler.bind(this, 3);

    this.p0ControlPointMouseMoveStartHandler =
        this.controlPointMouseMoveStartHandler.bind(this, 0);
    this.p1ControlPointMouseMoveStartHandler =
        this.controlPointMouseMoveStartHandler.bind(this, 1);
    this.p2ControlPointMouseMoveStartHandler =
        this.controlPointMouseMoveStartHandler.bind(this, 2);
    this.p3ControlPointMouseMoveStartHandler =
        this.controlPointMouseMoveStartHandler.bind(this, 3);
  }

  controlPointMouseDownHandler(index: number, e: React.MouseEvent) {
    this.props.view.onControlPointMouseDown(index, createStandardMouseEvent(e));
  }

  controlPointMouseMoveStartHandler(index: number, e: React.MouseEvent) {
    this.props.view.onControlPointMouseMoveStart(index, createStandardMouseEvent(e));
  }

  render() {
    const view = this.props.view;
    const points = view.getControlPoints();
    const topLeft = points[0];
    const topRight = points[1];
    const bottomRight = points[2];
    const bottomLeft = points[3];

    if (view.focused) return (
        <div className='drawing-view'>
          <MonitorWidgetDrawingControlPoint x={topLeft[0]} y={topLeft[1]}
              onMouseDown={this.p0ControlPointMouseDownHandler}
              onMouseMoveStart={this.p0ControlPointMouseMoveStartHandler}/>
          <MonitorWidgetDrawingControlPoint x={topRight[0]} y={topRight[1]}
              onMouseDown={this.p1ControlPointMouseDownHandler}
              onMouseMoveStart={this.p1ControlPointMouseMoveStartHandler}/>
          <MonitorWidgetDrawingControlPoint x={bottomRight[0]} y={bottomRight[1]}
              onMouseDown={this.p2ControlPointMouseDownHandler}
              onMouseMoveStart={this.p2ControlPointMouseMoveStartHandler}/>
          <MonitorWidgetDrawingControlPoint x={bottomLeft[0]} y={bottomLeft[1]}
              onMouseDown={this.p3ControlPointMouseDownHandler}
              onMouseMoveStart={this.p3ControlPointMouseMoveStartHandler}/>
        </div>)
    else return null;
  }

}

Registry.as<DrawingViewSelectorRegistry>(DrawingViewSelectorRegistry.ID).registerView(VideoMediaDrawing.TYPE, MonitorWidgetVideoMediaDrawingView)