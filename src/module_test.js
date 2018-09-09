const mod = require('./build/release/module');

var value = 0;

var t = Date.now();
mod.sayHello.AddTimelineLayer();
console.log("Elasped",Date.now() - t);

console.log(mod.sayHello);