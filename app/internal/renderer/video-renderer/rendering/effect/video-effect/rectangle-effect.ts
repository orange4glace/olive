import { Posted } from "worker-postable";
import { RectangleEffectRenderer } from "internal/renderer/base/rendering/effect/video-effect/rectangle-effect";
import { Vector4PropertyRenderer } from "internal/renderer/base/rendering/property/vector4-property";

@Posted('RectangleEffect')
export class RectangleEffectVideoRenderer extends RectangleEffectRenderer {
  size: Vector4PropertyRenderer;
}