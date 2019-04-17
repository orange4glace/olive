import { Keyframe } from "internal/drawing";

export class KeyframeHost {

  keyframe: Keyframe<any>;

  constructor(keyframe: Keyframe<any>) {
    this.keyframe = keyframe;
  }

}