import { TrackItemBase } from "internal/timeline/track-item/track-item";
import { TrackItemTimeRenderer } from "internal/renderer/video-renderer/timeline/track-item-time";

export abstract class TrackItemRenderer implements TrackItemBase {
  type: string;
  time: TrackItemTimeRenderer;
}