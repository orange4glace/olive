import { DrawingRenderer } from "internal/renderer/base/rendering/drawing/drawing";
import { TransformEffectRenderer } from "internal/renderer/base/rendering/effect/video-effect/transform-effect";
import { AudioDrawingBase } from "internal/rendering/drawing/base/audio-drawing";

export abstract class AudioDrawingRenderer extends DrawingRenderer implements AudioDrawingBase {

}