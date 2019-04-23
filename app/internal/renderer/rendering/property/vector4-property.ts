import { Posted } from "worker-postable";
import { Vector4Renderer } from "oliveutil/vector4";
import { PropertyRenderer } from "internal/renderer/rendering/property/property";
import { Vector4PropertyBase } from "internal/rendering/property/vector4-property";

@Posted('Vector4Property')
export class Vector4PropertyRenderer extends PropertyRenderer<Vector4Renderer> implements Vector4PropertyBase {
  
  interpolate(lhs: Vector4Renderer, rhs: Vector4Renderer, t: number): Vector4Renderer {
    return new Vector4Renderer(
      lhs.x + (rhs.x - lhs.x) * t,
      lhs.y + (rhs.y - lhs.y) * t,
      lhs.z + (rhs.z - lhs.z) * t,
      lhs.w + (rhs.w - lhs.w) * t);
  }
}