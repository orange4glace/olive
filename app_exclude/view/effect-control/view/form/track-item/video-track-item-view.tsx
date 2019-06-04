import * as React from 'react'
import { EffectControlWidgetVideoTrackItemViewModel } from 'window/view/effect-control/model/track-item/video-track-item-model';
import { EffectControlWidgetTrackItemFormViewComponent, EffectControlWidgetTrackView } from 'window/view/effect-control/view/form/track-item/track-item-view';
import { EffectControlWidgetDrawingSelectorFormView } from 'window/view/effect-control/view/form/drawing/drawing-view';

export class EffectControlWidgetVideoTrackItemView
    extends EffectControlWidgetTrackView<EffectControlWidgetVideoTrackItemViewModel> {
  
  render() {
    const model = this.props.trackItemViewModel;
    const drawingViewModel = model.drawingViewModel;
    return (
      <EffectControlWidgetTrackItemFormViewComponent {...this.props}>
        <EffectControlWidgetDrawingSelectorFormView {...this.props} drawingViewModel={drawingViewModel}/>
      </EffectControlWidgetTrackItemFormViewComponent>
    )
  }
}