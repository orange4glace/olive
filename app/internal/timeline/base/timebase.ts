import { WithTimebase, ReadonlyTimebaseBase } from "internal/timeline/common/timebase";
import { MixinBase } from "base/olive/mixin";
import { Postable } from "worker-postable";
import { Cloneable } from "base/olive/cloneable";
import { Serializable } from "base/olive/serialize";

export interface SerializedTimebase {
  num: number;
  den: number;
}

export interface ReadonlyTimebase extends ReadonlyTimebaseBase {
  serialize(): SerializedTimebase;
}

@Postable
export class Timebase extends WithTimebase(MixinBase) implements Cloneable, Serializable {

  constructor(num: number, den: number) {
    super();
    this.num_ = num;
    this.den_ = den;
  }

  clone(obj: Timebase) {
    obj.num_ = this.num_;
    obj.den_ = this.den_;
    return obj;
  }

  serialize(): SerializedTimebase {
    return {
      num: this.num,
      den: this.den
    }
  }

  static deserialize(serial: SerializedTimebase) {
    return new Timebase(serial.num, serial.den);
  }

}