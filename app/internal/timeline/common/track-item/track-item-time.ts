import { Constructor, MixinBase } from "base/olive/mixin";
import { postable, Postabled } from "worker-postable";

export function WithTrackItemTime<TBase extends Constructor>(Base: TBase) { 
  @Postabled
  class TrackItemTime extends Base {
    static readonly POSTABLE_TYPE = 'olive.timeline.TrackItemTime';

    @postable start: number;
    @postable end: number;
    @postable base: number;

    equals(rhs: TrackItemTime) {
      return this.start == rhs.start && this.end == rhs.end;
    }

    hashCode() {
      return 0;
    }

    less(rhs: TrackItemTime) {
      if  (this.start == rhs.start)
        return this.end < rhs.end;
      return this.start < rhs.start;
    }

    clone(obj: TrackItemTime): Object {
      obj.start = this.start;
      obj.end = this.end;
      obj.base = this.base;
      return obj;
    }
  };
  return TrackItemTime;
}
@Postabled
export class TrackItemTimeBase extends WithTrackItemTime(MixinBase) {}