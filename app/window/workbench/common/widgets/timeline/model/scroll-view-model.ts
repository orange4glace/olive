import { ViewModelImpl } from "window/view/view-model";
import { observable, autorun, action } from "window/app-mobx";
import { IReactionDisposer } from "mobx";
import { ITimeline } from "internal/timeline/base/timeline";

export abstract class TimelineWidgetScrollViewModel extends ViewModelImpl {
  abstract get element(): HTMLDivElement;
  abstract get /*observable*/ startTime(): number;
  abstract get /*observable*/ endTime(): number;
  abstract get /*observable*/ pxPerFrame(): number;
  abstract get /*observable*/ width(): number;
  abstract get unitFrameTime(): number;
  abstract get unitWidth(): number;

  abstract setElement(el: HTMLDivElement): void;
  abstract update(px: number, start: number, end: number): void;
}

export class TimelineWidgetScrollViewModelImpl extends TimelineWidgetScrollViewModel {
  private element_: HTMLDivElement;
  @observable private startTime_: number;
  @observable private endTime_: number;
  @observable private pxPerFrame_: number;
  @observable private width_: number;
  private unitFrameTime_: number;
  private unitWidth_: number;

  @observable private scrollStart_: number;
  @observable private scrollEnd_: number;

  private timeline_: ITimeline;
  private autorunDisposer: IReactionDisposer;

  get element(): HTMLDivElement { return this.element_; }
  get startTime() { return this.startTime_; }
  get endTime() { return this.endTime_; }
  get pxPerFrame() { return this.pxPerFrame_; }
  get width() { return this.width_; }
  get unitFrameTime() { return this.unitFrameTime_; }
  get unitWidth() { return this.unitWidth_; }

  constructor(timeline: ITimeline) {
    super();
    this.timeline_ = timeline;

    this.update_ = this.update_.bind(this);
    this.autorunDisposer = autorun(this.update_);
  }

  private update_() {
    let startTime: number, endTime: number,
        pxPerFrame: number, unitFrameTime: number, unitWidth: number;

    const timeline = this.timeline_;
    startTime = Math.floor(timeline.totalTime * this.scrollStart_);
    endTime = Math.ceil(timeline.totalTime * this.scrollEnd_);
    unitFrameTime = 30;
    unitWidth = this.width_ / ((endTime - startTime) / unitFrameTime);
    if (unitWidth <= 0) return;
    let multiplier = [5,2,3,2];
    let multiplierI = 0;
    if (unitWidth > 150) {
      while (true) {
        let cand = unitWidth / multiplier[multiplierI];
        if (cand < 150) break;
        unitWidth = cand;
        unitFrameTime /= multiplier[multiplierI];
        multiplierI = (++multiplierI % multiplier.length);
      }
    }
    else {
      while (unitWidth < 150) {
        unitWidth = unitWidth * multiplier[multiplierI];
        unitFrameTime *= multiplier[multiplierI];
        multiplierI = (++multiplierI % multiplier.length);
      }
    }
    pxPerFrame = unitWidth / unitFrameTime;
    unitFrameTime = unitFrameTime;
    unitWidth = unitWidth;

    this.startTime_ = startTime;
    this.endTime_ = endTime;
    this.pxPerFrame_ = pxPerFrame;
    this.unitFrameTime_ = unitFrameTime;
    this.unitWidth_ = unitWidth;
  }

  setElement(el: HTMLDivElement) {
    this.element_ = el;
  }

  @action
  update(px: number, start: number, end: number): void {
    this.width_ = px;
    this.scrollStart_ = start;
    this.scrollEnd_ = end;
  }

  dispose() {
    this.autorunDisposer();
  }
}