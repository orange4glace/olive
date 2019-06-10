import { Posted } from "worker-postable";
import { VideoTrackItemRenderer } from "internal/renderer/base/timeline/track-item/video-track-item";
import { VideoMediaTrackItemBase } from "internal/timeline/common/track-item/video-media-track-item";
import { VideoResourceRenderer } from "internal/renderer/base/resource";

@Posted('VideoMediaTrackItemImpl')
export class VideoMediaTrackItemRenderer extends VideoTrackItemRenderer
    implements VideoMediaTrackItemBase {
  
  resource: VideoResourceRenderer;
}