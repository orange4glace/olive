import { Effect, EffectBase } from "../effect";
import { Postable } from "worker-postable";

export interface VideoEffectBase extends EffectBase {
  
}

@Postable
export abstract class VideoEffect extends Effect implements VideoEffectBase {

  constructor(type: string) {
    super(type);
  }

}