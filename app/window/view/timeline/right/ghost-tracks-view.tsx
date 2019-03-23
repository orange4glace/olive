import * as React from 'react'
import { observer } from 'window/app-mobx'

import { TimelineViewController, TimelineHost, TrackHost, TrackItemHost } from '../controller';
import ADiv from 'window/view/advanced-div';
import { GhostTrackItem } from '../controller/track-host';

interface GhostTracksViewProps {
  timelineViewController: TimelineViewController;
}

@observer
export class GhostTracksView extends React.Component<GhostTracksViewProps, {}> {
  render() {
    const timelineViewController = this.props.timelineViewController;
    const timelineHost = timelineViewController.timelineHost;
    // if (!timelineViewController.active && !timelineViewController.itemDropper.active) return (<></>);
    return (
      <div className='tracks active'>
        {[...timelineHost.trackHosts].map(trackHost => 
          <GhostTrackView {...this.props} key={trackHost.track.id} trackHost={trackHost}/>
        )}
      </div>
    )
  }
}


interface GhostTrackViewProps extends GhostTracksViewProps {
  trackHost: TrackHost;
}

@observer
class GhostTrackView extends React.Component<GhostTrackViewProps, {}> {

  constructor(props: any) {
    super(props);
  }

  render() {
    const trackHost = this.props.trackHost;
    const timelineViewController = this.props.timelineViewController;
    const startTime = timelineViewController.startTime;
    const endTime = timelineViewController.endTime;
    let visibleItems: Array<JSX.Element> = [];
    trackHost.ghostTrackItemSets.forEach(set => {
      set.value.forEach(ghostTrackItem => {
        if ((startTime > ghostTrackItem.end || ghostTrackItem.start > endTime) == false)
        visibleItems.push(
            <GhostTrackItemView {...this.props} ghostTrackItem={ghostTrackItem} />)
      })
    })
    return (
      <ADiv className='track active'>
        {visibleItems}
      </ADiv>
    );
  }
}


interface GhostTrackItemViewProps extends GhostTrackViewProps {
  ghostTrackItem: GhostTrackItem;
}

@observer
class GhostTrackItemView extends React.Component<GhostTrackItemViewProps, {}> {

  constructor(props: any) {
    super(props);
  }

  render() {
    const ghostTrackItem = this.props.ghostTrackItem;
    const controller = this.props.timelineViewController;
    const left = controller.getPositionRelativeToTimeline(ghostTrackItem.start);
    const right = controller.getPositionRelativeToTimeline(ghostTrackItem.end);
    const style = {
      left: left + 'px',
      width: (right - left) + 'px'
    }
    const className = 'track-item ';
                      // 'snap-' + trackItemHost.snapped;
    return (
      <div className={className} style={style}>
        <div className='bar'/>
      </div>
    )
  }

}