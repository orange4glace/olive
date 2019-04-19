import DecoderClient from 'internal/decoder/client'
import { Poster, ReceivedRequest } from 'poster'
import { ObjectStore, postableMessageHandler } from 'worker-postable';
import { TimelineRenderer } from './timeline';
import IDecoder from 'internal/decoder/decoder';

// Force-import to fire @Posted
require('./timeline')
// require('./drawing')
require('./resource')

function initializeDecoderModule() {
  // const basepath = electron.remote.app.getAppPath();
  // console.log(`[Internal] Initilaize Decoder module. basepath=${basepath}`);
  (self as any).requestVideoRender = ()=>{}
  const module_initializer = require(`../../../decoder/build/Release/module.node`);
  const module = module_initializer.initialize(console.log);

  console.log(module);
  return module;
}

export class Renderer {

  renderingTimeline: TimelineRenderer;
  poster: Poster;
  decoder: IDecoder;
  vg: any;
  converter: any;

  constructor() {
    this.poster = new Poster(self);
    this.decoder = initializeDecoderModule();

    this.loop = this.loop.bind(this);
    this.handlePostable = this.handlePostable.bind(this);
    this.initTimeline = this.initTimeline.bind(this);
    this.initNanovg = this.initNanovg.bind(this);

    this.initConverter();
    
    this.poster.addRequestListener('post', this.handlePostable);
    this.poster.addRequestListener('timeline', this.initTimeline);
    this.poster.addRequestListener('canvas', this.initNanovg);
  }

  private handlePostable(req: ReceivedRequest) {
    postableMessageHandler(req.data);
  }

  private initTimeline(req: ReceivedRequest) {
    console.log('[Renderer] initTimeline', req)
    this.renderingTimeline = ObjectStore.get(req.data);
  }

  private initNanovg(req: ReceivedRequest) {
    const canvas = req.data.data;
    console.log(req, canvas)
    const nanovg = require(`../../../nanovg-webgl/build/Release/nanovg_node_webgl.node`);
    let gl: WebGLRenderingContext = canvas.getContext('webgl2', {
      alpha: true,
      premultipliedAlpha: false,
      stencil: true
    });
    (self as any).gl = gl;
    this.vg = nanovg.initNanoVG(gl);

    // setInterval(this.loop, 100)
    requestAnimationFrame(this.loop);
  }

  private initConverter() {
    const converter = require(`../../../renderer/build/Release/olive_renderer_module.node`);
    this.converter = converter;
  }

  private async loop() {
    this.renderingTimeline.decode();
    await this.renderingTimeline.draw(this.vg);
    requestAnimationFrame(this.loop);
  }

}

const renderer = new Renderer();
export {
  renderer
}