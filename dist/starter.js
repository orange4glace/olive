const remote = require('electron').remote, 
      app = remote.app;

var basepath = app.getAppPath();
const olive_module = window.require(`${basepath}/src/build/Release/module.node`);

const mobx = require('mobx');
const mobx_react = require('mobx-react');

console.log("[IMPORT NAPI]", olive_module, mobx);
const olive_module_exports = olive_module.initialize(mobx, console.log);

class WindowRequest {

  constructor() {
    this.promises = {};
    this.ipcRenderer = require('electron').ipcRenderer;
    this.BrowserWindow = require('electron').remote.BrowserWindow;
    
    this.ipcRenderer.on('request-window', (e, arg) => {
      let promise = this.promises[arg.name];
      delete this.promises[arg.name];
      if (!arg.ok) return promise.reject();
      let browserWindow = this.BrowserWindow.fromId(arg.id);
      if (!browserWindow) return promise.reject();
      console.log("[WindowRequest] Get BrowserWindow", arg.name, arg.id);
      browserWindow.webContents.openDevTools()
      promise.resolve({
        browserWindow: browserWindow,
        nativeWindow: promise.nativeWindow
      });
    })
    this.ipcRenderer.on('request-window-open', (e, arg) => {
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
    this.ipcRenderer.send('request-window', options);
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