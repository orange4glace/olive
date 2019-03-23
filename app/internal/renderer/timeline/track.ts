import { TrackBase, TrackItemBase, TrackItemType } from "internal/timeline";
import { TrackItemRenderer } from "./track-item";
import { Posted } from "worker-postable";
import NVG from "../../../../nanovg-webgl";

let __next_track_id = 0;

@Posted('Track')
export class TrackRenderer implements TrackBase {

  readonly id: number = __next_track_id++;
  trackItems: Set<TrackItemRenderer>;

  private lastAccessedTrackItem: TrackItemRenderer = null;

  getTrackItemAt(time: number): TrackItemRenderer {
    return null;
  }

  private accessAfter(query: number): TrackItemRenderer {
    return null;
  }

  async draw(nvg: NVG, timecode: number) {
    let trackItem = this.getTrackItemAt(timecode);
    if (trackItem == null) return;
    await trackItem.draw(nvg, timecode);
  }

  decode(timecode: number) {
    return;
    /*
    let trackItem = this.getTrackItemAt(timecode);
    if (trackItem == null) return;
    if (trackItem.type == TrackItemType.VIDEO) {
      let videoTrackItem = trackItem as VideoTrackItemRenderer;
      videoTrackItem.decode(timecode - videoTrackItem.startTime);
    }
    */
  }
}