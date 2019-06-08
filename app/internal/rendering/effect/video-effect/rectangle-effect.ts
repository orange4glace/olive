import { VideoEffect, VideoEffectBase, SerializedVideoEffect } from "internal/rendering/effect/video-effect/video-effect";
import { postable } from "worker-postable";
import { Vector4Property, Vector4PropertyBase, Vector4KeyframeValue } from "internal/rendering/property/vector4-property";
import { clone } from "base/olive/cloneable";
import { SerializedProperty } from "internal/rendering/property/property";

export interface SerializedRectangleEffect extends SerializedVideoEffect {
  size: SerializedProperty;
}

export interface RectangleEffectBase extends VideoEffectBase {
  size: Vector4PropertyBase;
}

export class RectangleEffect extends VideoEffect {
  @postable size: Vector4Property;

  constructor() {
    super('Rectangle');
    this.size = new Vector4Property(new Vector4KeyframeValue(-100, 100, 100, -100));
  }

  clone(obj: RectangleEffect): Object {
    super.clone(obj);
    obj.size = clone(this.size);
    return obj;
  }

  serialize(): SerializedRectangleEffect {
    return {
      type: this.type,
      size: this.size.serialize()
    }
  }
}