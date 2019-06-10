import { PropertyBaseConstructor, PropertyBase } from "internal/rendering/property/common/property";
import { Posted, postable, Postabled } from "worker-postable";
import { KeyframeValueBaseConstructor, KeyframeValueBase } from "internal/rendering/property/common/keyframe-value";

export function WithScalarKeyframeValueBase<TBase extends KeyframeValueBaseConstructor>(Base: TBase) {
  @Postabled
  class ScalarKeyframeValueBase extends Base {
    static readonly TYPE = 'olive.property.keyframe.Scalar'
    static readonly POSTABLE_TYPE = ScalarKeyframeValueBase.TYPE;
    @postable protected value_: number;
    public get value() { return this.value_; }
  }
  return ScalarKeyframeValueBase;
}
@Postabled
export class ScalarKeyframeValueBase extends WithScalarKeyframeValueBase(KeyframeValueBase) {}

export function WithScalarPropertyBase<TBase extends PropertyBaseConstructor>(Base: TBase) { 
  @Postabled
  class ScalarPropertyBase extends Base {
    static readonly POSTABLE_TYPE = 'olive.property.Scalar'
    // interpolate(lhs: ScalarKeyframeValueBase, rhs: ScalarKeyframeValueBase, t: number): ScalarKeyframeValueBase {
    //   return new ScalarKeyframeValueBase(lhs.value + (rhs.value - lhs.value) * t);
    // }
  };
  return ScalarPropertyBase;
}
@Postabled
export class ScalarPropertyBase extends WithScalarPropertyBase(PropertyBase) {}