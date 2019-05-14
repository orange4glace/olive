import * as React from 'react';
import { observer } from 'window/app-mobx';
import { EffectControlWidgetDrawingTimelineView } from 'window/view/effect-control/view/timeline/drawing/drawing-view';
import { EffectControlWidgetTransformEffectTimelineView } from 'window/view/effect-control/view/timeline/effect/transform-effect-view';
import { EffectControlWidgetVideoMediaDrawingViewModel } from 'window/view/effect-control/model/drawing/video-media-drawing.view';

@observer
export class EffectControlWidgetVideoMediaDrawingTimelineView
    extends EffectControlWidgetDrawingTimelineView<EffectControlWidgetVideoMediaDrawingViewModel> {

  render() {
    const model = this.props.drawingViewModel;
    return (
      <>
        <EffectControlWidgetTransformEffectTimelineView {...this.props} effectViewModel={model.transformEffectViewModel}/>
      </>
    )
  }

}