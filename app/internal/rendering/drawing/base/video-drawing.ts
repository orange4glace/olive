import { Drawing, SerializedDrawing } from "./drawing";
import { Postable, postable } from "worker-postable";
import { TransformEffect, SerializedTransformEffect } from "internal/rendering/effect/base/video-effect/transform-effect";
import { clone } from "base/olive/cloneable";
import { WithVideoDrawingBase } from "internal/rendering/drawing/common/video-drawing";

export interface SerializedVideoDrawing extends SerializedDrawing {
  transformEffect: SerializedTransformEffect;
}

@Postable
export class VideoDrawing extends WithVideoDrawingBase(Drawing) {

  protected transformEffect_: TransformEffect;
  public get transformEffect() { return this.transformEffect_; }

  constructor(type: string, transformEffect?: TransformEffect) {
    super(type);
    this.transformEffect_ = transformEffect || new TransformEffect();
  }

  clone(obj: VideoDrawing): Object {
    super.clone(obj);
    obj.transformEffect_ = clone(this.transformEffect);
    return obj;
  }

  serilaize(): SerializedVideoDrawing {
    return {
      type: this.type,
      transformEffect: this.transformEffect.serialize()
    }
  }

}