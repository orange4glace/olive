import { TrackItemBase } from "internal/timeline/track-item/track-item";
import { TrackItemTimeRenderer } from "internal/renderer/video-renderer/timeline/track-item-time";
import { TrackItemType } from "internal/timeline/track-item/track-item-type";

export abstract class TrackItemRenderer implements TrackItemBase {
  type: TrackItemType;
  time: TrackItemTimeRenderer;
}