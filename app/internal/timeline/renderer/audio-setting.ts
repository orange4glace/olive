import { Posted } from "worker-postable";
import { WithAudioSettingBase } from "internal/timeline/common/audio-setting";
import { MixinBase } from "base/olive/mixin";

@Posted
export class AudioSettingRenderer extends WithAudioSettingBase(MixinBase) {
  
}