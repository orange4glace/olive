import './posted.all'
import { VideoRendererGlobal } from 'internal/renderer/video-renderer/global';

import { ObjectStore, postableMessageHandler } from 'worker-postable';
import { VideoRendererMessageEventType, VideoRendererRenderMessageEvent } from 'internal/renderer/video-renderer/message';
import { TimelineVideoRenderer } from 'internal/timeline/video-renderer/timeline';

console.log(ObjectStore);

interface RenderRequest {
  // timeline: TimelineVideoRenderer;
  timeline: any;
  time: number;
  systemTime: number;
}

export class Renderer {

  private playing_: boolean = false;
  private playingRequest_: RenderRequest = null;
  private dirty_: boolean = false;
  private renderReqest_: RenderRequest = null;

  constructor() {
    this.loop_ = this.loop_.bind(this);

    VideoRendererGlobal.initConverter();
    VideoRendererGlobal.initializeDecoderModule();
    
    self.onmessage = this.messageHandler.bind(this);

    requestAnimationFrame(this.loop_);
  }

  private messageHandler(e: MessageEvent) {
    const msg = e.data;
    switch (msg.type) {
      case 'POST':
        console.log(msg);
        this.handlePostableMessage(msg);
        break;
      case 'INIT':
        VideoRendererGlobal.initNanovg(msg.data.canvas);
        break;
      // case VideoRendererMessageEventType.PLAY_RENDER:
      //   this.onPlayRender(msg);
      //   break;
      // case VideoRendererMessageEventType.PAUSE_RENDER:
      //   this.onPauseRender(msg);
      //   break;
      case VideoRendererMessageEventType.RENDER:
        this.onRender(msg);
        break;
    }
  }

  private handlePostableMessage(msg: any) {
    postableMessageHandler(msg.data);
  }

  // private onPlayRender(e: VideoRendererRenderMessageEvent) {
  //   const timeline = ObjectStore.get(e.timelineID) as TimelineVideoRenderer;
  //   this.startTimelineRenderCallback(timeline, e.currentTime, e.systemTime);
  // }

  // private onPauseRender(e: VideoRendererRenderMessageEvent) {
  //   this.stopTimelineRender(()=>{
  //     this.onRender(e);
  //   });
  // }

  private onRender(e: VideoRendererRenderMessageEvent) {
    const timeline = ObjectStore.get(e.timelineID) as TimelineVideoRenderer;
    this.seekTimeline(timeline, e.currentTime); 
  }

  // private startTimelineRenderCallback(timeline: TimelineVideoRenderer, time: number, startSystemTime: number) {
  //   this.playing_ = true;
  //   this.dirty_ = false;
  //   this.playingRequest_ = {
  //     timeline: timeline,
  //     time: time,
  //     systemTime: startSystemTime
  //   };
  // }

  private async seekTimeline(timeline: TimelineVideoRenderer, time: number) {
    this.dirty_ = true;
    this.renderReqest_ = {
      timeline: timeline,
      time: time,
      systemTime: 0
    }
  }

  // private stopTimelineRender(onStopCallback: () => void) {
  //   this.playing_ = false;
  // }

  // private async playingCallback_() {
  //   const elapsedSystemTime = getCurrentSystemTime() - this.playingRequest_.systemTime;
  //   const elapsedTime = this.playingRequest_.timeline.videoSetting.frameRate.systemTimeToTime(elapsedSystemTime);
  //   const currentTime = this.playingRequest_.time + elapsedTime;
  //   await this.renderTimeline(this.playingRequest_.timeline, currentTime);
  // }

  private async dirtyCallback_() {
    const currentTime = this.renderReqest_.time;
    await this.renderTimeline(this.renderReqest_.timeline, currentTime);
    this.dirty_ = false;
  }

  private async renderTimeline(timeline: TimelineVideoRenderer, time: number) {
    console.log(timeline);
    await timeline.render(time);
  }

  private async loop_() {
    if (this.playing_) {}
      // await this.playingCallback_();
    else if (this.dirty_)
      await this.dirtyCallback_();
    requestAnimationFrame(this.loop_);
  }

}

const renderer = new Renderer();
export {
  renderer
}