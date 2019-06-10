import { Posted } from "worker-postable";
import { WithVideoTrackItemBase } from "internal/timeline/common/track-item/video-track-item";
import { TrackItemRenderer } from "internal/timeline/renderer/track-item/track-item";

@Posted
export class VideoTrackItemRenderer extends WithVideoTrackItemBase(TrackItemRenderer) {

}