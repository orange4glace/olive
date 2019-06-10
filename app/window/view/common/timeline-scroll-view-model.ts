import { ViewModelImpl } from "window/view/view-model";
import { observable, autorun, action } from "window/app-mobx";
import { IReactionDisposer } from "mobx";
import { StandardMouseEvent } from "base/browser/mouseEvent";
import { MouseUtil } from "orangeutil";
import { mousePositionElement } from "base/olive/mouse-event";

export abstract class TimelineScrollViewModel extends ViewModelImpl {
  abstract get element(): HTMLDivElement;
  abstract get /*observable*/ startTime(): number;
  abstract get /*observable*/ endTime(): number;
  abstract get /*observable*/ totalStartTime(): number;
  abstract get /*observable*/ totalEndTime(): number;
  abstract get /*observable*/ pxPerFrame(): number;
  abstract get /*observable*/ width(): number;
  abstract get unitFrameTime(): number;
  abstract get unitWidth(): number;

  abstract setElement(el: HTMLDivElement): void;
  abstract update(px: number, start: number, end: number): void;
  abstract setTotalTime(totalStartTime: number, totalEndTime: number): void;

  /*@observable*/ abstract getTimeRelativeToTimeline(px: number): number;
  /*@observable*/ abstract getTimeAmountRelativeToTimeline(px: number): number;
  /*@observable*/ abstract getPositionRelativeToTimeline(time: number): number;
  /*@observable*/ abstract getPixelAmountRelativeToTimeline(time: number): number;
  /*@observable*/ abstract getMousePostionRelativeToTimeline(e: MouseEvent | React.MouseEvent | StandardMouseEvent): {x: number, y: number};
}

export class TimelineScrollViewModelImpl extends TimelineScrollViewModel {
  private element_: HTMLDivElement;
  @observable private startTime_: number;
  @observable private endTime_: number;
  @observable private totalStartTime_: number;
  @observable private totalEndTime_: number;
  @observable private pxPerFrame_: number;
  @observable private width_: number;
  private unitFrameTime_: number;
  private unitWidth_: number;

  @observable private scrollStart_: number;
  @observable private scrollEnd_: number;

  private autorunDisposer: IReactionDisposer;

  get element(): HTMLDivElement { return this.element_; }
  get startTime() { return this.startTime_; }
  get endTime() { return this.endTime_; }
  get totalStartTime() { return this.totalStartTime_; }
  get totalEndTime() { return this.totalEndTime_; }
  get pxPerFrame() { return this.pxPerFrame_; }
  get width() { return this.width_; }
  get unitFrameTime() { return this.unitFrameTime_; }
  get unitWidth() { return this.unitWidth_; }

  constructor(totalStartTime: number, totalEndTime: number) {
    super();

    this.setTotalTime(totalStartTime, totalEndTime);
    this.update_ = this.update_.bind(this);
    this.autorunDisposer = autorun(this.update_);
  }

  private update_() {
    let startTime: number, endTime: number,
        pxPerFrame: number, unitFrameTime: number, unitWidth: number;

    const totalDuration = this.totalEndTime_ - this.totalStartTime_;
    startTime = Math.floor(totalDuration * this.scrollStart_) + this.totalStartTime_;
    endTime = Math.ceil(totalDuration * this.scrollEnd_) + this.totalStartTime_;
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

  @action
  setTotalTime(totalStartTime: number, totalEndTime: number) {
    this.totalStartTime_ = totalStartTime;
    this.totalEndTime_ = totalEndTime;
  }

  getTimeRelativeToTimeline(px: number): number {
    return Math.round(this.startTime + this.totalStartTime + px / this.pxPerFrame);
  }

  getTimeAmountRelativeToTimeline(px: number): number {
    return px / this.pxPerFrame;
  }

  getPositionRelativeToTimeline(time: number): number {
    // Touch |endTime| variable so observer can detect the change
    this.endTime;
    return Math.floor((time - this.startTime + this.totalStartTime) * this.pxPerFrame);
  }

  getPixelAmountRelativeToTimeline(time: number): number {
    return time * this.pxPerFrame;
  }

  getMousePostionRelativeToTimeline(e: MouseEvent): {x: number, y: number}
  getMousePostionRelativeToTimeline(e: React.MouseEvent): {x: number, y: number}
  getMousePostionRelativeToTimeline(e: StandardMouseEvent): {x: number, y: number}
  getMousePostionRelativeToTimeline(e: any): {x: number, y: number} {
    return mousePositionElement(e, this.element);
  }

  dispose() {
    this.autorunDisposer();
  }
}