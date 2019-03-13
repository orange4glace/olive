import * as React from 'react'
import hotkeys from 'hotkeys-js';

import { observable, action, computed, observer } from 'window/app-mobx'

import { MouseUtil, Throttle } from 'orangeutil'
import ZoomableScrollView, { ZoomableScrollViewController } from '../../zoomable-scroll-view'
import Timeline from 'standard/timeline';
import ADiv from 'window/view/advanced-div'

import { TimelineViewController, TimelineHost, TrackHost, TrackItemHost } from './../controller'
import { TimelineTracksView } from './timeline-tracks-view'

import * as style from './timeline-view.scss'

export interface TimelineUserViewProps {
  timelineViewController: TimelineViewController;
}
export abstract class TimelineUserView extends React.Component<TimelineUserViewProps, any> {}
interface TimelineUserViewClass {
  new (): TimelineUserView }



interface TimelineViewProps {
  timelineViewController: TimelineViewController;
}

export default class TimelineView extends React.Component<TimelineViewProps, {}> {

  private static userViews_: Array<TimelineUserViewClass> = [];
  static get userViews(): ReadonlyArray<TimelineUserViewClass> {
    return this.userViews_; }

  static registerUserView(component: any) {
    TimelineView.userViews_.push(component);
  }

  constructor(props: any) {
    super(props);
    const zoomScrollViewController = new ZoomableScrollViewController();
    this.props.timelineViewController.attachScrollViewController(zoomScrollViewController);
  }

  render() {
    return (
      <ZoomableScrollView controller={this.props.timelineViewController.scrollViewController}>
        <TimelineViewContent controller={this.props.timelineViewController}></TimelineViewContent>
      </ZoomableScrollView>
    )
  }
}


interface TimelineViewContentProps {
  controller: TimelineViewController;
}

@observer
class TimelineViewContent extends React.Component<TimelineViewContentProps, {}> {

  seekRelativeLeft: any;
  seekRelativeRight: any;
  shiftSeekRelativeLeft: any;
  shiftSeekRelativeRight: any;

  constructor(props: any) {
    super(props);

    this.timelineUpdateHandler = this.timelineUpdateHandler.bind(this);
  }

  timelineUpdateHandler() {
    const controller = this.props.controller;
    
  }

  componentDidMount() {
    this.props.controller.ee.addListener('update', this.timelineUpdateHandler);
  }

  componentWillUnmount() {
    this.props.controller.ee.removeListener('update', this.timelineUpdateHandler);
  }

  render() {
    return (
      <div className={style.component}>
        <RulerView controller={this.props.controller}/>
        <TimelineTracksView timelineViewController={this.props.controller}/>
        <UserViews timelineViewController={this.props.controller}/>
      </div>
    )
  }

}

class UserViews extends React.PureComponent<TimelineUserViewProps, {}> {
  render() {
    let i = 0;
    return (
      <>
        { TimelineView.userViews.map(view => {
          React.createElement(view, {
            key: i++,
            timelineViewController: this.props.timelineViewController
          })
        })}
      </>
    )
  }
}

@observer
class RulerView extends React.Component<TimelineViewContentProps, {}> {

  rulerViewRef: React.RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props);

    this.rulerViewRef = React.createRef();

    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
  }

  mouseDownHandler(e: React.MouseEvent) {
    const pos = MouseUtil.mousePositionElement(e, this.rulerViewRef.current);
    const time = this.props.controller.getTimeRelativeToTimeline(pos.x);
    
    document.addEventListener('mousemove', this.mouseMoveHandler);
    const remover = (e: MouseEvent) => {
      document.removeEventListener('mousemove', this.mouseMoveHandler);
      document.removeEventListener('mouseup', remover);
    }
    document.addEventListener('mouseup', remover);
  }

  mouseMoveHandler(e: MouseEvent) {
    const pos = MouseUtil.mousePositionElement(e, this.rulerViewRef.current);
    const time = this.props.controller.getTimeRelativeToTimeline(pos.x);
    this.props.controller.timelineHost.timeline.setCurrentTime(time);
  }

  render() {
    return (
      <ADiv className='ruler-view' onMouseDown={this.mouseDownHandler} ref={this.rulerViewRef}>
        <Ruler controller={this.props.controller}/>
        <Indicator controller={this.props.controller}/>
      </ADiv>
    )
  }

}

@observer
class Ruler extends React.Component<TimelineViewContentProps, {}> {

  canvasRef: React.RefObject<HTMLCanvasElement>;

  constructor(props: any) {
    super(props);
    this.canvasRef = React.createRef();
    this.timelineUpdateHandler = this.timelineUpdateHandler.bind(this);
  }

  timelineUpdateHandler() {
    const controller = this.props.controller;

    let startCount = Math.floor(controller.startTime / controller.unitMillisecond);
    let endCount = Math.ceil(controller.endTime / controller.unitMillisecond);

    const ctx = this.canvasRef.current.getContext('2d');
    this.canvasRef.current.width = controller.scrollViewController.scrollWidth;
    this.canvasRef.current.height = 30;
    let value = startCount * controller.unitMillisecond;
    let translateX = (controller.startTime - value) * controller.pxPerMillisecond;
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
        ctx.translate(controller.unitWidth / 10, 0);
        ctx.beginPath();
        ctx.moveTo(0, 22.5);
        ctx.lineTo(0, 29);
        ctx.stroke();
      }
      ctx.translate(controller.unitWidth / 10, 0);
      value += controller.unitMillisecond;
    }
    ctx.restore();
  }

  format(milliseconds: number): string {
    function dd(num: number): string {
      let s = num + '';
      if (s.length == 0) return '00';
      else if (s.length == 1) return '0'+s;
      else if (s.length > 2) return s.slice(0, 2);
      return s;
    }
    let milli = milliseconds % 1000;
    milliseconds = Math.floor(milliseconds / 1000);
    let sec = milliseconds % 60;
    milliseconds = Math.floor(milliseconds / 60);
    let min = milliseconds % 60;
    milliseconds = Math.floor(milliseconds / 60);
    let hour = milliseconds;
    return `${dd(hour)}:${dd(min)}:${dd(sec)}:${dd(milli)}`;
  }

  componentDidMount() {
    this.props.controller.ee.addListener('update', this.timelineUpdateHandler);
  }

  componentWillUnmount() {
    this.props.controller.ee.removeListener('update', this.timelineUpdateHandler);
  }

  render() {
    return (
      <div>
        <canvas ref={this.canvasRef}></canvas>
      </div>
    )
  }
}

@observer
class Indicator extends React.Component<TimelineViewContentProps, any> {

  constructor(props: any) {
    super(props);
  }

  @computed get position() {
    const controller = this.props.controller;
    const timelineHost = controller.timelineHost;
    const position = controller.getPositionRelativeToTimeline(timelineHost.timeline.currentTime);
    return position;
  }

  render() {
    return (
      <div className='indicator' style={{left: `${this.position}px`}}>
        <div className='tip'/>
      </div>
    )
  }
}