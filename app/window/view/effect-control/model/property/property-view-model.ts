import { Property, PropertyTypes } from "internal/rendering/property/property";
import { ViewModel } from "window/view/view-model";

export interface EffectControlWidgetPropertyViewModel<T extends Property<PropertyTypes>>
    extends ViewModel {

  readonly name: string;

  /*@observable*/ readonly currentValue: any;

}