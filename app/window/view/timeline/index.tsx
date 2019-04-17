import * as React from 'react';
import app from 'internal/app';

import { TimelineView as TimelineRightView } from 'window/view/timeline/right';
import ADiv from '../advanced-div';
import { LeftTimelineView } from './left/left-timeline-view';
import { TimelineHeaderView } from './header-view';
import { TimelineViewController } from './controller/controller';
import Timeline from 'internal/timeline/timeline';
import { TimelineViewGlobalController } from './controller/global_controller_impl';

const style = require('./index.scss');

interface TimelineViewProps {
  timeline: Timeline;
}

@app.mobx.observer
class TimelineWindow extends React.Component<TimelineViewProps, {}> {

  timelineViewController: TimelineViewController;

  constructor(props: any) {
    super(props);

    const timeline = this.props.timeline;
    this.timelineViewController = TimelineViewGlobalController.getTimelineViewController(timeline);
    this.mouseDownCaptureHandler = this.mouseDownCaptureHandler.bind(this);
  }

  mouseDownCaptureHandler(e: React.MouseEvent) {
    TimelineViewGlobalController.focusTimelineViewController(this.timelineViewController);
  }

  render() {
    return (
      <ADiv className={style.component} onMouseDownCapture={this.mouseDownCaptureHandler}>
        <div className='header'>
          <TimelineHeaderView timelineViewController={this.timelineViewController}/>
        </div>
        <div className='content'>
          <div className='left'>
            <LeftTimelineView timelineViewController={this.timelineViewController}/>
          </div>
          <div className='right'>
            <TimelineRightView timelineViewController={this.timelineViewController}/>
          </div>
        </div>
      </ADiv>
    )
  }

}

export default TimelineWindow;