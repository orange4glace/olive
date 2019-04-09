import * as React from 'react'

import ZoomableScrollView, { ZoomableScrollViewController } from "window/view/zoomable-scroll-view";
import { Property, Keyframe, Rectangle, Paper } from 'internal/drawing';
import Timeline from 'internal/timeline/timeline';
import TrackItem from 'internal/timeline/track-item';
import { observable, autorun, observer, computed } from 'window/app-mobx';
import { IReactionDisposer } from 'mobx';
import { DrawingType } from 'internal/drawing/drawing-type';
import { PropertyViewController } from '../control/property-view-controller';
import { TrackItemHost } from '../control/track-item-host';
import { PropertyTimelineHeaderView } from './header-view';

import { KeyframeHost } from '../control/keyframe-host';
import { DrawingHost } from '../control/drawing-host';
import { PropertyHost } from '../control/property-host';

import * as style from './index.scss'
import VideoDrawing from 'internal/drawing/video-drawing';

export interface PropertyTimelineViewProps {
  propertyViewController: PropertyViewController;
}

@observer
export class PropertyTimelineView extends React.Component<PropertyTimelineViewProps, {}> {

  scrollViewController: ZoomableScrollViewController;
  updateViewDisposer: IReactionDisposer;

  constructor(props: any) {
    super(props);
    this.scrollViewController = new ZoomableScrollViewController();
    this.props.propertyViewController.scrollViewController = this.scrollViewController;

    this.updateView = this.updateView.bind(this);
    this.updateViewDisposer = autorun(this.updateView)
  }

  componentWillUnmount() {
    this.updateViewDisposer();
  }

  updateView() {
    const controller = this.props.propertyViewController;
    const scrollViewController = this.scrollViewController;
    const trackItem = controller.trackItemHost.trackItem;
    let totalTime = trackItem.time.end - trackItem.time.start;
    let startTime = Math.floor(totalTime * scrollViewController.start);
    let endTime = Math.floor(totalTime * scrollViewController.end);
    controller.baseTimecode = trackItem.time.start;
    controller.startTimecode = startTime;
    controller.endTimecode = endTime;
    let unitMillisecond = 1000;
    let unitWidth = scrollViewController.scrollWidth / ((endTime - startTime) / unitMillisecond);
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
    controller.pxPerMillisecond = unitWidth / unitMillisecond;
    controller.unitMillisecond = unitMillisecond;
    controller.unitWidth = unitWidth;
  }

  render() {
    const controller = this.props.propertyViewController;
    return (
      <ZoomableScrollView controller={this.scrollViewController}>
        <PropertyTimelineContentView 
            propertyViewController={controller}/>
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
    // const controller = this.props.propertyViewController;
    // if (isNaN(controller.scrollViewController.scrollWidth)) return;

    // let startCount = Math.floor(controller.startTimecode / controller.unitMillisecond);
    // let endCount = Math.ceil(controller.endTimecode / controller.unitMillisecond);

    // const ctx = this.canvasRef.current.getContext('2d');
    // this.canvasRef.current.width = controller.scrollViewController.scrollWidth;
    // this.canvasRef.current.height = 30;
    // let value = startCount * controller.unitMillisecond;
    // let translateX = (controller.startTimecode - value) * controller.pxPerMillisecond;
    // ctx.save();
    // ctx.strokeStyle = '#323835';
    // ctx.translate(-translateX, 0);
    // // Font align
    // for (let i = 0; i < endCount - startCount; i ++) {
    //   ctx.beginPath();
    //   ctx.moveTo(0, 0);
    //   ctx.lineTo(0, 2000);
    //   ctx.stroke();
    //   for (let j = 0; j < 9; j ++) {
    //     ctx.translate(controller.unitWidth / 10, 0);
    //     ctx.beginPath();
    //     ctx.moveTo(0, 0);
    //     ctx.lineTo(0, 2000);
    //     ctx.stroke();
    //   }
    //   ctx.translate(controller.unitWidth / 10, 0);
    //   value += controller.unitMillisecond;
    // }
    // ctx.restore();
  }


  render() {
    const drawingHost = this.props.propertyViewController.trackItemHost.drawingHost;
    return (
      <div className='property-timeline-body'>
        {/* <div className='grid'>
          <canvas ref={this.canvasRef}></canvas>
        </div> */}
        <div className='keyframe-content'>
        {
          <DrawingKeyframeContentView {...this.props}
              drawingHost={drawingHost} propertyViewController={this.props.propertyViewController}/>
          // [...drawingHosts].map(([_, drawingHost]) => 
          //   <DrawingKeyframeContentView {...this.props}
          //       drawingHost={drawingHost} propertyViewController={this.props.propertyViewController}/>
          // )
        }
        </div>
      </div>
    )
  }

}




interface PropertyTimelineDrawingViewProps extends PropertyTimelineViewProps {
  drawingHost: DrawingHost<any>,
  propertyViewController: PropertyViewController
}

@observer
class PropertyTimelineDrawingPropertyGroupView extends React.Component<PropertyTimelineDrawingViewProps, {}> {

  render() {
    const drawingHost = this.props.drawingHost;
    return (
      <div className='drawing-property-group'>
        { drawingHost.open && this.props.children }
      </div>
    )
  }

}

interface PropertyTimelinePropertyViewProps extends PropertyTimelineDrawingViewProps {
  propertyHost: PropertyHost;
}

@observer
class PropertyTimelineKeyframeView extends React.Component<PropertyTimelinePropertyViewProps, {}> {

