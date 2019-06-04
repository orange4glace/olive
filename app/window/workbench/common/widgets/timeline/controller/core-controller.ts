import { TimelineWidgetTrackViewModel } from "window/workbench/common/widgets/timeline/model/track-view-model";
import { TimelineWidgetTrackItemViewModel } from "window/workbench/common/widgets/timeline/model/track-item-view-model";
import { IDisposable } from "base/common/lifecycle";
import { StandardMouseEvent } from "base/browser/mouseEvent";

export abstract class TimelineWidgetCoreController implements IDisposable {
  abstract trackDragOverHandler(trackVM: TimelineWidgetTrackViewModel, e: StandardMouseEvent): void;
  abstract trackDragLeaveHandler(trackVM: TimelineWidgetTrackViewModel, e: StandardMouseEvent): void;
  abstract trackDropHandler(trackVM: TimelineWidgetTrackViewModel, e: StandardMouseEvent): void;

  abstract dispose(): void;
}