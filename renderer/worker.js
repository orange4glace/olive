let basepath;
let module;

onmessage = function(e) {
  console.log(e);
  let data = e.data;
  if (data.type == 'init') {
    basepath = data.basepath;
    module = require(`${basepath}/renderer/build/Release/olive_renderer_module.node`);
    console.log(module);
  }
  if (data.type == 'render') {
    var snapshots = data.snapshots;
    for (var i = 0; i < snapshots.length; i ++) {
      var snapshot = snapshots[i];
      console.log(snapshot);
      console.log(module.AsArrayBuffer(snapshot.data, snapshot.size));
    }
  }
}