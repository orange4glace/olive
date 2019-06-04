import * as React from 'react'
import { EffectControlWidgetPropertyFormView, EffectControlWidgetPropertyFormViewComponent } from "window/view/effect-control/view/form/property/property-view";
import { EffectControlWidgetVector2PropertyViewModel } from "window/view/effect-control/model/property/vector2-property-view-model";
import { NumberInput } from 'window/base/number-input';
import { observer } from 'window/app-mobx';

@observer
export class EffectControlWidgetVector2PropertyFormView extends EffectControlWidgetPropertyFormView<EffectControlWidgetVector2PropertyViewModel> {

  constructor(props: any) {
    super(props);

    this.xValueChangeHandler = this.xValueChangeHandler.bind(this);
    this.yValueChangeHandler = this.yValueChangeHandler.bind(this);
  }

  xValueChangeHandler(val: number) {
    this.props.propertyViewModel.xValueChangeHandler(val);
  }

  yValueChangeHandler(val: number) {
    this.props.propertyViewModel.yValueChangeHandler(val);
  }

  render() {
    const model = this.props.propertyViewModel;
    return (
      <EffectControlWidgetPropertyFormViewComponent {...this.props}>
        <NumberInput value={model.currentValue.x} onChange={this.xValueChangeHandler}/>
        <NumberInput value={model.currentValue.y} onChange={this.yValueChangeHandler}/>
      </EffectControlWidgetPropertyFormViewComponent>
    )
  }

}