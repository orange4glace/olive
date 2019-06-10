import { DrawingVideoRenderer } from "internal/renderer/video-renderer/rendering/drawing/drawing";
import { VideoDrawingBase } from "internal/rendering/drawing/video-drawing";
import { TransformEffectRenderer } from "internal/renderer/base/rendering/effect/video-effect/transform-effect";

export abstract class VideoDrawingVideoRenderer
    extends DrawingVideoRenderer {
  transformEffect: TransformEffectRenderer;
}