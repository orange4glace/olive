import { TimelineWidgetManipulatorController } from "window/view/timeline/controller/manipulator";
import { Track } from "internal/timeline/track";
import { TrackItem } from "internal/timeline/track-item";

export abstract class TimelineWidgetController {
  readonly manipulator: TimelineWidgetManipulatorController;

  abstract trackDragOverHandler(track: Track, e: React.MouseEvent): void;
  abstract trackDragLeaveHandler(track: Track, e: React.MouseEvent): void;
  abstract trackDropHandler(track: Track, e: React.MouseEvent): void;
  abstract trackItemMouseDownHandler(track: Track, trackItem: TrackItem, e: React.MouseEvent): void;
}