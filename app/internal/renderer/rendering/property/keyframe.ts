import { Posted } from "worker-postable";
import { PropertyTypes } from "internal/rendering/property/property";
import { InterpolationType, KeyframeBase } from "internal/rendering/property/keyframe";

@Posted('Keyframe')
export class KeyframeRenderer<T extends PropertyTypes> implements KeyframeBase<T> {
  timecode: number;
  value: T;
  interpolationType: InterpolationType;

  constructor(timecode: number, value: T) {
    this.timecode = timecode;
    this.value = value;
  }
}