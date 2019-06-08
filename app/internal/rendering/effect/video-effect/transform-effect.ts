import { VideoEffect, VideoEffectBase, SerializedVideoEffect } from "./video-effect";
import { Vector2Property, Vector2PropertyBase, Vector2KeyframeValue } from "../../property/vector2-property";
import { Postable, postable } from "worker-postable";
import { clone } from "base/olive/cloneable";
import { SerializedProperty, Property } from "internal/rendering/property/property";
import { Registry } from "platform/registry/common/platform";
import { EffectFactoryRegistry, IEffectFactory } from "internal/rendering/effect/effect-registry";
import { IInstantiationService } from "platform/instantiation/common/instantiation";

export interface SerializedTransformEffect extends SerializedVideoEffect {
  position: SerializedProperty;
  scale: SerializedProperty;
}

export interface TransformEffectBase extends VideoEffectBase {
  position: Vector2PropertyBase;
  scale: Vector2PropertyBase;
}

@Postable
export class TransformEffect extends VideoEffect implements TransformEffectBase {

  static readonly TYPE = 'olive.effect.video.Transform'

  @postable position: Vector2Property;
  @postable scale: Vector2Property;

  constructor() {
    super(TransformEffect.TYPE)

    this.position = new Vector2Property(new Vector2KeyframeValue(0, 0));
    this.scale = new Vector2Property(new Vector2KeyframeValue(1, 1));
  }

  clone(obj: TransformEffect): Object {
    super.clone(obj);
    obj.position = clone(this.position);
    obj.scale = clone(this.scale);
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
    const effect = new TransformEffect();
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
    effect.position = position;
    effect.scale = scale;
    return effect;
  }
}

Registry.as<EffectFactoryRegistry>(EffectFactoryRegistry.ID).registerFactory(TransformEffect.TYPE, TransformEffectFactory)