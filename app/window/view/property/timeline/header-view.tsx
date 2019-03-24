import * as React from 'react'

import { IReactionDisposer } from "mobx";
import { observer, autorun } from "window/app-mobx";
import { PropertyTimelineContentViewProps } from '.';


@observer
export class PropertyTimelineHeaderView extends React.Component<PropertyTimelineContentViewProps, {}> {

  canvasRef: React.RefObject<HTMLCanvasElement>;

  updateDisposer: IReactionDisposer;

  constructor(props: any) {
    super(props);
    this.canvasRef = React.createRef();

    this.timelineUpdateHandler = this.timelineUpdateHandler.bind(this);
    this.updateDisposer = autorun(this.timelineUpdateHandler);
  }

  componentWillUnmount() {
    this.updateDisposer();
  }

  timelineUpdateHandler() {
    if (!this.canvasRef.current) return;
    const controller = this.props.propertyViewController;
    if (isNaN(controller.scrollViewController.scrollWidth)) return;

    let startCount = Math.floor(controller.startTimecode / controller.unitMillisecond);
    let endCount = Math.ceil(controller.endTimecode / controller.unitMillisecond);

    const ctx = this.canvasRef.current.getContext('2d');
    this.canvasRef.current.width = controller.scrollViewController.scrollWidth;
    this.canvasRef.current.height = 30;
    let value = startCount * controller.unitMillisecond;
    let translateX = (controller.startTimecode - value) * controller.pxPerMillisecond;
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

  render() {
    return (
      <div className='header'>
        <canvas ref={this.canvasRef}></canvas>
        <PropertyTimelineHeaderViewIndicator {...this.props}/>
      </div>
    )
  }
}

@observer
class PropertyTimelineHeaderViewIndicator extends React.Component<PropertyTimelineContentViewProps, {}> {

  render() {
    const controller = this.props.propertyViewController;
    const timeline = this.props.timeline;
    const trackItem = this.props.trackItem;
    const currentTime = timeline.currentTime - trackItem.time.start;
    const style = {
      left: controller.getPositionRelativeToTimeline(currentTime)
    }
    return (
      <div className='indicator' style={style}>
        <div className='tip'/>
      </div>
    )
  }

}