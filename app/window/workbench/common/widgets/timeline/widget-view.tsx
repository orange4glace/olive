import * as React from 'react';
import app from 'internal/app';

import ADiv from '../../../../view/advanced-div';
import { TimelineHeaderView } from './header-view';
import TimelineRightView from 'window/workbench/common/widgets/timeline/right/timeline-view';
import { ITimelineWidget } from 'window/workbench/common/widgets/timeline/widget';

import * as style from './view.scss';
import { TimelineWidgetSideView } from 'window/workbench/common/widgets/timeline/side';
import { TimelineWidgetViewOutgoingEvents } from 'window/workbench/common/widgets/timeline/view-outgoing-events';
import { dispose } from 'base/common/lifecycle';

export interface TimelineWidgetViewProps {
  widget: ITimelineWidget;
}

@app.mobx.observer
class TimelineWidgetView extends React.Component<TimelineWidgetViewProps, {}> {

  outgoingEvents: TimelineWidgetViewOutgoingEvents;

  constructor(props: any) {
    super(props);

    this.dragOverHandler = this.dragOverHandler.bind(this);
    this.dropHandler = this.dropHandler.bind(this);

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

  dragOverHandler(e: React.DragEvent) {
    console.log('DRAG OVER');
    this.outgoingEvents.emitWidgetDragOver(e);
  }

  dropHandler(e: React.DragEvent) {
    console.log('DROP');
    this.outgoingEvents.emitWidgetDrop(e);
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
      return (
        <div onDragOver={this.dragOverHandler}
            onDrop={this.dropHandler}>No Timeline Selected</div>
      );
    }
  }

}

export default TimelineWidgetView;