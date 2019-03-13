import * as React from 'react'
import { observer } from 'window/app-mobx'

import { TimelineViewController, TimelineHost, TrackHost, TrackItemHost } from '../controller';
import ADiv from 'window/view/advanced-div';

interface Props {
  timelineViewController: TimelineViewController;
}

interface TrackViewProps {
  timelineHost: TimelineHost;
  trackHost: TrackHost;
  timelineViewController: TimelineViewController;
}

interface TrackItemViewProps {
  timelineHost: TimelineHost;
  trackHost: TrackHost;
  trackItemHost: TrackItemHost;
  timelineViewController: TimelineViewController;
}

@observer
export default class ActivatedTracksView extends React.Component<Props, {}> {
  render() {
    const timelineViewController = this.props.timelineViewController;
    const timelineHost = timelineViewController.timelineHost;
    // if (!timelineViewController.active && !timelineViewController.itemDropper.active) return (<></>);
    return (
      <div className='tracks active'>
        {[...timelineHost.trackHosts].map(([track, trackHost]) => 
          <ActivatedTrackView key={track.id} timelineHost={timelineHost} trackHost={trackHost} timelineViewController={timelineViewController}/>
        )}
      </div>
    )
  }
}

@observer
class ActivatedTrackView extends React.Component<TrackViewProps, {}> {

  constructor(props: any) {
    super(props);
  }

  render() {
    const timelineHost = this.props.timelineHost;
    const trackHost = this.props.trackHost;
    const timelineViewController = this.props.timelineViewController;
    const startTime = timelineViewController.startTime;
    const endTime = timelineViewController.endTime;
    let visibleItems: Array<JSX.Element> = [];
    trackHost.activatedTrackItemHostSets.forEach(set => {
      set.value.forEach(trackItemHost => {
        if ((startTime > trackItemHost.endTimeActive || trackItemHost.startTimeActive > endTime) == false)
        visibleItems.push(
            <ActivatedTrackItemView key={trackItemHost.id} timelineHost={timelineHost} trackHost={trackHost}
                          trackItemHost={trackItemHost} timelineViewController={timelineViewController}/>)
      })
    })
    return (
      <ADiv className='track active'>
        {visibleItems}
      </ADiv>
    );
  }
}

@observer
class ActivatedTrackItemView extends React.Component<TrackItemViewProps, {}> {

  constructor(props: any) {
    super(props);
  }

  render() {
    const trackItemHost = this.props.trackItemHost;
    const controller = this.props.timelineViewController;
    const left = controller.getPositionRelativeToTimeline(trackItemHost.startTimeActive);
    const right = controller.getPositionRelativeToTimeline(trackItemHost.endTimeActive);
    const style = {
      left: left + 'px',
      width: (right - left) + 'px'
    }
    const className = 'track-item ' +
                      'snap-' + trackItemHost.snapped;
    return (
      <div className={className} style={style}>
        <div className='bar'/>
      </div>
    )
  }

}