import * as mobx from 'mobx';

const module = window.require('C:/Users/orang/Desktop/olive/src/build/Release/module.node');

const exports = module.initialize(mobx, console.log);

const timeline = exports.timeline;

for (var i = 0; i < 10; i ++)
console.log("#####################");
console.log(timeline);

export {
  timeline
};