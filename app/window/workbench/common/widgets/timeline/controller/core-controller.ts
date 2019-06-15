import { TimelineWidgetTrackItemViewModel } from "window/workbench/common/widgets/timeline/model/track/track-item-view";
import { IDisposable } from "base/common/lifecycle";
import { StandardMouseEvent } from "base/browser/mouseEvent";
import { ITrack } from "internal/timeline/base/track/track";

export abstract class TimelineWidgetCoreController implements IDisposable {
  abstract trackDragOverHandler(track: ITrack, e: StandardMouseEvent): void;
  abstract trackDragLeaveHandler(track: ITrack, e: StandardMouseEvent): void;
  abstract trackDropHandler(track: ITrack, e: StandardMouseEvent): void;

  abstract dispose(): void;
}