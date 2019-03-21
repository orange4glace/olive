import * as React from 'react'

import ZoomableScrollView, { ZoomableScrollViewController } from "window/view/zoomable-scroll-view";
import { Property, Keyframe, Rectangle } from 'internal/drawing';
import Timeline from 'internal/timeline/timeline';
import TrackItem from 'internal/timeline/track-item';
import { observable, autorun, observer, computed } from 'window/app-mobx';
import { IReactionDisposer } from 'mobx';
import Drawing from 'internal/drawing/drawing';
import { DrawingType } from 'internal/drawing/drawing-type';
import { PropertyViewController } from '../control/property-view-controller';
import { TrackItemHost } from '../control/track-item-host';
import { PropertyTimelineHeaderView } from './header-view';

import { KeyframeHost } from '../control/keyframe-host';
import { DrawingHost } from '../control/drawing-host';
import { PropertyHost } from '../control/property-host';

import * as style from './index.scss'

export interface PropertyTimelineViewProps {
  timeline: Timeline,
  trackItem: TrackItem
}

@observer
export class PropertyTimelineView extends React.Component<PropertyTimelineViewProps, {}> {

  scrollViewController: ZoomableScrollViewController;

  propertyViewController: PropertyViewController;
  updateViewDisposer: IReactionDisposer;

  trackItemHost: TrackItemHost;

  constructor(props: any) {
    super(props);
    this.scrollViewController = new ZoomableScrollViewController();
    this.propertyViewController = new PropertyViewController(this.props.timeline, this.props.trackItem);
    this.propertyViewController.scrollViewController = this.scrollViewController;

    this.trackItemHost = new TrackItemHost(this.props.trackItem);

    this.updateView = this.updateView.bind(this);
    this.updateViewDisposer = autorun(this.updateView)
  }

  componentWillUnmount() {
    this.updateViewDisposer();
  }

  updateView() {
    const controller = this.scrollViewController;
    const trackItem = this.props.trackItem;
    let totalTime = trackItem.endTime - trackItem.startTime;
    let startTime = Math.floor(totalTime * controller.start);
    let endTime = Math.floor(totalTime * controller.end);
    this.propertyViewController.baseTimecode = trackItem.startTime;
    this.propertyViewController.startTimecode = startTime;
    this.propertyViewController.endTimecode = endTime;
    let unitMillisecond = 1000;
    let unitWidth = controller.scrollWidth / ((endTime - startTime) / unitMillisecond);
    let multiplier = [2, 5];
    let multiplierI = 0;
    if (unitWidth > 150) {
      while (true) {
        let cand = unitWidth / multiplier[multiplierI];
        if (cand < 150) break;
        unitWidth = cand;
        unitMillisecond /= multiplier[multiplierI];
        multiplierI = (++multiplierI % 2);
      }
    }
    else {
      while (unitWidth < 150) {
        unitWidth = unitWidth * multiplier[multiplierI];
        unitMillisecond *= multiplier[multiplierI];
        multiplierI = (++multiplierI % 2);
      }
    }
    this.propertyViewController.pxPerMillisecond = unitWidth / unitMillisecond;
    this.propertyViewController.unitMillisecond = unitMillisecond;
    this.propertyViewController.unitWidth = unitWidth;
  }

  render() {

    return (
      <ZoomableScrollView controller={this.scrollViewController}>
        <PropertyTimelineContentView 
            timeline={this.props.timeline}
            trackItem={this.props.trackItem}
            propertyViewController={this.propertyViewController}/>
      </ZoomableScrollView>
    )
  }

}

export interface PropertyTimelineContentViewProps extends PropertyTimelineViewProps {
  propertyViewController: PropertyViewController
}

class PropertyTimelineContentView extends React.Component<PropertyTimelineContentViewProps, {}> {
  render() {
    return (
      <div className={style.component}>
        <PropertyTimelineHeaderView {...this.props} propertyViewController={this.props.propertyViewController}/>
        <PropertyTimelineBodyView {...this.props} propertyViewController={this.props.propertyViewController}/>
      </div>
    )
  }
}

@observer
class PropertyTimelineBodyView extends React.Component<PropertyTimelineContentViewProps, {}> {

  canvasRef: React.RefObject<HTMLCanvasElement>;
  updateDisposer: IReactionDisposer;

  constructor(props: PropertyTimelineContentViewProps) {
    super(props);
    this.canvasRef = React.createRef();

    this.timelineUpdateHandler = this.timelineUpdateHandler.bind(this);
  }

  componentDidMount() {
    this.updateDisposer = autorun(this.timelineUpdateHandler);
  }

  componentWillUnmount() {
    this.updateDisposer();
  }

