const mod = require('./build/release/module');

var value = 0;

var t = Date.now();
for (var i = 0; i < 3; i++)
var layer = mod.sayHello.AddTimelineLayer();

var item = mod.sayHello.AddTimelineItem(layer.native, 30, 60)
mod.sayHello.MoveTimelineItem(layer.native, item.native, 15, 40)

console.log("Elasped",Date.now() - t);