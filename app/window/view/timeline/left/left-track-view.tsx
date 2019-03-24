import * as React from 'react'
import { LeftTimelineViewProps } from './left-timeline-view';
import { TrackHost } from '../controller';

import * as style from './left-track-view.scss';

export class LeftTrackViewRenderer extends React.Component<LeftTimelineViewProps, {}> {
  render() {
    const timelineHost = this.props.timelineViewController.timelineHost;
    return (
      <div className={style.component}>
      {timelineHost.trackHosts.map(trackHost => 
        <LeftTrackView {...this.props} trackHost={trackHost}/>)
      }</div>
    )
  }
}

interface LeftTrackViewProps extends LeftTimelineViewProps {
  trackHost: TrackHost;
}

class LeftTrackView extends React.Component<LeftTrackViewProps, {}> {

  constructor(props: LeftTrackViewProps) {
    super(props);
  }

  render() {
    const trackHost = this.props.trackHost;
    const track = trackHost.track;
    const style = {
      height: trackHost.height + 'px',
      lineHeight: trackHost.height + 'px'
    }
    return (
      <div className='track' style={style}>
        <div className='name'>{track.name}</div>
      </div>
    )
  }
  
}