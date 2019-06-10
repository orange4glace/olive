import { KeyframeValueBaseConstructor, KeyframeValueBase } from "internal/rendering/property/common/keyframe-value";
import { postable, Postabled } from "worker-postable";
import { PropertyBaseConstructor, PropertyBase } from "internal/rendering/property/common/property";

export function WithVector2KeyframeValueBase<TBase extends KeyframeValueBaseConstructor>(Base: TBase) {
  @Postabled
  class Vector2KeyframeValueBase extends Base {
    static readonly TYPE = 'olive.property.keyframe.value.Vector2'
    @postable protected x_: number;
    public get x() { return this.x_; }
    @postable protected y_: number;
    public get y() { return this.y_; }
  }
  return Vector2KeyframeValueBase;
}
@Postabled
export class Vector2KeyframeValueBase extends WithVector2KeyframeValueBase(KeyframeValueBase) {}

export function WithVector2PropertyBase<TBase extends PropertyBaseConstructor>(Base: TBase) { 
  @Postabled
  class Vector2PropertyBase extends Base {
    // interpolate(lhs: Vector2KeyframeValueBase, rhs: Vector2KeyframeValueBase, t: number): Vector2KeyframeValueBase {
    //   return new Vector2KeyframeValueBase(lhs.value + (rhs.value - lhs.value) * t);
    // }
  };
  return Vector2PropertyBase;
}
@Postabled
export class Vector2PropertyBase extends WithVector2PropertyBase(PropertyBase) {}