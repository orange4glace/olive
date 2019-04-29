import { Disposable } from "base/common/lifecycle";
import { TimelineWidgetTrackUIEvent, TimelineWidgetTrackItemUIEvent, TimelineWidgetTrackItemThumbUIEvent } from "window/view/timeline/event";

export interface EventCallback<T> {
	(event: T): void;
}

export class TimelineWidgetViewOutgoingEvents extends Disposable {

  // UI Event
  onTrackItemMouseDown: EventCallback<TimelineWidgetTrackItemUIEvent>;
  onTrackItemMouseMoveStart: EventCallback<TimelineWidgetTrackItemUIEvent>;
  onTrackItemThumbMouseMoveStart: EventCallback<TimelineWidgetTrackItemThumbUIEvent>;
  onTrackMouseMove: EventCallback<TimelineWidgetTrackUIEvent>;
  onTrackDragOver: EventCallback<TimelineWidgetTrackUIEvent>;
  onTrackDragLeave: EventCallback<TimelineWidgetTrackUIEvent>;
  onTrackDrop: EventCallback<TimelineWidgetTrackUIEvent>;

  constructor() {
    super();
  }

  emitTrackItemMouseDown(e: TimelineWidgetTrackItemUIEvent) {
    if (this.onTrackItemMouseDown) this.onTrackItemMouseDown(e);
  }

  emitTrackItemMouseMoveStart(e: TimelineWidgetTrackItemUIEvent) {
    if (this.onTrackItemMouseMoveStart) this.onTrackItemMouseMoveStart(e);
  }

  emitTrackItemThumbMouseMoveStart(e: TimelineWidgetTrackItemThumbUIEvent) {
    if (this.onTrackItemThumbMouseMoveStart) this.onTrackItemThumbMouseMoveStart(e);
  }

  emitTrackMouseMove(e: TimelineWidgetTrackUIEvent) {
    if (this.onTrackMouseMove) this.onTrackMouseMove(e);
  }

  emitTrackDragOver(e: TimelineWidgetTrackUIEvent) {
    if (this.onTrackDragOver) this.onTrackDragOver(e);
  }

  emitTrackDragLeave(e: TimelineWidgetTrackUIEvent) {
    if (this.onTrackDragLeave) this.onTrackDragLeave(e);
  }

  emitTrackDrop(e: TimelineWidgetTrackUIEvent) {
    if (this.onTrackDrop) this.onTrackDrop(e);
  }

}