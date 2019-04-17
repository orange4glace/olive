import * as React from 'react'
import { observable, action } from 'window/app-mobx';
import { TimelineViewController, TrackHost, TrackItemHost } from '../../controller';
import { GhostTrackItemSet, GhostTrackItem } from '../../controller/track-host';
import { TimePair } from 'internal/timeline/time-pair';
import { TrackItemUserViewProps } from '../tracks-view';

import ADiv from 'window/view/advanced-div';
import TimelineViewState from '../../controller/state';
import TrackItem from 'internal/timeline/track-item';
import Track from 'internal/timeline/track';

import * as style from './track-item-manipulation.scss';
import { EventUtil } from 'orangeutil';

export class TrackItemManipulation {

  private controller: TimelineViewController;

  private current = 0;
  private final = 0;
  private ghostTrackItemSets: Map<TrackHost, GhostTrackItemSet>;
  private targetTrackItems: Map<TrackHost, TrackItem[]>;
  private minimum = 0;
  private maximum = 0;

  startResizeLeft: any;
  handleResizeLeft: any;
  commitResizeLeft: any;
  startResizeRight: any;
  handleResizeRight: any;
  commitResizeRight: any;

  constructor(controller: TimelineViewController) {
    this.controller = controller;

    this.startResizeLeft = this.startResize.bind(this, 'LEFT');
    this.handleResizeLeft = this.handleResize.bind(this, 'LEFT');
    this.commitResizeLeft = this.commitResize.bind(this, 'LEFT');
    this.startResizeRight = this.startResize.bind(this, 'RIGHT');
    this.handleResizeRight = this.handleResize.bind(this, 'RIGHT');
    this.commitResizeRight = this.commitResize.bind(this, 'RIGHT');
  }
  
  @action
  startResize(direction: 'LEFT' | 'RIGHT', e: MouseEvent | React.MouseEvent, trackHost: TrackHost, trackItemHost: TrackItemHost) {
    this.current = 0;

    this.targetTrackItems = new Map();
    let targetTrackItems = [trackItemHost.trackItem];
    this.targetTrackItems.set(trackHost, targetTrackItems);

    this.ghostTrackItemSets = new Map();
    this.targetTrackItems.forEach((trackItems: TrackItem[], trackHost: TrackHost) => {
      let ghostTrackItemSet = new GhostTrackItemSet();
      this.ghostTrackItemSets.set(trackHost, ghostTrackItemSet);
      trackItems.forEach(trackItem => {
        let ghostTrackItem = new GhostTrackItem(trackItemHost.trackItem.time.start, trackItemHost.trackItem.time.end);
        ghostTrackItem.trackItem = trackItem;
        ghostTrackItemSet.add(ghostTrackItem);
      })
      trackHost.addGhostTrackItemSet(ghostTrackItemSet);
    });

    this.minimum = -Infinity;
    this.maximum = Infinity;
    if (direction == 'LEFT') {
      let prevTrack = trackHost.track.getTrackItemBefore(trackItemHost.trackItem);
      if (prevTrack) this.minimum = prevTrack.time.end - trackItemHost.trackItem.time.start;
      this.maximum = trackItemHost.trackItem.time.end - trackItemHost.trackItem.time.start;
    }
    else if (direction == 'RIGHT') {
      let nextTrack = trackHost.track.getTrackItemBefore(trackItemHost.trackItem);
      if (nextTrack) this.maximum = trackItemHost.trackItem.time.end - nextTrack.time.start;
      this.minimum = trackItemHost.trackItem.time.start - trackItemHost.trackItem.time.end;
    }
    // if (trackItemHost == trackHost.getFirstFocusedTrackItemHost()) {
    //   this.controller.timelineHost.trackHosts.forEach(trackHost => {
    //     trackHost.activeTrackItemHost(trackHost.getFirstFocusedTrackItemHost());
    //   });
    // }
    // EventUtil.addMouseMoveHoldEventListener(document, this.handleResizeLeft);
  }

