import { Constructor, MixinBase } from "base/olive/mixin";
import { postable, Postabled } from "worker-postable";

export function WithAudioSettingBase<TBase extends Constructor>(Base: TBase) { 
  @Postabled
  class AudioSettingBase extends Base {
    static readonly POSTABLE_TYPE = 'olive.timeline.AudioSetting';
    @postable protected sampleRate_: number;
    public get sampleRate() { return this.sampleRate_; }
  };
  return AudioSettingBase;
}
@Postabled
export class AudioSettingBase extends WithAudioSettingBase(MixinBase) {}