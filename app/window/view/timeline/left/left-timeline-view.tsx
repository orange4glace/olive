import * as React from 'react'
import { TimelineHost, TimelineViewController } from '../controller';

import * as style from './left-timeline-view.scss';
import { LeftTrackViewRenderer } from './left-track-view';

export interface LeftTimelineViewProps {
  timelineViewController: TimelineViewController;
}

export class LeftTimelineView extends React.Component<LeftTimelineViewProps, {}> {

  constructor(props: LeftTimelineViewProps) {
    super(props);
  }

  render() {
    return (
      <div className={style.component}>
        <LeftTimelineViewHeader {...this.props}/>
        <LeftTrackViewRenderer {...this.props}/>
      </div>
    )
  }

}

class LeftTimelineViewHeader extends React.Component<LeftTimelineViewProps, {}> {
  render() {
    return (
    <div className='header'>
    </div>);
  }
}