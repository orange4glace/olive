import { VideoDrawing } from "internal/rendering/drawing/video-drawing";
import { postable, Postable } from "worker-postable";
import { RectangleEffect, RectangleEffectBase } from "internal/rendering/effect/video-effect/rectangle-effect";
import { DrawingBase, DrawingType } from "internal/rendering/drawing/drawing";
import { clone } from "base/common/cloneable";

export interface RectangleDrawingBase extends DrawingBase {
  rectangleEffect: RectangleEffectBase;
}

@Postable
export class RectangleDrawing extends VideoDrawing {

  @postable rectangleEffect: RectangleEffect;

  constructor() {
    super(DrawingType.RECTANGLE);
    this.rectangleEffect = new RectangleEffect();
  }

  clone(obj: RectangleDrawing): Object {
    super.clone(obj);
    obj.rectangleEffect = clone(this.rectangleEffect);
    return obj;
  }

}