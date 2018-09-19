import React from 'react';
import ReactDOM from 'react-dom';

import { timeline } from 'napi';

import Timeline from 'windows/timeline';

import style from './index.scss';

const { BrowserWindow } = window.require('electron').remote;

/*
console.log(window.open());
const win = BrowserWindow.getFocusedWindow();
console.log(win);
win.webContents.openDevTools();
*/

ReactDOM.render(<Timeline/>, document.getElementById('app'));