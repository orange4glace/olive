import { VideoEffect, VideoEffectBase } from "./video-effect";
import { Vector2Property, Vector2PropertyBase } from "../../property/vector2-property";
import { Postable, postable } from "worker-postable";
import { EffectType } from "internal/rendering/effect/effect";
import { clone } from "base/common/cloneable";
import { Vector2 } from "oliveutil/vector2";

export interface TransformEffectBase extends VideoEffectBase {
  position: Vector2PropertyBase;
  scale: Vector2PropertyBase;
}

@Postable
export class TransformEffect extends VideoEffect implements TransformEffectBase {
  @postable position: Vector2Property;
  @postable scale: Vector2Property;

  constructor() {
    super(EffectType.TRANSFORM)

    this.position = new Vector2Property(new Vector2(0, 0));
    this.scale = new Vector2Property(new Vector2(1, 1));
  }

  clone(obj: TransformEffect): Object {
    super.clone(obj);
    obj.position = clone(this.position);
    obj.scale = clone(this.scale);
    return obj;
  }
}