import { VideoEffectBaseConstructor, VideoEffectBase } from "internal/rendering/effect/common/video-effect/video-effect";
import { postable, Postabled } from "worker-postable";
import { Vector4PropertyBase } from "internal/rendering/property/common/vector4-property";

export function WithRectangleEffectBase<T extends VideoEffectBaseConstructor>(Base: T) { 
  @Postabled
  class TransformEffectBase extends Base {
    static readonly TYPE = 'olive.effect.TransformEffect';
    static readonly POSTABLE_TYPE = TransformEffectBase.TYPE;
    @postable protected size_: Vector4PropertyBase;
    public get size() { return this.size_; }
  };
  return TransformEffectBase;
}
@Postabled
export class RectangleEffectBase extends WithRectangleEffectBase(VideoEffectBase) {}