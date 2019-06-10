import { VideoDrawingBase } from "internal/rendering/drawing/video-drawing";
import { DrawingRenderer } from "internal/renderer/base/rendering/drawing/drawing";
import { TransformEffectRenderer } from "internal/renderer/base/rendering/effect/video-effect/transform-effect";

export abstract class VideoDrawingRenderer
    <TransformEffectRendererT extends TransformEffectRenderer = TransformEffectRenderer>
    extends DrawingRenderer implements VideoDrawingBase {

  /*@postable*/ transformEffect: TransformEffectRendererT;

}