import { Posted } from "worker-postable";
import { VideoDrawingRenderer } from "internal/renderer/base/rendering/drawing/video-drawing";
import { VideoMediaDrawingBase } from "internal/rendering/drawing/video-media-drawing";
import { VideoResourceRenderer } from "internal/renderer/base/resource";

@Posted('VideoMediaDrawing')
export class VideoMediaDrawingRenderer extends VideoDrawingRenderer
    implements VideoMediaDrawingBase {

  /*@postable*/ resource: VideoResourceRenderer;
  
}