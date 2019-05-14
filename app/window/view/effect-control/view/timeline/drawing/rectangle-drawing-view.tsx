import * as React from 'react';
import { observer } from 'window/app-mobx';
import { EffectControlWidgetDrawingTimelineView } from 'window/view/effect-control/view/timeline/drawing/drawing-view';
import { EffectControlWidgetRectangleDrawingViewModel } from 'window/view/effect-control/model/drawing/rectangle-drawing-view-model';
import { EffectControlWidgetTransformEffectTimelineView } from 'window/view/effect-control/view/timeline/effect/transform-effect-view';

@observer
export class EffectControlWidgetRectangleDrawingTimelineView
    extends EffectControlWidgetDrawingTimelineView<EffectControlWidgetRectangleDrawingViewModel> {

  render() {
    const model = this.props.drawingViewModel;
    return (
      <>
        <EffectControlWidgetTransformEffectTimelineView {...this.props} effectViewModel={model.transformEffectViewModel}/>
      </>
    )
  }

}