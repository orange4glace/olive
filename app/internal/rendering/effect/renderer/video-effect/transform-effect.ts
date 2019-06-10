import { Posted } from "worker-postable";
import { VideoEffectRenderer } from "internal/rendering/effect/renderer/video-effect/video-effect";
import { WithTransformEffectBase } from "internal/rendering/effect/common/video-effect/trasnform-effect";

@Posted
export class TransformEffectRenderer extends WithTransformEffectBase(VideoEffectRenderer) {
}