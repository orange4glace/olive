import { Rendering, RenderingBase } from "./rendering";
import { VideoEffect } from "../effect/video-effect/video-effect";
import { VideoDrawing } from "../drawing/video-drawing";

export interface VideoRenderingBase extends RenderingBase {
}

export class VideoRendering extends Rendering implements VideoRenderingBase {

  effects: VideoEffect[] = [];
  drawings: VideoDrawing[] = [];

  addEffect(effect: VideoEffect) {
    this.effects.push(effect);
  }

  addDrawing(drawing: VideoDrawing) {
    this.drawings.push(drawing);
  }

}