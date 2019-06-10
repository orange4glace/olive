import { Posted } from "worker-postable";
import { WithFrameRateBase } from "internal/timeline/common/frame-rate";
import { MixinBase } from "base/olive/mixin";

@Posted
export class FrameRateRenderer extends WithFrameRateBase(MixinBase) {
  
}