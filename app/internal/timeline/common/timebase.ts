import { Constructor, MixinBase } from "base/olive/mixin";
import { postable, Postabled } from "worker-postable";

export interface ReadonlyTimebaseBase {
  readonly num: number;
  readonly den: number;
}

export function WithTimebase<TBase extends Constructor>(Base: TBase) { 
  @Postabled
  class TimebaseBase extends Base {
    static readonly POSTABLE_TYPE = 'olive.timeline.Timebase';
    @postable protected num_: number;
    public get num() { return this.num_; }
    @postable protected den_: number;
    public get den() { return this.den_; }

    static rescale(time: number, src: ReadonlyTimebaseBase, dst: ReadonlyTimebaseBase) {
      return Math.floor((src.den * dst.num) / (dst.num * src.den) * time);
    }
  };
  return TimebaseBase;
}
@Postabled
export class TimebaseBase extends WithTimebase(MixinBase) {}