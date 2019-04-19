import { Widget } from "window/view/widget";
import { Event } from "base/common/event";
import { TimelineWidgetModel } from "window/view/timeline/model/model";
import { TimelineWidgetController } from "window/view/timeline/controller/controller";

export interface TimelineWidgetFocusedWidgetChangedEvent {
  widget: TimelineWidget;
}

export abstract class TimelineWidget extends Widget {

  static readonly focusedWidget: TimelineWidget;
  static readonly onFocusedWidgetChanged: Event<TimelineWidgetFocusedWidgetChangedEvent>;
  
  static setFocusedTimelineWidget(widget: TimelineWidget): void {}

  model: TimelineWidgetModel;
  controller: TimelineWidgetController;

  abstract dispose(): void;

}