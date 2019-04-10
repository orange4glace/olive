import * as React from 'react'
import { DrawingHost } from 'window/view/timeline/controller/drawing-host';
import { RendererViewController } from '../controller/renderer-view-controller';
import { TrackItemHost } from 'window/view/timeline/controller';
import VideoDrawing from 'internal/drawing/video-drawing';
import { vec2 } from 'gl-matrix';
import { RendererDrawingControlPoint } from './drawing-control-point';
import { Drawing, Rectangle, ScalarProperty, Polygon } from 'internal/drawing';
import { DrawingType } from 'internal/drawing/drawing-type';
import { observer } from 'window/app-mobx';
import { RendererUIViewProps } from './renderer-ui-view';
import { RendererDrawingControlLine } from './drawing-control-line';

interface RendererUITrackItemViewProps extends RendererUIViewProps {
  trackItemHost: TrackItemHost;
}

export class RendererUITrackItemView extends React.PureComponent<RendererUITrackItemViewProps, {}> {

  render() {
    const trackItemHost = this.props.trackItemHost;
    return (
      <RendererUIDrawingViewRenderer {...this.props} drawingHost={trackItemHost.drawingHost}/>)
  }

}


interface RendererUIDrawingProps<T extends Drawing> extends RendererUITrackItemViewProps {
  drawingHost: DrawingHost<T>;
}

class RendererUIDrawingViewRenderer extends React.PureComponent<RendererUIDrawingProps<Drawing>, {}> {

  render() {
    let drawingHost = this.props.drawingHost;
    let view;
    switch (drawingHost.drawing.type) {
      case DrawingType.VIDEO:
        let videoDrawingHost = drawingHost as DrawingHost<VideoDrawing>;
        view = <RendererVideoDrawingView {...this.props} drawingHost={videoDrawingHost}/>;
        break;
      case DrawingType.RECTANGLE:
        let rectangleDrawingHost = drawingHost as DrawingHost<Rectangle>;
        view = <RendererRectangleDrawingView {...this.props} drawingHost={rectangleDrawingHost}/>;
        break;
      case DrawingType.POLYGON:
        let polygonDrawingHost = drawingHost as DrawingHost<Polygon>;
        view = <RendererPolygonDrawingView {...this.props} drawingHost={polygonDrawingHost}/>;
        break;
      default:
        view = <></>
    }
    return (
      <>
        {view}
        {[...drawingHost.childrenDrawingHosts].map(([childDrawing, childDrawingHost]) =>
          <RendererUIDrawingViewRenderer {...this.props} drawingHost={childDrawingHost}/>
        )}
      </>
    )
  }

}

abstract class RendererDrawingViewBase<T extends Drawing>
    extends React.Component<RendererUIDrawingProps<T>, {}> {
  
}

@observer
export class RendererVideoDrawingView extends RendererDrawingViewBase<VideoDrawing> {

  constructor(props: RendererUIDrawingProps<VideoDrawing>) {
    super(props);

    this.pointMouseMoveStartHandler = this.pointMouseMoveStartHandler.bind(this);
  }

  pointMouseMoveStartHandler(e: MouseEvent) {

  }

  pointMouseMoveHandler(e: MouseEvent) {

  }

  render() {
    const timeline = this.props.rendererViewController.timelineViewController.timelineHost.timeline;
    const trackItem = this.props.trackItemHost.trackItem;
    const timeoffset = trackItem.getTimeoffset(timeline.currentTime);
    const videoDrawingHost = this.props.drawingHost;
    const videoDrawing = videoDrawingHost.drawing;
    const transformMat = videoDrawing.getTransformMatrix(timeoffset);
    const size = videoDrawing.size.getInterpolatedPropertyValue(timeoffset);
    let p1 = vec2.fromValues(0, 0),
        p2 = vec2.fromValues(size.x, 0),
        p3 = vec2.fromValues(0, size.y),
        p4 = vec2.fromValues(size.x, size.y);
    vec2.transformMat2d(p1, p1, transformMat);
    vec2.transformMat2d(p2, p2, transformMat);
    vec2.transformMat2d(p3, p3, transformMat);
    vec2.transformMat2d(p4, p4, transformMat);
    return (
      <div className='drawing video-drawing'>
        {/* <RendererDrawingControlPoint x={p1[0]} y={p1[1]}
            onDocumentMouseMoveStart={this.pointMouseMoveStartHandler}/>
        <RendererDrawingControlPoint x={p2[0]} y={p2[1]}/>
        <RendererDrawingControlPoint x={p3[0]} y={p3[1]}/>
        <RendererDrawingControlPoint x={p4[0]} y={p4[1]}/> */}
      </div>
    )
  }

}

@observer
export class RendererRectangleDrawingView extends RendererDrawingViewBase<Rectangle> {

  p1MouseMoveStartHandler: any;
  p2MouseMoveStartHandler: any;
  p3MouseMoveStartHandler: any;
  p4MouseMoveStartHandler: any

