import * as React from 'react'

import ZoomableScrollView, { ZoomableScrollViewController } from "../zoomable-scroll-view";
import { Property, Keyframe, Rectangle } from 'internal/drawing';
import Timeline from 'internal/timeline/timeline';
import TrackItem from 'internal/timeline/track-item';
import { observable, autorun, observer } from 'window/app-mobx';
import { IReactionDisposer } from 'mobx';
import { MouseUtil } from 'orangeutil';
import Drawing from 'internal/drawing/drawing';
import { DrawingType } from 'internal/drawing/drawing-type';

interface PropertyKeyframeViewProps {
  timeline: Timeline,
  trackItem: TrackItem
}

class KeyframeViewController {
  
  startTimecode: number;
  endTimecode: number;
  pxPerMillisecond: number;
  unitMillisecond: number;
  unitWidth: number;
  ref: React.RefObject<any>;

  getTimeRelativeToTimeline(px: number) {
    return Math.round(this.startTimecode + px / this.pxPerMillisecond);
  }
  getTimeAmountRelativeToTimeline(px: number) {
    return px / this.pxPerMillisecond;
  }
  getPositionRelativeToTimeline(time: number) {
    // Touch |endTime| variable so observer can detect the change
    this.endTimecode;
    return Math.floor((time - this.startTimecode) * this.pxPerMillisecond);
  }
  getPixelAmountRelativeToTimeline(time: number) {
    return time * this.pxPerMillisecond;
  }
  getMousePostionRelativeToTimeline(e: MouseEvent | React.MouseEvent) {
    return MouseUtil.mousePositionElement(e, this.ref.current);
  }
}

@observer
export class PropertyKeyframeView extends React.Component<PropertyKeyframeViewProps, {}> {

  scrollViewController: ZoomableScrollViewController;

  @observable keyframeViewController: KeyframeViewController;
  updateAutorunDisposer: IReactionDisposer;

  constructor(props: any) {
    super(props);
    this.scrollViewController = new ZoomableScrollViewController();
    this.keyframeViewController = new KeyframeViewController();

    this.updateView = this.updateView.bind(this);
    this.updateAutorunDisposer = autorun(this.updateView);
  }

  componentWillUnmount() {
    this.updateAutorunDisposer();
  }

  updateView() {
    const controller = this.scrollViewController;
    const trackItem = this.props.trackItem;
    let totalTime = trackItem.endTime - trackItem.startTime;
    let startTime = Math.floor(totalTime * controller.start);
    let endTime = Math.floor(totalTime * controller.end);
    this.keyframeViewController.startTimecode = startTime;
    this.keyframeViewController.endTimecode = endTime;
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
    this.keyframeViewController.pxPerMillisecond = unitWidth / unitMillisecond;
    this.keyframeViewController.unitMillisecond = unitMillisecond;
    this.keyframeViewController.unitWidth = unitWidth;
  }

  render() {
    return (
      <ZoomableScrollView controller={this.scrollViewController}>
      {createDrawingPropertyKeyframeView(this.props.trackItem.drawing.type, {
        ...this.props,
        drawing: this.props.trackItem.drawing,
        keyframeViewController: this.keyframeViewController
      })}
      </ZoomableScrollView>
    )
  }

}

interface PropertyKeyframeContentViewProps extends PropertyKeyframeViewProps {
  drawing: Drawing,
  keyframeViewController: KeyframeViewController
}

interface KeyframeContentViewProps extends PropertyKeyframeContentViewProps {
  property: Property<any>
}

@observer
class KeyframeContentView extends React.Component<KeyframeContentViewProps, {}> {

  render() {
    const property = this.props.property;
    const keyframes: JSX.Element[] = [];

    property.keyframes.forEach(keyframe => {
      keyframes.push(<KeyframeView {...this.props} keyframe={keyframe}/>)
    })
    return (
      <div className='keyframes'>
        {keyframes}
      </div>
    )
  }
}

interface KeyframeViewProps extends KeyframeContentViewProps {
  keyframe: Keyframe<any>
}

@observer
class KeyframeView extends React.Component<KeyframeViewProps, {}> {

  render() {
    return (
      <div className='keyframe'></div>
    )
  }

}

@observer
class RectangleDrawingKeyframeContentView extends React.Component<PropertyKeyframeContentViewProps, any> {

  render() {
    const rectangle = this.props.drawing as Rectangle;
    return (
      <>
        <KeyframeContentView {...this.props} property={rectangle.position}/>
        <KeyframeContentView {...this.props} property={rectangle.scale}/>
      </>
    )
  }
}

const DrawingPropertyKeyframeViewMap: any = {
  [DrawingType.RECTANGLE]: RectangleDrawingKeyframeContentView
}

function createDrawingPropertyKeyframeView(type: DrawingType, props: PropertyKeyframeContentViewProps) {
  return React.createElement(
    DrawingPropertyKeyframeViewMap[type], {
      ...props,
      type
    }
  );
}