import { TrackItemRenderer } from "internal/renderer/base/timeline/track-item/track-item";
import { VideoTrackItemBase } from "internal/timeline/common/track-item/video-track-item";
import { VideoDrawingRenderer } from "internal/renderer/base/rendering/drawing/video-drawing";

export abstract class VideoTrackItemRenderer
    <VideoDrawingRendererT extends VideoDrawingRenderer = VideoDrawingRenderer>
    extends TrackItemRenderer implements VideoTrackItemBase {
  
  /*@postable*/ drawing: VideoDrawingRendererT;

}