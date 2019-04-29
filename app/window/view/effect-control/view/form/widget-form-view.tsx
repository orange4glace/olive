import * as React from 'react'
import { EffectControlWidgetViewProps } from 'window/view/effect-control/view/widget-view';
import { EffectControlWidgetModel } from 'window/view/effect-control/model/model';
import { observer } from 'window/app-mobx';
import { EffectControlWidgetTrackItemViewFactory } from 'window/view/effect-control/view/form/track-item/track-item-view-factory';
import { EffectControlWidgetVideoTrackItemViewModelImpl } from 'window/view/effect-control/model/track-item/video-track-item-model';
import { EffectControlWidgetRectangleDrawingViewModelImpl } from 'window/view/effect-control/model/drawing/rectangle-drawing-view-model';
import { EffectControlWidgetRectangleDrawingView } from 'window/view/effect-control/view/form/drawing/drawing-view';
import { EffectControlWidgetVideoTrackItemView } from 'window/view/effect-control/view/form/track-item/video-track-item-view';
import { EffectControlWidgetDrawingViewFactory } from 'window/view/effect-control/view/form/drawing/drawing-view-factory';

EffectControlWidgetTrackItemViewFactory.register(
    EffectControlWidgetVideoTrackItemViewModelImpl.viewModelName, EffectControlWidgetVideoTrackItemView);
EffectControlWidgetDrawingViewFactory.register(
    EffectControlWidgetRectangleDrawingViewModelImpl.viewModelName, EffectControlWidgetRectangleDrawingView);

export interface EffectControlWidgetContentViewProps extends EffectControlWidgetViewProps {
  model: EffectControlWidgetModel;
}

@observer
export class EffectControlWidgetFormView extends React.Component<EffectControlWidgetContentViewProps, {}> {

  render() {
    const model = this.props.model;
    return (
      <EffectControlWidgetTrackItemViewFactory {...this.props} trackItemViewModel={model.trackItemViewModel}/>
    )
  }

}