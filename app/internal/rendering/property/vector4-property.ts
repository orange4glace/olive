import { PropertyBase, Property, PropertyFactoryRegistry } from "./property";
import { Postable, postable, Posted } from "worker-postable";
import { Vector4, Vector4Base } from "oliveutil/vector4";
import { KeyframeValue, ISerializedKeyframeValue, IKeyframeValueFactory, KeyframeValueFactoryRegistry } from "internal/rendering/property/keyframe";
import { Registry } from "platform/registry/common/platform";
import { IInstantiationService } from "platform/instantiation/common/instantiation";

export interface SerializedVector4KeyframeValue extends ISerializedKeyframeValue {
  x: number;
  y: number;
  z: number;
  w: number;
}

@Posted('Vector4KeyframeValue')
export class Vector4KeyframeValue extends KeyframeValue {
  static readonly TYPE = 'olive.property.keyframe.value.Vector4'

  @postable x: number;
  @postable y: number;
  @postable z: number;
  @postable w: number;

  constructor(x: number, y: number, z: number, w: number) {
    super(Vector4KeyframeValue.TYPE)
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
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

export interface Vector4PropertyBase extends PropertyBase<Vector4KeyframeValue> {
}

@Postable
export class Vector4Property extends Property<Vector4KeyframeValue> implements Vector4PropertyBase {
  static readonly TYPE = 'olive.property.Vector4'

  constructor(defaultValue: Vector4KeyframeValue) {
    super(Vector4KeyframeValue.TYPE, defaultValue);
    this.animatable = true;
  }

  createValue(x: number, y: number, z: number, w : number): Vector4KeyframeValue {
    return new Vector4KeyframeValue(x, y, z, w);
  }

  cloneValue(val: Vector4KeyframeValue): Vector4KeyframeValue {
    return new Vector4KeyframeValue(val.x, val.y, val.z, val.w);
  }

  interpolate(lhs: Vector4KeyframeValue, rhs: Vector4KeyframeValue, t: number): Vector4KeyframeValue {
    return new Vector4KeyframeValue(
      lhs.x + (rhs.x - lhs.x) * t,
      lhs.y + (rhs.y - lhs.y) * t,
      lhs.z + (rhs.z - lhs.z) * t,
      lhs.w + (rhs.w - lhs.w) * t);
  }

}

Registry.as<PropertyFactoryRegistry>(PropertyFactoryRegistry.ID).registerFactory(Vector4Property.TYPE, Vector4Property);