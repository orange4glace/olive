import { VideoEffectBaseConstructor, VideoEffectBase } from "internal/rendering/effect/common/video-effect/video-effect";
import { postable, Postabled } from "worker-postable";
import { Vector2PropertyBase } from "internal/rendering/property/common/vector2-property";

export function WithTransformEffectBase<T extends VideoEffectBaseConstructor>(Base: T) { 
  @Postabled
  class TransformEffectBase extends Base {
    static readonly TYPE = 'olive.effect.RectangleEffect';
    static readonly POSTABLE_TYPE = TransformEffectBase.TYPE;
    @postable protected position_: Vector2PropertyBase;
    public get position() { return this.position_; }
    @postable protected scale_: Vector2PropertyBase;
    public get scale() { return this.scale_; }
  };
  return TransformEffectBase;
}
@Postabled
export class TransformEffectBase extends WithTransformEffectBase(VideoEffectBase) {}