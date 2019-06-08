import { Vector4Renderer } from "oliveutil/vector4";
import { Vector4PropertyBase, Vector4KeyframeValue } from "internal/rendering/property/vector4-property";
import { Posted } from "worker-postable";
import { PropertyRenderer } from "internal/renderer/base/rendering/property/property";

@Posted('Vector4Property')
export class Vector4PropertyRenderer extends PropertyRenderer<Vector4KeyframeValue>
    implements Vector4PropertyBase {
  
  interpolate(lhs: Vector4KeyframeValue, rhs: Vector4KeyframeValue, t: number): Vector4KeyframeValue {
    return new Vector4KeyframeValue(
      lhs.x + (rhs.x - lhs.x) * t,
      lhs.y + (rhs.y - lhs.y) * t,
      lhs.z + (rhs.z - lhs.z) * t,
      lhs.w + (rhs.w - lhs.w) * t);
  }
}