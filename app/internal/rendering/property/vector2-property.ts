import { PropertyBase, Property, PropertyFactoryRegistry } from "./property";
import { Postable, postable, Posted } from "worker-postable";
import { Vector2, Vector2Base } from "oliveutil/vector2";
import { ISerializedKeyframeValue, KeyframeValue, KeyframeValueFactoryRegistry, IKeyframeValueFactory } from "internal/rendering/property/keyframe";
import { Registry } from "platform/registry/common/platform";
import { IInstantiationService } from "platform/instantiation/common/instantiation";

export interface SerializedVector2KeyframeValue extends ISerializedKeyframeValue {
  x: number;
  y: number;
}

@Posted('Vector2KeyframeValue')
export class Vector2KeyframeValue extends KeyframeValue {
  static readonly TYPE = 'olive.property.keyframe.value.Vector2'

  @postable x: number;
  @postable y: number;

  constructor(x: number, y: number) {
    super(Vector2KeyframeValue.TYPE);
    this.x = x;
    this.y = y;
  }

  serialize(): SerializedVector2KeyframeValue {
    return {
      type: Vector2KeyframeValue.TYPE,
      x: this.x,
      y: this.y
    };
  }
}

class Vector2KeyframeValueFactory implements IKeyframeValueFactory {
  serialize(value: Vector2KeyframeValue): SerializedVector2KeyframeValue {
    return value.serialize();
  }
  deserialize(instantiationService: IInstantiationService, obj: SerializedVector2KeyframeValue): Vector2KeyframeValue {
    if (obj.type !== Vector2KeyframeValue.TYPE) throw new Error('Keyframe value type invalid. ' + obj.type);
    return new Vector2KeyframeValue(obj.x, obj.y);
  }
}
Registry.as<KeyframeValueFactoryRegistry>(KeyframeValueFactoryRegistry.ID).registerFactory(Vector2KeyframeValue.TYPE, Vector2KeyframeValueFactory);

export interface Vector2PropertyBase extends PropertyBase<Vector2KeyframeValue> {
}

@Postable
export class Vector2Property extends Property<Vector2KeyframeValue> implements Vector2PropertyBase {
  static readonly TYPE = 'olive.property.Vector2'

  constructor(defaultValue: Vector2KeyframeValue) {
    super(Vector2KeyframeValue.TYPE, defaultValue);
    this.animatable = true;
  }

  createValue(x: number, y: number): Vector2KeyframeValue {
    return new Vector2KeyframeValue(x, y);
  }

  cloneValue(value: Vector2KeyframeValue): Vector2KeyframeValue {
    return new Vector2KeyframeValue(value.x, value.y);
  }

  interpolate(lhs: Vector2KeyframeValue, rhs: Vector2KeyframeValue, t: number): Vector2KeyframeValue {
    return new Vector2KeyframeValue(
      lhs.x + (rhs.x - lhs.x) * t,
      lhs.y + (rhs.y - lhs.y) * t);
  }

}

Registry.as<PropertyFactoryRegistry>(PropertyFactoryRegistry.ID).registerFactory(Vector2Property.TYPE, Vector2Property);