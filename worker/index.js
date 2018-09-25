/**
 * A Web worker for get resource metadata and observe file changes
 * This web worker will be initiated by Renderer process
 * 
 * Renderer process requests a meatadata for some path
 * This request must be one at a time
 */
console.log("[WorkerBrowser] Worker loaded");

const electron = require('electron'),
      ipcRenderer = electron.ipcRenderer;

const fs = require('fs');
const path = require('path');

class ResourceMetadata {

  constructor(dir, root, base, ext, name) {
    this.dir = dir;
    this.root = root;
    this.base = base;
    this.ext = ext;
    this.name = name;
  }

}

ipcRenderer.on('request-resource-metadata', (e, arg) => {
  console.log(e, arg);
});

function RequestResourceMetadata(path) {
  LoadResourceMetadata(path).then(rm => {
    postMessage({
      status: 'ok',
      data: rm
    });
  }).catch(err => {
    postMessage({
      status: 'err',
      error: err
    })
  });
}

function LoadResourceMetadata(path) {
  let promise = new Promise((resolve, reject) => {
    let existance = fs.existsSync(path);
    if (!existance) return reject("Not exists");
    let parsed = path.parse(path);
    resolve(new ResourceMetadata(
        parsed.dir, parsed.root, parsed.base, parsed.ext, parsed.name
    ));
  });
}