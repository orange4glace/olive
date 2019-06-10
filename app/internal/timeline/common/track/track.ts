import { Constructor, MixinBase } from "base/olive/mixin";
import { postable, PostableEventBase, Postabled } from "worker-postable";
import { TrackItemBase } from "internal/timeline/common/track-item/track-item";
import { TrackItemTimeBase } from "internal/timeline/common/track-item/track-item-time";
import { TreeMap } from "tstl";

export function WithTrackBase<TBase extends Constructor>(Base: TBase) { 
  @Postabled
  class TrackBase extends Base {
    static readonly POSTABLE_TYPE = 'olive.timeline.Track';

    @postable protected trackItems_: Map<TrackItemBase, TrackItemTimeBase>;
    public get trackItems() { return this.trackItems_; }
    protected trackItemTreeMap_: TreeMap<TrackItemTimeBase, TrackItemBase>;

    @postable protected POSTABLE_onDidAddTrackItem: PostableEventBase<TrackItemBase>;
    @postable protected POSTABLE_onWillRemoveTrackItem: PostableEventBase<TrackItemBase>;

    getTrackItemAt(time: number): TrackItemBase {
      let q = new TrackItemTimeBase();
      q.start = q.end = time;
      q.base = 0;
      let it = this.trackItemTreeMap_.lower_bound(q);
      if (it.equals(this.trackItemTreeMap_.end()) || time < it.value.first.start)
        if (it.equals(this.trackItemTreeMap_.begin())) return null;
        else it = it.prev();
      if (time < it.value.first.end) return it.value.second;
      return null;
    }
  };
  return TrackBase;
}
@Postabled
export class TrackBase extends WithTrackBase(MixinBase) {}