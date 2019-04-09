import * as electron from 'electron';

import IDecoder from './decoder'

function initialize(): IDecoder {
  const basepath = electron.remote.app.getAppPath();
  console.log(`[Internal] Initilaize Decoder module. basepath=${basepath}`);
  const module_initializer = require(`../../../decoder/build/Release/module.node`);
  const module = module_initializer.initialize(console.log);

  console.log(module);
  return module;
}

export {
  initialize
}