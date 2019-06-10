import { Posted } from "worker-postable";
import { WithVideoMediaTrackItemBase } from "internal/timeline/common/track-item/video-media-track-item";
import { VideoTrackItemRenderer } from "internal/timeline/renderer/track-item/video-track-item";

@Posted
export class VideoMediaTrackItemRenderer extends WithVideoMediaTrackItemBase(VideoTrackItemRenderer) {

}