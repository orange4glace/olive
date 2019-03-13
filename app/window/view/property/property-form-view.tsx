import * as React from 'react'

import Timeline from "internal/timeline/timeline";
import TrackItem from "internal/timeline/track-item";
import { Vector2PropertyControl } from './pannel/component/property-control';
import { DrawingType } from 'internal/drawing/drawing-type';
import { Rectangle } from 'internal/drawing';
import { observer } from 'window/app-mobx';

interface PropertyFormViewProps {
  timeline: Timeline,
  trackItem: TrackItem
}

@observer
export default class PropertyFormView extends React.Component<PropertyFormViewProps, {}> {

  constructor(props: PropertyFormViewProps) {
    super(props);
  }

  render() {
    const timeline = this.props.timeline;
    const trackItem = this.props.trackItem;
    let timeoffset = timeline.currentTime - trackItem.startTime;
    return (
      <div>
        {createDrawingPropertyView(
          trackItem.drawing.type,
          trackItem.drawing,
          timeoffset
        )}
      </div>
    )
  }

}

interface DrawingPropertyFormProps {
  timeoffset: number;
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
      <Vector2PropertyControl label={'size'} property={this.rectangleDrawing.position} timeoffset={this.props.timeoffset}/>
    )
  }
}

const DrawingPropertyViewMap: any = {
  [DrawingType.RECTANGLE]: RectangleDrawingPropertyFormView
}

function createDrawingPropertyView(type: DrawingType, drawing: Drawing, timeoffset: number) {
  return React.createElement(
    DrawingPropertyViewMap[type],
    {
      drawing: drawing,
      timeoffset: timeoffset
    }
  );
}