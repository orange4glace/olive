import { Property, PropertyFactoryRegistry } from "./property";
import { Postable, postable, Posted } from "worker-postable";
import { KeyframeValueFactoryRegistry, IKeyframeValueFactory } from "internal/rendering/property/base/keyframe";
import { Registry } from "platform/registry/common/platform";
import { IInstantiationService } from "platform/instantiation/common/instantiation";
import { ISerializedKeyframeValue, KeyframeValue } from "internal/rendering/property/base/keyframe-value";
import { WithVector2PropertyBase, WithVector2KeyframeValueBase } from "internal/rendering/property/common/vector2-property";

export interface SerializedVector2KeyframeValue extends ISerializedKeyframeValue {
  x: number;
  y: number;
}

@Postable
export class Vector2KeyframeValue extends WithVector2KeyframeValueBase(KeyframeValue) {
  static readonly TYPE = 'olive.property.keyframe.value.Vector2'

  constructor(x: number, y: number) {
    super(Vector2KeyframeValue.TYPE);
    this.x_ = x;
    this.y_ = y;
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



@Postable
class _Vector2Property extends Property<Vector2KeyframeValue> {
  createValue(x: number, y: number): Vector2KeyframeValue {
    return new Vector2KeyframeValue(x, y);
  }

  cloneValue(value: Vector2KeyframeValue): Vector2KeyframeValue {
    return new Vector2KeyframeValue(value.x, value.y);
  }
}

@Postable
export class Vector2Property extends WithVector2PropertyBase(_Vector2Property) {
  static readonly TYPE = 'olive.property.Vector2'

  constructor(defaultValue: Vector2KeyframeValue) {
    super(Vector2KeyframeValue.TYPE, defaultValue);
    this.animatable_ = true;
  }

}

Registry.as<PropertyFactoryRegistry>(PropertyFactoryRegistry.ID).registerFactory(Vector2Property.TYPE, Vector2Property);