import * as style from './timeline-ruler-view.scss'
import * as React from 'react'
import { Disposable } from 'base/common/lifecycle';
import { TimelineScrollView } from 'window/workbench/common/widgets/timeline/model/scroll-view-model';
import { StandardMouseEvent } from 'base/browser/mouseEvent';
import { ITimeline } from 'internal/timeline/base/timeline';
import { InterruptableMouseMoveMonitor } from 'window/view/common/interruptable-mouse-move-monitor';
import { createStandardMouseEvent } from 'base/olive/mouse-event';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

export class TimelineRulerView extends Disposable {

  private canvas_: HTMLCanvasElement;

  @observable private indicatorPosition_: number;
  public get indicatorPosition() { return this.indicatorPosition_; }

  private mouseMoveMonitor_: InterruptableMouseMoveMonitor;

  constructor(
    readonly timeline: ITimeline,
    readonly timelineScrollView: TimelineScrollView
  ) {
    super();

    this._register(timelineScrollView.onUpdate(this.updateCanvas, this));
    this._register(timelineScrollView.onUpdate(this.updateIndicator, this));
    this._register(timeline.onDidChangeCurrentTime(this.updateIndicator, this));
    this.mouseMoveMonitor_ = this._register(new InterruptableMouseMoveMonitor());
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.canvas_ = canvas;
    this.updateCanvas();
  }

  private updateCanvas() {
    if (!this.canvas_) return;

    const scrollViewState = this.timelineScrollView;

    let startCount = Math.floor(scrollViewState.startTime / scrollViewState.unitFrameTime);
    let endCount = Math.ceil(scrollViewState.endTime / scrollViewState.unitFrameTime);

    const ctx = this.canvas_.getContext('2d');
    this.canvas_.width = scrollViewState.width;
    this.canvas_.height = 30;
    let value = startCount * scrollViewState.unitFrameTime;
    let translateX = (scrollViewState.startTime - value) * scrollViewState.pxPerFrame;
    ctx.save();
    ctx.font ='12px "Noto Sans KR"';
    ctx.fillStyle = '#ccc';
    ctx.strokeStyle = '#ccc';
    ctx.translate(-translateX, 0);
    // Font align
    for (let i = 0; i < endCount - startCount; i ++) {
      ctx.save();
      ctx.translate(-33, 0);
      ctx.fillText(this.format(Math.floor(value)), 0, 10);
      ctx.restore();
      ctx.beginPath();
      ctx.moveTo(0, 15);
      ctx.lineTo(0, 29);
      ctx.stroke();
      for (let j = 0; j < 9; j ++) {
        ctx.translate(scrollViewState.unitWidth / 10, 0);
        ctx.beginPath();
        ctx.moveTo(0, 22.5);
        ctx.lineTo(0, 29);
        ctx.stroke();
      }
      ctx.translate(scrollViewState.unitWidth / 10, 0);
      value += scrollViewState.unitFrameTime;
    }
    ctx.restore();
  }

  private updateIndicator() {
    this.indicatorPosition_ = this.timelineScrollView.getPositionRelativeToTimeline(this.timeline.currentTime);
  }

  format(milliseconds: number): string {
    function dd(num: number): string {
      let s = num + '';
      if (s.length == 0) return '00';
      else if (s.length == 1) return '0'+s;
      else if (s.length > 2) return s.slice(0, 2);
      return s;
    }
    let milli = milliseconds % 30;
    milliseconds = Math.floor(milliseconds / 30);
    let sec = milliseconds % 60;
    milliseconds = Math.floor(milliseconds / 60);
    let min = milliseconds % 60;
    milliseconds = Math.floor(milliseconds / 60);
    let hour = milliseconds;
    return `${dd(hour)}:${dd(min)}:${dd(sec)}:${dd(milli)}`;
  }

  mouseDownHandler(e: StandardMouseEvent) {
    const time = this.timelineScrollView.getTimeRelativeToTimeline(
      this.timelineScrollView.getMousePostionRelativeToTimeline(e).x);
    this.timeline.seekTo(time);
    this.mouseMoveMonitor_.startMonitoring(this.mouseMoveHandler.bind(this), ()=>{});
  }

  private mouseMoveHandler(e: StandardMouseEvent) {
    const time = this.timelineScrollView.getTimeRelativeToTimeline(
      this.timelineScrollView.getMousePostionRelativeToTimeline(e).x);
    this.timeline.seekTo(time);
  }

  render() {
    return <TimelineRulerViewComponent view={this}/>
  }

}

@observer
class TimelineRulerViewComponent extends React.Component<{view: TimelineRulerView}> {

  setCanvas = (canvas: HTMLCanvasElement) => {
    this.props.view.setCanvas(canvas);
  }

  mouseDownHandler = (e: React.MouseEvent) => {
    this.props.view.mouseDownHandler(createStandardMouseEvent(e));
  }

  render() {
    const view = this.props.view;
    return (
      <div className={`ruler ${style.component}`} onMouseDown={this.mouseDownHandler}>
        <div className='indicator' style={{left: view.indicatorPosition + 'px'}}/>
        <canvas ref={this.setCanvas}></canvas>
      </div>
    )
  }

}