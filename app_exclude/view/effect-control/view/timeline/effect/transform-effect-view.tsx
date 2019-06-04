import * as React from 'react'
import { observer } from 'mobx-react';
import { EffectControlWidgetTransformEffectViewModel } from 'window/view/effect-control/model/effect/transform-effect-view-model';
import { EffectControlWidgetEffectTimelineViewComponent, EffectControlWidgetEffectTimelineView } from 'window/view/effect-control/view/timeline/effect/effect-view';
import { EffectControlWidgetVector2PropertyTimelineView } from 'window/view/effect-control/view/timeline/property/vector2-property-view';

@observer
export class EffectControlWidgetTransformEffectTimelineView
    extends EffectControlWidgetEffectTimelineView<EffectControlWidgetTransformEffectViewModel> {
  
  render() {
    const model = this.props.effectViewModel;
    return (
      <EffectControlWidgetEffectTimelineViewComponent {...this.props}>
        <EffectControlWidgetVector2PropertyTimelineView {...this.props} propertyViewModel={model.positionPropertyViewModel}/>
        <EffectControlWidgetVector2PropertyTimelineView {...this.props} propertyViewModel={model.scalePropertyViewModel}/>
      </EffectControlWidgetEffectTimelineViewComponent>
    )
  }

}