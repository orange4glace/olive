import { WithTimelineBase } from "internal/timeline/common/timeline";
import { MixinBase } from "base/olive/mixin";
import NVG from "../../../../nanovg-webgl";
import { Posted } from "worker-postable";

@Posted
export class TimelineVideoRenderer extends WithTimelineBase(MixinBase) {

  async render(time: number, nvg: NVG) {
    for (const track of this.tracks) {
      console.log('TrackItem = ', track.getTrackItemAt(time));
    }
  }

}