const electron = window.require('electron');

const mobx = window.require('mobx');
const mobx_react = window.require('mobx-react');

const basepath = electron.remote.app.getAppPath();
console.log(`[Starter/Common] basepath=${basepath}`);

// Load native Olive module
const olive_module_initializer = window.require(`${basepath}/src/build/Release/module.node`);

const olive = {
  initialize: function() {
    // Initialize Olive module
    olive.module = olive_module_initializer.initialize(mobx, console.log);
    console.log("[Starter/Common] Module initialized.", olive);
  },
  module: null
};

export {
  electron,
  mobx,
  mobx_react,
  olive
}