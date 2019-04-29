import * as React from 'react'
import { EffectControlWidgetDrawingView } from "window/view/effect-control/view/form/drawing/drawing-view-factory";
import { EffectControlWidgetRectangleDrawingViewModel } from "window/view/effect-control/model/drawing/rectangle-drawing-view-model";
import { EffectControlWidgetTransformEffectFormView } from 'window/view/effect-control/view/form/effect/transform-effect-view';
import { observer } from 'window/app-mobx';

@observer
export class EffectControlWidgetRectangleDrawingView
    extends EffectControlWidgetDrawingView<EffectControlWidgetRectangleDrawingViewModel> {

  render() {
    const model = this.props.drawingViewModel;
    return (
      <>
        <EffectControlWidgetTransformEffectFormView {...this.props} effectViewModel={model.transformEffectViewModel}/>
      </>
    )
  }

}