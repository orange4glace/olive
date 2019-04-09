import * as React from 'React'
import { TimelineViewController } from './controller';
import app from 'internal/app';
import { observer } from 'window/app-mobx';

@observer
export class TimelineHeaderView extends React.Component<{
  timelineViewController: TimelineViewController
}, {}> {

  render() {
    const controller = this.props.timelineViewController;
    const formattedCurrentFrameTime = app.project.frameRate.format(
        controller.timelineHost.timeline.currentTime);
    return (
      <>
        <div className='current-frame-time'>
          {formattedCurrentFrameTime}
        </div>
      </>
    )
  }
}