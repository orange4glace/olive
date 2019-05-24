import { Widget } from "window/view/widget";
import { Event } from "base/common/event";
import { Timeline, ITimeline } from "internal/timeline/timeline";
import { TrackItem } from "internal/timeline/track-item/track-item";
import { TimelineWidgetTrackUIEvent, TimelineWidgetTrackItemUIEvent, TimelineWidgetTrackItemEvent, TimelineWidgetTrackItemThumbUIEvent, TimelineWidgetTimelineUIEvent } from "window/view/timeline/event";
import { TimelineWidgetViewOutgoingEvents } from "window/view/timeline/view-outgoing-events";
import { TimelineWidgetTimelineViewModel } from "window/view/timeline/model/timeline-view-model";
import { ITimelineWidgetRangeSelector } from "window/view/timeline/model/range-selector";

export interface TimelineWidget extends Widget {

  readonly timeline: Timeline;

  // UI Event
  readonly onTrackItemMouseDown: Event<TimelineWidgetTrackItemUIEvent>;
  readonly onTrackItemMouseMoveStart: Event<TimelineWidgetTrackItemUIEvent>;
  readonly onTrackItemThumbMouseDown: Event<TimelineWidgetTrackItemThumbUIEvent>;
  readonly onTrackItemThumbMouseMoveStart: Event<TimelineWidgetTrackItemThumbUIEvent>;
  readonly onTrackMouseMove: Event<TimelineWidgetTrackUIEvent>;
  readonly onTrackDragOver: Event<TimelineWidgetTrackUIEvent>;
  readonly onTrackDragLeave: Event<TimelineWidgetTrackUIEvent>;
  readonly onTrackDrop: Event<TimelineWidgetTrackUIEvent>;
  readonly onTimelineMouseDown: Event<TimelineWidgetTimelineUIEvent>;

  readonly onFocused: Event<void>;
  readonly onTrackItemFocused: Event<TimelineWidgetTrackItemEvent>;
  readonly onTrackItemBlured: Event<TimelineWidgetTrackItemEvent>;

  /*@observable*/ readonly model: TimelineWidgetTimelineViewModel;
  readonly rangeSelector: ITimelineWidgetRangeSelector;

  setTimeline(timeline: ITimeline): void;

  registerViewOutgoingEvents(outingEvents: TimelineWidgetViewOutgoingEvents): void;

  getFocusedTrackItems(): ReadonlySet<TrackItem>;

  focus(): void;
  blur(): void;

  setActive(value: boolean): void;

}