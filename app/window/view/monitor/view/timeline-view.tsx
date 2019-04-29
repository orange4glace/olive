import * as React from 'react'
import { MonitorWidgetViewProps } from 'window/view/monitor/view/widget-view';
import { MonitorWidgetTimelineViewModel } from 'window/view/monitor/model/timeline-view-model';
import { MonitorWidgetTrackItemSelectorView, MonitorWidgetTrackItemViewSelector } from 'window/view/monitor/view/track-item/track-item-view';
import { observer } from 'window/app-mobx';
import { MonitorWidgetVideoTrackItemViewModel } from 'window/view/monitor/model/track-item/video-track-item-view-model';
import { MonitorWidgetVideoTrackItemView } from 'window/view/monitor/view/track-item/video-track-item-view';
import { MonitorWidgetDrawingViewSelector } from 'window/view/monitor/view/drawing/drawing-view';
import { MonitorWidgetRectangleDrawingViewModel } from 'window/view/monitor/model/drawing/rectangle-drawing-view-model';
import { MonitorWidgetRectangleDrawingView } from 'window/view/monitor/view/drawing/rectangle-drawing-view';
import { MouseUtil } from 'orangeutil';

export interface MonitorWidgetTimelineViewProps extends MonitorWidgetViewProps {
  timelineViewModel: MonitorWidgetTimelineViewModel;
}

@observer
export class MonitorWidgetTimelineView extends React.Component<MonitorWidgetTimelineViewProps, {}> {

  ref: React.RefObject<any> = React.createRef();

  constructor(props: MonitorWidgetTimelineViewProps) {
    super(props);
    this.mouseDownHandler = this.mouseDownHandler.bind(this);
  }

  componentDidMount() {

  }

  mouseDownHandler(e: React.MouseEvent) {
    const pos = MouseUtil.mousePositionElement(e, this.ref.current);
    this.props.timelineViewModel.fireMouseDown(pos.x, pos.y);
  }

  render() {
    return (
      <div className='timeline' ref={this.ref}
          onMouseDown={this.mouseDownHandler}>
        {this.props.timelineViewModel.trackItemViewModels.map(trackItemViewModel =>
          !trackItemViewModel ? null :
          <MonitorWidgetTrackItemSelectorView key={trackItemViewModel.viewModelID}
              {...this.props} trackItemViewModel={trackItemViewModel}/>
        )}
      </div>
    )
  }

}
MonitorWidgetTrackItemViewSelector.registerView(MonitorWidgetVideoTrackItemViewModel, MonitorWidgetVideoTrackItemView);
MonitorWidgetDrawingViewSelector.registerView(MonitorWidgetRectangleDrawingViewModel, MonitorWidgetRectangleDrawingView);