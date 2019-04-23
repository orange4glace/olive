import { Event, Emitter } from "base/common/event";
import { Timeline } from "internal/timeline/timeline";
import { TrackItem } from "internal/timeline/track-item";

export interface TimelineWidgetFocusedTrackItemsChangedEvent {
  timeline: Timeline;
  trackItems: ReadonlySet<TrackItem>;
}

export class TimelineWidgetEvent {

  static readonly focusedTrackItemsChanged: Emitter<TimelineWidgetFocusedTrackItemsChangedEvent>
      = new Emitter();
  static readonly onFocusedTrackItemsChanged: Event<TimelineWidgetFocusedTrackItemsChangedEvent>
      = TimelineWidgetEvent.focusedTrackItemsChanged.event;

}