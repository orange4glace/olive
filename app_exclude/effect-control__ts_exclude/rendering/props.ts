import { EffectControlViewProps } from "../props";
import { Rendering } from "internal/rendering/rendering/rendering";

export interface EffectControlRenderingViewProps<T extends Rendering> extends EffectControlViewProps {
  rendering: T;
}