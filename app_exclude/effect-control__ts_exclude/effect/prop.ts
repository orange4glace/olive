import { Effect } from "internal/rendering/effect/effect";
import { EffectControlRenderingViewProps } from "../rendering/props";
import { Rendering } from "internal/rendering/rendering/rendering";

export interface EffectControlEffectViewProps<T extends Effect> extends EffectControlRenderingViewProps<Rendering> {

  effect: T;

}