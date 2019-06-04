import * as React from 'react'
import { EffectControlWidgetTransformEffectFormView } from 'window/view/effect-control/view/form/effect/transform-effect-view';
import { observer } from 'window/app-mobx';
import { EffectControlWidgetDrawingFormView } from 'window/view/effect-control/view/form/drawing/drawing-view';
import { EffectControlWidgetVideoMediaDrawingViewModel } from 'window/view/effect-control/model/drawing/video-media-drawing.view';

@observer
export class EffectControlWidgetVideoMediaDrawingFormView
    extends EffectControlWidgetDrawingFormView<EffectControlWidgetVideoMediaDrawingViewModel> {

  render() {
    const model = this.props.drawingViewModel;
    return (
      <>
        <EffectControlWidgetTransformEffectFormView {...this.props} effectViewModel={model.transformEffectViewModel}/>
      </>
    )
  }

}