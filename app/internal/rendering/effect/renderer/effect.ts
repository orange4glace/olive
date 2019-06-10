import { WithEffectBase } from "internal/rendering/effect/common/effect";
import { MixinBase } from "base/olive/mixin";
import { Posted } from "worker-postable";

@Posted
export class EffectRenderer extends WithEffectBase(MixinBase) {

}