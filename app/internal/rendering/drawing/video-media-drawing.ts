import { VideoDrawing, VideoDrawingBase } from "./video-drawing";
import { Postable, postable } from "worker-postable";
import { VideoResourceBase, IVideoResource } from "internal/resource/video-resource";

export interface VideoMediaDrawingBase extends VideoDrawingBase {

  resource: VideoResourceBase;

}

@Postable
export class VideoMediaDrawing extends VideoDrawing {

  static readonly TYPE = 'olive.rendering.drawing.VideoMedia'

  @postable resource: IVideoResource;

  constructor(resource: IVideoResource) {
    super(VideoMediaDrawing.TYPE);
    this.resource = resource;
  }

}