const { ipcRenderer } = require('electron');

function initialize(olive_module, mobx_react) {
  console.log("[AppWindow] Initialize",olive_module);
  window.olive_module = olive_module;
  window.observer = mobx_react.observer;
  
  let bundleScript = document.createElement('script');
  bundleScript.src = './bundle.js';
  document.head.appendChild(bundleScript);
}

document.addEventListener('DOMContentLoaded', () => {
  window.opener.dispatchEvent(new CustomEvent('windowready', {
    detail: window
  }));
});

console.log("APP LOADED", Date.now())