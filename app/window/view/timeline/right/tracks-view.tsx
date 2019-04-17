import * as React from 'react'
import { observer, observable } from 'window/app-mobx';
import { TimelineViewProps } from './timeline-view';
import ADiv from 'window/view/advanced-div';
import { MouseUtil } from 'orangeutil';

export interface TimelineTracksViewProps extends TimelineViewProps {
}

@observer
export class TimelineTracksView extends React.Component<TimelineTracksViewProps, {}> {

  viewRef: React.RefObject<HTMLDivElement> = React.createRef();

  @observable indicatorTime: number;
  
  constructor(props: TimelineTracksViewProps) {
    super(props);

    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
  }

  mouseMoveHandler(e: React.MouseEvent) {
    this.updateGuidelineIndicatorTime(e);
  }

  updateGuidelineIndicatorTime(e: React.MouseEvent) {
    const controller = this.props.controller;
    const x = MouseUtil.mousePositionElement(e, this.viewRef.current).x;
    this.indicatorTime = controller.getTimeRelativeToTimeline(x);
    // if (TimelineState.snap) this.time = controller.getSnappedTime(this.time);
  }

  render() {
    const controller = this.props.controller;
    const timelineHost = timelineViewController.timelineHost;
    return (
      <ADiv className='timeline-tracks-view' onMouseMove={this.mouseMoveHandler} ref={this.viewRef}>
        <TracksView timelineViewController={timelineViewController}/>
        <GhostTracksView timelineViewController={timelineViewController}/>
        <GuidelineIndicator {...this.props} time={this.indicatorTime}/>
      </ADiv>
    )  
  }

}




@observer
export class TracksView extends React.Component<TimelineTracksViewProps, {}> {

  constructor(props: TimelineTracksViewProps) {
    super(props);
  }

  render() {
    const controller = this.props.controller;
    const timeline = this.props.timeline;
    return (
      <div className='tracks'>
        {timeline.tracks.map(track => {
          return ( <TrackView key={track.id} {...this.props} track={track}/>)})}
      </div>
    )
  }
}




interface GuidelineIndicatorProps extends TimelineTracksViewProps {
  time: number;
}

@observer
class GuidelineIndicator extends React.Component<GuidelineIndicatorProps, {}> {
  
  constructor(props: any) {
    super(props);
  }

  render() {
    const position = this.props.controller.getPositionRelativeToTimeline(this.props.time);
    const style = {
      left: position + 'px'
    }
    return (
      <div className='guideline-indicator' style={style}/>
    )
  }

}