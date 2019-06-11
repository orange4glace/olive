import IDecoder from "internal/decoder/decoder";
import NVG from "../../../../nanovg-webgl";

class RendererGlobal {
  decoder: IDecoder;
  nvg: NVG;
  converter: any;

  initializeDecoderModule() {
    // const basepath = electron.remote.app.getAppPath();
    // console.log(`[Internal] Initilaize Decoder module. basepath=${basepath}`);
    (self as any).requestVideoRender = ()=>{}
    const module_initializer = require(`../../../../decoder/build/Release/module.node`);
    this.decoder = module_initializer.initialize(console.log);
  }

  initNanovg(canvas: HTMLCanvasElement) {
    const nanovg = require(`../../../../nanovg-webgl/build/Release/nanovg_node_webgl.node`);
    let gl: WebGLRenderingContext = canvas.getContext('webgl2', {
      alpha: true,
      premultipliedAlpha: false,
      stencil: true
    }) as WebGLRenderingContext;
    (self as any).gl = gl;
    this.nvg = nanovg.initNanoVG(gl);
  }

  initConverter() {
    const converter = require(`../../../../renderer/build/Release/olive_renderer_module.node`);
    this.converter = converter;
  }
}

export const VideoRendererGlobal = new RendererGlobal();