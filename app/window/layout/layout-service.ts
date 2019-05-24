import { createDecorator, IInstantiationService } from "platform/instantiation/common/instantiation";
import { LayoutData } from "window/layout/data";
import { LayoutDirection, LayoutViewDirection } from "window/layout/layout-direction";
import { IWidgetService } from "window/view/widget-service";

export const ILayoutService = createDecorator<ILayoutService>('olive.LayoutService')

export interface ILayoutService {

  createLayout(): LayoutData;

}

export class LayoutService implements ILayoutService {

  constructor(
    @IWidgetService private readonly widgetService_: IWidgetService) {

  }

  createLayout(): LayoutData {
    const layout = new LayoutData(LayoutDirection.VIEW, null);
    const timelineWidget = this.widgetService_.createWidget('olive.TimelineWidget', {
      timeline: null
    });
    layout.views.push(timelineWidget);
    return layout;
  }

}