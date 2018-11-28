// ./main.js
const {app, BrowserWindow} = require('electron')

const ipcMain = require('electron').ipcMain;

class WindowRequestHost {
  constructor(mainWin) {
    this.mainWin = mainWin;
    this.requests = {};
    this.webContents = mainWin.webContents;

    this.mainWin.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
      console.log(frameName);
      const request = this.requests[frameName];
      if (!request) return;
      console.log("[WindowRequestHost] new-window from BrowserMain.BrowserRequest");
      event.preventDefault();
      Object.assign(options, request)
      event.newGuest = new BrowserWindow(options);
      this.webContents.send('request-window', {
        ok: true,
        name: frameName,
        id: event.newGuest.id
      });
    });

    ipcMain.on('request-window', (e, arg) => {
      console.log("[WindowRequestHost] Request window", arg.name);
      this.requests[arg.name] = arg;
      this.webContents.send('request-window-open', arg.name);
    });
  }
}

let win = null;
let __worker = null;
let windowRequestHost = null;

function createApp() {
  let promise = new Promise((resolve, reject) => {
    win = new BrowserWindow({
      width: 1000,
      height: 600,
      webPreferences: {
        nativeWindowOpen: true
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

function createWorker(appWindow) {
  let promise = new Promise((resolve, reject) => {
    // Initialize the window to our specified dimensions
    __worker = new BrowserWindow();
    __worker.webContents.openDevTools();
    console.log("Create worker window");
  
    __worker.webContents.once('did-finish-load', e => {
      __worker.webContents.send('start-worker', {
        appWindowID: appWindow.id
      });
    });
    ipcMain.once('worker-started', (e, arg) => {
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

  installExtension(REACT_DEVELOPER_TOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log('An error occurred: ', err));
  

  createApp().then(appWindow => {
    console.log("[Node] App Window created");
    createWorker(appWindow).then(worker => {
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
      appWindow.webContents.send('start-app', {
        resourceWorkerWindowID: worker.id
      });
    })
  })
});

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});