import { forceImport as baseForceImport, TimelineRenderer } from 'internal/renderer/base/all'
import { forceImport as videoRendererForceImport } from 'internal/renderer/video-renderer/all'

import { Poster, ReceivedRequest } from 'poster'
import { ObjectStore, postableMessageHandler } from 'worker-postable';
import IDecoder from 'internal/decoder/decoder';
import { TimelineManagerVideoRenderer } from 'internal/renderer/video-renderer/timeline/timeline-manager';
import { VideoRendererMessageEventType, VideoRendererRenderMessageEvent } from 'internal/renderer/video-renderer/message';
import { TimelineVideoRenderer } from 'internal/renderer/video-renderer/timeline/timeline';
import { getCurrentSystemTime } from 'base/common/time';
import { assert } from 'base/common/assert';

baseForceImport();
videoRendererForceImport();

function initializeDecoderModule() {
  // const basepath = electron.remote.app.getAppPath();
  // console.log(`[Internal] Initilaize Decoder module. basepath=${basepath}`);
  (self as any).requestVideoRender = ()=>{}
  const module_initializer = require(`../../../../decoder/build/Release/module.node`);
  const module = module_initializer.initialize(console.log);

  console.log(module);
  return module;
}

interface RenderCallbackDisposer {
  dispose: () => null;
  fireDispose: () => void;
  disposed: boolean;
  onDispose: () => void;
}

export class Renderer {

  private timelineManager_: TimelineManagerVideoRenderer;
  poster: Poster;
  decoder: IDecoder;
  vg: any;
  converter: any;


  private renderCallbackDisposer_: RenderCallbackDisposer;
  private currentRenderPromise_: Promise<null>;


  constructor() {
    this.poster = new Poster(self);
    this.decoder = initializeDecoderModule();

    this.handlePostable = this.handlePostable.bind(this);
    this.initTimelineManager = this.initTimelineManager.bind(this);
    this.initNanovg = this.initNanovg.bind(this);

    this.initConverter();
    
    self.onmessage = this.messageHandler.bind(this);
  }

  private messageHandler(e: MessageEvent) {
    const msg = e.data;
    switch (msg.type) {
      case 'POST':
        console.log(msg);
        postableMessageHandler(msg.data);
        break;
      case 'INIT':
        this.initTimelineManager(msg.data.timelineManager);
        this.initNanovg(msg.data.canvas);
        break;
      case VideoRendererMessageEventType.PLAY_RENDER:
        this.onPlayRender(msg);
        break;
      case VideoRendererMessageEventType.PAUSE_RENDER:
        this.onPauseRender(msg);
        break;
      case VideoRendererMessageEventType.RENDER:
        this.onRender(msg);
        break;
    }
  }

  private handlePostable(req: ReceivedRequest) {
    postableMessageHandler(req.data);
  }

  private onPlayRender(e: VideoRendererRenderMessageEvent) {
    const timeline = this.timelineManager_.getTimeline(e.timelineID);
    const elapsedTime = timeline.sequence.videoSetting.frameRate.systemTimeToTime(Date.now() - e.systemTime);
    this.startTimelineRenderCallback(timeline, e.currentTime + elapsedTime);
  }

  private onPauseRender(e: VideoRendererRenderMessageEvent) {
    this.stopTimelineRender(()=>{
      this.onRender(e);
    });
  }

  private onRender(e: VideoRendererRenderMessageEvent) {
    const timeline = this.timelineManager_.getTimeline(e.timelineID);
    assert(timeline, 'Timeline ' + e.timelineID + ' not found!');
    const elapsedTime = timeline.sequence.videoSetting.frameRate.systemTimeToTime(Date.now() - e.systemTime);
    this.seekTimeline(timeline, e.currentTime + elapsedTime);
  }

  private startTimelineRenderCallback(timeline: TimelineVideoRenderer, time: number) {
    this.stopTimelineRender(() => {
      const disposer: RenderCallbackDisposer = {
        dispose: function() {
          this.disposed = true;
          if (this.callback) this.callback();
          return null;
        },
        fireDispose: function() {
          if (typeof this.onDispose == 'function')
            this.onDispose();
        },
        disposed: false,
        onDispose: null
      }
      this.renderCallbackDisposer_ = disposer;
      requestAnimationFrame(this.renderTimelineCallback.bind(this, timeline, time, Date.now(), disposer));
    });
  }

  private async seekTimeline(timeline: TimelineVideoRenderer, time: number) {
    this.stopTimelineRender(async () => {
      const disposer: RenderCallbackDisposer = {
        dispose: function() {
          if (this.disposed) return null;
          this.disposed = true;
          if (this.callback) this.callback();
          return null;
        },
        fireDispose: function() {
          if (typeof this.onDispose == 'function')
            this.onDispose();
        },
        disposed: false,
        onDispose: null
      }
      this.renderCallbackDisposer_ = disposer;
      await this.renderTimeline(timeline, time);
      disposer.dispose();
      disposer.fireDispose();
    });
  }

  private stopTimelineRender(onStopCallback: () => void) {
    if (!this.renderCallbackDisposer_ || this.renderCallbackDisposer_.disposed) {
      onStopCallback();
      return;
    }
    this.renderCallbackDisposer_.onDispose = onStopCallback;
    this.renderCallbackDisposer_ = this.renderCallbackDisposer_.dispose();
  }

  private async renderTimelineCallback(timeline: TimelineVideoRenderer, startTime: number,
      startSystemTime: number, disposer: RenderCallbackDisposer) {
    if (disposer.disposed) {
      disposer.fireDispose();
      return;
    }
    const elapsedSystemTime = getCurrentSystemTime() - startSystemTime;
    const elapsedTime = timeline.sequence.videoSetting.frameRate.systemTimeToTime(elapsedSystemTime);
    const currentTime = startTime + elapsedTime;
    await this.renderTimeline(timeline, currentTime);
    if (disposer.disposed) {
      disposer.fireDispose();
      return;
    }
    requestAnimationFrame(this.renderTimelineCallback.bind(this, timeline, startTime, startSystemTime));
  }

  private async renderTimeline(timeline: TimelineVideoRenderer, time: number) {
    timeline.decode(time);
    await timeline.render(time, this.vg);
  }

  private initTimelineManager(timelineManagerPostableID: number) {
    console.log('[Renderer] initTimeline', timelineManagerPostableID);
    this.timelineManager_ = ObjectStore.get(timelineManagerPostableID);
  }

  private initNanovg(canvas: HTMLCanvasElement) {
    console.log(canvas)
    const nanovg = require(`../../../../nanovg-webgl/build/Release/nanovg_node_webgl.node`);
    let gl: WebGLRenderingContext = canvas.getContext('webgl2', {
      alpha: true,
      premultipliedAlpha: false,
      stencil: true
    }) as WebGLRenderingContext;
    (self as any).gl = gl;
    this.vg = nanovg.initNanoVG(gl);
  }

  private initConverter() {
    const converter = require(`../../../../renderer/build/Release/olive_renderer_module.node`);
    this.converter = converter;
  }

}

const renderer = new Renderer();
export {
  renderer
}