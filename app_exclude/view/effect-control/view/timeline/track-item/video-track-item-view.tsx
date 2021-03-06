import * as React from 'react'
import { EffectControlWidgetVideoTrackItemViewModel } from 'window/view/effect-control/model/track-item/video-track-item-model';
import { EffectControlWidgetTrackTimelineView, EffectControlWidgetTrackItemTimelineViewComponent } from 'window/view/effect-control/view/timeline/track-item/track-item-view';
import { EffectControlWidgetDrawingSelectorView } from 'window/view/effect-control/view/timeline/drawing/drawing-view';

export class EffectControlWidgetVideoTrackItemTimelineView
    extends EffectControlWidgetTrackTimelineView<EffectControlWidgetVideoTrackItemViewModel> {
  
  render() {
    const model = this.props.trackItemViewModel;
    const drawingViewModel = model.drawingViewModel;
    return (
      <EffectControlWidgetTrackItemTimelineViewComponent {...this.props}>
        <EffectControlWidgetDrawingSelectorView {...this.props} drawingViewModel={drawingViewModel}/>
      </EffectControlWidgetTrackItemTimelineViewComponent>
    )
  }
}