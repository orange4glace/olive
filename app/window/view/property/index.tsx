import * as React from 'react'
import TimelineViewState from '../timeline/controller/state';
import { computed, observer } from 'window/app-mobx';
import Timeline from 'internal/timeline/timeline';
import TrackItem from 'internal/timeline/track-item';

import * as style from './index.scss'
import { PropertyFormView } from './form';
import { PropertyTimelineView } from './timeline';

@observer
export class PropertyView extends React.Component {

  @computed get timeline(): Timeline {
    return TimelineViewState.focusedTimelineViewController ?
      TimelineViewState.focusedTimelineViewController.timelineHost.timeline as Timeline :  null;
  }
  @computed get trackItem(): TrackItem {
    return TimelineViewState.focusedTimelineViewController ?
      TimelineViewState.focusedTimelineViewController.focusedTrackItemHosts.size == 1 ?
      TimelineViewState.focusedTimelineViewController.focusedTrackItemHosts.values().next().value.trackItem as TrackItem : null : null;
  }

  render() {
    if (this.timeline && this.trackItem) {
      return (
        <div className={style.component}>
          <div className='property-form-view'>
            <PropertyFormView timeline={this.timeline} trackItem={this.trackItem}/>
          </div>
          <div className='property-keyframe-view'>
            <PropertyTimelineView timeline={this.timeline} trackItem={this.trackItem}/>
          </div>
        </div>
      )
    }
    else {
      return <div>NO TrackItem Selected</div>
    }
  }

}

