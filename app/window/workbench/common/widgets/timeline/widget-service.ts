import { Event } from "base/common/event";
import { ITimelineWidget } from "window/workbench/common/widgets/timeline/widget";
import { createDecorator } from "platform/instantiation/common/instantiation";

export const ITimelineWidgetService = createDecorator<ITimelineWidgetService>('olive.TimelineWidgetService');

export interface ITimelineWidgetService {

  _serviceBrand: any;

  readonly onWidgetAdded: Event<ITimelineWidget>;

  readonly onWidgetWillRemove: Event<ITimelineWidget>;

  readonly onActiveWidgetChanged: Event<ITimelineWidget>;

  readonly activeWidget: ITimelineWidget;

  addWidget(widget: ITimelineWidget): void;
  removeWidget(widget: ITimelineWidget): void;

  activateWidget(widget: ITimelineWidget): void;

}