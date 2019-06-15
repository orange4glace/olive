import { WithTrackBase } from "internal/timeline/common/track/track";
import { MixinBase } from "base/olive/mixin";
import NVG from "../../../../../nanovg-webgl";
import { TrackItemVideoRenderer } from "internal/timeline/video-renderer/track-item/track-item";
import { TrackItemTimeBase } from "internal/timeline/common/track-item/track-item-time";
import { TreeMap, make_pair } from "tstl";
import { Posted, PostedEventListener, PostedEvent, ObjectStore } from "worker-postable";
import { VideoMediaTrackItem } from "internal/timeline/base/track-item/video-media-track-item";

@Posted
export class TrackVideoRenderer extends WithTrackBase(MixinBase) implements PostedEventListener {

  protected trackItems_: Map<TrackItemVideoRenderer, TrackItemTimeBase>;
  public get trackItem() { return this.trackItems_; }
  protected trackItemTreeMap_: TreeMap<TrackItemTimeBase, TrackItemVideoRenderer> = new TreeMap();
  
  protected POSTABLE_onDidAddTrackItem: PostedEvent<number>;
  protected POSTABLE_onWillRemoveTrackItem: PostedEvent<number>;

  onPostableInstanceCreated() {
    this.POSTABLE_onDidAddTrackItem.on = trackItemID => {
      const trackItem: TrackItemVideoRenderer = ObjectStore.get(trackItemID);
      console.warn('POSTABLE_onDidAddTrackItem', trackItem);
      this.trackItemTreeMap_.insert(make_pair(trackItem.time, trackItem));
    }
    this.POSTABLE_onWillRemoveTrackItem.on = trackItemID => {
      const trackItem: TrackItemVideoRenderer = ObjectStore.get(trackItemID);
      console.warn('POSTABLE_onWillRemoveTrackItem', trackItem);
      this.trackItemTreeMap_.erase(trackItem.time);
    }
  }

  async beforeDraw(timecode: number) {
    let trackItem = this.getTrackItemAt(timecode) as TrackItemVideoRenderer;
    if (trackItem == null) return;
    if (trackItem.type == VideoMediaTrackItem.TYPE)
      await trackItem.beforeDraw(timecode);
  }

  async draw(timecode: number) {
    const trackItem = this.getTrackItemAt(timecode) as TrackItemVideoRenderer;
    if (trackItem == null) return;
    if (trackItem.type == VideoMediaTrackItem.TYPE)
      await trackItem.draw(timecode - trackItem.time.start + trackItem.time.base);
  }

  async afterDraw(timecode: number) {
    let trackItem = this.getTrackItemAt(timecode) as TrackItemVideoRenderer;
    if (trackItem == null) return;
    if (trackItem.type == VideoMediaTrackItem.TYPE)
      await trackItem.afterDraw();
  }

  // decode(timecode: number) {
  //   let trackItem = this.getTrackItemAt(timecode);
  //   if (trackItem == null) return;
  //   if (trackItem.type == VideoMediaTrackItem.TYPE) {
  //     let videoTrackItem = trackItem as VideoMediaTrackItemVideoRenderer;
  //     videoTrackItem.decode(timecode - videoTrackItem.time.start + videoTrackItem.time.base);
  //   }
  // }

}