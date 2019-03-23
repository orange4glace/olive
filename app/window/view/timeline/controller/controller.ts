import * as React from 'react';
import { observable, action } from 'window/app-mobx';
import { EventEmitter2 } from 'eventemitter2'

import { MouseUtil } from 'orangeutil'
import { ZoomableScrollViewController } from 'window/view/zoomable-scroll-view'

import TimelineHost from './timeline-host'
import TrackHost from './track-host';
import TrackItemHost from './track-item-host';
import hotkeys from 'hotkeys-js';
import Timeline from 'internal/timeline/timeline';
import TrackItem from 'internal/timeline/track-item';

export enum TimelineViewEventType {
  TRACKS_MOUSE_MOVE_START = 'TRACKS_MOUSE_MOVE_START',
  TRACK_DRAG_OVER = 'TRACK_DRAG_OVER',
  TRACK_DROP = 'TRACK_DROP'
}

interface ReactComponentClass {
  new (): React.Component; }

export default class TimelineViewController {

  timelineHost: TimelineHost;
  scrollViewController: ZoomableScrollViewController;

  @observable active: boolean = false;
  snapThreshold: number = 10;

  @observable startTime: number;
  @observable endTime: number;
  @observable pxPerMillisecond: number;
  unitMillisecond: number;
  unitWidth: number;

  tracksViewRef: React.RefObject<any>;

  ee: EventEmitter2;

  constructor(timeline: Timeline) {
    this.timelineHost = new TimelineHost(timeline);

    this.tracksViewRef = React.createRef();

    this.ee = new EventEmitter2();

    this.update = this.update.bind(this);
    // this.commit = this.commit.bind(this);
  }

  attachScrollViewController(scrollViewController: ZoomableScrollViewController) {
    this.scrollViewController = scrollViewController
    scrollViewController.ee.on('update', this.update);
  }

  @action
  private update() {
    const controller = this.scrollViewController;
    const timeline = this.timelineHost.timeline;
    let startTime = Math.floor(timeline.totalTime * controller.start);
    let endTime = Math.floor(timeline.totalTime * controller.end);
    this.startTime = startTime;
    this.endTime = endTime;
    let unitMillisecond = 1000;
    let unitWidth = controller.scrollWidth / ((endTime - startTime) / unitMillisecond);
    let multiplier = [2, 5];
    let multiplierI = 0;
    if (unitWidth > 150) {
      while (true) {
        let cand = unitWidth / multiplier[multiplierI];
        if (cand < 150) break;
        unitWidth = cand;
        unitMillisecond /= multiplier[multiplierI];
        multiplierI = (++multiplierI % 2);
      }
    }
    else {
      while (unitWidth < 150) {
        unitWidth = unitWidth * multiplier[multiplierI];
        unitMillisecond *= multiplier[multiplierI];
        multiplierI = (++multiplierI % 2);
      }
    }
    this.pxPerMillisecond = unitWidth / unitMillisecond;
    this.unitMillisecond = unitMillisecond;
    this.unitWidth = unitWidth;

    this.ee.emit('update');
  }

  setSnapThreshold(value: number) {
    this.snapThreshold = value;
  }

  getClosestSnapTime(time: number) {
    let result = time;
    let dt = Infinity;
    this.timelineHost.trackHosts.forEach(trackHost => {
      const localSnapTime = trackHost.getClosestSnapTime(time);
      const localDt = Math.abs(time - localSnapTime);
      if (localDt < dt) {
        dt = localDt;
        result = localSnapTime;
      }
    })

    // Finally check currentTime
    const localDt = Math.abs(time - this.timelineHost.timeline.currentTime)
    if (localDt < dt) {
      dt = localDt;
      result = this.timelineHost.timeline.currentTime;
    }

    return result;
  }






/*
  commit() {
    this.timelineHost.trackHosts.forEach(trackHost => {
      const track = trackHost.track;
      trackHost.trackItemHostsActive.forEach(trackItemHost => {
        const trackItem = trackItemHost.trackItem;
        if (trackItem) track.unlink(trackItem);
      });
    });
    this.timelineHost.trackHosts.forEach(trackHost => {
      const track = trackHost.track;
      trackHost.trackItemHostsActive.forEach(trackItemHost => {
        track.clearTime(trackItemHost.startTimeActive, trackItemHost.endTimeActive);
      });
    });
    this.timelineHost.trackHosts.forEach(trackHost => {
      const track = trackHost.track;
      trackHost.trackItemHostsActive.forEach(trackItemHost => {
        let trackItem = trackItemHost.trackItem;
        track.setTrackItemTime(trackItem, trackItemHost.startTimeActive, trackItemHost.endTimeActive);
        track.link(trackItem);
      });
    });
    // clear all activated items
    this.timelineHost.trackHosts.forEach(trackHost => {
      trackHost.deactiveTrackItemHostsAll();
    });
    this.active = false;
  }
*/











