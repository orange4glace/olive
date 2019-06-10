import { Constructor, MixinBase } from "base/olive/mixin";
import { postable, Postabled } from "worker-postable";

export type EffectBaseConstructor = new (...args: any[]) => EffectBase;
export function WithEffectBase<TBase extends Constructor>(Base: TBase) { 
  @Postabled
  class EffectBase extends Base {
    static readonly POSTABLE_TYPE = 'olive.effect.Effect';
    @postable protected type_: string;
    public get type() { return this.type_; }
  };
  return EffectBase;
}
@Postabled
export class EffectBase extends WithEffectBase(MixinBase) {}