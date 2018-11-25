import { electron, olive } from 'starter/common';

const basepath = electron.remote.app.getAppPath();

let renderer_worker = null;
let initialized = false;
let active = true;

function sendOliveRendered() {
  olive.module.Rendered();
}

const Renderer = {
  initialize: function(canvas) {
    var offscreen = canvas.transferControlToOffscreen();
    renderer_worker = new Worker("/renderer/worker.js");
    renderer_worker.postMessage({
      type: 'init',
      basepath: basepath,
      canvas: offscreen
    }, [offscreen]);
    initialized = true;

    renderer_worker.addEventListener('message', e => {
      var type = e.data.type;
      if (type == 'rendered') return sendOliveRendered();
    });
  },
  setActive: function(value) {

  },
  requestRender: (snapshots) => {
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