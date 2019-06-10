import { Property, PropertyFactoryRegistry } from "./property";
import { Postable, postable, Posted } from "worker-postable";
import { IKeyframeValueFactory, KeyframeValueFactoryRegistry } from "internal/rendering/property/base/keyframe";
import { Registry } from "platform/registry/common/platform";
import { IInstantiationService } from "platform/instantiation/common/instantiation";
import { ISerializedKeyframeValue, KeyframeValue } from "internal/rendering/property/base/keyframe-value";
import { WithVector4PropertyBase, WithVector4KeyframeValueBase } from "internal/rendering/property/common/vector4-property";

export interface SerializedVector4KeyframeValue extends ISerializedKeyframeValue {
  x: number;
  y: number;
  z: number;
  w: number;
}

export class Vector4KeyframeValue extends WithVector4KeyframeValueBase(KeyframeValue) {
  static readonly TYPE = 'olive.property.keyframe.value.Vector4'

  constructor(x: number, y: number, z: number, w: number) {
    super(Vector4KeyframeValue.TYPE)
    this.x_ = x;
    this.y_ = y;
    this.z_ = z;
    this.w_ = w;
  }

  serialize(): SerializedVector4KeyframeValue {
    return {
      type: Vector4KeyframeValue.TYPE,
      x: this.x,
      y: this.y,
      z: this.z,
      w: this.w
    };
  }
}

class Vector4KeyframeValueFactory implements IKeyframeValueFactory {
  serialize(value: Vector4KeyframeValue): SerializedVector4KeyframeValue {
    return value.serialize();
  }
  deserialize(instantiationService: IInstantiationService, obj: SerializedVector4KeyframeValue): Vector4KeyframeValue {
    if (obj.type !== Vector4KeyframeValue.TYPE) throw new Error('Keyframe value type invalid. ' + obj.type);
    return new Vector4KeyframeValue(obj.x, obj.y, obj.z, obj.w);
  }
}
Registry.as<KeyframeValueFactoryRegistry>(KeyframeValueFactoryRegistry.ID).registerFactory(Vector4KeyframeValue.TYPE, Vector4KeyframeValueFactory);


class _Vector4Property extends Property<Vector4KeyframeValue> {
  createValue(x: number, y: number, z: number, w : number): Vector4KeyframeValue {
    return new Vector4KeyframeValue(x, y, z, w);
  }

  cloneValue(val: Vector4KeyframeValue): Vector4KeyframeValue {
    return new Vector4KeyframeValue(val.x, val.y, val.z, val.w);
  }
}

@Postable
export class Vector4Property extends WithVector4PropertyBase(_Vector4Property) {
  static readonly TYPE = 'olive.property.Vector4'

  constructor(defaultValue: Vector4KeyframeValue) {
    super(Vector4KeyframeValue.TYPE, defaultValue);
    this.animatable_ = true;
  }

}

Registry.as<PropertyFactoryRegistry>(PropertyFactoryRegistry.ID).registerFactory(Vector4Property.TYPE, Vector4Property);