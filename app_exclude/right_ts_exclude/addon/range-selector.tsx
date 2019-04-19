import * as React from 'react'
import { observable, action } from "mobx";

import TimelineViewController, { TimelineViewEventType } from "window/view/timeline/controller/controller";
import { MouseUtil, EventUtil } from "orangeutil";
import { observer } from "mobx-react";
import { TracksUserViewProps, TracksUserView } from '../timeline-tracks-view';

interface TimelinePosition {
  time: number;
  y: number;
}
interface TimeSlice {
  startTime: number;
  endTime: number;
}

export class RangeSelector {

  controller: TimelineViewController;

  private _start: TimelinePosition;
  private _end: TimelinePosition;

  @observable start: TimelinePosition;
  @observable end : TimelinePosition;

  @observable active: boolean;


  constructor(controller: TimelineViewController) {
    this.controller = controller;

    this.startRange = this.startRange.bind(this);
    this.moveRange = this.moveRange.bind(this);
    this.endRange = this.endRange.bind(this);

    controller.addEventListener(TimelineViewEventType.TRACKS_MOUSE_MOVE_START, this.startRange);
  }

  private calculate() {
    this.start = {
      time: Math.min(this._start.time, this._end.time),
      y: Math.min(this._start.y, this._end.y)
    };
    this.end = {
      time: Math.max(this._start.time, this._end.time),
      y: Math.max(this._start.y, this._end.y)
    };
  }

  private exclude(l1: TimeSlice, l2: TimeSlice): TimeSlice {
    if (l1.startTime >= l2.startTime) return {
      startTime: l2.endTime,
      endTime: l1.endTime
    };
    return {
      startTime: l1.startTime,
      endTime: l2.startTime
    };
  }

  @action
  startRange(e: MouseEvent | React.MouseEvent) {
    this.active = true;
    this.controller.timelineHost.defocusAllTrackItemHosts();
    let pos = MouseUtil.mousePositionElement(e, this.controller.tracksViewRef.current);
    this._start = {
      time: this.controller.getTimeRelativeToTimeline(pos.x),
      y: pos.y
    };
    this._end = {
      time: this.controller.getTimeRelativeToTimeline(pos.x),
      y: pos.y
    };
    this.calculate();
    EventUtil.addMouseMoveHoldEventListener(document, this.moveRange, this.endRange);
  }

  @action
  moveRange(e: MouseEvent | React.MouseEvent) {
    const lastXLine: TimeSlice = {
      startTime: this.start.time,
      endTime: this.end.time
    };
    let pos = MouseUtil.mousePositionElement(e, this.controller.tracksViewRef.current);
    this._end = {
      time: this.controller.getTimeRelativeToTimeline(pos.x),
      y: pos.y
    };
    this.calculate();
    const currentXLine: TimeSlice = {
      startTime: this.start.time,
      endTime: this.end.time
    };

    const oldXLine: TimeSlice = this.exclude(lastXLine, currentXLine);
    const newXLine: TimeSlice = this.exclude(currentXLine, lastXLine);
    this.controller.timelineHost.trackHosts.forEach(trackHost => {
      trackHost.getTrackItemsAtRange(oldXLine.startTime, oldXLine.endTime).forEach(trackItem => {
        if (e.movementX > 0 && trackItem.time.end < oldXLine.endTime)
          trackHost.defocusTrackItemHost(trackHost.getTrackItemHost(trackItem));
        if (e.movementX < 0 && trackItem.time.start > oldXLine.startTime)
          trackHost.defocusTrackItemHost(trackHost.getTrackItemHost(trackItem));
      })
    })
    this.controller.timelineHost.trackHosts.forEach(trackHost => {
      trackHost.getTrackItemsAtRange(newXLine.startTime, newXLine.endTime).forEach(trackItem => {
        trackHost.focusTrackItemHost(trackHost.getTrackItemHost(trackItem));
      })
    });
  }

  @action
  endRange(e: MouseEvent | React.MouseEvent) {
    this.active = false;
  }

}

@observer
export class RangeSelectorView extends TracksUserView {

  rangeSelector: RangeSelector;

  constructor(props: TracksUserViewProps) {
    super(props);
    this.rangeSelector = new RangeSelector(props.timelineViewController);
  }

  render() {
    const controller = this.props.timelineViewController;
    const rangeSelector = this.rangeSelector;
    if (!rangeSelector.active) return <></>;
    const style = {
      left: controller.getPositionRelativeToTimeline(rangeSelector.start.time) + 'px',
      top: rangeSelector.start.y + 'px',
      width: controller.getPixelAmountRelativeToTimeline(rangeSelector.end.time - rangeSelector.start.time) + 'px',
      height: (rangeSelector.end.y - rangeSelector.start.y) + 'px'
    };
    return (
      <div className='range-selector' style={style}>
        <div className='b'/>
      </div>
    )
  }

}