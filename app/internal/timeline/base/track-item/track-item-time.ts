import { postable, Postable } from "worker-postable";
import { IComparable } from "tstl";
import { Cloneable } from "base/olive/cloneable";
import { WithTrackItemTime } from "internal/timeline/common/track-item/track-item-time";
import { MixinBase } from "base/olive/mixin";

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

  static deserialize(obj: SerializedTrackItemTime): TrackItemTime {
    return new TrackItemTime(obj.start, obj.end, obj.base);
  }
}

export interface ConstTrackItemTime {
  readonly start: number;
  readonly end: number;
  readonly base: number;
}