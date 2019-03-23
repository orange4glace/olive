import { IComparable } from "tstl";
import { observable } from "mobx";
import { Postable, postable } from "worker-postable";

export class TimePairBase {
  start: number;
  end: number;
}

@Postable
export class TimePair implements TimePairBase, IComparable<TimePair> {
  private static next_hash_code_ = 0;

  @postable start: number;
  @postable end: number;
  private readonly hashcode: number;

  constructor(start: number, end: number) {
    this.start = start;
    this.end = end;
    this.hashcode = TimePair.next_hash_code_++;
  }

  equals(rhs: TimePair) {
    return this.start == rhs.start && this.end == rhs.end;
  }

  hashCode() {
    return 0;
  }

  less(rhs: TimePair) {
    if  (this.start == rhs.start)
      return this.end < rhs.end;
    return this.start < rhs.start;
  }

  clone() {
    return new TimePair(this.start, this.end);
  }

}