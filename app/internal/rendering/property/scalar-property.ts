import { PropertyBase, Property, PropertyFactoryRegistry } from "./property";
import { Postable, postable, Posted } from "worker-postable";
import { ISerializedKeyframeValue, IKeyframeValue, KeyframeValue, IKeyframeValueFactory, KeyframeValueFactoryRegistry, SerializedKeyframe } from "internal/rendering/property/keyframe";
import { Registry } from "platform/registry/common/platform";
import { IInstantiationService } from "platform/instantiation/common/instantiation";

export interface SerializedScalarKeyframeValue extends ISerializedKeyframeValue {
  value: number;
}

@Posted('ScalarKeyframeValue')
export class ScalarKeyframeValue extends KeyframeValue {
  static readonly TYPE = 'olive.property.keyframe.value.Scalar'

  @postable value: number;

  constructor(value: number) {
    super(ScalarKeyframeValue.TYPE);
    this.value = value;
  }

  serialize(): SerializedScalarKeyframeValue {
    return {
      type: ScalarKeyframeValue.TYPE,
      value: this.value
    };
  }
}

class ScalarKeyframeValueFactory implements IKeyframeValueFactory {
  serialize(value: ScalarKeyframeValue): SerializedScalarKeyframeValue {
    return value.serialize();
  }
  deserialize(instantiationService: IInstantiationService, obj: SerializedScalarKeyframeValue): ScalarKeyframeValue {
    if (obj.type !== ScalarKeyframeValue.TYPE) throw new Error('Keyframe value type invalid. ' + obj.type);
    return new ScalarKeyframeValue(obj.value);
  }
}
Registry.as<KeyframeValueFactoryRegistry>(KeyframeValueFactoryRegistry.ID).registerFactory(ScalarKeyframeValue.TYPE, ScalarKeyframeValueFactory);

export interface ScalarPropertyBase extends PropertyBase<ScalarKeyframeValue> {
}

@Postable
export class ScalarProperty extends Property<ScalarKeyframeValue> implements ScalarPropertyBase {

  static readonly TYPE = 'olive.property.Scalar';

  constructor(defaultValue: ScalarKeyframeValue) {
    super(ScalarKeyframeValue.TYPE, defaultValue);
    this.animatable = true;
  }

  createValue(val: number): ScalarKeyframeValue {
    return new ScalarKeyframeValue(val);
  }

  cloneValue(val: ScalarKeyframeValue): ScalarKeyframeValue {
    return new ScalarKeyframeValue(val.value);
  }

  interpolate(lhs: ScalarKeyframeValue, rhs: ScalarKeyframeValue, t: number): ScalarKeyframeValue {
    return new ScalarKeyframeValue(lhs.value + (rhs.value - lhs.value) * t);
  }

}

Registry.as<PropertyFactoryRegistry>(PropertyFactoryRegistry.ID).registerFactory(ScalarProperty.TYPE, ScalarProperty);