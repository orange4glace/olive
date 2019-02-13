/*

const basepath = electron.remote.app.getAppPath();
console.log(`[Internal] Initilaize Decoder module. basepath=${basepath}`);
const module_initializer = require(`../../src/build/Release/module.node`);
const module = module_initializer.initialize(console.log);

*/

export default require(`../../src/build/Release/module.node`);