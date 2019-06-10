import { EffectBaseConstructor, EffectBase } from "internal/rendering/effect/common/effect";
import { postable, Postabled } from "worker-postable";

export type VideoEffectBaseConstructor = new (...args: any[]) => VideoEffectBase;
export function WithVideoEffectBase<T extends EffectBaseConstructor>(Base: T) { 
  @Postabled
  class VideoEffectBase extends Base {
    static readonly POSTABLE_TYPE = 'olive.effect.VideoEffect';
    @postable protected width_: number;
    public get width() { return this.width_; }
    @postable protected height_: number;
    public get height() { return this.height_; }
  };
  return VideoEffectBase;
}
@Postabled
export class VideoEffectBase extends WithVideoEffectBase(EffectBase) {}