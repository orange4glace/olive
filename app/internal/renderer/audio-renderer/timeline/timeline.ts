import { Posted, PostedEventListener } from "worker-postable";
import { TimelineRenderer } from "internal/renderer/base/timeline/timeline";

@Posted('TimelineImpl')
export class TimelineAudioRenderer extends TimelineRenderer implements PostedEventListener {

  currentTimePlaying: number;

  private paused: boolean = true;

  private lastPlayingCallbackTime_: number;

  get currentTime() {
    if (this.paused) return this.currentTimePausing;
    return this.currentTimePlaying;
  }

  onPostableInstanceCreated() {
  }

  private playingCallback_() {
    const now = Date.now();
    const dt = now - this.lastPlayingCallbackTime_;
    this.lastPlayingCallbackTime_ = now;
    this.currentTimePlaying += dt / 30;
  }

}