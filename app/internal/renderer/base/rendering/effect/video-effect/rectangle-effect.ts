import { Vector4PropertyRenderer } from "internal/renderer/base/rendering/property/vector4-property";
import { VideoEffectRenderer } from "internal/renderer/base/rendering/effect/video-effect/video-effect";
import { RectangleEffectBase } from "internal/rendering/effect/video-effect/rectangle-effect";
import { Posted } from "worker-postable";

@Posted('RectangleEffect')
export class RectangleEffectRenderer extends VideoEffectRenderer implements RectangleEffectBase {
  size: Vector4PropertyRenderer;
}