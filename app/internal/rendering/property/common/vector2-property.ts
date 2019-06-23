import { KeyframeValueBaseConstructor, KeyframeValueBase } from "internal/rendering/property/common/keyframe-value";
import { postable, Postabled } from "worker-postable";
import { PropertyBaseConstructor, PropertyBase } from "internal/rendering/property/common/property";
import { interpolate } from "base/olive/interpolate";

export function WithVector2KeyframeValueBase<TBase extends KeyframeValueBaseConstructor>(Base: TBase) {
  @Postabled
  class Vector2KeyframeValueBase extends Base {
    static readonly TYPE = 'olive.property.keyframe.value.Vector2'
    static readonly POSTABLE_TYPE = Vector2KeyframeValueBase.TYPE;
    @postable protected x_: number;
    public get x() { return this.x_; }
    @postable protected y_: number;
    public get y() { return this.y_; }
  }
  return Vector2KeyframeValueBase;
}
@Postabled
export class Vector2KeyframeValueBase extends WithVector2KeyframeValueBase(KeyframeValueBase) {
  interpolate(lhs: Vector2KeyframeValueBase, rhs: Vector2KeyframeValueBase, t: number): Vector2KeyframeValueBase {
    const x = interpolate(lhs.x, lhs.y, t);
    const y = interpolate(lhs.x, lhs.y, t);
    const value = new Vector2KeyframeValueBase(Vector2KeyframeValueBase.TYPE);
    value.x_ = x;
    value.y_ = y;
    return value;
  }
}

export function WithVector2PropertyBase<TBase extends PropertyBaseConstructor>(Base: TBase) { 
  @Postabled
  class Vector2PropertyBase extends Base {
    static readonly TYPE = 'olive.property.Vector2'
    static readonly POSTABLE_TYPE = Vector2PropertyBase.TYPE;
    // interpolate(lhs: Vector2KeyframeValueBase, rhs: Vector2KeyframeValueBase, t: number): Vector2KeyframeValueBase {
    //   return new Vector2KeyframeValueBase(lhs.value + (rhs.value - lhs.value) * t);
    // }
  };
  return Vector2PropertyBase;
}
@Postabled
export class Vector2PropertyBase extends WithVector2PropertyBase(PropertyBase) {}