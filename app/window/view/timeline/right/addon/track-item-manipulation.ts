/*
import { action } from 'mobx';

import TimelineViewController from '../controller';
import TrackHost from '../track-host';
import TrackItemHost from '../track-item-host';
import { EventUtil } from 'orangeutil';
import TimelineState from '../state';

export default class TrackItemManipulation {

  private controller: TimelineViewController;

  private resizingPixelWidth = 0;

  constructor(controller: TimelineViewController) {
    this.controller = controller;

    this.startResizeLeft = this.startResizeLeft.bind(this);
    this.startResizeRight = this.startResizeRight.bind(this);
    this.handleResizeLeft = this.handleResizeLeft.bind(this);
    this.handleResizeRight = this.handleResizeRight.bind(this);
    this.startMove = this.startMove.bind(this);
    this.move = this.move.bind(this);
    this.endMove = this.endMove.bind(this);

    this.controller.trackItemLeftHandleMouseMoveStartHandler = this.startResizeLeft;
    this.controller.trackItemRightHandleMouseMoveStartHandler = this.startResizeRight;
    this.controller.trackItemBarHandleMouseMoveStartHandler = this.startMove;
  }
  
  @action
  startResizeLeft(e: MouseEvent | React.MouseEvent, trackHost: TrackHost, trackItemHost: TrackItemHost) {
    this.resizingPixelWidth = 0;
    trackHost.activeTrackItemHost(trackItemHost);
    if (trackItemHost == trackHost.getFirstFocusedTrackItemHost()) {
      this.controller.timelineHost.trackHosts.forEach(trackHost => {
        trackHost.activeTrackItemHost(trackHost.getFirstFocusedTrackItemHost());
      });
    }
    EventUtil.addMouseMoveHoldEventListener(document, this.handleResizeLeft);
  }

  @action
  handleResizeLeft(e: MouseEvent): number {
    const controller = this.controller;
    let dt = controller.getTimeAmountRelativeToTimeline(
      controller.getMousePostionRelativeToTimeline(e).x);
    this.resizingPixelWidth += dt;
    dt = this.resizingPixelWidth;
    let maximum = Infinity;
    let minimum = -Infinity;

    controller.timelineHost.trackHosts.forEach(trackHost => {
      trackHost.trackItemHostsActive.forEach(trackItemHost => {
        const localMinimum = Math.max(trackItemHost.startBoundaryTime,
            0) - trackItemHost.startTime;
        const localMaximum = trackItemHost.endTime - trackItemHost.startTime;
        maximum = Math.min(maximum, localMaximum);
        minimum = Math.max(minimum, localMinimum);
      })
    })
    dt = Math.max(Math.min(dt, maximum), minimum);

    let snapAdjustment = Infinity;
    let snapTargets: Set<number> = new Set<number>();

    if (TimelineState.snap) {
      controller.timelineHost.trackHosts.forEach(trackHost => {
        trackHost.trackItemHostsActive.forEach(trackItemHost => {
          const localTime = trackItemHost.startTime + dt;
          const snapTime = controller.getClosestSnapTime(localTime)
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

    dt = Math.max(Math.min(dt, maximum), minimum);
    dt = Math.round(dt);

    controller.timelineHost.trackHosts.forEach(trackHost => {
      trackHost.trackItemHostsActive.forEach(trackItemHost => {
        trackItemHost.startTimeActive = trackItemHost.startTime + dt;
        trackItemHost.snapped = snapTargets.has(trackItemHost.startTimeActive) ? 'left' : 'none';
      })
    })
    return dt;
  }

  @action
  startResizeRight(e: MouseEvent | React.MouseEvent, trackHost: TrackHost, trackItemHost: TrackItemHost) {
    const controller = this.controller;
    this.resizingPixelWidth = 0;
    trackHost.activeTrackItemHost(trackItemHost);
    if (trackItemHost == trackHost.getLastFocusedTrackItemHost()) {
      controller.timelineHost.trackHosts.forEach(trackHost => {
        trackHost.activeTrackItemHost(trackHost.getLastFocusedTrackItemHost());
      });
    }
    EventUtil.addMouseMoveHoldEventListener(document, this.handleResizeRight);
  }

  @action
  handleResizeRight(e: MouseEvent): number {
    const controller = this.controller;
    let dt = controller.getTimeAmountRelativeToTimeline(
      controller.getMousePostionRelativeToTimeline(e).x);
    this.resizingPixelWidth += dt;
    dt = this.resizingPixelWidth;
    let maximum = Infinity;
    let minimum = -Infinity;

    controller.timelineHost.trackHosts.forEach(trackHost => {
      trackHost.trackItemHostsActive.forEach(trackItemHost => {
        const localMaximum = Math.min(trackItemHost.endBoundaryTime,
          controller.timelineHost.timeline.totalTime) - trackItemHost.endTime;
        const localMinimum = trackItemHost.startTime - trackItemHost.endTime;
        maximum = Math.min(maximum, localMaximum);
        minimum = Math.max(minimum, localMinimum);
      })
    })
    dt = Math.max(Math.min(dt, maximum), minimum);

    let snapAdjustment = Infinity;
    let snapTargets: Set<number> = new Set<number>();

    if (TimelineState.snap) {
      controller.timelineHost.trackHosts.forEach(trackHost => {
        trackHost.trackItemHostsActive.forEach(trackItemHost => {
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
      })
      if (Math.abs(snapAdjustment) <= controller.getTimeAmountRelativeToTimeline(controller.snapThreshold))
        dt += snapAdjustment;
      else snapTargets.clear();
    }

    dt = Math.max(Math.min(dt, maximum), minimum);
    dt = Math.round(dt);
    controller.timelineHost.trackHosts.forEach(trackHost => {
      trackHost.trackItemHostsActive.forEach(trackItemHost => {
        trackItemHost.endTimeActive = trackItemHost.endTime + dt;
        trackItemHost.snapped = snapTargets.has(trackItemHost.endTimeActive) ? 'right' : 'none';
      })
    })
    return dt;
  }


  
  startMove(e: MouseEvent, trackHost: TrackHost, trackItemHost: TrackItemHost) {
    const controller = this.controller;
    this.resizingPixelWidth = 0;
    controller.timelineHost.trackHosts.forEach(trackHost => {
      trackHost.trackItemHosts.forEach(trackItemHost => {
        if (trackItemHost.focused) trackHost.activeTrackItemHost(trackItemHost);
      })
    });
    EventUtil.addMouseMoveHoldEventListener(document, this.move, this.endMove);
  }

  move(e: MouseEvent): number {
    const controller = this.controller;
    let dt = controller.getTimeAmountRelativeToTimeline(
      controller.getMousePostionRelativeToTimeline(e).x);
    this.resizingPixelWidth += dt;
    dt = this.resizingPixelWidth;
    let maximum = Infinity;
    let minimum = -Infinity;

    controller.timelineHost.trackHosts.forEach(trackHost => {
      trackHost.trackItemHostsActive.forEach(trackItemHost => {
        const localMaximum = controller.timelineHost.timeline.totalTime - trackItemHost.endTime;
        const localMinimum = -trackItemHost.startTime;
        maximum = Math.min(maximum, localMaximum);
        minimum = Math.max(minimum, localMinimum);
      })
    })
    dt = Math.max(Math.min(dt, maximum), minimum);

    let snapAdjustment = Infinity;
    let snapTargets: Set<number> = new Set<number>();
    
    if (TimelineState.snap) {
      controller.timelineHost.trackHosts.forEach(trackHost => {
        trackHost.trackItemHostsActive.forEach(trackItemHost => {
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
      })
      controller.timelineHost.trackHosts.forEach(trackHost => {
        trackHost.trackItemHostsActive.forEach(trackItemHost => {
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
      })
      if (Math.abs(snapAdjustment) <= controller.getTimeAmountRelativeToTimeline(controller.snapThreshold))
        dt += snapAdjustment;
      else snapTargets.clear();
    }

    dt = Math.max(Math.min(dt, maximum), minimum);
    dt = Math.round(dt);
    controller.timelineHost.trackHosts.forEach(trackHost => {
      trackHost.trackItemHostsActive.forEach(trackItemHost => {
        trackItemHost.startTimeActive = trackItemHost.startTime + dt;
        trackItemHost.endTimeActive = trackItemHost.endTime + dt;
        trackItemHost.snapped = snapTargets.has(trackItemHost.startTimeActive) ? 'left' :
                                snapTargets.has(trackItemHost.endTimeActive) ? 'right' : 'none';
      })
    })
    return dt;
  }

  endMove() {
    this.controller.commit();
  }
  

}
*/