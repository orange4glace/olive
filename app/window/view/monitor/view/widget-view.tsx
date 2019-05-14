import * as React from 'react';
import app from 'internal/app';
import { observer, observable, action } from 'window/app-mobx';
import { MonitorWidget } from 'window/view/monitor/widget';
import { MonitorWidgetTimelineView } from 'window/view/monitor/view/timeline-view';
import { MonitorWidgetTrackItemViewSelector } from 'window/view/monitor/view/track-item/track-item-view';
import { MonitorWidgetDrawingViewSelector } from 'window/view/monitor/view/drawing/drawing-view';
import { MonitorWidgetRectangleDrawingViewModel } from 'window/view/monitor/model/drawing/rectangle-drawing-view-model';
import { MonitorWidgetVideoTrackItemViewModel } from 'window/view/monitor/model/track-item/video-track-item-view-model';
import { MonitorWidgetVideoTrackItemView } from 'window/view/monitor/view/track-item/video-track-item-view';
import { MonitorWidgetRectangleDrawingView } from 'window/view/monitor/view/drawing/rectangle-drawing-view';
import { MonitorWidgetVideoMediaDrawingViewModel } from 'window/view/monitor/model/drawing/video-media-drawing-view-moodel';
import { MonitorWidgetVideoMediaDrawingView } from 'window/view/monitor/view/drawing/video-media-drawing-view';

import * as style from './widget-view.scss';

MonitorWidgetTrackItemViewSelector.registerView(MonitorWidgetVideoTrackItemViewModel, MonitorWidgetVideoTrackItemView);
MonitorWidgetDrawingViewSelector.registerView(MonitorWidgetRectangleDrawingViewModel, MonitorWidgetRectangleDrawingView);
MonitorWidgetDrawingViewSelector.registerView(MonitorWidgetVideoMediaDrawingViewModel, MonitorWidgetVideoMediaDrawingView);

export interface MonitorWidgetViewProps {
  widget: MonitorWidget;
}

@observer
export class MonitorWidgetView extends React.Component<MonitorWidgetViewProps, {}> {

  constructor(props: any) {
    super(props);
  }

  render() {
    const model = this.props.widget.model;
    if (model) {
      return <RendererContentViewWrapper {...this.props}/>
    }
    else {
      return <div>'NO TIMELINE SELECTED'</div>
    }
  }

}

@observer
class RendererContentViewWrapper extends React.Component<MonitorWidgetViewProps, {}> {

  @observable viewportWidth = 0;
  @observable viewportHeight = 0;
  componentRef: React.RefObject<HTMLDivElement>;
  containerRef: React.RefObject<HTMLDivElement>;

  constructor(props: MonitorWidgetViewProps) {
    super(props);

    this.componentRef = React.createRef();
    this.containerRef = React.createRef();
    this.resizeHandler = this.resizeHandler.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeHandler)
    this.resizeHandler();
  }

  @action
  resizeHandler() {
    var width = app.project.sequence.videoSetting.screenWidth;
    var height = app.project.sequence.videoSetting.screenHeight;
    var ratio = width / height;
    var el = this.componentRef.current;
    var elWidth = Math.min(width, el.clientWidth);
    var elHeight = Math.min(height, el.clientHeight);
    var elRatio = elWidth / elHeight;
    console.log(elWidth, elHeight)
    let w, h;
    if (ratio >= elRatio) {
      // width first
      w = elWidth;
      h = elWidth / ratio;
    }
    else {
      // height first
      w = elHeight * ratio;
      h = elHeight;
    }
    this.viewportWidth = w;
    this.viewportHeight = h;
    if (this.props.widget.model)
      this.props.widget.model.updateScreen(width, height, w, h);
  }

  render() {
    var containerStyle = {
      width: this.viewportWidth + 'px',
      height: this.viewportHeight + 'px'
    }
    console.log(containerStyle)
    return (
      <div className={style.component} ref={this.componentRef}>
        <div className='container' style={containerStyle} ref={this.containerRef}>>
          <MonitorWidgetTimelineView {...this.props} timelineViewModel={this.props.widget.model}/>
          <RendererContentView {...this.props}/>
        </div>
      </div>
    )
  }

}

class RendererContentView extends React.PureComponent<MonitorWidgetViewProps, any> {

  containerRef: React.RefObject<HTMLDivElement> = React.createRef();


  componentDidMount() {
    const canvas: HTMLCanvasElement = app.canvas;
    this.containerRef.current.appendChild(canvas);
  }
  
  render() {
    return (
      <div className='canvas-container' ref={this.containerRef}>
      </div>
    )
  }

}