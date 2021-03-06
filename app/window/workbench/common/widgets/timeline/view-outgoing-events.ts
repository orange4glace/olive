import { Disposable } from "base/common/lifecycle";
import { TimelineWidgetTrackUIEvent, TimelineWidgetTrackItemUIEvent, TimelineWidgetTrackItemThumbUIEvent, TimelineWidgetTimelineUIEvent } from "window/workbench/common/widgets/timeline/event";

export interface EventCallback<T> {
	(event: T): void;
}

export class TimelineWidgetViewOutgoingEvents extends Disposable {

  // UI Event
  onWidgetDragOver: EventCallback<React.DragEvent>;
  onWidgetDrop: EventCallback<React.DragEvent>;
  onTrackItemMouseDown: EventCallback<TimelineWidgetTrackItemUIEvent>;
  onTrackItemMouseMoveStart: EventCallback<TimelineWidgetTrackItemUIEvent>;
  onTrackItemThumbMouseDown: EventCallback<TimelineWidgetTrackItemThumbUIEvent>;
  onTrackItemThumbMouseMoveStart: EventCallback<TimelineWidgetTrackItemThumbUIEvent>;
  onTrackMouseMove: EventCallback<TimelineWidgetTrackUIEvent>;
  onTrackDragOver: EventCallback<TimelineWidgetTrackUIEvent>;
  onTrackDragLeave: EventCallback<TimelineWidgetTrackUIEvent>;
  onTrackDrop: EventCallback<TimelineWidgetTrackUIEvent>;
  onTimelineMouseDown: EventCallback<TimelineWidgetTimelineUIEvent>;

  constructor() {
    super();
  }

  emitWidgetDragOver(e: React.DragEvent) {
    if (this.onWidgetDragOver) this.onWidgetDragOver(e);
  }

  emitWidgetDrop(e: React.DragEvent) {
    if (this.onWidgetDrop) this.onWidgetDrop(e);
  }

  emitTrackItemMouseDown(e: TimelineWidgetTrackItemUIEvent) {
    if (this.onTrackItemMouseDown) this.onTrackItemMouseDown(e);
  }

  emitTrackItemMouseMoveStart(e: TimelineWidgetTrackItemUIEvent) {
    if (this.onTrackItemMouseMoveStart) this.onTrackItemMouseMoveStart(e);
  }

  emitTrackItemThumbMouseDown(e: TimelineWidgetTrackItemThumbUIEvent) {
    if (this.onTrackItemThumbMouseDown) this.onTrackItemThumbMouseDown(e);
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

  emitTimelineMouseDown(e: TimelineWidgetTimelineUIEvent) {
    if (this.onTimelineMouseDown) this.onTimelineMouseDown(e);
  }

}