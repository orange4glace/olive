// ./main.js
import { app, BrowserWindow, ipcMain } from 'electron';
import { AppWindowMainService } from './app-window-main-service'


process.on('uncaughtException', err => {
  console.error(err);
})

console.log("Start electron main");


let win : BrowserWindow = null;
let __worker : BrowserWindow = null;

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

    const appWindowMainService = new AppWindowMainService(win);

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
    createApp();

});

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});