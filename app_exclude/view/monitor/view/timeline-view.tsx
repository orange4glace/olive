import * as React from 'react'
import { MonitorWidgetViewProps } from 'window/view/monitor/view/widget-view';
import { MonitorWidgetTimelineViewModel } from 'window/view/monitor/model/timeline-view-model';
import { MonitorWidgetTrackItemSelectorView } from 'window/view/monitor/view/track-item/track-item-view';
import { observer } from 'window/app-mobx';
import { MouseUtil } from 'orangeutil';
import { MonitorWidgetTrackView } from 'window/view/monitor/view/track-view';

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
    console.log(e)
    const pos = MouseUtil.mousePositionElement(e, this.ref.current);
    this.props.timelineViewModel.fireMouseDown(pos.x, pos.y);
  }

  render() {
    return (
      <div className='timeline' ref={this.ref}
          onMouseDown={this.mouseDownHandler}>
        {this.props.timelineViewModel.trackViewModels.map(tvm =>
          <MonitorWidgetTrackView key={tvm.viewModelID} {...this.props} trackViewModel={tvm}/>
        )}
      </div>
    )
  }

}