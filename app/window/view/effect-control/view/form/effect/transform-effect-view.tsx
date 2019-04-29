import * as React from 'react'
import { observer } from 'mobx-react';
import { EffectControlWidgetEffectFormView, EffectControlWidgetEffectFormViewComponent } from 'window/view/effect-control/view/form/effect/effect-view';
import { EffectControlWidgetTransformEffectViewModel } from 'window/view/effect-control/model/effect/transform-effect-view-model';
import { EffectControlWidgetVector2PropertyFormView } from 'window/view/effect-control/view/form/property/vector2-property-view';

@observer
export class EffectControlWidgetTransformEffectFormView
    extends EffectControlWidgetEffectFormView<EffectControlWidgetTransformEffectViewModel> {
  
  render() {
    const model = this.props.effectViewModel;
    return (
      <EffectControlWidgetEffectFormViewComponent {...this.props}>
        <EffectControlWidgetVector2PropertyFormView {...this.props} propertyViewModel={model.positionPropertyViewModel}/>
        <EffectControlWidgetVector2PropertyFormView {...this.props} propertyViewModel={model.scalePropertyViewModel}/>
      </EffectControlWidgetEffectFormViewComponent>
    )
  }

}