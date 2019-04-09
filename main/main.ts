// ./main.js
import { app, BrowserWindow, ipcMain, WebContents } from 'electron';
import * as path from 'path'
import * as os from 'os'

import {
  WindowRequestParam,
  WindowRequestWrapResult,
  AppParam } from './../app/connector';

console.log("Start electron main");

class WindowRequestHost {

  mainWindow: BrowserWindow;
  webContents: WebContents;

  requests: Map<string, WindowRequestParam>;

  constructor(mainWin: BrowserWindow) {
    this.mainWindow = mainWin;
    this.requests = new Map<string, WindowRequestParam>();
    this.webContents = mainWin.webContents;

    this.mainWindow.webContents.on('new-window', (event: any, url, frameName, disposition, options, additionalFeatures) => {
      console.log(frameName);
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

    ipcMain.on('request-window', (e: CustomEvent, arg: WindowRequestParam) => {
      console.log("[WindowRequestHost] Request window", arg.name);
      this.requests.set(arg.name, arg);
      this.webContents.send('request-window-open', arg);
    });
  }

  private sendWrapResultToRenderer(open: WindowRequestWrapResult) {
    this.webContents.send('request-window', open);
  }
}

let win : BrowserWindow = null;
let __worker : BrowserWindow = null;
let windowRequestHost : WindowRequestHost = null;

function createApp(): Promise<BrowserWindow> {
  let promise = new Promise<BrowserWindow>((resolve, reject) => {
    win = new BrowserWindow({
      width: 1000,
      height: 600,
      webPreferences: {
        nativeWindowOpen: true,
        nodeIntegrationInWorker: true
      }
    });
    windowRequestHost = new WindowRequestHost(win);

    // I don't know but because of some bug of electron, 
    // napi_threadsafe_function works properly when page is reloaded at least once.
    win.webContents.once('did-finish-load', () => {
      win.webContents.once('did-finish-load', () => {
        resolve(win);
      });
      win.webContents.reload();
    });
    win.loadURL('http://localhost:8080/starter.html');
    win.webContents.openDevTools()

    win.on('closed', function () {
      win = null;
    });
  })
  return promise;
}

function createWorker(appWindow: BrowserWindow): Promise<BrowserWindow> {

  return new Promise<BrowserWindow>((resolve, reject) => {
    resolve(null);
  });

  let promise = new Promise<BrowserWindow>((resolve, reject) => {
    // Initialize the window to our specified dimensions
    __worker = new BrowserWindow();
    __worker.webContents.openDevTools();
    console.log("Create worker window");
  
    __worker.webContents.once('did-finish-load', (e: any) => {
      __worker.webContents.send('start-worker', {
        appWindowID: appWindow.id
      });
    });
    ipcMain.once('worker-started', (e: any, arg: any) => {
      resolve(__worker);
    });
    __worker.loadFile('./worker/index.html');
  
    // Remove window once app is closed
    __worker.on('closed', function () {
      __worker = null;
    });
  });
  return promise;
}

const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');

app.on('ready', function () {
/*
  BrowserWindow.addDevToolsExtension(
     path.join(os.homedir(), '/AppData/Local/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/3.6.0_0')
  )
*/
    console.log('Install Chrome extensions')
  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name: any) => {
      createApp().then(appWindow => {
        console.log("[Node] App Window created");
        createWorker(appWindow).then(worker => {
          console.log("[Node] Worker Window created");
          /*
          console.log("[Node] Worker created");
          ipcMain.once('app-window-initiated', (e, appWindowId) => {
            console.log("[Node] Register main-worker window");
            let appWindow = BrowserWindow.fromId(appWindowId);
            worker.webContents.send('register-main-window', appWindow.id);
            appWindow.webContents.send('register-worker-window', worker.id);
      
            appWindow.webContents.send('start');
          })
          */
          startApp(appWindow, {
            resourceWorkerWindowID: -1
          });
        })
      })
    })
    .catch((err: any) => console.log('An error occurred: ', err));

});

function startApp(window: BrowserWindow, param: AppParam) {
  console.log('[Main] Start internal');
  window.webContents.send('start-app', param);
}

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});