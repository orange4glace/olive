/**
 * A Web worker for get resource metadata and observe file changes
 * This web worker will be initiated by Renderer process
 * 
 * Renderer process requests a meatadata for some path
 * This request must be one at a time
 */
console.log("[WorkerBrowser] Worker loaded");

const electron = require('electron');
const remote = electron.remote, 
      ipcRenderer = electron.ipcRenderer,
      BrowserWindow = remote.BrowserWindow;

const fs = require('fs');
const Path = require('path');

let appWindow = null;

const ResourceType = {
  UNKNOWN: 0,
  VIDEO: 1,
  AUDIO: 2,
}

class ResourceMetadata {

  parse(path) {
    let parsed = Path.parse(path);
    this.path = path;
    this.dir = parsed.dir;
    this.root = parsed.root;
    this.base = parsed.base;
    this.ext = parsed.ext;
    this.name = parsed.name;

    this.type = this._getType(this.ext);
  }

  _getType(ext) {
    ext = ext.replace('.', '');
    if (['webm','mkv','flv','ogg','avi','wmv','mp4','m4p','m4v'].indexOf(ext) >= 0)
      return ResourceType.VIDEO;
    return ResourceType.UNKNOWN;
  }

}

ipcRenderer.on('start-worker', (e, data) => {
  appWindow = BrowserWindow.fromId(data.appWindowID);
  console.log("[Worker] Register App Window", appWindow);
  ipcRenderer.send('worker-started');
});

ipcRenderer.on('request-metadata', (e, arg) => {
  RequestResourceMetadata(arg);
});

function RequestResourceMetadata(paths) {
  for (var i = 0; i < paths.length; i ++) {
    let path = paths[i];
    LoadResourceMetadata(path).then(rm => {
      console.log("RequestResourceMetadata", rm, appWindow.webContents);
      appWindow.webContents.send('resource-metadata', {
        status: 'ok',
        data: rm
      });
    }).catch(err => {
      console.log("RequestResourceMetadata", err);
      appWindow.webContents.send('resource-metadata', {
        status: 'err',
        error: err
      })
    });
  }
}

function LoadResourceMetadata(path) {
  let promise = new Promise((resolve, reject) => {
    let existance = fs.existsSync(path);
    if (!existance) return reject("Not exists");
    let metadata = new ResourceMetadata();
    metadata.parse(path);
    resolve(metadata);
  });
  return promise;
}