import { Widget } from "window/view/widget";
import { Event } from "base/common/event";
import { Timeline } from "internal/timeline/timeline";
import { TrackItem } from "internal/timeline/track-item";
import { TimelineWidgetTrackUIEvent, TimelineWidgetTrackItemUIEvent, TimelineWidgetTrackItemEvent, TimelineWidgetTrackItemThumbUIEvent } from "window/view/timeline/event";
import { TimelineWidgetViewOutgoingEvents } from "window/view/timeline/view-outgoing-events";
import { TimelineWidgetTimelineViewModel } from "window/view/timeline/model/timeline-view-model";

export interface TimelineWidget extends Widget {

  readonly timeline: Timeline;

  // UI Event
  readonly onTrackItemMouseDown: Event<TimelineWidgetTrackItemUIEvent>;
  readonly onTrackItemMouseMoveStart: Event<TimelineWidgetTrackItemUIEvent>;
  readonly onTrackItemThumbMouseMoveStart: Event<TimelineWidgetTrackItemThumbUIEvent>;
  readonly onTrackMouseMove: Event<TimelineWidgetTrackUIEvent>;
  readonly onTrackDragOver: Event<TimelineWidgetTrackUIEvent>;
  readonly onTrackDragLeave: Event<TimelineWidgetTrackUIEvent>;
  readonly onTrackDrop: Event<TimelineWidgetTrackUIEvent>;

  readonly onFocused: Event<void>;
  readonly onTrackItemFocused: Event<TimelineWidgetTrackItemEvent>;
  readonly onTrackItemBlured: Event<TimelineWidgetTrackItemEvent>;

  readonly model: TimelineWidgetTimelineViewModel;

  registerViewOutgoingEvents(outingEvents: TimelineWidgetViewOutgoingEvents): void;

  getFocusedTrackItems(): ReadonlySet<TrackItem>;

  focus(): void;
  blur(): void;

  setActive(value: boolean): void;

}