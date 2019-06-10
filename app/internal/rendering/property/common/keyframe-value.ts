import { Constructor, MixinBase } from "base/olive/mixin";
import { postable, Postabled } from "worker-postable";

export type KeyframeValueBaseConstructor = new (...args: any[]) => KeyframeValueBase;
export function WithKeyframeValueBase<TBase extends Constructor>(Base: TBase) { 
  @Postabled
  class KeyframeValueBase extends Base {
    static POSTABLE_TYPE = 'olive.property.keyframe.Value';
    @postable protected type_: string;
    public get type() { return this.type_; }

    static interpolate(lhs: KeyframeValueBase, rhs: KeyframeValueBase, t: number): KeyframeValueBase {
      throw new Error('NotImplemenetedException');
    }
  };
  return KeyframeValueBase;
}
@Postabled
export class KeyframeValueBase extends WithKeyframeValueBase(MixinBase) {
  constructor(type: string) {
    super();
    this.type_ = type;
  }
}