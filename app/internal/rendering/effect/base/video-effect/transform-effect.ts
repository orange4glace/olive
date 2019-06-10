import { VideoEffect, SerializedVideoEffect } from "./video-effect";
import { Vector2Property, Vector2KeyframeValue } from "../../../property/base/vector2-property";
import { Postable, postable } from "worker-postable";
import { clone } from "base/olive/cloneable";
import { Registry } from "platform/registry/common/platform";
import { EffectFactoryRegistry, IEffectFactory } from "internal/rendering/effect/base/effect-registry";
import { IInstantiationService } from "platform/instantiation/common/instantiation";
import { WithTransformEffectBase } from "internal/rendering/effect/common/video-effect/trasnform-effect";
import { SerializedProperty, Property } from "internal/rendering/property/base/property";

export interface SerializedTransformEffect extends SerializedVideoEffect {
  position: SerializedProperty;
  scale: SerializedProperty;
}

@Postable
export class TransformEffect extends WithTransformEffectBase(VideoEffect) {

  protected position_: Vector2Property;
  public get position() { return this.position_; }
  protected scale_: Vector2Property;
  public get scale() { return this.scale_; }

  constructor(position?: Vector2Property, scale?: Vector2Property) {
    super(TransformEffect.TYPE)

    this.position_ = position || new Vector2Property(new Vector2KeyframeValue(0, 0));
    this.scale_ = scale || new Vector2Property(new Vector2KeyframeValue(1, 1));
  }

  clone(obj: TransformEffect): Object {
    super.clone(obj);
    obj.position_ = clone(this.position);
    obj.scale_ = clone(this.scale);
    return obj;
  }

  serialize(): SerializedTransformEffect {
    return {
      type: this.type,
      position: this.position.serialize(),
      scale: this.scale.serialize()
    }
  }
}

class TransformEffectFactory implements IEffectFactory<TransformEffect> {
  serialize(effect: TransformEffect) {
    return effect.serialize();
  }
  deserialize(instantiationService: IInstantiationService, obj: SerializedTransformEffect): TransformEffect | null {
    if (obj.type !== TransformEffect.TYPE) {
      console.warn('Serial is not SerializedTransformEffect. ' + obj.type);
      return null;
    }
    const position = Property.deserialize(instantiationService, obj.position) as Vector2Property;
    if (!position) {
      console.warn('Deserialize TransformEffect failed. (Position property deserialize failed) ' + obj);
      return null;
    }
    const scale = Property.deserialize(instantiationService, obj.scale) as Vector2Property;
    if (!scale) {
      console.warn('Deserialize TransformEffect failed. (Scale property deserialize failed) ' + obj);
      return null;
    }
    const effect = new TransformEffect(position, scale);
    return effect;
  }
}

Registry.as<EffectFactoryRegistry>(EffectFactoryRegistry.ID).registerFactory(TransformEffect.TYPE, TransformEffectFactory)