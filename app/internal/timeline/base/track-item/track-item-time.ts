import { postable, Postable } from "worker-postable";
import { IComparable } from "tstl";
import { Cloneable } from "base/olive/cloneable";
import { WithTrackItemTime } from "internal/timeline/common/track-item/track-item-time";
import { MixinBase } from "base/olive/mixin";
import { Timebase, ReadonlyTimebase } from "internal/timeline/base/timebase";

export interface SerializedTrackItemTime {
  start: number;
  end: number;
  base: number;
}

@Postable
export class TrackItemTime extends WithTrackItemTime(MixinBase) implements Cloneable, IComparable<TrackItemTime> {

  constructor(start: number, end: number, base: number) {
    super();
    this.start = start;
    this.end = end;
    this.base = base;
  }

  serialize(): SerializedTrackItemTime {
    return {
      start: this.start,
      end: this.end,
      base: this.base
    }
  }

  rescale(src: ReadonlyTimebase, dst: ReadonlyTimebase): TrackItemTime {
    const st = Timebase.rescale(this.start, src, dst);
    const ed = Timebase.rescale(this.end, src, dst);
    const ba = Timebase.rescale(this.base, src, dst);
    return new TrackItemTime(st, ed, ba);
  }

  static deserialize(obj: SerializedTrackItemTime): TrackItemTime {
    return new TrackItemTime(obj.start, obj.end, obj.base);
  }
}

export interface ConstTrackItemTime {
  readonly start: number;
  readonly end: number;
  readonly base: number;

  rescale(src: ReadonlyTimebase, dst: ReadonlyTimebase): TrackItemTime;
}