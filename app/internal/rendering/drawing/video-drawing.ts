import { Drawing } from "./drawing";
import { VideoEffect } from "../effect/video-effect/video-effect";

export class VideoDrawing extends Drawing {

  private effects_: VideoEffect[] = [];

  addEffect(effect: VideoEffect) {
    this.effects_.push(effect);
  }

}