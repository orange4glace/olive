import * as React from 'react'
import { MonitorWidgetDrawingView, MonitorWidgetDrawingProps } from 'window/view/monitor/view/drawing/drawing-view';
import { MonitorWidgetDrawingControlPoint } from 'window/view/monitor/view/drawing/drawing-control-point-view';
import { observer } from 'window/app-mobx';
import { StandardMouseEvent } from 'base/browser/mouseEvent';
import { MonitorWidgetVideoMediaDrawingViewModel } from 'window/view/monitor/model/drawing/video-media-drawing-view-moodel';
import { createStandardMouseEvent } from 'base/olive/mouse-event';

@observer
export class MonitorWidgetVideoMediaDrawingView extends
    MonitorWidgetDrawingView<MonitorWidgetVideoMediaDrawingViewModel> {

  readonly p0ControlPointMouseDownHandler: (e: React.MouseEvent) => void;
  readonly p1ControlPointMouseDownHandler: (e: React.MouseEvent) => void;
  readonly p2ControlPointMouseDownHandler: (e: React.MouseEvent) => void;
  readonly p3ControlPointMouseDownHandler: (e: React.MouseEvent) => void;

  readonly p0ControlPointMouseMoveStartHandler: (e: MouseEvent) => void;
  readonly p1ControlPointMouseMoveStartHandler: (e: MouseEvent) => void;
  readonly p2ControlPointMouseMoveStartHandler: (e: MouseEvent) => void;
  readonly p3ControlPointMouseMoveStartHandler: (e: MouseEvent) => void;

  constructor(props: MonitorWidgetDrawingProps<MonitorWidgetVideoMediaDrawingViewModel>) {
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
    this.props.drawingViewModel.onControlPointMouseDown(index, createStandardMouseEvent(e));
  }

  controlPointMouseMoveStartHandler(index: number, e: React.MouseEvent) {
    this.props.drawingViewModel.onControlPointMouseMoveStart(index, createStandardMouseEvent(e));
  }

  render() {
    const model = this.props.drawingViewModel;
    const points = model.getControlPoints();
    const topLeft = points[0];
    const topRight = points[1];
    const bottomRight = points[2];
    const bottomLeft = points[3];

    if (model.focused) return (
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