import * as React from 'react'
import app from 'internal/app';
import { observer } from 'window/app-mobx';
import { TimelineWidgetViewProps } from 'window/view/timeline/widget-view';

@observer
export class TimelineHeaderView extends React.Component<TimelineWidgetViewProps, {}> {

  render() {
    const timeline = this.props.widget.model.timeline;
    const formattedCurrentFrameTime = timeline.videoSetting.frameRate.format(
        this.props.widget.model.currentTime);
    return (
      <>
        <div className='current-frame-time'>
          {formattedCurrentFrameTime}
        </div>
      </>
    )
  }
}