import { KeyframeValueBaseConstructor, KeyframeValueBase } from "internal/rendering/property/common/keyframe-value";
import { postable, Postabled } from "worker-postable";
import { PropertyBaseConstructor, PropertyBase } from "internal/rendering/property/common/property";

export function WithVector4KeyframeValueBase<TBase extends KeyframeValueBaseConstructor>(Base: TBase) {
  @Postabled
  class Vector4KeyframeValueBase extends Base {
    static readonly TYPE = 'olive.property.keyframe.value.Vector4'
    static readonly POSTABLE_TYPE = Vector4KeyframeValueBase.TYPE;
    @postable protected x_: number;
    public get x() { return this.x_; }
    @postable protected y_: number;
    public get y() { return this.y_; }
    @postable protected z_: number;
    public get z() { return this.z_; }
    @postable protected w_: number;
    public get w() { return this.w_; }
  }
  return Vector4KeyframeValueBase;
}
@Postabled
export class Vector4KeyframeValueBase extends WithVector4KeyframeValueBase(KeyframeValueBase) {}

export function WithVector4PropertyBase<TBase extends PropertyBaseConstructor>(Base: TBase) { 
  @Postabled
  class Vector4PropertyBase extends Base {
    static readonly TYPE = 'olive.property.Vector4'
    static readonly POSTABLE_TYPE = Vector4PropertyBase.TYPE;
    // interpolate(lhs: Vector4KeyframeValueBase, rhs: Vector4KeyframeValueBase, t: number): Vector4KeyframeValueBase {
    //   return new Vector4KeyframeValueBase(lhs.value + (rhs.value - lhs.value) * t);
    // }
  };
  return Vector4PropertyBase;
}
@Postabled
export class Vector4PropertyBase extends WithVector4PropertyBase(PropertyBase) {}