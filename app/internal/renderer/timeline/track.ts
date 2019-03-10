import { TrackBase, TrackItemBase } from "internal/timeline";
import { TrackItemRenderer } from "./track-item";
import { Posted } from "worker-postable";
import NVG from "../../../../nanovg-webgl";

@Posted('Track')
export class TrackRenderer implements TrackBase {

  trackItems: Set<TrackItemRenderer>;

  private lastAccessedTrackItem: TrackItemRenderer = null;

  getTrackItemAt(time: number) {
    const item = this.accessAfter(time);
    if (item == null) return null;
    if (item.startTime <= time && time < item.endTime) return item;
    return null;
  }

  private accessAfter(query: number): TrackItemRenderer {
    if (this.trackItems.size == 0) return null;
    if (!this.trackItems.has(this.lastAccessedTrackItem))
      this.lastAccessedTrackItem = this.trackItems.values().next().value;
    var lastAccessed = this.lastAccessedTrackItem;
    var ne = lastAccessed.next;
    if (lastAccessed.startTime <= query && query < lastAccessed.endTime) return lastAccessed;

    if (lastAccessed.startTime > query) {
      var candidate = lastAccessed;
      while (true) {
        candidate = lastAccessed;
        lastAccessed = lastAccessed.prev;
        if (lastAccessed == null) break;
        this.lastAccessedTrackItem = lastAccessed;
        if (lastAccessed.endTime <= query) break;
      }
      return candidate;
    }

    else {
      while (lastAccessed != null) {
        this.lastAccessedTrackItem = lastAccessed;
        if (lastAccessed.endTime > query) break;
        lastAccessed = lastAccessed.next;
      }
      return lastAccessed;
    }
  }

  draw(nvg: NVG, timecode: number) {
    let trackItem = this.getTrackItemAt(timecode);
    if (trackItem == null) return;
    trackItem.draw(nvg, timecode);
  }
}