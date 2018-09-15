import React from 'react';
import ReactDOM from 'react-dom';

import Timeline from 'components/timeline';

import { timeline } from './napi.js';

const { BrowserWindow } = window.require('electron').remote;

console.log(window.open());
const win = BrowserWindow.getFocusedWindow();
console.log(win);
win.webContents.openDevTools();

ReactDOM.render(<Timeline timeline={timeline}></Timeline>, document.getElementById('app'));