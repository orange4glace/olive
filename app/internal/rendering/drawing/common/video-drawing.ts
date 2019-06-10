import { DrawingBaseConstructor, DrawingBase } from "internal/rendering/drawing/common/drawing";
import { TransformEffectBase } from "internal/rendering/effect/common/video-effect/trasnform-effect";
import { postable, Postabled } from "worker-postable";

export type VideoDrawingBaseConstructor = new (...args: any[]) => VideoDrawingBase;
export function WithVideoDrawingBase<T extends DrawingBaseConstructor>(Base: T) { 
  @Postabled
  class VideoDrawingBase extends Base {
    @postable protected transformEffect_: TransformEffectBase;
    public get transformEffect() { return this.transformEffect_; }
  };
  return VideoDrawingBase;
}
@Postabled
export class VideoDrawingBase extends WithVideoDrawingBase(DrawingBase) {}