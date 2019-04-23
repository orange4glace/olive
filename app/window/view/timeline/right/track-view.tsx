import * as React from 'react'
import { observer, observable } from 'window/app-mobx';
import { TimelineTracksViewProps } from './tracks-view';
import { Track } from 'internal/timeline/track';
import { TrackItemView } from './track-item-view';
import { TimelineWidgetGhostTrackItem, TimelineWidgetGhostContainer } from 'window/view/timeline/model/ghost';

export interface TimelineTrackViewProps extends TimelineTracksViewProps {
  index: number;
  track: Track;
  ghostContainer: TimelineWidgetGhostContainer | null;
}

@observer
export class TrackView extends React.Component<TimelineTrackViewProps, {}> {

  dragOverHandler: (e: React.MouseEvent)=>void;
  dragLeaveHandler: (e: React.MouseEvent)=>void;

  constructor(props: any) {
    super(props);

    this.onDrop = this.onDrop.bind(this);

    const controller = this.props.widget.controller;
    const track = this.props.track;
    this.dragOverHandler = e => {controller.trackDragOverHandler(track, e);}
    this.dragLeaveHandler = e => {controller.trackDragLeaveHandler(track, e);}    
  }

  onDrop(e: React.MouseEvent) {
    const controller = this.props.widget.controller;
    controller.trackDropHandler(this.props.track, e);
  }

  render() {
    const style = {
      height: 30 + 'px'
    }
    return (
      <div className='track' style={style}
        onDragOver={this.dragOverHandler}
        onDragLeave={this.dragLeaveHandler}
        onDrop={this.onDrop}>
        <TrackItemViewRenderer {...this.props}/>
        <GhostTrackItemRenderer {...this.props}/>
      </div>
    );
  }
}

@observer
export class TrackItemViewRenderer extends React.Component<TimelineTrackViewProps, {}> {

  render() {
    return (
      <> 
        {[...this.props.track.trackItems].map(([trackItem, _]) =>
            <TrackItemView {...this.props} trackItem={trackItem}/>)}
      </>
    )
  }
}


@observer
export class GhostTrackItemRenderer extends React.Component<TimelineTrackViewProps, {}> {

  render() {
    return (
      <>
        {this.props.ghostContainer && this.props.ghostContainer.getGhostTrackItems(this.props.index).map(ghostTrackItem =>
            <TimelineWidgetGhostTrackItemView {...this.props} ghostTrackItem={ghostTrackItem}/>)}
      </>
    )
  }
}

interface TimelineWidgetGhostTrackItemViewProps extends TimelineTrackViewProps {
  ghostTrackItem: TimelineWidgetGhostTrackItem;
}

@observer
export class TimelineWidgetGhostTrackItemView extends React.Component<TimelineWidgetGhostTrackItemViewProps, {}> {

  constructor(props: any) {
    super(props);
  }

  render() {
    const ghostTrackItem = this.props.ghostTrackItem;
    const widget = this.props.widget;
    const container = this.props.ghostContainer;
    const left = widget.model.getPositionRelativeToTimeline(ghostTrackItem.startTime + container.leftExtend + container.translation);
    const right = widget.model.getPositionRelativeToTimeline(ghostTrackItem.endTime + container.rightExtend + container.translation);
    const style = {
      left: left + 'px',
      width: (right - left) + 'px'
    }
    return (
      <div className='ghost-track-item' style={style}/>
    )
  }

}

