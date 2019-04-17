import * as React from 'react'

import { TimelineViewController } from "../controller/controller";
import Timeline from "internal/timeline/timeline";
import ZoomableScrollView, { ZoomableScrollViewController } from 'window/view/zoomable-scroll-view';
import { observer } from 'window/app-mobx';
import { TimelineRulerView } from './timeline-ruler-view';

export interface TimelineViewProps {
  controller: TimelineViewController;
  timeline: Timeline;
}

export default class TimelineView extends React.Component<TimelineViewProps, {}> {

  scrollViewController: ZoomableScrollViewController;

  constructor(props: any) {
    super(props);

    this.scrollViewUpdateHandler = this.scrollViewUpdateHandler.bind(this);
    this.scrollViewController = new ZoomableScrollViewController();
    this.scrollViewController.ee.on('update', this.scrollViewUpdateHandler);
  }

  scrollViewUpdateHandler() {
    let startTime: number, endTime: number,
        pxPerFrame: number, unitFrameTime: number, unitWidth: number;

    const controller = this.scrollViewController;
    const timeline = this.props.timeline;
    startTime = Math.floor(timeline.totalTime * controller.start);
    endTime = Math.ceil(timeline.totalTime * controller.end);
    unitFrameTime = 30;
    unitWidth = controller.scrollWidth / ((endTime - startTime) / unitFrameTime);
    if (unitWidth <= 0) return;
    let multiplier = [5,2,3,2];
    let multiplierI = 0;
    if (unitWidth > 150) {
      while (true) {
        let cand = unitWidth / multiplier[multiplierI];
        if (cand < 150) break;
        unitWidth = cand;
        unitFrameTime /= multiplier[multiplierI];
        multiplierI = (++multiplierI % multiplier.length);
      }
    }
    else {
      while (unitWidth < 150) {
        unitWidth = unitWidth * multiplier[multiplierI];
        unitFrameTime *= multiplier[multiplierI];
        multiplierI = (++multiplierI % multiplier.length);
      }
    }
    pxPerFrame = unitWidth / unitFrameTime;
    unitFrameTime = unitFrameTime;
    unitWidth = unitWidth;
    
    this.props.controller.updateScrollViewState(
        startTime, endTime, pxPerFrame, controller.scrollWidth, unitFrameTime, unitWidth);
  }

  render() {
    return (
      <ZoomableScrollView controller={this.scrollViewController}>
        <TimelineViewContent {...this.props}></TimelineViewContent>
      </ZoomableScrollView>
    )
  }
}

@observer
class TimelineViewContent extends React.Component<TimelineViewProps, {}> {

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className={style.component}>
        <TimelineRulerView {...this.props}/>
        <TimelineTracksView timelineViewController={this.props.controller}/>
        <UserViews timelineViewController={this.props.controller}/>
      </div>
    )
  }

}
