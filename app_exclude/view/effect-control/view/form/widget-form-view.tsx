import * as React from 'react'
import { EffectControlWidgetViewProps } from 'window/view/effect-control/view/widget-view';
import { EffectControlWidgetModel } from 'window/view/effect-control/model/model';
import { observer } from 'window/app-mobx';
import { EffectControlWidgetTrackItemViewFactory } from 'window/view/effect-control/view/form/track-item/track-item-view-factory';
import { EffectControlWidgetVideoTrackItemViewModelImpl } from 'window/view/effect-control/model/track-item/video-track-item-model';
import { EffectControlWidgetRectangleDrawingViewModel } from 'window/view/effect-control/model/drawing/rectangle-drawing-view-model';
import { EffectControlWidgetRectangleDrawingFormView } from 'window/view/effect-control/view/form/drawing/rectangle-drawing-view';
import { EffectControlWidgetVideoTrackItemView } from 'window/view/effect-control/view/form/track-item/video-track-item-view';
import { EffectControlViewOutgoingEvents } from 'window/view/effect-control/view-outgoing-events';
import { EffectControlDrawingFormViewSelector } from 'window/view/effect-control/view/form/drawing/drawing-view';
import { EffectControlWidgetVideoMediaDrawingViewModel } from 'window/view/effect-control/model/drawing/video-media-drawing.view';
import { EffectControlWidgetVideoMediaDrawingFormView } from 'window/view/effect-control/view/form/drawing/video-media-drawing-view';

import * as style from './style.scss'

EffectControlWidgetTrackItemViewFactory.register(
    EffectControlWidgetVideoTrackItemViewModelImpl.viewModelName, EffectControlWidgetVideoTrackItemView);
EffectControlDrawingFormViewSelector.registerView(
    EffectControlWidgetRectangleDrawingViewModel, EffectControlWidgetRectangleDrawingFormView);
EffectControlDrawingFormViewSelector.registerView(
    EffectControlWidgetVideoMediaDrawingViewModel, EffectControlWidgetVideoMediaDrawingFormView);
    
export interface EffectControlWidgetContentViewProps extends EffectControlWidgetViewProps {
  model: EffectControlWidgetModel;
  outgoingEvents: EffectControlViewOutgoingEvents;
}

@observer
export class EffectControlWidgetFormView extends React.Component<EffectControlWidgetContentViewProps, {}> {

  render() {
    const model = this.props.model;
    return (
      <div className={style.component}>
        <EffectControlWidgetTrackItemViewFactory {...this.props} trackItemViewModel={model.trackItemViewModel}/>
      </div>
    )
  }

}