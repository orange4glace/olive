import * as React from 'react'
import { EffectControlWidget } from 'window/view/effect-control/widget';
import { observer } from 'window/app-mobx';
import { EffectControlWidgetFormView } from 'window/view/effect-control/view/form/widget-form-view';
import { EffectControlWidgetTimelineView } from 'window/view/effect-control/view/timeline/widget-timeline-view';
import { EffectControlWidgetTrackItemTimelineViewFactory } from 'window/view/effect-control/view/timeline/track-item/track-item-view-factory';
import { EffectControlWidgetDrawingTimelineViewFactory } from 'window/view/effect-control/view/timeline/drawing/drawing-view-factotry';
import { EffectControlWidgetVideoTrackItemViewModel } from 'window/view/effect-control/model/track-item/video-track-item-model';
import { EffectControlWidgetRectangleDrawingViewModel } from 'window/view/effect-control/model/drawing/rectangle-drawing-view-model';
import { EffectControlWidgetVideoTrackItemTimelineView } from 'window/view/effect-control/view/timeline/track-item/video-track-item-view';
import { EffectControlWidgetRectangleDrawingTimelineView } from 'window/view/effect-control/view/timeline/drawing/drawing-view';

EffectControlWidgetTrackItemTimelineViewFactory.register(
    EffectControlWidgetVideoTrackItemViewModel.viewModelName, EffectControlWidgetVideoTrackItemTimelineView);
EffectControlWidgetDrawingTimelineViewFactory.register(
    EffectControlWidgetRectangleDrawingViewModel.viewModelName, EffectControlWidgetRectangleDrawingTimelineView);

export interface EffectControlWidgetViewProps {
  widget: EffectControlWidget;
}

@observer
export class EffectControlWidgetView extends React.Component<EffectControlWidgetViewProps, {}> {

  render() {
    if (this.props.widget.model) {
      const model = this.props.widget.model;
      return (
        <>
          <EffectControlWidgetFormView {...this.props} model={model}/>
          <EffectControlWidgetTimelineView {...this.props} model={model}/>
        </>
      )
    }
    else {
      return <div>No TrackItem Selected</div>
    }
  }

}