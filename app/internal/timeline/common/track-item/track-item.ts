import { Constructor, MixinBase } from "base/olive/mixin";
import { postable, Postabled } from "worker-postable";
import { TrackItemTimeBase } from "internal/timeline/common/track-item/track-item-time";
import { TimebaseBase, ReadonlyTimebaseBase } from "internal/timeline/common/timebase";

export type TrackItemBaseCtor = new (...args: any[]) => TrackItemBase;
export function WithTrackItemBase<TBase extends Constructor>(Base: TBase) { 
  @Postabled
  class TrackItemBase extends Base {
    static readonly POSTABLE_TYPE = 'olive.timeline.TrackItem';

    @postable protected type_: string;
    public get type() { return this.type_; }

    @postable protected timebase_: TimebaseBase;
    public get timebase(): ReadonlyTimebaseBase { return this.timebase_; }

    @postable protected time_: TrackItemTimeBase;
    public get time() { return this.time_; }

    getTimeoffset(time: number) {
      return time - this.time.start + this.time.base;
    }
  
    isInTime(time: number): boolean {
      return this.time.start <= time && time < this.time.end;
    }
  };
  return TrackItemBase;
}
@Postabled
export class TrackItemBase extends WithTrackItemBase(MixinBase) {}