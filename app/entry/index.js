const electron = window.require('electron');
const remote = electron.remote, 
      ipcRenderer = electron.ipcRenderer,
      BrowserWindow = remote.BrowserWindow,
      app = remote.app;

window.start = function(opts) {
  console.log("[Entry] Initialize",opts.olive_module);
  window.olive_module = opts.olive_module;
  window.observer = opts.mobx_react.observer;
  
  let bundleScript = document.createElement('script');
  bundleScript.src = './app.js';
  document.head.appendChild(bundleScript);
}

// Register Resource worker
function registerWorkerWindow(e, arg) {
  let workerWindow = BrowserWindow.fromId(arg);
  window.resource_worker = workerWindow;
  console.log("Register Worker Window", workerWindow);
}

ipcRenderer.on('register-worker-window', registerWorkerWindow);
ipcRenderer.on('start', _start);
ipcRenderer.on('resource-metadata', () => console.log(123));

function _start() {
  console.log("[Entry] Start");
  window.opener.dispatchEvent(new CustomEvent('start-app-window', {
    detail: window
  }));
}

console.log("[Entry] Loaded", Date.now())