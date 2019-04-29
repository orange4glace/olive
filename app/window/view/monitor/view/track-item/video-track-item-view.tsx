import * as React from 'react'
import { MonitorWidgetTrackItemView } from 'window/view/monitor/view/track-item/track-item-view';
import { MonitorWidgetVideoTrackItemViewModel } from 'window/view/monitor/model/track-item/video-track-item-view-model';
import { MonitorWidgetDrawingSelectorView } from 'window/view/monitor/view/drawing/drawing-view';
import { observer } from 'window/app-mobx';

@observer
export class MonitorWidgetVideoTrackItemView extends
    MonitorWidgetTrackItemView<MonitorWidgetVideoTrackItemViewModel> {
  
  render() {
    return (
      <MonitorWidgetDrawingSelectorView {...this.props} drawingViewModel={this.props.trackItemViewModel.drawingViewModel}/>
    )
  }

}