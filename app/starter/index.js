const electron = window.require('electron');
const remote = electron.remote, 
      ipcRenderer = electron.ipcRenderer,
      BrowserWindow = remote.BrowserWindow,
      app = remote.app;

let renderer_worker;
window.requestRendering = (snapshots) => {
  console.log("HELLO", snapshots);
  renderer_worker.postMessage({
    type: 'render',
    snapshots: snapshots
  })
}

import _ from 'test';

var basepath = app.getAppPath();
console.log(basepath);

// Load native Olive module
const olive_module = window.require(`${basepath}/src/build/Release/module.node`);
console.log(olive_module);

const mobx = require('mobx');
const mobx_react = require('mobx-react');

// Initialize Olive module
const olive_module_exports = olive_module.initialize(mobx, console.log);
console.log("[Olive]", olive_module_exports);

renderer_worker = new Worker("/renderer/worker.js");
renderer_worker.postMessage({
  type: 'init',
  basepath: basepath
})

class WindowRequest {

  constructor() {
    this.promises = {};
    
    ipcRenderer.on('request-window', (e, arg) => {
      let promise = this.promises[arg.name];
      delete this.promises[arg.name];
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
    ipcRenderer.on('request-window-open', (e, arg) => {
      console.log("[WindowRequest] Open native window",arg);
      let nativeWindow = window.open("", arg);
      this.promises[arg].nativeWindow = nativeWindow;
    })
  }

  request(options) {
    options = options || {};
    let name = (options && options.name) || guid();
    options.name = name;
    console.log("[WindowRequest] Request new window",options);
    let promise = new Promise((resolve, reject) => {
      this.promises[name] = {resolve: resolve, reject: reject};
    });
    ipcRenderer.send('request-window', options);
    return promise;
  }
} const windowRequest = new WindowRequest();

window.addEventListener('start-app-window', e => {
  e.detail.start({
    olive_module: olive_module_exports,
    mobx_react: mobx_react
  });
});

// All initialization jobs on Main Process are done and ready to do its own jobs
ipcRenderer.on('initiate-app-window', e => {
  windowRequest.request({
    name: 'app'
  }).then(entryWindow => {
    console.log("[Starter] App window created");
    entryWindow.browserWindow.webContents.once('did-finish-load', () => {
      ipcRenderer.send('app-window-initiated', entryWindow.browserWindow.id);
    })
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