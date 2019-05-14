import * as React from 'react'
import { EffectControlWidgetRectangleDrawingViewModel } from "window/view/effect-control/model/drawing/rectangle-drawing-view-model";
import { EffectControlWidgetTransformEffectFormView } from 'window/view/effect-control/view/form/effect/transform-effect-view';
import { observer } from 'window/app-mobx';
import { EffectControlWidgetDrawingFormView } from 'window/view/effect-control/view/form/drawing/drawing-view';

@observer
export class EffectControlWidgetRectangleDrawingFormView
    extends EffectControlWidgetDrawingFormView<EffectControlWidgetRectangleDrawingViewModel> {

  render() {
    const model = this.props.drawingViewModel;
    return (
      <>
        <EffectControlWidgetTransformEffectFormView {...this.props} effectViewModel={model.transformEffectViewModel}/>
      </>
    )
  }

}