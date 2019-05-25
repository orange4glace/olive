// ./main.js
import { app, BrowserWindow, ipcMain, WebContents } from 'electron';

import {
  WindowRequestParam,
  WindowRequestWrapResult,
  AppParam } from '../app/connector';

export interface IAppWindowMainService {



}

export class AppWindowMainService implements IAppWindowMainService {

  mainWindow: BrowserWindow;
  webContents: WebContents;

  requests: Map<string, WindowRequestParam>;

  constructor(mainWin: BrowserWindow) {
    this.mainWindow = mainWin;
    this.requests = new Map<string, WindowRequestParam>();
    this.webContents = mainWin.webContents;

    this.mainWindow.webContents.on('new-window', (event: any, url, frameName, disposition, options, additionalFeatures) => {
      const request = this.requests.get(frameName);
      if (!request) return;
      console.log("[WindowRequestHost] new-window from BrowserMain.BrowserRequest");
      event.preventDefault();
      Object.assign(options, request);
      event.newGuest = new BrowserWindow(options);
      this.sendWrapResultToRenderer({
        ok: true,
        name: frameName,
        id: event.newGuest.id
      })
    });

    ipcMain.on('request-app-window', (e: CustomEvent, arg: WindowRequestParam) => {
      console.log("[WindowRequestHost] Request window", arg.name);
      this.requests.set(arg.name, arg);
      this.webContents.send('start-app-window', arg);
    });
  }

  private sendWrapResultToRenderer(open: WindowRequestWrapResult) {
    this.webContents.send('app-window-started', open);
  }

}