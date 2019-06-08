import { KeyframeBase, InterpolationType, KeyframeValue } from "internal/rendering/property/keyframe";
import { Posted } from "worker-postable";

@Posted('Keyframe')
export class KeyframeRenderer<T extends KeyframeValue> implements KeyframeBase<T> {
  /*@postable*/ timecode: number;
  /*@postable*/ value: T;
  /*@postable*/ interpolationType: InterpolationType;
}