  timelineUpdateHandler() {
    const controller = this.props.propertyViewController;
    console.log('atr', this.canvasRef.current, controller.scrollViewController.scrollWidth);
    if (isNaN(controller.scrollViewController.scrollWidth)) return;

    let startCount = Math.floor(controller.startTimecode / controller.unitMillisecond);
    let endCount = Math.ceil(controller.endTimecode / controller.unitMillisecond);

    const ctx = this.canvasRef.current.getContext('2d');
    this.canvasRef.current.width = controller.scrollViewController.scrollWidth;
    this.canvasRef.current.height = 30;
    let value = startCount * controller.unitMillisecond;
    let translateX = (controller.startTimecode - value) * controller.pxPerMillisecond;
    ctx.save();
    ctx.strokeStyle = '#323835';
    ctx.translate(-translateX, 0);
    // Font align
    for (let i = 0; i < endCount - startCount; i ++) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, 2000);
      ctx.stroke();
      for (let j = 0; j < 9; j ++) {
        ctx.translate(controller.unitWidth / 10, 0);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 2000);
        ctx.stroke();
      }
      ctx.translate(controller.unitWidth / 10, 0);
      value += controller.unitMillisecond;
    }
    ctx.restore();
  }


  render() {
    return (
      <div className='property-timeline-body'>
        <div className='grid'>
          <canvas ref={this.canvasRef}></canvas>
        </div>
        <div className='keyframe-content'>
          <DrawingKeyframeContentView {...this.props}
              drawing={this.props.trackItem.drawing} propertyViewController={this.props.propertyViewController}/>
        </div>
      </div>
    )
  }

}




interface PropertyTimelineDrawingViewProps extends PropertyTimelineViewProps {
  drawing: Drawing,
  propertyViewController: PropertyViewController
}

interface PropertyTimelinePropertyViewProps extends PropertyTimelineDrawingViewProps {
  drawingHost: DrawingHost;
  property: Property<any>
}

@observer
class PropertyTimelineKeyframeView extends React.Component<PropertyTimelinePropertyViewProps, {}> {

  propertyHost: PropertyHost;

  constructor(props: PropertyTimelinePropertyViewProps) {
    super(props);
    this.propertyHost = new PropertyHost(this.props.property);
    this.props.drawingHost.addPropertyHost(this.propertyHost);
  }

  componentWillUnmount() {
    this.props.drawingHost.removePropertyHost(this.propertyHost);
  }

  render() {
    const property = this.props.property;
    const keyframes: JSX.Element[] = [];

    property.keyframes.forEach(keyframe => {
      keyframes.push(<KeyframeView {...this.props} propertyHost={this.propertyHost} keyframe={keyframe}/>)
    })
    return (
      <div className='keyframes'>
        {keyframes}
      </div>
    )
  }
}

interface PropertyTimelineKeyframeViewProps extends PropertyTimelinePropertyViewProps {
  drawingHost: DrawingHost;
  propertyHost: PropertyHost;
  keyframe: Keyframe<any>
}

@observer
class KeyframeView extends React.Component<PropertyTimelineKeyframeViewProps, {}> {

  keyframeHost: KeyframeHost;

  constructor(props: PropertyTimelineKeyframeViewProps) {
    super(props);
    this.keyframeHost = new KeyframeHost(this.props.keyframe);
    this.props.propertyHost.addKeyframeHost(this.keyframeHost);
  }

  componentWillUnmount() {
    this.props.propertyHost.removeKeyframeHost(this.keyframeHost);
  }

  render() {
    const controller = this.props.propertyViewController;
    const timeline = this.props.timeline;
    const trackItem = this.props.trackItem;
    const keyframe = this.props.keyframe;
    const time = trackItem.baseTime + keyframe.timecode;
    const style = {
      left: controller.getPositionRelativeToTimeline(time)
    }
    return (
      <div className='keyframe' style={style}></div>
    )
  }

}

class DrawingKeyframeContentView extends React.Component<PropertyTimelineDrawingViewProps, any> {

  drawingHost: DrawingHost;

  constructor(props: PropertyTimelineDrawingViewProps) {
    super(props);
    this.drawingHost = new DrawingHost(this.props.drawing);
    this.props.propertyViewController.trackItemHost.addDrawingHost(this.drawingHost);
  }

  componentWillUnmount() {
    this.props.propertyViewController.trackItemHost.removeDrawingHost(this.drawingHost);
  }

  render() {
    return createDrawingPropertyKeyframeView(this.props.trackItem.drawing.type, {
      ...this.props,
      drawing: this.props.trackItem.drawing,
      drawingHost: this.drawingHost,
      propertyViewController: this.props.propertyViewController
    })
  }

}

interface DrawingKeyframeContentViewProps extends PropertyTimelineDrawingViewProps {
  drawingHost: DrawingHost
}

@observer
class RectangleDrawingKeyframeContentView extends React.Component<DrawingKeyframeContentViewProps, any> {

  render() {
    const rectangle = this.props.drawing as Rectangle;
    return (
      <>
        <PropertyTimelineKeyframeView {...this.props} property={rectangle.position}/>
        <PropertyTimelineKeyframeView {...this.props} property={rectangle.scale}/>
      </>
    )
  }
}

const DrawingPropertyKeyframeViewMap: any = {
  [DrawingType.RECTANGLE]: RectangleDrawingKeyframeContentView
}

function createDrawingPropertyKeyframeView(type: DrawingType, props: DrawingKeyframeContentViewProps) {
  return React.createElement(
    DrawingPropertyKeyframeViewMap[type], {
      ...props,
      type
    }
  );
}