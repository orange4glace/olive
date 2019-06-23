import { Constructor, MixinBase } from "base/olive/mixin";
import { postable, PostableEventBase, Postabled } from "worker-postable";
import { TrackItemBase } from "internal/timeline/common/track-item/track-item";
import { TreeMultiMap, Pair, make_pair } from "tstl";
import { TimebaseBase, ReadonlyTimebaseBase } from "internal/timeline/common/timebase";

export function WithTrackBase<TBase extends Constructor>(Base: TBase) { 
  @Postabled
  class TrackBase extends Base {
    static readonly POSTABLE_TYPE = 'olive.timeline.Track';

    @postable protected timebase_: TimebaseBase;
    public get timebase(): ReadonlyTimebaseBase { return this.timebase_; };

    @postable protected trackItems_: Set<TrackItemBase>;
    public get trackItems() { return this.trackItems_; }

    protected trackItemStartTimeMap_: TreeMultiMap<number, TrackItemBase>;
    protected trackItemEndTimeMap_: TreeMultiMap<number, TrackItemBase>;
    protected trackItemTimeMap_: Map<TrackItemBase, Pair<number, number>>;

    @postable protected POSTABLE_onDidAddTrackItem: PostableEventBase<TrackItemBase>;
    @postable protected POSTABLE_onWillRemoveTrackItem: PostableEventBase<TrackItemBase>;

    @postable protected POSTABLE_onDidUpsertTrackItemTime: PostableEventBase<number>;
    @postable protected POSTABLE_onDidRemoveTrackItemTime: PostableEventBase<number>;

    constructor(...args: any[]) {
      super(args);
      this.trackItemStartTimeMap_ = new TreeMultiMap();
      this.trackItemEndTimeMap_ = new TreeMultiMap();
      this.trackItemTimeMap_ = new Map();
    }

    protected doUpsertTrackItemTime(trackItem: TrackItemBase) {
      if (this.trackItemTimeMap_.has(trackItem)) {
      console.log('REMREM');
        const oldTimePair = this.trackItemTimeMap_.get(trackItem);
        let it = this.trackItemStartTimeMap_.find(oldTimePair.first);
        while (it.value.second !== trackItem) it = it.next();
        this.trackItemStartTimeMap_.erase(it);
        it = this.trackItemEndTimeMap_.find(oldTimePair.second);
        while (it.value.second !== trackItem) it = it.next();
        this.trackItemEndTimeMap_.erase(it);
      }
      const start = trackItem.time.start;
      const end = trackItem.time.end;
      console.log('doUpsertTrackItemTime',start,end);
      const timePair = new Pair(start, end);
      this.trackItemTimeMap_.set(trackItem, timePair);
      this.trackItemStartTimeMap_.insert(make_pair(start, trackItem));
      this.trackItemEndTimeMap_.insert(make_pair(end, trackItem));
    }

    protected doRemoveTrackItemTime(trackItem: TrackItemBase) {
      if (!this.trackItemTimeMap_.has(trackItem)) return;
      const timePair = this.trackItemTimeMap_.get(trackItem);
      this.trackItemTimeMap_.delete(trackItem);
      const start = timePair.first;
      const end = timePair.second;
      console.log('doRemoveTrackItemTime',start,end);
      let it = this.trackItemStartTimeMap_.find(start);
      while (it.value.second !== trackItem) it = it.next();
      this.trackItemStartTimeMap_.erase(it);
      it = this.trackItemEndTimeMap_.find(end);
      while (it.value.second !== trackItem) it = it.next();
      this.trackItemEndTimeMap_.erase(it);
    }

    getTrackItemAt(time: number): TrackItemBase | null {
      let it = this.trackItemEndTimeMap_.upper_bound(time);
      if (it.equals(this.trackItemStartTimeMap_.end())) return null;
      const candidate = it.value.second;
      const timePair = this.trackItemTimeMap_.get(candidate);
      if (timePair.first <= time) return candidate;
      return null;
    }

    getTrackItemBefore(time: number): TrackItemBase | null {
      const at = this.getTrackItemAt(time);
      if (at) return at;
      let it = this.trackItemStartTimeMap_.lower_bound(time);
      if (it.equals(this.trackItemStartTimeMap_.begin())) return null;
      return it.prev().value.second;
    }

    getTrackItemAfter(time: number): TrackItemBase | null {
      const at = this.getTrackItemAt(time);
      if (at) return at;
      let it = this.trackItemStartTimeMap_.lower_bound(time);
      if (it.equals(this.trackItemEndTimeMap_.end())) return null;
      return it.value.second;
    }

    getTrackItemsBetween(startTime: number, endTime: number): TrackItemBase[] {
      const result: TrackItemBase[] = [];
      let it = this.trackItemEndTimeMap_.lower_bound(startTime);
      while (!it.equals(this.trackItemEndTimeMap_.end()) && it.value.second.time.end <= startTime) {
        result.push(it.value.second)
        it = it.next();
      }
      return result;
    }
  };
  return TrackBase;
}
@Postabled
export class TrackBase extends WithTrackBase(MixinBase) {}