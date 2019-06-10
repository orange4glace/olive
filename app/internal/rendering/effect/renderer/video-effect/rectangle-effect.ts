import { Posted } from "worker-postable";
import { WithRectangleEffectBase } from "internal/rendering/effect/common/video-effect/rectangle-effect";
import { VideoEffectRenderer } from "internal/rendering/effect/renderer/video-effect/video-effect";

@Posted
export class RectangleEffectRenderer extends WithRectangleEffectBase(VideoEffectRenderer) {
}