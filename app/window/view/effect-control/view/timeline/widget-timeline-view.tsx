import * as React from 'react'
import { EffectControlWidgetViewProps } from 'window/view/effect-control/view/widget-view';
import { EffectControlWidgetModel } from 'window/view/effect-control/model/model';
import { EffectControlWidgetTrackItemTimelineViewFactory } from 'window/view/effect-control/view/timeline/track-item/track-item-view-factory';
import { observer, autorun, computed } from 'window/app-mobx';
import ZoomableScrollView, { ZoomableScrollViewController } from 'window/view/zoomable-scroll-view';
import { IReactionDisposer } from 'mobx';
import { EffectControlViewOutgoingEvents } from 'window/view/effect-control/view-outgoing-events';
import { EffectControlWidgetVideoTrackItemViewModel } from 'window/view/effect-control/model/track-item/video-track-item-model';
import { EffectControlDrawingTimelineViewSelector } from 'window/view/effect-control/view/timeline/drawing/drawing-view';
import { EffectControlWidgetRectangleDrawingViewModel } from 'window/view/effect-control/model/drawing/rectangle-drawing-view-model';
import { EffectControlWidgetRectangleDrawingTimelineView } from 'window/view/effect-control/view/timeline/drawing/rectangle-drawing-view';
import { EffectControlWidgetVideoTrackItemTimelineView } from 'window/view/effect-control/view/timeline/track-item/video-track-item-view';
import { EffectControlWidgetVideoMediaDrawingViewModel } from 'window/view/effect-control/model/drawing/video-media-drawing.view';
import { EffectControlWidgetVideoMediaDrawingTimelineView } from 'window/view/effect-control/view/timeline/drawing/video-media-drawing-view';

EffectControlWidgetTrackItemTimelineViewFactory.register(
    EffectControlWidgetVideoTrackItemViewModel.viewModelName, EffectControlWidgetVideoTrackItemTimelineView);
EffectControlDrawingTimelineViewSelector.registerView(
    EffectControlWidgetRectangleDrawingViewModel, EffectControlWidgetRectangleDrawingTimelineView);
EffectControlDrawingTimelineViewSelector.registerView(
    EffectControlWidgetVideoMediaDrawingViewModel, EffectControlWidgetVideoMediaDrawingTimelineView);

import * as style from './style.scss';
import { MouseUtil } from 'orangeutil';

export interface EffectControlWidgetTimelineContentViewProps extends EffectControlWidgetViewProps {
  model: EffectControlWidgetModel;
  outgoingEvents: EffectControlViewOutgoingEvents;
}

@observer
export class EffectControlWidgetTimelineView extends React.Component<EffectControlWidgetTimelineContentViewProps, {}> {

  scrollViewController: ZoomableScrollViewController;

  constructor(props: any) {
    super(props);
    
    this.scrollViewUpdateHandler = this.scrollViewUpdateHandler.bind(this);
    this.scrollViewController = new ZoomableScrollViewController();
    this.scrollViewController.ee.on('update', this.scrollViewUpdateHandler);
  }

  scrollViewUpdateHandler() {
    const controller = this.scrollViewController;
    this.props.widget.model.timelineScrollViewModel.update(controller.scrollWidth, controller.start, controller.end);
  }

  render() {
    return (
      <ZoomableScrollView controller={this.scrollViewController}>
        <div className={style.component}>
          <Ruler {...this.props}/>
          <EffectControlWidgetTrackItemTimelineViewFactory {...this.props}
              trackItemViewModel={this.props.widget.model.trackItemViewModel}/>
        </div>
      </ZoomableScrollView>
    )
  }

}


@observer
class Ruler extends React.Component<EffectControlWidgetTimelineContentViewProps, {}> {

  rulerViewRef: React.RefObject<HTMLDivElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;

  rulerUpdateDipsoser: IReactionDisposer;

  constructor(props: any) {
    super(props);
    this.rulerViewRef = React.createRef();
    this.canvasRef = React.createRef();
    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
  }

  mouseDownHandler(e: React.MouseEvent) {
    const pos = MouseUtil.mousePositionElement(e, this.rulerViewRef.current);
    const time = this.props.widget.model.getTimeRelativeToTimeline(pos.x);
    this.props.widget.model.timeline.seekTo(time);
    
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
    this.props.widget.model.timeline.seekTo(time);
  }

  timelineUpdateHandler() {
    const scrollViewState = this.props.widget.model.timelineScrollViewModel;

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
      <div className='ruler-view' ref={this.rulerViewRef}
          onMouseDown={this.mouseDownHandler}>
        <canvas ref={this.canvasRef}></canvas>
        <Indicator {...this.props}/>
      </div>
    )
  }
}

@observer
class Indicator extends React.Component<EffectControlWidgetTimelineContentViewProps, any> {

  constructor(props: any) {
    super(props);
  }

  @computed get position() {
    const model = this.props.widget.model;
    const position = model.getPositionRelativeToTimeline(model.timeline.currentTime);
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