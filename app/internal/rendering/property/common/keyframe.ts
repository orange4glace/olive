import { Constructor, MixinBase } from "base/olive/mixin";
import { postable, Postabled } from "worker-postable";

export enum InterpolationType {
  NONE,
  LINEAR,
}

export function WithKeyframeBase<TBase extends Constructor>(Base: TBase) { 
  @Postabled
  class KeyframeBase extends Base {
    static readonly POSTABLE_TYPE = 'olive.keyframe.Keyframe';
    @postable protected timecode_: number;
    public get timecode() { return this.timecode_; }
    @postable protected value_: any;
    public get value() { return this.value_; }
    @postable protected interpolationType_: InterpolationType;
    public get interpolationType() { return this.interpolationType_; }
  };
  return KeyframeBase;
}
@Postabled
export class KeyframeBase extends WithKeyframeBase(MixinBase) {}