import { Event } from "base/common/event";
import { TimelineWidget } from "window/view/timeline/widget";
import { createDecorator } from "window/service/services";

export const ITimelineWidgetService = createDecorator<ITimelineWidgetService>('TimelineWidgetService');

export interface ITimelineWidgetService {

  readonly onWidgetAdded: Event<TimelineWidget>;

  readonly onWidgetWillRemove: Event<TimelineWidget>;

  readonly onActiveWidgetChanged: Event<TimelineWidget>;

  readonly activeWidget: TimelineWidget;

  addWidget(widget: TimelineWidget): void;
  removeWidget(widget: TimelineWidget): void;

  activateWidget(widget: TimelineWidget): void;

}