import { VideoDrawingBaseConstructor, VideoDrawingBase } from "internal/rendering/drawing/common/video-drawing";
import { postable, Postabled } from "worker-postable";
import { VideoResourceBase } from "internal/resource/common/video-resource";

export function WithVideoMediaDrawingBase<T extends VideoDrawingBaseConstructor>(Base: T) { 
  @Postabled
  class VideoMediaDrawingBase extends Base {
    static readonly TYPE = 'olive.drawing.VideoMedia'
    
    @postable protected resource_: VideoResourceBase;
    public get resource() { return this.resource_; }
  };
  return VideoMediaDrawingBase;
}
@Postabled
export class VideoMediaDrawingBase extends WithVideoMediaDrawingBase(VideoDrawingBase) {}