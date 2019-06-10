import { WithKeyframeValueBase } from "internal/rendering/property/common/keyframe-value";
import { MixinBase } from "base/olive/mixin";
import { Posted } from "worker-postable";

@Posted
export class KeyframeValueRenderer extends WithKeyframeValueBase(MixinBase) {
  
}