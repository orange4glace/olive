import * as React from 'react'
import { DrawingHost } from 'window/view/timeline/controller/drawing-host';
import { RendererViewController } from '../controller/renderer-view-controller';
import { TrackItemHost } from 'window/view/timeline/controller';
import VideoDrawing from 'internal/drawing/video-drawing';
import { vec2 } from 'gl-matrix';
import { RendererDrawingControlPoint } from './drawing-control-point';
import { RendererUIContentViewProps } from './renderer-ui-view';
import { Drawing, Rectangle, ScalarProperty } from 'internal/drawing';
import { DrawingType } from 'internal/drawing/drawing-type';
import { observer } from 'window/app-mobx';

interface RendererUITrackItemViewProps extends RendererUIContentViewProps {
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
      <div className='video-drawing'>
        <RendererDrawingControlPoint x={p1[0]} y={p1[1]}
            onDocumentMouseMoveStart={this.pointMouseMoveStartHandler}/>
        <RendererDrawingControlPoint x={p2[0]} y={p2[1]}/>
        <RendererDrawingControlPoint x={p3[0]} y={p3[1]}/>
        <RendererDrawingControlPoint x={p4[0]} y={p4[1]}/>
      </div>
    )
  }

}

@observer
export class RendererRectangleDrawingView extends RendererDrawingViewBase<Rectangle> {

  p1MouseMoveStartHandler: any;
  p2MouseMoveStartHandler: any;
  p3MouseMoveStartHandler: any;
  p4MouseMoveStartHandler: any;

  p1MouseMoveHandler: any;
  p2MouseMoveHandler: any;
  p3MouseMoveHandler: any;
  p4MouseMoveHandler: any;

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

    const dx = controller.toScreenSize(e.movementX);
    const dy = controller.toScreenSize(e.movementY);
    let ori = vec2.fromValues(0, 0);
    let vec = vec2.fromValues(dx, dy);
    const transMat = drawing.getTransformMatrix(timeoffset);
    vec2.transformMat2d(ori, ori, transMat);
    vec2.transformMat2d(vec, vec, transMat);
    vec = vec2.sub(vec, vec, ori);
    
    const sizeProperty = drawing.size;
    const currentSize = sizeProperty.getInterpolatedPropertyValue(timeoffset);

    console.log(targets,currentSize)

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
    return (
      <div className='video-drawing'>
        <RendererDrawingControlPoint x={p1[0]} y={p1[1]}
            onDocumentMouseMoveStart={this.p1MouseMoveStartHandler}
            onDocumentMouseMove={this.p1MouseMoveHandler}/>
        <RendererDrawingControlPoint x={p2[0]} y={p2[1]}
            onDocumentMouseMoveStart={this.p2MouseMoveStartHandler}
            onDocumentMouseMove={this.p2MouseMoveHandler}/>
        <RendererDrawingControlPoint x={p3[0]} y={p3[1]}
            onDocumentMouseMoveStart={this.p3MouseMoveStartHandler}
            onDocumentMouseMove={this.p3MouseMoveHandler}/>
        <RendererDrawingControlPoint x={p4[0]} y={p4[1]}
            onDocumentMouseMoveStart={this.p4MouseMoveStartHandler}
            onDocumentMouseMove={this.p4MouseMoveHandler}/>
      </div>
    )
  }

}