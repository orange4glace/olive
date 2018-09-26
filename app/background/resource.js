const electron = window.require('electron');
const remote = electron.remote, 
      ipcRenderer = electron.ipcRenderer,
      BrowserWindow = remote.BrowserWindow,
      app = remote.app;
const worker = window.resource_worker;

import { resource } from 'napi';

const Background = {
  RequestMetadata: function(paths) {
    worker.webContents.send('request-metadata', paths);
  }
}
ipcRenderer.on('resource-metadata', (e, result) => {
  if (result.status == 'ok') {
    resource.LoadResource(result.data);
  }
});

export default Background;