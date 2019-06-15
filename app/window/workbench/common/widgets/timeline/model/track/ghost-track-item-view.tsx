import * as React from 'react'
import { TimelineScrollView } from 'window/workbench/common/widgets/timeline/model/scroll-view-model';
import { Disposable } from 'base/common/lifecycle';
import { Event, Emitter } from 'base/common/event';
import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';

export class GhostTrackItemView extends Disposable {

  private readonly onDidDispose_: Emitter<void> = new Emitter();
  public readonly onDidDispose: Event<void> = this.onDidDispose_.event;

  @observable private startTime_: number;
  public get startTime() { return this.startTime_; }
  @observable private endTime_: number;
  public get endTime() { return this.endTime_; }

  @observable private visibleStartTime_: number;
  public get visibleStartTime() { return this.visibleStartTime_; }
  @observable private visibleEndTime_: number;
  public get visibleEndTime() { return this.visibleEndTime_; }

  @observable private leftMagnetted_: boolean;
  public get leftMagnetted(): boolean { return this.leftMagnetted_; }
  @observable private rightMagnetted_: boolean;
  public get rightMagnetted(): boolean { return this.rightMagnetted_; }

  @computed get startPosition(): number {
    return this.timelineScrollView.getPositionRelativeToTimeline(this.startTime);
  }
  @computed get endPosition(): number {
    return this.timelineScrollView.getPositionRelativeToTimeline(this.endTime);
  }

  @computed get visibleStartPosition(): number {
    return this.timelineScrollView.getPositionRelativeToTimeline(this.visibleStartTime);
  }
  @computed get visibleEndPosition(): number {
    return this.timelineScrollView.getPositionRelativeToTimeline(this.visibleEndTime);
  }

  constructor(
    private readonly timelineScrollView: TimelineScrollView,
    startTime: number,
    endTime: number) {
    super();
    this.setTime(startTime, endTime);
  }

  setTime(startTime: number, endTime: number) {
    this.startTime_ = startTime;
    this.endTime_ = endTime;
  }

  setVisibleTime(startTime: number, endTime: number) {
    this.visibleStartTime_ = startTime;
    this.visibleEndTime_ = endTime;
  }

  setLeftMagnetted(value: boolean) {
    this.leftMagnetted_ = value;
  }

  setRightMagnetted(value: boolean) {
    this.rightMagnetted_ = value;
  }

  render(): React.ReactNode {
    return <GhostTrackItemViewComponent view={this}/>
  }

  dispose() {
    this.onDidDispose_.fire();
  }

}

@observer
class GhostTrackItemViewComponent extends React.Component<{view: GhostTrackItemView}> {

  render() {
    const view = this.props.view;
    console.log(view.visibleStartPosition, view.visibleEndPosition);
    const style = {
      left: view.visibleStartPosition + 'px',
      width: Math.max(0, (view.visibleEndPosition - view.visibleStartPosition)) + 'px'
    }
    return (
      <div className='ghost-track-item' style={style}/>
    )
  }

}