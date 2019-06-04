import * as React from 'react'
import { MonitorWidgetViewProps } from 'window/view/monitor/view/widget-view';

export class MonitorWidgetControlView extends React.Component<MonitorWidgetViewProps> {

  constructor(props: MonitorWidgetViewProps) {
    super(props);
    this.resumeClickHandler = this.resumeClickHandler.bind(this);
    this.pauseClickHandler = this.pauseClickHandler.bind(this);
  }

  resumeClickHandler() {
    this.props.widget.model.timeline.resume();
  }

  pauseClickHandler() {
    this.props.widget.model.timeline.pause();
  }

  render() {
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        color: 'white'
      }}>
        <div onClick={this.resumeClickHandler}>PLAY</div>
        <div onClick={this.pauseClickHandler}>PAUSE</div>
      </div>
    );
  }

}