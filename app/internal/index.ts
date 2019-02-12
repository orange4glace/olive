import * as electron from 'electron';
import * as mobx from 'mobx';
import * as mobx_react from 'mobx-react';
import App from 'internal/app-interface';
import Timeline from 'internal/timeline/timeline';
import ResourceManager from 'internal/resource/manager';

import WindowParam from 'window/window-param'

import {
  WindowRequestPromise,
  WindowRequestParam,
  WindowRequestResult,
  WindowRequestWrapResult,
  AppParam } from 'connector'

var app: App;

const remote = electron.remote, 
      ipcRenderer = electron.ipcRenderer,
      BrowserWindow = remote.BrowserWindow;

function initializeApp(): void {
  app = new App();
  app.mobx.observable = mobx.observable;
  app.mobx.action = mobx.action;
  app.mobx.autorun = mobx.autorun;
  app.mobx.observer = mobx_react.observer;
  app.decoder = initDecoder();
  app.timeline = new Timeline();
  app.resource = new ResourceManager();
}

function initDecoder() {
  return null;
  const basepath = electron.remote.app.getAppPath();
  console.log(`[Internal] Initilaize Decoder module. basepath=${basepath}`);
  const module_initializer = require(`${basepath}/src/build/Release/module.node`);
  const module = module_initializer.initialize(console.log);
  return module;
}

let resourceWorkerWindow : electron.BrowserWindow;

// window.requestAudioRendering = (snapshots) => {
//   return;
//   console.log("RequestAudioRendering",snapshots);
//   for (var i = 0; i < snapshots.length; i ++) {
//     var snapshot = snapshots[i];
//     console.log(snapshot.data);
//     console.log(olive_module_exports.AsAudioFrameData(snapshot.data));
//   }
// }

class WindowRequest {

  promises: Map<string, WindowRequestPromise>;

  constructor() {
    this.promises = new Map<string, WindowRequestPromise>();
    
    ipcRenderer.on('request-window', (e: Event, arg: WindowRequestWrapResult) => {
      let promise = this.promises.get(arg.name);
      this.promises.delete(arg.name);
      if (!arg.ok) return promise.reject();
      let browserWindow = BrowserWindow.fromId(arg.id);
      if (!browserWindow) return promise.reject();
      console.log("[WindowRequest] Get BrowserWindow", arg.name, arg.id);
      browserWindow.webContents.openDevTools()
      promise.resolve({
        browserWindow: browserWindow,
        nativeWindow: promise.nativeWindow
      });
    })
    ipcRenderer.on('request-window-open', (e: Event, arg: WindowRequestParam) => {
      console.log("[WindowRequest] Open native window",arg);
      let nativeWindow = window.open("", arg.name);
      this.promises.get(arg.name).nativeWindow = nativeWindow;
    })
  }

  request(option: WindowRequestParam) {
    option = option || {};
    let name = option.name || guid();
    option.name = name;
    console.log("[WindowRequest] Request new window", option);
    let promise = new Promise<WindowRequestResult>((resolve, reject) => {
      this.promises.set(name, {
        resolve: resolve,
        reject: reject,
        nativeWindow: null
      });
    });
    ipcRenderer.send('request-window', option);
    return promise;
  }
} const windowRequest = new WindowRequest();

initializeApp();
window.addEventListener('start-app-window', (e: CustomEvent) => {
  console.log('start app window');
  initilaizeWindow(e.detail, {
    app: app
  });
});
function initilaizeWindow(window: any, param: WindowParam) {
  window.initialize(param);
}

// All initialization jobs on Main Process are done and ready to do its own jobs
ipcRenderer.on('start-app', (e: Event, param: AppParam) => {
  console.log('start app');
  // resourceWorkerWindow = BrowserWindow.fromId(param.resourceWorkerWindowID);
  windowRequest.request({
    name: 'app',
    webPreferences: {
      nodeIntegration: true,
      sandbox: false
    }
  }).then(entryWindow => {
    console.log("[Starter] App window created");
    entryWindow.browserWindow.loadURL("http://localhost:8080/app.html");
  });
});

// Utilies
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}