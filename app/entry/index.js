window.setupWindow = function(data) {
  console.log("[Entry] Initialize",data);
  window.olive_module = data.olive_module;
  window.observer = data.mobx_react.observer;
  window.ResourceRequest = data.ResourceRequest
  
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