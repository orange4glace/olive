import * as React from 'react'
import TimelineViewState from '../timeline/controller/state';
import { computed, observer, autorun } from 'window/app-mobx';
import Timeline from 'internal/timeline/timeline';
import TrackItem from 'internal/timeline/track-item';

import * as style from './index.scss'
import { PropertyFormView } from './form';
import { PropertyTimelineView } from './timeline';
import { PropertyViewController } from './control/property-view-controller';

@observer
export class PropertyView extends React.Component {

  constructor(props: any) {
    super(props);
  }

  @computed get timeline(): Timeline {
    return TimelineViewState.focusedTimelineViewController ?
      TimelineViewState.focusedTimelineViewController.timelineHost.timeline as Timeline :  null;
  }
  @computed get trackItem(): TrackItem {
    let controller = TimelineViewState.focusedTimelineViewController;
    if (!controller) return null;
    let focusedTrackItem: TrackItem = null;
    let count = 0;
    controller.timelineHost.trackHosts.forEach(trackHost => {
      if (trackHost.focusedTrackItemHosts.size)
        focusedTrackItem = trackHost.focusedTrackItemHosts.values().next().value.trackItem;
      count += trackHost.focusedTrackItemHosts.size;
    })
    if (count > 1) return null;
    return focusedTrackItem;
  }

  render() {
    if (this.timeline && this.trackItem) {
      return (
        <PropertyContentView timeline={this.timeline} trackItem={this.trackItem}/>
      )
    }
    else {
      return <div>NO TrackItem Selected</div>
    }
  }

}

class PropertyContentView extends React.PureComponent<{
  timeline: Timeline,
  trackItem: TrackItem
}, {}> {

  render() {
    const controller = new PropertyViewController(this.props.timeline, this.props.trackItem);
    return (
      <div className={style.component}>
        <div className='property-form-view'>
          <PropertyFormView propertyViewController={controller}/>
        </div>
        <div className='property-keyframe-view'>
          <PropertyTimelineView propertyViewController={controller}/>
        </div>
      </div>
    )
  }

}