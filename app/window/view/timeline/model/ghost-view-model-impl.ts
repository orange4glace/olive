import { observable, computed } from "window/app-mobx";
import { Timeline } from "internal/timeline/timeline";
import { TimelineWidgetGhostTrackItemViewModel, TimelineWidgetGhostContainerViewModel, TimelineWidgetGhostViewModel } from "window/view/timeline/model/ghost-view-model";
import { ViewModelImpl } from "window/view/view-model";
import { TimelineWidgetTimelineViewModel } from "window/view/timeline/model/timeline-view-model";

class TimelineWidgetGhostTrackItemViewModelImpl extends ViewModelImpl
    implements TimelineWidgetGhostTrackItemViewModel {

  @observable private startTime_: number;
  @observable private endTime_: number;

  get startTime(): number { return this.startTime_; }
  get endTime(): number { return this.endTime_; }

  constructor(startTime: number, endTime: number) {
    super();
    this.startTime_ = startTime;
    this.endTime_ = endTime;
  }

  dispose(): void {}

}

class TimelineWidgetGhostContainerViewModelImpl extends ViewModelImpl
    implements TimelineWidgetGhostContainerViewModel {

  private items_: Array<Array<TimelineWidgetGhostTrackItemViewModelImpl>>;

  @observable private trackOffset_: number;
  maxTrackOffset: number;
  minTrackOffset: number;

  @observable private leftExtend_: number;
  @observable private rightExtend_: number;

  @observable private leftMagnetExtent_: number;
  @observable private rightMagnetExtent_: number;

  @observable magnetTime: number;
  @computed get magnetTimePx(): number {
    return this.timelineViewModel_.getPositionRelativeToTimeline(this.magnetTime);}
  @observable private trackMagnetFlag_: boolean[];
  @observable private indicatorMagnetFlag_: boolean;

  get trackOffset() { return this.trackOffset_; }
  get leftExtend() { return this.leftExtend_ + this.leftMagnetExtent_; }
  get rightExtend() { return this.rightExtend_ + this.rightMagnetExtent_; }

  get trackMagnetFlag() { return this.trackMagnetFlag_; }
  get indicatorMagnetFlag() { return this.indicatorMagnetFlag_; }

  constructor(private readonly timelineViewModel_: TimelineWidgetTimelineViewModel) {
    super();
    this.items_ = [];
    this.trackOffset_ = 0;
    this.minTrackOffset = 0;
    this.maxTrackOffset = Infinity;
    this.leftExtend_  = 0;
    this.rightExtend_ = 0;
    this.leftMagnetExtent_ = 0;
    this.rightMagnetExtent_ = 0;

    this.trackMagnetFlag_ = [];
    timelineViewModel_.trackViewModels.forEach(tvm => this.trackMagnetFlag_.push(false));
  }

  addGhostTrackItem(index: number, startTime: number, endTime: number): void {
    const ghostTrackItem = new TimelineWidgetGhostTrackItemViewModelImpl(startTime, endTime);
    while (this.items_.length <= index) this.items_.push([]);
    const arr = this.items_[index];
    arr.push(ghostTrackItem);
  }

  getGhostTrackItems(index: number): TimelineWidgetGhostTrackItemViewModel[] {
    return this.items_[index - this.trackOffset_] ? this.items_[index - this.trackOffset_] : [];
  }

  setTrackOffset(offset: number): void {
    this.trackOffset_ = 
        Math.max(this.minTrackOffset, Math.min(this.maxTrackOffset, offset));
  }

  setMaxTrackOffset(offset: number): void {
    this.maxTrackOffset = offset;
  }

  setMinTrackOffset(offset: number): void {
    this.minTrackOffset = offset;
  }

  extendLeft(value: number): void {
    this.leftExtend_ = value;
    let magnet = this.calculateMagnet(value, 0);
    if (magnet) {
      this.magnetTime = magnet[0];
      let magnetDT = magnet[1];
      this.leftMagnetExtent_ = magnetDT;
    }
    else {
      this.leftMagnetExtent_ = 0;
    }
  }

  extendRight(value: number): void {
    this.rightExtend_ = value;
    let magnet = this.calculateMagnet(0, value);
    if (magnet) {
      this.magnetTime = magnet[0];
      let magnetDT = magnet[1];
      this.rightMagnetExtent_ = magnetDT;
    }
    else {
      this.rightMagnetExtent_ = 0;
    }
  }

  translate(value: number): void {
    this.leftExtend_ = value;
    this.rightExtend_ = value;
    let magnet = this.calculateMagnet(value, value);
    if (magnet) {
      this.magnetTime = magnet[0];
      let magnetDT = magnet[1];
      this.leftMagnetExtent_ = magnetDT;
      this.rightMagnetExtent_ = magnetDT;
    }
    else {
      this.leftMagnetExtent_ = 0;
      this.rightMagnetExtent_ = 0;
    }
  }

  private calculateMagnet(startExtent: number, endExtent: number): [number, number] | null {
    let adt = Infinity;
    let dt = Infinity;
    let ret = Infinity;
    let pxThreshold = this.timelineViewModel_.getTimeAmountRelativeToTimeline(5);
    this.items_.forEach(items => {
      items.forEach(item => {
        let t, ldt: number;
        if (startExtent != 0) {
          t = this.timelineViewModel_.getClosestTime(item.startTime + startExtent);
          ldt = Math.abs(t - (item.startTime + startExtent));
          if (adt > ldt) {
            adt = ldt;
            dt = t - (item.startTime + startExtent);
            ret = t;
          }
        }
        if (endExtent != 0) {
          t = this.timelineViewModel_.getClosestTime(item.endTime + endExtent);
          ldt = Math.abs(t - (item.endTime + endExtent));
          if (adt > ldt) {
            adt = ldt;
            dt = t - (item.endTime + endExtent);
            ret = t;
          }
        }
      })
    })
    if (pxThreshold >= adt) {
      for (let i = 0; i < this.timelineViewModel_.trackViewModels.length; i ++) {
        const tvm = this.timelineViewModel_.trackViewModels[i];
        let clo = tvm.getClosestTime(ret);
        this.trackMagnetFlag_[i] = (clo == ret);
      }
      return [ret, dt];
    }
    else {
      for (let i = 0; i < this.timelineViewModel_.trackViewModels.length; i ++)
        this.trackMagnetFlag_[i] = false;
      return null;
    }
  }

  dispose(): void {}

}


export class TimelineWidgetGhostViewModelImpl implements TimelineWidgetGhostViewModel {

  @observable currentContainer: TimelineWidgetGhostContainerViewModelImpl | null = null;

  constructor(private readonly timelineViewModel_: TimelineWidgetTimelineViewModel) {
  }

  createGhostContainer(): TimelineWidgetGhostContainerViewModel {
    return new TimelineWidgetGhostContainerViewModelImpl(this.timelineViewModel_);
  }

  setCurrentContainer(container: TimelineWidgetGhostContainerViewModelImpl): void {
    this.currentContainer = container;
    console.log(container)
  }

}