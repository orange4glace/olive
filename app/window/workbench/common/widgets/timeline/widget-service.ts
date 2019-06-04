import { Event } from "base/common/event";
import { TimelineWidget } from "window/workbench/common/widgets/timeline/widget";
import { createDecorator } from "platform/instantiation/common/instantiation";

export const ITimelineWidgetService = createDecorator<ITimelineWidgetService>('olive.TimelineWidgetService');

export interface ITimelineWidgetService {

  _serviceBrand: any;

  readonly onWidgetAdded: Event<TimelineWidget>;

  readonly onWidgetWillRemove: Event<TimelineWidget>;

  readonly onActiveWidgetChanged: Event<TimelineWidget>;

  readonly activeWidget: TimelineWidget;

  addWidget(widget: TimelineWidget): void;
  removeWidget(widget: TimelineWidget): void;

  activateWidget(widget: TimelineWidget): void;

}