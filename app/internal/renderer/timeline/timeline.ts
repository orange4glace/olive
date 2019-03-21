import { TimelineBase } from "internal/timeline";
import { TrackRenderer } from "./track";
import { Posted } from "worker-postable";
import NVG from '../../../../nanovg-webgl'

@Posted('Timeline')
export class TimelineRenderer implements TimelineBase {
  
  tracks: Array<TrackRenderer>;

  totalTime: number;
  currentTime: number;

  async draw(nvg: NVG) {
    nvg.beginFrame(1280, 720, 1);
    for (let i = 0; i < this.tracks.length; i++) {
      let track = this.tracks[i];
      await track.draw(nvg, this.currentTime);
    }
    // nvg.endFrame();
  }

  decode(): void {
    this.tracks.forEach(track => {
      track.decode(this.currentTime);
    })
  }

}