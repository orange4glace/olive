import * as React from 'react'
import TimelineViewState from '../timeline/controller/state';
import { computed, observer, autorun } from 'window/app-mobx';

import * as style from './view.scss'
import { PropertyFormView } from './form';
import { PropertyTimelineView } from './timeline';
import { TimelineViewController, TrackItemHost } from '../timeline/controller';
import { EffectControlViewController } from './controller';

@observer
export class EffectControlView extends React.Component {

  constructor(props: any) {
    super(props);
  }

  @computed get timelineViewController(): TimelineViewController {
    return TimelineViewState.focusedTimelineViewController;
  }
  @computed get trackItemHost(): TrackItemHost {
    let controller = this.timelineViewController;
    if (!controller) return null;
    let focusedTrackItemHost: TrackItemHost = null;
    let count = 0;
    controller.timelineHost.trackHosts.forEach(trackHost => {
      if (trackHost.focusedTrackItemHosts.size)
        focusedTrackItemHost = trackHost.focusedTrackItemHosts.values().next().value;
      count += trackHost.focusedTrackItemHosts.size;
    })
    if (count > 1) return null;
    return focusedTrackItemHost;
  }

  render() {
    if (this.timelineViewController && this.trackItemHost) {
      return (
        <EffectControlContentView timelineViewController={this.timelineViewController} trackItemHost={this.trackItemHost}/>
      )
    }
    else {
      return <div>NO TrackItem Selected</div>
    }
  }

}

class EffectControlContentView extends React.PureComponent<{
  timelineViewController: TimelineViewController,
  trackItemHost: TrackItemHost
}, {}> {

  render() {
    const controller = new EffectControlViewController(this.props.timelineViewController, this.props.trackItemHost);
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