const fs = require('fs')

// List all files in a directory in Node.js recursively in a synchronous fashion
var walkSync = function(dir, filelist) {
      var path = path || require('path');
      var fs = fs || require('fs'),
          files = fs.readdirSync(dir);
      filelist = filelist || [];
      files.forEach(function(file) {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            filelist = walkSync(path.join(dir, file), filelist);
        }
        else {
        if (file.indexOf('.css') == -1) return;
            filelist.push([file, path.join(dir, file)]);
        }
      });
      return filelist;
  };

var f = [];

var z = '';

walkSync('C:/Users/orang/Downloads/vscode/src/vs/base/browser/', f)
console.log(f);

f.forEach(ff => {
  const c = fs.readFileSync(ff[1]);
  z += `/* ${ff[0]} */\n` + c + '\n\n';
})

console.log(z);

fs.writeFileSync('base.all.css', z);