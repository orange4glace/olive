import { electron, olive, mobx, mobx_react } from 'starter/common';
import Timeline from 'timeline/starter/timeline';
import Renderer from 'starter/renderer';

const remote = electron.remote, 
      ipcRenderer = electron.ipcRenderer,
      BrowserWindow = remote.BrowserWindow,
      app = remote.app;

let resourceWorkerWindow;

window.requestAudioRendering = (snapshots) => {
  return;
  console.log("RequestAudioRendering",snapshots);
  for (var i = 0; i < snapshots.length; i ++) {
    var snapshot = snapshots[i];
    console.log(snapshot.data);
    console.log(olive_module_exports.AsAudioFrameData(snapshot.data));
  }
}

const ResourceRequest = {
  requestMetadata: function(paths) {
    resourceWorkerWindow.webContents.send('request-metadata', paths);
  }
}
ipcRenderer.on('resource-metadata', (e, result) => {
  if (result.status == 'ok') {
    olive.module.resource.LoadResource(result.data);
  }
});

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
  e.detail.setupWindow({
    olive_module: olive.module,
    mobx: mobx,
    mobx_react: mobx_react,
    ResourceRequest: ResourceRequest,
    Renderer: Renderer,
    Timeline: Timeline,
  });
});

// All initialization jobs on Main Process are done and ready to do its own jobs
ipcRenderer.on('start-app', (e, data) => {
  resourceWorkerWindow = BrowserWindow.fromId(data.resourceWorkerWindowID);
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

// Initialize module
olive.initialize();