  constructor(props: PropertyTimelinePropertyViewProps) {
    super(props);
  }

  render() {
    const propertyHost = this.props.propertyHost;
    const keyframes: JSX.Element[] = [];

    propertyHost.keyframeHosts.forEach(keyframeHost => {
      keyframes.push(<KeyframeView {...this.props} propertyHost={propertyHost} keyframeHost={keyframeHost}/>)
    })
    return (
      <div className='keyframes'>
        {keyframes}
      </div>
    )
  }
}

interface PropertyTimelineKeyframeViewProps extends PropertyTimelinePropertyViewProps {
  drawingHost: DrawingHost<any>;
  propertyHost: PropertyHost;
  keyframeHost: KeyframeHost;
}

@observer
class KeyframeView extends React.Component<PropertyTimelineKeyframeViewProps, {}> {

  constructor(props: PropertyTimelineKeyframeViewProps) {
    super(props);
  }

  render() {
    const controller = this.props.propertyViewController;
    const timeline = controller.timeline;
    const trackItem = controller.trackItemHost.trackItem;
    const keyframeHost = this.props.keyframeHost;
    const keyframe = keyframeHost.keyframe;
    const time = keyframe.timecode - trackItem.baseTime;
    const style = {
      left: controller.getPositionRelativeToTimeline(time)
    }
    return (
      <div className='keyframe' style={style}></div>
    )
  }

}

class DrawingKeyframeContentView extends React.Component<PropertyTimelineDrawingViewProps, any> {

  constructor(props: PropertyTimelineDrawingViewProps) {
    super(props);
  }

  render() {
    const drawingHost = this.props.drawingHost;
    return createDrawingPropertyKeyframeView(drawingHost.drawing.type, {
      ...this.props,
      drawingHost: this.props.drawingHost,
      propertyViewController: this.props.propertyViewController
    })
  }

}

interface DrawingKeyframeContentViewProps extends PropertyTimelineDrawingViewProps {
  drawingHost: DrawingHost<any>
}

@observer
class PaperDrawingKeyframeContentView extends React.Component<DrawingKeyframeContentViewProps, any> {

  render() {
    const drawingHost = this.props.drawingHost;
    const paper = this.props.drawingHost.drawing as Paper;
    const positionPropertyHost = drawingHost.getPropertyHost(paper.position);
    const scalePropertyHost = drawingHost.getPropertyHost(paper.scale);
    return (
      <PropertyTimelineDrawingPropertyGroupView {...this.props}>
        <PropertyTimelineKeyframeView {...this.props} propertyHost={positionPropertyHost}/>
        <PropertyTimelineKeyframeView {...this.props} propertyHost={scalePropertyHost}/>
        {
          [...drawingHost.childrenDrawingHosts].map(([drawing, childDrawingHost]) => 
          createDrawingPropertyKeyframeView(drawing.type, {
            ...this.props,
            drawingHost: childDrawingHost
          }))
        }
      </PropertyTimelineDrawingPropertyGroupView>
    )
  }
}

@observer
class RectangleDrawingKeyframeContentView extends React.Component<DrawingKeyframeContentViewProps, any> {

  render() {
    const drawingHost = this.props.drawingHost;
    const rectangle = this.props.drawingHost.drawing as Rectangle;
    const positionPropertyHost = drawingHost.getPropertyHost(rectangle.position);
    const scalePropertyHost = drawingHost.getPropertyHost(rectangle.scale);
    return (
      <PropertyTimelineDrawingPropertyGroupView {...this.props}>
        <PropertyTimelineKeyframeView {...this.props} propertyHost={positionPropertyHost}/>
        <PropertyTimelineKeyframeView {...this.props} propertyHost={scalePropertyHost}/>
      </PropertyTimelineDrawingPropertyGroupView>
    )
  }
}

@observer
class VideoDrawingKeyframeContentView extends React.Component<DrawingKeyframeContentViewProps, any> {

  render() {
    const drawingHost = this.props.drawingHost;
    const video = this.props.drawingHost.drawing as VideoDrawing;
    const positionPropertyHost = drawingHost.getPropertyHost(video.position);
    const scalePropertyHost = drawingHost.getPropertyHost(video.scale);
    const sizePropertyHost = drawingHost.getPropertyHost(video.size);
    return (
      <PropertyTimelineDrawingPropertyGroupView {...this.props}>
        <PropertyTimelineKeyframeView {...this.props} propertyHost={positionPropertyHost}/>
        <PropertyTimelineKeyframeView {...this.props} propertyHost={scalePropertyHost}/>
        <PropertyTimelineKeyframeView {...this.props} propertyHost={sizePropertyHost}/>
      </PropertyTimelineDrawingPropertyGroupView>
    )
  }
}

const DrawingPropertyKeyframeViewMap: any = {
  [DrawingType.PAPER]: PaperDrawingKeyframeContentView,
  [DrawingType.RECTANGLE]: RectangleDrawingKeyframeContentView,
  [DrawingType.VIDEO]: VideoDrawingKeyframeContentView
}

function createDrawingPropertyKeyframeView(type: DrawingType, props: DrawingKeyframeContentViewProps) {
  return React.createElement(
    DrawingPropertyKeyframeViewMap[type], {
      ...props,
      type
    }
  );
}