import { Posted } from "worker-postable";
import { IComparable } from "tstl";
import { TrackItemTimeBase } from "internal/timeline/track-item/track-item-time";

@Posted('TrackItemTime')
export class TrackItemTimeRenderer implements TrackItemTimeBase, IComparable<TrackItemTimeRenderer> {
  start: number;
  end: number;
  base: number;

  // constructor(start: number, end: number, base: number) {
  //   this.start = start;
  //   this.end = end;
  //   this.base = base;
  // }

  equals(rhs: TrackItemTimeRenderer) {
    return this.start == rhs.start && this.end == rhs.end;
  }

  hashCode() {
    return 0;
  }

  less(rhs: TrackItemTimeRenderer) {
    if  (this.start == rhs.start)
      return this.end < rhs.end;
    return this.start < rhs.start;
  }

  // clone(): TrackItemTimeRenderer {
  //   return new TrackItemTimeRenderer(this.start, this.end, this.base);
  // }
}