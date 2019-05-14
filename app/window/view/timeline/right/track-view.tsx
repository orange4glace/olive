import * as React from 'react'
import { observer, observable } from 'window/app-mobx';
import { TimelineTracksViewProps } from './tracks-view';
import { TrackItemView } from './track-item-view';
import { TimelineWidgetTrackViewModel } from 'window/view/timeline/model/track-view-model';
import { TimelineWidgetGhostContainerViewModel, TimelineWidgetGhostTrackItemViewModel } from 'window/view/timeline/model/ghost-view-model';
import { StandardMouseEvent } from 'base/view/mouseEvent';

export interface TimelineTrackViewProps extends TimelineTracksViewProps {
  index: number;
  trackViewModel: TimelineWidgetTrackViewModel;
  ghostContainerViewModel: TimelineWidgetGhostContainerViewModel | null;
}

@observer
export class TrackView extends React.Component<TimelineTrackViewProps, {}> {

  constructor(props: any) {
    super(props);

    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
    this.dragOverHandler = this.dragOverHandler.bind(this);
    this.dragLeaveHandler = this.dragLeaveHandler.bind(this);
    this.dropHandler = this.dropHandler.bind(this);
  }

  mouseMoveHandler(e: React.MouseEvent) {
    this.props.outgoingEvents.emitTrackMouseMove({
      trackViewModel: this.props.trackViewModel,
      e: new StandardMouseEvent(e)
    })
  }

  dragOverHandler(e: React.MouseEvent) {
    this.props.outgoingEvents.emitTrackDragOver({
      trackViewModel: this.props.trackViewModel,
      e: new StandardMouseEvent(e)
    });
  }

  dragLeaveHandler(e: React.MouseEvent) {
    this.props.outgoingEvents.emitTrackDragLeave({
      trackViewModel: this.props.trackViewModel,
      e: new StandardMouseEvent(e)
    });
  }

  dropHandler(e: React.MouseEvent) {
    this.props.outgoingEvents.emitTrackDrop({
      trackViewModel: this.props.trackViewModel,
      e: new StandardMouseEvent(e)
    });
  }

  render() {
    const style = {
      height: 30 + 'px'
    }
    return (
      <div className='track' style={style}
        onMouseMove={this.mouseMoveHandler}
        onDragOver={this.dragOverHandler}
        onDragLeave={this.dragLeaveHandler}
        onDrop={this.dropHandler}>
        <TrackItemViewRenderer {...this.props}/>
        <GhostTrackItemRenderer {...this.props}/>
      </div>
    );
  }
}

@observer
export class TrackItemViewRenderer extends React.Component<TimelineTrackViewProps, {}> {

  render() {
    const trackVM = this.props.trackViewModel;
    return (
      <> 
        {[...trackVM.trackItemViewModels].map(trackItemVM =>
            <TrackItemView key={trackItemVM.viewModelID} {...this.props} trackItemViewModel={trackItemVM}/>)}
      </>
    )
  }
}


@observer
export class GhostTrackItemRenderer extends React.Component<TimelineTrackViewProps, {}> {

  render() {
    const gcVM = this.props.ghostContainerViewModel;
    return (
      <>
        {gcVM && gcVM.trackMagnetFlag[this.props.index]
         && <div className='ghost-track-magnet-guide' style={
           {left: gcVM.magnetTimePx + 'px'}
        }></div>}
        {gcVM &&
            gcVM.getGhostTrackItems(this.props.index).map(ghostTrackItemVM =>
            <TimelineWidgetGhostTrackItemView key={ghostTrackItemVM.viewModelID} {...this.props} ghostTrackItemViewModel={ghostTrackItemVM}/>)}
      </>
    )
  }
}

interface TimelineWidgetGhostTrackItemViewProps extends TimelineTrackViewProps {
  ghostTrackItemViewModel: TimelineWidgetGhostTrackItemViewModel;
}

@observer
export class TimelineWidgetGhostTrackItemView extends React.Component<TimelineWidgetGhostTrackItemViewProps, {}> {

  constructor(props: any) {
    super(props);
  }

  render() {
    const ghostTrackItemVM = this.props.ghostTrackItemViewModel;
    const widget = this.props.widget;
    const containerVM = this.props.ghostContainerViewModel;
    const left = widget.model.getPositionRelativeToTimeline(ghostTrackItemVM.startTime + containerVM.leftExtend);
    const right = widget.model.getPositionRelativeToTimeline(ghostTrackItemVM.endTime + containerVM.rightExtend);
    const style = {
      left: left + 'px',
      width: (right - left) + 'px'
    }
    return (
      <div className='ghost-track-item' style={style}/>
    )
  }

}

