import { VideoEffect, VideoEffectBase } from "./video-effect";
import { ScalarProperty, ScalarPropertyBase } from "../../property/scalar-property";
import { postable, Postable } from "worker-postable";
import { EffectType } from "internal/rendering/effect/effect";
import { clone } from "base/olive/cloneable";

export interface OpacityEffectBase extends VideoEffectBase {
  opacity: ScalarPropertyBase;
}

@Postable
export class OpacityEffect extends VideoEffect {
  @postable opacity: ScalarProperty;

  constructor() {
    super(EffectType.OPACITY)
  }

  clone(obj: OpacityEffect): Object {
    super.clone(obj);
    obj.opacity = clone(this.opacity);
    return obj;
  }

  serialize(): any {
    throw new Error('Not implemeneted');
  }
}