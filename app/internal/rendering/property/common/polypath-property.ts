import { KeyframeValueBaseConstructor, KeyframeValueBase } from "internal/rendering/property/common/keyframe-value";
import { postable, Postabled } from "worker-postable";
import { PropertyBaseConstructor, PropertyBase } from "internal/rendering/property/common/property";

export type PolypathPoint = {
  x: number;
  y: number;
}

export function WithPolypathKeyframeValueBase<TBase extends KeyframeValueBaseConstructor>(Base: TBase) {
  @Postabled
  class PolypathKeyframeValueBase extends Base {
    static readonly TYPE = 'olive.property.keyframe.value.Polypath'
    static readonly POSTABLE_TYPE = PolypathKeyframeValueBase.TYPE;
    @postable protected points_: PolypathPoint[];
    public get points() { return this.points_; }
  }
  return PolypathKeyframeValueBase;
}
@Postabled
export class PolypathKeyframeValueBase extends WithPolypathKeyframeValueBase(KeyframeValueBase) {}

export function WithPolypathPropertyBase<TBase extends PropertyBaseConstructor>(Base: TBase) { 
  @Postabled
  class PolypathPropertyBase extends Base {
    static readonly TYPE = 'olive.property.Polypath'
    static readonly POSTABLE_TYPE = PolypathPropertyBase.TYPE;
    // interpolate(lhs: PolypathKeyframeValueBase, rhs: PolypathKeyframeValueBase, t: number): PolypathKeyframeValueBase {
    //   return new PolypathKeyframeValueBase(lhs.value + (rhs.value - lhs.value) * t);
    // }
  };
  return PolypathPropertyBase;
}
@Postabled
export class PolypathPropertyBase extends WithPolypathPropertyBase(PropertyBase) {}