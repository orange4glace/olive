import React from 'react';
import ReactDOM from 'react-dom';

import LayoutRoot from 'layout/layout_root';

import style from './index.scss';

const { BrowserWindow } = window.require('electron').remote;

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