  p1MouseMoveHandler: any;
  p2MouseMoveHandler: any;
  p3MouseMoveHandler: any;
  p4MouseMoveHandler: any;

  l1MouseMoveHandler: any;
  l2MouseMoveHandler: any;
  l3MouseMoveHandler: any;
  l4MouseMoveHandler: any;

  constructor(props: RendererUIDrawingProps<Rectangle>) {
    super(props);

    this.p1MouseMoveStartHandler = this.pointMouseMoveStartHandler.bind(this, [true, false, false, true]);
    this.p2MouseMoveStartHandler = this.pointMouseMoveStartHandler.bind(this, [true, true, false, false]);
    this.p3MouseMoveStartHandler = this.pointMouseMoveStartHandler.bind(this, [false, false, false, true]);
    this.p4MouseMoveStartHandler = this.pointMouseMoveStartHandler.bind(this, [true, false, false, true]);

    this.p1MouseMoveHandler = this.pointMouseMoveHandler.bind(this, [true, false, false, true]);
    this.p2MouseMoveHandler = this.pointMouseMoveHandler.bind(this, [true, true, false, false]);
    this.p3MouseMoveHandler = this.pointMouseMoveHandler.bind(this, [false, true, true, false]);
    this.p4MouseMoveHandler = this.pointMouseMoveHandler.bind(this, [false, false, true, true]);

    this.l1MouseMoveHandler = this.pointMouseMoveHandler.bind(this, [true, false, false, false]);
    this.l2MouseMoveHandler = this.pointMouseMoveHandler.bind(this, [false, true, false, false]);
    this.l3MouseMoveHandler = this.pointMouseMoveHandler.bind(this, [false, false, true, false]);
    this.l4MouseMoveHandler = this.pointMouseMoveHandler.bind(this, [false, false, false, true]);
  }

  pointMouseMoveStartHandler(targets: [boolean, boolean, boolean, boolean], e: MouseEvent) {
    return true;
  }

  pointMouseMoveHandler(targets: [boolean, boolean, boolean, boolean], e: MouseEvent) {
    const controller = this.props.rendererViewController
    const timeline = controller.timelineViewController.timelineHost.timeline;
    const trackItem = controller.trackItemHost.trackItem;
    const drawing = this.props.drawingHost.drawing;
    const timeoffset = trackItem.getTimeoffset(timeline.currentTime);

    const [dx, dy] = controller.toScreenSize(e.movementX, e.movementY);
    let ori = vec2.fromValues(0, 0);
    let vec = vec2.fromValues(dx, dy);
    const transMat = drawing.getTransformMatrix(timeoffset);
    vec2.transformMat2d(ori, ori, transMat);
    vec2.transformMat2d(vec, vec, transMat);
    vec = vec2.sub(vec, vec, ori);
    
    const sizeProperty = drawing.size;
    const currentSize = sizeProperty.getInterpolatedPropertyValue(timeoffset);

    let top = currentSize.x;
    let right = currentSize.y;
    let bottom = currentSize.z;
    let left = currentSize.w;

    if (targets[0]) top += vec[1];
    if (targets[1]) right += vec[0];
    if (targets[2]) bottom += vec[1];
    if (targets[3]) left += vec[0];

    sizeProperty.addKeyframeAt(timeoffset, sizeProperty.createValue(top, right, bottom, left));
  }

