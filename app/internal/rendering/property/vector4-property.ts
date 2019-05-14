import { PropertyBase, Property } from "./property";
import { Postable } from "worker-postable";
import { Vector4, Vector4Base } from "oliveutil/vector4";

export interface Vector4PropertyBase extends PropertyBase<Vector4Base> {
}

@Postable
export class Vector4Property extends Property<Vector4> implements Vector4PropertyBase {

  constructor(defaultValue: Vector4) {
    super('VECTOR4', defaultValue);
    this.animatable = true;
  }

  createValue(x: number, y: number, z: number, w : number): Vector4 {
    return new Vector4(x, y, z, w);
  }

  cloneValue(val: Vector4): Vector4 {
    return new Vector4(val.x, val.y, val.z, val.w);
  }

  interpolate(lhs: Vector4, rhs: Vector4, t: number): Vector4 {
    return new Vector4(
      lhs.x + (rhs.x - lhs.x) * t,
      lhs.y + (rhs.y - lhs.y) * t,
      lhs.z + (rhs.z - lhs.z) * t,
      lhs.w + (rhs.w - lhs.w) * t);
  }

}