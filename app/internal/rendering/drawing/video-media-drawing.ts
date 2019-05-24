import { TransformEffect } from "../effect/video-effect/transform-effect";
import { OpacityEffect } from "../effect/video-effect/opacity-effect";
import { VideoDrawing, VideoDrawingBase } from "./video-drawing";
import { Postable, postable } from "worker-postable";
import { DrawingType } from "internal/rendering/drawing/drawing";
import { VideoResourceBase, IVideoResource } from "internal/resource/video-resource";

export interface VideoMediaDrawingBase extends VideoDrawingBase {

  resource: VideoResourceBase;

}

@Postable
export class VideoMediaDrawing extends VideoDrawing {

  @postable resource: IVideoResource;

  constructor(resource: IVideoResource) {
    super(DrawingType.VIDEO_MEDIA);
    this.resource = resource;
  }

}