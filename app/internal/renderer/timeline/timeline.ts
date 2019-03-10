import { TimelineBase } from "internal/timeline";
import { TrackRenderer } from "./track";
import { Posted } from "worker-postable";
import NVG from '../../../../nanovg-webgl'

@Posted('Timeline')
export class TimelineRenderer implements TimelineBase {
  
  tracks: Array<TrackRenderer>;

  totalTime: number;
  currentTime: number;

  draw(nvg: NVG): void {
    nvg.beginFrame(300, 150, 1);
    this.tracks.forEach(track => {
      track.draw(nvg, this.currentTime);
    })
    nvg.endFrame();
  }

}