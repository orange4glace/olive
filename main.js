// ./main.js
const {app, BrowserWindow} = require('electron')

let win = null;
let win2 = null;

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

  win.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
    event.preventDefault();
    Object.assign(options, {
    })
    event.newGuest = new BrowserWindow(options);
    event.newGuest.webContents.openDevTools();
  });

  // Specify entry point
  win.loadURL('http://localhost:8080');

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