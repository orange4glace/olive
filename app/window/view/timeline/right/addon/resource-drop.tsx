import * as React from 'react'
import { observable, observer } from 'window/app-mobx'
import { IObservableValue } from 'mobx';

import app from 'internal/app'

import { TimelineViewController, TrackItemHost } from '../../controller';
import { DNDInstance } from 'window/dragndrop';
import { TrackUserViewProps } from '../tracks-view';
import ADiv from 'window/view/advanced-div';
import { GhostTrackItem, GhostTrackItemSet } from '../../controller/track-host';

import * as style from './resource-drop.scss'
import TimelineViewState from '../../controller/state';
import { Resource } from 'internal/resource';
import { TimePair } from 'internal/timeline/time-pair';

class DropInstance {
  resource: Resource;
  ghostTrackItemSet: GhostTrackItemSet;

  constructor(resource: Resource) {
    this.resource = resource;
    let ghostTrackItem = new GhostTrackItem(0, 2000);
    this.ghostTrackItemSet = new GhostTrackItemSet();
    this.ghostTrackItemSet.add(ghostTrackItem);
  }
}

let crurentDropInstance: IObservableValue<DropInstance> = observable.box<DropInstance>(null);

DNDInstance.ee.on('dragstart', (e: React.DragEvent, type: string, data: any) => {
  if (type == 'resource') {
    crurentDropInstance.set(new DropInstance(data));
  }
})
DNDInstance.ee.on('dragend', (e: React.DragEvent) => {
  crurentDropInstance.set(null);
})

@observer
export class ResourceDropView extends React.Component<TrackUserViewProps, {}> {

  constructor(props: TrackUserViewProps) {
    super(props);
  }

  render() {
    return (<>
      { crurentDropInstance.get() && <ResourceDropViewRenderer
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
    if (crurentDropInstance.get() == null) return;
    this.props.trackHost.removeGhostTrackItemSet(crurentDropInstance.get().ghostTrackItemSet)
  }

  dragEnterHandler(e: React.DragEvent) {
    if (crurentDropInstance.get() == null) return;
    this.props.trackHost.addGhostTrackItemSet(crurentDropInstance.get().ghostTrackItemSet)
    console.log(crurentDropInstance.get(), this.props.trackHost, this.props.trackHost.ghostTrackItemSets.size)
  }

  dragLeaveHandler(e: React.DragEvent) {
    if (crurentDropInstance.get() == null) return;
    this.props.trackHost.removeGhostTrackItemSet(crurentDropInstance.get().ghostTrackItemSet)
  }

  dragOverHandler(e: React.DragEvent) {
    if (crurentDropInstance.get() == null) return;
    const time = this.controller.getTimeRelativeToTimeline(this.controller.getMousePostionRelativeToTimeline(e).x);
    this.setBaseTime(time);
    e.preventDefault();
  }

  dropHandler(e: React.DragEvent) {
    this.commit();
  }
  
  setBaseTime(time: number) {
    const controller = this.controller;
    const ghostTrackItemSet = crurentDropInstance.get().ghostTrackItemSet;
    let dt = time;
    let maximum = Infinity;
    let minimum = -Infinity;

    // ghostTrackItemSet.iterateCalculated(ghostTrackItem => {
    //   const localMaximum = controller.timelineHost.timeline.totalTime - ghostTrackItem.time.end;
    //   const localMinimum = -ghostTrackItem.time.start;
    //   maximum = Math.min(maximum, localMaximum);
    //   minimum = Math.max(minimum, localMinimum);
    // })
    // dt = Math.max(Math.min(dt, maximum), minimum);

    let snapAdjustment = Infinity;
    let snapTargets: Set<number> = new Set<number>();

    if (TimelineViewState.snap) {
      ghostTrackItemSet.value.forEach(ghostTrackItem => {
        const localTime = ghostTrackItem.baseEnd + dt;
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
      ghostTrackItemSet.value.forEach(ghostTrackItem => {
        const localTime = ghostTrackItem.baseStart + dt;
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
    ghostTrackItemSet.baseTime = dt;

    ghostTrackItemSet.value.forEach(ghostTrackItem => {
      ghostTrackItem.start = ghostTrackItem.baseStart + dt;
      ghostTrackItem.end = ghostTrackItem.baseEnd + dt;
      // ghostTrackItem.snapped = snapTargets.has(trackItemHost.startTimeActive) ? 'left' :
      //                         snapTargets.has(trackItemHost.endTimeActive) ? 'right' : 'none';
    })
    return dt;
  }

  commit() {
    const controller = this.controller;
    const resource = crurentDropInstance.get().resource;
    const ghostTrackItemSet = crurentDropInstance.get().ghostTrackItemSet;
    // ghostTrackItemSet.iterateCalculated(ghostTrackItem => {
    //   this.props.trackHost.track.clearTime(ghostTrackItem.time.start, ghostTrackItem.time.end);
    // });
    ghostTrackItemSet.value.forEach(ghostTrackItem => {
      const trackItem = app.factory.createTrackItem(resource,
          app.factory.createTimePair(ghostTrackItem.start, ghostTrackItem.end), 0);
      this.props.trackHost.track.addTrackItem(trackItem);
    });
    console.log('commit end')
    
    this.props.trackHost.removeGhostTrackItemSet(ghostTrackItemSet);
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