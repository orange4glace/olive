/*

import * as electron from 'electron';
import app from 'internal/app';

const basepath = electron.remote.app.getAppPath();

let renderer_worker: Worker = null;
let initialized = false;
let active = true;

function sendOliveRendered() {
  olive.module.Rendered();
}

const Renderer = {
  initialize: function(canvas: any) {
    var offscreen = canvas.transferControlToOffscreen();
    if (renderer_worker == null) {
      renderer_worker = new Worker("/renderer/worker.js");
      renderer_worker.addEventListener('message', e => {
        var type = e.data.type;
        if (type == 'rendered') return sendOliveRendered();
      });
    }
    renderer_worker.postMessage({
      type: 'init',
      basepath: basepath,
      canvas: offscreen
    }, [offscreen]);
    initialized = true;
  },
  setActive: function(value: boolean) {

  },
  requestRender: (snapshots: any) => {
    if (!initialized || !active) return sendOliveRendered();
    renderer_worker.postMessage({
      type: 'render',
      snapshots: snapshots
    });
  }
};

// export to window (used in olive::VideoDecoderManager)
window.requestVideoRender = Renderer.requestRender;

export default Renderer;

*/

export default class Renderer{}