  getSnappedTime(time: number) {
    const snap = this.getClosestSnapTime(time);
    const gap = Math.abs(snap - time);
    if (gap <= this.getTimeAmountRelativeToTimeline(this.snapThreshold))
      return snap;
    return time;
  }

  getTimeRelativeToTimeline(px: number) {
    return Math.round(this.startTime + px / this.pxPerMillisecond);
  }

  getTimeAmountRelativeToTimeline(px: number) {
    return px / this.pxPerMillisecond;
  }

  getPositionRelativeToTimeline(time: number) {
    // Touch |endTime| variable so observer can detect the change
    this.endTime;
    return Math.floor((time - this.startTime) * this.pxPerMillisecond);
  }

  getPixelAmountRelativeToTimeline(time: number) {
    return time * this.pxPerMillisecond;
  }

  getMousePostionRelativeToTimeline(e: MouseEvent | React.MouseEvent) {
    return MouseUtil.mousePositionElement(e, this.tracksViewRef.current);
  }


  // Event
  addEventListener(event: TimelineViewEventType.TRACKS_MOUSE_MOVE_START,
      callback: (e: MouseEvent) => void): void;
  addEventListener(event: TimelineViewEventType, callback: (...args: any) => void): void {
    this.ee.addListener(event, callback);
  }

  removeEventListener(event: TimelineViewEventType.TRACKS_MOUSE_MOVE_START,
      callback: (e: MouseEvent) => void): void;
  removeEventListener(event: TimelineViewEventType, callback: (...args: any) => void): void {
    this.ee.removeListener(event, callback);
  }

  fireEvent(event: TimelineViewEventType.TRACKS_MOUSE_MOVE_START, e: MouseEvent): void;
  fireEvent(event: TimelineViewEventType, ...args: any): void {
    this.ee.emit.bind(this.ee, event).apply(this.ee, args);
  }
}

/*
// Only for rgb-color app
export class ClipboardExtension {
  
  controller: TimelineViewController;

  clipboard: Array<TrackItem> = [];

  constructor(controller: TimelineViewController) {
    this.controller = controller;

    hotkeys('control+c', () => {
      this.clipboard = [];
      let minTime = Infinity;
      this.controller.timelineHost.trackHosts.forEach(trackHost => {
        trackHost.trackItemHosts.forEach(trackItemHost => {
          if (trackItemHost.focused) {
            this.clipboard.push(trackItemHost.trackItem.clone())
            minTime = Math.min(trackItemHost.trackItem.startTime, minTime);
          }
        })
      })
      this.clipboard.forEach(trackItem => {
        trackItem.startTime -= minTime;
        trackItem.endTime -= minTime;
      });
    })

    hotkeys('control+v', () => {
      this.controller.timelineHost.trackHosts.forEach(trackHost => {
        this.clipboard.forEach(trackItem => {
          const item = trackItem.clone()
          item.startTime += this.controller.timelineHost.timeline.getCurrentTime();
          item.endTime += this.controller.timelineHost.timeline.getCurrentTime();
          trackHost.track.clearTime(item.startTime, item.endTime);
          trackHost.track.addTrackItem(item);
        })
      })
    })
  }
}
*/