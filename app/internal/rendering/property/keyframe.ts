import { PropertyTypes } from "./property";
import { Postable, postable } from "worker-postable";
import { Cloneable, clone } from "base/common/cloneable";

export enum InterpolationType {
  NONE,
  LINEAR,
}

export interface KeyframeBase<T extends PropertyTypes> {
  timecode: number;
  value: T;
  interpolationType: InterpolationType;
}

@Postable
export class Keyframe<T extends PropertyTypes> implements KeyframeBase<T>, Cloneable {
  @postable timecode: number;
  @postable value: T;
  @postable interpolationType: InterpolationType;

  constructor(timecode: number, value: T) {
    this.timecode = timecode;
    this.value = value;
    this.interpolationType = InterpolationType.LINEAR;
  }

  clone(object: Keyframe<T>): Object {
    object.timecode = this.timecode;
    object.value = (typeof this.value == 'object' ? clone(this.value as any) : this.value);
    object.interpolationType = this.interpolationType;
    return object;
  }
}