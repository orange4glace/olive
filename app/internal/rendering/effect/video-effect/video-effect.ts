import { Effect, EffectBase, SerializedEffect } from "../effect";
import { Postable } from "worker-postable";

export interface SerializedVideoEffect extends SerializedEffect {}

export interface VideoEffectBase extends EffectBase {
  
}

@Postable
export abstract class VideoEffect extends Effect implements VideoEffectBase {

  constructor(type: string) {
    super(type);
  }

}