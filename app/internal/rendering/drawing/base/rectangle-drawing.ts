import { Postable } from "worker-postable";
import { RectangleEffect, SerializedRectangleEffect } from "internal/rendering/effect/base/video-effect/rectangle-effect";
import { clone } from "base/olive/cloneable";
import { Effect } from "internal/rendering/effect/base/effect";
import { TransformEffect } from "internal/rendering/effect/base/video-effect/transform-effect";
import { Registry } from "platform/registry/common/platform";
import { IInstantiationService } from "platform/instantiation/common/instantiation";
import { SerializedVideoDrawing, VideoDrawing } from "internal/rendering/drawing/base/video-drawing";
import { DrawingFactoryRegistry, DrawingFactory } from "internal/rendering/drawing/base/drawing";
import { WithRectangleDrawingBase } from "internal/rendering/drawing/common/rectangle-drawing";

export interface SerializedRectangleDrawing extends SerializedVideoDrawing {
  rectangleEffect: SerializedRectangleEffect;
}

@Postable
export class RectangleDrawing extends WithRectangleDrawingBase(VideoDrawing) {

  protected rectangleEffect_: RectangleEffect;
  public get rectangleEffect() { return this.rectangleEffect_; }

  constructor(transformEffect?: TransformEffect, rectangleEffect?: RectangleEffect) {
    super(RectangleDrawing.TYPE, transformEffect);
    this.rectangleEffect_ = rectangleEffect || new RectangleEffect();
  }

  clone(obj: RectangleDrawing): Object {
    super.clone(obj);
    obj.rectangleEffect_ = clone(this.rectangleEffect);
    return obj;
  }

  serialize(): SerializedRectangleDrawing {
    return {
      ...super.serilaize(),
      rectangleEffect: this.rectangleEffect.serialize()
    }
  }

}

class RectangleDrawingFactory implements DrawingFactory {
  serialize(obj: RectangleDrawing): SerializedRectangleDrawing {
    return obj.serialize();
  }
  deserialize(instantiationService: IInstantiationService, obj: SerializedRectangleDrawing): RectangleDrawing | null {
    if (obj.type !== RectangleDrawing.TYPE) {
      console.warn('RectangleDrawing Serial type not match. ' + JSON.stringify(obj));
      return null;
    }
    const transformEffect = Effect.deserialize(instantiationService, obj.transformEffect) as TransformEffect;
    if (!transformEffect) {
      console.warn('Transform Effect deserialization failed. ' + JSON.stringify(obj));
      return null;
    }
    const rectangleEffect = Effect.deserialize(instantiationService, obj.rectangleEffect) as RectangleEffect;
    if (!rectangleEffect) {
      console.warn('Rectangle Effect deserialization failed. ' + JSON.stringify(obj));
      return null;
    }
    const drawing = new RectangleDrawing(transformEffect, rectangleEffect);
    return drawing;
  }
}

Registry.as<DrawingFactoryRegistry>(DrawingFactoryRegistry.ID).registerFactory(RectangleDrawing.TYPE, RectangleDrawingFactory);