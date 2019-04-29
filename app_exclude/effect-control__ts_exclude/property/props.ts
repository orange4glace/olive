import { Effect } from "internal/rendering/effect/effect";
import { EffectControlEffectViewProps } from "../effect/prop";
import { PropertyTypes, Property } from "internal/rendering/effect/property/property";

export interface EffectControlPropertyViewProps<T extends PropertyTypes>
    extends EffectControlEffectViewProps<Effect> {

  property: Property<T>;

}