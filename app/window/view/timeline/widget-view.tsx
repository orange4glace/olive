import * as React from 'react';
import app from 'internal/app';

import ADiv from '../advanced-div';
import { TimelineHeaderView } from './header-view';
import TimelineRightView from 'window/view/timeline/right/timeline-view';
import { TimelineWidget } from 'window/view/timeline/widget';

import * as style from './view.scss';
import { TimelineWidgetSideView } from 'window/view/timeline/side';
import { TimelineWidgetViewOutgoingEvents } from 'window/view/timeline/view-outgoing-events';
import { dispose } from 'base/common/lifecycle';

export interface TimelineWidgetViewProps {
  widget: TimelineWidget;
}

@app.mobx.observer
class TimelineWidgetView extends React.Component<TimelineWidgetViewProps, {}> {

  outgoingEvents: TimelineWidgetViewOutgoingEvents;

  constructor(props: any) {
    super(props);

    this.outgoingEvents = new TimelineWidgetViewOutgoingEvents();
    this.props.widget.registerViewOutgoingEvents(this.outgoingEvents);

    this.mouseDownCaptureHandler = this.mouseDownCaptureHandler.bind(this);
  }

  componentWillUnmount() {
    this.outgoingEvents = dispose(this.outgoingEvents);
  }

  mouseDownCaptureHandler(e: React.MouseEvent) {
    this.props.widget.focus();
  }

  render() {
    const widget = this.props.widget;
    if (widget.model) {
      return (
        <ADiv className={style.component} onMouseDownCapture={this.mouseDownCaptureHandler}>
          <div className='header'>
            <TimelineHeaderView {...this.props}/>
          </div>
          <div className='content'>
            <div className='left'>
              <TimelineWidgetSideView {...this.props}/>
            </div>
            <div className='right'>
              <TimelineRightView {...this.props} timelineViewModel={this.props.widget.model} outgoingEvents={this.outgoingEvents}/>
            </div>
          </div>
        </ADiv>
      )
    }
    else {
      return (<div>No Timeline Selected</div>);
    }
  }

}

export default TimelineWidgetView;