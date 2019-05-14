import { PropertyRenderer } from "internal/renderer/base/rendering/property/property";
import { Vector2Renderer } from "oliveutil/vector2";
import { Vector2PropertyBase } from "internal/rendering/property/vector2-property";
import { Posted } from "worker-postable";

@Posted('Vector2Property')
export class Vector2PropertyRenderer extends PropertyRenderer<Vector2Renderer>
    implements Vector2PropertyBase {

  interpolate(lhs: Vector2Renderer, rhs: Vector2Renderer, t: number): Vector2Renderer {
    return new Vector2Renderer(
      lhs.x + (rhs.x - lhs.x) * t,
      lhs.y + (rhs.y - lhs.y) * t);
  }
}