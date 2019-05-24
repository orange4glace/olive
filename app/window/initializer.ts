import WindowParam from 'window/window-param';
import app from 'internal/app';

function initialize(param: WindowParam) {
  app.services = param.app.services;
  app.mobx = param.app.mobx;
  app.canvas = param.app.canvas;
  console.log('[Window] Initialize', app);
  console.log('initilaize', param.app);

  let bundleScript = document.createElement('script');
  bundleScript.src = './window.js';
  document.head.appendChild(bundleScript);

  // let devtoolsScript = document.createElement('script');
  // devtoolsScript.src = 'http://localhost:8097';
  // document.head.appendChild(devtoolsScript);
}

// must cast as any to set property on window
const _global = (window /* browser */ || global /* node */) as any
_global.initialize = initialize;

window.opener.dispatchEvent(new CustomEvent('start-app-window', {
  detail: window
}));

/*

window.setupWindow = function(data) {
  console.log("[Entry] Initialize",data);
  window.olive_module = data.olive_module;
  window.mobx = data.mobx;
  window.observer = data.mobx_react.observer;
  window.ResourceRequest = data.ResourceRequest
  window.Renderer = data.Renderer;
  window.Timeline = data.Timeline;
  
  let bundleScript = document.createElement('script');
  bundleScript.src = './app.js';
  document.head.appendChild(bundleScript);
}

function _start() {
  console.log("[Entry] Start");
  window.opener.dispatchEvent(new CustomEvent('start-app-window', {
    detail: window
  }));
}

_start();

*/