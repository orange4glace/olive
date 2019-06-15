import * as React from 'react'
import { ITimeline } from 'internal/timeline/base/timeline';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Disposable, IDisposable, dispose } from 'base/common/lifecycle';

export class TimelineHeaderView extends Disposable {

  private timelineDisposables_: IDisposable[] = [];

  @observable formattedCurrentTime: string;

  constructor(
    private timeline: ITimeline
  ) {
    super();

    this.setTimeline(timeline);
  }
  
  setTimeline(timeline: ITimeline) {
    this.timeline = timeline;
    this.timelineDisposables_ = dispose(this.timelineDisposables_);

    if (timeline) {
      this.calculateFormattedCurrentTime();
      timeline.onDidChangeCurrentTime(this.calculateFormattedCurrentTime, this, this.timelineDisposables_);
    }
  }

  private calculateFormattedCurrentTime(): void {
    this.formattedCurrentTime = this.timeline.videoSetting.frameRate.format(
        this.timeline.currentTime);
  }

  render(): React.ReactNode {
    return <TimelineHeaderViewComponent view={this}/>
  }

}

@observer
export class TimelineHeaderViewComponent extends React.Component<{view: TimelineHeaderView}> {

  render() {
    const view = this.props.view;
    return (
      <>
        <div className='left'>
          <div className='current-frame-time'>
            {view.formattedCurrentTime}
          </div>
        </div>
        <div className='right'>
        </div>
      </>
    )
  }
}