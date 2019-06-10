import { VideoEffect, SerializedVideoEffect } from "internal/rendering/effect/base/video-effect/video-effect";
import { postable, Postable } from "worker-postable";
import { Vector4Property, Vector4KeyframeValue } from "internal/rendering/property/base/vector4-property";
import { clone } from "base/olive/cloneable";
import { WithRectangleEffectBase } from "internal/rendering/effect/common/video-effect/rectangle-effect";
import { SerializedProperty } from "internal/rendering/property/base/property";

export interface SerializedRectangleEffect extends SerializedVideoEffect {
  size: SerializedProperty;
}

@Postable
export class RectangleEffect extends WithRectangleEffectBase(VideoEffect) {

  protected size_: Vector4Property;
  public get size() { return this.size_; }

  constructor() {
    super('Rectangle');
    this.size_ = new Vector4Property(new Vector4KeyframeValue(-100, 100, 100, -100));
  }

  clone(obj: RectangleEffect): Object {
    super.clone(obj);
    obj.size_ = clone(this.size);
    return obj;
  }

  serialize(): SerializedRectangleEffect {
    return {
      type: this.type,
      size: this.size.serialize()
    }
  }
}