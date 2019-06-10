import { WithKeyframeBase } from "internal/rendering/property/common/keyframe";
import { MixinBase } from "base/olive/mixin";
import { Posted } from "worker-postable";

@Posted
export class KeyframeRenderer extends WithKeyframeBase(MixinBase) {

}