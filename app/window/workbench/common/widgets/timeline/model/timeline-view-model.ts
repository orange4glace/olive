// import { TimelineWidgetTrackItemViewModel } from "window/workbench/common/widgets/timeline/model/track/track-item-view";
// import { ViewModel } from "window/view/view-model";
// import { TimelineWidgetGhostViewModel } from "window/workbench/common/widgets/timeline/model/ghost-view-model";
// import { StandardMouseEvent } from "base/browser/mouseEvent";
// import { Event } from "base/common/event";
// import { ITrackItem } from "internal/timeline/base/track-item/track-item";
// import { ITimeline } from "internal/timeline/base/timeline";
// import { TimelineScrollView } from "window/workbench/common/widgets/timeline/model/scroll-view-model";

// export interface TimelineViewModelTrackItemEvent {
//   trackViewModel: TimelineWidgetTrackViewModel;
//   trackItemViewModel: TimelineWidgetTrackItemViewModel;
// }

// export interface TimelineWidgetTimelineViewModel extends ViewModel {

//   readonly timeline: ITimeline;

//   onTrackItemFocused: Event<TimelineViewModelTrackItemEvent>;
//   onTrackItemBlured: Event<TimelineViewModelTrackItemEvent>;

//   /*@observable*/ readonly trackViewModels: ReadonlyArray<TimelineTrackView>;
//   readonly scrollViewModel: TimelineScrollView;
//   readonly ghostViewModel: TimelineWidgetGhostViewModel;

//   seekTo(time: number): void;
//   /*@observable*/ readonly currentTime: number;

//   addTrack(): void;
//   getTrackViewModelIndex(vm: TimelineWidgetTrackViewModel): number;

//   getFocusedTrackItems(): ReadonlySet<ITrackItem>;
//   blurAllTrackItems(): void;
  
//   getClosestTime(time: number): number;

// }