  render() {
    const controller = this.props.rendererViewController
    const timeline = this.props.rendererViewController.timelineViewController.timelineHost.timeline;
    const trackItem = this.props.trackItemHost.trackItem;
    const timeoffset = trackItem.getTimeoffset(timeline.currentTime);
    const videoDrawingHost = this.props.drawingHost;
    const rectangleDrawing = videoDrawingHost.drawing;
    const transformMat = rectangleDrawing.getTransformMatrix(timeoffset);
    const size = rectangleDrawing.size.getInterpolatedPropertyValue(timeoffset);
    const sizeTop = size.x;
    const sizeRight = size.y;
    const sizeBottom = size.z;
    const sizeLeft = size.w;
    let p1 = vec2.fromValues(sizeLeft, sizeTop),
        p2 = vec2.fromValues(sizeRight, sizeTop),
        p3 = vec2.fromValues(sizeRight, sizeBottom),
        p4 = vec2.fromValues(sizeLeft, sizeBottom);
    vec2.transformMat2d(p1, p1, transformMat);
    vec2.transformMat2d(p2, p2, transformMat);
    vec2.transformMat2d(p3, p3, transformMat);
    vec2.transformMat2d(p4, p4, transformMat);
    console.log(size);
    return (
      <div className='video-drawing'>
        <RendererDrawingControlPoint x={p1[0]} y={p1[1]}
            rendererViewController={controller}
            onDocumentMouseMoveStart={this.p1MouseMoveStartHandler}
            onDocumentMouseMove={this.p1MouseMoveHandler}/>
        <RendererDrawingControlPoint x={p2[0]} y={p2[1]}
            rendererViewController={controller}
            onDocumentMouseMoveStart={this.p2MouseMoveStartHandler}
            onDocumentMouseMove={this.p2MouseMoveHandler}/>
        <RendererDrawingControlPoint x={p3[0]} y={p3[1]}
            rendererViewController={controller}
            onDocumentMouseMoveStart={this.p3MouseMoveStartHandler}
            onDocumentMouseMove={this.p3MouseMoveHandler}/>
        <RendererDrawingControlPoint x={p4[0]} y={p4[1]}
            rendererViewController={controller}
            onDocumentMouseMoveStart={this.p4MouseMoveStartHandler}
            onDocumentMouseMove={this.p4MouseMoveHandler}/>
        <RendererDrawingControlLine x1={p1[0]} y1={p1[1]} x2={p2[0]} y2={p2[1]}
            rendererViewController={controller}
            onDocumentMouseMoveStart={this.p1MouseMoveStartHandler}
            onDocumentMouseMove={this.l1MouseMoveHandler}/>
        <RendererDrawingControlLine x1={p2[0]} y1={p2[1]} x2={p3[0]} y2={p3[1]}
            rendererViewController={controller}
            onDocumentMouseMoveStart={this.p1MouseMoveStartHandler}
            onDocumentMouseMove={this.l2MouseMoveHandler}/>
        <RendererDrawingControlLine x1={p3[0]} y1={p3[1]} x2={p4[0]} y2={p4[1]}
            rendererViewController={controller}
            onDocumentMouseMoveStart={this.p1MouseMoveStartHandler}
            onDocumentMouseMove={this.l3MouseMoveHandler}/>
        <RendererDrawingControlLine x1={p4[0]} y1={p4[1]} x2={p1[0]} y2={p1[1]}
            rendererViewController={controller}
            onDocumentMouseMoveStart={this.p1MouseMoveStartHandler}
            onDocumentMouseMove={this.l4MouseMoveHandler}/>/>
      </div>
    )
  }

}

@observer
export class RendererPolygonDrawingView extends RendererDrawingViewBase<Polygon> {

  constructor(props: RendererUIDrawingProps<Polygon>) {
    super(props);
  }

  pointMouseMoveStartHandler(index: number, e: MouseEvent) {
    return true;
  }

  pointMouseMoveHandler(index: number, e: MouseEvent) {
    const controller = this.props.rendererViewController
    const timeline = controller.timelineViewController.timelineHost.timeline;
    const trackItem = controller.trackItemHost.trackItem;
    const drawing = this.props.drawingHost.drawing;
    const timeoffset = trackItem.getTimeoffset(timeline.currentTime);

    const [dx, dy] = controller.toScreenSize(e.movementX, e.movementY);
    let ori = vec2.fromValues(0, 0);
    let vec = vec2.fromValues(dx, dy);
    const transMat = drawing.getTransformMatrix(timeoffset);
    vec2.transformMat2d(ori, ori, transMat);
    vec2.transformMat2d(vec, vec, transMat);
    vec = vec2.sub(vec, vec, ori);

    const pointProperty = drawing.points[index];
    const currentPos = pointProperty.getInterpolatedPropertyValue(timeoffset);

    pointProperty.addKeyframeAt(timeoffset,
        pointProperty.createValue(currentPos.x + vec[0], currentPos.y + vec[1]));
  }

  renderPolygonControls(): JSX.Element[] {
    let res: JSX.Element[] = [];
    const controller = this.props.rendererViewController
    const timeline = this.props.rendererViewController.timelineViewController.timelineHost.timeline;
    const trackItem = this.props.trackItemHost.trackItem;
    const timeoffset = trackItem.getTimeoffset(timeline.currentTime);
    const polygonDrawingHost = this.props.drawingHost;
    const polygonDrawing = polygonDrawingHost.drawing;
    const transMat = polygonDrawing.getTransformMatrix(timeoffset);
    for (let i = 0; i < polygonDrawing.points.length; i ++) {
      const pointProperty = polygonDrawing.points[i];
      const mouseMoveStartHandler = this.pointMouseMoveStartHandler.bind(this, i);
      const mouseMoveHandler = this.pointMouseMoveHandler.bind(this, i);
      const currentPos = pointProperty.getInterpolatedPropertyValue(timeoffset);
      let vec = vec2.fromValues(currentPos.x, currentPos.y);
      vec2.transformMat2d(vec, vec, transMat);
      res.push(
        <RendererDrawingControlPoint x={vec[0]} y={vec[1]}
            rendererViewController={controller}
            onDocumentMouseMoveStart={mouseMoveStartHandler}
            onDocumentMouseMove={mouseMoveHandler}/>)
    }
    return res;
  }

  render() {
    return (
      <div className='drawing polygon-drawing'>
        {this.renderPolygonControls()}
      </div>
    )
  }

}