import * as React from 'react'
import { observer, observable } from 'window/app-mobx';
import { TimelineContentViewProps } from './timeline-view';
import ADiv from 'window/view/advanced-div';
import { MouseUtil } from 'orangeutil';
import { TrackView } from 'window/view/timeline/right/track-view';

export interface TimelineTracksViewProps extends TimelineContentViewProps {
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
    const widget = this.props.widget;
    const x = MouseUtil.mousePositionElement(e, this.viewRef.current).x;
    this.indicatorTime = widget.model.getTimeRelativeToTimeline(x);
    // if (TimelineState.snap) this.time = controller.getSnappedTime(this.time);
  }

  render() {
    return (
      <ADiv className='timeline-tracks-view' onMouseMove={this.mouseMoveHandler} ref={this.viewRef}>
        <TracksView {...this.props}/>
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
    const widget = this.props.widget;
    return (
      <div className='tracks'>
        {widget.model.timeline.tracks.map(track => {
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
    const position = this.props.widget.model.getPositionRelativeToTimeline(this.props.time);
    const style = {
      left: position + 'px'
    }
    return (
      <div className='guideline-indicator' style={style}/>
    )
  }

}