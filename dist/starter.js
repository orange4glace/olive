const electron = require('electron');
const remote = electron.remote, 
      ipcRenderer = electron.ipcRenderer,
      BrowserWindow = remote.BrowserWindow,
      app = remote.app;

var basepath = app.getAppPath();

// Load native Olive module
const olive_module = window.require(`${basepath}/src/build/Release/module.node`);

const mobx = require('mobx');
const mobx_react = require('mobx-react');

// Initialize Olive module
const olive_module_exports = olive_module.initialize(mobx, console.log);
console.log("[Olive]", olive_module_exports);

// Start Web worker
let workerBrowser;
function workerCreated(e, arg) {
  console.log("Worker created", e, arg);
  workerBrowser = BrowserWindow.fromId(arg);
  window.worker = workerBrowser;
}
ipcRenderer.on('worker-created', workerCreated);

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
      let nativeWindow = window.open("http://localhost:8080/app.html", arg);
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

window.addEventListener('windowready', e => {
  e.detail.initialize(olive_module_exports, mobx_react);
});

windowRequest.request({
  name: 'app'
}).then(windows => {
  // windows.browserWindow.loadURL('http://localhost:8080/app.html');
  // windows.browserWindow.loadURL('http://localhost:8080/app.html');
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