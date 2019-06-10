import { Effect, SerializedEffect } from "../effect";
import { Postable, postable } from "worker-postable";
import { WithVideoEffectBase } from "internal/rendering/effect/common/video-effect/video-effect";

export interface SerializedVideoEffect extends SerializedEffect {}

@Postable
export class VideoEffect extends WithVideoEffectBase(Effect) {
  constructor(type: string) {
    super(type);
  }
}