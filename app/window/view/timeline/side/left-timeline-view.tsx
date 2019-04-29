import * as React from 'react'

import * as style from './left-timeline-view.scss';
import { TimelineWidgetViewProps } from 'window/view/timeline/widget-view';
import { TimelineWidgetSideContentView } from 'window/view/timeline/side/left-track-view';
// import { LeftTrackViewRenderer } from './left-track-view';

export class TimelineWidgetSideView extends React.Component<TimelineWidgetViewProps, {}> {

  constructor(props: TimelineWidgetViewProps) {
    super(props);
  }

  render() {
    return (
      <div className={style.component}>
        <Header {...this.props}/>
        <TimelineWidgetSideContentView {...this.props}/>
      </div>
    )
  }

}

class Header extends React.Component<TimelineWidgetViewProps, {}> {
  render() {
    return (
    <div className='header'>
    </div>);
  }
}