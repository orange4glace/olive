import { VideoEffectRenderer } from "internal/renderer/rendering/effect/video-effect/video-effect";
import { Posted } from "worker-postable";
import { RectangleEffectBase } from "internal/rendering/effect/video-effect/rectangle-effect";
import { Vector4PropertyRenderer } from "internal/renderer/rendering/property/vector4-property";

@Posted('RectangleEffect')
export class RectangleEffectRenderer extends VideoEffectRenderer implements RectangleEffectBase {
  size: Vector4PropertyRenderer;
}