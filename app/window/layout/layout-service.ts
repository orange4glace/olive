import { createDecorator, IInstantiationService } from "platform/instantiation/common/instantiation";
import { LayoutData } from "window/layout/data";
import { LayoutDirection, LayoutViewDirection } from "window/layout/layout-direction";
import { IWidgetService } from "window/view/widget-service";
import { IProjectService } from "internal/project/project-service";

export const ILayoutService = createDecorator<ILayoutService>('olive.LayoutService')

export interface ILayoutService {

  createLayout(): LayoutData;

}

export class LayoutService implements ILayoutService {

  constructor(
    @IProjectService private readonly projectService_: IProjectService,
    @IWidgetService private readonly widgetService_: IWidgetService) {

  }

  createLayout(): LayoutData {
    const root = new LayoutData(LayoutDirection.HORIZONTAL, null);
    const left = new LayoutData(LayoutDirection.VIEW, root);
    const right = new LayoutData(LayoutDirection.VIEW, root);

    root.children.push(left);
    root.children.push(right);

    const timelineWidget = this.widgetService_.createWidget('olive.TimelineWidget', {
      timeline: null
    });
    const storageWidget = this.widgetService_.createWidget('olive.StorageWidget', {
      project: this.projectService_.getCurrentProject()
    })
    left.views.push(timelineWidget);
    right.views.push(storageWidget);
    return root;
  }

}