import { observable } from "window/app-mobx";
import { Timeline } from "internal/timeline/timeline";
import { TimelineWidgetGhostTrackItemViewModel, TimelineWidgetGhostContainerViewModel, TimelineWidgetGhostViewModel } from "window/view/timeline/model/ghost-view-model";
import { ViewModelImpl } from "window/view/view-model";

class TimelineWidgetGhostTrackItemViewModelImpl extends ViewModelImpl
    implements TimelineWidgetGhostTrackItemViewModel {

  @observable private startTime_: number;
  @observable private endTime_: number;
  @observable private snapLeft_: boolean;
  @observable private snapRight_: boolean;

  get startTime(): number { return this.startTime_; }
  get endTime(): number { return this.endTime_; }
  get snapLeft(): boolean { return this.snapLeft_; }
  get snapRight(): boolean { return this.snapRight_; }

  constructor(startTime: number, endTime: number) {
    super();
    this.startTime_ = startTime;
    this.endTime_ = endTime;
    this.snapLeft_ = false;
    this.snapRight_ = false;
  }

  dispose(): void {}

}

class TimelineWidgetGhostContainerViewModelImpl extends ViewModelImpl
    implements TimelineWidgetGhostContainerViewModel {

  private timeline_: Timeline;
  private items_: Array<Array<TimelineWidgetGhostTrackItemViewModelImpl>>;

  @observable private trackOffset_: number;
  @observable private leftExtend_: number;
  @observable private rightExtend_: number;
  @observable private translation_: number;

  get trackOffset() { return this.trackOffset_; }
  get leftExtend() { return this.leftExtend_; }
  get rightExtend() { return this.rightExtend_; }
  get translation() { return this.translation_; }

  constructor(timeline: Timeline) {
    super();
    this.timeline_ = timeline;
    this.items_ = [];
    this.trackOffset_ = 0;
    this.leftExtend_  = 0;
    this.rightExtend_ = 0;
    this.translation_ = 0;
  }

  addGhostTrackItem(index: number, startTime: number, endTime: number): void {
    const ghostTrackItem = new TimelineWidgetGhostTrackItemViewModelImpl(startTime, endTime);
    while (this.items_.length <= index) this.items_.push([]);
    const arr = this.items_[index];
    arr.push(ghostTrackItem);
  }

  getGhostTrackItems(index: number): TimelineWidgetGhostTrackItemViewModel[] {
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

  dispose(): void {}

}


export class TimelineWidgetGhostViewModelImpl implements TimelineWidgetGhostViewModel {

  private timeline_: Timeline;
  @observable currentContainer: TimelineWidgetGhostContainerViewModelImpl | null = null;

  constructor(timeline: Timeline) {
    this.timeline_ = timeline;
  }

  createGhostContainer(): TimelineWidgetGhostContainerViewModel {
    return new TimelineWidgetGhostContainerViewModelImpl(this.timeline_);
  }

  setCurrentContainer(container: TimelineWidgetGhostContainerViewModelImpl): void {
    this.currentContainer = container;
    console.log(container)
  }

}