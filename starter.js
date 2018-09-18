class WindowRequest {

  constructor() {
    this.promises = {};
    this.ipcRenderer = require('electron').ipcRenderer;
    this.BrowserWindow = require('electron').remote.BrowserWindow;
    
    this.ipcRenderer.on('request-window', (e, arg) => {
      let promise = this.promises[arg.name];
      if (!arg.ok) return promise.reject();
      let window = this.BrowserWindow.fromId(arg.id);
      if (!window) return promise.reject();
      console.log("[WindowRequest] Get BrowserWindow", arg.name, arg.id);
      promise.resolve(window);
    })
    this.ipcRenderer.on('request-window-open', (e, arg) => {
      console.log("[WindowRequest] Open native window",arg);
      window.open("", arg);
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
}

const windowRequest = new WindowRequest();

// Utilies
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}