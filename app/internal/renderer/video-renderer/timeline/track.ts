import { TrackItemVideoRenderer } from "./track-item";
import { Posted, listen, listenable } from "worker-postable";
import NVG from "../../../../../nanovg-webgl";
import { TrackItemType } from "internal/timeline/track-item/track-item-type";
import { TrackRenderer } from "internal/renderer/base/all";
import { VideoTrackItemVideoRenderer } from "internal/renderer/video-renderer/timeline/track-item/video-track-item";

let __next_track_id = 0;

@Posted('TrackImpl')
export class TrackVideoRenderer extends TrackRenderer<TrackItemVideoRenderer> {

  async draw(nvg: NVG, timecode: number) {
    let trackItem = this.getTrackItemAt(timecode);
    if (trackItem == null) return;
    if (trackItem.type == TrackItemType.VIDEO_MEDIA)
      await trackItem.draw(nvg, timecode - trackItem.time.start + trackItem.time.base);
  }

  async afterDraw(nvg: NVG, timecode: number) {
    let trackItem = this.getTrackItemAt(timecode);
    if (trackItem == null) return;
    if (trackItem.type == TrackItemType.VIDEO_MEDIA)
      await trackItem.afterDraw(nvg, timecode - trackItem.time.start + trackItem.time.base);
  }

  decode(timecode: number) {
    let trackItem = this.getTrackItemAt(timecode);
    if (trackItem == null) return;
    if (trackItem.type == TrackItemType.VIDEO_MEDIA) {
      let videoTrackItem = trackItem as VideoTrackItemVideoRenderer;
      videoTrackItem.decode(timecode - videoTrackItem.time.start + videoTrackItem.time.base);
    }
  }
}