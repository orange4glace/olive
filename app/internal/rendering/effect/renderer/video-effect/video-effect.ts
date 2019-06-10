import { Posted } from "worker-postable";
import { WithVideoEffectBase } from "internal/rendering/effect/common/video-effect/video-effect";
import { EffectRenderer } from "internal/rendering/effect/renderer/effect";

@Posted
export class VideoEffectRenderer extends WithVideoEffectBase(EffectRenderer) {

}