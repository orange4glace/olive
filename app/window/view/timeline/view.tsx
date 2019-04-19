import * as React from 'react';
import app from 'internal/app';

import ADiv from '../advanced-div';
import { TimelineHeaderView } from './header-view';
import TimelineRightView from 'window/view/timeline/right/timeline-view';
import { TimelineWidget } from 'window/view/timeline/widget';

import * as style from './view.scss';
import { TimelineWidgetSideView } from 'window/view/timeline/side';

export interface TimelineWidgetViewProps {
  widget: TimelineWidget;
}

@app.mobx.observer
class TimelineWidgetView extends React.Component<TimelineWidgetViewProps, {}> {

  constructor(props: any) {
    super(props);

    this.mouseDownCaptureHandler = this.mouseDownCaptureHandler.bind(this);
  }

  mouseDownCaptureHandler(e: React.MouseEvent) {
    TimelineWidget.setFocusedTimelineWidget(this.props.widget);
  }

  render() {
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
            <TimelineRightView {...this.props}/>
          </div>
        </div>
      </ADiv>
    )
  }

}

export default TimelineWidgetView;