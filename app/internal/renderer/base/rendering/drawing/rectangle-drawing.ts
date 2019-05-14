import { Posted } from "worker-postable";
import { RectangleDrawingBase } from "internal/rendering/drawing/rectangle-drawing";
import { VideoDrawingRenderer } from "internal/renderer/base/rendering/drawing/video-drawing";
import { RectangleEffectRenderer } from "internal/renderer/base/rendering/effect/video-effect/rectangle-effect";

@Posted('RectangleDrawing')
export class RectangleDrawingRenderer extends VideoDrawingRenderer
    implements RectangleDrawingBase {

  /*@postable*/ rectangleEffect: RectangleEffectRenderer;

}