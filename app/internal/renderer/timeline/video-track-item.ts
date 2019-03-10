import { VideoTrackItemBase } from "internal/timeline";
import { TrackItemRenderer } from "./track-item";
import { Posted } from "worker-postable";

@Posted('VideoTrackItem')
export class VideoTrackItemRenderer extends TrackItemRenderer
    implements VideoTrackItemBase {
  
}