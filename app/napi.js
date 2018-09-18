import * as mobx from 'mobx';

console.log("[IMPORT NAPI]");

const module = window.require('C:/Users/orang/Desktop/olive/src/build/Release/module.node');

const exports = module.initialize(mobx, console.log);

const timeline = exports.timeline;

_.mapValues(timeline.layers, l => console.log(timeline));

export {
  timeline
};