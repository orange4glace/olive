import * as React from 'react'

import Timeline from "internal/timeline/timeline";
import TrackItem from "internal/timeline/track-item";
import { Vector2PropertyControl } from './pannel/component/property-control';
import { DrawingType } from 'internal/drawing/drawing-type';
import { Rectangle, Paper, Property, Vector2Property } from 'internal/drawing';
import { observer } from 'window/app-mobx';

import * as style from './index.scss'
import { PropertyGroupView } from './pannel/component/property-group';
import { DrawingHost } from '../control/drawing-host';
import { PropertyViewController } from '../control/property-view-controller';
import { TrackItemHost } from '../control/track-item-host';
import { PropertyHost } from '../control/property-host';
import VideoDrawing from 'internal/drawing/video-drawing';
import { MaskDrawing } from 'internal/drawing/mask';

interface PropertyFormViewProps {
  propertyViewController: PropertyViewController;
}

@observer
export class PropertyFormView extends React.Component<PropertyFormViewProps, {}> {

  constructor(props: PropertyFormViewProps) {
    super(props);
  }

  render() {
    const controller = this.props.propertyViewController;
    const trackItemHost = controller.trackItemHost;
    return (
      <div className={style.component}>
        <div className='header'></div>
        <div className='content'>
          <PropertyFormContentView {...this.props} timeline={controller.timeline} trackItemHost={trackItemHost}/>
        </div>
      </div>)
  }

}

interface PropertyFormContentViewProps extends PropertyFormViewProps {
  timeline: Timeline;
  trackItemHost: TrackItemHost;
}

@observer
export class PropertyFormContentView extends React.Component<PropertyFormContentViewProps, {}> {

  constructor(props: PropertyFormContentViewProps) {
    super(props);
  }

  render() {
    const timeline = this.props.timeline;
    const trackItemHost = this.props.trackItemHost;
    const drawingHost = this.props.trackItemHost.drawingHost;
    return (
      <div>
        {createDrawingPropertyView(drawingHost.drawing.type, {
          level: 0,
          timeline: timeline,
          trackItemHost: trackItemHost,
          drawingHost: drawingHost})}
      </div>
    )
  }

}

interface DrawingPropertyFormProps {
  level: number;
  timeline: Timeline;
  trackItemHost: TrackItemHost;
  drawingHost: DrawingHost<any>;
}

@observer
class PaperDrawingPropertyFormView extends React.Component<DrawingPropertyFormProps, {}> {

  constructor(props: DrawingPropertyFormProps) {
    super(props);
  }

  render() {
    const drawingHost = this.props.drawingHost;
    return (
      <PropertyGroupView label='Paper' drawingHost={drawingHost}>
        <Vector2PropertyControl {...this.props} label={'position'} propertyHost={
            drawingHost.getPropertyHost(drawingHost.drawing.position)}/>
        <Vector2PropertyControl {...this.props} label={'scale'} propertyHost={
            drawingHost.getPropertyHost(drawingHost.drawing.scale)}/>
        {
          [...drawingHost.childrenDrawingHosts].map(([child, childHost]) =>
              createDrawingPropertyView(childHost.drawing.type, {
                  level: this.props.level + 1,
                  timeline: this.props.timeline,
                  trackItemHost: this.props.trackItemHost,
                  drawingHost: childHost}))
        }
      </PropertyGroupView>
    )
  }
}

@observer
class RectangleDrawingPropertyFormView extends React.Component<DrawingPropertyFormProps, {}> {

  constructor(props: DrawingPropertyFormProps) {
    super(props);
  }

  render() {
    const drawingHost = this.props.drawingHost as DrawingHost<Rectangle>;
    return (
      <PropertyGroupView label='Rectangle' drawingHost={drawingHost}>
        <Vector2PropertyControl {...this.props} label={'position'} propertyHost={
            drawingHost.getPropertyHost(drawingHost.drawing.position)}/>
        <Vector2PropertyControl {...this.props} label={'scale'} propertyHost={
            drawingHost.getPropertyHost(drawingHost.drawing.scale)}/>
      </PropertyGroupView>
    )
  }
}

@observer
class VideoDrawingPropertyFormView extends React.Component<DrawingPropertyFormProps, {}> {

  constructor(props: DrawingPropertyFormProps) {
    super(props);
  }

  render() {
    const drawingHost = this.props.drawingHost as DrawingHost<VideoDrawing>;
    const drawing = drawingHost.drawing;
    return (
      <PropertyGroupView label='Video' drawingHost={drawingHost}>
        <Vector2PropertyControl {...this.props} label={'position'} propertyHost={
            drawingHost.getPropertyHost(drawingHost.drawing.position)}/>
        <Vector2PropertyControl {...this.props} label={'scale'} propertyHost={
            drawingHost.getPropertyHost(drawingHost.drawing.scale)}/>
        <Vector2PropertyControl {...this.props} label={'size'} propertyHost={
            drawingHost.getPropertyHost(drawingHost.drawing.size)}/>
      </PropertyGroupView>
    )
  }
}

@observer
class MaskDrawingPropertyFormView extends React.Component<DrawingPropertyFormProps, {}> {

  constructor(props: DrawingPropertyFormProps) {
    super(props);
  }

  render() {
    const drawingHost = this.props.drawingHost as DrawingHost<MaskDrawing>;
    const drawing = drawingHost.drawing;
    return (
      <PropertyGroupView label='Mask' drawingHost={drawingHost}>
      </PropertyGroupView>
    )
  }
}

const DrawingPropertyViewMap: any = {
  [DrawingType.PAPER]: PaperDrawingPropertyFormView,
  [DrawingType.RECTANGLE]: RectangleDrawingPropertyFormView,
  [DrawingType.VIDEO]: VideoDrawingPropertyFormView,
  [DrawingType.MASK]: MaskDrawingPropertyFormView
}

function createDrawingPropertyView(type: DrawingType, props: DrawingPropertyFormProps) {
  return React.createElement(
    DrawingPropertyViewMap[type], props);
}