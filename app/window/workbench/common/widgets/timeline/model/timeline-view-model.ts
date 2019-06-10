import { TimelineWidgetTrackItemViewModel } from "window/workbench/common/widgets/timeline/model/track-item-view-model";
import { TimelineWidgetTrackViewModel } from "window/workbench/common/widgets/timeline/model/track-view-model";
import { ViewModel } from "window/view/view-model";
import { TimelineWidgetScrollViewModel } from "window/workbench/common/widgets/timeline/model/scroll-view-model";
import { TimelineWidgetGhostViewModel } from "window/workbench/common/widgets/timeline/model/ghost-view-model";
import { StandardMouseEvent } from "base/browser/mouseEvent";
import { Event } from "base/common/event";
import { ITrackItem } from "internal/timeline/base/track-item/track-item";
import { ITimeline } from "internal/timeline/base/timeline";

export interface TimelineViewModelTrackItemEvent {
  trackViewModel: TimelineWidgetTrackViewModel;
  trackItemViewModel: TimelineWidgetTrackItemViewModel;
}

export interface TimelineWidgetTimelineViewModel extends ViewModel {

  readonly timeline: ITimeline;

  onTrackItemFocused: Event<TimelineViewModelTrackItemEvent>;
  onTrackItemBlured: Event<TimelineViewModelTrackItemEvent>;

  /*@observable*/ readonly trackViewModels: ReadonlyArray<TimelineWidgetTrackViewModel>;
  readonly scrollViewModel: TimelineWidgetScrollViewModel;
  readonly ghostViewModel: TimelineWidgetGhostViewModel;

  seekTo(time: number): void;
  /*@observable*/ readonly currentTime: number;

  getTrackViewModelIndex(vm: TimelineWidgetTrackViewModel): number;

  getFocusedTrackItems(): ReadonlySet<ITrackItem>;
  blurAllTrackItems(): void;
  
  getClosestTime(time: number): number;

  /*@observable*/ getTimeRelativeToTimeline(px: number): number;
  /*@observable*/ getTimeAmountRelativeToTimeline(px: number): number;
  /*@observable*/ getPositionRelativeToTimeline(time: number): number;
  /*@observable*/ getPixelAmountRelativeToTimeline(time: number): number;
  /*@observable*/ getMousePostionRelativeToTimeline(e: MouseEvent | React.MouseEvent | StandardMouseEvent): {x: number, y: number};

}