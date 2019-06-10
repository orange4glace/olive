import * as React from 'react'

import * as style from './left-track-view.scss';
import { TimelineWidgetViewProps } from 'window/workbench/common/widgets/timeline/widget-view';
import { TimelineWidgetTrackViewModel } from 'window/workbench/common/widgets/timeline/model/track-view-model';

export class TimelineWidgetSideContentView extends React.Component<TimelineWidgetViewProps, {}> {
  render() {
    const timelineVM = this.props.widget.model;
    return (
      <div className={style.component}>
      {timelineVM.trackViewModels.map(trackVM => 
        <TrackView key={trackVM.viewModelID} {...this.props} trackViewModel={trackVM}/>)
      }</div>
    )
  }
}

interface TrackViewProps extends TimelineWidgetViewProps {
  trackViewModel: TimelineWidgetTrackViewModel;
}

class TrackView extends React.Component<TrackViewProps, {}> {

  constructor(props: TrackViewProps) {
    super(props);
  }

  render() {
    const trackVM = this.props.trackViewModel;
    const style = {
      height: '30px',
      lineHeight: '30px'
    }
    return (
      <div className='track' style={style}>
        <div className='name'>{trackVM.name}</div>
      </div>
    )
  }
  
}