import DecoderClient from 'internal/decoder/client'
import { Poster, ReceivedRequest } from 'poster'
import { ObjectStore, postableMessageHandler } from 'worker-postable';
import { TimelineRenderer } from './timeline';

// Force-import to fire @Posted
require('./timeline')
require('./drawing')
require('./resource')

export class Renderer {

  renderingTimeline: TimelineRenderer;
  poster: Poster;
  decoderClient: DecoderClient;
  vg: any;
  converter: any;

  constructor() {
    this.poster = new Poster(self);
    this.decoderClient = new DecoderClient(this.poster);

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
    let gl = canvas.getContext('webgl2');
    this.vg = nanovg.initNanoVG(gl);
    let buf = new ArrayBuffer(1280 * 720 * 4);
    let view = new Uint8Array(buf);
    for (var i = 0; i < 1280 * 720 * 4; i ++) view[i] = Math.floor(Math.random()*255);

    var ff: any = (function f(gl: WebGLRenderingContext) {
      console.log('CALL FF', view)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1280, 720, 0, gl.RGBA, gl.UNSIGNED_BYTE, view);
    }).bind(self, gl)
    console.log(self);
    (self as any).func = ff;

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