import { observable } from "window/app-mobx";
import Timeline from "internal/timeline/timeline";
import { ZoomableScrollViewController } from "window/view/zoomable-scroll-view";
import { MouseUtil } from "orangeutil";
import TrackItem from "internal/timeline/track-item";
import { TrackItemHost } from "./track-item-host";
import { EventEmitter2 } from "eventemitter2";

interface PropertyViewEvent {
  a: number;
}

export interface PropertyTimelineEvent extends PropertyViewEvent {
  
}

export class PropertyViewController {

  timeline: Timeline;
  trackItemHost: TrackItemHost;
  
  @observable baseTimecode: number;
  @observable startTimecode: number;
  @observable endTimecode: number;
  @observable pxPerMillisecond: number;
  @observable unitMillisecond: number;
  @observable unitWidth: number;
  ref: React.RefObject<any>;
  scrollViewController: ZoomableScrollViewController;

  private ee: EventEmitter2;

  constructor(timeline: Timeline, trackItem: TrackItem) {
    this.timeline = timeline;
    this.trackItemHost = new TrackItemHost(trackItem);
    this.ee = new EventEmitter2();
  }
  
  addEventListener<T extends PropertyViewEvent>(event: string, listener: (e: Event, data: T)=>void) {
    this.ee.on(event, listener);
  }

  removeEventListener<T extends PropertyViewEvent>(event: string, listener: (e: Event, data: T)=>void) {
    this.ee.off(event, listener);
  }

  fireEvent<T extends PropertyViewEvent>(event: string, e: Event, data: T) {
    this.ee.emit(event, e, data);
  }

  getTimeRelativeToTimeline(px: number) {
    return Math.round(this.startTimecode + px / this.pxPerMillisecond);
  }
  getTimeAmountRelativeToTimeline(px: number) {
    return px / this.pxPerMillisecond;
  }
  getPositionRelativeToTimeline(time: number) {
    // Touch |endTime| variable so observer can detect the change
    this.endTimecode;
    time -= this.baseTimecode;
    return Math.floor((time - this.startTimecode) * this.pxPerMillisecond);
  }
  getPixelAmountRelativeToTimeline(time: number) {
    time -= this.baseTimecode;
    return time * this.pxPerMillisecond;
  }
  getMousePostionRelativeToTimeline(e: MouseEvent | React.MouseEvent) {
    return MouseUtil.mousePositionElement(e, this.ref.current);
  }
}