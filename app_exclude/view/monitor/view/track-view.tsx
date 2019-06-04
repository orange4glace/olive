import * as React from 'react'

import { MonitorWidgetTimelineViewProps } from "window/view/monitor/view/timeline-view";
import { MonitorWidgetTrackViewModel } from "window/view/monitor/model/track-view-model";
import { observer } from 'window/app-mobx';
import { MonitorWidgetTrackItemSelectorView } from 'window/view/monitor/view/track-item/track-item-view';

export interface MonitorWidgetTrackViewProps extends MonitorWidgetTimelineViewProps {
  trackViewModel:  MonitorWidgetTrackViewModel;
}

@observer
export class MonitorWidgetTrackView extends React.Component<MonitorWidgetTrackViewProps, {}> {

  render() {
    return (
      <div className='track'>
      { this.props.trackViewModel.currentTrackItemViewModel &&
        <MonitorWidgetTrackItemSelectorView {...this.props}
            trackItemViewModel={this.props.trackViewModel.currentTrackItemViewModel}/>
      }
      </div>
    )
  }

}