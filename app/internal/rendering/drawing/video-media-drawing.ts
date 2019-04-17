import { TransformEffect } from "../effect/video-effect/transform-effect";
import { OpacityEffect } from "../effect/video-effect/opacity-effect";
import { VideoDrawing } from "./video-drawing";

export class VideoMediaDrawing extends VideoDrawing {

  constructor() {
    super();
    this.addEffect(new TransformEffect());
    this.addEffect(new OpacityEffect());
  }

}