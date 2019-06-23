import { WithKeyframeValueBase } from "internal/rendering/property/common/keyframe-value";
import { MixinBase } from "base/olive/mixin";
import { Postable } from "worker-postable";

export interface ISerializedKeyframeValue {
  type: string;
}

export interface IKeyframeValue {
  readonly type: string;
  interpolate(lhs: IKeyframeValue, rhs: IKeyframeValue, t: number): IKeyframeValue;
  serialize(): object;
}

@Postable
export class KeyframeValue extends WithKeyframeValueBase(MixinBase) implements IKeyframeValue {
  constructor(type: string) {
    super();
    this.type_ = type;
  }
  
  interpolate(lhs: KeyframeValue, rhs: KeyframeValue, t: number): KeyframeValue {
    throw new Error('NotImplementedException');
  }
  serialize(): object { throw new Error('NotImplementedException') }
}