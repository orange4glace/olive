import { Widget } from "window/view/widget";
import { TimelineWidgetTimelineViewModel } from "window/view/timeline/model/timeline-view-model";
import { Event } from "base/common/event";
import { Timeline } from "internal/timeline/timeline";
import { TrackItem } from "internal/timeline/track-item";
import { TimelineWidgetTrackUIEvent, TimelineWidgetTrackItemUIEvent, TimelineWidgetTrackItemEvent, TimelineWidgetTrackItemThumbUIEvent } from "window/view/timeline/event";
import { TimelineWidgetViewOutgoingEvents } from "window/view/timeline/view-outgoing-events";

export interface TimelineWidget extends Widget {

  readonly timeline: Timeline;

  // UI Event
  onTrackItemMouseDown: Event<TimelineWidgetTrackItemUIEvent>;
  onTrackItemMouseMoveStart: Event<TimelineWidgetTrackItemUIEvent>;
  onTrackItemThumbMouseMoveStart: Event<TimelineWidgetTrackItemThumbUIEvent>;
  onTrackMouseMove: Event<TimelineWidgetTrackUIEvent>;
  onTrackDragOver: Event<TimelineWidgetTrackUIEvent>;
  onTrackDragLeave: Event<TimelineWidgetTrackUIEvent>;
  onTrackDrop: Event<TimelineWidgetTrackUIEvent>;

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