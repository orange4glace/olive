import * as React from 'react';
import * as ReactDOM from 'react-dom';

// Load widgets
import { TimelineWidgetImpl } from 'window/view/timeline/widget_impl';
import { StorageWidget } from 'window/view/storage/widget-impl';
TimelineWidgetImpl;
StorageWidget;

import LayoutRoot from 'window/layout/layout-root';
import { ITimelineWidgetService } from 'window/view/timeline/widget-service';
import { TimelineWidgetService } from 'window/view/timeline/widget-service-impl';
import { ServiceCollection } from 'platform/instantiation/common/serviceCollection';
import app from 'internal/app';
import { IWidgetService, WidgetService } from 'window/view/widget-service';
import { LayoutService, ILayoutService } from 'window/layout/layout-service';
import { WidgetRegistry } from 'window/view/widget-registry';
import { IProjectService } from 'internal/project/project-service';

const style = require('./index.scss');

const internalServices = app.services;

internalServices.invokeFunction(accessor => {
  const serviceCollection = new ServiceCollection(
    [ITimelineWidgetService, new TimelineWidgetService()]
  );
  const windowServices = internalServices.createChild(serviceCollection);

  const widgetService = new WidgetService(windowServices);

  const projectService = accessor.get(IProjectService)
  const layoutService = new LayoutService(projectService, widgetService);
  serviceCollection.set(ILayoutService, layoutService);
  serviceCollection.set(IWidgetService, widgetService);

  WidgetRegistry.widgets.forEach((provider, name) => {
    widgetService.registerWidget(name, provider);
  })

  const layout = layoutService.createLayout();
  console.log(layout)

  /*
  console.log(window.open());
  const win = BrowserWindow.getFocusedWindow();
  console.log(win);
  win.webContents.openDevTools();
  */

  ReactDOM.render(<LayoutRoot data={layout}/>, document.getElementById('app'));
});