import { Posted } from "worker-postable";
import { TransformEffectRenderer } from "internal/renderer/base/rendering/effect/video-effect/transform-effect";
import { Vector2PropertyRenderer } from "internal/renderer/base/rendering/property/vector2-property";

@Posted('TransformEffect')
export class TransformEffectVideoRenderer extends TransformEffectRenderer {
  position: Vector2PropertyRenderer;
  scale: Vector2PropertyRenderer;
}