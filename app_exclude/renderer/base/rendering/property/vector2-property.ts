import { PropertyRenderer } from "internal/renderer/base/rendering/property/property";
import { Vector2Renderer } from "oliveutil/vector2";
import { Vector2PropertyBase, Vector2KeyframeValue } from "internal/rendering/property/base/vector2-property";
import { Posted } from "worker-postable";

@Posted('Vector2Property')
export class Vector2PropertyRenderer extends PropertyRenderer<Vector2KeyframeValue>
    implements Vector2PropertyBase {

  interpolate(lhs: Vector2KeyframeValue, rhs: Vector2KeyframeValue, t: number): Vector2KeyframeValue {
    return new Vector2KeyframeValue(
      lhs.x + (rhs.x - lhs.x) * t,
      lhs.y + (rhs.y - lhs.y) * t);
  }
}