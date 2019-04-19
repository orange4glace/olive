import * as React from 'react'

import * as style from './left-track-view.scss';
import { TimelineWidgetViewProps } from 'window/view/timeline/view';
import { Track } from 'internal/timeline/track';

export class TimelineWidgetSideContentView extends React.Component<TimelineWidgetViewProps, {}> {
  render() {
    const timeline = this.props.widget.model.timeline;
    return (
      <div className={style.component}>
      {timeline.tracks.map(track => 
        <TrackView {...this.props} track={track}/>)
      }</div>
    )
  }
}

interface TrackViewProps extends TimelineWidgetViewProps {
  track: Track;
}

class TrackView extends React.Component<TrackViewProps, {}> {

  constructor(props: TrackViewProps) {
    super(props);
  }

  render() {
    const track = this.props.track;
    const style = {
      height: '30px',
      lineHeight: '30px'
    }
    return (
      <div className='track' style={style}>
        <div className='name'>{track.name}</div>
      </div>
    )
  }
  
}