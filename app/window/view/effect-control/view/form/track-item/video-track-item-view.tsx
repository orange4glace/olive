import * as React from 'react'
import { EffectControlWidgetVideoTrackItemViewModel } from 'window/view/effect-control/model/track-item/video-track-item-model';
import { EffectControlWidgetTrackItemFormViewComponent, EffectControlWidgetTrackView } from 'window/view/effect-control/view/form/track-item/track-item-view';
import { EffectControlWidgetDrawingViewFactory } from 'window/view/effect-control/view/form/drawing/drawing-view-factory';

export class EffectControlWidgetVideoTrackItemView
    extends EffectControlWidgetTrackView<EffectControlWidgetVideoTrackItemViewModel> {
  
  render() {
    const model = this.props.trackItemViewModel;
    const drawingViewModel = model.drawingViewModel;
    return (
      <EffectControlWidgetTrackItemFormViewComponent {...this.props}>
        <EffectControlWidgetDrawingViewFactory {...this.props} drawingViewModel={drawingViewModel}/>
      </EffectControlWidgetTrackItemFormViewComponent>
    )
  }
}