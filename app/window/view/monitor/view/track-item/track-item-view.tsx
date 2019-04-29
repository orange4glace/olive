import * as React from 'react'
import { MonitorWidgetTrackItemViewModel } from 'window/view/monitor/model/track-item/track-item-view-model';
import { MonitorWidgetViewProps } from 'window/view/monitor/view/widget-view';
import { ViewModelSelector, ViewModelSelectorView } from 'window/base/common/view-model-selector';
import { MonitorWidgetVideoTrackItemViewModel } from 'window/view/monitor/model/track-item/video-track-item-view-model';
import { observer } from 'window/app-mobx';

export interface MonitorWidgetTrackItemViewProps<T extends MonitorWidgetTrackItemViewModel<any>> 
    extends MonitorWidgetViewProps {
  trackItemViewModel: T;
}

export const MonitorWidgetTrackItemViewSelector = new ViewModelSelector<MonitorWidgetTrackItemViewProps<any>, MonitorWidgetTrackItemViewModel<any>>();

export abstract class MonitorWidgetTrackItemView<T extends MonitorWidgetTrackItemViewModel<any>> 
    extends React.Component<MonitorWidgetTrackItemViewProps<T>, {}> {

}

@observer
export class MonitorWidgetTrackItemSelectorView
    extends React.Component<MonitorWidgetTrackItemViewProps<any>, {}> {
  render() {
    return (
      <div className='track-item-view'>
        <ViewModelSelectorView selector={MonitorWidgetTrackItemViewSelector}
            viewModel={this.props.trackItemViewModel} props={this.props}/>
      </div>
    )
  }
}
