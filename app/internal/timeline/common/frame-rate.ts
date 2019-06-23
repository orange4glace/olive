import { Constructor, MixinBase } from "base/olive/mixin";
import { postable, Postabled } from "worker-postable";

export function WithFrameRateBase<TBase extends Constructor>(Base: TBase) { 
  @Postabled
  class FrameRateBase extends Base {
    static readonly POSTABLE_TYPE = 'olive.timeline.FrameRate';
    @postable protected num_: number;
    public get num() { return this.num_; }
    @postable protected den_: number;
    public get den() { return this.den_; }
  };
  return FrameRateBase;
}
@Postabled
export class FrameRateBase extends WithFrameRateBase(MixinBase) {}