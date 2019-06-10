import { Posted } from "worker-postable";
import { WithVideoSettingBase } from "internal/timeline/common/video-setting";
import { MixinBase } from "base/olive/mixin";

@Posted
export class VideoSettingRenderer extends WithVideoSettingBase(MixinBase) {
  
}