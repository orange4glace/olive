import { TransformEffect } from "../effect/video-effect/transform-effect";
import { OpacityEffect } from "../effect/video-effect/opacity-effect";
import { VideoDrawing } from "./video-drawing";
import { Postable } from "worker-postable";
import { DrawingType } from "internal/rendering/drawing/drawing";

@Postable
export class VideoMediaDrawing extends VideoDrawing {

  constructor() {
    super(DrawingType.VIDEO_MEDIA);
  }

}