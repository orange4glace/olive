import { WithVideoTrackItemBase } from "internal/timeline/common/track-item/video-track-item";
import { TrackItemVideoRenderer } from "internal/timeline/video-renderer/track-item/track-item";
import { VideoDrawingVideoRenderer } from "internal/rendering/drawing/video-renderer/video-drawing";
import { Posted } from "worker-postable";

@Posted
export class VideoTrackItemVideoRenderer extends WithVideoTrackItemBase(TrackItemVideoRenderer) {

  protected drawing_: VideoDrawingVideoRenderer;
  public get drawing() { return this.drawing_; }

}