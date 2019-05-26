// ./main.js
import { app, BrowserWindow, ipcMain } from 'electron';
import { AppWindowMainService } from './app-window-main-service'


process.on('uncaughtException', err => {
  console.error(err);
})

console.log("Start electron main");


let win : BrowserWindow = null;

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
      win.loadURL('http://localhost:8080/starter.html');
      // win.webContents.reload();
    });
    win.loadURL('http://localhost:8080/blank.html');
    win.webContents.openDevTools()

    win.on('closed', function () {
      win = null;
    });
  })
  return promise;
}

app.on('ready', function () {
  createApp();
});

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});