import { Drawing, DrawingBase, SerializedDrawing, DrawingFactory } from "./drawing";
import { VideoEffect } from "../effect/video-effect/video-effect";
import { Postable, postable } from "worker-postable";
import { EffectBase, Effect } from "internal/rendering/effect/effect";
import { TransformEffect, TransformEffectBase, SerializedTransformEffect } from "internal/rendering/effect/video-effect/transform-effect";
import { clone } from "base/olive/cloneable";

export interface SerializedVideoDrawing extends SerializedDrawing {
  transformEffect: SerializedTransformEffect;
}

export interface VideoDrawingBase extends DrawingBase {
  transformEffect: TransformEffectBase;
}

@Postable
export abstract class VideoDrawing extends Drawing implements VideoDrawingBase {

  @postable transformEffect: TransformEffect;

  constructor(type: string) {
    super(type);
    this.transformEffect = new TransformEffect();
  }

  clone(obj: VideoDrawing): Object {
    super.clone(obj);
    obj.transformEffect = clone(this.transformEffect);
    return obj;
  }

  serilaize(): SerializedVideoDrawing {
    return {
      type: this.type,
      transformEffect: this.transformEffect.serialize()
    }
  }

}