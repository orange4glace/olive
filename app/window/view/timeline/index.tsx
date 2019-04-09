import * as React from 'react';
import app from 'internal/app';

import { TimelineView as TimelineRightView } from 'window/view/timeline/right';
import ADiv from '../advanced-div';
import TimelineViewState from './controller/state';
import { TimelineViewController } from './controller';
import { LeftTimelineView } from './left/left-timeline-view';
import { TimelineHeaderView } from './header-view';

const style = require('./index.scss');

@app.mobx.observer
class TimelineWindow extends React.Component {

  timelineViewController: TimelineViewController;

  constructor(props: any) {
    super(props);

    this.timelineViewController = new TimelineViewController(app.timeline);
    this.mouseDownCaptureHandler = this.mouseDownCaptureHandler.bind(this);
  }

  mouseDownCaptureHandler(e: React.MouseEvent) {
    TimelineViewState.setFocusedTimelineViewController(this.timelineViewController);
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