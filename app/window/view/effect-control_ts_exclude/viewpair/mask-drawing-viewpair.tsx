import * as React from 'react'
import { observer } from 'window/app-mobx';
import Timeline from 'internal/timeline/timeline';
import { TrackItemHost } from 'window/view/timeline/controller';
import { DrawingHost } from 'window/view/timeline/controller/drawing-host';
import { Drawing, Paper } from 'internal/drawing';
import { PropertyViewDrawingDropDownView, PropertyViewDropDownView } from './component/dropdown-view';
import { PolypathPropertyControlView } from './component/property-control-view';
import { EffectControlDrawingViewProps } from '../props';
import { EffectControlKeyframeTimelineView } from './drawing-viewpair';
import { MaskDrawing } from 'internal/drawing/mask';

@observer
export class EffectControlMaskDrawingFormView extends React.Component<EffectControlDrawingViewProps<MaskDrawing>, {}> {

  constructor(props: EffectControlDrawingViewProps<MaskDrawing>) {
    super(props);
  }

  render() {
    const controller = this.props.controller;
    const timeline = controller.timelineViewController.timelineHost.timeline;
    const trackItem = controller.trackItemHost.trackItem;
    const drawingHost = this.props.drawingHost;
    const drawing = this.props.drawingHost.drawing;

    const pathPropertyHost = drawingHost.getPropertyHost(drawing.path);
    return (
      <PropertyViewDrawingDropDownView label='Mask' drawingHost={drawingHost}>
        <PolypathPropertyControlView label='Path' {...this.props} propertyHost={pathPropertyHost}/>
      </PropertyViewDrawingDropDownView>
    )
  }
}

@observer
export class EffectControlMaskDrawingTimelineView extends React.Component<EffectControlDrawingViewProps<MaskDrawing>, any> {

  render() {
    const controller = this.props.controller;
    const drawingHost = this.props.drawingHost;
    const mask = this.props.drawingHost.drawing;
    const pathPropertyHost = drawingHost.getPropertyHost(mask.path);
    return (
      <PropertyViewDropDownView open={drawingHost.open}>
        <EffectControlKeyframeTimelineView controller={controller} trackItemHost={controller.trackItemHost}
            drawingHost={drawingHost} propertyHost={pathPropertyHost}/>
      </PropertyViewDropDownView>
    )
  }
}