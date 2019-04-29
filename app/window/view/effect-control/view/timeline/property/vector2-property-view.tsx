import * as React from 'react'
import { observer } from 'window/app-mobx';
import { EffectControlWidgetVector2PropertyViewModel } from "window/view/effect-control/model/property/vector2-property-view-model";
import { EffectControlWidgetPropertyTimelineViewComponent, EffectControlWidgetPropertyTimelineView } from 'window/view/effect-control/view/timeline/property/property-view';

@observer
export class EffectControlWidgetVector2PropertyTimelineView extends EffectControlWidgetPropertyTimelineView<EffectControlWidgetVector2PropertyViewModel> {

  constructor(props: any) {
    super(props);
  }

  render() {
    const model = this.props.propertyViewModel;
    return (
      <EffectControlWidgetPropertyTimelineViewComponent {...this.props}>
      </EffectControlWidgetPropertyTimelineViewComponent>
    )
  }

}