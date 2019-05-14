import { PropertyTypes } from "internal/rendering/property/property";
import { KeyframeBase, InterpolationType } from "internal/rendering/property/keyframe";
import { Posted } from "worker-postable";

@Posted('Keyframe')
export class KeyframeRenderer<T extends PropertyTypes> implements KeyframeBase<T> {
  /*@postable*/ timecode: number;
  /*@postable*/ value: T;
  /*@postable*/ interpolationType: InterpolationType;
}