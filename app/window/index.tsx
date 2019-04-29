import * as React from 'react';
import * as ReactDOM from 'react-dom';

import LayoutRoot from 'window/layout/layout-root';
import { setService } from 'window/service/services';
import { ITimelineWidgetService } from 'window/view/timeline/widget-service';
import { TimelineWidgetServiceImpl } from 'window/view/timeline/widget-service-impl';

const style = require('./index.scss');

function initializeServices() {
  setService(ITimelineWidgetService, new TimelineWidgetServiceImpl());
}
initializeServices();

/*
console.log(window.open());
const win = BrowserWindow.getFocusedWindow();
console.log(win);
win.webContents.openDevTools();
*/

ReactDOM.render(<LayoutRoot data={{
  direction: "VIEW",
  view: "Timeline"
}}/>, document.getElementById('app'));