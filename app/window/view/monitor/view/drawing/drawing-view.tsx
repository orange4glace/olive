import * as React from 'react'
import { MonitorWidgetDrawingViewModel } from 'window/view/monitor/model/drawing/drawing-view-model';
import { MonitorWidgetTrackItemViewProps } from 'window/view/monitor/view/track-item/track-item-view';
import { ViewModelSelector, ViewModelSelectorView } from 'window/base/common/view-model-selector';
import { observer } from 'window/app-mobx';

export interface MonitorWidgetDrawingProps<T extends MonitorWidgetDrawingViewModel<any>>
    extends MonitorWidgetTrackItemViewProps<any> {
  drawingViewModel: T;
}

export const MonitorWidgetDrawingViewSelector = new ViewModelSelector<MonitorWidgetDrawingProps<any>, any>();

export abstract class MonitorWidgetDrawingView<T extends MonitorWidgetDrawingViewModel<any>>
    extends React.Component<MonitorWidgetDrawingProps<T>> {

}

@observer
export class MonitorWidgetDrawingSelectorView 
    extends React.Component<MonitorWidgetDrawingProps<any>, {}> {
  render() {
    return (
      <ViewModelSelectorView selector={MonitorWidgetDrawingViewSelector}
          viewModel={this.props.drawingViewModel} props={this.props}/>
    )
  }
}