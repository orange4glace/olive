import { VideoDrawingRenderer } from "internal/renderer/rendering/drawing/video-drawing";
import { RectangleDrawingBase } from "internal/rendering/drawing/rectangle-drawing";
import { RectangleEffectRenderer } from "internal/renderer/rendering/effect/video-effect/rectangle-effect";
import { Posted } from "worker-postable";

@Posted('RectangleDrawing')
export class RectangleDrawingRenderer extends VideoDrawingRenderer
    implements RectangleDrawingBase {

  rectangleEffect: RectangleEffectRenderer;

}