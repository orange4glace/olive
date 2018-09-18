// ./main.js
const {app, BrowserWindow} = require('electron')
app.commandLine.appendSwitch("enable-javascript-harmony")

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
let windowRequestHost = null;

function createWindow() {
  // Initialize the window to our specified dimensions
  win = new BrowserWindow({
    width: 1000,
    height: 600,
    show: true,
    skipTaskbar: false,
    webPreferences: {
      affinity: "app",
      nativeWindowOpen: true
    }
  });
  windowRequestHost = new WindowRequestHost(win);
  console.log("Create window");

  /*
  win.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
    event.preventDefault();
    Object.assign(options, {
    })
    event.newGuest = new BrowserWindow(options);
    event.newGuest.webContents.openDevTools();
  });
  */

  // Specify entry point
  win.loadFile('./starter.html');

  // Show dev tools
  // Remove this line before distributing
  win.webContents.openDevTools()

  // Remove window once app is closed
  win.on('closed', function () {
    win = null;
  });

}


app.on('ready', function () {
  createWindow()
});

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});