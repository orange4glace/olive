import { PropertyBase, Property } from "./property";
import { Postable } from "worker-postable";
import { Vector2, Vector2Base } from "oliveutil/vector2";

export interface Vector2PropertyBase extends PropertyBase<Vector2Base> {
}

@Postable
export class Vector2Property extends Property<Vector2> implements Vector2PropertyBase {

  constructor(defaultValue: Vector2) {
    super('VECTOR2', defaultValue);
  }

  createValue(x: number, y: number): Vector2 {
    return new Vector2(x, y);
  }

  cloneValue(value: Vector2): Vector2 {
    return new Vector2(value.x, value.y);
  }

  interpolate(lhs: Vector2, rhs: Vector2, t: number): Vector2 {
    return new Vector2(
      lhs.x + (rhs.x - lhs.x) * t,
      lhs.y + (rhs.y - lhs.y) * t);
  }

}