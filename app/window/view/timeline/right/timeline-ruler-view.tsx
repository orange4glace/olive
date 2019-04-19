import * as React from 'react'
import { observer, autorun, computed } from 'window/app-mobx';
import { MouseUtil } from 'orangeutil';
import ADiv from 'window/view/advanced-div';
import { IReactionDisposer } from 'mobx';
import { TimelineContentViewProps } from 'window/view/timeline/right/timeline-view';

@observer
export class TimelineRulerView extends React.Component<TimelineContentViewProps, {}> {

  rulerViewRef: React.RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props);

    this.rulerViewRef = React.createRef();

    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
  }

  mouseDownHandler(e: React.MouseEvent) {
    const pos = MouseUtil.mousePositionElement(e, this.rulerViewRef.current);
    const time = this.props.widget.model.getTimeRelativeToTimeline(pos.x);
    
    document.addEventListener('mousemove', this.mouseMoveHandler);
    const remover = (e: MouseEvent) => {
      document.removeEventListener('mousemove', this.mouseMoveHandler);
      document.removeEventListener('mouseup', remover);
    }
    document.addEventListener('mouseup', remover);
  }

  mouseMoveHandler(e: MouseEvent) {
    const pos = MouseUtil.mousePositionElement(e, this.rulerViewRef.current);
    const time = this.props.widget.model.getTimeRelativeToTimeline(pos.x);
    this.props.widget.model.setCurrentTime(time);
  }

  render() {
    return (
      <ADiv className='ruler-view' onMouseDown={this.mouseDownHandler} ref={this.rulerViewRef}>
        <Ruler {...this.props}/>
        <Indicator {...this.props}/>
      </ADiv>
    )
  }

}





@observer
class Ruler extends React.Component<TimelineContentViewProps, {}> {

  canvasRef: React.RefObject<HTMLCanvasElement>;

  rulerUpdateDipsoser: IReactionDisposer;

  constructor(props: any) {
    super(props);
    this.canvasRef = React.createRef();
  }

  timelineUpdateHandler() {
    const scrollViewState = this.props.widget.model.scrollViewModel;

    let startCount = Math.floor(scrollViewState.startTime / scrollViewState.unitFrameTime);
    let endCount = Math.ceil(scrollViewState.endTime / scrollViewState.unitFrameTime);

    const ctx = this.canvasRef.current.getContext('2d');
    this.canvasRef.current.width = scrollViewState.width;
    this.canvasRef.current.height = 30;
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

  componentDidMount() {
    this.timelineUpdateHandler = this.timelineUpdateHandler.bind(this);
    this.rulerUpdateDipsoser = autorun(this.timelineUpdateHandler);
  }

  componentWillUnmount() {
    this.rulerUpdateDipsoser();
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
class Indicator extends React.Component<TimelineContentViewProps, any> {

  constructor(props: any) {
    super(props);
  }

  @computed get position() {
    const model = this.props.widget.model;
    const position = model.getPositionRelativeToTimeline(model.currentTime);
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