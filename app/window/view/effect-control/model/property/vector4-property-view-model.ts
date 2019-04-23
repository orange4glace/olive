import { EffectControlWidgetPropertyViewModel } from "window/view/effect-control/model/property/property-view-model";
import { Vector4Property } from "internal/rendering/property/vector4-property";
import { EffectControlWidgetPropertyViewModelImpl } from "window/view/effect-control/model/property/property-view-model-impl";
import { Vector4 } from "oliveutil/vector4";
import { ViewModel } from "window/view/view-model";

export interface EffectControlWidgetVector4PropertyViewModel
    extends EffectControlWidgetPropertyViewModel<Vector4Property> {

  xValueChangeHandler(val: number): void;
  yValueChangeHandler(val: number): void;
  zValueChangeHandler(val: number): void;
  wValueChangeHandler(val: number): void;

}

@ViewModel('EffectControlWidgetVector4PropertyViewModel')
export class EffectControlWidgetVector4PropertyViewModelImpl
    extends EffectControlWidgetPropertyViewModelImpl<Vector4Property>
    implements EffectControlWidgetVector4PropertyViewModel {

  /*@observable*/ readonly currentValue: Vector4;

  xValueChangeHandler(val: number): void {

  }
  yValueChangeHandler(val: number): void {

  }
  zValueChangeHandler(val: number): void {

  }
  wValueChangeHandler(val: number): void {

  }

  dispose(): void {}

}