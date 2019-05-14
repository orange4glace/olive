import { postable } from "worker-postable";
import { IComparable } from "tstl";
import { Cloneable } from "base/common/cloneable";

export interface TrackItemTimeBase {
  start: number;
  end: number;
  base: number;
}

export class TrackItemTime implements TrackItemTimeBase, Cloneable, IComparable<TrackItemTime> {

  @postable start: number;
  @postable end: number;
  @postable base: number;

  constructor(start: number, end: number, base: number) {
    this.start = start;
    this.end = end;
    this.base = base;
  }

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
}

export interface ConstTrackItemTime {
  readonly start: number;
  readonly end: number;
  readonly base: number;
}