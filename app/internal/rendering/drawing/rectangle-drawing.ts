import { VideoDrawing } from "internal/rendering/drawing/video-drawing";
import { postable } from "worker-postable";
import { RectangleEffect, RectangleEffectBase } from "internal/rendering/effect/video-effect/rectangle-effect";
import { DrawingBase, DrawingType } from "internal/rendering/drawing/drawing";

export interface RectangleDrawingBase extends DrawingBase {
  rectangleEffect: RectangleEffectBase;
}

export class RectangleDrawing extends VideoDrawing {

  @postable rectangleEffect: RectangleEffect;

  constructor() {
    super(DrawingType.RECTANGLE);
    this.rectangleEffect = new RectangleEffect();
  }

}