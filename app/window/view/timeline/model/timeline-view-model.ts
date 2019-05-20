import { TimelineWidgetTrackItemViewModel } from "window/view/timeline/model/track-item-view-model";
import { TimelineWidgetTrackViewModel } from "window/view/timeline/model/track-view-model";
import { ViewModel } from "window/view/view-model";
import { TimelineWidgetScrollViewModel } from "window/view/timeline/model/scroll-view-model";
import { TimelineWidgetGhostViewModel } from "window/view/timeline/model/ghost-view-model";
import { TrackItem } from "internal/timeline/track-item";
import { StandardMouseEvent } from "base/view/mouseEvent";
import { Event } from "base/common/event";
import { Timeline } from "internal/timeline/timeline";

export interface TimelineViewModelTrackItemEvent {
  trackViewModel: TimelineWidgetTrackViewModel;
  trackItemViewModel: TimelineWidgetTrackItemViewModel;
}

export interface TimelineWidgetTimelineViewModel extends ViewModel {

  readonly timeline: Timeline;

  onTrackItemFocused: Event<TimelineViewModelTrackItemEvent>;
  onTrackItemBlured: Event<TimelineViewModelTrackItemEvent>;

  /*@observable*/ readonly trackViewModels: ReadonlyArray<TimelineWidgetTrackViewModel>;
  readonly scrollViewModel: TimelineWidgetScrollViewModel;
  readonly ghostViewModel: TimelineWidgetGhostViewModel;

  seekTo(time: number): void;
  /*@observable*/ readonly currentTime: number;

  getTrackViewModelIndex(vm: TimelineWidgetTrackViewModel): number;

  getFocusedTrackItems(): ReadonlySet<TrackItem>;
  blurAllTrackItems(): void;
  
  getClosestTime(time: number): number;

  /*@observable*/ getTimeRelativeToTimeline(px: number): number;
  /*@observable*/ getTimeAmountRelativeToTimeline(px: number): number;
  /*@observable*/ getPositionRelativeToTimeline(time: number): number;
  /*@observable*/ getPixelAmountRelativeToTimeline(time: number): number;
  /*@observable*/ getMousePostionRelativeToTimeline(e: MouseEvent | React.MouseEvent | StandardMouseEvent): {x: number, y: number};

}