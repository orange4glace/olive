import * as React from 'react'
import { observable, observer } from 'window/app-mobx'
import { IObservableValue } from 'mobx';

import app from 'internal/app'

import { TimelineViewController, TrackItemHost } from '../../controller';
import TimelineState from '../../timeline-context';
import { DNDInstance } from 'window/dragndrop';
import { TrackUserViewProps } from '../tracks-view';
import ADiv from 'window/view/advanced-div';
import { TrackItemHostSet } from '../../controller/track-host';

import * as style from './resource-drop.scss'

let currentTrackItemHostSet: IObservableValue<TrackItemHostSet> = observable.box<TrackItemHostSet>(null);

DNDInstance.ee.on('dragstart', (e: React.DragEvent, type: string, data: any) => {
  if (type == 'resource') {
    let trackItem = app.factory.createTrackItem(data);
    let trackItemHost = new TrackItemHost(trackItem);
    currentTrackItemHostSet.set(new TrackItemHostSet());
    currentTrackItemHostSet.get().add(trackItemHost);
  }
})
DNDInstance.ee.on('dragend', (e: React.DragEvent) => {
  currentTrackItemHostSet.set(null);
})

@observer
export class ResourceDropView extends React.Component<TrackUserViewProps, {}> {

  constructor(props: TrackUserViewProps) {
    super(props);
  }

  render() {
    return (<>
      { currentTrackItemHostSet.get() && <ResourceDropViewRenderer
          timelineHost={this.props.timelineHost}
          trackHost={this.props.trackHost} timelineViewController={this.props.timelineViewController}/>}
    </>)
  }
}

@observer
class ResourceDropViewRenderer extends React.Component<TrackUserViewProps, {}> {

  private controller: TimelineViewController;

  constructor(props: TrackUserViewProps) {
    super(props);
    this.controller = props.timelineViewController;
    console.log(props.trackHost)

    this.dragEnterHandler = this.dragEnterHandler.bind(this);
    this.dragLeaveHandler = this.dragLeaveHandler.bind(this);
    this.dragOverHandler = this.dragOverHandler.bind(this);
    this.dropHandler = this.dropHandler.bind(this);
  }

  componentWillUnmount() {
    this.props.trackHost.removeActivatedTrackItemHostSet(currentTrackItemHostSet.get())
  }

  dragEnterHandler(e: React.DragEvent) {
    this.props.trackHost.addActivatedTrackItemHostSet(currentTrackItemHostSet.get())
  }

  dragLeaveHandler(e: React.DragEvent) {
    this.props.trackHost.removeActivatedTrackItemHostSet(currentTrackItemHostSet.get())
  }

  dragOverHandler(e: React.DragEvent) {
    const time = this.controller.getTimeRelativeToTimeline(this.controller.getMousePostionRelativeToTimeline(e).x);
    this.setBaseTime(time);
    e.preventDefault();
  }

  dropHandler(e: React.DragEvent) {
    this.commit();
  }
  
  setBaseTime(time: number) {
    const controller = this.controller;
    let dt = time;
    let maximum = Infinity;
    let minimum = -Infinity;

    currentTrackItemHostSet.get().value.forEach(trackItemHost => {
      const localMaximum = controller.timelineHost.timeline.totalTime - trackItemHost.endTime;
      const localMinimum = -trackItemHost.startTime;
      maximum = Math.min(maximum, localMaximum);
      minimum = Math.max(minimum, localMinimum);
    })
    dt = Math.max(Math.min(dt, maximum), minimum);

    let snapAdjustment = Infinity;
    let snapTargets: Set<number> = new Set<number>();

    if (TimelineState.snap) {
      currentTrackItemHostSet.get().value.forEach(trackItemHost => {
        const localTime = trackItemHost.endTime + dt;
        const snapTime = controller.getClosestSnapTime(localTime);
        const localSnapAdjustment = snapTime - localTime;
        const comp = Math.abs(snapAdjustment) - Math.abs(localSnapAdjustment);
        if (comp > 0) {
          snapAdjustment = localSnapAdjustment;
          snapTargets.clear();
          snapTargets.add(snapTime);
        }
        else if (comp == 0) snapTargets.add(snapTime);
      })
      currentTrackItemHostSet.get().value.forEach(trackItemHost => {
        const localTime = trackItemHost.startTime + dt;
        const snapTime = controller.getClosestSnapTime(localTime);
        const localSnapAdjustment = snapTime - localTime;
        const comp = Math.abs(snapAdjustment) - Math.abs(localSnapAdjustment);
        if (comp > 0) {
          snapAdjustment = localSnapAdjustment;
          snapTargets.clear();
          snapTargets.add(snapTime);
        }
        else if (comp == 0) snapTargets.add(snapTime);
      })
      if (Math.abs(snapAdjustment) <= controller.getTimeAmountRelativeToTimeline(controller.snapThreshold))
        dt += snapAdjustment;
      else snapTargets.clear();
    }

    dt = Math.max(Math.min(dt, maximum), minimum);
    dt = Math.round(dt);
    currentTrackItemHostSet.get().value.forEach(trackItemHost => {
      trackItemHost.startTimeActive = trackItemHost.startTime + dt;
      trackItemHost.endTimeActive = trackItemHost.endTime + dt;
      trackItemHost.snapped = snapTargets.has(trackItemHost.startTimeActive) ? 'left' :
                              snapTargets.has(trackItemHost.endTimeActive) ? 'right' : 'none';
    })
    return dt;
  }

  commit() {
    const controller = this.controller;
    currentTrackItemHostSet.get().value.forEach(trackItemHost => {
      console.log(trackItemHost.startTimeActive, trackItemHost.endTimeActive);
      this.props.trackHost.track.clearTime(trackItemHost.startTimeActive, trackItemHost.endTimeActive);
    });
    currentTrackItemHostSet.get().value.forEach(trackItemHost => {
      let trackItem = trackItemHost.trackItem.clone();
      trackItem.setTime(trackItemHost.startTimeActive, trackItemHost.endTimeActive);
      this.props.trackHost.track.addTrackItem(trackItem);
    });
    console.log('commit end')
    
    this.props.trackHost.removeActivatedTrackItemHostSet(currentTrackItemHostSet.get())
  }

  render() {
    return (
      <ADiv className={style.component}
            onDragEnter={this.dragEnterHandler}
            onDragLeave={this.dragLeaveHandler}
            onDragOver={this.dragOverHandler}
            onDrop={this.dropHandler}>

      </ADiv>
    )
  }

}