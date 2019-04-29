import { VideoEffectRenderer } from "internal/renderer/rendering/effect/video-effect/video-effect";
import { TransformEffectBase } from "internal/rendering/effect/video-effect/transform-effect";
import { Vector2PropertyRenderer } from "internal/renderer/rendering/property/vector2-property";
import { Posted } from "worker-postable";

@Posted('TransformEffect')
export class TransformEffectRenderer extends VideoEffectRenderer implements TransformEffectBase {
  position: Vector2PropertyRenderer;
  scale: Vector2PropertyRenderer;
}