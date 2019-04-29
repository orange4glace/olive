import * as React from 'react';
import app from 'internal/app';
import { observer } from 'window/app-mobx';
import { MonitorWidget } from 'window/view/monitor/widget';

import * as style from './widget-view.scss';
import { MonitorWidgetTimelineView } from 'window/view/monitor/view/timeline-view';

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

class RendererContentViewWrapper extends React.PureComponent<MonitorWidgetViewProps, {}> {

  render() {
    return (
      <>
        <MonitorWidgetTimelineView {...this.props} timelineViewModel={this.props.widget.model}/>
        <RendererContentView {...this.props}/>
      </>
    )
  }

}

class RendererContentView extends React.Component<MonitorWidgetViewProps, any> {

  componentRef: React.RefObject<HTMLDivElement>;
  containerRef: React.RefObject<HTMLDivElement>;

  constructor(props: MonitorWidgetViewProps) {
    super(props);

    this.componentRef = React.createRef();
    this.containerRef = React.createRef();
    this.resizeHandler = this.resizeHandler.bind(this);
    this.state = {
      width: 0,
      height : 0,
    }
  }

  componentDidMount() {
    const canvas: HTMLCanvasElement = app.canvas;
    this.containerRef.current.appendChild(canvas);
    
    window.addEventListener('resize', this.resizeHandler)
    this.resizeHandler();
  }

  resizeHandler() {
    var width = app.project.sequence.screenWidth;
    var height = app.project.sequence.screenHeight;
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
    this.setState({
      width: w,
      height: h
    })
    if (this.props.widget.model)
      this.props.widget.model.updateScreen(width, height, w, h);
  }

  render() {
    var containerStyle = {
      width: this.state.width + 'px',
      height: this.state.height + 'px'
    }
    return (
      <div className={style.component} ref={this.componentRef}>
        <div className='canvas-container' style={containerStyle} ref={this.containerRef}>
        </div>
      </div>
    )
  }

}