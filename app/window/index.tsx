import * as React from 'react';
import * as ReactDOM from 'react-dom';

import LayoutRoot from 'window/layout/layout-root';

const style = require('./index.scss');

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