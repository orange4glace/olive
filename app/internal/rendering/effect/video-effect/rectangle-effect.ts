import { VideoEffect, VideoEffectBase } from "internal/rendering/effect/video-effect/video-effect";
import { postable } from "worker-postable";
import { Vector4Property, Vector4PropertyBase } from "internal/rendering/property/vector4-property";
import { Vector4 } from "oliveutil/vector4";
import { clone } from "base/common/cloneable";

export interface RectangleEffectBase extends VideoEffectBase {
  size: Vector4PropertyBase;
}

export class RectangleEffect extends VideoEffect {
  @postable size: Vector4Property;

  constructor() {
    super('Rectangle');
    this.size = new Vector4Property(new Vector4(-100, 100, 100, -100));
  }

  clone(obj: RectangleEffect): Object {
    super.clone(obj);
    obj.size = clone(this.size);
    return obj;
  }
}