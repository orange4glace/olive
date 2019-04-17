import { TimelineViewGhostTrackItem, TimelineViewGhostContainer, TimelineViewGhostController } from "window/view/timeline/controller/ghost";
import { observable } from "window/app-mobx";
import Track from "internal/timeline/track";
import Timeline from "internal/timeline/timeline";

class TimelineViewGhostTrackItemImpl implements TimelineViewGhostTrackItem {

  @observable private startTime_: number;
  @observable private endTime_: number;
  @observable private snapLeft_: boolean;
  @observable private snapRight_: boolean;

  get startTime(): number { return this.startTime_; }
  get endTime(): number { return this.endTime_; }
  get snapLeft(): boolean { return this.snapLeft_; }
  get snapRight(): boolean { return this.snapRight_; }

  constructor(startTime: number, endTime: number) {
    this.startTime_ = startTime;
    this.endTime_ = endTime;
    this.snapLeft_ = false;
    this.snapRight_ = false;
  }

}

class TimelineViewGhostContainerImpl implements TimelineViewGhostContainer {

  private timeline_: Timeline;
  private items_: Map<Track, Array<TimelineViewGhostTrackItemImpl>>;

  @observable private leftExtend_: number;
  @observable private rightExtend_: number;
  @observable private translation_: number;

  get leftExtend() { return this.leftExtend_; }
  get rightExtend() { return this.rightExtend_; }
  get translation() { return this.translation_; }

  constructor(timeline: Timeline) {
    this.timeline_ = timeline;
    this.timeline_.tracks.forEach(track => {
      this.items_.set(track, []);
    })
    this.leftExtend_  = 0;
    this.rightExtend_ = 0;
    this.translation_ = 0;
  }

  addGhostTrackItem(track: Track, startTime: number, endTime: number): void {
    const ghostTrackItem = new TimelineViewGhostTrackItemImpl(startTime, endTime);
    const arr = this.items_.get(track);
    arr.push(ghostTrackItem);
  }

  getGhostTrackItems(track: Track): TimelineViewGhostTrackItem[] {
    return this.items_.get(track);
  }

  extendLeft(value: number): void {
    this.leftExtend_ = value;
  }

  extendRight(value: number): void {
    this.rightExtend_ = value;
  }

  translate(value: number): void {
    this.translation_ = value;
  }

}


export class TimelineViewGhostControllerImpl implements TimelineViewGhostController {

  private timeline_: Timeline;

  constructor(timeline: Timeline) {
    this.timeline_ = timeline;
  }

  createGhostContainer(): TimelineViewGhostContainer {
    return new TimelineViewGhostContainerImpl(this.timeline_);
  }

  removeGhostContainer(container: TimelineViewGhostContainer): void {
    
  }

}