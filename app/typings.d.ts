declare module '*.scss';
declare module '*.node';

declare module "worker-loader!*" {
  class WebpackWorker extends Worker {
    constructor();
  }

  export default WebpackWorker;
}

declare module 'ffprobe' {
  function getInfo(filePath: string, opts: {
    path: string
  }, cb: (err: any, info: any)=>void): void;
  export = getInfo;
}