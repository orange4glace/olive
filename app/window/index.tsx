import * as React from 'react';
import * as ReactDOM from 'react-dom';

// Load widgets
import { TimelineWidgetImpl } from 'window/view/timeline/widget_impl';
import { StorageWidget } from 'window/view/storage/widget-impl';
import { MonitorWidgetImpl } from 'window/view/monitor/widget';
TimelineWidgetImpl;
StorageWidget;
MonitorWidgetImpl;

import LayoutRoot from 'window/layout/layout-root';
import { ITimelineWidgetService } from 'window/view/timeline/widget-service';
import { TimelineWidgetService } from 'window/view/timeline/widget-service-impl';
import { ServiceCollection } from 'platform/instantiation/common/serviceCollection';
import app from 'internal/app';
import { IWidgetService, WidgetService } from 'window/view/widget-service';
import { WidgetRegistry } from 'window/view/widget-registry';
import { IProjectService } from 'internal/project/project-service';
import { LayoutData } from 'window/layout/data';
import { LayoutDirection } from 'window/layout/layout-direction';
import { IGlobalTimelineService } from 'internal/timeline/global-timeline-service';
import { ModalWindowService } from 'window/modal-window/modal-window-service-impl';
import { IAppWindowService } from 'internal/app-window/app-window-service';
import { IModalWindowService } from 'window/modal-window/modal-window-service';
import { NewProjectModalWindowStarter } from 'window/modal-window/new-project/new-project-modal-window-starter';

console.log('Holla Index!');

const style = require('./index.scss');

const internalServices = app.services;

function createLayout(
  widgetService: IWidgetService,
  projectService: IProjectService) {
  const root = new LayoutData(LayoutDirection.VERTICAL, null);
  const sub = new LayoutData(LayoutDirection.HORIZONTAL, root);
  const left = new LayoutData(LayoutDirection.VIEW, sub);
  const right = new LayoutData(LayoutDirection.VIEW, sub);
  sub.children.push(left);
  sub.children.push(right);
  const bot = new LayoutData(LayoutDirection.VIEW, root);

  root.children.push(bot);
  root.children.push(sub);

  const timelineWidget = widgetService.createWidget('olive.TimelineWidget', {
    timeline: null
  });
  const storageWidget = widgetService.createWidget('olive.StorageWidget', {
    project: projectService.getCurrentProject()
  })
  const monitorWidget = widgetService.createWidget('olive.MonitorWidget', {

  })
  left.views.push(timelineWidget);
  right.views.push(storageWidget);
  bot.views.push(monitorWidget);

  return root;
}

internalServices.invokeFunction(accessor => {
  // const layoutService = new LayoutService();

  const modalWindowService: IModalWindowService = new ModalWindowService(accessor.get(IAppWindowService));

  const serviceCollection = new ServiceCollection(
    [IModalWindowService, modalWindowService],
    [ITimelineWidgetService, new TimelineWidgetService(
      accessor.get(IGlobalTimelineService)
    )]
  );
  const windowServices = internalServices.createChild(serviceCollection);

  const widgetService = new WidgetService(windowServices);

  // serviceCollection.set(ILayoutService, layoutService);
  serviceCollection.set(IWidgetService, widgetService);

  WidgetRegistry.widgets.forEach((provider, name) => {
    widgetService.registerWidget(name, provider);
  })

  // const layout = layoutService.createLayout();
  const layout = createLayout(widgetService, accessor.get(IProjectService));
  console.log(layout)

  /*
  console.log(window.open());
  const win = BrowserWindow.getFocusedWindow();
  console.log(win);
  win.webContents.openDevTools();
  */

  ReactDOM.render(<LayoutRoot data={layout}/>, document.getElementById('app'));
  
  const newProjectModalWindowStarter = new NewProjectModalWindowStarter(accessor.get(IProjectService));
  modalWindowService.createModal(newProjectModalWindowStarter);

  (window as any).onDispose = function() {

  }
});