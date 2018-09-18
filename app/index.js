import React from 'react';
import ReactDOM from 'react-dom';

import Timeline from 'windows/timeline';

import { timeline } from 'napi';

const { BrowserWindow } = window.require('electron').remote;

/*
console.log(window.open());
const win = BrowserWindow.getFocusedWindow();
console.log(win);
win.webContents.openDevTools();
*/

ReactDOM.render(<Timeline/>, document.getElementById('app'));