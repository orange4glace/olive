import { DrawingRenderer } from "internal/renderer/rendering/drawing/drawing";
import { VideoDrawingBase } from "internal/rendering/drawing/video-drawing";
import { TransformEffectRenderer } from "internal/renderer/rendering/effect/video-effect/transform-effect";

export abstract class VideoDrawingRenderer extends DrawingRenderer implements VideoDrawingBase {
  transformEffect: TransformEffectRenderer;
}