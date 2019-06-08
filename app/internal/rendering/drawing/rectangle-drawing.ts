import { VideoDrawing, SerializedVideoDrawing } from "internal/rendering/drawing/video-drawing";
import { postable, Postable } from "worker-postable";
import { RectangleEffect, RectangleEffectBase, SerializedRectangleEffect } from "internal/rendering/effect/video-effect/rectangle-effect";
import { DrawingBase, SerializedDrawing, DrawingFactory, DrawingFactoryRegistry } from "internal/rendering/drawing/drawing";
import { clone } from "base/olive/cloneable";
import { Effect } from "internal/rendering/effect/effect";
import { TransformEffect } from "internal/rendering/effect/video-effect/transform-effect";
import { Registry } from "platform/registry/common/platform";
import { IInstantiationService } from "platform/instantiation/common/instantiation";

export interface SerializedRectangleDrawing extends SerializedVideoDrawing {
  rectangleEffect: SerializedRectangleEffect;
}

export interface RectangleDrawingBase extends DrawingBase {
  rectangleEffect: RectangleEffectBase;
}

@Postable
export class RectangleDrawing extends VideoDrawing {

  static readonly TYPE = 'olive.drawing.Rectangle';

  @postable rectangleEffect: RectangleEffect;

  constructor() {
    super(RectangleDrawing.TYPE);
    this.rectangleEffect = new RectangleEffect();
  }

  clone(obj: RectangleDrawing): Object {
    super.clone(obj);
    obj.rectangleEffect = clone(this.rectangleEffect);
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
    const drawing = new RectangleDrawing();
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
    drawing.transformEffect = transformEffect;
    drawing.rectangleEffect = rectangleEffect;
    return drawing;
  }
}

Registry.as<DrawingFactoryRegistry>(DrawingFactoryRegistry.ID).registerFactory(RectangleDrawing.TYPE, RectangleDrawingFactory);