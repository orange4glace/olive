import { Property, PropertyTypes } from "internal/rendering/property/property";
import { Vector2Property } from "internal/rendering/property/vector2-property";
import PostableVector2 from "util/postable_vector2";
import { ViewModel } from "window/view/view-model";

export interface EffectControlWidgetPropertyViewModel<T extends Property<PropertyTypes>>
    extends ViewModel {

  readonly name: string;

  /*@observable*/ readonly currentValue: any;

}