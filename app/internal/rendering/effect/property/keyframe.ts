import { PropertyTypes } from "./property";
import { Postable, postable } from "worker-postable";

export enum InterpolationType {
  NONE,
  LINEAR,
}

export interface KeyframeBase<T extends PropertyTypes> {
  timecode: number;
  value: T;
  next: KeyframeBase<T>;
  prev: KeyframeBase<T>;
  interpolationType: InterpolationType;
}

@Postable
export class Keyframe<T extends PropertyTypes> implements KeyframeBase<T> {
  @postable timecode: number;
  @postable value: T;
  @postable next: Keyframe<T>;
  @postable prev: Keyframe<T>;
  @postable interpolationType: InterpolationType;

  constructor(timecode: number, value: T) {
    this.timecode = timecode;
    this.value = value;
    this.interpolationType = InterpolationType.LINEAR;
  }
}