import { TimelineWidgetGhostTrackItem, TimelineWidgetGhostContainer, TimelineWidgetGhostModel } from "window/view/timeline/model/ghost";
import { observable } from "window/app-mobx";
import { Timeline } from "internal/timeline/timeline";

class TimelineWidgetGhostTrackItemImpl implements TimelineWidgetGhostTrackItem {

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

class TimelineWidgetGhostContainerImpl implements TimelineWidgetGhostContainer {

  private timeline_: Timeline;
  private items_: Array<Array<TimelineWidgetGhostTrackItemImpl>>;

  @observable private trackOffset_: number;
  @observable private leftExtend_: number;
  @observable private rightExtend_: number;
  @observable private translation_: number;

  get trackOffset() { return this.trackOffset_; }
  get leftExtend() { return this.leftExtend_; }
  get rightExtend() { return this.rightExtend_; }
  get translation() { return this.translation_; }

  constructor(timeline: Timeline) {
    this.timeline_ = timeline;
    this.items_ = [];
    this.trackOffset_ = 0;
    this.leftExtend_  = 0;
    this.rightExtend_ = 0;
    this.translation_ = 0;
  }

  addGhostTrackItem(index: number, startTime: number, endTime: number): void {
    const ghostTrackItem = new TimelineWidgetGhostTrackItemImpl(startTime, endTime);
    while (this.items_.length <= index) this.items_.push([]);
    const arr = this.items_[index];
    arr.push(ghostTrackItem);
  }

  getGhostTrackItems(index: number): TimelineWidgetGhostTrackItem[] {
    console.log('get ', index, ' => ', index + this.trackOffset_);
    return this.items_[index - this.trackOffset_] ? this.items_[index - this.trackOffset_] : [];
  }

  setTrackOffset(offset: number): void {
    this.trackOffset_ = offset;
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


export class TimelineWidgetGhostModelImpl implements TimelineWidgetGhostModel {

  private timeline_: Timeline;
  @observable currentContainer: TimelineWidgetGhostContainerImpl | null = null;

  constructor(timeline: Timeline) {
    this.timeline_ = timeline;
  }

  createGhostContainer(): TimelineWidgetGhostContainer {
    return new TimelineWidgetGhostContainerImpl(this.timeline_);
  }

  setCurrentContainer(container: TimelineWidgetGhostContainerImpl): void {
    this.currentContainer = container;
    console.log(container)
  }

}