import * as React from 'react'
import { observable, autorun, action } from "window/app-mobx";
import { IReactionDisposer } from "mobx";
import { ITimeline } from "internal/timeline/base/timeline";
import { MouseUtil } from "orangeutil";
import { StandardMouseEvent } from "base/browser/mouseEvent";
import ZoomableScrollView, { ZoomableScrollViewController } from "window/view/zoomable-scroll-view";
import { Emitter } from 'base/common/event';

// export interface TimelineScrollView {
//   /*observable*/ startTime: number;
//   /*observable*/ endTime: number;
//   /*observable*/ pxPerFrame: number;
//   /*observable*/ width: number;
//   unitFrameTime: number;
//   unitWidth: number;

//   setElement(el: HTMLDivElement): void;
//   update(px: number, start: number, end: number): void;

//   getTimeAmountRelativeToTimeline(px: number): number;
//   getPositionRelativeToTimeline(time: number): number;
//   getPixelAmountRelativeToTimeline(time: number): number;
//   getMousePostionRelativeToTimeline(e: MouseEvent | React.MouseEvent | StandardMouseEvent): {x: number, y: number};
// }

export class TimelineScrollView implements TimelineScrollView {

  readonly zoomableScrollViewCtrl: ZoomableScrollViewController;

  private readonly onUpdate_: Emitter<void> = new Emitter();
  public get onUpdate() { return this.onUpdate_.event; }

  // private element_: HTMLDivElement;
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

  get element(): HTMLDivElement { return this.zoomableScrollViewCtrl.elementRef.current; }
  get startTime() { return this.startTime_; }
  get endTime() { return this.endTime_; }
  get pxPerFrame() { return this.pxPerFrame_; }
  get width() { return this.width_; }
  get unitFrameTime() { return this.unitFrameTime_; }
  get unitWidth() { return this.unitWidth_; }

  constructor(timeline: ITimeline) {
    this.timeline_ = timeline;

    this.zoomableScrollViewCtrl = new ZoomableScrollViewController();
    this.zoomableScrollViewCtrl.ee.on('update', this.scrollViewUpdateHandler.bind(this));

    this.update_ = this.update_.bind(this);
    this.autorunDisposer = autorun(this.update_);
  }

  private scrollViewUpdateHandler() {
    const controller = this.zoomableScrollViewCtrl;
    this.update(controller.scrollWidth, controller.start, controller.end);
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

    this.onUpdate_.fire();
  }

  setElement(el: HTMLDivElement) {
    // this.element_ = el;
  }

  @action
  update(px: number, start: number, end: number): void {
    this.width_ = px;
    this.scrollStart_ = start;
    this.scrollEnd_ = end;
  }




  getTimeRelativeToTimeline(px: number): number {
    return Math.round(this.startTime + px / this.pxPerFrame);
  }

  getTimeAmountRelativeToTimeline(px: number): number {
    return px / this.pxPerFrame;
  }

  getPositionRelativeToTimeline(time: number): number {
    // Touch |endTime| variable so observer can detect the change
    this.endTime;
    return Math.floor((time - this.startTime) * this.pxPerFrame);
  }

  getPixelAmountRelativeToTimeline(time: number): number {
    return time * this.pxPerFrame;
  }

  getMousePostionRelativeToTimeline(e: MouseEvent | React.MouseEvent | StandardMouseEvent): {x: number, y: number} {
    if ((e as any).posx) return this.getMousePostionRelativeToTimeline_(e as any);
    return MouseUtil.mousePositionElement(e, this.element);
  }

  private getMousePostionRelativeToTimeline_(e: {
    posx: number,
    posy: number
  }){
    function findPos(obj: any) {
      var curleft = 0; var curtop = 0;
      if (obj.offsetParent) {
        do {
          curleft += obj.offsetLeft;
          curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
      }
      return {
        left : curleft,
        top : curtop
      };
    }

		let elPos = findPos(this.element);
		return {
			x: e.posx - elPos.left,
			y: e.posy - elPos.top
		};
  }

  render(children: React.ReactNode) {
    return <ScrollViewComponent view={this} children={children}/>
  }

  dispose() {
    this.autorunDisposer();
  }
}

class ScrollViewComponent extends React.Component<{view: TimelineScrollView}> {

  render() {
    const view = this.props.view;
    return (
      <ZoomableScrollView controller={view.zoomableScrollViewCtrl}>
        {this.props.children}
      </ZoomableScrollView>
    )
  }

}