import * as React from 'react'
import { observer } from 'window/app-mobx';
import Timeline from 'internal/timeline/timeline';
import { TrackItemHost } from 'window/view/timeline/controller';
import { DrawingHost } from 'window/view/timeline/controller/drawing-host';
import { Drawing, Paper } from 'internal/drawing';
import { PropertyViewDrawingDropDownView, PropertyViewDropDownView } from './component/dropdown-view';
import VideoDrawing from 'internal/drawing/video-drawing';
import { Vector2PropertyControlView } from './component/property-control-view';
import { EffectControlDrawingViewProps } from '../props';
import { EffectControlKeyframeTimelineView } from './drawing-viewpair';
import { EffectControlMaskDrawingFormView, EffectControlMaskDrawingTimelineView } from './mask-drawing-viewpair';

@observer
export class EffectControlVideoDrawingFormView extends React.Component<EffectControlDrawingViewProps<VideoDrawing>, {}> {

  constructor(props: EffectControlDrawingViewProps<VideoDrawing>) {
    super(props);
  }

  render() {
    const trackItemHost = this.props.trackItemHost;
    const drawingHost = this.props.drawingHost;
    const drawing = drawingHost.drawing;
    return (
      <PropertyViewDrawingDropDownView label='Video' drawingHost={drawingHost}>
        <Vector2PropertyControlView {...this.props} label={'position'} propertyHost={
            drawingHost.getPropertyHost(drawingHost.drawing.position)}/>
        <Vector2PropertyControlView {...this.props} label={'scale'} propertyHost={
            drawingHost.getPropertyHost(drawingHost.drawing.scale)}/>
        {
          drawing.masks.map(mask =>
              <EffectControlMaskDrawingFormView {...this.props} drawingHost={drawingHost.getChildDrawingHost(mask)}/>)
        }
      </PropertyViewDrawingDropDownView>
    )
  }
}

@observer
export class EffectControlVideoDrawingTimelineView extends React.Component<EffectControlDrawingViewProps<VideoDrawing>, any> {

  render() {
    const drawingHost = this.props.drawingHost;
    const paper = this.props.drawingHost.drawing;
    const positionPropertyHost = drawingHost.getPropertyHost(paper.position);
    const scalePropertyHost = drawingHost.getPropertyHost(paper.scale);
    const drawing = drawingHost.drawing;
    return (
      <PropertyViewDropDownView open={drawingHost.open}>
        <EffectControlKeyframeTimelineView {...this.props} propertyHost={positionPropertyHost}/>
        <EffectControlKeyframeTimelineView {...this.props} propertyHost={scalePropertyHost}/>
        {
          drawing.masks.map(mask =>
              <EffectControlMaskDrawingTimelineView {...this.props} drawingHost={drawingHost.getChildDrawingHost(mask)}/>)
        }
      </PropertyViewDropDownView>
    )
  }
}