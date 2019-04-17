import { PropertyBase, Property } from "./property";
import { Postable } from "worker-postable";
import PostableVector2 from "util/postable_vector2";

export interface Vector2PropertyBase extends PropertyBase<PostableVector2> {
}

@Postable
export class Vector2Property extends Property<PostableVector2> implements Vector2PropertyBase {

  constructor(defaultValue: PostableVector2) {
    super('VECTOR2', defaultValue);
  }

  createValue(x: number, y: number): PostableVector2 {
    return new PostableVector2(x, y);
  }

  cloneValue(value: PostableVector2): PostableVector2 {
    return new PostableVector2(value.x, value.y);
  }

  interpolate(lhs: PostableVector2, rhs: PostableVector2, t: number): PostableVector2 {
    return new PostableVector2(
      lhs.x + (rhs.x - lhs.x) * t,
      lhs.y + (rhs.y - lhs.y) * t);
  }

}