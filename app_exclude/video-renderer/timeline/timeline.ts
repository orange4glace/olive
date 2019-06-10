import { TimelineBase } from "internal/timeline/common/timeline";
import { Posted, PostedEvent, PostedEventListener } from "worker-postable";
import NVG from '../../../../../nanovg-webgl'
import { TimelineRenderer } from "internal/renderer/base/all";
import { TrackVideoRenderer } from "internal/renderer/video-renderer/timeline/track";

@Posted('TimelineImpl')
export class TimelineVideoRenderer extends TimelineRenderer<TrackVideoRenderer>
    implements PostedEventListener {
      
  currentTimePlaying: number;

  private paused: boolean = true;

  private playingInterval_: number;
  private lastPlayingCallbackTime_: number;

  onPostableInstanceCreated() {
  }

  private playingCallback_() {
    const now = Date.now();
    const dt = now - this.lastPlayingCallbackTime_;
    this.lastPlayingCallbackTime_ = now;
    this.currentTimePlaying += dt / 30;
  }

  async render(time: number, nvg: NVG) {
    nvg.beginFrame(1080, 720, 1);
    for (let i = 0; i < this.tracks.length; i++) {
      let track = this.tracks[i];
      await track.draw(nvg, time);
    }
    nvg.endFrame();
    for (let i = 0; i < this.tracks.length; i++) {
      let track = this.tracks[i];
      await track.afterDraw(nvg, time);
    }
  }

  decode(time: number): void {
    this.tracks.forEach(track => {
      track.decode(time);
    })
  }

}