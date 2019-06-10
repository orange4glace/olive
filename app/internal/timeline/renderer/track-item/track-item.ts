import { Posted } from "worker-postable";
import { WithTrackItemBase } from "internal/timeline/common/track-item/track-item";
import { MixinBase } from "base/olive/mixin";

@Posted
export class TrackItemRenderer extends WithTrackItemBase(MixinBase) {
  
}