  @action
  handleResize(direction: 'LEFT' | 'RIGHT', e: MouseEvent): number {
    const controller = this.controller;
    let dt = controller.getTimeAmountRelativeToTimeline(e.movementX);
    this.current += dt;
    dt = this.current;

    dt = Math.max(Math.min(dt, this.maximum), this.minimum);

    let snapAdjustment = Infinity;
    let snapTargets: Set<number> = new Set<number>();

    this.ghostTrackItemSets.forEach(ghostTrackItemSet => {
      ghostTrackItemSet.value.forEach(ghostTrackItem => {
        if (direction == 'LEFT')
          ghostTrackItem.start = ghostTrackItem.trackItem.time.start + dt;
        else if (direction == 'RIGHT')
          ghostTrackItem.end = ghostTrackItem.trackItem.time.end + dt;
      })
    })
    if (TimelineViewState.snap) {
      this.ghostTrackItemSets.forEach(ghostTrackItemSet => {
        ghostTrackItemSet.value.forEach(ghostTrackItem => {
          const localTime = (direction == 'LEFT' ? ghostTrackItem.start : ghostTrackItem.end);
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
      })
      if (Math.abs(snapAdjustment) <= controller.getTimeAmountRelativeToTimeline(controller.snapThreshold))
        dt += snapAdjustment;
      else snapTargets.clear();
    }

    dt = Math.max(Math.min(dt, this.maximum), this.minimum);
    dt = Math.round(dt);

    this.ghostTrackItemSets.forEach(ghostTrackItemSet => {
      ghostTrackItemSet.value.forEach(ghostTrackItem => {
        if (direction == 'LEFT')
          ghostTrackItem.start = ghostTrackItem.trackItem.time.start + dt;
        else if (direction == 'RIGHT')
          ghostTrackItem.end = ghostTrackItem.trackItem.time.end + dt;
      })
    })
    // controller.timelineHost.trackHosts.forEach(trackHost => {
    //   trackHost.trackItemHostsActive.forEach(trackItemHost => {
    //     trackItemHost.startTimeActive = trackItemHost.startTime + dt;
    //     trackItemHost.snapped = snapTargets.has(trackItemHost.startTimeActive) ? 'left' : 'none';
    //   })
    // })
    this.final = dt;
    return dt;
  }

  @action
  commitResize(direction: 'LEFT' | 'RIGHT') {
    this.targetTrackItems.forEach((trackItems: TrackItem[], trackHost: TrackHost) => {
      trackItems.forEach(trackItem => {
        if (direction == 'LEFT')
        trackHost.track.setTrackItemTime(trackItem,
            trackItem.time.start + this.final, trackItem.time.end,
            trackItem.baseTime + this.final);
        else if (direction == 'RIGHT')
          trackHost.track.setTrackItemTime(trackItem,
              trackItem.time.start, trackItem.time.end + this.final,
              trackItem.baseTime);
      })
    })
    this.ghostTrackItemSets.forEach((ghostTrackItemSet, trackHost) => {
      trackHost.removeGhostTrackItemSet(ghostTrackItemSet);
    })
  }

  
  startMove(e: MouseEvent, trackHost: TrackHost, trackItemHost: TrackItemHost) {
    const timelineHost = this.controller.timelineHost
    this.current = 0;

    this.targetTrackItems = new Map();

    timelineHost.trackHosts.forEach(trackHost => {
      let targetTrackItems: TrackItem[] = [];
      trackHost.focusedTrackItemHosts.forEach(trackItemHost => {
        targetTrackItems.push(trackItemHost.trackItem);
      })
      this.targetTrackItems.set(trackHost, targetTrackItems);
    })

    this.ghostTrackItemSets = new Map();
    this.targetTrackItems.forEach((trackItems: TrackItem[], trackHost: TrackHost) => {
      let ghostTrackItemSet = new GhostTrackItemSet();
      this.ghostTrackItemSets.set(trackHost, ghostTrackItemSet);
      trackItems.forEach(trackItem => {
        let ghostTrackItem = new GhostTrackItem(trackItemHost.trackItem.time.start, trackItemHost.trackItem.time.end);
        ghostTrackItem.trackItem = trackItem;
        ghostTrackItemSet.add(ghostTrackItem);
      })
      trackHost.addGhostTrackItemSet(ghostTrackItemSet);
    });

    this.minimum = -Infinity;
    this.maximum = Infinity;
  }

  handleMove(e: MouseEvent): number {
    const controller = this.controller;
    let dt = controller.getTimeAmountRelativeToTimeline(e.movementX);
    this.current += dt;
    dt = this.current;

    dt = Math.max(Math.min(dt, this.maximum), this.minimum);

    let snapAdjustment = Infinity;
    let snapTargets: Set<number> = new Set<number>();

    this.ghostTrackItemSets.forEach(ghostTrackItemSet => {
      ghostTrackItemSet.value.forEach(ghostTrackItem => {
        ghostTrackItem.start = ghostTrackItem.trackItem.time.start + dt;
        ghostTrackItem.end = ghostTrackItem.trackItem.time.end + dt;
      })
    })
    if (TimelineViewState.snap) {
      this.ghostTrackItemSets.forEach(ghostTrackItemSet => {
        ghostTrackItemSet.value.forEach(ghostTrackItem => {
          const localTime = ghostTrackItem.start;
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
      })
      
      this.ghostTrackItemSets.forEach(ghostTrackItemSet => {
        ghostTrackItemSet.value.forEach(ghostTrackItem => {
          const localTime = ghostTrackItem.end;
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
      })
      
      if (Math.abs(snapAdjustment) <= controller.getTimeAmountRelativeToTimeline(controller.snapThreshold))
        dt += snapAdjustment;
      else snapTargets.clear();
    }

    dt = Math.max(Math.min(dt, this.maximum), this.minimum);
    dt = Math.round(dt);

    this.ghostTrackItemSets.forEach(ghostTrackItemSet => {
      ghostTrackItemSet.value.forEach(ghostTrackItem => {
        ghostTrackItem.start = ghostTrackItem.trackItem.time.start + dt;
        ghostTrackItem.end = ghostTrackItem.trackItem.time.end + dt;
      })
    })
    // controller.timelineHost.trackHosts.forEach(trackHost => {
    //   trackHost.trackItemHostsActive.forEach(trackItemHost => {
    //     trackItemHost.startTimeActive = trackItemHost.startTime + dt;
    //     trackItemHost.snapped = snapTargets.has(trackItemHost.startTimeActive) ? 'left' : 'none';
    //   })
    // })
    this.final = dt;
    return dt;
  }

  commitMove() {
    this.targetTrackItems.forEach((trackItems: TrackItem[], trackHost: TrackHost) => {
      trackItems.forEach(trackItem => {
        trackHost.track.setTrackItemTime(trackItem,
            trackItem.time.start + this.final, trackItem.time.end + this.final,
            trackItem.baseTime);
      })
    })
    this.ghostTrackItemSets.forEach((ghostTrackItemSet, trackHost) => {
      trackHost.removeGhostTrackItemSet(ghostTrackItemSet);
    })
  }
  

}


export class TrackItemManipulationView extends React.Component<TrackItemUserViewProps, {}> {

  manipulationController: TrackItemManipulation;

  constructor(props: TrackItemUserViewProps) {
    super(props);
    this.manipulationController = new TrackItemManipulation(this.props.timelineViewController);

    this.startResizeLeft = this.startResizeLeft.bind(this);
    this.handleResizeLeft = this.handleResizeLeft.bind(this);
    this.commitResizeLeft = this.commitResizeLeft.bind(this);
    this.startResizeRight = this.startResizeRight.bind(this);
    this.handleResizeRight = this.handleResizeRight.bind(this);
    this.commitResizeRight = this.commitResizeRight.bind(this);
    this.startMove = this.startMove.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.commitMove = this.commitMove.bind(this);
  }

  startResizeLeft(e: MouseEvent) {
    this.manipulationController.startResizeLeft(e, this.props.trackHost, this.props.trackItemHost);
    return true;
  }

  handleResizeLeft(e: MouseEvent) {
    this.manipulationController.handleResizeLeft(e);
  }

  commitResizeLeft() {
    this.manipulationController.commitResizeLeft();
  }

  startResizeRight(e: MouseEvent) {
    this.manipulationController.startResizeRight(e, this.props.trackHost, this.props.trackItemHost);
    return true;
  }

  handleResizeRight(e: MouseEvent) {
    this.manipulationController.handleResizeRight(e);
  }

  commitResizeRight() {
    this.manipulationController.commitResizeRight();
  }

  startMove(e: MouseEvent) {
    console.log('start move')
    this.manipulationController.startMove(e, this.props.trackHost, this.props.trackItemHost);
    return true;
  }

  handleMove(e: MouseEvent) {
    console.log('handle move')
    this.manipulationController.handleMove(e);
  }

  commitMove(e: MouseEvent) {
    this.manipulationController.commitMove();
  }
  
  render() {
    return (
      <ADiv className={style.component}
            onMouseDown={EventUtil.stopPropagation}
            onDocumentMouseMoveStart={this.startMove}
            onDocumentMouseMove={this.handleMove}
            onDocumentMouseMoveEnd={this.commitMove}>
        <ADiv className='thumb left-inner'
            onMouseDown={EventUtil.stopPropagation}
            onDocumentMouseMoveStart={this.startResizeLeft}
            onDocumentMouseMove={this.handleResizeLeft}
            onDocumentMouseMoveEnd={this.commitResizeLeft}/>
        <ADiv className='thumb left-outer'
            onMouseDown={EventUtil.stopPropagation}
            onDocumentMouseMoveStart={this.startResizeLeft}
            onDocumentMouseMove={this.handleResizeLeft}
            onDocumentMouseMoveEnd={this.commitResizeLeft}/>
        <ADiv className='thumb right-inner'
            onMouseDown={EventUtil.stopPropagation}
            onDocumentMouseMoveStart={this.startResizeRight}
            onDocumentMouseMove={this.handleResizeRight}
            onDocumentMouseMoveEnd={this.commitResizeRight}/>
        <ADiv className='thumb right-outer'
            onMouseDown={EventUtil.stopPropagation}
            onDocumentMouseMoveStart={this.startResizeRight}
            onDocumentMouseMove={this.handleResizeRight}
            onDocumentMouseMoveEnd={this.commitResizeRight}/>
        {/* <ADiv className='thumb left-outer' onDocumentMouseMoveStart={this.leftHandleMouseMoveStartHandler}/>
        <ADiv className='thumb right-outer' onDocumentMouseMoveStart={this.rightHandleMouseMoveStartHandler}/> */}
      </ADiv>
    )
  }
}