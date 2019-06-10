import { postable, Postabled } from "worker-postable";
import { RectangleEffectBase } from "internal/rendering/effect/common/video-effect/rectangle-effect";
import { VideoDrawingBaseConstructor, VideoDrawingBase } from "internal/rendering/drawing/common/video-drawing";

export function WithRectangleDrawingBase<T extends VideoDrawingBaseConstructor>(Base: T) { 
  @Postabled
  class RectangleDrawingBase extends Base {
    static readonly TYPE = 'olive.drawing.Rectangle';

    @postable protected rectangleEffect_: RectangleEffectBase;
    public get rectangleEffect() { return this.rectangleEffect_; }
  };
  return RectangleDrawingBase;
}
@Postabled
export class RectanlgeDrawingBase extends WithRectangleDrawingBase(VideoDrawingBase) {}