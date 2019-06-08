import * as React from 'react';
import * as ReactDOM from 'react-dom';

// import * as css from 'base/base-all.css'
// console.log(css);


//#region --- workbench registries

import "window/workbench/common/editor/widget-registry"

//#endregion


//#region --- workbench actions

import "window/workbench/common/workbench-actions"

//#endregion


//#region --- workbench services

import "window/workbench/modal-window/modal-window-service-impl";
import "window/workbench/services/commands/common/commandService";
import "window/workbench/services/notification/common/notification-service";
import "window/workbench/services/keybinding/electron-browser/keybindingService";
import "window/workbench/services/editor/browser/widget-service";
import { registerSingleton } from "platform/instantiation/common/extensions";
import { IMenuService } from "platform/actions/common/actions";
import { MenuService } from "platform/actions/common/menuService";
import { IContextKeyService } from "platform/contextkey/common/contextkey";
import { ContextKeyService } from "platform/contextkey/browser/contextKeyService";
import { IStorageService } from 'platform/storage/common/storage';
import { ILifecycleService } from 'platform/lifecycle/common/lifecycle';

registerSingleton(ILifecycleService, WorkbenchLifecycleService);
registerSingleton(IMenuService, MenuService);
registerSingleton(IContextKeyService, ContextKeyService);
registerSingleton(IStorageService, LocalStorageStorageService);

//#endregion


//#region --- workbench widgets

import "window/workbench/common/widgets/timeline/widget-impl"
import "window/workbench/common/widgets/timeline/widget-service-impl"
import "window/workbench/common/widgets/storage/services/widget-service-impl"
import "window/workbench/common/widgets/monitor/widget"

//#endregion


//#region --- workbench modals

import "window/workbench/modal-window/new-project/new-project-modal"

//#endregion

import app from 'internal/app';
import { Workbench, WorkbenchView } from 'window/workbench/browser/workbench';
import { WorkbenchLifecycleService } from 'window/workbench/services/lifecycle/lifecycle-service';
import { LocalStorageStorageService } from 'window/workbench/services/storage/storage-service';

console.log('Holla Index!');

const style = require('./index.scss');

const internalServices = app.services;

const workbench = new Workbench(internalServices);

ReactDOM.render(<WorkbenchView workbench={workbench}/>,
document.getElementById('app'));

// internalServices.invokeFunction(accessor => {
//   // const layoutService = new LayoutService();

//   const modalWindowService: IModalWindowService = new ModalWindowService(accessor.get(IAppWindowService));

//   const serviceCollection = new ServiceCollection(
//     [IModalWindowService, modalWindowService],
//     [ITimelineWidgetService, new TimelineWidgetService(
//       accessor.get(IGlobalTimelineService)
//     )]
//   );
//   const windowServices = internalServices.createChild(serviceCollection);

//   const widgetService = new WidgetService(windowServices);

//   // serviceCollection.set(ILayoutService, layoutService);
//   serviceCollection.set(IWidgetService, widgetService);

//   WidgetRegistry.widgets.forEach((provider, name) => {
//     widgetService.registerWidget(name, provider);
//   })

//   // const layout = layoutService.createLayout();
//   // const layout = createLayout(widgetService, accessor.get(IProjectsService));
//   // console.log(layout)

//   /*
//   console.log(window.open());
//   const win = BrowserWindow.getFocusedWindow();
//   console.log(win);
//   win.webContents.openDevTools();
//   */

//   // ReactDOM.render(<LayoutRoot data={layout}/>, document.getElementById('app'));
  
//   const newProjectModalWindowStarter = new NewProjectModalWindowStarter(accessor.get(IProjectsService));
//   // modalWindowService.createModal(newProjectModalWindowStarter);
  

//   (window as any).onDispose = function() {

//   }
// });
