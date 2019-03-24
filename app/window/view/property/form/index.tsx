import * as React from 'react'

import Timeline from "internal/timeline/timeline";
import TrackItem from "internal/timeline/track-item";
import { Vector2PropertyControl } from './pannel/component/property-control';
import { DrawingType } from 'internal/drawing/drawing-type';
import { Rectangle } from 'internal/drawing';
import { observer } from 'window/app-mobx';

import * as style from './index.scss'

interface PropertyFormViewProps {
  timeline: Timeline,
  trackItem: TrackItem
}

@observer
export class PropertyFormView extends React.Component<PropertyFormViewProps, {}> {

  constructor(props: PropertyFormViewProps) {
    super(props);
  }

  render() {
    return (
      <div className={style.component}>
        <div className='header'></div>
        <div className='content'>
          <PropertyFormViewContent {...this.props}/>
        </div>
      </div>)
  }

}

@observer
export class PropertyFormViewContent extends React.Component<PropertyFormViewProps, {}> {

  constructor(props: PropertyFormViewProps) {
    super(props);
  }

  render() {
    const timeline = this.props.timeline;
    const trackItem = this.props.trackItem;
    let timeoffset = timeline.currentTime - trackItem.time.start;
    return (
      <div>
        {createDrawingPropertyView(
          trackItem.drawing.type,
          timeline,
          trackItem,
          trackItem.drawing
        )}
      </div>
    )
  }

}

interface DrawingPropertyFormProps {
  timeline: Timeline,
  trackItem: TrackItem,
  drawing: Drawing;
}

@observer
class RectangleDrawingPropertyFormView extends React.Component<DrawingPropertyFormProps, {}> {

  rectangleDrawing: Rectangle;

  constructor(props: DrawingPropertyFormProps) {
    super(props);
    this.rectangleDrawing = props.drawing as Rectangle;
  }

  render() {
    return (
      <Vector2PropertyControl {...this.props} label={'size'} property={this.rectangleDrawing.position}/>
    )
  }
}

const DrawingPropertyViewMap: any = {
  [DrawingType.RECTANGLE]: RectangleDrawingPropertyFormView
}

function createDrawingPropertyView(type: DrawingType, timeline: Timeline, trackItem: TrackItem, drawing: Drawing) {
  return React.createElement(
    DrawingPropertyViewMap[type],
    {
      timeline: timeline,
      trackItem: trackItem,
      drawing: drawing
    }
  );
}